"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form ,message} from 'antd'
import { Link} from 'react-router'
import './AddCourse.scss';
import AddCourseModel from './AddCourseModel.jsx'
import UserServiceinfo from './userServiceinfo.jsx'
import {keyToText} from '../../../utils';
import PermissionButton from 'common/PermissionButton';
let TYPENAME = [];

class AddCourse extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'name',
          key:'name',
          width: "20%",
        }, {
          title: '服务项目价格',
          dataIndex: 'price',
          key:'price',
          width: "20%",
          render:(text,record,index) => {
            let price = "￥"+record.price
            return (
              price
            )
          }
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key:'contents',
          width: "30%",
        },{
          title: '使用/剩余次数',
          dataIndex: 'usageCount',
          key: 'usageCount',
          width: "20%",
          render:(text,record,index) => {
            let usageCount =record.icount+"/"+record.usageCount
            return (
              usageCount
            )
          }
          },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '10%',
          render: (text, record, index) => {
            let visible = false
            //console.log("record.usageCount>>>>",record.usageCount)
            if(record.usageCount <= 0){
                visible = true
            }
            return (
                <span className="tableBtnBox">
                  <Button className="tableBtn" type="primary" onClick={this.addNumber.bind(this,record,)} disabled={visible}>使用</Button>
                </span>
            );
          },
        }];
        this.state = {
          AddCourseVisible: false,
          UserServiceinfoVisible:false,
          data:{},
          handle:"",
          ID:null
        }
        this.handle = false
        this.code = false
    }
    addCourse (){
      this.setState({
        AddCourseVisible: true,
      })
    }
    addNumber(record,dataDetailId){
      // console.log("record>>>>",record.usageCount)
      if(record.usageCount<=0){
          return
      }else{
        this.setState({
          UserServiceinfoVisible: true,
          data:record,
          handle:this.handle
        })

      }
    }
    handleDeleteCancel(){
      this.setState({
        AddCourseVisible: false,
      })
    }
    handleUserServiceinfoCancel(code){
      this.setState({
        UserServiceinfoVisible: false,
      })
    }
    componentDidMount() {
      let ID = window.location.search.split("=")[1]
      this.setState({
        ID:ID
      })
      this.props.dispatch({
          type: 'addCourse/getCustomerPackageById',
          payload: {
             "dataId":this.props.users.dataDetailId
          }
      });
     this.props.dispatch({
          type: 'packageInfo/getDictionary',
          payload: {
            "abName":"TCLX" ,
            "softDelete": 0
          }
      });
    }
  componentWillUnmount(){
    //console.log("componentWillUnmount")
    this.props.dispatch({type:'addCourse/setAddCustomerTab',payload:false})
  }
    render(){
      let dataList = []
      let loadingName = true
      const columns = this.columns;
      if(this.props.getCustomerPackageById != null){
        if(this.props.getCustomerPackageById.length>=1){
          let dataKey = 0
          let dataKey2 = 1000
          this.props.getCustomerPackageById.map((item)=>{
            let status = "使用中"
            if(item.status == 1){
              status="已经使用"
            }
            let addCourseList=item.serviceInfoDOs
            let addName=item.packageInfoDO
            addCourseList.map((item)=>{
              item.key=item.id
            })
            loadingName = false
             dataKey++
             dataKey2++
             const { getDictionary } = this.props
             let typeName = addName.type
             TYPENAME = keyToText(getDictionary, "id", "name", "TCLX");
             dataList.push(<div className="addCourseList" key={dataKey}>
              <div className="viewServiceinfoBox">
              <div className="viewServiceinfoTitle">
                <p className="titleName">套餐信息:</p>
                <p className="namep">套餐名称: {addName.name}</p>
                <p className="pricep">套餐价格: ￥{addName.price}</p>
                <p className="typep">套餐类型: {TYPENAME[typeName]}</p>
              </div>
                <div className="viewServiceinfoTable" key={dataKey2}>
                  <p className="titleName">服务项目:</p> <span className="status">{status}</span>
                  <Table bordered
                    columns={ columns }
                    dataSource={ addCourseList }
                    pagination = { false }
                    loading = { loadingName }
                  />
                </div>
                </div>
            </div>)
          })
        }
      }
        return (
            <div className="addCourse">
              <div className="top-button">
                <PermissionButton testKey='CUSTOMER_PACKAGE_ADD' className="one-button" style={{ float: 'right', marginBottom: '10px'}} onClick={this.addCourse.bind(this)}>添加套餐</PermissionButton>
              </div>
              {
                dataList
              }
              <AddCourseModel
                visible={ this.state.AddCourseVisible}
                onCancel ={ this.handleDeleteCancel.bind(this)}
              />
               <UserServiceinfo
                 visible={ this.state.UserServiceinfoVisible }
                 onCancel ={ this.handleUserServiceinfoCancel.bind(this,this.props.code) }
                 record= { this.state.data }
                 handle = { this.state.handle}
                 ID = { this.state.ID }
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
  const {
    getCustomerPackageById,
    getDictionary,
    codeName
  } = state.addCourse;
  return {
    loading: state.loading.models.addCourse,
    getCustomerPackageById,
    getDictionary,
    codeName,
    users: state.addCustomer
    };
}
export default connect(mapStateToProps)(AddCourse)
