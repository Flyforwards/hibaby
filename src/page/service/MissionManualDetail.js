/**
 * Created by Flyforardds on 2017/8/21.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin,Row,Col,DatePicker } from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'
import { queryURL ,format} from '../../utils/index.js';

const manualKey =[
  {title:'正确洗手时机及方法',submitStr:'washHandsMethod'},
  {title:'恶露的观察',submitStr:'lochiaObservation'},
  {title:'便秘的预防',submitStr:'constipationPrevention'},
  {title:'产褥期出汗的原因',submitStr:'stegmonthSweatReason'},
  {title:'母婴同室的好处及注意事项',submitStr:'motherBabyRoomingBenefit'},
  {title:'新生儿睡眠安全',submitStr:'neonatalSleepSafety'},
  {title:'婴儿生理性体重下降说明',submitStr:'babyPhysiologicalWeightLossExplain'},
  {title:'新生儿黄疸知识',submitStr:'newbornJaundiceCommonSense'},
  {title:'乳房护理知识',submitStr:'breastNursingKnowledge'},
  {title:'母乳喂养的好处',submitStr:'breastMilkFeedBenefit'},
  {title:'正确的哺乳姿势及含接姿势',submitStr:'correctSucklingPosture'},
  {title:'擠奶技巧(手挤及吸奶器使用方法)',submitStr:'milkingSkills'},
  {title:'母乳的储存方法',submitStr:'breastMilkStorageMethod'},
  {title:'母乳的复温及解冻',submitStr:'breastMilkRewarmingThaw'},
];
const baseKey = [
  {title:'客户姓名',submitStr:'name'},
  {title:'年龄',submitStr:'age'},
  {title:'宝宝性别',submitStr:'babySex'},
  {title:'分娩日期',submitStr:'brithDate'},
  {title:'入住日期',submitStr:'checkDate'},
  {title:'房间',submitStr:'roomNo'},
]





class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }
  //
  // onDelete(){
  //   this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:1,dataId:this.props.CheckBeforeID}})
  // }
  //
  // editBtnClick(){
  //   this.props.dispatch(routerRedux.push(`/service/baby-nursing/edit?${location.search.substr(1)}`));
  // }
  //
  // backClicked(){
  //   this.props.dispatch(routerRedux.push('/service/baby-nursing'));
  // }

  editBackClicked(){
    this.props.dispatch(routerRedux.push('/service/baby-manual'));
  }

  print(){

  }

//日期选择框
  handleChange(value, dateString) {
   this.props.dispatch({
     type:'serviceCustomer/getBrouchurDetailById',
     payload:{
       dataId:queryURL('customerid'),
       date: dateString
     }
   })
  }
  // componentWillUnmount() {
  //   this.props.dispatch({type: 'serviceCustomer/removeData',})
  // }

  render() {
    const {loading,baseInfoDict} = this.props
    const MissionManualData = {
      "washHandsMethod":'是',
      "lochiaObservation":'是',
      "constipationPrevention":'是',
      "stegmonthSweatReason":'是',
      "operation":'鲁班',
      "time":'2017-12-08',
      "breastMilkRewarmingThaw":'',
      "breastMilkStorageMethod":''


    }

  //  let baseInfoDivAry = detailComponent(baseInfoDict)
    const baseMsgRow = manualKey.map(function(elem,index){
      if(MissionManualData && MissionManualData[elem.submitStr] != '' ) {
        return <Col span={8} style={{marginTop:'20px'}}>
            <span> {elem.title} : {MissionManualData[elem.submitStr]} </span>
          </Col>

      }else{
        return '';
      }
    });
    const baseInfoDivAry = baseKey.map(function(elem,index){
      if(baseInfoDict) {
        return <Col span={8} style={{marginTop:'20px'}}>
          <span> {elem.title} : {baseInfoDict[elem.submitStr]} </span>
        </Col>
      }
    });
    const bottomDiv = <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card title="宣教手册详情" extra={ <DatePicker onChange={this.handleChange.bind(this)} />} className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          <div style={{margin:'15px', width:'90%',margin:'0 auto',padding:'20px'}}>
            <h3>基本信息</h3>
            <Row>
              {baseInfoDivAry}
            </Row>
          </div>

          <Row style ={{width:'90%',margin:'0 auto',borderTop:'2px solid #e9e9e9',borderBottom:'2px solid #e9e9e9',padding:'20px'}}>
            {baseMsgRow}
            <Col span={24} style={{textAlign:'right',marginTop:'40px'}}>
              <Row>
                <Col span = {12}>
                  操作者: {MissionManualData.operation}
                </Col>
                <Col span ={12}>
                   {MissionManualData.time}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style ={{width:'90%',margin:'0 auto',borderTop:'2px solid #e9e9e9',borderBottom:'2px solid #e9e9e9',padding:'20px'}}>
            {baseMsgRow}
            <Col span={24} style={{textAlign:'right',marginTop:'40px'}}>
              <Row>
                <Col span = {12}>
                  操作者: {MissionManualData.operation}
                </Col>
                <Col span ={12}>
                  {MissionManualData.time}
                </Col>
              </Row>
            </Col>
          </Row>
          {bottomDiv}
        </Card>
      </Spin>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(DetailForm) ;
