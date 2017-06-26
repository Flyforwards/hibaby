
import './index.scss'
import React from 'react'
import { BackTop, Spin, Button, Card } from 'antd'
import Header from '../header/Header.jsx'

import Sidebar from '../sidebar/Sidebar.jsx'
import Content from '../content/Content.jsx'
import { local, session} from 'common/util/storage.js'
import { connect } from 'dva';
import classNames from 'classnames';
import Footer from '../footer/footer.jsx'
import { message } from 'antd'
import PhoneSystemIndex from '../PhoneSystemIndex'


class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mini: local.get('mini'),
            loading: false,
        }

      this.extra = (<div><Button>最小化</Button><Button>关闭</Button></div>)
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

    onClick(){
      message.success('登录成功');
      this.props.dispatch({
        type:'layout/xxxx'
      })
      console.log(window.token)
    }

    // onclick(token){
    //   console.log(token);
    // }

    // <Button  id="bridging-btn" style={{position: 'absolute', left: 0, top: 0,width:'40px',height:'30px'}} >桥接中介</Button>
    render() {
        const cls = classNames({
            'mini': this.state.mini,
            'yt-admin-framework': true
        });
        const { subMenu} = this.props;
        return (
            <div className={ cls }>
                <Button onClick={ this.onClick.bind(this)}  id="bridging-btn" style={{position: 'absolute', left: 0, top: 0,width:'40px',height:'30px', display: 'none'}} >桥接中介</Button>
                <PhoneSystemIndex />
                <Spin key="yt-admin-framework-layout" spinning={ this.state.loading } size="large">
                    <Header
                        miniMode ={ this.state.mini }
                        onMiniChange = { this.handleMiniChange.bind(this) }
                        onSetLoading = { this.handleSetLoading.bind(this) }
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

function mapStateToProps(state) {
  const {
    subMenu
  } = state.layout;
  return {
    loading: state.loading,
    subMenu
  };
}

export default connect(mapStateToProps)(Layout);
