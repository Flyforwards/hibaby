"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Form,DatePicker,Select,Upload,Modal,message} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import moment from 'moment';
import {local, session} from 'common/util/storage.js'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import UPload from 'common/Upload.js'
import DeleteEnery from './DeleteEnery.jsx'
import { parse } from 'qs'

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
let gmt_entry =null
//地方中心字段
let traversalDataId = []
class EditUsered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      gmt_entry:null,
      index:null,
      display:"block",
      identifier:null,
      Leager:null,
      TableData:null,
      NewuserImg:null,
      DeleteVisible: false,
      DeleteIndex:null,
      dataIndex:null
    }
    this.dataIndex = null
  }
  componentDidMount(){
    const param = parse(location.search.substr(1))
    let endemic  = session.get("endemic")
    this.props.dispatch({
      type: 'organization/getUserListById',
      payload: param
    })
    this.props.dispatch({
        type: 'organization/getDeptListByEndemicId',
        payload: {
          dataId: endemic.id
        }
    })
    this.props.dispatch({
      type: 'organization/getPosition',
      payload: { }
    });
    this.props.dispatch({
      type: 'organization/getEndemic',
      payload: { }
    });
    this.props.dispatch({
      type: 'organization/getDeptList',
      payload: { }
    });
  }
  handleCreateModalCancel() {
      this.setState({
        visible: false,
      })
    }
  handleDeleteEneryCancel(){
    this.setState({
        DeleteVisible: false,
      })
    const param = parse(location.search.substr(1))
    this.props.dispatch({
      type: 'organization/getUserListById',
      payload: param
    })
  }
  headelReturnTabal(data){
    this.setState({
      TableData:data[0]
    })
  }
  //返回按键
  headelReturn = ()=>{
   this.props.history.go(-1)
  }
  //选择直系领导
  directLeader = (dataIndex)=>{
    this.dataIndex =dataIndex
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
  //删除入职信息
  deleteMessage = (index)=>{
    this.setState({
      DeleteIndex:index,
      DeleteVisible:true
    })
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
  headelSave = (entrys,USER)=>{
    let endemic  = session.get("endemic")
    const userId =parse(location.search.substr(1)).userId
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        const fields = this.props.form.getFieldsValue();
        let entrysData = []
        for (var i=0;i<entrys.length;i++){
          let roleIdData = []
          if(fields[`systemRole${i}`]){
            fields[`systemRole${i}`].map((item)=>{
              roleIdData.push({"roleId":item,"userID": userId})
            })
          }
          if(entrys[i].type == 0){
           // console.log("position",fields[`directLeadership${i}`][0])
            entrysData.push({
              "contact":fields[`information${i}`], //fields.information,//联系方式
              "deptId":fields[`affiliatedDepartment${i}`],//fields.affiliatedDepartment,//隶属部门
              "email":fields[`companyEmail${i}`],//fields.companyEmail,//公司邮箱
              "extension":fields[`internalExtension${i}`], //fields.internalExtension,//内部分机
              "leaderId": fields[`directLeadership${i}`][0],//直系领导
              "positionId": fields[`position${i}`],//职位
              "id":entrys[i].id,
              "roles": roleIdData,
              "identifier": this.state.identifier//编号//fields.Numbering
          })
        }else{
          entrysData.push({
              "contact":fields[`information${i}`], //fields.information,//联系方式
              "deptId":fields[`affiliatedDepartment${i}`],//fields.affiliatedDepartment,//隶属部门
              "email":fields[`companyEmail${i}`],//fields.companyEmail,//公司邮箱
              "extension":fields[`internalExtension${i}`], //fields.internalExtension,//内部分机
              "leaderId": fields[`directLeadership${i}`][0],//直系领导
              "positionId": fields[`position${i}`],//职位
              "id":entrys[i].id,
              "roles": roleIdData
          })
        }
      }
        // console.log('entrysData', entrysData);
      if(entrysData && entrysData[0].roles.length >= 1){
        this.props.dispatch({
          type: 'organization/modifyUser',
          payload: {
            "categoryId": endemic.id,
            "entrys": entrysData,
            "gmt_entry": gmt_entry,
            "mobile": fields.phoneNumber,
            "name": fields.userName,
            "password": fields.password?fields.password:null,
            "id": userId,
            "sex": USER.sex,
            "img":this.state.NewuserImg?this.state.NewuserImg:USER.img
          }
        })
      }else{
        message.warning('请选择系统角色')
      }
      }
    })
  }
  headelImg(NewuserImg){
    this.setState({
      NewuserImg:NewuserImg
    })
  }
  getLocalTime(nS) {
      var now = new Date(parseInt(nS));
      var year=now.getFullYear();
      var month=now.getMonth()+1;
      var date=now.getDate();
      return `${year}-${month}-${date}`
    }
  onChange(value,index){
    this.setState({
      gmt_entry:index
    })
  }
    render() {
      let USER = []
      let SEX = []
      let roles = []
      let entrys = []
      let traversalEndemicId = []
      let leaderId = []
      let selectDataList = []
      let EntryInformationList = []
      var time = null;
      let display = 'block'
      let endemic  = session.get("endemic")
      let LeaderTableList = null
      const SelectData = local.get("roleCurrentData")
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      if(this.props.userID != null){
         USER = this.props.userID
         entrys = USER.entrys
         SEX = USER.sex == 0?"男":"女"
         let lendata = USER.entrys.length
         for(var i=0;i<lendata;i++){
            let headelDepartment = this.affiliatedDepartment
            let entryContent = USER.entrys[i]
            let deptName = null
            let positionName = '';
          if(this.props.getPosition){
           // console.log("entrys[i]",entrys)
            this.props.getPosition.map((item)=>{
              if(entrys[i].positionId == item.id){
                positionName = String(item.id);
              }
            })

           }
            deptName=String(entryContent.deptId)
            let roles = []
            if(USER.entrys[i].type == 0){
               display = 'none'
               this.state.identifier=USER.entrys[i].identifier
            }else{
               display = 'block'
            }
            entryContent.roles.map((item)=>{
              roles.push(String(item.roleId))
            })
            if(this.props.dataEndemicId != null){
                traversalEndemicId = this.props.dataEndemicId.map((item,index)=>{
                  return (<Option value={item.id+""} key={ item.id }>{ item.name }</Option>)
              })
            }
            if(this.props.getPosition != null){
                traversalDataId = this.props.getPosition.map((item,index)=>{
                  return (<Option value={item.id+""} key={ item.id * 10 }>{ item.name }</Option>)
              })
            }else{
              traversalDataId = null
            }
            if(SelectData != null){
                selectDataList = SelectData.map((item,index)=>{
                  return (<Option value={item.id+""} key={ item.id * 1000 }>{item.name}</Option>)
              })
            }
            if(this.state.TableData){
              leaderId.push(<Option value={this.state.TableData.id+""} key={ this.state.TableData.id * 1000 }>{this.state.TableData.name}</Option>)
            }else{
              leaderId.push(<Option value={entryContent.leaderId+""} key={ entryContent.leaderId * 1000 }>{entryContent.leaderName}</Option>)
            }

            EntryInformationList.push(
              <div className="AddChildNode" key={ i }>
                 <div className="entryInformation">入职信息{i}
                  <Icon type="close"  style={{display:display}} onClick={this.deleteMessage.bind(this,entryContent.id)} />
                 </div>
                <Form layout="inline" className="entryInformationForm">
                  <FormItem
                   label="地方中心"
                   className="localCenter"
                   key = { i * 10 + 1 }
                  >
                    {getFieldDecorator('localCenter', {
                      initialValue: endemic.name,
                      rules: [{ required: true, message: '此项为必选项' }],
                    })(
                   <Input  readOnly = { true }/>
                    )}
                  </FormItem>
                  <FormItem
                   label="隶属部门"
                   className="affiliatedDepartment"
                   key = { i * 10 + 2 }
                  >
                  { getFieldDecorator(`affiliatedDepartment${i}`,{
                    initialValue: deptName,
                    rules: [{ required: true, message: '此项为必选项' }],
                  })(
                    <Select placeholder="请选择" onSelect = {this.affiliatedDepartment.bind(this)}>
                      { traversalEndemicId }
                    </Select>
                  )}
                  </FormItem>
                  <FormItem
                   label="直系领导"
                   className="directLeadership"
                   key = { i * 10 + 3 }
                  >
                    {getFieldDecorator(`directLeadership${i}`, {
                    initialValue:this.state.TableData?[String(this.state.TableData.id)]:entryContent.leaderId?[String(entryContent.leaderId)]:""
                    })(
                      <Select  style={{ width: 260 }} disabled={true}>
                        {leaderId}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                   className="button"
                   key = { i * 10 + 4 }
                  >
                  <Button type="primary" onClick={this.directLeader.bind(this,i)}>选择</Button>
                  </FormItem>
                  <FormItem
                   label="职位"
                   className="position"
                   key = { i * 10 + 5 }
                  >
                  { getFieldDecorator(`position${i}`,{
                    initialValue: positionName,
                    rules: [{ required: true, message: '此项为必选项' }],
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
                   key = { i * 10 + 6 }
                  >
                  { getFieldDecorator(`systemRole${i}`,{
                    initialValue: roles,
                    rules: [{ required: true, message: '此项为必选项' }],
                  })(
                    <Select placeholder="请选择" dropdownMatchSelectWidth mode="tags">
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
                   key = { i * 100 + 1 }
                  >
                    {getFieldDecorator('phoneNumber', {
                      initialValue:USER.mobile,
                      rules: [
                        { required: true, message: '此项为必选项' },
                        {
                          pattern: /^1[34578]\d{9}$/, message: '手机号不正确'
                      }],
                    })(
                      <Input readOnly ={ true }/>
                    )}
                  </FormItem>
                  { entryContent.type==0?
                  <FormItem
                   label="登录密码"
                   className="password"
                   key = { i * 100 + 2 }
                  >
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          pattern:/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/, message: '由8到20位数字字母组成'
                      }],
                    })(
                      <Input placeholder="********"/>
                    )}
                  </FormItem>:null}
                  <br/>
                  <FormItem
                   label="联系方式"
                   className="information"
                   key = { i * 100 + 3 }
                  >
                    {getFieldDecorator(`information${i}`, {
                      initialValue:entryContent.contact,
                      rules: [
                        { required: true, message: '此项为必选项' },
                        {
                          pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '手机号不正确'
                        }],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                   label="公司邮箱"
                   className="companyEmail"
                   key = { i * 100 + 4 }
                  >
                    {getFieldDecorator(`companyEmail${i}`, {
                      initialValue:entryContent.email,
                       rules: [
                         { required: true, message: '此项为必选项' },
                         {
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
                   key = { i * 100 + 5 }
                  >
                  {getFieldDecorator(`internalExtension${i}`, {
                    initialValue: entryContent.extension
                  })(
                    <Input />
                  )}
                </FormItem>
                </Form>
          </div>)
         }
        roles = USER.entrys.map((item)=>{
          return item.roles.map((data)=>{
              return data.roleId
          })
         })
      }
      time = this.getLocalTime(USER.gmt_entry)
      gmt_entry = time
      return(
        <div className="addUser">
          <div className="basicInformation">基本信息</div>
          <Form layout="inline" className="basicInformationForm">
           <FormItem
            >
              {getFieldDecorator('userImg', {
                rules: [],
              })(
               <div className="img"><UPload urlList={USER.imgURL} headelUserImg={this.headelImg.bind(this)}/></div>
              )}
            </FormItem>
            <FormItem
             label="姓名"
             className="userName"
            >
              {getFieldDecorator('userName', {
                initialValue:USER.name
              })(
                <Input readOnly = {true}/>
              )}
            </FormItem>

            <FormItem
             label="性别"
             className="Numbering"
            >
              {getFieldDecorator('gender', {
              })(
                <span className="Two">{SEX}</span>
              )}
            </FormItem>
              <br/>
            { time !="NaN-NaN-NaN"?
              <p className="gender">
              <span>入职日期:</span>
              <DatePicker allowClear={ false } defaultValue={moment(time)} format={dateFormat} onChange={this.onChange.bind(this)}/>
            </p>:null
            }
          </Form>
          { EntryInformationList }
          <SelectTheNodeFrom
            visible={ this.state.visible }
            onCancel ={ this.handleCreateModalCancel.bind(this) }
            treeData = { this.props.LeagerData }
            headelReturnTabal= { this.headelReturnTabal.bind(this) }
          />
          <DeleteEnery
            visible={ this.state.DeleteVisible }
            onCancel ={ this.handleDeleteEneryCancel.bind(this) }
            DeleteIndex = { this.state.DeleteIndex }
            headelReturnTabal= { this.headelReturnTabal.bind(this) }
          />
          <div className="button-group-bottom">
            <Button className="button-group-bottom-1" onClick={ this.headelReturn }>返回</Button>
            <Button className="button-group-bottom-2" onClick={ this.headelSave.bind(this,USER.entrys,USER) }>保存</Button>
          </div>
        </div>
      )
  }
}

function mapStateToProps(state) {
  const {
    data,
    dataEndemicId,
    dataId,
    userID,
    getPosition,
    getEndemic,
    LeagerData,
  } = state.organization;

  return {
    loading: state.loading.models.organization,
    data,
    userID,
    dataId,
    getPosition,
    getEndemic,
    LeagerData,
    dataEndemicId,
  };
}

const editUser = Form.create()(EditUsered);
export default connect(mapStateToProps)(editUser)
