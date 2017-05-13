"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
import "./AlertModalFrom.scss"


@createForm()
class AddRoleFrom extends Component {
  constructor(props) {
    super(props)
  }
  handleCancel() {
    this.props.onCancel();
  }
  handleOk() {
    this.props.onOk();
  }

  handleAfterClose() {

  }


  render() {
    let { visible, modalTitle , okText, cancel, message } = this.props

    return (
      <Modal
        key = { visible }
        visible = { visible }
        title = { modalTitle || "提示" }
        okText = { okText || "确定" }
        cancelText = { cancel || "取消" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        closable = { false }
        width = { 300 }
        wrapClassName = { "alert-vertical-center-modal" }
      >
        <div className="fromCreateList">
          <div>
            {
              message || "点击确定完成操作"
            }
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect()(AddRoleFrom)
