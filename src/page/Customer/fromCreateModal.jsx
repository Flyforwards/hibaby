"use strict"
import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
import './fromModal.scss'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
import _ from 'lodash'
@createForm()
class FromCreateModal extends Component {
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
    handleCancel(){
        this.props.onCancel()
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
        const {visible, form, confirmLoading,modelsList,ListIndex} = this.props
        let list = []
         {
          if(modelsList){
            console.log("ss",modelsList)
            list = modelsList
          }else{
            
          }
        }
        const {getFieldDecorator} = form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                okText="确定"
                onCancel={this.handleCancel.bind(this)}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onOk={this.handleOk.bind(this,visible)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
            <div className="fromCreateList">
                <Form onSubmit={this.handleSubmit}>
                <FormItem
                  label="主模块"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                <Input defaultValue={list.mainName}/>
                </FormItem>
                <FormItem
                  label="上级权限"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                <Input defaultValue={list.description} />
                </FormItem>
                <FormItem
                  label="名称"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                <Input defaultValue={list.name}/>
                </FormItem>
                <FormItem
                  label="路径"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                <Input defaultValue={list.actionPath}/>
                </FormItem>
                </Form>
            </div>
            </Modal>
        )
    }
}

FromCreateModal.propTypes = {}
FromCreateModal.defaultProps = {}

export default FromCreateModal
