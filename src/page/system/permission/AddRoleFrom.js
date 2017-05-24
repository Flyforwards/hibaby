"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
import "./permission.scss"

@createForm()
class AddRoleFrom extends Component {
  constructor(props) {
    super(props)
  }
  state = { visible: false }
  handleCancel() {
    this.props.onCancel()
  }
  handleOk() {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.props.add) {
            this.props.dispatch({
              type: 'permission/submitCreateRole',
              payload: { roleName: values.name }
            })
          } else {
            this.props.dispatch({
              type: 'permission/submitEditRole',
              payload: {
                roleName: values.name,
                id: this.props.record.id,
              }
            })
          }
          this.props.onCancel()
        }
      });

  }

  handleAfterClose() {

  }


  render() {
    const { visible, record } = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };
    let roleName = "";

    let node = null;
    let modalTitle = "";
    if (this.props.add) {
      modalTitle = "添加角色";
    } else {
      modalTitle = "编辑角色";
      roleName = record ? record.roleName:"";
    }
    node = (
      <Form>
        <FormItem
          {...( formItemLayout) }
          label = {'角色名称'}
          required={ false}
        >
          {getFieldDecorator('name', {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请填写角色名称",
            }],
            initialValue: roleName
          })(
            <Input style={{ width: '60%', marginRight: 8 }} />
          )}
        </FormItem>
      </Form>
    );


    return (
      <Modal
        visible = { visible }
        title = { modalTitle }
        okText =  "保存"
        cancelText = "取消"
        onCancel = {this.handleCancel.bind(this)}
        afterClose = {this.handleAfterClose.bind(this)}
        onOk = {this.handleOk.bind(this)}
        closable = { false }
        width = { 300 }
        wrapClassName = { "vertical-center-modal" }
      >
      <div className="fromCreateList">
        {
          node
        }
      </div>
      </Modal>
  )
  }
}

function mapStateToProps(state) {
  const {
    data,
    code
  } = state.permission;
  return {
    loading: state.loading.models.system,
    data
  };
}
export default connect(mapStateToProps)(AddRoleFrom)
