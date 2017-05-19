import React, { Component } from 'react'
import { connect } from 'dva'
import { Select, Button, Form, Input, Icon, Card, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

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
    const { cardKind, form, dispatch } = this.props;
    const { validateFields } = form;
    e.preventDefault();
    validateFields((err, values) => {
      const id = cardKind && cardKind.id;
      dispatch({
        type: 'card/saveCard',
        payload: { id, ...values }
      })
    });
  }
  
  render() {
    const { cardKind, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div  style={{ 'padding': '20px' }}>
        <Card title="会员卡信息" style={{ width: '80%' }}>
          <Form onSubmit={this.handleSubmit}>
            
            <FormItem label="会员卡名称">
              {getFieldDecorator('name', { initialValue: cardKind && cardKind.name }, {
                //rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input placeholder="请输入会员卡名称"/>
              )}
            </FormItem>
            <FormItem label="储值金额">
              {getFieldDecorator('storedValue', { initialValue: cardKind && cardKind.storedValue }, {
                //rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input placeholder="请输入储值金额"/>
              )}
            </FormItem>
            <FormItem label="折扣权限">
              {getFieldDecorator('salesDiscount', { initialValue: cardKind && cardKind.salesDiscount }, {
                //rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Select
                  showSearch
                  allowClear
                  style={{ width: 200 }}
                  placeholder="请选择"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="100">100</Option>
                  <Option value="80">80</Option>
                  <Option value="70">70</Option>
                  <Option value="60">60</Option>
                  <Option value="50">50</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="会员卡级别">
              {getFieldDecorator('level', { initialValue: cardKind && cardKind.level }, {
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
            <FormItem label="备注">
              {getFieldDecorator('remarks', { initialValue: cardKind && cardKind.remarks }, {
                //rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input type="textarea" rows={6}/>
              )}
            </FormItem>
            <FormItem label="卡种类型">
              {getFieldDecorator('cardType', { initialValue: cardKind && cardKind.cardType }, {
                rules: [{ required: true, message: '请选择卡种类型' }]
              })(
                <RadioGroup >
                  <Radio value={1}>模板卡种</Radio>
                  <Radio value={2}>自定义卡种</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <Button>返回</Button>
            <FormItem>
              <Button type="primary" htmlType="submit">保存</Button>
            </FormItem>
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
