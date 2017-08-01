"use strict"

import React from 'react'
import { connect } from 'dva'
import { Input, Button, Form, Radio, DatePicker, Select, message, Row, Col } from 'antd'
import { Link } from 'react-router'
import './addUserInfo.scss'
import { local, session } from '../../../common/util/storage.js'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import UPload from 'common/Upload.js'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//地方中心字段
const department = local.get("department")
let traversalDataId = []

const Option = Select.Option

class AddUser extends React.Component {
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
    if(nodeId){
      this.props.dispatch({
          type: 'organization/position',
          payload: {
            dataId: nodeId
          }
      })
    }
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
    this.props.dispatch({
      type: "organization/organizationList",
      payload: {
        nodeid:endemic.id,
        tissueProperty:endemic.tissueProperty,
        page:1,
        size: 10,
      }
    });
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
                                            "email":fields.companyEmail,//fields.companyEmail,//公司邮箱
                                            "extension":fields.internalExtension, //fields.internalExtension,//内部分机
                                            "leaderId": this.state.TableData ? this.state.TableData.id : null,//直系领导
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
                              }else{Option
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
      let SelectData = local.get("rolSelectData")
      let NODEID = window.location.search.split("=")[1];
      const { getFieldDecorator } = this.props.form;

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
      const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      }
      return(
        <div className="addUserInfo">
          <div>
          <Form>
         <div className="information">基本信息</div>
            <Row>
              <Col span="4">
             <FormItem {...formItemLayout}
              >
                {getFieldDecorator('userImg', {
                  rules: [],
                })(
                 <UPload urlList={"Img"} headelUserImg={this.headelImg.bind(this)}/>
                )}
              </FormItem>
              </Col>
              <Col span="20">
                <Row>
                  <Col span="6">
                    <FormItem
                      label="姓名" {...formItemLayout}
                    >
                      {getFieldDecorator('userName', {
                        rules: [{ max: 10, message: '请按要求输入' }, { required: true, message: '必填项！' }],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem
                      label="性别" {...formItemLayout}
                    >
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '必选项！' }],
                      })(
                        <RadioGroup>
                          <Radio value={0}>男</Radio>
                          <Radio value={1}>女</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem
                      label="入职日期" {...formItemLayout}
                    >
                      {getFieldDecorator('entryTime', {
                        rules: [{ required: true, message: '必填项！' }],
                      })(
                        <DatePicker />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
          <div className="information">入职信息</div>
            <Row>
              <Col span="9">
            <FormItem
             label="地方中心" {...formItemLayout}
            >
              {getFieldDecorator('localCenter', {
                initialValue: endemic.name,
              })(
                <Input disabled = { true }/>
              )}
            </FormItem>
              </Col>
              <Col span="9">
            <FormItem
             label="隶属部门" {...formItemLayout}
            >
            { getFieldDecorator("affiliatedDepartment",{
               initialValue:NODEID
            })(
              <Select placeholder="请选择" onSelect={this.affiliatedDepartment.bind(this)}>
                { traversalEndemicId }
              </Select>
            )}
            </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="9">
            <FormItem
             label="直系领导" {...formItemLayout}
            >
              {getFieldDecorator('directLeadership', {
                initialValue: this.state.TableData?this.state.TableData.name:"",
              })(
                <Input disabled={true}/>
              )}
              <Button className="right-button" onClick={this.directLeader.bind(this)}>选择</Button>
            </FormItem>

              </Col>
              <Col span="9">
            <FormItem
             label="职位" {...formItemLayout}
            >
            { getFieldDecorator("position",{

            })(
              <Select placeholder="请选择" className="po">
                { traversalDataId }
              </Select>
            )}
            </FormItem>
                  </Col>
            </Row>
                <Row>
                  <Col span="9">
                    <FormItem
                      label="系统角色" {...formItemLayout}
                    >
                      { getFieldDecorator("systemRole",{
                      })(
                        <Select placeholder="请选择" dropdownMatchSelectWidth mode="multiple">
                          { selectDataList }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
            <div className="information">联系方式</div>
            <Row>
              <Col span="9">
            <FormItem
             label="登录手机号" {...formItemLayout}
            >
              {getFieldDecorator('phoneNumber', {
                 rules: [{
                    pattern: /^1[34578]\d{9}$/, message: '手机号不正确'
                  }],
              })(
                <Input />
              )}
            </FormItem>
              </Col>
              <Col span="9">
            <FormItem
             label="登录密码" {...formItemLayout}
            >
              {getFieldDecorator('password', {
                initialValue: "Kbm12345",
              })(
                <Input readOnly={ true }/>
              )}
            </FormItem>
              </Col>
            </Row>
          <Row>
            <Col span="9">
            <FormItem
             label="联系方式" {...formItemLayout}
            >
              {getFieldDecorator('information', {
                  rules: [{
                    pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '手机号不正确'
                  }],
              })(
                <Input/>
              )}
            </FormItem>
            </Col>
              <Col span="9">
            <FormItem
             label="公司邮箱" {...formItemLayout}
            >
              {getFieldDecorator('companyEmail', {
                 rules: [{
                    type: 'email', message: '邮箱格式不正确'
                  }],
              })(
                <Input />
              )}
            </FormItem>
            </Col>
          </Row>
              <Row>
                <Col span="9">
             <FormItem
             label="内部分机" {...formItemLayout}
            >
              {getFieldDecorator('internalExtension', {
                  rules: [{
                    pattern:/^[0-9\-]{0,20}$/, message: '请正确输入内部分机'
                  }],
              })(
                <Input />
              )}
            </FormItem>
              </Col>
              </Row>
          </Form>
          </div>
          <div className="button-group-bottom">
            <Button className="button-group-bottom-1" onClick={ this.handelReturn }>返回</Button>
            <Button className="button-group-bottom-2" onClick={ this.handleSave }>保存</Button>
          </div>
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

const addUser = Form.create()(AddUser);
export default connect(mapStateToProps)(addUser)
