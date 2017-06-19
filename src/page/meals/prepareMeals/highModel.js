import React, { Component }from 'react';
import { connect } from 'dva';
import './prepareMeals.scss'
import { Button, Icon, Modal, Form, Input, Row, Col, message, Select } from 'antd';
const FormItem = Form.Item;
import './prepareMeals.scss'
const Option = Select.Option


class DynamicFieldSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: 1,
      new: 0
    }
  }
  
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  }
  
  
  add = () => {
    this.setState({
      uuid: this.state.uuid + 1
    })
    const { form, topMenuInfoByType } = this.props;
    const { dishes } = topMenuInfoByType;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.state.uuid);
    const lengthNum = keys.length + dishes.length + 1;
    if (lengthNum <= 7) {
      form.setFieldsValue({
        keys: nextKeys
      });
    } else {
      message.error('菜品不能超过7道！')
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  changeTopVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/changeTopVisible',
      payload: {
        topVisible: false
      }
    })
  }
  
  render() {
    const { form, cardLevelInfo, topMenuInfoByType } = this.props;
    console.log(topMenuInfoByType,'topMenuInfoByType')
    const { dishes, eatDay, eatTime, frequency, pointPackage } = topMenuInfoByType;
    const { getFieldDecorator, getFieldValue } = form;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      }
    };
    const selectItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    
    const formItems = keys.map((k, index) => {
      return (
        <Col key={k} span={8} className="foodCol">
          <FormItem
            {...formItemLayout}
            label={index === 0 ? `菜品${index + dishes.length + 1}` : `菜品${index + dishes.length + 1}`}
            required={false}
            key={k}
          >
            {getFieldDecorator(`names-${k}`, {
              rules: [{
                required: true,
                whitespace: true,
                message: "请选择菜品"
              }]
            })(
              <Input suffix={<Icon type="folder"/>} placeholder="请选择" style={{ width: '60%', marginRight: 8 }}/>
            )}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          </FormItem>
        </Col>
      );
    })
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={{ backgroundColor: '#f2f2f2', paddingTop: '20px' }}>
          <Col span={12}>
            <FormItem label="针对套餐" {...selectItemLayout}>
              {getFieldDecorator('pointPackage', {
                rules: [{
                  required: true,
                  message: "请选择针对套餐"
                }],
                initialValue: pointPackage.toString()
              })(
                <Select >
                  {cardLevelInfo.map((v, k) => {
                    return (
                      <Option key={k} value={v.id.toString()}>{v.name}</Option>
                    )
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="频次" {...selectItemLayout}>
              {getFieldDecorator('frequency', {
                rules: [{
                  required: true,
                  message: "请选择频次"
                }],
                initialValue: frequency.toString()
              })(
                <Select>
                  <Option value='1'>每周都吃</Option>
                  <Option value='2'>两周吃一次</Option>
                  <Option value='3'>四周吃一次</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ backgroundColor: '#f2f2f2' }}>
          <Col span={12}>
            <FormItem label="食用日" {...selectItemLayout}>
              {getFieldDecorator('eatDay', {
                rules: [{
                  required: true,
                  message: "请选择使用日"
                }],
                initialValue: eatDay.toString()
              })(
                <Select >
                  <Option value='1'>周一</Option>
                  <Option value='2'>周二</Option>
                  <Option value='3'>周三</Option>
                  <Option value='4'>周四</Option>
                  <Option value='5'>周五</Option>
                  <Option value='6'>周六</Option>
                  <Option value='7'>周日</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="食用时间" {...selectItemLayout}>
              {getFieldDecorator('eatTime', {
                rules: [{
                  required: true,
                  message: "请选择食用时间"
                }],
                initialValue: eatTime.toString()
              })(
                <Select>
                  <Option value='1'>早</Option>
                  <Option value='2'>早加</Option>
                  <Option value='3'>午</Option>
                  <Option value='4'>午加</Option>
                  <Option value='5'>晚</Option>
                  <Option value='6'>晚加</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ 'marginTop': '20px' }}>
          {
            dishes.map((v, k) => {
              return (
                <Col span={8} className="foodCol" key={k}>
                  <FormItem label={`菜品${k + 1}`} {...formItemLayout} >
                    {getFieldDecorator(`name-${k}`, {
                      validateTrigger: ['onChange', 'onBlur'],
                      initialValue: v.dishesName,
                      rules: [{
                        required: true,
                        message: "请选择菜品"
                      }]
                    })(
                      <Input suffix={<Icon type="folder"/>} style={{ width: '60%', marginRight: 8 }}/>
                    )}
                  </FormItem>
                </Col>
              )
            })
          }
          {formItems}
        </Row>
        <Row style={{ marginTop: '25px' }}>
          <Col span={15}/>
          <Col span={3} className='btnCenter'>
            <FormItem >
              <Button size="large" className="addBtn" onClick={this.add}>添加菜品</Button>
            </FormItem>
          </Col>
          <Col span={3} className='btnCenter'>
            <FormItem >
              <Button className="saveBtn" htmlType="submit" size="large">保存</Button>
            </FormItem>
          </Col>
          <Col span={3} className='btnCenter'>
            <FormItem>
              <Button onClick={this.changeTopVisible} className="cancelBtn" size="large">取消</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
class LowMOdel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  handleOk = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/changeTopVisible',
      payload: {
        topVisible: false
      }
    })
  }
  handleCancel = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/changeTopVisible',
      payload: {
        topVisible: false
      }
    })
  }
  showModal = () => {
    const { dispatch, info } = this.props;
    const { week, day, type } = info;
    console.log(week,day,type,'查询')
    dispatch({
      type: 'prepareMeals/getTopMenuByType',
      payload: {
        week, day, type
      }
    })
    dispatch({
      type: 'prepareMeals/changeTopVisible',
      payload: {
        topVisible: true
      }
    })
  }
  
  render() {
    const { info, prepareMeals, dispatch } = this.props;
    const { topVisible, cardLevelInfo, topMenuInfoByType } = prepareMeals;
    return (
      <div >
        <Button className="lastBtn" onClick={this.showModal}>编辑/添加</Button>
        <Modal
          className="lowModel"
          title={`编辑餐单：${info.title}—${info.day}`}
          visible={topVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="保存"
          width={1000}
          footer={null}
        >
          <h3>规则</h3>
          <WrappedDynamicFieldSet dispatch={dispatch} cardLevelInfo={cardLevelInfo} topMenuInfoByType={topMenuInfoByType}/>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {
  
  return {
    prepareMeals: state.prepareMeals
  };
}
export default connect(mapStateToProps)(LowMOdel);
