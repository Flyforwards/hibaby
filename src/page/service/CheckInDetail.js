import React, { Component } from 'react';
import {CreatCard,creatButton} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux } from 'dva/router'

// 基本信息
const baseInfoAry = [
  {title:'客户姓名',component:'Input',submitStr:'name',disable:true,noRequired:true},
  {title:'年龄',component:'Input',submitStr:'age',disable:true,noRequired:true},
  {title:'宝宝性别',component:'gender',submitStr:'babySex',disable:true,noRequired:true},
  {title:'分娩日期',component:'DatePicker',submitStr:'brithDate',disable:true,noRequired:true},
  {title:'入住日期',component:'DatePicker',submitStr:'checkDate',disable:true,noRequired:true},
  {title:'房间',component:'Input',submitStr:'associatedRooms',disable:true,noRequired:true},
  {title:'分娩方式',component:'Input',submitStr:'health_1_radio_15'},
  {title:'会阴撕裂',component:'Select',chiAry:['无','Ⅰ度', 'Ⅱ度', 'Ⅲ度','Ⅳ度'],submitStr:'health_1_radio_16'},
  {title:'产程延长',component:'Input',submitStr:'baseInfo4'},
  {title:'剖宫产手术指证',component:'Input',submitStr:'health_1_input_5'},
  {title:'处理措施',component:'Select',chiAry:['宫缩剂','填宫纱'],submitStr:'baseInfo6'},
  {title:'胎膜早破',component:'InputGroup',unit:'小时',submitStr:'health_1_input_7'},
  {title:'产后出血',component:'InputGroup',unit:'ml',submitStr:'health_1_input_9'},
]


// 产后情况
const PostpartumSituationAry = [
  {title:'产后发热',component:'InputGroup',unit:'℃',submitStr:'input_10'},
  {title:'恶露异常',component:'RadioGroup',submitStr:'postpartum_0'},
  {title:'排尿困难',component:'RadioGroup',submitStr:'health_1_radio_30'},
  {title:'排便困难',component:'RadioGroup',submitStr:'health_1_radio_31'},
  {title:'初次吸吮',component:'Input',unit:'分钟',submitStr:'postpartum_1'},
  {title:'添加配方奶',component:'InputGroup',submitStr:'postpartum_2'},
  {title:'喂养方式',component:'CheckBoxGroup',checkAry:['纯母乳','混合','人工' ],submitStr:'postpartum_3'},
  {title:'哺乳问题',component:'CheckBoxGroup',checkAry:['无', '有', '乳头错觉', '疼痛', '乳房肿胀', '乳汁少', '乳汁多', '其他' ],submitStr:'postpartum_4'},
]

