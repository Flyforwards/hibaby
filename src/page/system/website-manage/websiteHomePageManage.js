
import React, { Component } from 'react';
import Banner from './WebSiteBanner'
import ExpertIntroduction from './ExpertIntroduction'
import WebJob from './WebJob'
import WebEndemic from './WebEndemic'
import WebCourse from './webCourse'
import ActivityEnroll from './activityEnroll'
import { Tabs } from 'antd'
import { connect } from 'dva';

const TabPane = Tabs.TabPane;

const dict = {'专家团队':{type1:'1-1',type2:'1-1-1'},'活动咨询':{type1:'1-2'},'活动招募':{type1:'1-2-1',type2:'1-2-1-1'},'新闻动态':{type1:'1-2-2',type2:'1-2-2-1'}}

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key) {
    this.props.dispatch({type:'websiteBanner/tabChange',payload:key})
    if(dict[key]){
      const {type1,type2} = dict[key];
      this.props.dispatch(type2?{type:'websiteBanner/getExpertInitialList',payload:{"str":type2,}}
        :{type:'websiteBanner/saveExpertInitialList',payload:{data:[]}});
      this.props.dispatch({type:'websiteBanner/getExpertByOneType',payload:{str:type1}});
    }
  }

  render() {
    let tempAry = [];
    Object.keys(dict).map(key=>{
      tempAry.push(<TabPane tab={key} key={key}><ExpertIntroduction superData={dict[key]}/></TabPane>)
    })
    return (
      <Tabs tabPosition="left" activeKey={this.props.actKey} onChange={this.callback.bind(this)}>
        <TabPane tab="Banner 管理" key="1"> <Banner/></TabPane>
        {tempAry}
        <TabPane tab="招聘信息管理" key="2"><WebJob/></TabPane>
        <TabPane tab="地方中心管理" key="3"><WebEndemic/></TabPane>
        <TabPane tab="妈妈课程管理" key="4"><WebCourse/></TabPane>
        <TabPane tab="活动报名管理" key="5"><ActivityEnroll/></TabPane>
      </Tabs>
    )
  }
}


function mapStateToProps(state){
  return state.websiteBanner
}
export default connect(mapStateToProps)(HomePage);
