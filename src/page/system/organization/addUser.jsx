"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import DropDownMenu from './dropDownMenu.jsx'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class AddUsered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }
  //返回按键
  headelReturn = ()=>{
   this.props.history.go(-1)
  }
  //保存按键
  headelSave = ()=>{
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        const values = {
          ...fieldsValue,
          'entryTime': fieldsValue['entryTime'].format('YYYY-MM-DD')
        } 
        const fields = this.props.form.getFieldsValue();
        this.props.dispatch({
          type: 'organization/addUser',
          payload: {
            categoryId: 3,
            entrys: [
              {
                "contact":fields.information, //fields.information,//联系方式
                "deptId":fields.affiliatedDepartment,//fields.affiliatedDepartment,//隶属部门
                "emaill":fields.companyEmail,//fields.companyEmail,//公司邮箱
                "extension":fields.internalExtension, //fields.internalExtension,//内部分机
                "leaderId": fields.directLeadership,//直系领导
                "memo": "string",//备注
                "positionId": fields.position,//职位
                "type": 0//入职标识
              }
            ],
            gmt_entry: values.entryTime,//入职日期
            identifier: fields.Numbering,//编号//fields.Numbering
            mobile: fields.phoneNumber,//手机号fields.
            name: fields.userName,//用户名//fields.userName
            password: fields.userName,//密码//fields.userName
            roles: [
              {
                roleId: fields.systemRole//角色id
              }
            ],
            sex: fields.gender,//性别//fields.gender
            status: fields.status//账号状态//fields.status
          }
        })
      }
    })
  }
    render() {   
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 0 },
          wrapperCol: { span: 19 },
        };
      return(
        <div className="addUser">
         <div className="basicInformation">基本信息</div>
          <Form layout="inline" className="basicInformationForm">
           <FormItem
            >
              {getFieldDecorator('userImg', {
                rules: [],
              })(
                <div className="img"></div>
              )}
            </FormItem>
            <FormItem
             label="姓名"
             className="userName"
            >
              {getFieldDecorator('userName', {
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
             label="编号"
             className="Numbering"
            >
              {getFieldDecorator('Numbering', {
                initialValue: this.props.data,
              })(
                <Input disabled = { true }/>
              )}
            </FormItem>
            <br/>
            <FormItem
             label="性别"
             className="gender"
            >
              {getFieldDecorator('gender', {
              })(
                <RadioGroup value={this.state.value}>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </RadioGroup>
              )}
            </FormItem>
            <FormItem
             label="入职日期"
             className="entryTime"
            >
              {getFieldDecorator('entryTime', {
              })(
                 <DatePicker />
              )}
            </FormItem>
          </Form>
          <div className="entryInformation">入职信息</div>
          <Form layout="inline" className="entryInformationForm">
            <FormItem
             label="地方中心"
             className="localCenter"
            >
              {getFieldDecorator('localCenter', {
              })(
                <Input disabled = { true }/>
              )}
            </FormItem>
            <DropDownMenu tital={"隶属部门"} nameClass={"affiliatedDepartment"}/>
            <FormItem
             label="直系领导"
             className="directLeadership"
            >
              {getFieldDecorator('directLeadership', {
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
             className="button"
            >
            <Button type="primary" >选择</Button>
            </FormItem>
            <DropDownMenu tital={"职位"} nameClass={"position"}/>
            <br/>
            <DropDownMenu tital={"系统角色"} nameClass={"systemRole"}/>
             <FormItem
             className="addRole"
            >
            <Button type="primary" >添加角色</Button>
            </FormItem>
          </Form>
          <div className="contactInformation">联系方式</div>
          <Form layout="inline" className="contactInformationForm">
            <FormItem
             label="登录手机号"
             className="phoneNumber"
            >
              {getFieldDecorator('phoneNumber', {
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
             label="登录密码"
             className="password"
            >
              {getFieldDecorator('password', {
                initialValue: "kb123",
              })(
                <Input disabled={ true }/>
              )}
            </FormItem>
            <br/>
            <FormItem
             label="联系方式"
             className="information"
            >
              {getFieldDecorator('information', {
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
             label="公司邮箱"
             className="companyEmail"
            >
              {getFieldDecorator('companyEmail', {
              })(
                <Input />
              )}
            </FormItem>
            <br/>
             <FormItem
             label="内部分机"
             className="internalExtension"
            >
              {getFieldDecorator('internalExtension', {
              })(
                <Input />
              )}
            </FormItem>
          </Form>
           <Button type="primary" className="saveButton" onClick={this.headelSave}>保存</Button>
           <Button type="primary" className="returnButton" onClick={this.headelReturn}>返回</Button>
        </div>
      )
  }
}

function AddUser({
    dispatch,
    data,
    code
}) {
  return ( <div>
    <AddUsered dispatch = {
      dispatch
    }
    data = {
      data
    }
    /> </div>
  )
}
function mapStateToProps(state) {
  const {
    data,
    code
  } = state.organization;

  return {
    loading: state.loading.models.organization,
    data,
    code
  };
}

const addUser = Form.create()(AddUsered);
export default connect(mapStateToProps)(addUser)
