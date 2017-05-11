"use strict" 
import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
@createForm()
class AddChildNode extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        console.log("ok")
        this.props.onCancel()
    }
    checkbox() {
        console.log("checkbox")

    }
    handleAfterClose() {
        this.props.form.resetFields()
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
        console.log(Date.now())
        setTimeout(() => {
            let now = Date.now()
            if (now % 2 === 1) {
                callback()
            } else {
                callback(new Error('自定义验证函数未通过'))
            }
        }, 1000)
    }
    render() {
        const {visible, form, confirmLoading} = this.props
        const {getFieldDecorator} = form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                title="筛选项"
                okText="确定"
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
            <div className="AddChildNode">

            </div>
            </Modal>
        )
    }
}

AddChildNode.propTypes = {}
AddChildNode.defaultProps = {}

export default AddChildNode
