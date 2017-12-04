import React, { Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col, Table, Popconfirm, Modal, Select, Icon, message } from 'antd';
import { Link, routerRedux } from 'react-router';
import '../warehouse/inventoryIndex.scss'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;
import moment from 'moment'
let uuid = 0;
@createForm()
class ancillaryIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    
  }
  
  
  //创建
  changeVisibleAdd(isChangge) {
    this.props.dispatch({
      type: 'ancillary/changeVisibleAdd',
      payload: isChangge
    })
    
  }
  
  
  changeVisibleView(isChangge) {
    this.props.dispatch({
      type: 'ancillary/changeVisibleView',
      payload: isChangge
    })
  }
  
  
  reset() {
    this.props.form.resetFields();
  }
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.keys.length == 0) {
          message.error('至少添加一个属性值！')
          
        } else {
          
          let data = [];
          
          Object.keys(values).map((v, k) => {
            if (v.toString().indexOf('attributeValue') > -1) {
              let name = {};
              name.name = parseInt(values[v]);
              data.push(name)
              
            }
          })
          
          
          this.props.dispatch({
            type: 'ancillary/addAttributes',
            payload: {
              attributeName: values.attributeName,
              data
            }
          })
          this.props.form.resetFields();
          
        }
        
        
      }
    });
  }
  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys
    });
  }
  
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  }
  
  render() {
    const { visibleAdd, form, parent } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    
    
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayout }
          label='属性值'
          required={false}
          key={k}
        >
          {getFieldDecorator(`attributeValue-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入属性值"
            }]
          })(
            <Input style={{ width: '60%', marginRight: 8 }}/>
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    
    
    return (
      <Modal
        title='辅助属性-新增'
        visible={visibleAdd}
        footer={null}
        onCancel={() => {
          this.props.form.resetFields();
          this.changeVisibleAdd(false)
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='属性名称' {...formItemLayout}>
            {getFieldDecorator('attributeName', {
              rules: [{ required: true, message: '请填写属性名称！' }]
            })(
              <Input/>
            )}
          </FormItem>
          
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus"/> 添加属性值
            </Button>
          </FormItem>
          
          
          <FormItem style={{ 'textAlign': 'center' }}>
            <Button htmlType="submit" className='button-group-2'>保存</Button>
          </FormItem>
        </Form>
      
      </Modal>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    ...state.ancillary
  };
}

export default connect(mapStateToProps)(ancillaryIndex);
