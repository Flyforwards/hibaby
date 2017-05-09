"use strict"
import React, { Component } from 'react';
import { Icon, Table, Input,Modal, Button, Form, Row, Col, Popconfirm, message } from 'antd';
import { connect } from 'dva';
const createForm = Form.create;
const FormItem = Form.Item;
import  './permission.scss';
import AddRoleFrom from './AddRoleFrom';
import SettingPermissionFrom from './SettingpermissionFrom'
import ShowMemberListFrom from './ShowMemberListFrom'
import Page from 'framework/page'

class permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.columns = [{
          title: '编号',
          dataIndex: 'id',
          key:'ids',
          width: '100px',
        }, {
          title: '角色名称',
          dataIndex: 'roleName',
          key:'roleName',

        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '500px',
          render: (text, record, index) => {
            return (
                <div key = { index }>
                  <a href="#" className="firstA" onClick={ this.editPermissions.bind(this,record) }>编辑</a>
                  <a href="#" className="firstA" onClick={ this.setPermissions.bind(this,record) }>设置权限</a>
                  <a href="#" className="firstA" onClick={ this.showMemberList.bind(this,record) }>成员列表</a>
                  <a href="#" className="firstB" onClick={ this.delete.bind(this,record )}>删除</a>
                </div>
            );
          },
        }];
    }
    componentWillMount() {
      this.props.dispatch({
        type : "permission/getRolesByPage",
        payload : { page : 1, size : 10}
      });
    }
    managementInquire() {
      console.log("查询")
    }
  // 编辑
    editPermissions(record){
      console.log("编辑", record)
      this.setState({
        modifyModalVisible: true,
        record: record,
        add: false,
        isDel: false,
      })
    }
    // 设置权限
    setPermissions(record){
      console.log("设置权限", record)
      this.props.dispatch({
        type: "permission/treeByRoleID",
        payload: { record }
      })
      this.setState({
        settingModalVisible: true,
        record: record,
      })

    }
    // 展示当前角色的成员列表
    showMemberList(record){
      console.log("成员列表", record)
      this.props.dispatch({
        type: "permission/getUserPageListByRoleId",
        payload: { dataId: record.id, page: 1, size: 10 }
      })
      this.setState({
        showMemberModalVisible: true,
        record: record,
      })
    }

    delete(record){
      console.log("删除", record)
      this.setState({
        modifyModalVisible: true,
        record: record,
        add: false,
        isDel: true,
      })
    }

    // 添加
    addList(){
      this.setState({
        modifyModalVisible: true,
        record: null,
        add: true,
        isDel: false,
      })
    }
    handleCreateModalCancel() {
        this.setState({
          modifyModalVisible: false,
          settingModalVisible: false,
          showMemberModalVisible: false,
        })
    }
    render() {
        let { total, data } = this.props.permission;
        if (data != null) {
          data.map((item,index)=>{
            item.key = item.id;
            return item;
          })
        }
        const pagination = {
          total: total, //数据总条数
          showQuickJumper: true,
          pageSize: 10,
          onChange: (page, pageSize) => {
            this.props.dispatch({
              type: "permission/getRolesByPage",
              payload: { page, size : pageSize },
            }
          );
        },

        };
        return (
           <div className="permission-cent">
            <div className="name">部门<Input />
              <Button className="find" onClick={this.managementInquire}>查询</Button>
              <Button className="add" onClick={ this.addList.bind(this) }>添加</Button>
            </div>
            <div className="CreateModaList">
                <Table bordered dataSource={ data } columns={ this.columns } pagination = { pagination }/>
            </div>
             <AddRoleFrom
               visible ={ this.state.modifyModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               record = { this.state.record }
               add = { this.state.add }
               isDel = { this.state.isDel }
             />
             <SettingPermissionFrom
               visible ={ this.state.settingModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               selectRole = { this.state.record }
             />
             <ShowMemberListFrom
               visible ={ this.state.showMemberModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               selectRole = { this.state.record }
             />
           </div>
        )
    }
}



export default connect(( permission ) => ( permission ))(permission);
