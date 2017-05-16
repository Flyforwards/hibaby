
import React from 'react'
import { Button, Popconfirm, message, Menu, Dropdown, Icon, Badge } from "antd";
import { hashHistory, Link} from 'react-router'
import { local, session } from 'common/util/storage.js'
import './index.scss'
import UpdateModal from './UpdateModal.jsx'
import Logo from './logo.png'
import UserImg from './user.jpg'
import { positionDict } from 'common/constants';
const MenuItem = Menu.Item;

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
        this.userMenu=(
            <div>
              <div>
                <Button>个人中心</Button>
              </div>
              <div>
                <Button onClick={ this.logout.bind(this)}>退出登录</Button>
              </div>
            </div>
        )
    }

    logout() {
      this.props.dispatch({
        type: "layout/logout",
      })
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
    // 切换地方中心
    changeClub(record){
      const selectEndemic = session.get("endemic")
      if (selectEndemic != null && record.id != selectEndemic.id) {
        this.props.dispatch({
          type: "layout/setEndemic",
          payload: { selClub: record }
        })
      }
    }
    render() {

        let userName = "凯贝姆";
        let userPosition = "凯贝姆";
        if (this.props.userInfo != null) {
          userName = this.props.userInfo.name;
          const entrys = this.props.userInfo.entrys;
          if ( entrys !=null && entrys.length > 0) {
            const entry = entrys[0];
            userPosition = positionDict[entry.positionId];
          }
        }
        const endemicMenu = session.get("clubs");
        const selectEndemic = session.get("endemic");
        let leftMenu = [];

        if (endemicMenu != null && endemicMenu.length > 1) {
          const menuItems = endemicMenu.map((record, index)=>{
            return (
              <div key = { index } >
                <Button onClick={ this.changeClub.bind(this, record) }>{ record.name }</Button>
              </div>
            )
          })
          const menu = (<div>{ menuItems }</div>)

          leftMenu = (
            <Dropdown overlay={ menu } placement="bottomCenter" trigger={['click']}>
              <a className="ant-dropdown-link">
                <span className="nav-two">{ selectEndemic ? selectEndemic.name: "凯贝姆" }</span>
                <Icon type="caret-down" />
              </a>
            </Dropdown>)
        } else {
          leftMenu = (<span className="nav-two">{ selectEndemic ? selectEndemic.name: "凯贝姆" }</span>)
        }


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
                      {
                        leftMenu
                      }
                    </div>
                    <ul className="nav-ul">
                        { this.state.list }
                    </ul>
                </h1>
                <ul className="yt-admin-framework-header-menu clearfix">
                  {
                    subNodes
                  }
                </ul>
                <Dropdown overlay={ this.userMenu } placement="bottomCenter" trigger={ ['click'] }>
                  <div className="header-menu-name">
                    <img src={UserImg}/>
                    <p className="user-info-p">
                      <span className="user-name">{ userName }</span>
                      <span className="user-pro">{ userPosition }</span>
                    </p>
                    <Icon type="caret-down" />
                  </div>
                </Dropdown>
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
