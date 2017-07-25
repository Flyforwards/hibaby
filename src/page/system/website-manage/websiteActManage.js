
import React, { Component } from 'react';
import BabyService from './WebsiteBabyService'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';

const dict = {产前服务:'2-1',妈妈服务:'2-2',宝宝服务:'2-3',月子膳食:'2-4',门诊服务:'2-5',星级环境:'2-6',
  环保智能:'2-7',健康时尚:'2-8',医疗护航:'2-9',融合国际:'2-10','专家团队Our team':'2-11',专家团队:'2-12',
  母婴护理家团队:'2-13',护理团队:'2-14',后勤团队:'2-15'}

class ActivityManage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key) {
    this.props.dispatch({type:'AllWebSiteManage/tabChange',payload:{ServiceActKey:key}})
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
      <div style={{width:'100%',height:'100%',backgroundColor:'white'}}>
        <Tabs tabPosition="left" activeKey={this.props.all.ServiceActKey} onChange={this.callback.bind(this)}>
          {ary}
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {users:state.websiteBabyCare,all:state.AllWebSiteManage}
}
export default connect(mapStateToProps)(ActivityManage);
