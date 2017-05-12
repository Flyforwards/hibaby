"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import {local, session} from '../../../common/util/storage.js'
import DropDownMenued from './dropDownMenu.jsx'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
//地方中心字段
const endemic  = session.get("endemic")
const SelectData = local.get("rolSelectData")
let traversalDataId = []

class AddUsered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1
    }
  }
  componentDidMount(){
      this.props.dispatch({
        type: 'organization/getDeptListByEndemicId',
        payload: {
          dataId: endemic.id
        }
      })
  }
  //返回按键
  headelReturn = ()=>{
   this.props.history.go(-1)
  }
  //隶属部门被选中时调用的函数
  affiliatedDepartment = (value,node, extra) => {
    traversalDataId = []
     this.props.dispatch({
        type: 'organization/position',
        payload: {
          dataId: value
        }
      })
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
        let roleIdData = []
        fields.systemRole.map((item)=>{
          roleIdData.push({roleId:item})
        })
        this.props.dispatch({
          type: 'organization/addUser',
          payload: {
            categoryId: endemic.id,
            entrys: [
              {
                "contact":fields.information, //fields.information,//联系方式
                "deptId":fields.affiliatedDepartment,//fields.affiliatedDepartment,//隶属部门
                "emaill":fields.companyEmail,//fields.companyEmail,//公司邮箱
                "extension":fields.internalExtension, //fields.internalExtension,//内部分机
                "leaderId": fields.directLeadership,//直系领导
                "memo": "string",//备注
                "positionId": fields.position,//职位
                "identifier": fields.Numbering//编号//fields.Numbering
              }
            ],
            "gmt_entry": values.entryTime,//入职日期
            "mobile": fields.phoneNumber,//手机号fields.
            "name": fields.userName,//用户名//fields.userName
            "password": fields.password,//密码//fields.userName
            "roles": roleIdData,
            "sex": fields.gender,//性别//fields.gender
            "status": fields.status,//账号状态//fields.status
            "img":"https://"
          }
        })
      }
    })
  }
    render() {  
      let traversalEndemicId = []
      let selectDataList = []
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      if(this.props.dataEndemicId != null){
          traversalEndemicId = this.props.dataEndemicId.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }
      if(this.props.dataId != null){
          traversalDataId = this.props.dataId.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }else{
        traversalDataId = null
      }
      if(SelectData != null){
          selectDataList = SelectData.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }
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
                <RadioGroup>
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
                initialValue: endemic.name,
              })(
                <Input disabled = { true }/>
              )}
            </FormItem>
            <FormItem
             label="隶属部门"
             className="affiliatedDepartment"
            >
            { getFieldDecorator("affiliatedDepartment",{
            })(
              <Select placeholder="请选择" onSelect={this.affiliatedDepartment.bind(this)}>
                { traversalEndemicId }
              </Select>
            )}
            </FormItem>
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
            <FormItem
             label="职位"
             className="position"
            >
            { getFieldDecorator("position",{
            })(
              <Select placeholder="请选择">
                { traversalDataId }
              </Select>
            )}
            </FormItem>
            <br/>
            <FormItem
             label="系统角色"
             className="systemRole"
            >
            { getFieldDecorator("systemRole",{
            })(
              <Select placeholder="请选择" dropdownMatchSelectWidth mode="multiple">
                { selectDataList }
              </Select>
            )}
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
                 rules: [{
                    type: 'email'
                  }],
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
    dataEndemicId,
    dataId,
    code
}) {
  return ( <div>
    <AddUsered dispatch = {
      dispatch
    }
    data = {
      data
    }
    dataEndemicId = {
       dataEndemicId
    }
    dataId = {
      dataId
    }
    /> </div>
  )
}
function mapStateToProps(state) {
  const {
    data,
    dataEndemicId,
    dataId,
    code
  } = state.organization;

  return {
    loading: state.loading.models.organization,
    data,
    dataId,
    dataEndemicId,
    code
  };
}

const addUser = Form.create()(AddUsered);
export default connect(mapStateToProps)(addUser)
