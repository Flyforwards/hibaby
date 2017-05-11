"use strict"

import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
import './fromModal.scss'
import {local, session} from '../../../common/util/storage.js'
import SelectList from './from.jsx'

const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

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
          this.props.dispatch({
            type: 'system/permissionAdd',
            payload: {
                actionPath:values.actionPath,
                alias: values.alias,
                description: values.authority,
                name: values.name,
                orderBy:Number(values.orderBy),
                parentId:local.get("projectId"),//上级
                projectId: Number(values.mainName)//主模块
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
    onSelect = (value,key) => {
      var projectId = value
      console.log("上级选择其Id",projectId)
      this.props.dispatch({
          type: 'system/SelectList',
          payload: {
              "projectId":value
          }
      });
    }
    render() {
        const {visible, form, confirmLoading,modelsList,ListIndex} = this.props
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        let nodes = [];
        const mainName = local.get("Dictionary");
        if (mainName !=null) {
          nodes = mainName.map((item,index)=>{
            return (
                <Option value={item.id} key={index} >{item.name}</Option>
            )
          })
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
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 20 }}
                >
               {getFieldDecorator('mainName', {
                  rules: [],
                })(
                  <Select placeholder="请选择" onSelect={this.onSelect}>
                    {
                      nodes
                    }
                  </Select>
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
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
               {getFieldDecorator('authority', {
                  rules: [],
                  onChange: this.handleSelectChange,
                })(
                  <SelectList />
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
    /> </div>
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
