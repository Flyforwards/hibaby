
import React, { Component } from 'react';
import BabyService from './WebsiteBabyService'
import WebJob from './WebJob'
import { Tabs } from 'antd'
import ExpertIntroduction from './ExpertIntroduction'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';

const dict = {'城市布局':{type1:'6-1',type2:'6-1-1'},'企业介绍':{type1:'7-1'},'品牌文化':{type1:'7-2'},
  '新闻动态':{type1:'7-3',type2:'7-3-1'}}

class ActivityManage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key) {
    this.props.dispatch({type:'AllWebSiteManage/tabChange',payload:{AboutActKey:key}})
    if(dict[key]){
      const {type1,type2} = dict[key];
      if (key === '企业介绍' || key === '品牌文化'){
        this.props.dispatch({type:'websiteBabyCare/getInitialList',payload:{str:dict[key].type1}});
      }else {
        this.props.dispatch(type2?{type:'websiteBanner/getExpertInitialList',payload:{"str":type2,}}
          :{type:'websiteBanner/saveExpertInitialList',payload:{data:[]}});
        this.props.dispatch({type:'websiteBanner/getExpertByOneType',payload:{str:type1}});
      }
    }
  }

  render() {
    let ary = []
    Object.keys(dict).map((key) => {
      if (dict[key]){
        if (key === '企业介绍' || key === '品牌文化'){
          ary.push(<TabPane tab={key} key={key}><BabyService superData={{type1:dict[key].type1}}/></TabPane>)
        }
        else{
          ary.push(<TabPane tab={key} key={key}><ExpertIntroduction superData={dict[key]}/></TabPane>)
        }
      }
    })

    return (
      <div style={{width:'100%',height:'100%',backgroundColor:'white'}}>
        <Tabs tabPosition="left" activeKey={this.props.all.AboutActKey} onChange={this.callback.bind(this)}>
          {ary}
          <TabPane tab="招聘信息" key="招聘信息"><WebJob/></TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {users:state.websiteBabyCare,all:state.AllWebSiteManage}
}
export default connect(mapStateToProps)(ActivityManage);
