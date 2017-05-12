"use strict" 
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import {local, session} from '../../../common/util/storage.js'
import './AddJob.scss'

const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
const endemic  = session.get("endemic")
const SelectData = local.get("rolSelectData")
const departmentData = local.set("department")
let traversalDataId = []

@createForm()
class EntryInformationed extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        const fields = this.props.form.getFieldsValue();
        console.log("fields",fields)
        let roles = []
        fields.systemRole.map((item)=>{
          roles.push({roleId:item})
        })
        this.props.dispatch({
            type: 'organization/addUserEntry',
            payload: {
              "contact":fields.information,
              "deptId": endemic.id,
              "emaill": fields.companyEmail,
              "extension":fields.internalExtension+"",
              "leaderId": 2,//直系领导
              "positionId": fields.position,
              "roles":roles,
              "userId": this.props.ID
            }
        })
        this.props.onCancel()
    }
    checkbox() {
        console.log("checkbox")

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
    handleAfterClose() {
        this.props.form.resetFields()
    }
   
    render() {
      let traversalEndemicId = []
      let selectDataList = []
      const {visible, form, confirmLoading} = this.props
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
        return (
            <div className="AddChildNode">
              <div className="entryInformation">入职信息 <Icon type="close" /></div>
              <Form layout="inline" className="entryInformationForm">
            <FormItem
             label="地方中心"
             className="localCenter"
            >
              {getFieldDecorator('localCenter', {
                initialValue: "青岛",
              })(
             <Input  disabled = { true }/>
              )}
            </FormItem>
            <FormItem
             label="隶属部门"
             className="affiliatedDepartment"
            >
            { getFieldDecorator("affiliatedDepartment",{
            })(
              <Select placeholder="请选择" onSelect = {this.affiliatedDepartment.bind(this)}>
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
          </div>
        )
    }
}

EntryInformation.propTypes = {}
EntryInformation.defaultProps = {}
function EntryInformation({
  dispatch,
  data,
  dataEndemicId,
  dataId,
  code
}) {
  return ( < div >
    <EntryInformationed dispatch = {
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
    /> </div >
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
  }
}
export default connect(mapStateToProps)(EntryInformationed)

