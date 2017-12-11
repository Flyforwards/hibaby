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
  
  
  changeVisibleView(isChangge) {
    this.props.dispatch({
      type: 'classification/changeVisibleView',
      payload: isChangge
    })
  }
  
  
  //修改title
  changeTitle(title) {
    this.props.dispatch({
      type: 'classification/changeTitle',
      payload: title
    })
  }
  
  
  saveInfo = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let postInfo = values.editParentId == '0' ? {
          type: parseInt(values.editType),
          name: values.editName,
          id: this.props.stockDetail.id
        } : {
          parentId: parseInt(values.editParentId),
          type: parseInt(values.editType),
          name: values.editName,
          id: this.props.stockDetail.id
        }
        this.props.dispatch({
          type: 'classification/addStock',
          payload: postInfo
        })
      }
    });
  }
  
  changeDisabled(isDisabled) {
    this.props.dispatch({
      type: 'classification/changeDisabled',
      payload: isDisabled
    })
  }
  
  changeClassificationEdit(value) {
    console.log(value,'????????')
    let isClassificationEdit = value == '1' ? false : true;
    this.props.dispatch({
      type: 'classification/changeClassificationEdit',
      payload: isClassificationEdit
    })
  }
  
  render() {
    const { visibleView, title, form, parent, isDisabled,isClassificationEdit } = this.props;
    const { getFieldDecorator } = form;
    let name = this.props.stockDetail && this.props.stockDetail.name
    let id = this.props.stockDetail && this.props.stockDetail.id
    let type = this.props.stockDetail && this.props.stockDetail.type.toString();
    let parentId = this.props.stockDetail && this.props.stockDetail.parentId.toString();
    console.log(this.props.isClassificationEdit, 'isClassificationEdit')
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
        title={`存货分类-${title}`}
        visible={visibleView}
        footer={null}
        onCancel={() => {
          this.changeVisibleView(false);
          this.changeDisabled(true);
          this.changeTitle('查看');
        }}
      >
        <Form onSubmit={this.saveInfo}>
          <FormItem label='分类名称' {...formItemLayout}>
            {getFieldDecorator('editName', {
              rules: [{ required: true, message: '请填写分类名称！' }],
              initialValue: name
            })(
              <Input disabled={isDisabled}/>
            )}
          </FormItem>
          <FormItem label='分类类别' {...formItemLayout}>
            {getFieldDecorator('editType', {
              rules: [{ required: true, message: '请选择分类类别！' }],
              initialValue: type
              
            })(
              <Select disabled={isDisabled} onChange={this.changeClassificationEdit.bind(this)}>
                <Option value="1">主类</Option>
                <Option value="2">子类</Option>
              </Select>
            )}
          </FormItem>
          {
            isClassificationEdit &&
            <FormItem label='上级类别' {...formItemLayout}>
              {getFieldDecorator('editParentId', {
                initialValue: parentId=='0'?'':parentId,
                rules: [{ required: true, message: '请选择主类类别！' }]
              })(
                <Select disabled={isDisabled} onChange={this.changeClassificationEdit.bind(this)}>
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
            
          }
          <FormItem style={{ 'textAlign': 'center' }}>
            {
              isDisabled == true ?
                <Button className='one-button' onClick={() => {
                  this.changeTitle('编辑')
                  this.changeDisabled(false);
                }}>编辑</Button> :
                <div>
                  <Button htmlType="submit" className='button-group-2' style={{ 'marginRight': '20px' }}>保存</Button>
                  <Button
                    className='button-group-1'
                    onClick={() => {
                      this.changeDisabled(true);
                      this.changeTitle('查看');
                      this.props.form.resetFields();
                      parentId=='0'?this.changeClassificationEdit('1'):this.changeClassificationEdit('2')
                    }}>取消</Button>
                </div>
            }
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
