"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import {local, session} from 'common/util/storage.js'
import DropDownMenued from './dropDownMenu.jsx'
import Disabled from './Disabled.jsx'
import AddJobed from './AddJob.jsx'
import IMG from 'common/img.png'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
//地方中心字段

class ViewTheInformationed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID:null,
      toViewVisible: false,
      AddJobVisible: false,
      error: false
    }
  }
  componentDidMount(){
    let dataID = window.location.search.split("=")[1]
    let endemic  = session.get("endemic")
    this.props.dispatch({
      type: 'organization/getUserListById',
      payload: {
       dataId:dataID
      }
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
        toViewVisible: false
    })
  }
  headelSave() {
    this.setState({
        AddJobVisible: true
    })
  }
  AddJobVisibleCancel() {
    let dataID = window.location.search.split("=")[1]
    this.setState({
        AddJobVisible: false
    })
    this.props.dispatch({
      type: 'organization/getUserListById',
      payload: {
       dataId:dataID
      }
    })
  }
   onError() {
    this.setState({
      error: true,
    })
  }
  headelDisabled = ()=>{
    let dataID = window.location.search.split("=")[1]
    this.setState({
        toViewVisible:true,
        ID:dataID
      })
  }
  headelReturn = ()=>{
    window.history.back(-1);
  }
    render() {
      let USER = []
      let SEX = []
      let roles = []
      let entrys = []
      let time = null
      let JobInformation = []
      let identifier =null
      let selectData = local.get("rolSelectData")
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      if(this.props.userID != null){
         USER = this.props.userID
         SEX = USER.sex == 0?"男":"女"
         entrys = USER.entrys
        USER.entrys.map((item)=>{
          if(item.type == 0){
            identifier = item.identifier
          }
          item.roles.map((data)=>{
            selectData.map((list)=>{
              if(data.roleId == list.id){
              roles.push(list.name+"  ")
              }
            })
          })
         })
         const set = new Set(roles);
         let temp = [...set]
         let lendata = USER.entrys.length
         for(var i=0;i<lendata;i++){
           let endemicName = null
           let dept = null
           let positionName = null
           if(this.props.getDeptList){
            this.props.getDeptList.map((item)=>{
              if(entrys[i].deptId == item.id){
                dept = item.name
              }
            })
           }
           //console.log("getPosition职位>>>>",this.props.getPosition)
           if(this.props.getPosition){
            this.props.getPosition.map((item)=>{
              if(entrys[i].positionId == item.id){
                positionName = item.name
              }
            })
           }
           if(this.props.getEndemic){
            this.props.getEndemic.map((item)=>{
              if(entrys[i].endemicId == item.id){
                  endemicName = item.name
              }
            })
           }
            JobInformation.push(<div key={i.toString()}>
                <div className="entryInformation">入职信息{i}</div>
                <div className="entryInformationContent">
                  <p className="localCenter"><span>地方中心 :</span><span className="Two">{endemicName}</span></p>
                  <p className="affiliatedDepartment"><span>隶属部门 :</span><span className="Two">{dept}</span></p>
                  <p className="directLeadership"><span>直系领导 :</span><span className="Two">{entrys[i].leaderName}</span></p>
                  <p className="position"><span>职位 :</span><span className="Two">{positionName}</span></p>
                  <p className="systemRole"><span>系统角色 :</span><span className="Two">{temp}</span></p>
                </div>
              <div className="contactInformation">联系方式</div>
                <div className="contactInformationContent">
                    <p className="localCenter"><span>登陆手机号 :</span><span className="Two">{USER.mobile}</span></p>
                    <p className="affiliatedDepartment"><span>联系方式 :</span><span className="Two">{entrys[i].contact}</span></p>
                    <p className="directLeadership"><span>公司邮箱 :</span><span className="Two">{entrys[i].emaill}</span></p>
                    <p className="position"><span>内部分机 :</span><span className="Two">{entrys[i].extension}</span></p>
                </div>
              </div>)
         }

          time = getLocalTime(USER.gmt_entry)
      }
      let imageUrl = USER.imgURL;

      let dataID = window.location.search.split("=")[1];
      if ( this.state.error ) {
        imageUrl = IMG;
      }
      const add_position = !this.props.permissionAlias.contains("POSITION_ADD");
      let disable = !this.props.permissionAlias.contains('EMPLOYEE_DISABLE');
      let edit = !this.props.permissionAlias.contains('EMPLOYEE_EDIT');
      return(
        <div className="viewTheInformation">
          <div className="basicInformation">基本信息</div>
            <div className="basicInformationContent">
              <img className="img" src={ imageUrl } onError={ this.onError.bind(this) }/>
              <p className="userName"><span>姓名 :</span><span className="Two">{USER.name}</span></p>
              <p className="Numbering"><span>编号 :</span><span className="Two">{identifier}</span></p>
              <p className="gender"><span>性别 :</span><span className="Two">{SEX}</span></p>
              <p className="entryTime"><span>入职时间 :</span><span className="Two">{ time }</span></p>
            </div>
            { JobInformation }

          <Button  className="disabledButton" onClick={this.headelDisabled}>禁用</Button>
          <Link to={{ pathname: '/system/organization/editUser', query: { userID:dataID} }}>
              <Button disabled={edit}  type="primary" className="editButton">编辑</Button>
          </Link>
          <Button disabled={add_position} className="addButton" onClick={this.headelSave.bind(this)}>添加职位</Button>
          <Link><Button disabled={disable} className="BackBtn" onClick={this.headelReturn.bind(this)}>返回</Button></Link>
           <Disabled
              visible={ this.state.toViewVisible }
              handleOk={this.state.handleOk}
              onCancel={ this.handleCreateModalCancel.bind(this) }
              ID = { dataID }
          />
          <AddJobed
              visible={ this.state.AddJobVisible }
              handleOk={this.state.handleOk}
              onCancel={ this.AddJobVisibleCancel.bind(this) }
              ID = { dataID }
          />
        </div>
      )
  }
}

function getLocalTime(nS) {
  var now = new Date(parseInt(nS));
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  if(month<10){
    month = "0"+month
  }
  if(date<10){
    date = "0"+date
  }
  return `${year}-${month}-${date}`
}

function mapStateToProps(state) {
  const {
    userID,
    data,
    getPosition,
    getDeptList,
    getEndemic,

  } = state.organization;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.organization,
    userID,
    data,
    getPosition,
    getDeptList,
    getEndemic,
    permissionAlias
  };
}
const viewTheInformation = Form.create()(ViewTheInformationed);
export default connect(mapStateToProps)(viewTheInformation)
