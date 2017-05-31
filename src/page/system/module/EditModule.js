"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select,TreeSelect, Checkbox, Icon, Cascader} from 'antd'
import './AddModule.scss'
import {local, session} from 'common/util/storage.js'
import SelectList from './EditFrom.jsx'
import SelectMenu from './EditMenu.jsx'
const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option;

@createForm()
class EditModule extends Component {
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
          if (values.permissionId && values.permissionId.length >= 0) {
            if (values.permissionId.length == 0) {
              values.permissionId = undefined;
            } else {
              values.permissionList = `${values.permissionId}`;
              values.permissionId = values.permissionId[values.permissionId.length - 1];
            }
          }
          values.id = this.props.record.id;
          this.props.dispatch({
            type: 'module/EditMenuData',
            payload:values,
          })
            this.props.onCancel()
        }

      });

  }

  handleAfterClose() {

  }
  onSelect = (value,key) => {
    this.props.dispatch({
        type: 'module/parentNodeData',
        payload: {
            projectId:value,
        }
    });
    this.props.dispatch({
        type: 'module/menuPermissionData',
        payload: {
            "projectId":value,
        }
    });
  }

  render() {
    const { visible, record , permissionList, projectList, menu } = this.props
    const { getFieldDecorator } = this.props.form;
    let modalTitle = "菜单模块：";
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 25 },
      },
    };
    const children = projectList.map((res,index)=>{
      return (<Option key={res.id}>{res.name}</Option>)
    });

    const menuOption = menu.map((res,index)=>{
      return (<Option key={res.id}>{res.name}</Option>)
    });
    let item = record?record:{};
    const permission = item.permissionList || "";
    let permissions = []
    if (item.permissionList) {
      permissions = (permission.split(','))
      permissions = permissions.map((record)=>{
        return Number(record);
      });
    }

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
              <FormItem label="主模块" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('projectId', { initialValue: String(item.projectId),rules: [{ required: false,message: '名称为必填项！'}],
                    })(<Select className="SelectMenu" onSelect={this.onSelect} placeholder="请选择">
                          { children }
                      </Select>
                    )}
              </FormItem>
              <FormItem label="上级菜单" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('parentId', {initialValue: item.parentId ==0?null:String(item.parentId) ,rules: [{required: false,onChange: this.handleSelectChange}],
                  })(
                    <Select  placeholder="请选择">
                      {
                        menuOption
                      }
                    </Select>
                  )}
              </FormItem>
              <FormItem className="MainModule" label="权限" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('permissionId', {initialValue: permissions,rules: [{type: 'array',required: false,onChange: this.handleSelectChange}],
                    })(
                      <Cascader
                        options={ permissionList }
                        placeholder="请选择"
                      />
                  )}
              </FormItem>
              <FormItem className = "NameBox" label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('name', {initialValue: item.name,rules: [{ required: false,message: '名称为必填项！'}],
                })(
                    <Input className="input"/>
                )}
              </FormItem>
              <FormItem className = "PathBox" label="路径" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('path', {initialValue: item.path,rules: [{ required:false,}],
                })(
                    <Input className="input"/>
                )}
              </FormItem>
              <FormItem className = "ICON" label="图标" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('icon', {initialValue: item.icon,rules: [{ required:false, }],
                })(
                    <Input className="input"/>
                )}
              </FormItem>
              <FormItem className = "orderByBox" label="排序" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('orderBy', {
                  initialValue: item.orderBy,rules: [{ required:false, message: '字段名称为必填项！' }],
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
    permissionList,
    projectList,
    menu
  } = state.module;
  return {
    loading: state.loading.models.module,
    permissionList,
    projectList,
    menu
  };
}

export default connect(mapStateToProps)(EditModule)
