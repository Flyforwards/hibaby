"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import {local, session} from 'common/util/storage.js'
import './AddJob.scss'

const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
const endemic  = session.get("endemic")
const SelectData = local.get("roleSelectData")
const departmentData = local.set("department")


@createForm()
class EntryInformationed extends Component {
    constructor(props) {
        super(props)
        this.state = {
          display:"block"
        }

        this.traversalDataId = []
    }


    componentDidMount(){
      if(this.props.type == 0){
          this.setState({
            display:"none"
          })
      }
    }
  //隶属部门被选中时调用的函数
  affiliatedDepartment = (value,node, extra) => {
     this.traversalDataId = []
     this.props.dispatch({
        type: 'organization/position',
        payload: {
          dataId: value
        }
      })
  }
   onClick(){
    this.props.deleteMessage(this.props.index)
   }
    render() {
      let entryContent = this.props.dataList
      let roles = []
      roles = entryContent.roles.map((item)=>{
        return item.roleId
      })
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
          this.traversalDataId = this.props.dataId.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }else{
        this.traversalDataId = null
      }
      if(SelectData != null){
          selectDataList = SelectData.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }
        return (
            <div className="AddChildNode">
              <div className="entryInformation">入职信息 <Icon type="close" onClick={this.onClick.bind(this)} style={{display:this.state.display}}/></div>
              <Form layout="inline" className="entryInformationForm">
            <FormItem
             label="地方中心"
             className="localCenter"
            >
              {getFieldDecorator('localCenter', {
                initialValue: endemic.name,
              })(
             <Input  disabled = { true }/>
              )}
            </FormItem>
            <FormItem
             label="隶属部门"
             className="affiliatedDepartment"
            >
            { getFieldDecorator("affiliatedDepartment",{
              initialValue: entryContent.deptId
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
                initialValue:entryContent.leaderId
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
              initialValue:entryContent.positionId
            })(
              <Select placeholder="请选择">
                { this.traversalDataId }
              </Select>
            )}
            </FormItem>
            <br/>
            <FormItem
             label="系统角色"
             className="systemRole"
            >
            { getFieldDecorator("systemRole",{
              initialValue:roles
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
                initialValue:this.props.mobile
              })(
                <Input disabled ={ true }/>
              )}
            </FormItem>
            {this.props.type==0?
            <FormItem
             label="登录密码"
             className="password"
            >
              {getFieldDecorator('password', {
                initialValue:"*********",
              })(
                <Input/>
              )}
            </FormItem>:null}
            <br/>
            <FormItem
             label="联系方式"
             className="information"
            >
              {getFieldDecorator('information', {
                initialValue:entryContent.contact
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
             label="公司邮箱"
             className="companyEmail"
            >
              {getFieldDecorator('companyEmail', {
                initialValue:entryContent.email,
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
                initialValue: entryContent.extension
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

