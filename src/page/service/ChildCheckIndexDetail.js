/**
 * Created by Flyforwards on 2017/8/17.
 */

import React, { Component } from 'react';
import {CreatCard,creatButton} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux } from 'dva/router'

// 基本信息
const baseInfoAry = [
  {title:'客户姓名',span:8,component:'Input',submitStr:'name'},
  {title:'年龄',span:8,component:'Input',submitStr:'age'},
  {title:'宝宝性别',span:8,component:'gender',submitStr:'baseInfo0'},
  {title:'分娩日期',span:8,component:'DatePicker',submitStr:'baseInfo1'},
  {title:'入住日期',span:8,component:'DatePicker',submitStr:'baseInfo2'},
  {title:'房间',span:8,component:'Input',submitStr:'baseInfo3'},
  {title:'破水时间',span:8,component:'Input',submitStr:'baseTime0'},
  {title:'APGAR SCORE',span:8,component:'Input',submitStr:'select_0'},
  {title:'孕次',span:8,component:'Input',selectName:'GRAVIDITY',submitStr:'gravidity'},
  {title:'产次',span:8,component:'Input',selectName:'FETUS',submitStr:'fetus'},
  {title:'生产数量',span:8,component:'Input',submitStr:'babyNum'},
  {title:'周数',span:8,component:'Input',submitStr:'weekNum'},
  {title:'生产方式',span:8,component:'Input',submitStr:'babyWay'},
]
// 新生儿情况
const newbornAry = [
  {title:'出生体重',component:'Input',unit:'g',submitStr:'input_12'},
  {title:'出生身长',component:'Input',unit:'cm',submitStr:'input_13'},
  {title:'出生时头围',component:'Input',unit:'cm',submitStr:'babyHead0'},
  {title:'出生时胸围',component:'Input',unit:'cm',submitStr:'babyHead1'},
  {title:'囱门',formItems:'TwoWords',component:'RadioGroups',span:12,submitStr:'babyHead2',radioAry:[{'name':'平坦柔软','value':'0'},{'name':'紧绷鼓出','value':'1'},{'name':'凹陷','value':'2'}]},
  {title:'头皮',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead3', checkAry:[{'label':'正常','value':'0'},{'label':'破皮','value':'1'},{'label':'产瘤','value':'2'},{'label':'头血肿','value':'3'},{'label':'其他','value':'4'}]},
  {title:'眼睛',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead4',checkAry:[{'label':'正常','value':'0'},{'label':'日落眼','value':'1'},{'label':'分泌物','value':'2'},{'label':'眼睑肿胀','value':'3'},{'label':'巩膜出血','value':'4'},{'label':'其他','value':'5'}]},
  {title:'瞳孔大小',formItems:'FourWords',component:'RadioGroups',span:12,submitStr:'babyhead5',radioAry:[{'name':'对称','value':'0'},{'name':'不对称','value':'1'}]},
  {title:'耳朵',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead6',checkAry:[{'label':'正常','value':'0'},{'label':'红','value':'1'},{'label':'肿','value':'2'},{'label':'分泌物','value':'3'},{'label':'低下','value':'4'},{'label':'畸形','value':'5'},{'label':'耳边瘜肉','value':'6'}]},
  {title:'口腔',component:'Input',submitStr:'babyhead7'},
  {title:'鼻子',component:'Input',submitStr:'babyhead8'},
  {title:'颈部',component:'Input',submitStr:'babyhead9'},
  {title:'胸部',component:'Input',submitStr:'babyhead10'},
  {title:'腹部',component:'Input',submitStr:'babyhead11'},
  {title:'脐带脱落',component:'Input',submitStr:'babyhead12'},
  {title:'脐带状态',component:'Input',submitStr:'babyhead13'},
  {title:'交付状态',component:'Input',submitStr:'babyhead14'},
  {title:'交付时间',component:'Input',submitStr:'babyhead15'},
  {title:'骨骼',component:'Input',submitStr:'babyhead16'},
  {title:'上肢',component:'Input',submitStr:'babyhead17'},
  {title:'下肢',component:'Input',submitStr:'babyhead18'},
  {title:'皮肤',component:'Input',submitStr:'babyhead19'},
  {title:'生殖器',component:'Input',submitStr:'babyhead20'},
  {title:'分泌物',component:'Input',submitStr:'babyhead21'},
]

// 新生儿情况
const newbornTwoAry = [
  {title:'呼吸状态',component:'Input',submitStr:'babyCare0'},
  {title:'呼吸速率',component:'Input',submitStr:'babyCare1'},
  {title:'呼吸音',component:'Input',submitStr:'babyCare2'},
  {title:'心跳',component:'Input',submitStr:'babyCare3'},
  {title:'心音',component:'Input',submitStr:'babyCare4'},
  {title:'饮食',component:'Input',submitStr:'babyCare4'},
  {title:'腹部',component:'Input',submitStr:'babyCare5'},
  {title:'肠蠕动声',component:'Input',submitStr:'babyCare6'},
  {title:'吐奶',component:'Input',submitStr:'babyCare7'},
  {title:'活动力',component:'Input',submitStr:'babyCare8'},
  {title:'姿势',component:'Input',submitStr:'babyCare9'},
  {title:'哭声',component:'Input',submitStr:'babyCare10'},
  {title:'拥抱反射',component:'Input',submitStr:'babyCare11'},
  {title:'踏步反射',component:'Input',submitStr:'babyCare12'},
  {title:'吸允反应',component:'Input',submitStr:'babyCare13'},
  {title:'其他',component:'TextArea',spna:24,submitStr:'babyCare14'},
  {title:'评估者',component:'Input',span:6,submitStr:'newborn_3'},
  {title:'评估时间',component:'DatePicker',offset:12,span:6,submitStr:'newborn_4'},
]

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  onDelete(){

  }

  editBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/child-check-in/edit?${location.search.substr(1)}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/child-check-in'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/child-check-in/detail?${location.search.substr(1)}`));
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
        let dict = { "assessmentInfo": assessmentInfo, "customerId": 16,"type": 3};
        if(this.props.CheckBeforeID){
          dict.id = this.props.CheckBeforeID
        }
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
      }
    });
  }

  render() {

    const {loading} = this.props

    const ary = [{title:'基本信息',ary:baseInfoAry},{title:'入住时婴儿评估',ary:newbornAry},{title:'入住时婴儿评估',ary:newbornTwoAry}]

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
