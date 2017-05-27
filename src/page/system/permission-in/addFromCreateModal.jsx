"use strict"

import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Icon, TreeSelect} from 'antd'
import './fromModal.scss'
import {local, session} from 'common/util/storage.js'

const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option

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
          console.log(values);
          this.props.dispatch({
            type: 'myPermission/permissionAdd',
            payload: values,
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

    asyncValidator(rule, value, callback) {
      //  console.log(Date.now())
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
      this.props.dispatch({
          type: 'myPermission/SelectList',
          payload: {
              "projectId":value
          }
      });
    }
    render() {
        const {visible, confirmLoading,permissions} = this.props
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
                <Option value={String(item.id)} key={item.id}  >{item.name}</Option>
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
                onOk={this.handleOk.bind(this,visible)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
            >
            <div className="fromCreateList">
                <Form>
                <FormItem
                  label="主模块"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                >
               {getFieldDecorator('projectId', {
                  rules: [{required: true}],
                })(
                  <Select placeholder="请选择" onSelect={this.onSelect}>
                    {
                      nodes
                    }
                  </Select>
                )}
              </FormItem>

                <FormItem
                  label="上级菜单"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                >
               {getFieldDecorator('parentId', {
                  rules: [],
                })(
                 <TreeSelect
                   style={{ width: 370 }}
                   dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                   treeData={permissions}
                   placeholder="请选择"
                   treeDefaultExpandAll
                 />
                )}
              </FormItem>
                <FormItem
                  label="名称"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '名称必须填写！' }],
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
                    rules: [],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  label="描述"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span:18}}
                >
                  {getFieldDecorator('description', {
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

function mapStateToProps(state) {
  const {
    data,
    permissions,
  } = state.myPermission;
  return {
    loading: state.loading,
    data,
    permissions
  };
}
export default connect(mapStateToProps)(AddFromCreateModal)
