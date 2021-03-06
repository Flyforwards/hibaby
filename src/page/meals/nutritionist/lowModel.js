import React, { Component }from 'react';
import { connect } from 'dva';
import './prepareMeals.scss'
import { Button, Icon, Modal, Form, Input, Row, Col, message, Spin } from 'antd';
const FormItem = Form.Item;
import './prepareMeals.scss'
import ChooseDishes from './chooseDishesModel'
import PermissionButton from '../../../common/PermissionButton';


class DynamicFieldSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLow: true,
      changeKey: 0
    }
  }

  remove = (k) => {
    const { form, menuInfoByType, dispatch } = this.props;
    let { dishes } = menuInfoByType;
    dishes.splice(k, 1);
    dispatch({
      type: "prepareMealsDinner/changeMenuInfoByType",
      payload: { dishes }
    });
  };
  pushData = (num, dishes) => {
    const { dispatch } = this.props;
    const length = dishes.length;
    if (length < num) {
      dishes.push({ isDel: true });
      dispatch({
        type: "prepareMealsDinner/changeMenuInfoByType",
        payload: { dishes }
      })
    } else {
      message.error(`菜品不能超过${num}道!`)
    }
  };
  add = (e) => {
    const { menuInfoByType } = this.props;
    let { dishes } = menuInfoByType;

    console.log(menuInfoByType, '??????')
    switch (menuInfoByType.type) {
      case 1:
        this.pushData(7, dishes);
        break;
      case 2:
        this.pushData(4, dishes);
        break;
      case 3:
        this.pushData(6, dishes);
        break;
      case 4:
        this.pushData(4, dishes);
        break;
      case 5:
        this.pushData(6, dishes);
        break;
      case 6:
        this.pushData(4, dishes);
        break;
      default:
        this.pushData(7, dishes);
    }
  };


  handleSubmit = (e) => {
    const { menuInfoByType, dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'prepareMealsDinner/saveMenu',
          payload: {
            ...menuInfoByType
          }
        })
      }
    });
  }
  changeVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMealsDinner/changeVisible',
      payload: {
        visible: false
      }
    })
  }

  reset = (changeKey) => {
    const { form } = this.props;
    form.resetFields([`name-${changeKey}`])
  }

  chooseLowVisible = (k) => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'prepareMealsDinner/chooseVisible',
      payload: {
        chooseVisibleInfo: true
      }
    })
    dispatch({
      type: 'prepareMealsDinner/getDishesPageList',
      payload: {
        'nodeId': 1,
        'page': 1,
        'size': 10
      }
    });
    this.setState({
      changeKey: k
    });
  }

  render() {
    const { form, menuInfoByType } = this.props;
    const { changeKey, isLow } = this.state
    const { getFieldDecorator } = form;
    const { dishes } = menuInfoByType;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      }
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <ChooseDishes changeKey={changeKey} isLow={isLow} reset={this.reset.bind(this, changeKey)}/>
        <Row >
          {
            dishes.map((v, k) => {
              return (
                <Col span={8} className="foodCol" key={v.dishesName && v.dishesName + k}>
                  <FormItem label={`菜品${k + 1}`} {...formItemLayout} >
                    {getFieldDecorator(`name-${k}`, {
                      initialValue: v.dishesName && v.dishesName,
                      rules: [{
                        required: true,
                        message: "请选择菜品"
                      }]
                    })(
                      <Input onClick={() => {this.chooseLowVisible(k)}} suffix={
                        <Icon type="folder"/>} style={{
                        width: '60%',
                        marginRight: 8
                      }}/>
                    )}
                    {
                      v.isDel ? <Icon
                        className="dynamic-delete-button iconDel"
                        type="minus-circle-o"
                        onClick={() => {this.remove(k)}}
                      /> : null
                    }
                  </FormItem>
                </Col>
              )
            })
          }
        </Row>
        <Row style={{ marginTop: '25px' }}>
          <Col span={15}/>
          <Col span={3} className='btnCenter'>
            <FormItem >
              {/*<Button size="large" className="addBtn" onClick={this.add}>添加菜品</Button>*/}
              <PermissionButton size="large"  testKey='CUSTOMER_MENU_ADJUST' className="addBtn"  onClick={this.add}>
                添加菜品
              </PermissionButton>
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
              <Button onClick={this.changeVisible} className="cancelBtn" size="large">取消</Button>
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
    this.state = {
      visible: true
    }
  }

  handleCancel = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMealsDinner/changeVisible',
      payload: {
        visible: false
      }
    })
  }

  render() {
    const { prepareMeals, dispatch } = this.props;
    const { visible, menuInfoByType } = prepareMeals;
    const { type } = menuInfoByType;
    let title = type == 1 ? '早餐' : type == 2 ? '早加' : type == 3 ? '午餐' : type == 4 ? '午加' : type == 5 ? '晚餐' : type == 6 ? '晚加' : '';
    return (
      <div >
        <Modal
          key={visible}
          className="lowModel"
          title={`编辑餐单：第${menuInfoByType.week}周—${menuInfoByType.day}—${title}`}
          visible={visible}
          onCancel={this.handleCancel}
          okText="保存"
          width={1000}
          footer={null}
        >
            <h3 className="standardFood">标准菜品</h3>
            <WrappedDynamicFieldSet dispatch={dispatch} menuInfoByType={menuInfoByType}/>
        </Modal>

      </div>
    )
  }
}
function mapStateToProps(state) {

  return {
    prepareMeals: state.prepareMealsDinner,
    loading: state.loading
  };
}
export default connect(mapStateToProps)(LowMOdel);
