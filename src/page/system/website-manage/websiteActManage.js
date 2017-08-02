
import React, { Component } from 'react';
import BabyService from './WebsiteBabyService'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';

// const dict = {星级环境:'2-6'}


const allDict = {'精致服务':{产前服务:'2-1',妈妈服务:'2-2',宝宝服务:'2-3',月子膳食:'2-4',门诊服务:'2-5'},特色服务:{中医调养:'2-9',智能环保:'2-7',健康时尚:'2-8',融合国际:'2-10'},
  专家团队:{'专家团队Our team':'2-11',房务团队:'2-12', 专家医生:{type1:'2-13',type2:'2-13-1'},护理团队:{type1:'2-14',type2:'2-14-1'},安保后勤团队:'2-15',健康顾问团队:'2-20',专属管家团队:'2-21',营养餐饮团队:'2-22',美妍管理团队:'2-23'},
  环境介绍:{园林景观:'2-16', 妈妈修养:'2-17',宝宝养护:'2-18',产后康复:'2-19'}}


class ActivityManage extends Component {

  constructor(props) {
    super(props);
  }

  callback(key,index) {
    let {tabSelect, mainSelect} = this.props.all;

    Object.keys(allDict).map((chiKey, index) => {
      if (chiKey === mainSelect) {
        tabSelect.splice(parseInt(index), 1, key)
      }
    })


    this.props.dispatch({type:'AllWebSiteManage/tabChange',payload:tabSelect})


    if ((allDict[mainSelect])[key]) {
      let type1, type2 = ''

      if (typeof (allDict[mainSelect])[key] === 'string') {
        type1 = (allDict[mainSelect])[key]
      }
      else {
        type1 = (allDict[mainSelect])[key].type1;
        type2 = (allDict[mainSelect])[key].type2;
      }
      this.props.dispatch({type: 'websiteBabyCare/getInitialList', payload: {str: type1}});
      if (type2) {
        this.props.dispatch({type: 'websiteBabyCare/getExpertInitialList', payload: {"str": type2}});
      }
    }
  }

  mainCallback(key) {

    this.props.dispatch({type:'AllWebSiteManage/tabChange',payload:{mainSelect:key}})


    let tempKey = ''

    let {tabSelect,mainSelect} = this.props.all;

    Object.keys(allDict).map((chiKey,index)=>{
      if(chiKey === key){
        tempKey = tabSelect[index]
      }
    })

    this.props.dispatch({type:'websiteBabyCare/getInitialList',payload:{str:(allDict[key])[tempKey]}});
  }

  render() {
    let ary = []
    Object.keys(allDict).map((allKey,index)=>{
      let chiDict = allDict[allKey]
      let tempAry = []
      Object.keys(chiDict).map((key) => {
        if (chiDict[key]){
          if(typeof chiDict[key] === 'string'){
            tempAry.push(<TabPane tab={key} key={key}><BabyService superData={{type1:chiDict[key]}}/></TabPane>)
          }
          else{
            tempAry.push(<TabPane tab={key} key={key}><BabyService superData={chiDict[key]}/></TabPane>)
          }
        }
      })
      ary.push(<TabPane tab={allKey} key={allKey}>
        <Tabs tabPosition="left" key={allKey} activeKey={this.props.all.tabSelect[index]} onChange={this.callback.bind(this)}>{tempAry}</Tabs></TabPane>)
    })

    return(
      <div style={{width:'100%',height:'100%',backgroundColor:'white'}}>
        <Tabs activeKey={this.props.all.mainSelect} onChange={this.mainCallback.bind(this)}>
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

