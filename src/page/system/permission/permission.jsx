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
import AlertModalFrom from 'common/AlertModalFrom'
import Page from 'framework/page'

class permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.record = null;
        this.page = 1;
        this.pageSize = 10;
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
      this.record = record;
      this.setState({
        modifyModalVisible: true,
        add: false,
      })
    }
    // 设置权限
    setPermissions(record){
      this.props.dispatch({
        type: "permission/treeByRoleID",
        payload: { record }
      })
      this.record = record;
      this.setState({
        settingModalVisible: true,
      })

    }
    // 展示当前角色的成员列表
    showMemberList(record){
      this.record = record;
      this.props.dispatch({
        type: "permission/getUserPageListByRoleId",
        payload: { roleId: record.id, page: 1, size: 10, first: true}
      })
      this.setState({
        showMemberModalVisible: true,
      })
    }
    // 删除弹框
    delete(record){
      this.record = record;
      this.setState({
        alertModalVisible: true,
        add: false,
      })
    }

    // 添加
    addList(){
      this.setState({
        modifyModalVisible: true,
        add: true,
      })
    }
    handleCreateModalCancel() {
        this.setState({
          modifyModalVisible: false,
          settingModalVisible: false,
          showMemberModalVisible: false,
          alertModalVisible: false,
        })
    }
    // 确定删除
    handleAlertModalOk(record) {
        this.props.dispatch({
          type: 'permission/submitDelRole',
          payload: {
            dataId: record.id,
            page: this.page,
            pageSize: this.pageSize,
          }
        })
      this.handleCreateModalCancel();
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
            this.page = page;
            this.pageSize = pageSize;
            this.props.dispatch({
              type: "permission/getRolesByPage",
              payload: { page, size : pageSize },
            }
          );
        },

        };
        return (
           <div className="permission-cent">
             <div className="divs">
               <Button className="add" onClick={ this.addList.bind(this) }>添加</Button>
             </div>
             <div className="CreateModaList">
                <Table bordered dataSource={ data } columns={ this.columns } pagination = { pagination }/>
             </div>
             <AddRoleFrom
               visible ={ this.state.modifyModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               record = { this.record }
               add = { this.state.add }
               page = { this.page }
               pageSize = { this.pageSize }
             />
             <AlertModalFrom
               visible ={ this.state.alertModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               onOk = { this.handleAlertModalOk.bind(this, this.record) }
               message = { "是否确定删除此角色?" }
             />
             <SettingPermissionFrom
               visible ={ this.state.settingModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               selectRole = { this.record }
             />
             <ShowMemberListFrom
               visible ={ this.state.showMemberModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               selectRole = { this.record }
             />

           </div>
        )
    }
}



export default connect(( permission ) => ( permission ))(permission);
