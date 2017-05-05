
import './index.scss'
import React from 'react'
import {BackTop, Spin} from 'antd'
import Header from '../header/Header.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import Content from '../content/Content.jsx'
import {local, session} from 'common/util/storage.js'
import {connect} from 'dva';
import classNames from 'classnames';
import request from '../../common/request/request.js'

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
        const { projectList, subMenu } = this.props.layout

        if (subMenu != null) {
          menuData = subMenu;
          console.log(subMenu);
        }

        return (
            <div className={cls}>
                <Spin key="yt-admin-framework-layout" spinning={this.state.loading} size="large">
                    <Header
                        miniMode={this.state.mini}
                        onMiniChange={this.handleMiniChange.bind(this)}
                        onSetLoading={this.handleSetLoading.bind(this)}
                        projectList={projectList}
                        dispatch={this.props.dispatch}
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
