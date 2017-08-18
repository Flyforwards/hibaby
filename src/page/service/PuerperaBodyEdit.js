import React, { Component } from 'react';
import {CreatCard,creatButton} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

// 基本信息
const baseInfoAry = [
  {title:'客户姓名',component:'Input',submitStr:'name'},
  {title:'年龄',component:'Input',submitStr:'age'},
  {title:'宝宝性别',component:'gender',submitStr:'baseInfo0'},
  {title:'分娩日期',component:'DatePicker',submitStr:'baseInfo1'},
  {title:'入住日期',component:'DatePicker',submitStr:'baseInfo2'},
  {title:'房间',component:'Input',submitStr:'associatedRooms'},
  {title:'妈妈入住',component:'Input',submitStr:'InputNumber0',unit:'天'},
  {title:'宝宝入住',component:'Input',submitStr:'InputNumber1',unit:'天'},
  {title:'体温',component:'Input',submitStr:'radio_21',unit:'℃'},
  {title:'脉搏',component:'Input',unit:'ml',submitStr:'input_9',unit:'次/分'},
  {title:'体重',component:'Input',submitStr:'input_18',unit:'Kg'},
  {title:'血压',component:'Input',submitStr:'radio_24',unit:'mmHg'},
  {title:'大便',component:'Input',submitStr:'radio_24_1',unit:'次数/天'},
  {title:'恶露',component:'Select',chiAry:['红/多','红/中', '淡红/少'],submitStr:'radio_32'},
  {title:'子宫收缩',component:'Select',chiAry:['软','硬'],submitStr:'radio_27'},
  {title:'伤口',component:'Select',chiAry:['正常','微红'],submitStr:'radio_29'},
  {title:'乳房',component:'Select',chiAry:['正常','红','涨硬','痛'],submitStr:'radio_30'},
  {title:'乳头',component:'Select',chiAry:['正常','破皮', '结痂'],submitStr:'radio_31'},
  {title:'食欲',component:'Select',chiAry:['差','佳'],submitStr:'input_11'},
  {title:'情绪评分',component:'InputNumber',submitStr:'input_12'},
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
        const assessmentInfo =  JSON.stringify(values);

        let dict = { "assessmentInfo": assessmentInfo, "customerId": parse(location.search.substr(1)).customerid,"type": 6};

        if(this.props.CheckBeforeID){
          dict.id = this.props.CheckBeforeID
        }
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {

    const {loading} = this.props

    const ary = [{title:'表单信息',ary:baseInfoAry}]

    let chiAry = ary.map(value=>{
      value.netData = this.props.CheckBeforeData?this.props.CheckBeforeData:{}
      return CreatCard(this.props.form,value)
    })


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
