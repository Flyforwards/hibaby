"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Table, Modal, Form, Input } from 'antd'
import "./permission.scss"
const createForm = Form.create
const FormItem = Form.Item
import AddMemberFrom from './AddMemberFrom'
import  { session } from 'common/util/storage.js';


@createForm()
class ShowMemberListFrom extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '编号',
      dataIndex: 'identifier',
      key:'identifier',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key:'name',
    }, {
      title: '职位',
      dataIndex: 'positionId',
      key:'positionId',
      render: (record) => {
        return record
      }
    }, {
      title: '隶属部门',
      dataIndex: 'deptId',
      key:'deptId',
      render: (record) =>  {
        const deptId = record;
        let dept = this.props.departmentList.map((record)=> {
          if (deptId == record.id) {
            console.log(record);
            return record.name;
          }
        });
        return dept || "无";
      }
    }, {
      title: '地方中心',
      dataIndex: 'endemicId',
      key:'endemicId',
      render: () => {
        return this.props.club.name;
      }
    }, {
      title: '系统角色',
      dataIndex: 'roleId',
      key:'roleId',
      render: () => {
        return this.props.selectRole.roleName;
      }
    },{
      title: '账户状态',
      dataIndex: 'status',
      key:'status',
      render: ( record ) => {
        return record == 0 ? "正常":"禁用";
      }
    },{
      title: '操作',
      dataIndex: 'operating',
      key: 'operating',
      width: '100px',
      render: (text, record, index) => {
        return (
          <div key = { index }>
            <a href="#" className="firstC" onClick={ this.delete.bind(this,record )}>删除</a>
          </div>
        );
      },
    }];

  }
  state = {
    visible: false,
    showAddMemberModalVisible: false
  }
  handleCancel() {
    this.props.onCancel()
  }
  handleOk() {
    this.props.onCancel()
  }

  delete(record) {

  }

  handleAfterClose() {

  }
  componentDidMount() {


  }
  callback() {

  }

  // 为角色分配用户
  addClick() {
    this.props.dispatch({
      type: "permission/getDeptListByEndemicId",
    })
    this.setState({
      showAddMemberModalVisible: true,
    })
  }

  cancelModal() {
    this.setState({
      showAddMemberModalVisible: false,
    })
  }



  render() {
    const { visible, record } = this.props
    const { getFieldDecorator } = this.props.form;
    let { userList, memberTotal } = this.props;
    if (userList != null) {
      userList.map((record, index)=> {
        record.key = index;
      });
    } else {
      userList = []
    }

    const pagination = {
      total: memberTotal, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (page, pageSize) => {
        this.props.dispatch({
            type: "permission/getUserPageListByRoleId",
            payload: { roleId: this.props.selectRole.id, page, size: pageSize, first: false},
          }
        );
      },
    }
    return (
      <Modal key= { visible }
        visible = { visible }
        title = "成员列表"
        okText =  "保存"
        cancelText = "返回"
        onCancel = {this.handleCancel.bind(this)}
        afterClose = {this.handleAfterClose.bind(this)}
        onOk = {this.handleOk.bind(this)}
        closable = { false }
        width = { 1000 }
      >
        <div className="permission-cent">
          <div className="divs">
            <Button className="add" onClick={ this.addClick.bind(this) }>添加</Button>
          </div>
          <div className="CreateModaList">
            <Table bordered dataSource={ userList } columns={ this.columns } pagination = { pagination }/>
          </div>
        </div>
        <AddMemberFrom
          visible ={ this.state.showAddMemberModalVisible }
          onCancel ={ this.cancelModal.bind(this) }
          selectRole = { this.props.selectRole }
        />
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {
    userList,
    departmentList,
    club,
    memberTotal
  } = state.permission;
  return {
    loading: state.loading.models.permission,
    userList,
    departmentList,
    club,
    memberTotal
  };
}
export default connect(mapStateToProps)(ShowMemberListFrom)
