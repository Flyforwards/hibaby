"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select, Checkbox, Icon} from 'antd'
import './AddModule.scss'
const createForm = Form.create
const FormItem = Form.Item


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
                projectId:Number(values.projectId)
            }
            })

          this.props.onCancel()
        }
      });

  }

  handleAfterClose() {

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
    permission.map((keys,index)=>{
          perdata.push(<Option key={keys.id}>{keys.label}</Option>)
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
                  {getFieldDecorator('projectId', {rules: [{ required: true, message: '字段名称为必填项！' }],
                  })(<Select className="SelectMenu"
                    showSearch
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
                  {getFieldDecorator('parentId', {rules: [{ required: true, message: '字段名称为必填项！' }],
                  })(
                  <Select className="SelectMenu"
                    showSearch
                    style={{ width: 430 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {menudata}
                  </Select>)}
              </div>
              <div className="MainModule">
                  <h4 className="projectName">权限：</h4>
                  {getFieldDecorator('permissionId', {rules: [{ required: true, message: '字段名称为必填项！' }],
                  })(
                  <Select className="SelectMenu"
                    showSearch
                    style={{ width: 430 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {perdata}
                  </Select>)}
              </div>
              <div className="MeunName">
                <h4 className="Name">名称：</h4>
                <FormItem {...formItemLayout} className = "NameBox">
                  {getFieldDecorator('name', {initialValue: name,rules: [{ required: true, message: '字段名称为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
                </FormItem>
              </div>
              <div className="MeunPath">
                <h4 className="Route">路径：</h4>
                <FormItem {...formItemLayout} className = "PathBox">
                  {getFieldDecorator('path', {rules: [{ required: true, message: '字段名称为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
                </FormItem>
              </div>
              <div className="MeunPath">
                <h4 className="orderBy">排序：</h4>
                <FormItem {...formItemLayout} className = "PathBox">
                  {getFieldDecorator('orderBy', {rules: [{ required: true, message: '字段名称为必填项！' }],
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
  console.log("data>>>>",state.module)
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
