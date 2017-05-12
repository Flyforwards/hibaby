"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import moment from 'moment';
import {local, session} from '../../../common/util/storage.js'
import DropDownMenued from './dropDownMenu.jsx'
import EntryInformation from './EntryInformation.jsx'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
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
         roles = USER.entrys.map((item)=>{
          console.log("dsds",item)
          return item.roles.map((data)=>{

              return data.roleId
          })
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
          console.log(time)
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
            <Form layout="inline" className="basicInformationForm">
           <FormItem
            >
              {getFieldDecorator('userImg', {
                rules: [],
              })(
                <img className="img" src={ USER.imgURL }></img>
              )}
            </FormItem>
            <FormItem
             label="姓名"
             className="userName"
            >
              {getFieldDecorator('userName', {
                initialValue:USER.name
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
             label="编号"
             className="Numbering"
            >
              {getFieldDecorator('Numbering', {
                initialValue: USER.identifier
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
                <span className="Two">{SEX}</span>
              )}
            </FormItem>
            <FormItem
             label="入职日期"
             className="entryTime"
            >
              {getFieldDecorator('entryTime', {
               
              })(
                 <DatePicker defaultValue={moment(time, dateFormat)} format={dateFormat}/>
              )}
            </FormItem>
          </Form>
          <EntryInformation />
          <EntryInformation />
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
