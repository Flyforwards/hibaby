
import './index.scss'
import React from 'react'
import {BackTop, Spin} from 'antd'
import Header from '../header/Header.jsx'

import Sidebar from '../sidebar/Sidebar.jsx'
import Content from '../content/Content.jsx'
import { local, session} from 'common/util/storage.js'
import { connect } from 'dva';
import classNames from 'classnames';
import Footer from '../footer/footer.jsx'

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mini: local.get('mini'),
            loading: false,
        }
    }
    componentWillMount() {

    }

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
        const { projectTree, subMenu, userInfo, selectIndex } = this.props.layout;

        return (
            <div className={ cls }>
                <Spin key="yt-admin-framework-layout" spinning={ this.state.loading } size="large">
                    <Header
                        miniMode ={ this.state.mini }
                        onMiniChange = { this.handleMiniChange.bind(this) }
                        onSetLoading = { this.handleSetLoading.bind(this) }
                        projectTree = { projectTree }
                        userInfo = { userInfo }
                        selectIndex = { selectIndex }
                        dispatch = { this.props.dispatch }
                    />
                    <Sidebar miniMode={ this.state.mini } menuData={ subMenu } location={ this.props.location }/>
                    <Content>
                        {
                            this.props.children
                        }
                    </Content>
                    <Footer />
                    <BackTop style={{right: '40px', bottom: '40px'}}/>
                </Spin>
            </div>
        )
    }
}

export default connect(( layout ) => ( layout ))(Layout);
