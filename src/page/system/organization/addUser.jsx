"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select,message} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUserInfo.scss'
import {local, session} from '../../../common/util/storage.js'
import DropDownMenued from './dropDownMenu.jsx'
import AddMemberLeader from './AddMemberLeader.js'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import UPload from 'common/Upload.js'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
//地方中心字段
const SelectData = local.get("rolSelectData")
const department = local.get("department")
let traversalDataId = []

class AddUsered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      visible:false,
      TableData:null,
      NewuserImg:null
    }
  }
  componentDidMount(){
    let endemic = session.get("endemic")
    let nodeId = window.location.search.split("=")[1]
    this.props.dispatch({
        type: 'organization/getDeptListByEndemicId',
        payload: {
          dataId: endemic.id
        }
    })
    this.props.dispatch({
        type: 'organization/position',
        payload: {
          dataId: nodeId
        }
    })
  }
  handleCreateModalCancel() {
      this.setState({
        visible: false,
      })
    }
  handelReturnTabal(data){
    this.setState({
      TableData:data[0]
    })
  }
  //选择直系领导
  directLeader = ()=>{
    let endemic = session.get("endemic")
    this.setState({
      visible:true
    })
    this.props.dispatch({
      type: 'organization/getLeagerDepartmentNodes',
      payload: {
          "nodeId": endemic.id,
          "tissueProperty": endemic.tissueProperty
      }
    })
  }
  //返回按键
  handelReturn = ()=>{
   this.props.history.go(-1)
  }
  //隶属部门被选中时调用的函数
  affiliatedDepartment = (value,node, extra) => {
    this.props.form.resetFields(['position']);
     this.props.dispatch({
        type: 'organization/position',
        payload: {
          dataId: value
        }
      })
  }
  //保存按键
  handleSave = ()=>{
    let endemic  = session.get("endemic")
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        const values = {
          ...fieldsValue,
          'entryTime': fieldsValue['entryTime']
        }
        const fields = this.props.form.getFieldsValue();
        let roleIdData = []
        if(fields.systemRole){
          fields.systemRole.map((item)=>{
          roleIdData.push({"roleId":item})
        })
        }
        if(fields.userName){
          if(fields.gender==0 || fields.gender==1){
            if(values.entryTime){
              if(fields.affiliatedDepartment){
                    if(fields.position){
                        if(roleIdData.length>=1){
                          if(fields.phoneNumber){
                            if(fields.information){
                              if(fields.companyEmail){
                                console.log(this.state.NewuserImg)
                                if(this.state.NewuserImg){
                                    this.props.dispatch({
                                      type: 'organization/addUser',
                                      payload:{
                                        categoryId: endemic.id,
                                        entrys: [
                                          {
                                            "contact":fields.information, //fields.information,//联系方式
                                            "deptId":fields.affiliatedDepartment,//fields.affiliatedDepartment,//隶属部门
                                            "emaill":fields.companyEmail,//fields.companyEmail,//公司邮箱
                                            "extension":fields.internalExtension, //fields.internalExtension,//内部分机
                                            "leaderId": this.state.TableData.id,//直系领导
                                            "positionId": fields.position,//职位
                                            "identifier": fields.Numbering,//编号//fields.Numbering
                                            "roles": roleIdData
                                          }
                                        ],
                                        "gmt_entry": values.entryTime,//入职日期
                                        "mobile": fields.phoneNumber,//手机号fields.
                                        "name": fields.userName,//用户名//fields.userName
                                        "password": fields.password,//密码//fields.userName
                                        "sex": fields.gender,//性别//fields.gender
                                        "img":this.state.NewuserImg
                                      }
                                    })
                                }else{
                                  message.warning('请上传头像')
                                }
                              }else{
                              message.warning('请填写公司邮箱')
                              }
                            }else{
                              message.warning('请填写联系方式')
                            }
                          }else{
                            message.warning('请填写手机号')
                          }
                        }else{
                          message.warning('请选择系统角色')
                        }
                    }else{
                      message.warning('请选择职位信息')
                    }
              }else{
                message.warning('请选择隶属部门')
              }
            }else{
              message.warning('请选择入职日期')
            }
          }else{
            message.warning('请选择性别')
          }
        }else{
          message.warning('请输入姓名')
        }
      }
    })
  }
  headelImg(NewuserImg){
    this.setState({
      NewuserImg:NewuserImg
    })
  }
    render() {
      let traversalEndemicId = []
      let selectDataList = []
      let endemic = session.get("endemic")
      let NODEID = window.location.search.split("=")[1];
      let departmentDisabled = false
      if(NODEID){
        departmentDisabled = true
      }
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
        <div className="addUserInfo">
         <div className="basicInformation">基本信息</div>
          <Form layout="inline" className="basicInformationForm">
           <FormItem
            >
              {getFieldDecorator('userImg', {
                rules: [],
              })(
               <div className="img"><UPload urlList={"Img"} headelUserImg={this.headelImg.bind(this)}/></div>

              )}
            </FormItem>
            <FormItem
             label="姓名"
             className="userName"
             required
            >
              {getFieldDecorator('userName', {
                 rules: [{
                    max: 10, message: '请按要求输入'
                  }],
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
             required
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
             required
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
             required
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
             required
            >
            { getFieldDecorator("affiliatedDepartment",{
               initialValue:NODEID
            })(
              <Select placeholder="请选择" onSelect={this.affiliatedDepartment.bind(this)} disabled = { departmentDisabled }>
                { traversalEndemicId }
              </Select>
            )}
            </FormItem>
            <FormItem
             label="直系领导"
             className="directLeadership"
            >
              {getFieldDecorator('directLeadership', {
                initialValue: this.state.TableData?this.state.TableData.name:"",
              })(
                <Input disabled={true}/>
              )}
            </FormItem>
            <FormItem
             className="button"
            >
            <Button type="primary" onClick={this.directLeader.bind(this)}>选择</Button>
            </FormItem>
            <FormItem
             label="职位"
             className="position"
             required
            >
            { getFieldDecorator("position",{

            })(
              <Select placeholder="请选择" className="po">
                { traversalDataId }
              </Select>
            )}
            </FormItem>
            <br/>
            <FormItem
             label="系统角色"
             className="systemRole"
             required
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
             required
            >
              {getFieldDecorator('phoneNumber', {
                 rules: [{
                    pattern: /^1[34578]\d{9}$/, message: '手机号不正确'
                  }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
             label="登录密码"
             className="password"
             required
            >
              {getFieldDecorator('password', {
                initialValue: "kbm12345",
              })(
                <Input disabled={ true }/>
              )}
            </FormItem>
            <br/>
            <FormItem
             label="联系方式"
             className="information"
             required
            >
              {getFieldDecorator('information', {
                  rules: [{
                    pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '手机号不正确'
                  }],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
             label="公司邮箱"
             className="companyEmail"
             required
            >
              {getFieldDecorator('companyEmail', {
                 rules: [{
                    type: 'email', message: '邮箱格式不正确'
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
                  rules: [{
                    pattern:/^[0-9\-]{0,20}$/, message: '请正确输入内部分机'
                  }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
           <Button type="primary" className="saveButton" onClick={this.handleSave}>保存</Button>
           <Button type="primary" className="returnButton" onClick={this.handelReturn}>返回</Button>
          <SelectTheNodeFrom
           visible={ this.state.visible}
           onCancel ={ this.handleCreateModalCancel.bind(this) }
           treeData = {this.props.LeagerData}
           headelReturnTabal= {this.handelReturnTabal.bind(this)}
          />
        </div>
      )
  }
}

function AddUser({
    dispatch,
    data,
    dataEndemicId,
    dataId,
    LeagerData,
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
    LeagerData = {
      LeagerData
    }
    /> </div>
  )
}
function mapStateToProps(state) {
  const {
    data,
    dataEndemicId,
    dataId,
    LeagerData,
    code
  } = state.organization;

  return {
    loading: state.loading.models.organization,
    data,
    dataId,
    dataEndemicId,
    LeagerData,
    code
  };
}

const addUser = Form.create()(AddUsered);
export default connect(mapStateToProps)(addUser)
