/**
 * Created by Flyforardds on 2017/8/21.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin,Row,Col,DatePicker } from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import moment from 'moment'
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
  deleteClick(elem) {
    this.props.dispatch({
      type:'serviceCustomer/deleteBrouchurById',
      payload:{
        'dataId':elem.id,
        'operatorItem':10
      }
    })
  }

  onEdit(elem) {
    this.props.dispatch(routerRedux.push(`/service/baby-manual/edit?customerid=${elem.customerId}&dataId=${elem.id}`));
  }

  onCreate(){
    this.props.dispatch(routerRedux.push(`/service/baby-manual/create?customerid=${parse(location.search.substr(1)).customerid}`));
  }
  print(){

  }

//日期选择框
  handleChange(value, dateString) {
   this.props.dispatch({
     type:'serviceCustomer/getBrouchurDetailList',
     payload:{
       customerId:queryURL('customerid'),
       date: dateString,
       operatorItem:10
     }
   })
  }
  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {
    const {loading,baseInfoDict,summary,MissionManualDetailList} = this.props;
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
      if(MissionManualDetailList && MissionManualDetailList[elem.submitStr] != '' ) {
        return <Col span={8} style={{marginTop:'20px'}}>
            <span> {elem.title} : {MissionManualDetailList[elem.submitStr]} </span>
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
      {creatButton('创建',this.onCreate.bind(this))}
      </div>
    const _this = this;
    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card title={summary?'':"宣教手册详情"} extra={summary?'': <DatePicker onChange={this.handleChange.bind(this)} />} className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {summary?"":<div style={{margin:'15px', width:'90%',margin:'0 auto',padding:'20px'}}>
            <h3>基本信息</h3>
            <Row>
              {baseInfoDivAry}
            </Row>
          </div>}
          {
            MissionManualDetailList ? MissionManualDetailList.map(function(elem,index){
              return(
                <Row style ={{width:'90%',margin:'0 auto',borderTop:'2px solid #e9e9e9',borderBottom:'2px solid #e9e9e9',padding:'20px'}}>
                  { manualKey.map(function(v,index){
                    if(elem && elem[v.submitStr] != '' ) {
                      return <Col span={8} style={{marginTop:'20px'}}>
                        <span> {v.title} : {elem[v.submitStr] == 1 ? '是': '否'} </span>
                      </Col>

                    }else{
                      return '';
                    }
                  })}
                  <Col span={24} style={{marginTop:'40px'}}>
                    <Row>
                      <Col span = {8}>
                        操作者: {elem.operator}
                      </Col>
                      <Col span ={8}>
                        {moment(elem.operatorTime).format('YYYY-MM-DD HH:mm')}
                      </Col>
                      <Col span={8}>
                        {creatButton('删除',()=>{_this.deleteClick(elem)})}
                        {creatButton('编辑',()=>{_this.onEdit(elem)})}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )
            }):''
          }
          {/*<Row style ={{width:'90%',margin:'0 auto',borderTop:'2px solid #e9e9e9',borderBottom:'2px solid #e9e9e9',padding:'20px'}}>*/}
            {/*{baseMsgRow}*/}
            {/*<Col span={24} style={{textAlign:'right',marginTop:'40px'}}>*/}
              {/*<Row>*/}
                {/*<Col span = {12}>*/}
                  {/*操作者: {MissionManualDetailList ? MissionManualDetailList.operation : ''}*/}
                {/*</Col>*/}
                {/*<Col span ={12}>*/}
                   {/*{MissionManualDetailList ? MissionManualDetailList.time : ''}*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Col>*/}
          {/*</Row>*/}


          {/*<Row style ={{width:'90%',margin:'0 auto',borderTop:'2px solid #e9e9e9',borderBottom:'2px solid #e9e9e9',padding:'20px'}}>*/}
            {/*{baseMsgRow}*/}
            {/*<Col span={24} style={{textAlign:'right',marginTop:'40px'}}>*/}
              {/*<Row>*/}
                {/*<Col span = {12}>*/}
                  {/*操作者: {MissionManualDetailList ? MissionManualDetailList.operation :''}*/}
                {/*</Col>*/}
                {/*<Col span ={12}>*/}
                  {/*{MissionManualDetailList ? MissionManualDetailList.time:''}*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Col>*/}
          {/*</Row>*/}


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
