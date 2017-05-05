import React from 'react'
import {Button, Popconfirm, message, Menu, Dropdown, Icon, Badge, Collapse} from "antd";
import FAIcon from '../../component/faicon'
import {hashHistory} from 'react-router'
import request from '../../common/request/request.js'
import {local, session} from '../../common/util/storage.js'
import './index.scss'
import  UpdateModal from './UpdateModal.jsx'
import Logo from './logo.png'
import UserImg from './user.jpg'
const Panel = Collapse.Panel

function callback(key) {
  console.log(key);
}
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateModalVisible: false,
            updateModalConfirmLoading: false,
            initialUpdateValue: {},
            count:9,
            name:"总部"
        }
    }
    componentDidMount() {
        
    }
    logout() {
        this.props.onSetLoading(true)
        this.props.onSetLoading(false)
        session.set('isLogin', false)
        hashHistory.push('/login')
        return
        request({
            url: '/logout',
            type: 'get',
            dataType: 'json'
        })
            .then(res => {
                this.props.onSetLoading(false)
                if (res.code === '0') {
                    session.set('isLogin', false)
                    hashHistory.push('/login')
                } else {
                    message.error(res.msg)
                }
            })
            .catch(err => {
                console.log('error>>>', err)
                message.error(err.statusText)
                this.props.onSetLoading(false)
            })


    }
    onToggle() {
        this.props.onMiniChange(!this.props.miniMode)
    }
    getName(event,item){
        console.log(event.target.innerHTML)
        this.setState({
            name:event.target.innerHTML
        })
    }
    render() {
        const mini = this.props.miniMode
        const menu = (
        <Menu>
            <Menu.Item key="0">
              <a onClick={this.getName.bind(this)}>广州和美</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
              <a onClick={this.getName.bind(this)}>深圳和美</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <a onClick={this.getName.bind(this)}>集团总部</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <a onClick={this.getName.bind(this)}>上海和美</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="4">
                <a onClick={this.getName.bind(this)}>武汉女子</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="5">
                <a onClick={this.getName.bind(this)}>广州和美</a>
            </Menu.Item>
        </Menu>
        )
        const userInfo = session.get('userInfo') || {userName: '李芳'}
        return (
            <header className="yt-admin-framework-header clearfix">
                <h1 className="yt-admin-framework-header-brand">
                    <img src={Logo} className="nav-logo" />
                    <div className="line"></div>
                    <div className="nav">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            <span className="nav-two">{this.state.name}</span>
                            <Icon type="caret-down" />
                        </a>
                    </Dropdown>
                    </div>
                    <ul className="nav-ul">
                        {this.state.list}
                    </ul>
                </h1>
                <ul className="yt-admin-framework-header-menu clearfix">
                    <li className="menu-item">
                        <a href="#">
                            <span className="header-menu-text">CRM系统</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#">
                            <span className="header-menu-text">客房管理</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#">
                            <span className="header-menu-text">服务管理</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#">
                            <span className="header-menu-text">膳食厨房</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#">
                            <span className="header-menu-text">进销存管理</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#">
                            <span className="header-menu-text">系统管理</span>
                        </a>
                    </li>
                </ul>
                <div className="header-menu-name">
                    <img src={UserImg}/>
                    <p> <span className="user-name">李芳</span>
                    <span className="user-pro">运营经理</span></p>
                    <Icon type="caret-down" />
                </div>
                <UpdateModal
                    initialValue={this.state.initialUpdateValue}
                    visible={ this.state.updateModalVisible }
                    confirmLoading={ this.state.updateModalConfirmLoading }
                />
            </header>
        )
    }
}

export default Header
