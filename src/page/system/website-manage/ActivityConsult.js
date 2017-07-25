
import React, { Component } from 'react';
import ExpertIntroduction from './ExpertIntroduction'
import { Tabs } from 'antd'
import WebCourse from './WebCourse'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';

const dict = {'新闻动态':{type1:'4-1',type2:'4-1-1'},'活动招募':{type1:'4-2',type2:'4-2-1'},'母婴知识':{type1:'4-3',type2:'4-3-1'}}

class ActivityManage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key) {
    this.props.dispatch({type:'AllWebSiteManage/tabChange',payload:{ActivityActKey:key}})
    if(dict[key]){
      const {type1,type2} = dict[key];
      this.props.dispatch(type2?{type:'websiteBanner/getExpertInitialList',payload:{"str":type2,}}
        :{type:'websiteBanner/saveExpertInitialList',payload:{data:[]}});
      this.props.dispatch({type:'websiteBanner/getExpertByOneType',payload:{str:type1}});
    }  }

  render() {
    console.log(this.props)
    let ary = []
    Object.keys(dict).map((key) => {
      if (dict[key]){
        ary.push(<TabPane tab={key} key={key}><ExpertIntroduction superData={dict[key]}/></TabPane>)
      }
    })

    return (
      <div style={{width:'100%',height:'100%',backgroundColor:'white'}}>
        <Tabs tabPosition="left" activeKey={this.props.all.ActivityActKey} onChange={this.callback.bind(this)}>
          {ary}
          <TabPane tab="妈妈课程管理" key="妈妈课程管理"><WebCourse/></TabPane>
        </Tabs>
      </div>
    )
  }
}



function mapStateToProps(state){
  return {users:state.websiteBabyCare,all:state.AllWebSiteManage}
}
export default connect(mapStateToProps)(ActivityManage);
