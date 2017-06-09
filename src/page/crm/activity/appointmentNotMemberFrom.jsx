
import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal,  Card,Input,Button,Form } from 'antd'
import PropTypes from 'prop-types'
import './activityIndex.scss'
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class appointmentNotMemberFrom extends Component {
  constructor(props) {
    super(props)
  }
  handleCancel() {
    this.props.onCancel();
  }
  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.activityId = this.props.selectRecord.id;
        values.from = this.props.from;
        this.props.dispatch({
          type: "activity/saveOutsiderCustomer",
          payload: values
        })
        this.props.onCancel();
      }
    })
  }
  render() {
    let { visible  } = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        key = { visible }
        visible = { visible }
        title = { "预约" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        width = { 300 }
        wrapClassName = { "vertical-center-modal" }
      >
        <Form>
          <FormItem label={"客户姓名"}>
            {getFieldDecorator('name', {rules: [{ required: true, message: '请填写客户姓名！' }],
            })(<Input className="input"/>
            )}
          </FormItem>
          <FormItem label={"联系电话"}>
            {getFieldDecorator('contact', {rules: [{ required: true, message: '请填写联系电话！' }],
            })(<Input className="input"/>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

appointmentNotMemberFrom.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  selectRecord: PropTypes.object,
}


export default connect()(appointmentNotMemberFrom)
