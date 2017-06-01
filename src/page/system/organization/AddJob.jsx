"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button,message} from 'antd'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import {local, session} from 'common/util/storage.js'
import './AddJob.scss'

const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
const SelectData = local.get("rolSelectData")
const departmentData = local.set("department")
let traversalDataId = []

@createForm()
class AddJobed extends Component {
    constructor(props) {
        super(props)
        this.state = {
          visible:false,
          TableData:null
        }
    }
    handleCancel() {
       this.setState({
        TableData:null
      })
        this.props.onCancel()
    }
    handleOk() {
        let endemic  = session.get("endemic")
        let ID = window.location.search.split("=")[1]
        const fields = this.props.form.getFieldsValue();
        let roles = []
        if(fields.affiliatedDepartment){
          if(fields.position){
            if(fields.systemRole){
              fields.systemRole.map((item)=>{
                roles.push({"roleId":item})
              })
              if(fields.information){
                if(fields.companyEmail){
                    this.props.dispatch({
                        type: 'organization/addUserEntry',
                        payload: {
                          "contact":fields.information,
                          "deptId": endemic.id,
                          "emaill": fields.companyEmail,
                          "extension":fields.internalExtension?fields.internalExtension:"",
                          "leaderId": fields.directLeadership,//直系领导
                          "positionId": fields.position,
                          "roles":roles,
                          "userId": this.props.ID
                        }
                    })
                  this.props.onCancel()
                    this.setState({
                      TableData:null
                    })
                }else{
                  message.warning('请填写公司邮箱')
                }

              }else{
                 message.warning('请填写联系方式')
              }

            }else{
              message.warning('请选择系统角色')
            }

          }else{
            message.warning('请选择职位')
          }

        }else{
          message.warning('请选择隶属部门')
        }
    }
    checkbox() {
        //console.log("checkbox")

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
    select(){
      let endemic  = session.get("endemic")
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
    headelReturnTabal(data){
    //  console.log("data",data)
      this.setState({
        TableData:data[0]
      })
    }
    handleCreateModalCancel() {
        this.setState({
          visible: false,
        })
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
      //  console.log(Date.now())
        setTimeout(() => {
            let now = Date.now()
            if (now % 2 === 1) {
                callback()
            } else {
                callback(new Error('自定义验证函数未通过'))
            }
        }, 1000)
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
      let endemic  = session.get("endemic")
        return (
            <Modal
                visible={visible}
                title="添加职位"
                okText="保存"
                cancelText="返回"
                wrapClassName="AddJob"
                closable={false}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 900 }
            >
            <div className="AddChildNode">
              <div className="entryInformation">职位信息</div>
              <Form layout="inline" className="entryInformationForm">
            <FormItem
             label="地方中心"
             className="localCenter"
             required
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
             required
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
                initialValue: this.state.TableData?this.state.TableData.id:"",
              })(
                <Input disabled={true}/>
              )}
            </FormItem>
            <FormItem
             className="button"
            >
            <Button type="primary" onClick={this.select.bind(this)}>选择</Button>
            </FormItem>
            <FormItem
             label="职位"
             className="position"
             required
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
             label="联系方式"
             className="information"
             required
            >
              {getFieldDecorator('information', {
                rules: [{
                    pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '联系方式不正确'
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
          <SelectTheNodeFrom
           visible={ this.state.visible}
           onCancel ={ this.handleCreateModalCancel.bind(this) }
           treeData = {this.props.LeagerData}
           headelReturnTabal= {this.headelReturnTabal.bind(this)}
          />
          </div>
          </Modal>
        )
    }
}

AddJob.propTypes = {}
AddJob.defaultProps = {}
function AddJob({
  dispatch,
  data,
  dataEndemicId,
  dataId,
  LeagerData,
  code
}) {
  return ( < div >
    <AddJobed dispatch = {
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
    /> </div >
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
    LeagerData,
    dataEndemicId,
    code
  }
}
export default connect(mapStateToProps)(AddJobed)
