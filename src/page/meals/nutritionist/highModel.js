import React, { Component }from 'react';
import { connect } from 'dva';
import { Button, Icon, Modal, Form, Input, Row, Col, message, Select } from 'antd';
import ChooseDishes from './chooseDishesModel'
import './prepareMeals.scss'
import PermissionButton from '../../../common/PermissionButton';

const Option = Select.Option
const FormItem = Form.Item;


class DynamicFieldSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLow: false,
      changeKey: 0,
      isEm: false
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
  chooseVisible = (k, isEm) => {
    const { dispatch } = this.props;
    isEm ? this.setState({
      isEm: true,
      changeKey: k
    }) :
      this.setState({
        isEm: false,
        changeKey: k
      })
    dispatch({
      type: 'prepareMealsDinner/getDishesPageList',
      payload: {
        'nodeId': 1,
        'page': 1,
        'size': 10
      }
    });
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
  changeEmEatDay = (value) => {
    const { dispatch } = this.props;
    const infoKey = this.infoKey;
    const emEatDayValue = parseInt(value);
    dispatch({
      type: 'prepareMealsDinner/changeEmEatDay',
      payload: {
        emEatDayValue, infoKey
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
  changeEmEatTime = (value) => {
    const { dispatch } = this.props;
    const infoKey = this.infoKey;
    const emEatTimeValue = parseInt(value);
    dispatch({
      type: 'prepareMealsDinner/changeEmEatTime',
      payload: {
        emEatTimeValue, infoKey
      }
    })
    
  }

  changeCycle = (value) => {
    const { dispatch } = this.props;
    const infoKey = this.infoKey;
    const cycleValue = parseInt(value);
    dispatch({
      type: 'prepareMealsDinner/changeCycle',
      payload: {
        cycleValue, infoKey
      }
    })
  }
  changeEmCycle = (value) => {
    const { dispatch } = this.props;
    const infoKey = this.infoKey;
    const emCycleValue = parseInt(value);
    dispatch({
      type: 'prepareMealsDinner/changeEmCycle',
      payload: {
        emCycleValue, infoKey
      }
    })
  }
  
  render() {
    const { form, cardLevelInfo, topMenuInfoByType, } = this.props;
    const { changeKey, isLow, isEm} = this.state;
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
        <ChooseDishes changeKey={changeKey} isLow={isLow} isEm={isEm} reset={this.reset.bind(this, changeKey)}/>
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
              <div style={{ 'marginTop': '20px' }} key={v.dishesName && v.dishesName + k}>
              <Row >
                <Col span={6} className="foodCol">
                  <FormItem label={`菜品${k + 1}`} {...selectItemLayout}>
                    {getFieldDecorator(`dishesName-${k + 1}`, {
                      initialValue: v.dishesName && v.dishesName,
                      rules: [{
                        required: true,
                        message: "请选择菜品"
                      }]
                    })(
                      <Input
                        onClick={() => {this.chooseVisible(k,false)}}
                        suffix={<Icon type="folder"/>}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="第几周" {...selectItemLayout}>
                    {getFieldDecorator(`cycle-${k + 1}`, {
                      initialValue: v.cycle && v.cycle.toString(),
                      rules: [{
                        required: true,
                        message: "请选择第几周"
                      }]
                    })(
                      <Select
                        onSelect={(value) => {
                          this.infoKey = k;
                          this.changeCycle(value);
                        }}>
                        <Option value="1">第一周</Option>
                        <Option value="2">第二周</Option>
                        <Option value="3">第三周</Option>
                        <Option value="4">第四周</Option>
                        <Option value="5">第五周</Option>
                        <Option value="6">第六周</Option>
                        <Option value="7">第七周</Option>
                        <Option value="8">第八周</Option>
                        <Option value="9">第九周</Option>
                        <Option value="10">第十周</Option>
                      </Select>
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
              </Row>
              <Row>
                <Col span={5} offset={1} className="foodCol">
                  <FormItem label='首周轮空' {...selectItemLayout}>
                    {getFieldDecorator(`em_dishesName-${k + 1}`, {
                      initialValue: v.em_dishesName && v.em_dishesName,
                      rules: [{
                        required: true,
                        message: "请选择菜品"
                      }]
                    })(
                      <Input
                        onClick={() => {this.chooseVisible(k, true)}}
                        suffix={<Icon type="folder"/>}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="第几周" {...selectItemLayout}>
                    {getFieldDecorator(`em_cycle-${k + 1}`, {
                      initialValue: v.em_cycle && v.em_cycle.toString(),
                      rules: [{
                        required: true,
                        message: "请选择第几周"
                      }]
                    })(
                      <Select onSelect={(value) => {
                        this.infoKey = k;
                        this.changeEmCycle(value);
                      }}>
                        <Option value="1">第一周</Option>
                        <Option value="2">第二周</Option>
                        <Option value="3">第三周</Option>
                        <Option value="4">第四周</Option>
                        <Option value="5">第五周</Option>
                        <Option value="6">第六周</Option>
                        <Option value="7">第七周</Option>
                        <Option value="8">第八周</Option>
                        <Option value="9">第九周</Option>
                        <Option value="10">第十周</Option>
        
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label='食用日' {...selectItemLayout}>
                    {getFieldDecorator(`em_eatDay-${k + 1}`, {
                      initialValue: v.em_eatDay && v.em_eatDay.toString(),
                      rules: [{
                        required: true,
                        message: "请选择实用日"
                      }]
                    })(
                      <Select onSelect={(value) => {
                        this.infoKey = k;
                        this.changeEmEatDay(value);
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
                    {getFieldDecorator(`em_eatTime-${k + 1}`, {
                      initialValue: v.em_eatTime && v.em_eatTime.toString(),
                      rules: [{
                        required: true,
                        message: "请选择食用时间"
                      }]
                    })(
                      <Select onSelect={(value) => {
                        this.infoKey = k;
                        this.changeEmEatTime(value);
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
                {
                  v.isDel ? <Col span={2} offset={22} style={{ textAlign: 'right','marginTop':'-20px' }}>
                    {/*<Button className="btnDelIcon" onClick={() => this.remove(k)}>*/}
                      {/*删除*/}
                    {/*</Button>*/}
                    <PermissionButton testKey='CUSTOMER_MENU_ADJUST' className="btnDelIcon"  onClick={() => this.remove(k)}>
                      删除
                    </PermissionButton>
                  </Col> : null
                }
              </Row>
              </div>
            )
          })
        }

        <Row style={{ marginTop: '25px' }}>
          <Col span={15}/>
          <Col span={3} className='btnCenter'>
            <FormItem >
              <PermissionButton size="large"  testKey='CUSTOMER_MENU_ADJUST' className="addBtn"  onClick={this.add}>
                添加菜品
              </PermissionButton>
              {/*<Button size="large" className="addBtn" onClick={this.add}>添加菜品</Button>*/}
            </FormItem>
          </Col>
          <Col span={3} className='btnCenter'>
            <FormItem >
              {/*<Button className="saveBtn" htmlType="submit" size="large">保存</Button>*/}
              <PermissionButton   testKey='CUSTOMER_MENU_ADJUST' className="saveBtn"  htmlType="submit" size="large">
                保存
              </PermissionButton>
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
