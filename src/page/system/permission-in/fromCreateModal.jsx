"use strict"

import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect} from 'antd'
import './fromModal.scss'
import {local, session} from 'common/util/storage.js'

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
    handleOk(record) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.id = record.id;
          values.projectId = Number(values.projectId)
          this.props.dispatch({
            type: 'myPermission/permissionUpdataList',
            payload: values
        });
        }
      });
        this.props.onCancel()
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
        //console.log(Date.now())
        setTimeout(() => {
            let now = Date.now()
            if (now % 2 === 1) {
                callback()
            } else {
                callback(new Error('自定义验证函数未通过'))
            }
        }, 1000)
    }
    onSelect = (value,key) => {
      this.props.dispatch({
          type: 'myPermission/SelectList',
          payload: {
              "projectId":value
          }
      });
    }
    render() {
        const { visible, form, confirmLoading, permissions, record } = this.props
        const { getFieldDecorator } = form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        let nodes = [];
        const mainName = local.get("Dictionary");
        if (mainName != null) {
          nodes = mainName.map((item,index)=>{
            return (
                <Option value={String(item.id)}  key={item.id } >{item.name}</Option>
            )
          })
        }

        return (
            <Modal
                visible={visible}
                key={visible}
                title="权限管理"
                okText="确定"
                onCancel={this.handleCancel.bind(this)}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onOk={this.handleOk.bind(this,record)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
            <div className="fromCreateList">
                <Form onSubmit={this.handleSubmit}>
                <FormItem
                  label="主模块"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                >
                 {getFieldDecorator('projectId',
                 {
                   initialValue: String(record.projectId),
                   rules: [{ required: true, message: '请选择主模块' }]},
                )(
                  <Select placeholder="请选择" onSelect={this.onSelect}>
                    {
                        nodes
                    }
                  </Select>
                )}
                </FormItem>
                <FormItem
                  label="上级权限"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                >
                {getFieldDecorator('parentId', {
                  rules:[],
                  initialValue: Number(record.parentId),
                })(
                  <TreeSelect
                    style={{ width: 370 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={ permissions }
                    placeholder="请选择"
                    treeDefaultExpandAll
                  />
                )}
                </FormItem>
                <FormItem
                  label="名称"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span:18 }}
                >
                {getFieldDecorator('name', {
                  initialValue: record.name,
                  rules: [],
                })(
                   <Input/>
                )}
                </FormItem>
                <FormItem
                  label="别名"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('alias', {
                    initialValue: record.alias,
                    rules: [],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  label="description"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span:18 }}
                >
                  {getFieldDecorator('description', {
                    initialValue: record.description,
                    rules: [],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  label="排序"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                >
                {getFieldDecorator('orderBy', {
                  initialValue: record.orderBy,
                   rules: []
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

function mapStateToProps(state) {
  const {
    data,
    permissions
  } = state.myPermission;
  return {
    loading: state.loading,
    data,
    permissions
  };
}

export default connect(mapStateToProps)(FromCreateModal)
