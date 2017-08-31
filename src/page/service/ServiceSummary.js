/**
 *  婴儿护理记录单详情
 * Created by yangjingjing on 2017/8/21.
 */
import React, { Component } from 'react';
import { detailComponent } from './ServiceComponentCreat'
import { Card, Input, Form, Button, Spin, Tabs, Col } from 'antd';
import { connect } from 'dva';
import CheckBeforeDetail from './CheckBeforeDetail'
import CheckInDetail from './CheckInDetail'
import ChildCheckIndexDetailCopy from './ChildCheckIndexDetailCopy'
import NutritionEvaluateDetail from './NutritionEvaluateDetail'
import DiagnosisDetail from './diagnosisDetail'
import InfantFeedingRecordsDetail from './InfantFeedingRecordsDetail'
import InsideBabySwimDetail from './InsideBabySwimDetail'
import ObstetricRecordDetail from './ObstetricRecordDetail'
import MissionManualDetail from './MissionManualDetail'
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
const TabPane = Tabs.TabPane;
import { routerRedux, Link } from 'dva/router'
import CheckRoomDetail from './checkRoomDetail'
import ChildrenCheckRoomDetail from './childrenCheckRoomDetail'
import EdinburghBirthDetail from './edinburghBirthDetail'

let twoRef = false
let threeRef = false

