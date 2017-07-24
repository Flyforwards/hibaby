
import React, { Component } from 'react';
import BabyService from './WebsiteBabyService'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';

const dict = {产前服务:'2-1',妈妈服务:'2-2',宝宝服务:'2-3',月子膳食:'2-4',门诊服务:'2-5',星级环境:'2-6'}

class ActivityManage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key) {
    this.props.dispatch({type:'websiteBabyCare/tabChange',payload:key})
    this.props.dispatch({type:'websiteBabyCare/getInitialList',payload:{str:dict[key]}});
  }

  render() {
    let ary = []
    Object.keys(dict).map((key) => {
      if (dict[key]){
        ary.push(<TabPane tab={key} key={key}><BabyService superData={{type1:dict[key]}}/></TabPane>)
      }
    })

    return (
      <Tabs tabPosition="left" activeKey={this.props.actKey} onChange={this.callback.bind(this)}>
        {ary}
      </Tabs>
    )
  }
}

function mapStateToProps(state){
  return state.websiteBabyCare
}
export default connect(mapStateToProps)(ActivityManage);
