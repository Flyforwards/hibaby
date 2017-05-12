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
const ID = window.location.search.split("=")[1]
let traversalDataId = []

class EditUsered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1
    }
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'organization/getUserListById',
      payload: {
       dataId:ID
      }
    })
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
        const fields = this.props.form.getFieldsValue();
        let roleIdData = []
        fields.systemRole.map((item)=>{
          roleIdData.push({roleId:item})
        })
        console.log(this.refs.time.value)
        this.props.dispatch({
          type: 'organization/modifyUser',
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
                "id":ID
              }
            ],
            gmt_entry: this.refs.time.value,//入职日期
            identifier: fields.Numbering,//编号//fields.Numbering
            mobile: fields.phoneNumber,//手机号fields.
            name: fields.userName,//用户名//fields.userName
            password: fields.userName,//密码//fields.userName
            roles: roleIdData,
            sex: fields.gender,//性别//fields.gender
            status: fields.status//账号状态//fields.status
          }
        })
      }
    })
  }
    render() {  
      let USER = []
      let SEX = []
      let roles = []
      let entrys = []
      let time = null
      let traversalEndemicId = []
      let selectDataList = []
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      if(this.props.userID != null){
         USER = this.props.userID
         SEX = USER.sex == 1?"男":"女"
         entrys = USER.entrys[0]
         roles = USER.roles.map((item)=>{
          return item.roleId
         })
         console.log("roles",roles)
          function getLocalTime(nS) { 
            var now = new Date(parseInt(nS) * 1000);
            var year=now.getFullYear(); 
            var month=now.getMonth()+1; 
            var date=now.getDate(); 
            return `${year}-${month}-${date}`
          } 
          time = getLocalTime('1494230932')
      }
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
            <div className="basicInformationContent">
              <img className="img" src={USER.imgURL}></img>
              <p className="userName"><span>姓名:</span><span className="Two">{USER.name}</span></p>
              <p className="Numbering"><span>编号:</span><span className="Two">{USER.identifier}</span></p>
              <p className="gender"><span>性别:</span><span className="Two">{SEX}</span></p>
              <p className="entryTime"><span>入职时间:</span><span className="Two" ref="time">{ time }</span></p>
            </div>
          <div className="entryInformation">入职信息</div>
          <Form layout="inline" className="entryInformationForm">
            <FormItem
             label="地方中心"
             className="localCenter"
            >
              {getFieldDecorator('localCenter', {
                initialValue: entrys.endemicId,
              })(
                <Input disabled = { true }/>
              )}
            </FormItem>
            <FormItem
             label="隶属部门"
             className="affiliatedDepartment"
            >
            { getFieldDecorator("affiliatedDepartment",{
              initialValue: entrys.deptId,
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
                initialValue: entrys.leaderId,
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
              initialValue: entrys.positionId,
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
              initialValue: roles,
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
                initialValue: USER.mobile,
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
                initialValue: entrys.contact,
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
             label="公司邮箱"
             className="companyEmail"
            >
              {getFieldDecorator('companyEmail', {
                initialValue: entrys.emaill,
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
                initialValue: entrys.extension,
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

function EditUser({
    dispatch,
    data,
    dataEndemicId,
    dataId,
    userID,
    code
}) {
  return ( <div>
    <EditUsered dispatch = {
      dispatch
    }
    data = {
      data
    }
    userID = {
      userID
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
    userID,
    code
  } = state.organization;

  return {
    loading: state.loading.models.organization,
    data,
    userID,
    dataId,
    dataEndemicId,
    code
  };
}

const editUser = Form.create()(EditUsered);
export default connect(mapStateToProps)(editUser)
