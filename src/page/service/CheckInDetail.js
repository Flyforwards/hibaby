import React, { Component } from 'react';
import {CreatCard,creatButton} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux } from 'dva/router'

// 基本信息
const baseInfoAry = [
  {title:'客户姓名',component:'Input',submitStr:'name'},
  {title:'年龄',component:'Input',submitStr:'age'},
  {title:'宝宝性别',component:'gender',submitStr:'radio_32'},
  {title:'分娩日期',component:'DatePicker',submitStr:'baseInfo1'},
  {title:'入住日期',component:'DatePicker',submitStr:'baseInfo2'},
  {title:'房间',component:'Input',submitStr:'baseInfo3'},

  {title:'分娩方式',component:'Input',submitStr:'radio_15'},//new
  {title:'会阴撕裂',component:'Select',chiAry:['无','Ⅰ度', 'Ⅱ度', 'Ⅲ度','Ⅳ度'],submitStr:'radio_16'},
  {title:'产程延长',component:'Input',submitStr:'baseInfo4'},//new
  {title:'剖宫产手术指证',component:'Input',submitStr:'baseInfo5'},//new
  {title:'处理措施',component:'Input',submitStr:'baseInfo6'},//new
  {title:'胎膜早破',component:'InputGroup',unit:'小时',submitStr:'input_7'},
  {title:'产后出血',component:'InputGroup',unit:'ml',submitStr:'input_9'},
]


// 产后情况
const PostpartumSituationAry = [
  {title:'产后发热',component:'InputGroup',unit:'℃',submitStr:'input_10'},
  {title:'恶露异常',component:'InputGroup',unit:'℃',submitStr:'postpartum_0'},//new
  {title:'排尿困难',component:'RadioGroup',submitStr:'radio_30'},
  {title:'排便困难',component:'RadioGroup',submitStr:'radio_31'},
  {title:'初次吸吮',component:'Input',submitStr:'postpartum_1'},//new
  {title:'添加配方奶',component:'Input',submitStr:'postpartum_2'},//new
  {title:'哺乳问题',component:'Input',submitStr:'postpartum_3'},//new
]

//入所查体
const checkInMedical = [
  {title:'血压',component:'Select',chiAry:['无','160/100mmHg', '85/45mmHg'],submitStr:'input_18'},
  {title:'体温',component:'Input',unit:'℃',submitStr:'input_12'},
  {title:'脉搏',component:'Input',submitStr:'medical_0'},
  {title:'孕前体重',component:'Input',unit:'kg',submitStr:'medical_1'},
  {title:'分娩前体重',component:'Input',unit:'kg',submitStr:'medical_2'},
  {title:'孕期增重',component:'Input',unit:'kg',submitStr:'medical_3'},
  {title:'现体重',component:'Input',unit:'kg',submitStr:'medical_4'},
  {title:'精神状态',component:'Input',submitStr:'medical_5'},
  {title:'皮肤黏膜',component:'Input',submitStr:'medical_6'},
  {title:'左乳房',component:'Input',submitStr:'medical_7'},
  {title:'左乳头',component:'Input',submitStr:'medical_8'},
  {title:'右乳房',component:'Input',submitStr:'medical_9'},
  {title:'硬结',component:'Input',submitStr:'medical_10'},
  {title:'右乳头',component:'Input',submitStr:'medical_11'},
  {title:'乳汁量',component:'Input',submitStr:'medical_12'},
  {title:'副乳',component:'Input',submitStr:'medical_13'},
  {title:'腹部',component:'Input',submitStr:'medical_14'},
  {title:'外痔',component:'Input',submitStr:'medical_15'},
  {title:'下肢水肿',component:'RadioGroup',submitStr:'radio_29'},
  {title:'宫底高度',component:'Input',submitStr:'medical_16'},
  {title:'子宫压痛',component:'Input',submitStr:'medical_17'},
  {title:'会阴伤口愈合',component:'Input',submitStr:'medical_18'},
  {title:'腹部伤口愈合',component:'Input',submitStr:'medical_19'},
  {title:'恶露性质',component:'Input',submitStr:'medical_20'},
  {title:'恶露量',component:'Input',submitStr:'medical_21'},
  {title:'异味',component:'Input',submitStr:'medical_22'},
  {title:'其他',component:'TextArea',span:24,submitStr:'medical_23'},
]


// 评估结论
const conclusionAry = [
  {title:'备注',component:'TextArea',span:24,submitStr:'conclusion_0'},
  {title:'产妇关注问题',component:'TextArea',span:24,submitStr:'conclusion_1'},
  {title:'医院带药',component:'TextArea',span:24,submitStr:'conclusion_2'},
  {title:'重点注意事项',component:'TextArea',span:24,submitStr:'conclusion_3'},
  {title:'评估者',component:'Input',span:6,submitStr:'conclusion_4'},
  {title:'评估时间',component:'DatePicker',offset:12,span:6,submitStr:'conclusion_5'},
]

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  onDelete(){

  }

  editBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/check-in/edit?${location.search.substr(1)}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/check-in'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/check-in/detail?${location.search.substr(1)}`));
  }

  print(){

  }

  submitClicked(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const assessmentInfo =  JSON.stringify(values);
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:{ "assessmentInfo": assessmentInfo, "customerId": 16,'id':1, "type": 1}})
      }
    });
  }

  render() {

    const {loading} = this.props

    const ary = [{title:'基本信息',ary:baseInfoAry},{title:'产后情况',ary:PostpartumSituationAry},{title:'入所查体',ary:checkInMedical}, {title:'评估结论',ary:conclusionAry}]

    let chiAry = ary.map(value=>{
      value.netData = this.props.CheckBeforeData
      return CreatCard(this.props.form,value)
    })


    const bottomDiv = location.pathname === '/service/check-before/edit' ?
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div> :
       <div className='button-group-bottom-common'>
        {creatButton('返回',this.backClicked.bind(this))}{creatButton('删除',this.onDelete.bind(this))}
        {creatButton('编辑',this.editBtnClick.bind(this))}{creatButton('打印',this.print.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>

        <Card className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {chiAry}

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
