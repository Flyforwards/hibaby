
import React from 'react'
import { Button, Popconfirm, message, Menu, Dropdown, Icon, Badge } from "antd";
import { hashHistory, Link} from 'react-router'
import { local, session } from 'common/util/storage.js'
import './index.scss'
import UpdateModal from './UpdateModal.jsx'
import Logo from 'assets/logo.png'
import UserImg from 'assets/user.jpg'
import { positionDict } from 'common/constants';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const MenuItem = Menu.Item;

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateModalVisible: false,
            updateModalConfirmLoading: false,
            initialUpdateValue: {},
            selectIndex: 0,
        }
        this.userMenu=(
            <div>
              <div>
                <Button onClick={ this.putUserInfoIndex.bind(this)}>个人中心</Button>
              </div>
              <div>
                <Button onClick={ this.logout.bind(this)}>退出登录</Button>
              </div>
            </div>
        )
    }
    putUserInfoIndex() {
      this.props.dispatch({
        type: "layout/pushUser",
      });
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
            type : "layout/getProjectAndModuleTree"
          });
        }

    }

    getName(event,item){
        this.setState({
            name:event.target.innerHTML
        })
    }

    refreshMenu(item, index){
      this.props.dispatch({
        type: "layout/pushModule",
        payload: { moduleList: item.moduleList, selectIndex: index, }
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

      const { projectTree, clubs: endemicMenu, endemic: selectEndemic, userInfo, selectIndex } = this.props;

        const userPosition = "凯贝姆";
        const userName = userInfo.name || "凯贝姆";
        const userImg = userInfo.imgURL || UserImg;
        const entrys = userInfo.entrys;
        if ( entrys && entrys.length > 0) {
          const entry = entrys[0];
          // console.log(entry);
          // userPosition = positionDict[entry.id];
        }

        let leftMenu = [];

        if (endemicMenu.length > 1) {
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
                <span className="nav-two">{  selectEndemic.name || "凯贝姆" }</span>
                <Icon type="caret-down" />
              </a>
            </Dropdown>)
        } else {
          leftMenu = (<span className="nav-two">{  selectEndemic.name || "凯贝姆" }</span>)
        }

        const subNodes =  projectTree.map((item, index) => {
          let className="menu-item"
          if ( selectIndex === index ) {
            className="menu-item-select"
          }
          //
          return (
            <li key = { index } className={className}>
              <Link onClick={ this.refreshMenu.bind(this,item, index)} >
                <span className="header-menu-text">{ item.name }</span>
              </Link>
            </li>
                )
        })

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
                    </ul>
                </h1>
                <ul className="yt-admin-framework-header-menu clearfix">
                  {
                    subNodes
                  }
                </ul>
                <Dropdown overlay={ this.userMenu } placement="bottomCenter" trigger={ ['click'] }>
                  <div className="header-menu-name">
                    <img src={ userImg }/>
                    <p className="user-info-p">
                      <span className="user-name">{ userName }</span>
                      <span className="user-pro">{ userPosition }</span>
                    </p>
                    <Icon className="userIcon" type="caret-down" />
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


function mapStateToProps(state) {
  const {
    projectTree,
    clubs,
    endemic,
    userInfo,
    selectIndex
  } = state.layout;
  return {
    loading: state.loading,
    projectTree,
    clubs,
    endemic,
    userInfo,
    selectIndex
  };
}

export default connect(mapStateToProps)(Header);

