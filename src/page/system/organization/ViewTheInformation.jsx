"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Form,Select} from 'antd'
import {Link} from 'react-router'
import './addUser.scss'
import moment from 'moment'
import {local, session} from 'common/util/storage.js'
import Disabled from './Disabled.jsx'
import AddJobed from './AddJob.jsx'
import IMG from 'assets/img.png'
import { parse } from 'qs'
const createForm = Form.create;


@createForm()
class ViewTheInformation extends React.Component {
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
    const param = parse(location.search.substr(1))
    const endemic  = session.get("endemic")
    this.endemic = endemic;
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
        toViewVisible: false
    })
  }
  headelSave() {
    this.setState({
        AddJobVisible: true
    })
  }
  AddJobVisibleCancel() {
    const param = parse(location.search.substr(1))
    this.setState({
        AddJobVisible: false
    })
    this.props.dispatch({
      type: 'organization/getUserListById',
      payload: param
    })
  }
   onError() {
    this.setState({
      error: true,
    })
  }

  handleDisabled = ()=>{
    const param = parse(location.search.substr(1))
    this.setState({
        toViewVisible:true,
        ID: param.userID
      })
  }

  headelReturn = ()=>{
    window.history.back(-1);
  }
    render() {
      let USER = []
      let SEX = []
      let entrys = []
      let time = null
      let JobInformation = []
      let selectData = local.get("roleSelectData")
      let identifier =null;
      let isDisabled = false; // 判断该用户在该地方中心是否被禁用
      if(this.props.userID != null){
         USER = this.props.userID
         SEX = USER.sex == 0?"男":"女"
         entrys = USER.entrys

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
           let roles = []
           const entry = USER.entrys[i]
           if (entry.type == 0) {
             identifier = entry.identifier;
             isDisabled = entry.status;
           }
           entry.roles.map((data)=>{
             selectData.map((list)=>{
               if(data.roleId == list.id){
                 roles.push(list.name+"  ")
               }
             })
           })

           const set = new Set(roles);
           let temp = [...set]
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
                    <p className="directLeadership"><span>公司邮箱 :</span><span className="Two">{entrys[i].email}</span></p>
                    <p className="position"><span>内部分机 :</span><span className="Two">{entrys[i].extension}</span></p>
                </div>
              </div>)
         }

          time = moment(USER.gmt_entry).format("YYYY-MM-DD")
      }
      let imageUrl = USER.imgURL;

      const param = parse(location.search.substr(1))

      if ( this.state.error ) {
        imageUrl = IMG;
      }
      let add_position = !this.props.permissionAlias.contains("POSITION_ADD");
      let disable = !this.props.permissionAlias.contains('EMPLOYEE_DISABLE');
      let edit = !this.props.permissionAlias.contains('EMPLOYEE_EDIT');
      if (!this.endemic) {
        this.endemic = session.get("endemic");
      } else {
        if (this.endemic.id != param.endemicId) {
          add_position = true;
          disable = true;
          edit = true;
        }
      }
      // 已经被禁用
      if (isDisabled) {
        disable = true;
      }

      return(
        <div className="view-info">
          <div className="basicInformation">基本信息</div>
            <div className="basicInformationContent">
              <img className="img" src={ imageUrl } onError={ this.onError.bind(this) }/>
              <p className="userName"><span>姓名 :</span><span className="Two">{USER.name}</span></p>
              <p className="Numbering"><span>编号 :</span><span className="Two">{identifier}</span></p>
              <p className="gender"><span>性别 :</span><span className="Two">{SEX}</span></p>
              <p className="entryTime"><span>入职时间 :</span><span className="Two">{ time }</span></p>
            </div>
            { JobInformation }
            <div className="button-group-bottom">
              <Link>
                <Button className="button-group-bottom-1" onClick={this.headelReturn.bind(this)}>返回</Button>
              </Link>
              <Button disabled={add_position} className="button-group-bottom-2" onClick={this.headelSave.bind(this)}>添加职位</Button>
              <Link to={{ pathname: '/system/organization/editUser', query:{ ...param }  }}>
                <Button disabled={edit} className="button-group-bottom-3">编辑</Button>
              </Link>
              <Button disabled={disable} className="button-group-bottom-4" onClick={this.handleDisabled.bind(this)}>{ isDisabled? '已禁用': '禁用'}</Button>
            </div>
            <Disabled
              visible={ this.state.toViewVisible }
              handleOk={this.state.handleOk}
              onCancel={ this.handleCreateModalCancel.bind(this) }
              userId = { param.userId }
            />
            <AddJobed
              visible={ this.state.AddJobVisible }
              handleOk={this.state.handleOk}
              onCancel={ this.AddJobVisibleCancel.bind(this) }
              userId = { param.userId }
            />
        </div>
      )
  }
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
export default connect(mapStateToProps)(ViewTheInformation)
