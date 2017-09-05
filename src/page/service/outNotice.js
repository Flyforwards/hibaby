/**
 * 外出通知单
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox, Spin, Card, Form } from 'antd';
import { CreatCard, creatButton } from './ServiceComponentCreat'
import { routerRedux } from 'dva/router'
const FormItem = Form.Item;

function baseInfoDiv(props) {
  const { dispatch, baseInfoDict, CustomerInfoList } = props
  const PastMedicalHistoryAry = [
    {
      title: '妈妈姓名',
      component: 'AutoComplete',
      submitStr: 'name',
      onSearch: onchange,
      onSelect: onSelect,
      dataSource: CustomerInfoList ? CustomerInfoList : []
    },
    { title: '房间号', component: 'Input', submitStr: 'roomNo', disable: true },
    { title: '客户电话', component: 'Input', submitStr: 'maternityTel', disable: true, dictInfokey: 'contact' },
    
    
    { title: '陪同人员', component: 'Input', submitStr: 'entourage' },
    { title: '陪同人员电话', component: 'Input', submitStr: 'entourageTel' },
    
    
    { title: '紧急联系人', component: 'Input', submitStr: 'emergencyTel', disable: true, dictInfokey: 'emergency' },
    { title: '出所时间', component: 'DatePicker', submitStr: 'leaveDate' },
    { title: '预计回来时间', component: 'DatePicker', submitStr: 'estimateBackDate' },
    { title: '实际回来时间', component: 'DatePicker', submitStr: 'actualBackDate' },
    { title: '暂停月子餐', component: 'Input', submitStr: 'confinementDiet', noRequired: true },
    { title: '恢复月子餐', component: 'Input', submitStr: 'recoveryDiet', noRequired: true },
    { title: '家属餐', component: 'Input', submitStr: 'familyDinner', noRequired: true },
    { title: '外出地址', component: 'Input', span: 24, submitStr: 'outAddress' },
    { title: '母婴护理师', component: 'Input', submitStr: 'practitioner' },
    { title: '联系方式', component: 'Input', submitStr: 'contactInformation' },
    { title: '到院时间', component: 'DatePicker', submitStr: 'arrivalTime' }
  
  ]
  
  function onchange(e) {
    dispatch({ type: 'serviceCustomer/getCustomerInfoByCustomerName', payload: { str: e } })
  }
  
  function onSelect(e) {
    dispatch({ type: 'serviceCustomer/getCustomerInfoByCustomerId', payload: { dataId: e } })
  }
  
  let value = { ary: PastMedicalHistoryAry }
  value.baseInfoDict = baseInfoDict ? baseInfoDict : {}
  
  return (
    CreatCard(props.form, value)
  )
}


const BaseInfoDivForm = Form.create()(baseInfoDiv);

/**
 * 通知单
 */
class Detail extends Component {
  
  constructor(props) {
    super(props);
    this.state = { babyDivAry: ['baby1'] }
  }
  
  
  editBackClicked() {
    this.props.dispatch(routerRedux.push('/service/send-message'));
    
    
  }
  
  submitClicked() {
    
    let dict = ''
    
    this.refs.BaseInfoDivForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).map(key => {
          if (values[key]) {
            if (typeof values[key] === 'object') {
              values[key] = values[key].format()
            }
            
            values.customerId = this.props.baseInfoDict.customerId
            values.name = this.props.baseInfoDict.name
            
          }
        })
        dict = values
        let departments = this.props.EndemicDeptList ? this.props.EndemicDeptList.map((value) => {
          return value.id
        }) : ''
        
        dict.departments = departments.join(",");
        
        this.props.dispatch({ type: 'serviceCustomer/senddepartureNotice', payload: dict })
      }
    });
    
    
  }
  
  
  componentWillUnmount() {
    this.props.dispatch({ type: 'serviceCustomer/removeData' })
  }
  
  render() {
    const { loading } = this.props
    
    const bottomDiv =
            <div className='button-group-bottom-common'>
              {creatButton('返回', this.editBackClicked.bind(this))}
              {creatButton('发送', this.submitClicked.bind(this))}
            </div>
    
    let departments = this.props.EndemicDeptList ? this.props.EndemicDeptList.map((value) => {
      return value.name
    }) : []
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    
    return (
      <Spin
        spinning={loading.effects['serviceCustomer/getCustomerInfoByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getCustomerInfoByCustomerId'] : false}>
        <Card title="外出通知单" className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding: (0, 0, '20px', 0) }}>
          <BaseInfoDivForm {...this.props} ref="BaseInfoDivForm"/>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="通知部门" {...formItemLayout}>
              {
                departments.map((v, k) => {
                  return (
                    <Checkbox checked={true} disabled={true} value={v} key={k}>{v}</Checkbox>
                  )
                })
              }
            </FormItem>
          </Form>
          
          {bottomDiv}
        </Card>
      </Spin>
    )
  }
}


function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}

export default connect(mapStateToProps)(Detail) ;


