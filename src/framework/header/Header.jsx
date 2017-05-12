
import React from 'react'
import { Button, Popconfirm, message, Menu, Dropdown, Icon, Badge } from "antd";
import { hashHistory, Link} from 'react-router'
import { local, session } from 'common/util/storage.js'
import './index.scss'
import UpdateModal from './UpdateModal.jsx'
import Logo from './logo.png'
import UserImg from './user.jpg'
const MenuItem = Menu.Item;

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
        const projectList = this.props.projectList;
        if (projectList == null) {
          this.props.dispatch({
            type : "layout/getProjectList"
          });
        }

    }

    getName(event,item){
        console.log(event.target.innerHTML)
        this.setState({
            name:event.target.innerHTML
        })
    }
    refreshMenu(itemId){
      this.props.dispatch({
        type : "layout/getCurrUserMenu",
        payload: { dataId : itemId },
      });
    }
    render() {
        const menu = (
        <Menu>
            <MenuItem key="0">
              <a onClick={this.getName.bind(this)}>广州和美</a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem key="1">
              <a onClick={this.getName.bind(this)}>深圳和美</a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem key="2">
                <a onClick={this.getName.bind(this)}>集团总部</a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem key="3">
                <a onClick={this.getName.bind(this)}>上海和美</a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem key="4">
                <a onClick={this.getName.bind(this)}>武汉女子</a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem key="5">
                <a onClick={this.getName.bind(this)}>广州和美</a>
            </MenuItem>
        </Menu>
        )
        const userInfo = session.get('userInfo') || {userName: '李芳'}
        let projectList = this.props.projectList;
        let subNodes = [];
        if (projectList == null) {
          projectList = [{
            description : "首页",
            id : 1,
            isHave : null,
            isSelect : null,
            name :  "首页",
            orderBy : 0,
            path : "",
          },{
          description :  "CRM",
          id : 2,
          isHave : null,
          isSelect : null,
          name  : "CRM",
          orderBy : 1,
          path : "/crm/customer"},
            {
            description : "系统管理",
            id :  3,
            isHave : null,
            isSelect : null,
            name  : "系统管理",
            orderBy : 2,
            path : "/system/groupchar",
          }];
        }
        if (projectList != null) {
          subNodes =  projectList.map((item, index) => {
            if (item.id == 2) {
              item.path = "/crm/customer";
            } else if (item.id == 3) {
              item.path = "/system/groupchar";
            }
            return (
              <li key = {index} className="menu-item">
                <Link to={ item.path } onClick={ this.refreshMenu.bind(this,item.id)} >
                  <span className="header-menu-text">{ item.name }</span>
                </Link>
              </li>
                  )
          })
        }
        return (
            <header className="yt-admin-framework-header clearfix">
                <h1 className="yt-admin-framework-header-brand">
                    <img src={ Logo } className="nav-logo" />
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
                  {
                    subNodes
                  }
                </ul>
                <div className="header-menu-name">
                    <img src={UserImg}/>
                    <p> <span className="user-name">李芳</span>
                    <span className="user-pro">运营经理</span></p>
                    <Icon type="caret-down" />
                </div>
                <UpdateModal
                    initialValue = { this.state.initialUpdateValue }
                    visible = { this.state.updateModalVisible }
                    confirmLoading ={ this.state.updateModalConfirmLoading }
                />
            </header>
        )
    }
}

export default Header
