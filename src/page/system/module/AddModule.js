"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select,TreeSelect, Checkbox, Icon} from 'antd'
import './AddModule.scss'
import {local, session} from 'common/util/storage.js'
import SelectList from './from.jsx'
import SelectMenu from './menu.jsx'
const createForm = Form.create
const FormItem = Form.Item

const Option = Select.Option;
@createForm()
class AddModule extends Component {
  constructor(props) {
    super(props)
    this.editItem = null;
  }
  state = { visible: false }
  handleCancel() {
    this.props.onCancel()
  }
  handleOk() {
      this.props.form.validateFields((err, values) => {
        if (!err) {
            this.props.dispatch({
              type: 'module/AddMenuData',
              payload: {
                description:values.name,
                name: values.name,
                icon:"copyright",
                orderBy:Number(values.orderBy),
                path:values.path,
                permissionId:Number(values.permissionId),
                projectId:Number(values.projectId),
                parentId:Number(values.parentId)
              }
            })
            let payload={
              description:values.name,
              name: values.name,
              icon:"copyright",
              orderBy:Number(values.orderBy),
              path:values.path,
              permissionId:Number(values.permissionId),
              projectId:Number(values.projectId),
              parentId:Number(values.parentId)
            }
            console.log("保存>>>",payload)
          this.props.onCancel()
        }
      });

  }

  handleAfterClose() {

  }
 //  onChange = (value) => {
 //   this.setState({ value });
 // }
 // onSelect = (value,node, extra) => {
 //   local.set("projectId",value)
 // }
 //传入权限主模块id
 onSelect = (value,key) => {
   console.log("主模块>>>",value)
   this.props.dispatch({
       type: 'module/ParentNodeData',
       payload: {
           "dataId":value,
       }
   });
   this.props.dispatch({
       type: 'module/MenuPermissionData',
       payload: {
           "projectId":value,
       }
   });
 }
  render() {
    const { visible, record ,data,list,permission,menu } = this.props;
    console.log('addMenu:render:menu>>',permission);
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let modalTitle = "菜单模块：";
    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    const children = [];
    list.map((res,index)=>{
          children.push(<Option value={res.id} key={res.id}>{res.name}</Option>)
    });
    return (
      <Modal
        visible = { visible }
        title = { modalTitle }
        okText =  "保存"
        cancelText = "取消"
        onCancel = {this.handleCancel.bind(this)}
        afterClose = {this.handleAfterClose.bind(this)}
        onOk = {this.handleOk.bind(this)}
        closable = { false }
        width = { 500 }
        wrapClassName = { "add-vertical-center-modal" }
      >
      <div className="AddModuleList">
          <Form>
              <FormItem label="主模块" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  {getFieldDecorator('projectId', {required: false,rules: [],
                })(<Select className="SelectMenu" onSelect={this.onSelect}
                    style={{ width:300 }}
                    placeholder="请选择"
                  >
                      {children}
                  </Select>
                )}
              </FormItem>
              <FormItem label="上级菜单" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  {getFieldDecorator('parentId', {rules: [{required: false,onChange: this.handleSelectChange}],
                  })(
                    <SelectMenu/>
                  )}
              </FormItem>
              <FormItem className="MainModule" label="权限" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  {getFieldDecorator('permissionId', {rules: [{required: false,onChange: this.handleSelectChange}],
                    })(<SelectList/>)}
              </FormItem>
              <FormItem className="MeunName" label="名称" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
                  {getFieldDecorator('name', {initialValue: name,rules: [{ required: false, message: '名称为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
              </FormItem>
              <FormItem className = "PathBox" label="路径" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
                  {getFieldDecorator('path', {rules: [{ required: false, message: '路径为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
              </FormItem>
              <FormItem className = "PathBox" label="排序" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
                {getFieldDecorator('orderBy', {rules: [{ required: false, }],
                })(
                    <Input className="input"/>
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
    permission,
    list,
    menu,
    code
  } = state.module;
  return {
    loading: state.loading.models.module,
    data,
    permission,
    list,
    menu
  };
}

export default connect(mapStateToProps)(AddModule)
