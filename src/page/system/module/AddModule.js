"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select,TreeSelect, Checkbox, Icon, Cascader} from 'antd'
import {local, session} from 'common/util/storage.js'
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
          if (values.permissionId && values.permissionId.length >= 0) {
            if (values.permissionId.length==0) {
              values.permissionId = undefined;
            } else {
              values.permissionList = `${values.permissionId}`;
              values.permissionId = values.permissionId[values.permissionId.length-1];
            }

          }
            this.props.dispatch({
              type: 'module/AddMenuData',
              payload: values
            })
          this.props.onCancel()
        }
      });

  }

  handleAfterClose() {

  }
  //传入权限主模块id
   onSelect(value,key) {
     this.props.dispatch({
         type: 'module/parentNodeData',
         payload: {
             "dataId":value,
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
    const { visible ,projectList, permissionList, menu} = this.props;
    const { getFieldDecorator } = this.props.form;
    let modalTitle = "菜单模块：";
    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const children = projectList.map((res,index)=>{
      return (<Option value={ String(res.id)} key={res.id}>{res.name}</Option>)
    });
    const menuOption = menu.map((res,index)=>{
      return (<Option key={res.id}>{res.name}</Option>)
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
        wrapClassName = { "vertical-center-modal" }
      >
      <div className="AddModuleList">
          <Form>
              <FormItem label="主模块" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('projectId', { rules: [{ required: true, message: '主模块为必选项！' }]
                })(<Select className="SelectMenu" onSelect={this.onSelect.bind(this)}
                    placeholder="请选择"
                  >
                      {children}
                  </Select>
                )}
              </FormItem>

            <FormItem label="上级菜单" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('parentId',{rules: [{required: false,} ],
              })(
                <Select  placeholder="请选择">
                  {
                    menuOption
                  }
                </Select>
              )}
            </FormItem>
              <FormItem label="权限" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('permissionId', {rules: [{required: false}],
                    })(
                      <Cascader
                        options={ permissionList }
                        placeholder="请选择"
                      />)
                  }
              </FormItem>
              <FormItem label="名称" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
                  {getFieldDecorator('name', {rules: [{ required: true, message: '名称为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
              </FormItem>
              <FormItem label="路径" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
                  {getFieldDecorator('path', {rules: [{ required: true, message: '路径为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
              </FormItem>
              <FormItem label="图标" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
                  {getFieldDecorator('icon', {rules: [{ required: true, message: 'icon为必填项！' }],
                  })(
                      <Input className="input"/>
                  )}
              </FormItem>
              <FormItem label="描述" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
                {getFieldDecorator('description', {rules: [{ required: false, }],
                })(
                  <Input className="input"/>
                )}
              </FormItem>
              <FormItem label="排序" labelCol={{ span: 4 }} wrapperCol={{ span:16 }}>
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
    permissionList,
    projectList,
    menu
  } = state.module;
  return {
    loading: state.loading.models.module,
    permissionList,
    projectList,
    menu,
  };
}

export default connect(mapStateToProps)(AddModule)
