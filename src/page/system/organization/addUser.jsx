"use strict"

import React from 'react'
import { connect } from 'dva'
import { Input, Button, Form, Radio, DatePicker, Select, message, Row, Col } from 'antd'
import { Link } from 'react-router'
import './addUserInfo.scss'
import { local, session } from 'common/util/storage.js'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import UPload from 'common/Upload.js'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


const Option = Select.Option

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      visible:false,
      TableData:null,
      img:null
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
        nodeid: endemic.id,
        tissueProperty: endemic.tissueProperty,
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
  chooseDepartment = (value,node, extra) => {
    const { form, dispatch } = this.props;
    form.resetFields(['positionId']);
    dispatch({
       type: 'organization/position',
       payload: {
         dataId: value
       }
    })
  }
  //保存按键
  handleSave = ()=>{
    let endemic  = session.get("endemic")
    this.props.form.validateFields((err, values) => {
      if (!this.state.img) {
        message.error('请上传照片！')
        return;
      }
      if(!err) {
        let roleIdData = []
        if (values.systemRole) {
          values.systemRole.map((item) => {
            roleIdData.push({"roleId": item})
          })
        }
        this.props.dispatch({
          type: 'organization/addUser',
          payload: {
            categoryId: endemic.id,
            entrys: [
              {
                "contact": values.contact,  //联系方式
                "deptId": values.deptId, //隶属部门
                "email": values.email, //公司邮箱
                "extension": values.extension, //内部分机
                "leaderId": this.state.TableData ? this.state.TableData.id : null,//直系领导
                "positionId": values.positionId,//职位
                "roles": roleIdData
              }
            ],
            "gmt_entry": values.gmt_entry,//入职日期
            "mobile": values.mobile, //手机号
            "name": values.name, //用户名
            "password": values.password, //密码
            "sex": values.sex, //性别
            "img": this.state.img
          }
        })
      }
    })
  }
  uploadImg(img){
    this.setState({
      img:img
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
      //地方中心字段
      let traversalDataId = []

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
      const rowLayout= {
        offset: 2,
        span: 9
      }
      const rowTopLayout = {
        span: 10
      }
      const rowTopLayout2 = {
        span: 10,
        offset: 2,
      }
      return(
        <div className="add-user-info">
          <Form>
         <div className="information">基本信息</div>
            <div className="information-item">
            <Row >
              <Col offset='1' span="2">
             <FormItem
              >
                {getFieldDecorator('img', {
                })(
                  <UPload urlList={"Img"} headelUserImg={ this.uploadImg.bind(this)}/>
                )}
              </FormItem>
              </Col>
              <Col span="20">
                <Row>
                  <Col {...rowTopLayout}>
                    <FormItem
                      label="姓名" {...formItemLayout}
                    >
                      {getFieldDecorator('name', {
                        rules: [{ max: 10, message: '请按要求输入' }, { required: true, message: '必填项！' }],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                  <Col {...rowTopLayout2}>
                    <FormItem
                      label="性别" {...formItemLayout}
                    >
                      {getFieldDecorator('sex', {
                        rules: [{ required: true, message: '必选项！' }],
                      })(
                        <RadioGroup>
                          <Radio value={0}>男</Radio>
                          <Radio value={1}>女</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...rowTopLayout}>
                    <FormItem
                      label="入职日期" {...formItemLayout}
                    >
                      {getFieldDecorator('gmt_entry', {
                        rules: [{ required: true, message: '必填项！' }],
                      })(
                        <DatePicker />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            </div>
          <div className="information">入职信息</div>
            <div className="information-item">
            <Row>
              <Col {...rowLayout}>
            <FormItem
             label="地方中心" {...formItemLayout}
            >
              {getFieldDecorator('localCenter', {
                initialValue: endemic.name,
                rules: [ { required: true, message: '必填项！' }],
              })(
                <Input readOnly = { true }/>
              )}
            </FormItem>
              </Col>
              <Col {...rowLayout}>
            <FormItem
             label="隶属部门" {...formItemLayout}
            >
            { getFieldDecorator("deptId",{
               initialValue: NODEID,
               rules: [ { required: true, message: '必填项！' }],
            })(
              <Select placeholder="请选择" onSelect={this.chooseDepartment.bind(this)}>
                { traversalEndemicId }
              </Select>
            )}
            </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...rowLayout}>
            <FormItem
             label="直系领导" {...formItemLayout}
            >
              {getFieldDecorator('directLeadership', {
                initialValue: this.state.TableData?this.state.TableData.name:"",
              })(
                <Input readOnly={true}/>
              )}
              <Button className="right-button" onClick={this.directLeader.bind(this)}>选择</Button>
            </FormItem>

              </Col>
              <Col {...rowLayout}>
            <FormItem
             label="职位" {...formItemLayout}
            >
            { getFieldDecorator("positionId",{
              rules: [ { required: true, message: '必填项！' }],
            })(
              <Select placeholder="请选择" className="po">
                { traversalDataId }
              </Select>
            )}
            </FormItem>
                  </Col>
            </Row>
                <Row>
                  <Col {...rowLayout}>
                    <FormItem
                      label="系统角色" {...formItemLayout}
                    >
                      { getFieldDecorator("systemRole",{
                        rules: [ { required: true, message: '必填项！' }],
                      })(
                        <Select placeholder="请选择" dropdownMatchSelectWidth mode="multiple">
                          { selectDataList }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
            </div>
            <div className="information">联系方式</div>
            <div className="information-item">
            <Row>
              <Col {...rowLayout}>
            <FormItem
             label="登录手机号" {...formItemLayout}
            >
              {getFieldDecorator('mobile', {
                 rules: [ { pattern: /^1[34578]\d{9}$/, message: '手机号不正确' },
                  { required: true, message: '必填项！' }],
              })(
                <Input />
              )}
            </FormItem>
              </Col>
              <Col {...rowLayout}>
            <FormItem
             label="登录密码" {...formItemLayout}
            >
              {getFieldDecorator('password', {
                initialValue: "Kbm12345",
                rules: [ { required: true, message: '必填项！' }],
              })(
                <Input readOnly={ true }/>
              )}
            </FormItem>
              </Col>
            </Row>
          <Row>
            <Col {...rowLayout}>
            <FormItem
             label="联系方式" {...formItemLayout}
            >
              {getFieldDecorator('contact', {
                  rules: [
                    { required: true, message: '必填项！' },
                    { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '手机号不正确' }],
              })(
                <Input/>
              )}
            </FormItem>
            </Col>
              <Col {...rowLayout}>
            <FormItem
             label="公司邮箱" {...formItemLayout}
            >
              {getFieldDecorator('email', {
                 rules: [
                   { required: true, message: '必填项！' },
                   { type: 'email', message: '邮箱格式不正确' }],
              })(
                <Input />
              )}
            </FormItem>
            </Col>
          </Row>
              <Row>
                <Col {...rowLayout}>
             <FormItem
             label="内部分机" {...formItemLayout}
            >
              {getFieldDecorator('extension', {
                  rules: [{
                    pattern:/^[0-9\-]{0,20}$/, message: '请正确输入内部分机'
                  }],
              })(
                <Input />
              )}
            </FormItem>
              </Col>
              </Row>
            </div>
          </Form>
          <div className="button-group-bottom-common">
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
