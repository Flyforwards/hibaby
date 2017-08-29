import React, { Component } from 'react';
import {CreatCard,creatButton} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

// 基本信息
const baseInfoAry = [
  {title:'客户姓名',component:'Input',submitStr:'name',disable:true},
  {title:'年龄',component:'Input',submitStr:'age',disable:true},
  {title:'宝宝性别',component:'gender',submitStr:'babySex',disable:true},
  {title:'分娩日期',component:'DatePicker',submitStr:'brithDate',disable:true},
  {title:'入住日期',component:'DatePicker',submitStr:'checkDate',disable:true},
  {title:'房间',component:'Input',submitStr:'associatedRooms',disable:true},
  {title:'产次',component:'Input',selectName:'FETUS',submitStr:'fetus',disable:true},
  {title:'孕次',component:'Input',selectName:'GRAVIDITY',submitStr:'gravidity',disable:true},
  {title:'孕周',component:'InputNumber',submitStr:'gestationalWeeks',disable:true},
  {title:'分娩医院',component:'Input',selectName:'Hospital',submitStr:'hospital',disable:true},
  {title:'产妇电话',component:'InputNumber',submitStr:'contact',disable:true},
  {title:'家属电话',component:'InputNumber',submitStr:'contact_1'},
]


// 既往史
const PastMedicalHistoryAry = [
  {title:'既往疾病史',component:'TextAreaGroup',span:24,submitStr:'input_0'},
  {title:'既往手术史',component:'TextAreaGroup',span:24,submitStr:'input_1'},
]

// 孕期合并症
const PregnancyComplicationsAry = [
  {title:'乙肝病毒感染或携带',component:'Select',chiAry:['否','大三阳', '小三阳', '单纯表面抗原阳性'],submitStr:'radio_6'},
  {title:'丙肝病毒感染或携带',component:'RadioGroup',submitStr:'radio_7'},
  {title:'梅毒感染或携带',component:'RadioGroup',submitStr:'radio_8'},
  {title:'艾滋病毒感染或携带',component:'RadioGroup',submitStr:'radio_9'},
  {title:'高血压',component:'InputGroup',unit:'mmHg',submitStr:'input_2'},
  {title:'贫血',component:'RadioGroup',submitStr:'radio_11'},
  {title:'糖尿病',component:'RadioGroup',submitStr:'radio_12'},
  {title:'子宫肌瘤',component:'RadioGroup',submitStr:'radio_13'},
  {title:'甲状腺功能减退',component:'InputGroup',span:24,submitStr:'radio_14',placeholder:'用药'},
]

// 产后情况
const PostpartumSituationAry = [
  {title:'产后清宫',component:'RadioGroup',submitStr:'radio_21'},
  {title:'产后出血',component:'InputGroup',unit:'ml',submitStr:'input_9'},
  {title:'血压异常',component:'Select',chiAry:['无','160/100mmHg', '85/45mmHg'],submitStr:'input_18'},
  {title:'会阴伤口',component:'Select',chiAry:['正常','水肿', '血肿', '裂开','感染'],submitStr:'radio_24'},
  {title:'腹部伤口',component:'Select',chiAry:['正常','红肿', '裂开','感染'],submitStr:'radio_24_1'},
  {title:'产后发热',component:'InputGroup',unit:'℃',submitStr:'input_10'},
  {title:'乳房肿胀',component:'RadioGroup',submitStr:'radio_27'},
  {title:'下肢水肿',component:'RadioGroup',submitStr:'radio_29'},
  {title:'排尿困难',component:'RadioGroup',submitStr:'radio_30'},
  {title:'排便困难',component:'RadioGroup',submitStr:'radio_31'},
  {title:'其他',component:'TextArea',span:24,submitStr:'input_11'},
]

