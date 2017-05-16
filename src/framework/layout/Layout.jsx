
import './index.scss'
import React from 'react'
import {BackTop, Spin} from 'antd'
import Header from '../header/Header.jsx'

import Sidebar from '../sidebar/Sidebar.jsx'
import Content from '../content/Content.jsx'
import {local, session} from 'common/util/storage.js'
import {connect} from 'dva';
import classNames from 'classnames';

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mini: local.get('mini'),
            menuData: [],
            loading: false,
        }
    }
    componentWillMount() {

    }

    /**
     * menuData
     * path name icon
     * @path 重要 既做路径，又作为唯一key
     * [{
 *      name: '404',
 *      icon: 'circle',
 *      path: '/404'
 *      children: [
 *          {
 *              name: '405',
 *              path: '/405',
 *              icon: 'circle'
 *          },
 *          {
 *              name: '401',
 *              icon: 'circle',
 *              path: '/401'
 *              children: [{
 *                  name: '409',
 *                  path: '/409',
 *                  icon: 'circle'
 *              }]
 *          }
 *      ]
 * },
     * {
 *      name: '403',
 *      path: '/403',
 *      icon: 'circle'
 * }]
     *
     *
     **/

    handleMiniChange(mode) {
        local.set('mini', mode)
        this.setState({
            mini: mode
        })
    }

    handleSetLoading(type) {

        this.setState({
            loading: type
        })
    }


    render() {
        const cls = classNames({
            'mini': this.state.mini,
            'yt-admin-framework': true
        });
        let menuData = [];
        const { projectList, subMenu, userInfo } = this.props.layout;
        if (subMenu != null) {
          menuData = subMenu;
        } else {
          menuData = [{"name":"组织架构管理","path":"/system/organization","icon":"copyright","projectId":3,"permissionId":1,"children":[
            {"name":"组织架构","path":"/system/organization","icon":"copyright","projectId":3,"permissionId":1,"children":null},
            {"name":"职位管理","path":"/system/position","icon":"copyright","projectId":3,"permissionId":1,"children":null}]
          },
            {"name":"CRM数据管理","path":"/system/crmdata","icon":"copyright","projectId":3,"permissionId":1,"children":[
              {"name":"集团字段","path":"/system/groupchar","icon":"copyright","projectId":3,"permissionId":1,"children":null},
              {"name":"地方字段","path":"/system/localchar","icon":"copyright","projectId":3,"permissionId":1,"children":null},
              {"name":"服务项目","path":"/system/serviceitem","icon":"copyright","projectId":3,"permissionId":1,"children":null}]
            },
            {"name":"权限管理","path":"/system/permission","icon":"copyright","projectId":3,"permissionId":1,"children":[]},
            {"name":"菜单管理","path":"/system/module","icon":"copyright","projectId":3,"permissionId":1,"children":[]},
            {"name":"日志查看","path":"/system/logsview","icon":"copyright","projectId":3,"permissionId":1,"children":[]}]
        }

        return (
            <div className={cls}>
                <Spin key="yt-admin-framework-layout" spinning={this.state.loading} size="large">
                    <Header
                        miniMode ={ this.state.mini }
                        onMiniChange = { this.handleMiniChange.bind(this) }
                        onSetLoading = { this.handleSetLoading.bind(this) }
                        projectList = { projectList }
                        userInfo = { userInfo }
                        dispatch = {this.props.dispatch}
                    />
                    <Sidebar miniMode={this.state.mini} menuData={menuData} location={this.props.location}/>
                    <Content>
                        {
                            this.props.children
                        }
                    </Content>
                    <BackTop style={{right: '40px', bottom: '40px'}}/>
                </Spin>
            </div>
        )
    }
}

export default connect(( layout ) => ( layout ))(Layout);
