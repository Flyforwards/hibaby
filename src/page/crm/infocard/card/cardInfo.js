import React, { Component } from 'react'
import { connect } from 'dva'
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Link } from 'react-router';

class CardModal extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const str = window.location.search
    const dataId = str.substr(str.length - 1, 1);
    dispatch({
      type: 'card/getCardKindInfo',
      payload: { dataId }
    })

  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { cardKind, form, dispatch } = this.props;
    const { validateFields } = form;
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        dispatch({
          type: 'card/saveCard',
          payload:{  ...values }
        })
      }
    })
  }

  render() {
    const { cardKind, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span:15 }
    }
    const formTextItemLayout = {
      labelCol:{ span:1},
      wrapperCol:{ span:21 }
    }
    const formRadioItemLayout = {
      labelCol:{ span:2},
      wrapperCol:{ span:20 }
    }
    return (
      <div  style={{ 'padding': '20px' }}>
        <Card title="会员卡信息" style={{ width: '80%' }}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span = { 8 } >
                <FormItem {...formItemLayout} label="会员卡名称">
                  {getFieldDecorator('name', {
                    initialValue: cardKind && cardKind.name ,
                    rules: [{ required: true, message: '请输入会员卡名称' }],
                  })(
                    <Input placeholder="请输入会员卡名称"/>
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 }>
                <FormItem label="储值金额" {...formItemLayout}>
                  {getFieldDecorator('storedValue', {
                    initialValue: cardKind && cardKind.storedValue ,
                    rules: [{ required: true, message: '请输入储值金额' }],
                  })(
                    <Input placeholder="请输入储值金额" addonAfter="元"/>
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 }>
                <FormItem label="折扣权限" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: cardKind && cardKind.salesDiscount ,
                    rules: [{ required: true, message: '请输入折扣权限!' }],
                  })(
                    <Input placeholder="请输入折扣权限" addonAfter="%"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span = { 8 }>
                <FormItem label="会员卡级别" {...formItemLayout}>
                  {getFieldDecorator('level', {
                    initialValue: cardKind && cardKind.level ,
                    rules: [{ required: true, message: '请选择会员卡级别' }]
                  })(
                    <Select
                      showSearch
                      allowClear
                      style={{ width: 200 }}
                      placeholder="请选择"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="100">一级</Option>
                      <Option value="80">二级</Option>
                      <Option value="70">三级</Option>
                      <Option value="60">四级</Option>
                      <Option value="50">五级</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{paddingLeft:'2%'}}>
              <Col span={ 24 }>
                <FormItem {...formTextItemLayout} label="备注">
                  {getFieldDecorator('remarks', { initialValue: cardKind && cardKind.remarks }, {
                    //rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input type="textarea" rows={6}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label="卡种类型" {...formRadioItemLayout}>
                  {getFieldDecorator('cardType', {
                    initialValue: cardKind && cardKind.cardType ,
                    rules: [{ required: true, message: '请选择卡种类型' }]
                  })(
                    <RadioGroup >
                      <Radio value="1">模板卡种</Radio>
                      <Radio value="2">自定义卡种</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span = { 20 }>
              </Col>
              <Col span = { 2 }>
                <Link to="/crm/card"><Button type="default">返回</Button></Link>
              </Col>
              <Col span = { 2 }>
                <Button type="primary"  onClick={this.handleSubmit.bind(this)}>保存</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    )
  }
}

const CardForm = Form.create()(CardModal);


function CardModalCom({ dispatch, cardKind, zheKou, level }) {
  return (
    <CardForm dispatch={dispatch} cardKind={cardKind} zheKou={zheKou} level={level}/>
  )
}
function mapStateToProps(state) {
  const { cardKind, level, zheKou } = state.card;
  console.log("=====carKind",cardKind)
  return {
    loading: state.loading.models.card,
    cardKind,
    level,
    zheKou

  };
}
export default connect(mapStateToProps)(CardModalCom)
