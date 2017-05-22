"use strict"

import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
import './fromModal.scss'
import {local, session} from 'common/util/storage.js'
import SelectList from './from.jsx'

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
    handleOk(list) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.props.dispatch({
            type: 'system/permissionUpdataList',
            payload: {
                actionPath:values.actionPath,
                alias:values.alias,
                description: values.nam,
                name: values.name,
                orderBy:Number(values.orderBy),
                parentId:0,
                projectId: Number(values.mainName),
                id:list.id
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
    onSelect = (value,key) => {
      this.props.dispatch({
          type: 'system/SelectList',
          payload: {
              "projectId":value
          }
      });
    }
    render() {
        const { visible, form, confirmLoading,modelsList,ListIndex } = this.props
        let list = []
         {
          if(modelsList){
            list = modelsList
          }else{

          }
        }
        const {getFieldDecorator} = form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        let nodes = [];
        const mainName = local.get("Dictionary");
        if (mainName != null) {
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
                onOk={this.handleOk.bind(this,list)}
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
                  rules: []
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
                  initialValue: list.name,
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
                {getFieldDecorator('authority', {
                  rules: []
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
                  initialValue: list.name,
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
                  initialValue: list.actionPath,
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
                  initialValue: list.orderBy,
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
function FromCreateModal({
    dispatch,
    data,
    code
}) {
  return ( <div >
    < FromCreateModal dispatch = {
      dispatch
    }
    /> </div >
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
export default connect(mapStateToProps)(FromCreateModal)
