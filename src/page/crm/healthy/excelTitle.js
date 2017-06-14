/**
 * Created by Flyforwards on 2017/6/12.
 */


import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal,Form,Row,Col,Input, Radio,Checkbox ,message} from 'antd';
import { queryURL } from '../../../utils/index.js';
const CheckboxGroup = Checkbox.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {routerRedux} from 'dva/router';
import {local,session} from 'common/util/storage.js';
import './excelTitle.scss';

@createForm()
class ExcelTitleModel extends Component {
  constructor(props) {
    super(props)
    this.state={
      visible:false,
    }
  }
  handleCancel() {
    this.setState({
      visible:false,
    })
  }
  handleOk() {
    // this.props.form.validateFields((err, values) => {
    //   values.customerId= queryURL('dataId');
    //   if (!err) {
    //     this.props.onOk(values)
    //     this.setState({
    //       visible:false,
    //     });
    //   }
    // })
    if(this.props.checkedValues && this.props.checkedValues.length > 0  ){

      const pathname  = "/crm/customer/printCustomerPage";
      const dataId = queryURL("dataId")
      this.props.dispatch({
        type:'printCustomer/getPrintBase',
      })
      this.props.dispatch({
        type:'printCustomer/getPrintExtend',
      })
      let query = { "dataId":dataId}
      this.props.dispatch(routerRedux.push({
        pathname,
        query
      }));
      session.set('checkValues',this.props.checkedValues)
    }else {
      message.warn("请选择表头")
    }
  }

  showModel() {
    // this.props.dispatch({
    //   type:'membershipcard/switchCommonState'
    // })
    this.setState({
      visible:true,
    })
  }
  checkPrice = (rule, value, callback) => {
    if(!value){
      callback('不能为空');
      return;
    }
    if((/^\d*$/g)||(/^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/g).test(value)){
      callback();
      return;
    }else{
      callback('输入格式不正确')
    }
    if (value > 0||value ==0) {
      callback();
      return;
    }
    callback('不能为负数');
  }
 onChange(checkedValues) {
  console.log('checked = ', checkedValues);
  this.props.dispatch({
    type:'healthInformation/choiceExcelValue',
    payload:{
      checkedValues
    },
  })
}

  render() {
    let {  modalTitle , okText, cancel, message,form,labelValue,prams, type } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:15 }
    }
    let visible = this.state.visible;
    const iValue = 5;
    return (
      <span>
         <span onClick={this.showModel.bind(this)}>{this.props.children}</span>
      <Modal
        key = { visible }
        visible = { visible }
        title = { modalTitle || "提示" }
        okText = { okText || "确定" }
        cancelText = { cancel || "取消" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        width = { 700 }
        style={{height:'300px'}}
        maskClosable={false}
        // wrapClassName = { "alert-vertical-center-modal" }
      >
        <Checkbox.Group onChange={this.onChange.bind(this)}>
          <Row style={{textAlign:'left'}}>
            <Col span={iValue}><Checkbox value="name">客户姓名</Checkbox></Col>
            <Col span={iValue}><Checkbox value="contact">联系电话</Checkbox></Col>
            <Col span={iValue}><Checkbox value="birthTime">出生日期</Checkbox></Col>
            <Col span={iValue}><Checkbox value="age">年龄</Checkbox></Col>
            <Col span={iValue}><Checkbox value="dueDate">预产期</Checkbox></Col>
            <Col span={iValue}><Checkbox value="gestationalWeeks">孕周</Checkbox></Col>
            <Col span={iValue}><Checkbox value="hospital">生产医院</Checkbox></Col>
            <Col span={iValue}><Checkbox value="fetus">第几胎</Checkbox></Col>
            <Col span={iValue}><Checkbox value="resourceCustomer">客资来源</Checkbox></Col>
            <Col span={iValue}><Checkbox value="focus">关注点</Checkbox></Col>
            <Col span={iValue}><Checkbox value="intentionPackage">意向套餐</Checkbox></Col>
            <Col span={iValue}><Checkbox value="webSearchTerm">网路搜索词</Checkbox></Col>
            <Col span={iValue}><Checkbox value="detailed">现住址</Checkbox></Col>
            <Col span={iValue}><Checkbox value="operator">操作者1</Checkbox></Col>
            <Col span={iValue}><Checkbox value="idcard">身份证</Checkbox></Col>
            <Col span={iValue}><Checkbox value="placeOrigin">籍贯</Checkbox></Col>
            <Col span={iValue}><Checkbox value="nation">民族</Checkbox></Col>
            <Col span={iValue}><Checkbox value="purchasePackage">购买套餐</Checkbox></Col>
            <Col span={iValue}><Checkbox value="insuranceSituation">保险情况</Checkbox></Col>
            <Col span={iValue}><Checkbox value="contact1">联系人电话</Checkbox></Col>
            <Col span={iValue}><Checkbox value="member">会员身份</Checkbox></Col>
            <Col span={iValue}><Checkbox value="specialIdentity">特殊身份</Checkbox></Col>
            <Col span={iValue}><Checkbox value="productionDate">宝宝生产日期</Checkbox></Col>
            <Col span={iValue}><Checkbox value="contractNumber">合同编号</Checkbox></Col>
            <Col span={iValue}><Checkbox value="associatedRooms">关联客房</Checkbox></Col>
            <Col span={iValue}><Checkbox value="memberNumber">会员编号</Checkbox></Col>
            <Col span={iValue}><Checkbox value="operator2">操作者2</Checkbox></Col>
            <Col span={iValue}><Checkbox value="detailedPermanent">户籍地址</Checkbox></Col>
          </Row>
        </Checkbox.Group>,
      </Modal>
       </span>
    )
  }
}
function mapStateToProps(state) {
  const { checkedValues } = state.healthInformation;
  return {
    user:state.addCustomer,
    checkedValues,
  };
}

export default connect(mapStateToProps)(ExcelTitleModel)

