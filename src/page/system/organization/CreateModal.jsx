"use strict"

import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
@createForm()
class CreateModal extends Component {
    constructor(props) {
        super(props)
        
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        console.log("ok")
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
            <div className="CreateList">
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />年龄</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />预产期</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />孕期</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />生产医院</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />第几胎</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />客资来源</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />关注点</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />意向套餐</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />搜索关键字</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />操作者1</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />现住址</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />籍贯</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />民族</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />购买套餐</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />会员身份</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />操作者2</span>
                <span onClick={this.checkbox.bind(this)}><input type="checkbox" />宝宝生产日期</span>
            </div>
            </Modal>
        )
    }
}

CreateModal.propTypes = {}
CreateModal.defaultProps = {}

export default CreateModal
