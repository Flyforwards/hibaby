"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select,TreeSelect, Checkbox, Icon} from 'antd'
import './AddModule.scss'
import {local, session} from 'common/util/storage.js'
import SelectList from './EditFrom.jsx'
import SelectMenu from './EditMenu.jsx'
const createForm = Form.create
const FormItem = Form.Item


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
          let payload={}
          console.log("values>>>>",values)
          const record=this.props.record?this.props.record:{}
          console.log("record>>>",record)
          if(values.projectId==record.projectName || values.parentId==record.parentName || values.permissionId==record.permissionName){
            payload= {
              description:values.name,
              name: values.name,
              icon:"copyright",
              orderBy:Number(values.orderBy),
              path:values.path,
              permissionId:local.get("projectId"),
              parentId:local.get("dataId"),
              icon:values.icon,
              projectId:this.props.record.projectId,
              id:this.props.record.id,
            }
          }else{
            payload= {
              description:values.name,
              name: values.name,
              icon:"copyright",
              orderBy:Number(values.orderBy),
              path:values.path,
              permissionId:local.get("projectId"),
              parentId:local.get("dataId"),
              icon:values.icon,
              projectId:Number(values.projectId),
              id:this.props.record.id,
            }
          }
          this.props.dispatch({
            type: 'module/EditMenuData',
            payload:payload,
          })
            this.props.onCancel()
            console.log("payload",payload)
        }

      });

  }

  handleAfterClose() {

  }
  onSelect = (value,key) => {
    console.log("主模块>>>",value)
    this.props.dispatch({
        type: 'module/ParentNodeData',
        payload: {
            projectId:value,
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
    const children = [];
    const perdata=[];
    const menudata=[];
    list.map((res,index)=>{
          children.push(<Option key={res.id}>{res.name}</Option>)
    });
    let item={};
    item=record?record:{};
    local.set("value",item.permissionName)
    local.set("parentValue",item.parentName)
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
                  {getFieldDecorator('projectId', {initialValue: `${item.projectName}`,rules: [{ required: false,message: '名称为必填项！'}],
                    })(<Select className="SelectMenu" onSelect={this.onSelect} placeholder="请选择">
                          {children}
                      </Select>
                    )}
              </FormItem>
              <FormItem label="上级菜单" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  {getFieldDecorator('parentId', {initialValue: `${item.parentName}`,rules: [{required: false,onChange: this.handleSelectChange}],
                  })(
                    <SelectMenu/>
                  )}
              </FormItem>
              <FormItem className="MainModule" label="权限" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  {getFieldDecorator('permissionId', {initialValue: `${item.permissionName}`,rules: [{required: false,onChange: this.handleSelectChange}],
                    })(<SelectList/>)}
              </FormItem>
              <FormItem className = "NameBox" label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('name', {initialValue: `${item.name}`,rules: [{ required: false,message: '名称为必填项！'}],
                })(
                    <Input className="input"/>
                )}
              </FormItem>
              <FormItem className = "PathBox" label="路径" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('path', {initialValue: `${item.path}`,rules: [{ required:false,}],
                })(
                    <Input className="input"/>
                )}
              </FormItem>
              <FormItem className = "ICON" label="图标" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('icon', {initialValue: `${item.icon}`,rules: [{ required:false, }],
                })(
                    <Input className="input"/>
                )}
              </FormItem>
              <FormItem className = "orderByBox" label="排序" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('orderBy', {initialValue: `${item.orderBy}`,rules: [{ required:false, message: '字段名称为必填项！' }],
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

export default connect(mapStateToProps)(EditModule)