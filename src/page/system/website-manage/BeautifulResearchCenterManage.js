
import React, { Component } from 'react';
import ExpertIntroduction from './ExpertIntroduction'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';

const dict = {'妊娠期':{type1:'3-1',type2:'3-1-1'},'产褥期':{type1:'3-2',type2:'3-2-1'},'产后调理':{type1:'3-3',type2:'3-3-1'},
  '日常养护':{type1:'3-4',type2:'3-4-1'}}

class ActivityManage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key) {
    this.props.dispatch({type:'AllWebSiteManage/tabChange',payload:{BeautifulActKey:key}})
    if(dict[key]){
      const {type1,type2} = dict[key];
      this.props.dispatch(type2?{type:'websiteBanner/getExpertInitialList',payload:{"str":type2,}}
        :{type:'websiteBanner/saveExpertInitialList',payload:{data:[]}});
      this.props.dispatch({type:'websiteBanner/getExpertByOneType',payload:{str:type1}});
    }
  }

  render() {
    let ary = []
    Object.keys(dict).map((key) => {
      if (dict[key]){
        ary.push(<TabPane tab={key} key={key}><ExpertIntroduction superData={dict[key]}/></TabPane>)
      }
    })

    return (
      <div style={{width:'100%',height:'100%',backgroundColor:'white'}}>
        <Tabs tabPosition="left" activeKey={this.props.all.BeautifulActKey} onChange={this.callback.bind(this)}>
          {ary}
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {all:state.AllWebSiteManage}
}
export default connect(mapStateToProps)(ActivityManage);
