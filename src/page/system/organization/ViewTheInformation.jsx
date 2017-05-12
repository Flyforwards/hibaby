"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import {local, session} from '../../../common/util/storage.js'
import DropDownMenued from './dropDownMenu.jsx'
import Disabled from './Disabled.jsx'
import AddJobed from './AddJob.jsx'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
//地方中心字段
const endemic  = session.get("endemic")
const SelectData = local.get("rolSelectData")
let traversalDataId = []
const dataID = window.location.search.split("=")[1]

class ViewTheInformationed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID:null,
      toViewVisible: false,
      AddJobVisible: false
    }
  }
  componentDidMount(){
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
    this.setState({
        AddJobVisible: false
    })
  }
  headelDisabled = ()=>{
    this.setState({
        toViewVisible:true,
        ID:dataID
      })
  }
  headelReturn = ()=>{
     this.props.history.go(-1)
  }
    render() { 
      let USER = []
      let SEX = []
      let roles = []
      let entrys = []
      let time = null
      let JobInformation = []
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      if(this.props.userID != null){
         USER = this.props.userID
         SEX = USER.sex == 1?"男":"女"
          entrys = USER.entrys
         roles = USER.entrys.map((item)=>{
          return item.roles.map((data)=>{
            return data.roleId
          })
         })
         let lendata = USER.entrys.length
         for(var i=0;i<lendata;i++){
            JobInformation.push(<div>
                <div className="entryInformation">入职信息{i}</div>
                <div className="entryInformationContent">
                  <p className="localCenter"><span>地方中心:</span><span className="Two">{entrys[i].endemicId}</span></p>
                  <p className="affiliatedDepartment"><span>隶属部门:</span><span className="Two">{entrys[i].deptId}</span></p>
                  <p className="directLeadership"><span>直系领导:</span><span className="Two">{entrys[i].leaderId}</span></p>
                  <p className="position"><span>职位:</span><span className="Two">{entrys[i].positionId}</span></p>
                  <p className="systemRole"><span>系统角色:</span><span className="Two">{roles}</span></p>
                </div>
              <div className="contactInformation">联系方式</div>
              <div className="contactInformationContent">
                  <p className="localCenter"><span>登陆手机号:</span><span className="Two">{USER.mobile}</span></p>
                  <p className="affiliatedDepartment"><span>联系方式:</span><span className="Two">{entrys[i].contact}</span></p>
                  <p className="directLeadership"><span>公司邮箱:</span><span className="Two">{entrys[i].emaill}</span></p>
                  <p className="position"><span>内部分机:</span><span className="Two">{entrys[i].extension}</span></p>
              </div>
              </div>)
         }
          function getLocalTime(nS) { 
            var now = new Date(parseInt(nS) * 1000);
            var year=now.getFullYear(); 
            var month=now.getMonth()+1; 
            var date=now.getDate(); 
            return `${year}-${month}-${date}`
          } 
          time = getLocalTime('1494230932')
      }
      return(
        <div className="viewTheInformation">
          <div className="basicInformation">基本信息</div>
            <div className="basicInformationContent">
              <img className="img" src={USER.imgURL}></img>
              <p className="userName"><span>姓名:</span><span className="Two">{USER.name}</span></p>
              <p className="Numbering"><span>编号:</span><span className="Two">{USER.identifier}</span></p>
              <p className="gender"><span>性别:</span><span className="Two">{SEX}</span></p>
              <p className="entryTime"><span>入职时间:</span><span className="Two">{ time }</span></p>
            </div>
            { JobInformation }

          <Button  className="disabledButton" onClick={this.headelDisabled}>禁用</Button>
          <Link to={{ pathname: '/system/organization/editUser', query: { userID:dataID } }}><Button  type="primary" className="editButton">编辑</Button></Link>
          <Button className="addButton" onClick={this.headelSave.bind(this)}>添加职位</Button>
          <Link><Button className="returnButton" onClick={this.headelReturn}>返回</Button></Link>
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
function ViewTheInformation({
    dispatch,
    data,
    userID
}) {
  return ( <div>
    <ViewTheInformationed dispatch = {
      dispatch
    }
    userID = {
      userID
    }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    userID,
    data
  
  } = state.organization;

  return {
    loading: state.loading.models.organization,
    userID,
    data
  };
}
const viewTheInformation = Form.create()(ViewTheInformationed);
export default connect(mapStateToProps)(viewTheInformation)
