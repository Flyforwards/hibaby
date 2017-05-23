"use strict"
import React, { Component } from 'react';
import { Icon, Table, Input,Modal, Button, Form, Row, Col, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import  './permission.scss';
import AddRoleFrom from './AddRoleFrom';
import SettingPermissionFrom from './SettingpermissionFrom'
import ShowMemberListFrom from './ShowMemberListFrom'
import AlertModalFrom from 'common/AlertModalFrom'
import manager from 'common/util'
import { routerRedux } from 'dva/router';
import Page from 'framework/page'

class permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.record = null;
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
            const roleConfig = manager.array_contain(this.props.permissionAlias,'roleConfig');
            const users = manager.array_contain(this.props.permissionAlias,'roleUsers');
            const roleU = manager.array_contain(this.props.permissionAlias,'roleU')
            const roleD =  manager.array_contain(this.props.permissionAlias,'roleD')
            return (
              <div key = { index }>
                <a disabled={ !roleU } className="firstA" onClick={ this.editPermissions.bind(this,record) }>编辑</a>
                <a disabled={ !roleConfig } className="firstA" onClick={ this.setPermissions.bind(this,record) }>设置权限</a>
                <a disabled={ !users } className="firstA" onClick={ this.showMemberList.bind(this,record) }>成员列表</a>
                <a disabled={ !roleD } className="firstB" onClick={ this.delete.bind(this,record )}>删除</a>
              </div>
            );
          },
        }];
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
          }
        })
      this.handleCreateModalCancel();
    }

    render() {

        let { data, pagination, loading, dispatch, permissionAlias } = this.props;
        const tableProps = {
          loading: loading.effects['permission/getRolesByPage'],
          dataSource : data ,
          pagination,
          onChange (page) {
            const { pathname } = location
            dispatch(routerRedux.push({
              pathname,
              query: {
                page: page.current,
                size: page.pageSize,
              },
            }))
          },
        }

        return (
           <div className="permission-cent">
             <div className="divs">
               <Button disabled={ manager.array_contain(permissionAlias,"roleC") } className="add" type="primary" onClick={ this.addList.bind(this) }>添加</Button>
             </div>
             <div>
                <Table {...tableProps} columns={ this.columns } bordered rowKey={record => record.id}/>
             </div>
             <AddRoleFrom
               visible ={ this.state.modifyModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               record = { this.record }
               add = { this.state.add }
             />
             <AlertModalFrom

               visible ={ this.state.alertModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               onOk = { this.handleAlertModalOk.bind(this, this.record) }
               message = { "是否确定删除此角色?" }
             />
             <SettingPermissionFrom
               visible = { this.state.settingModalVisible }
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
function mapStateToProps(state) {
  const {
    data,
    pagination
  } = state.permission;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    data,
    pagination,
    permissionAlias
  };
}


export default connect(mapStateToProps)(permission);
