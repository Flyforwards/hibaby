import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

const feeding = [
  {title:'喂养方式',component:'Select',submitStr:'feedingMode',chiAry:['亲喂','母乳','配方奶']},
  {title:'喂养时间',component:'Input',unit:'分钟',submitStr:'feedingTime'},
  {title:'喂养计量',component:'Input',submitStr:'feedingMeasurement',unit:'ml'},
  {title:'小便颜色',component:'Select',chiAry:['清','黄'],submitStr:'urineColor'},
  {title:'小便量',component:'Select',chiAry:['少','中'],submitStr:'urineOutput'},
  {title:'大便颜色',component:'Select',chiAry:['浅棕','棕'],submitStr:'stoolColor'},
  {title:'大便量',component:'Select',chiAry:['少','中'],submitStr:'stoolVolume'},
  {title:'形状',component:'Select',chiAry:['软','糊状'],submitStr:'shape'},
]

const growth = [
  {title:'体重',component:'Input',submitStr:'weight',unit:'gm'},
  {title:'身长',component:'Input',submitStr:'length',unit:'cm'},
  {title:'亲喂',component:'Input',submitStr:'personallyFeed',unit:'次'},
  {title:'母乳',component:'Input',submitStr:'breastMilk',unit:'ml'},
  {title:'配方奶',component:'Input',submitStr:'powderedFormulas',unit:'ml'},
  {title:'大便',component:'Input',submitStr:'shit',unit:'次'},
  {title:'小便',component:'Input',submitStr:'urine',unit:'次'},
]

const assessment = [
  {title:'体温',component:'Input',submitStr:'temperature',unit:'℃'},
  {title:'脉搏',component:'Input',submitStr:'pulse',unit:'次/分'},
  {title:'体重',component:'Input',submitStr:'weight',unit:'Kg'},
  {title:'血压',component:'Input',submitStr:'bloodPressure',unit:'mmHg'},
  {title:'大便',component:'Input',submitStr:'shit',unit:'次数/天'},
  {title:'恶露',component:'Select',chiAry:['红/多','红/中', '淡红/少'],submitStr:'lochia'},
  {title:'子宫收缩',component:'Select',chiAry:['软','硬'],submitStr:'uterusShrink'},
  {title:'伤口',component:'Select',chiAry:['正常','微红'],submitStr:'wound'},
  {title:'乳房',component:'Select',chiAry:['正常','红','涨硬','痛'],submitStr:'breast'},
  {title:'乳头',component:'Select',chiAry:['正常','破皮', '结痂'],submitStr:'papilla'},
  {title:'食欲',component:'Select',chiAry:['差','佳'],submitStr:'appetite'},
  {title:'情绪评分',component:'InputNumber',submitStr:'emotionScore'},
]

const nursing = [
  {title:'体温',component:'Input',submitStr:'temperature',unit:'℃'},
  {title:'脉搏',component:'Input',submitStr:'pulse',unit:'次/分'},
  {title:'呼吸',component:'Input',submitStr:'breathing',unit:'次/分'},
  {title:'体重',component:'Input',submitStr:'weight',unit:'g'},
  {title:'身长',component:'Input',submitStr:'length',unit:'cm'},
  {title:'脐带',component:'Input',submitStr:'umbilicalCord',unit:'次数/天'},
  {title:'黄疸',component:'Input',submitStr:'jaundice'},
  {title:'托管状态',component:'Select',chiAry:['软','硬'],submitStr:'towState'},
  {title:'托管起始',component:'DatePicker',submitStr:'towStart'},
]

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={
      urlAddress:location.pathname.indexOf('baby-grow') !== -1? 'baby-grow': (location.pathname.indexOf('baby-feed') !== -1?'baby-feed':'puerpera-body')
    }
  }

  onDelete(){
    this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:1,dataId:this.props.CheckBeforeID}})
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/${this.state.urlAddress}/detail?customerid=${parse(location.search.substr(1)).customerid}`));
  }

  print(){

  }

  submitClicked(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        Object.keys(values).map(key=>{
          if(typeof values[key] === 'object'){
            values[key] = values[key].format()
          }
        })

        const tempDict = parse(location.search.substr(1));

        let dict = { ...values, "customerId": tempDict.customerid};
        if(tempDict.dataId){
          dict.id = tempDict.dataId
        }

        let typeStr = 'serviceCustomer/saveBabyGrowthNote'
        let operatorItem = 8
        if(this.state.urlAddress === 'baby-feed'){
          typeStr = 'serviceCustomer/saveBabyFeedingNote'
          operatorItem = 13
        }
        if(this.state.urlAddress === 'puerpera-body'){
          typeStr = 'serviceCustomer/saveMaternalEverydayPhysicalEvaluation'
          operatorItem = 14
        }
        dict.operatorItem = operatorItem;
        if(this.props.SingleInformationDict){
          dict.babyId = this.props.SingleInformationDict.babyId;
        }
      //  dict.babyId = this.props.SingleInformationDict.babyId;
        this.props.dispatch({type:typeStr,payload:dict})
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {

    const {loading,baseInfoDict,SingleInformationDict} = this.props

    let ary = this.state.urlAddress === 'baby-feed' ? feeding : (this.state.urlAddress === 'baby-grow'?growth:assessment);

    let baseInfoDivAry = detailComponent(baseInfoDict)

    const bottomDiv =
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='detailDiv' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
          {CreatCard(this.props.form,{title:'产妇今日身体评估',ary:ary,netData:SingleInformationDict?SingleInformationDict:{}})}
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
