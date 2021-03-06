//生产通知单
import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox, Spin, Card, Form } from 'antd';
import { CreatCard, creatButton } from './ServiceComponentCreat'
import { routerRedux } from 'dva/router'
const FormItem = Form.Item;

const babyAry = [
  { title: '宝宝性别', component: 'gender', submitStr: 'babySex' },
  { title: '宝宝体重', component: 'Input', submitStr: 'babyWeight', unit: 'g' },
  { title: '宝宝身长', component: 'Input', submitStr: 'babyLength', unit: 'cm' }
]

function creatBabyDiv(props) {
  const { form, type, fun } = props
  
  return (
    CreatCard(form, { ary: babyAry, type: type, fun: fun })
  )
}

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
    { title: '入住日期', component: 'Input', submitStr: 'checkDate', disable: true },
    { title: '套餐级别', component: 'Input', submitStr: 'level', disable: true, dictInfokey: 'purLevel' },
    { title: '客户电话', component: 'Input', submitStr: 'maternityTel', disable: true, dictInfokey: 'contact' },
    { title: '紧急联系人', component: 'Input', submitStr: 'emergencyTel', disable: true, dictInfokey: 'emergency' },
    { title: '紧急电话', component: 'Input', submitStr: 'familyTel', disable: true },
    { title: '分娩医院', component: 'Input', selectName: 'Hospital', submitStr: 'hospital', disable: true },
    {
      title: '分娩方式',
      component: 'RadioGroups',
      submitStr: 'radio_15',
      radioAry: [{ 'name': '自然分娩', 'value': '0' }, { 'name': '剖宫产', 'value': '1' }]
    },
    { title: '生产日期', component: 'DatePicker', submitStr: 'brithDate' },
    { title: '母婴护理师', component: 'Input', submitStr: 'practitioner' },
    { title: '联系方式', component: 'Input', submitStr: 'contactInformation' },
    { title: '到院时间', component: 'DatePicker', submitStr: 'arrivalTime' },
    { title: '分娩医院地址', component: 'Input', span: 18, submitStr: 'hospitalAddress' }
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
const BabyDivForm = Form.create()(creatBabyDiv);

/**
 * 通知单
 */
class Detail extends Component {
  
  constructor(props) {
    super(props);
    this.state = { babyDivAry: ['baby1'] }
  }
  
  addBaby() {
    let babyDivAry = [...this.state.babyDivAry]
    babyDivAry.push('baby' + (babyDivAry.length + 1))
    this.setState({ babyDivAry })
  }
  
  ReductionBaby(index) {
    let babyDivAry = [...this.state.babyDivAry]
    babyDivAry.splice(index, 1);
    this.setState({ babyDivAry })
  }
  
  initBabyDivAry() {
    return (
      this.state.babyDivAry.map((value, inx) => {
        if (value === 'baby1') {
          return <BabyDivForm key={value} ref={value} fun={this.addBaby.bind(this)} type='babyAdd'/>
        }
        else {
          return <BabyDivForm key={value} ref={value} fun={this.ReductionBaby.bind(this, inx)} type='babyReduction'/>
        }
      })
    )
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
            
            let babyList = this.state.babyDivAry.map((value, index) => {
              let dict = ''
              this.refs[value].validateFieldsAndScroll((err, values) => {
                if (!err) {
                  Object.keys(values).map(key => {
                    if (values[key]) {
                      if (typeof values[key] === 'object') {
                        values[key] = values[key].format()
                      }
                    }
                  })
                  dict = values
                  dict.babyId = index + 1
                  dict.customerId = this.props.baseInfoDict.customerId
                }
              });
              return dict
            })
            
            values.babyList = babyList
            values.customerId = this.props.baseInfoDict.customerId
            values.name = this.props.baseInfoDict.name
            
          }
        })
        dict = values
        let departments = this.props.EndemicDeptList ? this.props.EndemicDeptList.map((value) => {
          return value.id
        }) : ''
        
        dict.departments = departments.join(",");
        
        this.props.dispatch({ type: 'serviceCustomer/sendProductionNotification', payload: dict })
      }
    });
    
    
  }
  
  
  componentWillUnmount() {/**/
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
        <Card title="生产通知单" className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding: (0, 0, '20px', 0) }}>
          <BaseInfoDivForm {...this.props} ref="BaseInfoDivForm"/>
          {this.initBabyDivAry()}
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="通知部门" {...formItemLayout}>
              {
                departments.map((v, k) => {
                  return (
                    <Checkbox   value={v} key={k}>{v}</Checkbox>
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


