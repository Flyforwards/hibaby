/**
 * Created by Flyforwards on 2017/5/25.
 */
import DictionarySelect from 'common/dictionary_select';

import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon,DatePicker,Table, Card, InputNumber, Radio,Row,Col, } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Link } from 'react-router';
import './card.scss';
import { parse } from 'qs'
import CustomerByCard from './customerByCard';

class CardDetail extends Component {

  constructor(props) {
    super(props)

  }


  componentWillMount() {
    const { dispatch } = this.props;
    const dataId = location.search.substr(1).split('=')[1]
    dispatch({
      type: 'card/getCardKindInfo',
      payload: { dataId }
    })
    dispatch({
      type:'card/getLevelInfo',
      payload:{
        "abName":"HYKJB",
        "softDelete":0,
        "type":1,
      }
    });
    dispatch({
      type: 'card/getCustomerPage',
      payload: { member: dataId }
    })

  }

  //保存
  onSave (e) {
    e.stopPropagation();
    const { cardKind, form, dispatch } = this.props;
    const dataId = location.search.substr(1).split('=')[1];
    const { validateFields } = form;
    form.validateFields((err, values) => {
      values.id = dataId;
      if (!err) {
        dispatch({
          type: 'card/modifyCardMsg',
          payload:{  ...values }
        })
      }
    })
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
    const { cardKind, form, level,loading,userPagination,list } = this.props;
    const { getFieldDecorator } = form;
    if (cardKind) {
      getFieldDecorator('upgrade', {initialValue: cardKind.upgrade});
    }
    const formItemLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span:15 }
    }
    const formTextItemLayout = {
      labelCol:{ span:3},
      wrapperCol:{ span:19 }
    }
    const formRadioItemLayout = {
      labelCol:{ span:5},
      wrapperCol:{ span:17 }
    }
    const values = parse(location.search.substr(1))
    //卡种级别渲染
    let options = [];
    level? level.map(function(elem,index){
      options.push(<Option key={elem.id}>{elem.name}</Option>)
    }):null;
    return (
      <div className="infoCard">
      <div className="cardEdit" style={{ 'padding': '20px' }}>
        <Card title="会员卡信息" style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span = { 8 } style={{width:'251px'}} >
                <FormItem {...formItemLayout} label="会员卡名称">
                  {getFieldDecorator('name', {
                    initialValue: cardKind ?cardKind.name : '' ,
                    rules: [{ required: true, message: '请输入会员卡名称' }],
                  })(
                    <Input placeholder="请输入会员卡名称" />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="储值金额" {...formItemLayout}>
                  {getFieldDecorator('storedValue', {
                    initialValue: cardKind ? cardKind.storedValue : '',
                    rules: [{validator:this.checkPrice, required: true, }],
                  })(
                    <Input placeholder="请输入储值金额" addonAfter="元" readOnly min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="折扣权限" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: cardKind ? cardKind.salesDiscount : ''  ,
                    rules: [{validator:this.checkPrice, required: true,}],
                  })(
                    <Input placeholder="请输入折扣权限"  addonAfter="%"  readOnly min={0}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
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
                      disabled={true}
                    >
                      { options }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={ 24 } style={{width:'400px'}}>
                <FormItem {...formTextItemLayout} label="备注">
                  {getFieldDecorator('remarks', {
                    initialValue: cardKind ? cardKind.remarks : '' ,
                    rules: [{ required: true, message: '请填写备注' }],
                  })(
                    <Input type="textarea" rows={6} readOnly  />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={22} style={{width:'401px' }}>
                <FormItem label="卡种类型" {...formRadioItemLayout}>
                  {getFieldDecorator('cardType', {
                    initialValue: cardKind ? cardKind.cardType+'' : '' ,
                    rules: [{ required: true, message: '请选择卡种类型' }]
                  })(
                    <RadioGroup disabled >
                      <Radio value="1">模板卡种</Radio>
                      <Radio value="2">自定义卡种</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <CustomerByCard {...{loading, userPagination, list}} />
            </Row>
            <Row style={{marginTop:'16px'}}>
              <Col span = { 16 }>
              </Col>
              <Col span = { 4 }>
                <Link to={{ pathname:"/crm/card/detail", query: values}}><Button className="BackBtn">返回</Button></Link>
              </Col>
              <Col span = { 4 }>
                <Button className="SaveBtn" onClick={this.onSave.bind(this)}>保存</Button>
              </Col>
            </Row>
          </Form>
        </Card>

      </div>
      </div>
    )
  }
}

const CardForms = Form.create()(CardDetail);


function mapStateToProps(state) {
  const { cardKind, level, zheKou,userPagination, list } = state.card;
  return {
    loading: state.loading,
    cardKind,
    userPagination,
    list,
    level,
    zheKou,
  };
}
export default connect(mapStateToProps)(CardForms)
