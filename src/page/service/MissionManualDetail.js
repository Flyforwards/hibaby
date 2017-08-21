/**
 * Created by Flyforardds on 2017/8/21.
 */
/**
 *  婴儿护理记录单详情
 * Created by yangjingjing on 2017/8/21.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

const assessment = [
  {title:'体温',component:'Input',submitStr:'temperature',unit:'℃'},
  {title:'脉搏',component:'Input',unit:'ml',submitStr:'pulse',unit:'次/分'},
  {title:'呼吸',component:'Input',submitStr:'breathing',unit:'次/分'},
  {title:'体重',component:'Input',submitStr:'weight',unit:'g'},
  {title:'身长',component:'Input',submitStr:'length',unit:'cm'},
  {title:'脐带',component:'Input',submitStr:'umbilicalCord'},
  {title:'黄疸',component:'Input',unit:'mg/dl',submitStr:'jaundice'},
  {title:'托管状态',component:'Select',chiAry:['托管','未托管'],submitStr:'towState'},
  {title:'托管起始',component:'Input',submitStr:'towStart'},
  {title:'操作人',component:'Input',submitStr:'operator'},
  {title:'操作时间',component:'DatePicker',submitStr:'operatorTime'}
]
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



  // componentWillUnmount() {
  //   this.props.dispatch({type: 'serviceCustomer/removeData',})
  // }

  render() {
    const {loading,baseInfoDict} = this.props
    let baseInfoDivAry = detailComponent(baseInfoDict)
    const baseMsgRow ='';
    const bottomDiv = <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
          {baseMsgRow}
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
