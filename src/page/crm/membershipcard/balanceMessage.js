/**
 * Created by Flyforwards on 2017/6/1.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col,Popconfirm,Modal } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;

import { Link } from 'react-router';
import './index.scss';

@createForm()
class CardBalance extends Component {
  constructor(props) {
    super(props)
    this.state={

    }
  }

  //验证表单

  checkPrice = (rule, value, callback) => {
    if(!value){
      callback('不能为空');
      return;
    }
    if(/^\d*$/g.test(value)){
      callback();
      return;
    }else{
      callback('只能输入整数')
    }
    if (value > 0||value ==0) {
      callback();
      return;
    }
    callback('不能为负数');
  }

  render() {
    const { cardBalance, form,} = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span:15 }
    }
    const formTextItemLayout = {
      labelCol:{ span:2},
      wrapperCol:{ span:21 }
    }
    const formRadioItemLayout = {
      labelCol:{ span:5},
      wrapperCol:{ span:17 }
    }
    return (
      <div className="member-card-cent" style={{margin:'10px 0px'}}>
        <Card title="余额信息" style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span = { 8 } style={{width:'300px'}} >
                <FormItem {...formItemLayout} label="卡内余额">
                  {getFieldDecorator('name', {
                    initialValue: cardBalance ?cardBalance.cardBalance : '' ,
                    rules: [{ required: true, message: '' }],
                  })(
                    <Input placeholder="" readOnly addonAfter="元"  min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'300px'}}>
                <FormItem label="可用额度" {...formItemLayout}>
                  {getFieldDecorator('storedValue', {
                    initialValue: cardBalance ? cardBalance.availableCredit : '',
                    rules: [{ required: true, }],
                  })(
                    <Input placeholder="" addonAfter="元" readOnly min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'300px'}}>
                <FormItem label="冻结额度" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: cardBalance ? cardBalance.frozenCredit : ''  ,
                    rules: [{validator:this.checkPrice, required: true,}],
                  })(
                    <Input placeholder="" readOnly addonAfter="元"  min={0}/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { cardBalance } = state.membershipcard;
  return {
    loading: state.loading.models.membershipcard,
    cardBalance
  };
}
export default connect(mapStateToProps)(CardBalance)
