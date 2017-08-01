
import React, { Component } from 'react';
import BabyService from './WebsiteBabyService'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;
import { connect } from 'dva';

// const dict = {星级环境:'2-6'}


const allDict = {'精致服务':{产前服务:'2-1',妈妈服务:'2-2',宝宝服务:'2-3',月子膳食:'2-4',门诊服务:'2-5'},特色服务:{环保智能:'2-7',健康时尚:'2-8',医疗护航:'2-9',融合国际:'2-10'},
  专家团队:{'专家团队Our team':'2-11',专家团队:'2-12', 母婴护理家团队:'2-13',护理团队:'2-14',后勤团队:'2-15'},环境介绍:{园林景观:'2-16', 妈妈修养:'2-17',宝宝养护:'2-18',产后康复:'2-19'}}


class ActivityManage extends Component {

  constructor(props) {
    super(props);
    this.state={
      tabSelect:['产前服务','环保智能','专家团队Our team','园林景观'],
      mainSelect:'精致服务'
    }
  }

  callback(key,index) {
    let {tabSelect,mainSelect} = this.state;

    Object.keys(allDict).map((chiKey,index)=>{
      if(chiKey === mainSelect){
        tabSelect.splice(parseInt(index),1,key)
      }
    })

    this.setState({
      tabSelect
    })
    this.props.dispatch({type:'websiteBabyCare/getInitialList',payload:{str:(allDict[mainSelect])[key]}});
  }

  mainCallback(key) {
    this.setState({
      mainSelect:key,
    })

    let tempKey = ''

    let {tabSelect,mainSelect} = this.state;

    Object.keys(allDict).map((chiKey,index)=>{
      if(chiKey === key){
        tempKey = tabSelect[index]
      }
    })



    console.log(tempKey)
    this.props.dispatch({type:'websiteBabyCare/getInitialList',payload:{str:(allDict[key])[tempKey]}});
  }

  render() {
    let ary = []
    Object.keys(allDict).map((allKey,index)=>{
      let chiDict = allDict[allKey]
        let tempAry = []
        Object.keys(chiDict).map((key) => {
          if (chiDict[key]){
            tempAry.push(<TabPane tab={key} key={key}><BabyService superData={{type1:chiDict[key]}}/></TabPane>)
          }
      })
      ary.push(<TabPane tab={allKey} key={allKey}>
        <Tabs tabPosition="left" key={allKey} activeKey={this.state.tabSelect[index]} onChange={this.callback.bind(this)}>{tempAry}</Tabs></TabPane>)
    })

    return(
        <div style={{width:'100%',height:'100%',backgroundColor:'white'}}>
          <Tabs activeKey={this.state.mainSelect} onChange={this.mainCallback.bind(this)}>
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
