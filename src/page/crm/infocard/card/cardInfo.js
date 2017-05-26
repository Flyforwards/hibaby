/*
* updated by Flyforwards 2017/5/25
*
* */
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
  componentDidMount() {
    this.props.dispatch({
      type:'card/getLevelInfo',
      payload:{
        id:7,
        softDelete:0,
        type:1,
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { cardKind, form, dispatch } = this.props;
    const { validateFields } = form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'card/saveCard',
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
    const { cardKind, form, level} = this.props;
    const { getFieldDecorator } = form;
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
    //卡种级别渲染
    let options = [];
    level? level.map(function(elem,index){
      options.push(<Option key={elem.serialNumber}>{elem.name}</Option>)
    }):null;
    return (
      <div  style={{ 'padding': '20px' }}>
        <Card title="会员卡信息" style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span = { 8 } style={{width:'251px'}} >
                <FormItem {...formItemLayout} label="会员卡名称">
                  {getFieldDecorator('name', {
                    initialValue: cardKind && cardKind.name ,
                    rules: [{ required: true, message: '请输入会员卡名称' }],
                  })(
                    <Input placeholder="请输入会员卡名称"/>
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="储值金额" {...formItemLayout}>
                  {getFieldDecorator('storedValue', {
                    initialValue: cardKind && cardKind.storedValue ,
                    rules: [{validator:this.checkPrice, required: true, }],
                  })(
                    <Input placeholder="请输入储值金额" addonAfter="元" type="number" min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="折扣权限" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: cardKind && cardKind.salesDiscount ,
                    rules: [{validator:this.checkPrice, required: true,}],
                  })(
                    <Input placeholder="请输入折扣权限" addonAfter="%"  type="number" min={0}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="会员卡级别" {...formItemLayout}>
                  {getFieldDecorator('level', {
                    initialValue: cardKind && cardKind.level ,
                    rules: [{ required: true, message: '请选择会员卡级别' }]
                  })(
                    <Select
                      showSearch
                      allowClear
                      placeholder="请选择"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
                    initialValue: cardKind && cardKind.remarks ,
                    rules: [{ required: true, message: '请填写备注' }],
                  })(
                    <Input type="textarea" rows={6}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={22} style={{width:'401px' }}>
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
  return {
    loading: state.loading.models.card,
    cardKind,
    level,
    zheKou

  };
}
export default connect(mapStateToProps)(CardModalCom)
