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

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  onDelete(){
    this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:1,dataId:this.props.CheckBeforeID}})
  }

  editBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/puerpera-body/edit?${location.search.substr(1)}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/puerpera-body'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/puerpera-body/detail?${location.search.substr(1)}`));
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

        let dict = { "assessmentInfo": {...values}, "customerId": parse(location.search.substr(1)).customerid};

        if(this.props.CheckBeforeID){
          dict.id = this.props.CheckBeforeID
        }
        this.props.dispatch({type:'serviceCustomer/saveMaternalEverydayPhysicalEvaluation',payload:dict})
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {

    const {loading,baseInfoDict} = this.props

    // const ary = [{title:'表单信息',ary:baseInfoAry}]



    let baseInfoDivAry = detailComponent(baseInfoDict)

    const bottomDiv = location.pathname === '/service/puerpera-body/edit' ?
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
          {baseInfoDivAry}
          {CreatCard(this.props.form,{title:'产妇今日身体评估',ary:assessment})}
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
