
import React, { Component } from 'react';
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';
import ExpertIntroduction from './ExpertIntroduction'

const dict = {'星妈分享':{type1:'5-1',type2:'5-1-1'},'馨妈分享':{type1:'5-2',type2:'5-2-1'}}

class ActivityManage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key) {
    this.props.dispatch({type:'AllWebSiteManage/tabChange',payload:{NewMontherActKey:key}})
    if(dict[key]){
      const {type1,type2} = dict[key];
      this.props.dispatch(type2?{type:'websiteBanner/getExpertInitialList',payload:{"str":type2,}}
        :{type:'websiteBanner/saveExpertInitialList',payload:{data:[]}});
      this.props.dispatch({type:'websiteBanner/getExpertByOneType',payload:{str:type1}});
    }  }

  render() {
    let ary = []
    Object.keys(dict).map((key) => {
      if (dict[key]){
        ary.push(<TabPane tab={key} key={key}><ExpertIntroduction superData={dict[key]}/></TabPane>)
      }
    })

    return (
      <div style={{width:'100%',height:'100%',backgroundColor:'white'}}>
        <Tabs tabPosition="left" activeKey={this.props.all.NewMontherActKey} onChange={this.callback.bind(this)}>
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