const divAry = {
  ary: [
    { title: '入住前评估', chiComponent: <CheckBeforeDetail summary={true}/> ,pathName:'check-before',operatorItem:1},
    { title: '产妇入住评估', chiComponent: <CheckInDetail summary={true}/>,pathName:'check-in' ,operatorItem:2},
    { title: '婴儿入住评估单', chiComponent: <ChildCheckIndexDetailCopy summary={true}/>,pathName:'child-check-in' ,operatorItem:3},
    { title: '营养部产后入住评估表', chiComponent: <NutritionEvaluateDetail summary={true}/> ,pathName:'nutrition-evaluate',operatorItem:17},
    { title: '中医见诊记录单', chiComponent: <DiagnosisDetail summary={true}/>,pathName:'diagnosis',operatorItem:4 }
  ],
  PatientRounds: [
    { title: '儿科查房记录单', chiComponent: <ChildrenCheckRoomDetail/> ,operatorItem:5},
    { title: '婴儿护理记录单', chiComponent: <ObstetricRecordDetail summary={true}/> ,operatorItem:9},
    { title: '中医查房记录单', chiComponent: <CheckRoomDetail type={2}/> ,operatorItem:6},
    { title: '产科医师查房记录单', chiComponent: <CheckRoomDetail type={3}/> ,operatorItem:7},
    { title: '管家查房记录表', chiComponent: <CheckRoomDetail type={5}/>,operatorItem:16 },
    { title: '营养师查房记录单', chiComponent: <CheckRoomDetail type={6}/> ,operatorItem:18},
    { title: '产妇每日身体评估', chiComponent: <InfantFeedingRecordsDetail urlAddress="puerpera-body" summary={true}/> ,operatorItem:8}
  ],

  NurseAry: [
    { title: '爱丁堡忧郁单', chiComponent: <EdinburghBirthDetail /> ,pathName:'edinburgh-birth',operatorItem:12},
    { title: '婴儿成长记录单', chiComponent: <InfantFeedingRecordsDetail urlAddress="baby-grow" summary={true}/>,pathName:'baby-grow',operatorItem:14},
    { title: '宣教手册', chiComponent: <MissionManualDetail summary={true}/>,pathName:'baby-manual',operatorItem:10},
    { title: '婴儿喂养记录单', chiComponent: <InfantFeedingRecordsDetail urlAddress="baby-feed" summary={true}/>,pathName:'baby-feed',operatorItem:13},
    { title: '对内婴儿游泳预约单', chiComponent: <InsideBabySwimDetail summary={true}/>,pathName:'baby-swimming' ,operatorItem:15}
  ]
}

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  getJournal(type){
    this.props.dispatch({type:'serviceCustomer/getJournal',payload:{type:type}})
  }

  callback(key) {


    if (key == 2 && !twoRef) {
      twoRef = true
      this.props.dispatch({ type: 'serviceCustomer/getMaternalEverydayPhysicalEvaluationList' })
      //查房汇总
      const param = parse(location.search.substr(1));
      const { customerid } = param;
      const postInfo = [
        { customerId: parseInt(customerid), type: 2, operatorItem: 6 },//中医查房
        { customerId: parseInt(customerid), type: 3, operatorItem: 7 },//产科查房
        { customerId: parseInt(customerid), type: 5, operatorItem: 16 },//管家查房
        { customerId: parseInt(customerid), type: 6, operatorItem: 18 },//营养查房
      ];
      postInfo.map((v, k) => {
        this.props.dispatch({
          type: 'serviceCustomer/getdoctornoteListSum',
          payload: v
        })
      })
      this.getJournal(key)

    }
    if (key == 3 && !threeRef) {
      threeRef = true
      this.props.dispatch({ type: 'serviceCustomer/getBabyFeedingNoteList' })
      this.props.dispatch({ type: 'serviceCustomer/getBabyGrowthNoteList' })
      this.props.dispatch({ type: 'serviceCustomer/getInsideBabySwimList' })
      this.getJournal(key)
    }
  }

  componentDidMount() {
    this.props.dispatch({type: 'card/getLevelInfo'})
    this.getJournal(1)
  }

  changeCard(dict, superAry,Journal,act) {


    let tempIndex = dict.index

    let tempary = [...superAry]

    if(act.act === 'up'){
      tempary[tempIndex - 1] = tempary.splice(tempIndex, 1, tempary[tempIndex - 1])[0]
    }
    else {
      tempary[tempIndex + 1] = tempary.splice(tempIndex, 1, tempary[tempIndex + 1])[0]
    }

    this.props.dispatch({type:'serviceCustomer/updateJournal',payload:{id:Journal.id,userId:Journal.userId,type:Journal.type,turn:tempary.join(',')}})

  }

  clickDetail( dict) {
    const param = parse(location.search.substr(1));
    const { customerid } = param;
    this.props.dispatch(routerRedux.push(`/service/${dict.pathName}/detail?customerid=${customerid}`));
  }

  creatSummaryCard(dict, superAry,Journal) {
    const { title, chiComponent ,index} = dict;

    const self = this

    function rightDiv() {
      return (
        <div>
          <Button onClick={() => self.clickDetail( dict)} className="rightBth" shape="circle" icon="search"/>
          {index == superAry.length-1  ? '' :
            <Button onClick={() => self.changeCard(dict,superAry,Journal,{act:'down'})} className="rightBth" icon="arrow-down"/>}
          {index == 0 ? '' :
            <Button onClick={() => self.changeCard(dict,superAry,Journal,{act:'up'})} className="rightBth" icon="arrow-up"/>}
        </div>
      )
    }


    return (
      <Card key={title} className='summary' noHovering={true} title={title} bodyStyle={{ padding: 0 }} extra={rightDiv()} style={{
        marginTop: '10px',
        width: '100%'
      }}>
        {chiComponent}
      </Card>
    )
  }

  render() {

    const { ary, PatientRounds, NurseAry } = divAry
    const {Journal1,Journal2,Journal3} = this.props

    const arr1 = Journal1?Journal1.turn.split(","):[]
    const arr2 = Journal2?Journal2.turn.split(","):[]
    const arr3 = Journal3?Journal3.turn.split(","):[]


    const { loading, baseInfoDict } = this.props
    let baseInfoDivAry = detailComponent(baseInfoDict);
    return (
      <Spin spinning={loading.effects['serviceCustomer/getJournal'] !== undefined ? loading.effects['serviceCustomer/getJournal'] : false}>
        <Card noHovering={true} className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding: (0, 0, '20px', 0) }}>
          {baseInfoDivAry}
          <Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="入住汇总" key="1">
              {arr1.map((num,index)=>{
                let div = ''
                ary.map(value => {
                  if(value.operatorItem == num) {
                    div = this.creatSummaryCard(value, arr1,Journal1)
                    value.index = index
                  }})
                return div
              })}
            </TabPane>

            <TabPane tab="查房汇总" key="2">
              {arr2.map((num,index)=>{
                let div = ''
                PatientRounds.map(value => {
                  if(value.operatorItem == num) {
                    div = this.creatSummaryCard(value, arr2,Journal2)
                    value.index = index
                  }})
                return div
              })}
            </TabPane>

            <TabPane tab="护理部" key="3">
              {arr3.map((num,index)=>{
                let div = ''
                NurseAry.map(value => {
                  if(value.operatorItem == num) {
                    div = this.creatSummaryCard(value, arr3,Journal3)
                    value.index = index
                  }})

                return div
              })}

            </TabPane>
          </Tabs>
        </Card>
      </Spin>
    )
  }
}


function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}

export default connect(mapStateToProps)(Detail) ;
