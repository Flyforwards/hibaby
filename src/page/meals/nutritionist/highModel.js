import React, { Component }from 'react';
import { connect } from 'dva';
import { Button, Icon, Modal, Form, Input, Row, Col, message, Select } from 'antd';
import ChooseDishes from './chooseDishesModel'
import './prepareMeals.scss'
const Option = Select.Option
const FormItem = Form.Item;


class DynamicFieldSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLow: false,
      changeKey: 0,
      otherInfo: {
        frequency: null,
        eatDay: null,
        eatTime: null
      }
    }
  }
  
  remove = (k) => {
    const { topMenuInfoByType, dispatch } = this.props;
    let { dishes } = topMenuInfoByType;
    dishes.splice(k, 1);
    dispatch({
      type: "prepareMeals/changeTopMenuInfoByType",
      payload: { dishes }
    });
  }
  
  
  add = () => {
    const { topMenuInfoByType, dispatch } = this.props;
    const { dishes } = topMenuInfoByType;
    dishes.push({ isDel: true })
    dispatch({
      type: "prepareMeals/changeTopMenuInfoByType",
      payload: { dishes }
    })
  }
  
  
  handleSubmit = (e) => {
    const { dispatch, topMenuInfoByType } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'prepareMeals/saveTopMenu',
          payload: { ...topMenuInfoByType }
          
        })
      }
    });
    dispatch({
      type: 'prepareMeals/chooseVisible',
      payload: {
        topVisible: false
      }
    })
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
  chooseVisible = (k) => {
    const { dispatch } = this.props;
    this.setState({
      changeKey: k
    })
    
    dispatch({
      type: 'prepareMeals/chooseVisible',
      payload: {
        chooseVisibleInfo: true
      }
    })
  }
  
  changePointPackage = (value) => {
    const { dispatch } = this.props;
    const pointPackage = parseInt(value);
    
    dispatch({
      type: 'prepareMeals/changePointPackage',
      payload: {
        pointPackage
      }
    })
  }
  
  changeEatDay = (value) => {
    const { otherInfo } = this.state;
    otherInfo.eatDay = parseInt(value);
    this.setState({
      otherInfo
    })
  }
  changeEatTime = (value) => {
    const { otherInfo } = this.state;
    otherInfo.eatTime = parseInt(value);
    this.setState({
      otherInfo
    })
  }
  changeFrequency = (value) => {
    const { otherInfo } = this.state;
    otherInfo.frequency = parseInt(value);
    this.setState({
      otherInfo
    })
  }
  
  render() {
    const { form, cardLevelInfo, topMenuInfoByType } = this.props;
    const { changeKey, isLow, otherInfo } = this.state;
    const { dishes } = topMenuInfoByType;
    const { getFieldDecorator } = form;
    const selectItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <ChooseDishes changeKey={changeKey} isLow={isLow} otherInfo={otherInfo}/>
        <Row style={{ backgroundColor: "#CFCFCF", textAlign: 'center', paddingTop: '20px' }}>
          <Col span={6}>
            <FormItem label="针对套餐" {...selectItemLayout}>
              {getFieldDecorator('pointPackage', {
                initialValue: topMenuInfoByType.pointPackage && topMenuInfoByType.pointPackage,
                rules: [{
                  required: true,
                  message: "请选择针对套餐"
                }]
              })(
                <Select onSelect={this.changePointPackage}>
                  {cardLevelInfo.map((v, k) => {
                    return (
                      <Option key={k} value={v.id.toString()}>{v.name}</Option>
                    )
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        
        
        {
          dishes.map((v, k) => {
            return (
              <Row style={{ 'marginTop': '20px' }} key={k}>
                <Col span={5} className="foodCol">
                  <FormItem label={`菜品${k + 1}`} {...selectItemLayout}>
                    {getFieldDecorator(`dishesName-${k + 1}`, {
                      initialValue: v.dishesName && v.dishesName,
                      rules: [{
                        required: true,
                        message: "请选择菜品"
                      }]
                    })(
                      <Input
                        onClick={() => {this.chooseVisible(k)}}
                        suffix={<Icon type="folder"/>}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label='食用日' {...selectItemLayout}>
                    {getFieldDecorator(`eatDay-${k + 1}`, {
                      initialValue: v.eatDay && v.eatDay,
                      rules: [{
                        required: true,
                        message: "请选择实用日"
                      }]
                    })(
                      <Select onSelect={this.changeEatDay}>
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
                <Col span={6}>
                  <FormItem label='食用时间' {...selectItemLayout}>
                    {getFieldDecorator(`eatTime-${k + 1}`, {
                      initialValue: v.eatTime && v.eatTime,
                      rules: [{
                        required: true,
                        message: "请选择食用时间"
                      }]
                    })(
                      <Select onSelect={this.changeEatTime}>
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
                <Col span={5}>
                  <FormItem label="频次" {...selectItemLayout}>
                    {getFieldDecorator(`frequency-${k + 1}`, {
                      initialValue: v.frequency && v.frequency,
                      rules: [{
                        required: true,
                        message: "请选择频次"
                      }]
                    })(
                      <Select onSelect={this.changeFrequency}>
                        <Option value="1">每周都吃</Option>
                        <Option value="2">两周吃一次</Option>
                        <Option value="3">四周吃一次</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                {
                  v.isDel ? <Col span={2} style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.remove(k)}>删除</Button>
                  </Col> : null
                }
              </Row>
            )
          })
        }
        
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
  
  render() {
    const { prepareMeals, dispatch } = this.props;
    const { topVisible, cardLevelInfo, topMenuInfoByType } = prepareMeals;
    return (
      <div >
        <Modal
          className="lowModel"
          title={`编辑餐单：高档食材—${topMenuInfoByType.day}`}
          visible={topVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="保存"
          width={1100}
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
