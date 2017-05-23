"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select,TreeSelect, Checkbox, Icon} from 'antd'
import './AddModule.scss'
import {local, session} from 'common/util/storage.js'
import SelectList from './from.jsx'
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
  onChange = (value) => {
   this.setState({ value });
 }
 onSelect = (value,node, extra) => {
   local.set("projectId",value)
 }
 //传入权限主模块id
 onSelectID = (value,key) => {
   this.props.dispatch({
       type: 'module/ParentNodeData',
       payload: {
           "projectId":value,
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
    const { visible, record ,data,list,permission,menu } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let modalTitle = "菜单模块：";
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 25 },
      },
    };
    console.log("菜单>>>>",permission)
    const children = [];
    const perdata=[];
    const menudata=[];
    list.map((res,index)=>{
          children.push(<Option value={res.id} key={res.id}>{res.name}</Option>)
    });
    menu.map((arr,index)=>{
      menudata.push(<Option key={arr.id}>{arr.name}</Option>)
    })
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
              <div className="MainModule">
                  <h4 className="projectName">主模块：</h4>
                  {getFieldDecorator('projectId', {rules: [{ required:false, message: '字段名称为必填项！' }],
                })(<Select className="SelectMenu" onClick={this.onSelectID}
                    style={{ width:430 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                      {children}
                  </Select>
                )}
              </div>
              <div className="MainModule">
                  <h4 className="parentName">上级菜单：</h4>
                  {getFieldDecorator('parentId', {rules: [{ required: true, message: '上级菜单为必填项！' }],
                  })(
                    <Select className="SelectMenu"
                      showSearch
                      style={{ width: 430 }}
                      placeholder="请选择"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {menudata}
                    </Select>
                  )}
              </div>
              <div className="MainModule">
                  <h4 className="projectName">权限：</h4>
                  {getFieldDecorator('permissionId', {rules: [{required: false,onChange: this.handleSelectChange}],
                  })(<TreeSelect
                    style={{ width: 150 }}
                    key={this.props.permission.id}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={this.props.permission}
                    placeholder="请选择"
                    treeDefaultExpandAll
                    onSelect={this.onSelect.bind(this)}
                    onChange={this.onChange.bind(this)}
                  />
                    )}
              </div>
              <div className="MeunName">
                <h4 className="Name">名称：</h4>
                <FormItem {...formItemLayout} className = "NameBox">
                  {getFieldDecorator('name', {initialValue: name,rules: [{ required: true, message: '名称为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
                </FormItem>
              </div>
              <div className="MeunPath">
                <h4 className="Route">路径：</h4>
                <FormItem {...formItemLayout} className = "PathBox">
                  {getFieldDecorator('path', {rules: [{ required: true, message: '路径为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
                </FormItem>
              </div>
              <div className="MeunPath">
                <h4 className="orderBy">排序：</h4>
                <FormItem {...formItemLayout} className = "PathBox">
                  {getFieldDecorator('orderBy', {rules: [{ required: true, }],
                  })(
                      <Input className="input"/>
                  )}
                </FormItem>
              </div>
          </Form>
      </div>
    </Modal>
  )
  }
}
function mapStateToProps(state) {
  console.log("树形>>>>",state.module)
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
