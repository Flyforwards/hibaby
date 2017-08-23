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
  {title:'睡眠状态',component:'Select',chiAry:['良好','一般', '不佳'],submitStr:'input1'},
  {title:'泌乳情况',component:'Select',chiAry:['充足','正常', '不足'],submitStr:'input2'},
  {title:'食欲情况',component:'Select',chiAry:['良好','一般', '不佳'],submitStr:'input3'},
  {title:'水肿程度',component:'Select',chiAry:['轻度','中度', '重度'],submitStr:'input4'},
  {title:'贫血程度',component:'Select',chiAry:['轻度','中度', '重度'],submitStr:'input5'},
  {title:'情绪表现',component:'Select',chiAry:['正常','烦躁', '情绪低落'],submitStr:'input6'},
  {title:'小便',component:'Input',submitStr:'input7'},
  {title:'大便',component:'Input',submitStr:'input8'},
  {title:'产后并发症',component:'Input',span:24,submitStr:'input9'},
  {title:'产后使用药物/营养剂',component:'Input',span:24,submitStr:'input10'},
  {title:'产后确认调改项',component:'Input',span:24,submitStr:'input11'},
  {title:'产后营养评估',component:'Input',span:24,submitStr:'input12'},
]


let chiAry = []

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  onDelete(){
    this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:1,dataId:this.props.CheckBeforeID}})
  }

  editBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/nutrition-evaluate/edit?customerid=${parse(location.search.substr(1)).customerid}&id=${this.props.CheckBeforeID}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/nutrition-evaluate'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/nutrition-evaluate/detail?customerid=${parse(location.search.substr(1)).customerid}`));
  }

  print(){

  }

  radioChange(e) {
    this.setState({childbirth:e.target.value})
  }

  submitClicked(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        Object.keys(values).map(key=>{
          if(values[key]){
            if(typeof values[key] === 'object'){
              values[key] = values[key].format()
            }
          }
        })
        const assessmentInfo =  JSON.stringify(values);

        let dict = { "assessmentInfo": assessmentInfo, "customerId": parse(location.search.substr(1)).customerid,"type": 5};
        dict.operatorItem = 5
        if(this.props.CheckBeforeID){
          dict.id = this.props.CheckBeforeID
        }
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
      }
    });
  }

  componentWillUnmount() {/**/
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {

    let hide = 2
    if(this.props.CheckBeforeData){
      if(this.props.CheckBeforeData.radio_15 ){
        hide = this.props.CheckBeforeData.radio_15 == 0?true:false;
      }
    }
    if(this.state.childbirth){
      hide = this.state.childbirth == 1 ? false : true;
    }

    // 分娩过程
    const DeliveryProcessAry = [
      {title:'分娩方式',component:'RadioGroups',submitStr:'radio_15',radioAry:[{'name':'自然分娩','value':'0'},{'name':'剖宫产','value':'1'}],fun:this.radioChange.bind(this)},
      {title:'手术指征',component:'Input',submitStr:'input_5',span:18,hide:hide === 2 ? true : hide,noRequired:hide === 2 ? false : hide},
      {title:'侧切',component:'RadioGroup',submitStr:'radio_15_1',hide:hide === 2 ? true : !hide,noRequired:hide === 2 ? false : !hide},
      {title:'会阴撕裂',component:'Select',chiAry:['无','Ⅰ度', 'Ⅱ度', 'Ⅲ度','Ⅳ度'],submitStr:'radio_16',hide:hide === 2 ? true : !hide,noRequired:hide === 2 ? false : !hide},
      {title:'产时出血',component:'InputGroup',unit:'ml',submitStr:'input_6'},
      {title:'胎盘早破',component:'InputGroup',unit:'小时',submitStr:'input_7'},
      {title:'前置胎盘',component:'RadioGroup',submitStr:'radio_18'},
      {title:'胎盘早剥',component:'RadioGroup',submitStr:'radio_19'},
      {title:'胎盘残留',component:'RadioGroup',submitStr:'radio_20'},
      {title:'其他',component:'TextArea',span:24,submitStr:'input_8'},
    ]

    const {loading} = this.props

    const ary = [{title:'基本信息',ary:baseInfoAry}]

    let chiAry = ary.map(value=>{
      value.netData = this.props.CheckBeforeData?this.props.CheckBeforeData:{}
      value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{}
      return CreatCard(this.props.form,value)
    })


    const bottomDiv = location.pathname === '/service/nutrition-evaluate/edit' ?
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div> :
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.backClicked.bind(this))}{this.props.CheckBeforeData?creatButton('删除',this.onDelete.bind(this)):''}
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
