/**
 * Created by Flyforwards on 2017/11/1.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './../ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

const manual = [
  {title:'正确洗手时机及方法', noRequired: true,span:9,component:'Switch',submitStr:'washHandsMethod'},
  {title:'恶露的观察', noRequired: true,span:9,component:'Switch',submitStr:'lochiaObservation'},
  {title:'便秘的预防', noRequired: true,span:9,component:'Switch',submitStr:'constipationPrevention'},
  {title:'产褥期出汗的原因', noRequired: true,span:9,component:'Switch',submitStr:'stegmonthSweatReason'},
  {title:'母婴同室的好处及注意事项', noRequired: true,span:9,component:'Switch',submitStr:'motherBabyRoomingBenefit'},
  {title:'新生儿睡眠安全', noRequired: true,span:9,component:'Switch',submitStr:'neonatalSleepSafety'},
  {title:'婴儿生理性体重下降说明', noRequired: true,span:9,component:'Switch',submitStr:'babyPhysiologicalWeightLossExplain'},
  {title:'新生儿黄疸知识', noRequired: true,span:9,component:'Switch',submitStr:'newbornJaundiceCommonSense'},
  {title:'乳房护理知识', noRequired: true,span:9,component:'Switch',submitStr:'breastNursingKnowledge'},
  {title:'母乳喂养的好处', noRequired: true,span:9,component:'Switch',submitStr:'breastMilkFeedBenefit'},
  {title:'正确的哺乳姿势及含接姿势', noRequired: true,span:9,component:'Switch',submitStr:'correctSucklingPosture'},
  {title:'擠奶技巧(手挤及吸奶器使用方法)', noRequired: true,span:9,component:'Switch',submitStr:'milkingSkills'},
  {title:'母乳的储存方法', noRequired: true,span:9,component:'Switch',submitStr:'breastMilkStorageMethod'},
  {title:'母乳的复温及解冻', noRequired: true,span:9,component:'Switch',submitStr:'breastMilkRewarmingThaw'},
//{title:'操作者',span:9,component:'Input',submitStr:'operator'},
]


class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={
    }
  }

  onDelete(){

  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/baby-manual/detail?customerid=${parse(location.search.substr(1)).customerid}`));
  }

  print(){

  }

  submitClicked(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).map(key => {
          if(values[key] == true){
            values[key] = "1"
          }
          if(values[key] == undefined) {
            values[key] = "0"
          }
        })
        if(this.props.MissionManualData){
          values.id = this.props.MissionManualData.id;
        }
        values.customerId = parse(location.search.substr(1)).customerid;
        values.operatorItem = 10;
        this.props.dispatch({
          type:'serviceCustomer/saveBrouchurs',
          payload:{
            ...values,
          }
        })
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {

    const {loading,baseInfoDict,MissionManualData} = this.props

    let ary = manual;

    let baseInfoDivAry = detailComponent(baseInfoDict)

    const bottomDiv =
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='detailDiv' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
          {CreatCard(this.props.form,{title:'宣教手册',ary:ary,netData:MissionManualData?MissionManualData:{}})}
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
