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
      changeKey: 0
    }
    this.infoKey = 0;
  }

  remove = (k) => {
    const { topMenuInfoByType, dispatch } = this.props;
    let { dishes } = topMenuInfoByType;
    dishes.splice(k, 1);
    dispatch({
      type: "prepareMealsDinner/changeTopMenuInfoByType",
      payload: { dishes }
    });
  }


  add = () => {
    const { topMenuInfoByType, dispatch } = this.props;
    const { dishes } = topMenuInfoByType;
    dishes.push({ isDel: true })
    dispatch({
      type: "prepareMealsDinner/changeTopMenuInfoByType",
      payload: { dishes }
    })
  }


  handleSubmit = (e) => {
    const { dispatch, topMenuInfoByType } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'prepareMealsDinner/saveTopMenu',
          payload: { ...topMenuInfoByType }

        })
      }
    });
    dispatch({
      type: 'prepareMealsDinner/chooseVisible',
      payload: {
        topVisible: false
      }
    })
  }
  reset = (changeKey) => {
    const {form} = this.props;
    form.resetFields([`dishesName-${changeKey + 1}`])
  }


  changeTopVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMealsDinner/changeTopVisible',
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
      type: 'prepareMealsDinner/chooseVisible',
      payload: {
        chooseVisibleInfo: true
      }
    })
  }

  changePointPackage = (value) => {
    const { dispatch } = this.props;
    const pointPackage = parseInt(value);

    dispatch({
      type: 'prepareMealsDinner/changePointPackage',
      payload: {
        pointPackage
      }
    })
  }

  changeEatDay = (value) => {
    const { dispatch } = this.props;
    const infoKey = this.infoKey;
    const eatDayValue = parseInt(value);
    dispatch({
      type: 'prepareMealsDinner/changeEatDay',
      payload: {
        eatDayValue, infoKey
      }
    })

  }
  changeEatTime = (value) => {
    const { dispatch } = this.props;
    const infoKey = this.infoKey;
    const eatTimeValue = parseInt(value);
    dispatch({
      type: 'prepareMealsDinner/changeEatTime',
      payload: {
        eatTimeValue, infoKey
      }
    })

  }
  changeFrequency = (value) => {
    const { dispatch } = this.props;
    const infoKey = this.infoKey;
    const frequencyValue = parseInt(value);
    dispatch({
      type: 'prepareMealsDinner/changeFrequency',
      payload: {
        frequencyValue, infoKey
      }
    })
  }

  render() {
    const { form, cardLevelInfo, topMenuInfoByType } = this.props;
    const { changeKey, isLow } = this.state;
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
        <ChooseDishes changeKey={changeKey} isLow={isLow} reset={this.reset.bind(this, changeKey)}/>
        <Row style={{ backgroundColor: "#CFCFCF", textAlign: 'center', paddingTop: '20px' }}>
          <Col span={6}>
            <FormItem label="针对套餐" {...selectItemLayout}>
              {getFieldDecorator('pointPackage', {
                initialValue: topMenuInfoByType.pointPackage && topMenuInfoByType.pointPackage.toString(),
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
                      initialValue: v.eatDay && v.eatDay.toString(),
                      rules: [{
                        required: true,
                        message: "请选择实用日"
                      }]
                    })(
                      <Select onSelect={(value) => {
                        this.infoKey = k;
                        this.changeEatDay(value);
                      }}>
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
                      initialValue: v.eatTime && v.eatTime.toString(),
                      rules: [{
                        required: true,
                        message: "请选择食用时间"
                      }]
                    })(
                      <Select onSelect={(value) => {
                        this.infoKey = k;
                        this.changeEatTime(value);
                      }}>
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
                      initialValue: v.frequency && v.frequency.toString(),
                      rules: [{
                        required: true,
                        message: "请选择频次"
                      }]
                    })(
                      <Select onSelect={(value) => {
                        this.infoKey = k;
                        this.changeFrequency(value);
                      }}>
                        <Option value="1">每周都吃</Option>
                        <Option value="2">两周吃一次</Option>
                        <Option value="3">四周吃一次</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                {
                  v.isDel ? <Col span={2} style={{ textAlign: 'center' }}>
                    <Button className="btnDelIcon" onClick={() => this.remove(k)}>
                      删除
                    </Button>
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
      type: 'prepareMealsDinner/changeTopVisible',
      payload: {
        topVisible: false
      }
    })
  }
  handleCancel = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMealsDinner/changeTopVisible',
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
          key={topVisible}
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
    prepareMeals: state.prepareMealsDinner
  };
}
export default connect(mapStateToProps)(LowMOdel);
