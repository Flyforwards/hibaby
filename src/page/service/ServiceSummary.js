/**
 *  婴儿护理记录单详情
 * Created by yangjingjing on 2017/8/21.
 */
import React, { Component } from 'react';
import {creatSummaryCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin,Tabs,Col} from 'antd';
import { connect } from 'dva';
import CheckBeforeDetail from './CheckBeforeDetail'
import CheckInDetail from './CheckInDetail'
import ChildCheckIndexDetail from './ChildCheckIndexDetail'
import NutritionEvaluateDetail from './NutritionEvaluateDetail'
import DiagnosisDetail from './diagnosisDetail'
import InfantFeedingRecordsDetail from './InfantFeedingRecordsDetail'
import InsideBabySwimDetail from './InsideBabySwimDetail'
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
const TabPane = Tabs.TabPane;
import { routerRedux,Link } from 'dva/router'


const ary = [
  {title:'入住前评估',chiComponent:<CheckBeforeDetail summary={true}/>},
  {title:'产妇入住评估',chiComponent:<CheckInDetail summary={true}/>},
  {title:'婴儿入住评估单',chiComponent:<ChildCheckIndexDetail summary={true}/>},
  {title:'营养部产后入住评估表',chiComponent:<NutritionEvaluateDetail summary={true}/>},
  {title:'中医见诊记录单',chiComponent:<DiagnosisDetail summary={true}/>},
]


const PatientRounds = [
  {title:'产妇每日身体评估',chiComponent:<InfantFeedingRecordsDetail urlAddress="puerpera-body" summary={true}/>},
]

const NurseAry = [
  {title:'婴儿成长记录单',chiComponent:<InfantFeedingRecordsDetail urlAddress="baby-grow" summary={true}/>},
  {title:'婴儿喂养记录单',chiComponent:<InfantFeedingRecordsDetail urlAddress="baby-feed" summary={true}/>},
  {title:'对内婴儿游泳预约单',chiComponent:<InsideBabySwimDetail  summary={true}/>},
]

let twoRef = false
let threeRef = false

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  callback(key){
    if(key == 2 && !twoRef){
      twoRef = true
      this.props.dispatch({type:'serviceCustomer/getMaternalEverydayPhysicalEvaluationList'})
    }
    if(key == 3 && !threeRef){
      threeRef = true
      this.props.dispatch({type:'serviceCustomer/getBabyFeedingNoteList'})
      this.props.dispatch({type:'serviceCustomer/getBabyGrowthNoteList'})
      this.props.dispatch({type:'serviceCustomer/getInsideBabySwimList'})
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type:'card/getLevelInfo',
    })
  }

  render() {
    const {loading,baseInfoDict} = this.props
    let baseInfoDivAry = detailComponent(baseInfoDict);
    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card noHovering={true} className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
          <Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="入住汇总" key="1">{ary.map(value=>{return creatSummaryCard(value)})}</TabPane>
            <TabPane tab="查房汇总" key="2">{PatientRounds.map(value=>{return creatSummaryCard(value)})}</TabPane>
            <TabPane tab="护理部" key="3">{NurseAry.map(value=>{return creatSummaryCard(value)})}</TabPane>
          </Tabs>
        </Card>
      </Spin>
    )
  }
}


function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(Detail) ;
