/**
 * Created by Flyforwards on 2017/6/1.
 */


import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col,Popconfirm,Modal } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Link } from 'react-router';
import './index.scss';
import {routerRedux} from 'dva/router';

@createForm()
class CardDetail extends Component {
  constructor(props) {
    super(props)
    this.state={
      modalVisible:false,
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
    const { cardKind, form, level,} = this.props;
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
    //卡种级别渲染
    let options = [];
    level? level.map(function(elem,index){
      options.push(<Option key={elem.id}>{elem.name}</Option>)
    }):null;
    let cardLevel = null;
    if (cardKind && cardKind.level) {
      cardLevel = <Row>
        <Col span = { 8 } style={{width:'251px'}}>
          <FormItem label="会员卡级别" {...formItemLayout}>
            {getFieldDecorator('level', {
              initialValue: cardKind ? cardKind.level+'':''  ,
              rules: [{ required: true, message: '请选择会员卡级别' }]
            })(
              <Select
                showSearch
                allowClear
                placeholder="请选择"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={ true }
              >
                { options }
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
    }
    return (
      <div className="cardDetail">
        <Card title="会员卡信息" style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span = { 8 } style={{width:'251px'}} >
                <FormItem {...formItemLayout} label="会员卡名称">
                  {getFieldDecorator('name', {
                    initialValue: cardKind ?cardKind.name : '' ,
                    rules: [{ required: true, message: '请输入会员卡名称' }],
                  })(
                    <Input placeholder="请输入会员卡名称" readOnly/>
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="储值金额" {...formItemLayout}>
                  {getFieldDecorator('storedValue', {
                    initialValue: cardKind ? cardKind.storedValue : '',
                    rules: [{validator:this.checkPrice, required: true, }],
                  })(
                    <Input placeholder="请输入储值金额" addonAfter="元" readOnly  min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="折扣权限" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: cardKind ? cardKind.salesDiscount : ''  ,
                    rules: [{validator:this.checkPrice, required: true,}],
                  })(
                    <Input placeholder="请输入折扣权限" readOnly addonAfter="%"   min={0}/>
                  )}
                </FormItem>
              </Col>
              {cardLevel}
            </Row>
            <Row>
              <Col span={ 24 } style={{width:'600px'}}>
                <FormItem {...formTextItemLayout} label="备注">
                  {getFieldDecorator('remarks', {
                    initialValue: cardKind ? cardKind.remarks : '' ,
                    rules: [{ required: true, message: '请填写备注' }],
                  })(
                    <Input type="textarea" rows={6} style={{marginLeft:'6px'}}   readOnly />
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
  const {  level,cardKind } = state.membershipcard;
  return {
    loading: state.loading.models.membershipcard,
    level,
    cardKind,
  };
}
export default connect(mapStateToProps)(CardDetail)