// 新生儿情况
const newbornAry = [
  {title:'性别',component:'gender',submitStr:'babySex'},
  {title:'出生体重',component:'Input',unit:'g',submitStr:'babyWeight'},
  {title:'出生身长',component:'Input',unit:'cm',submitStr:'babyLength'},
  {title:'Apgar评分',component:'Input',unit:'分',submitStr:'select_0'},
  {title:'喂养方式',component:'Select',chiAry:['纯母乳','混合', '人工'],submitStr:'radio_33'},
  {title:'产时胎心异常',component:'Select',chiAry:['无','胎心快', '胎心慢'],submitStr:'radio_34'},
  {title:'高胆红素血症',component:'RadioGroup',submitStr:'radioNam_35'},
  {title:'蓝光治疗史',component:'InputGroup',unit:'小时',submitStr:'input_14'},
  {title:'羊水污染',component:'Select',chiAry:['无','1度', '2度','3度'],submitStr:'radio_37'},
  {title:'排便困难',component:'RadioGroup',submitStr:'radio_31_1'},
  {title:'出生后窒息',component:'RadioGroup',submitStr:'radio_41'},
  {title:'呼吸困难',component:'RadioGroup',submitStr:'radio_40'},
  {title:'新生儿肺炎',component:'RadioGroup',submitStr:'radio_42'},
  {title:'发热史',component:'InputGroup',unit:'℃',submitStr:'input_15'},
  {title:'心脏杂音',component:'RadioGroup',submitStr:'radio_43'},
  {title:'尿量少',component:'RadioGroup',submitStr:'radio_45'},
  {title:'尿结晶',component:'RadioGroup',submitStr:'radio_46'},
  {title:'皮疹',component:'RadioGroup',submitStr:'radio_44'},
  {title:'其他',component:'TextArea',span:24,submitStr:'input_17'},
]

// 新生儿情况
const newbornTwoAry = [
  {title:'特殊注意事项',component:'TextArea',span:24,submitStr:'newborn_0'},
  {title:'评估结论',component:'TextArea',span:24,submitStr:'newborn_1'},
  {title:'特殊提示',component:'TextArea',span:24,submitStr:'newborn_2'},
  {title:'评估者',component:'Input',span:6,submitStr:'newborn_3'},
  {title:'评估时间',component:'DatePicker',offset:12,span:6,submitStr:'newborn_4'},
]

class motherDiv extends React.Component{

  constructor(props) {
    super(props);
    this.state={}
  }

  radioChange(e) {
    this.setState({childbirth:e.target.value})
  }

  render() {
    let hide = 2
    if (this.props.CheckBeforeData) {
      if (this.props.CheckBeforeData.radio_15) {
        hide = this.props.CheckBeforeData.radio_15 == 0 ? true : false;
      }
    }
    if (this.state.childbirth) {
      hide = this.state.childbirth == 1 ? false : true;
    }

    // 分娩过程
    const DeliveryProcessAry = [
      {
        title: '分娩方式',
        component: 'RadioGroups',
        submitStr: 'radio_15',
        radioAry: [{'name': '自然分娩', 'value': '0'}, {'name': '剖宫产', 'value': '1'}],
        fun: this.radioChange.bind(this)
      },
      {
        title: '手术指征',
        component: 'Input',
        submitStr: 'input_5',
        span: 18,
        hide: hide === 2 ? true : hide,
        noRequired: hide === 2 ? false : hide
      },
      {
        title: '侧切',
        component: 'RadioGroup',
        submitStr: 'radio_15_1',
        hide: hide === 2 ? true : !hide,
        noRequired: hide === 2 ? false : !hide
      },
      {
        title: '会阴撕裂',
        component: 'Select',
        chiAry: ['无', 'Ⅰ度', 'Ⅱ度', 'Ⅲ度', 'Ⅳ度'],
        submitStr: 'radio_16',
        hide: hide === 2 ? true : !hide,
        noRequired: hide === 2 ? false : !hide
      },
      {title: '产时出血', component: 'InputGroup', unit: 'ml', submitStr: 'input_6'},
      {title: '胎盘早破', component: 'InputGroup', unit: '小时', submitStr: 'input_7'},
      {title: '前置胎盘', component: 'RadioGroup', submitStr: 'radio_18'},
      {title: '胎盘早剥', component: 'RadioGroup', submitStr: 'radio_19'},
      {title: '胎盘残留', component: 'RadioGroup', submitStr: 'radio_20'},
      {title: '其他', component: 'TextArea', span: 24, submitStr: 'input_8'},
    ]

    const { summary, CheckBeforeData, baseInfoDict} = this.props

    const ary = [{title: summary ? "" : '基本信息', ary: summary ? baseInfoAry.slice(6) : baseInfoAry}, {
      title: '既往史',
      ary: PastMedicalHistoryAry
    }, {title: '孕期合并症', ary: PregnancyComplicationsAry},
      {title: '分娩过程', ary: DeliveryProcessAry}, {title: '产后情况', ary: PostpartumSituationAry}]

    let chiAry = ary.map(value => {
      value.netData = CheckBeforeData ? CheckBeforeData : {}
      value.baseInfoDict = baseInfoDict ? baseInfoDict : {}
      return CreatCard(this.props.form, value)
    })

    return (
      <div>{chiAry}</div>
    )
  }
}

