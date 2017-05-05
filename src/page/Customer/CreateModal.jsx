"use strict"

import React, { Component } from 'react'
import { Modal, Form, Input, Radio, Select, Checkbox, Icon } from 'antd'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
import _ from 'lodash'
@createForm()
class CreateModal extends Component {
    constructor(props) {
        super(props)   
    }
    state = { visible: false }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk(visible) {
        console.log("ok")
        this.props.onCancel()
    }
    checkbox(index) {
        console.log("index",index)
        
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
                onOk={this.handleOk.bind(this,visible)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
            <div className="CreateList">
                <span onClick={this.checkbox.bind(this,1)}><input type="checkbox" id="age"/><label htmlFor="age">年龄</label></span>
                <span onClick={this.checkbox.bind(this,2)}><input type="checkbox" id="period"/><label htmlFor="period">预产期 ,</label></span>
                <span onClick={this.checkbox.bind(this,3)}><input type="checkbox" id="pregnancy"/><label htmlFor="pregnancy">孕期</label></span>
                <span onClick={this.checkbox.bind(this,4)}><input type="checkbox" id="hospitals"/><label htmlFor="hospitals">生产医院</label></span>
                <span onClick={this.checkbox.bind(this,5)}><input type="checkbox" id="tires"/><label htmlFor="tires">第几胎</label></span>
                <span onClick={this.checkbox.bind(this,6)}><input type="checkbox" id="information"/><label htmlFor="information">客资来源</label></span>
                <span onClick={this.checkbox.bind(this,7)}><input type="checkbox" id="point"/><label htmlFor="point">关注点</label></span>
                <span onClick={this.checkbox.bind(this,8)}><input type="checkbox" id="Package"/><label htmlFor="Package">意向套餐</label></span>
                <span onClick={this.checkbox.bind(this,9)}><input type="checkbox" id="keyword"/><label htmlFor="keyword">搜索关键字</label></span>
                <span onClick={this.checkbox.bind(this,10)}><input type="checkbox" id="Operator1"/><label htmlFor="Operator1">操作者1</label></span>
                <span onClick={this.checkbox.bind(this,11)}><input type="checkbox" id="address"/><label htmlFor="address">现住址</label></span>
                <span onClick={this.checkbox.bind(this,12)}><input type="checkbox" id="place"/><label htmlFor="place">籍贯</label></span>
                <span onClick={this.checkbox.bind(this,13)}><input type="checkbox" id="Nation"/><label htmlFor="Nation">民族</label></span>
                <span onClick={this.checkbox.bind(this,14)}><input type="checkbox" id="package"/><label htmlFor="package">购买套餐</label></span>
                <span onClick={this.checkbox.bind(this,15)}><input type="checkbox" id="Membership"/><label htmlFor="Membership">会员身份</label></span>
                <span onClick={this.checkbox.bind(this,16)}><input type="checkbox" id="Operator2"/><label htmlFor="Operator2">操作者2</label></span>
                <span onClick={this.checkbox.bind(this,17)}><input type="checkbox" id="date"/><label htmlFor="date">宝宝生产日期</label></span>
            </div>
            </Modal>
        )
    }
}

CreateModal.propTypes = {}
CreateModal.defaultProps = {}

export default CreateModal
