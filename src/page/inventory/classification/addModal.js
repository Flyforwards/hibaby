import React, { Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col, Table, Popconfirm, Modal, Select } from 'antd';
import { Link, routerRedux } from 'react-router';
import '../warehouse/inventoryIndex.scss'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;
import moment from 'moment'

@createForm()
class ClassificationIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    
  }
  
  
  //创建
  changeVisibleAdd(isChangge) {
    this.props.dispatch({
      type: 'classification/changeVisibleAdd',
      payload: isChangge
    })
    this.reset();
  }
  
  
  changeVisibleView(isChangge) {
    this.props.dispatch({
      type: 'classification/changeVisibleView',
      payload: isChangge
    })
  }
  

  reset() {
    this.props.form.resetFields();
  }
  
  
  handleSubmit = (e) => {
    console.log(2)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postInfo = values.parentId ? {
          parentId: parseInt(values.parentId),
          type: parseInt(values.type),
          name: values.name
        } : {
          type: parseInt(values.type),
          name: values.name
        }
        
        this.props.dispatch({
          type: 'classification/addStock',
          payload: postInfo
        }).then( this.props.form.resetFields())
       
        
      }
    });
  }
  
  
  render() {
    const { visibleAdd, form, parent } = this.props;
    const { getFieldDecorator } = form;
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
    return (
      <Modal
        title='存货分类-新增'
        visible={visibleAdd}
        footer={null}
        onCancel={
          this.changeVisibleAdd.bind(this, false)
        }
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='分类名称' {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请填写分类名称！' }]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label='分类类别' {...formItemLayout}>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择分类类别！' }]
            })(
              <Select >
                <Option value="1">主类</Option>
                <Option value="2">子类</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label='上级类别' {...formItemLayout}>
            {getFieldDecorator('parentId', {})(
              <Select >
                {
                  parent.map((v, k) => {
                    return (
                      <Option key={k} value={`${v.id}`}>{v.name}</Option>
                    )
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem style={{'textAlign':'center'}}>
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
    ...state.classification
  };
}

export default connect(mapStateToProps)(ClassificationIndex);