function childDiv(props) {
  const {form,CheckBeforeData,baseInfoDict} = props

  const ary = [{title:'新生儿情况',ary:newbornAry},{title:'新生儿情况',ary:newbornTwoAry}]

  let chiAry = ary.map(value=>{
    value.netData = CheckBeforeData?CheckBeforeData:{}
    value.baseInfoDict = baseInfoDict?baseInfoDict:{}
    return CreatCard(form,value)
  })

  return(<div>{chiAry}</div>)
}

const ChildForm = Form.create()(childDiv);
const MotherForm = Form.create()(motherDiv);

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  onDelete(){
    this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:1,dataId:this.props.CheckBeforeID}})
  }

  editBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/check-before/edit?customerid=${parse(location.search.substr(1)).customerid}&id=${this.props.CheckBeforeID}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/check-before'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/check-before/detail?customerid=${parse(location.search.substr(1)).customerid}`));
  }

  print(){

  }

  submitClicked(){
    this.refs.MotherForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        Object.keys(values).map(key=>{
          if(values[key]){
            if(typeof values[key] === 'object'){
              values[key] = values[key].format()
            }
          }
        })
        const assessmentInfo =  JSON.stringify(values);

        let dict = { "assessmentInfo": assessmentInfo, "customerId": parse(location.search.substr(1)).customerid,"type": 1,operatorItem :1};

        if(this.props.CheckBeforeID){
          dict.id = this.props.CheckBeforeID
        }
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
      }
    });

    this.refs.ChildForm.validateFieldsAndScroll((err, values) => {
      if (!err) {

        Object.keys(values).map(key=>{
          if(values[key]){
            if(typeof values[key] === 'object'){
              values[key] = values[key].format()
            }
          }
        })

        const {babyLength,babySex,babyWeight} = values

        const assessmentInfo =  JSON.stringify(values);

        let dict = { "assessmentBabyInfo": assessmentInfo, "customerId": parse(location.search.substr(1)).customerid,"type": 1,
          babyLength,babySex,babyWeight};

        console.log(dict)
        this.props.dispatch({type:'serviceCustomer/saveAssessmentBabyInfo',payload:dict})
      }
    });

  }

  componentWillUnmount() {/**/
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }


  render() {

    const {loading, summary} = this.props

    const bottomDiv = location.pathname === '/service/check-before/edit' ?
      <div className='button-group-bottom-common'>
        {creatButton('返回', this.editBackClicked.bind(this))}{creatButton('确定', this.submitClicked.bind(this))}
      </div> :
      <div className='button-group-bottom-common'>
        {creatButton('返回', this.backClicked.bind(this))}{this.props.CheckBeforeData ? creatButton('删除', this.onDelete.bind(this)) : ''}
        {creatButton('编辑', this.editBtnClick.bind(this))}{creatButton('打印', this.print.bind(this))}
      </div>

    return (
      <Spin
        spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
        <Card className='CheckBeforeInput' style={{width: '100%'}} bodyStyle={{padding: (0, 0, '20px', 0)}}>
          <MotherForm ref="MotherForm" {...this.props}/>
          <ChildForm ref="ChildForm" {...this.props}/>
          {summary ? '' : bottomDiv}
        </Card>
      </Spin>
    )
  }
}

function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(Detail) ;
