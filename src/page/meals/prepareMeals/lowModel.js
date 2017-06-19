import React, { Component }from 'react';
import { connect } from 'dva';
import './prepareMeals.scss'
import { Button, Icon, Modal, Form, Input, Row, Col, message } from 'antd';
const FormItem = Form.Item;
import './prepareMeals.scss'


class DynamicFieldSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: 1,
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
    const { form, menuInfoByType } = this.props;
    const { dishes } = menuInfoByType;
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
  changeVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/changeVisible',
      payload: {
        visible: false
      }
    })
  }
  
  render() {
    const { form, menuInfoByType } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { dishes } = menuInfoByType;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      }
    };
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
        <Row >
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
  
  handleOk = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/changeVisible',
      payload: {
        visible: false
      }
    })
  }
  handleCancel = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/changeVisible',
      payload: {
        visible: false
      }
    })
  }
  showModal = () => {
    const { dispatch, info } = this.props;
    const { week, day, type } = info;
    dispatch({
      type: 'prepareMeals/getMenuByType',
      payload: {
        week, day, type
      }
    })
    dispatch({
      type: 'prepareMeals/changeVisible',
      payload: {
        visible: true
      }
    })
  }
  
  render() {
    const { info, prepareMeals, dispatch } = this.props;
    const { visible, menuInfoByType } = prepareMeals;
    return (
      <div >
        <Button className="lastBtn" onClick={this.showModal}>编辑/添加</Button>
        <Modal
          className="lowModel"
          title={`编辑餐单：第${info.week}周—${info.day}—${info.title}`}
          visible={visible}
          onOk={this.handleOk}
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
    prepareMeals: state.prepareMeals
  };
}
export default connect(mapStateToProps)(LowMOdel);
