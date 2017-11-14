import React, { Component } from 'react';
import { CreatCard, creatButton } from '../ServiceComponentCreat'
import { Card, Input, Form, Button, Spin } from 'antd';
import { connect } from 'dva';
import { parse } from 'qs'
import { routerRedux } from 'dva/router'

// 表单信息
const baseInfoAry = [
  { title: '客户姓名', component: 'Input', submitStr: 'name', span: 8, disable: true },
  { title: '年龄', component: 'Input', submitStr: 'age', span: 8, disable: true },
  { title: '宝宝性别', component: 'gender', submitStr: 'baseInfo0', span: 8, disable: true },
  { title: '分娩日期', component: 'DatePicker', submitStr: 'baseInfo1', span: 8, disable: true },
  { title: '入住日期', component: 'DatePicker', submitStr: 'baseInfo2', span: 8, disable: true },
  { title: '房间', component: 'Input', submitStr: 'baseInfo3', span: 8, disable: true },
  { title: '气色情况', component: 'Select', chiAry: ['健康色泽', '气色不佳'], submitStr: 'baseInfo4', span: 8 },
  { title: '体型情况', component: 'Select', chiAry: ['肥胖', '适中', '消瘦'], submitStr: 'baseInfo5', span: 8 },
  { title: '精神情况', component: 'Select', chiAry: ['良好', '一般', '不佳'], submitStr: 'baseInfo6', span: 8 },
  { title: '舌质情况', component: 'Select', chiAry: ['正常', '淡', '红', '暗紫', '瘀斑'], submitStr: 'baseInfo7', span: 8 },
  {
    title: '舌苔情况',
    component: 'CheckBoxGroup',
    submitStr: 'baseInfo8',
    span: 8,
    checkAry: [
      { 'label': '薄', 'value': '0' },
      { 'label': '厚', 'value': '1' },
      { 'label': '腻', 'value': '2' },
      { 'label': '干', 'value': '3' },
      { 'label': '燥', 'value': '4' },
      { 'label': '黄', 'value': '5' },
      { 'label': '白', 'value': '6' },
      { 'label': '黑', 'value': '7' },
      { 'label': '染色', 'value': '8' }
    ]
  },
  { title: '语音语气', component: 'Select', chiAry: ['音高气足', '音低气若', '其他'], submitStr: 'baseInfo9', span: 8 },
  { title: '睡眠情况', component: 'Select', chiAry: ['良好', '一般', '不佳'], submitStr: 'baseInfo10', span: 8 },
  { title: '食欲情况', component: 'Select', chiAry: ['良好', '一般', '不佳'], submitStr: 'baseInfo11', span: 8 },
  { title: '泌乳情况', component: 'Select', chiAry: ['充足', '偏少', '无泌乳'], submitStr: 'baseInfo12', span: 8 },
  { title: '盗汗情况', component: 'Select', chiAry: ['冷汗', '热汗', '白汗伴寒热往来'], submitStr: 'baseInfo13', span: 8 },
  {
    title: '恶露情况',
    component: 'CheckBoxGroup',
    submitStr: 'baseInfo14',
    span: 8,
    checkAry: [
      { 'label': '量多', 'value': '0' },
      { 'label': '量少', 'value': '1' },
      { 'label': '色红', 'value': '2' },
      { 'label': '色淡', 'value': '3' },
      { 'label': '色暗伴腹胀', 'value': '4' }
    ]
  },
  { title: '泄便情况', component: 'Input', submitStr: 'baseInfo15', span: 8 },
  {
    title: '疼痛情况',
    component: 'CheckBoxGroup',
    submitStr: 'baseInfo16',
    span: 8,
    checkAry: [
      { 'label': '关节及全身痛', 'value': '0' },
      { 'label': '腰痛', 'value': '1' },
      { 'label': '膝关节及全身关节不适', 'value': '2' }
    ]
  },
  {
    title: '情绪表现',
    component: 'CheckBoxGroup',
    submitStr: 'baseInfo17',
    span: 8,
    checkAry: [
      { 'label': '正常', 'value': '0' },
      { 'label': '烦急', 'value': '1' },
      { 'label': '情绪低落', 'value': '2' },
      { 'label': '郁闷', 'value': '3' }
    ]
  },
  {
    title: '客户自感不适症状',
    component: 'CheckBoxGroup',
    submitStr: 'baseInfo18',
    span: 8,
    checkAry: [
      { 'label': '体质', 'value': '0' },
      { 'label': '体重', 'value': '1' },
      { 'label': '饮食', 'value': '2' },
      { 'label': '睡眠', 'value': '3' },
      { 'label': '月经', 'value': '4' }
    ]
  },
  
  { title: '切脉', component: 'TextArea', span: 24, submitStr: 'baseInfo19' },
  { title: '脉象和脏腑情况', component: 'TextArea', span: 24, submitStr: 'baseInfo20' },
  { title: '客户签字', component: 'Signature', span: 8, submitStr: 'baseInfo23', 'noRequired': true },

]


class Detail
  extends Component {
  
  constructor(props) {
    super(props);
  }
  
  onDelete() {
  
  }
  
  editBtnClick() {
    this.props.dispatch(routerRedux.push(`/service/diagnosis/edit?customerid=${parse(location.search.substr(1)).customerid}&id=${parse(location.search.substr(1)).customerid}`));
  }
  
  backClicked() {
    this.props.dispatch(routerRedux.push('/service/diagnosis'));
  }
  
  editBackClicked() {
    this.props.dispatch(routerRedux.push(`/service/diagnosis/detail?customerid=${parse(location.search.substr(1)).customerid}`));
  }
  createBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/diagnosis/create?customerid=${parse(location.search.substr(1)).customerid}`));
  }
  
  print() {
  
  }
  
  componentWillUnmount() {
    this.props.dispatch({ type: 'serviceCustomer/removeData' })
  }
  
  submitClicked() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).map(key => {
          if (values[key] != null && typeof values[key] === 'object' && typeof values[key].length !== 'number') {
            values[key] = values[key].format()
          }
        })
        const assessmentInfo = JSON.stringify(values);
        let dict = {
          "assessmentInfo": assessmentInfo,
          "customerId": parse(location.search.substr(1)).customerid,
          "type": 4
        };
        
        if (this.props.diagnosisID) {
          dict.operatorItem = 4
        }
        
        this.props.dispatch({ type: 'serviceCustomer/saveAssessment', payload: dict })
      }
    });
  }
  
  render() {
    
    const { summary,loading } = this.props
    const ary = [{ title: summary ? '' : '基本信息', ary: summary ? baseInfoAry.slice(6) : baseInfoAry }]
    
    let chiAry = ary.map(value => {
      value.netData = this.props.diagnosisData ? this.props.diagnosisData : {};
      value.baseInfoDict = this.props.baseInfoDict ? this.props.baseInfoDict : {}
      return CreatCard(this.props.form, value)
    })
    
    
    const bottomDiv =
      <div className='button-group-bottom-common'>
        {creatButton('返回', this.editBackClicked.bind(this))}{creatButton('确定', this.submitClicked.bind(this))}
      </div>
    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
  
      <Card className='diagnosisInput' style={{ width: '100%' }} bodyStyle={{ padding: (0, 0, '20px', '20px') }}>
          {chiAry}
          {summary ? "" : bottomDiv}
        </Card>
      </Spin>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}

export default connect(mapStateToProps)(DetailForm) ;