//入所查体
const checkInMedical = [
  {title:'血压',component:'Input',submitStr:'health_1_input_11'},
  {title:'体温',component:'Input',unit:'℃',submitStr:'health_1_input_12'},
  {title:'脉搏',component:'Input',unit:'次/分',submitStr:'medical_0'},
  {title:'孕前体重',component:'Input',unit:'kg',submitStr:'health_2_input_2'},
  {title:'分娩前体重',component:'Input',unit:'kg',submitStr:'medical_2'},
  {title:'孕期增重',component:'Input',unit:'kg',submitStr:'medical_3'},
  {title:'现体重',component:'Input',unit:'kg',submitStr:'health_2_input_3'},
  {title:'精神状态',component:'CheckBoxGroup',checkAry:[ '良好', '一般', '淡漠', '疲乏', '焦虑', '烦躁', '抑郁', '其他'],submitStr:'medical_5'},
  {title:'皮肤黏膜',component:'Select',chiAry:['红润', '一般', '苍白' ,'皮疹'],submitStr:'medical_6'},
  {title:'左乳房',component:'CheckBoxGroup',checkAry:['软' ,'充盈', '肿胀' ,'硬结'],submitStr:'medical_7'},
  {title:'左乳头',component:'CheckBoxGroup',checkAry:['凸', '平坦' ,'凹陷', '皲裂'],submitStr:'medical_8'},
  {title:'右乳房',component:'CheckBoxGroup',checkAry:['软' ,'充盈', '肿胀' ,'硬结'],submitStr:'medical_9'},
  {title:'右乳头',component:'CheckBoxGroup',checkAry:['凸', '平坦' ,'凹陷', '皲裂'],submitStr:'medical_11'},
  {title:'乳汁量',component:'Select',chiAry:['少', '中','多' ],submitStr:'medical_12'},
  {title:'副乳',component:'RadioGroup',submitStr:'medical_13'},
  {title:'腹部',component:'Select',chiAry:['平软', '腹胀','压痛','无', '有', ],submitStr:'medical_14'},
  {title:'外痔',component:'RadioGroup',submitStr:'medical_15'},
  {title:'下肢水肿',component:'RadioGroup',submitStr:'health_1_radio_29'},
  {title:'宫底高度',component:'Input',submitStr:'medical_16'},
  {title:'子宫收缩',component:'RadioGroups',radioAry:[{'name':'软','value':'0'},{'name':'硬','value':'1'}],submitStr:'medical_17'},
  {title:'会阴伤口愈合',component:'RadioGroups',radioAry:[{'name':'良好','value':'0'},{'name':'水肿','value':'1'},{'name':'血肿','value':'2'},{'name':'裂开','value':'3'},{'name':'感染','value':'4'}],submitStr:'health_1_radio_24'},
  {title:'腹部伤口愈合',component:'RadioGroups',radioAry:[{'name':'良好','value':'5'},{'name':'敷料覆盖未见渗出物','value':'6'},{'name':'红肿','value':'7'},{'name':'裂开','value':'8'},{'name':'感染','value':'9'}],submitStr:'health_1_radio_24',key:'radio_24_1'},
  {title:'恶露性质',component:'Select',chiAry:['血性', '浆液性', '白色'],submitStr:'medical_18'},
  {title:'恶露量',component:'Select',chiAry:['多', '中', '少'],submitStr:'medical_19'},
  {title:'异味',component:'RadioGroup',submitStr:'medical_20'},
  {title:'其他',component:'TextArea',span:24,submitStr:'medical_21'},
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

const type = 2;
class Detail extends Component {

  constructor(props) {
    super(props);
  }

  onDelete(){
    this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:type,dataId:this.props.CheckInID}})
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
        let dict = { "assessmentInfo": assessmentInfo, "customerId": parse(location.search.substr(1)).customerid,"type": type};
        if(this.props.CheckInID){
          dict.id = this.props.CheckInID
        }
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
      }
    });
  }

  componentWillUnmount() {

    this.props.dispatch({type: 'serviceCustomer/removeData'})
  }

  render() {

    const {loading} = this.props

    const ary = [{title:'基本信息',ary:baseInfoAry},{title:'产后情况',ary:PostpartumSituationAry},{title:'入所查体',ary:checkInMedical}, {title:'评估结论',ary:conclusionAry}]

    let chiAry = ary.map(value=>{
      value.netData = this.props.CheckInData?this.props.CheckInData:{}
      value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{}

      return CreatCard(this.props.form,value)
    })
    let bottomDiv = null;
    if(location.pathname === '/service/check-in/edit'){
      bottomDiv = (<div className='button-group-bottom-common'>
                    {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
                  </div>);
    }else if(this.props.CheckInID){
      bottomDiv = (
        <div className='button-group-bottom-common'>
          {creatButton('返回',this.backClicked.bind(this))}
          {creatButton('删除',this.onDelete.bind(this))}
          {creatButton('编辑',this.editBtnClick.bind(this))}
          {creatButton('打印',this.print.bind(this))}
        </div>
      );
    }else{
      bottomDiv = (
        <div className='button-group-bottom-common'>
          {creatButton('返回',this.backClicked.bind(this))}
          {creatButton('编辑',this.editBtnClick.bind(this))}
          {creatButton('打印',this.print.bind(this))}
        </div>
      );
    }
    return (
      <Spin key="CheckIn" spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>

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
