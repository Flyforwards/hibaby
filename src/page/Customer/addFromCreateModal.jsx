"use strict"

import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
import './fromModal.scss'
import {local, session} from '../../common/util/storage.js'
import SelectList from './from.jsx'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
// const mainName = local.get("mainName")
const fromList = local.get("fromList")
import _ from 'lodash'
@createForm()
class AddFromCreateModal extends Component {
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
          console.log('Received values of form: ', values);
          this.props.dispatch({
            type: 'system/permissionAdd',
            payload: {
                actionPath:values.actionPath,
                alias: values.alias,
                description: values.description,
                name: values.name,
                orderBy:Number(values.orderBy),
                parentId: 2,
                projectId: 1
            }
        });
        }
      });
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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                key={visible}
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
                {getFieldDecorator('mainName', {
                  rules: [],
                })(
                   <Input/>
                )}
                </FormItem>
                <FormItem
                  label="英文描述"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                {getFieldDecorator('alias', {
                  rules: [],
                })(
                   <Input/>
                )}
                </FormItem>
                <FormItem
                  label="上级权限"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                {getFieldDecorator('description', {
                  rules: [],
                })(
                   <Input/>
                )}
                </FormItem>
                <FormItem
                  label="名称"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                {getFieldDecorator('name', {
                  rules: [],
                })(
                   <Input/>
                )}
                </FormItem>
                <FormItem
                  label="路径"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                {getFieldDecorator('actionPath', {
                  rules: [],
                })(
                   <Input/>
                )}
                </FormItem>
                <FormItem
                  label="排序"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                {getFieldDecorator('orderBy', {
                  rules: [],
                })(
                   <Input/>
                )}
                </FormItem>
                </Form>
            </div>
            </Modal>
        )
    }
}
function AddFromCreateModal({
    dispatch,
    data,
    code
}) {
  return ( < div >
    < AddFromCreateModal dispatch = {
      dispatch
    }
    /> < /div >
  )
}
function mapStateToProps(state) {
  const {
    data,
    code
  } = state.system;
  return {
    loading: state.loading.models.system,
    data
  };
}
export default connect(mapStateToProps)(AddFromCreateModal)