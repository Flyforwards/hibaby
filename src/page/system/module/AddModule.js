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
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.props.add) {
            this.props.dispatch({
              type: 'module/AddMenuData',
              payload: {
                description:values.description,
                icon: values.icon,
                id: Number(values.id),
                name: values.name,
                orderBy:Number(values.orderBy),
                parentId:Number(values.parentId),
                path:values.path,
                permissionId:Number(values.permissionId),
                projectId:Number(values.projectId)
            }
            })
          } else {
            this.props.dispatch({
              type: 'module/submitEditRole',
              payload: {
                description:values.description,
                icon: values.icon,
                id: Number(values.id),
                name: values.name,
                orderBy:Number(values.orderBy),
                parentId:Number(values.parentId),
                path:values.path,
                permissionId:Number(values.permissionId),
                projectId:Number(values.projectId)
              }
            })
          }
          this.props.onCancel()
        }
      });

  }

  handleAfterClose() {

  }


  render() {
    console.log("菜单主模块>>>>",this.props.list)
    const { visible, record ,data,list,permission,menu } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [0, 1] });
    const keys = getFieldValue('keys');
    const item = this.props.data ? this.props.data : {};
    let {description=null,id=null,name='',orderBy=null,parentId=null,path='',
    permissionId=null,projectId=null}=item
    if (item !== null ) {
      description=item.description;
      id=Number(item.id);
      name=item.name;
      orderBy=Number(item.orderBy);
      parentId=Number(item.parentId);
      path=item.path;
      permissionId=Number(item.permissionId);
      projectId=Number(item.projectId);
    }
    const children = [];
    const perdata=[];
    const menudata=[];
    if(list !==null || permission !==null){
          list.map((res,index)=>{
                children.push(<Option key={res.id}>{res.name}</Option>)
          });
          permission.map((keys,index)=>{
                perdata.push(<Option key={keys.id}>{keys.label}</Option>)
          });

    };
  
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };


    let node = null;
    let modalTitle = "菜单模块：";

    node = keys.map((res,index)=>{

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
              <div className="MainModule">
                  <h4 className="projectName">主模块：</h4>
                  {getFieldDecorator('projectName', {rules: [{ required: true, message: '字段名称为必填项！' }],
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
                  {getFieldDecorator('projectName', {rules: [{ required: true, message: '字段名称为必填项！' }],
                  })(
                  <Select className="SelectMenu"
                    showSearch
                    style={{ width: 430 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option key='首页' value="首页">首页</Option>
                    <Option key='系统管理' value="系统管理">系统管理</Option>
                    <Option key='CRM系统' value="CRM系统">CRM系统</Option>
                    <Option key='套房管理' value="套房管理">套房管理</Option>
                    <Option key='服务管理'  value="服务管理">服务管理</Option>
                    <Option key='膳食厨房'  value="膳食厨房">膳食厨房</Option>
                    <Option key='进销存管理'  value="进销存管理">进销存管理</Option>
                  </Select>)}
              </div>
              <div className="MeunName">
                <h4 className="Name">名称：</h4>
                <FormItem className = "NameBox">
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
              <div className="MainModule">
                  <h4 className="projectName">权限：</h4>
                  {getFieldDecorator('permissionName', {rules: [{ required: true, message: '字段名称为必填项！' }],
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
    code
  } = state.module;
  return {
    loading: state.loading.models.module,
    data,
    permission,
    list
  };
}

export default connect(mapStateToProps)(AddModule)
