"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Table, Modal, Form, Input } from 'antd'
import "./permission.scss"
const createForm = Form.create
const FormItem = Form.Item


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
    }, {
      title: '隶属部门',
      dataIndex: 'deptId',
      key:'deptId',
    }, {
      title: '地方中心',
      dataIndex: 'endemicId',
      key:'endemicId',
    }, {
      title: '系统角色',
      dataIndex: 'roleId',
      key:'roleId',
    },{
      title: '账户状态',
      dataIndex: 'status',
      key:'status',
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
  state = { visible: false }
  handleCancel() {
    this.props.onCancel()
  }
  handleOk() {
    this.props.onCancel()
  }

  delete(record) {}


  handleAfterClose() {

  }
  componentDidMount() {


  }
  callback() {

  }



  render() {
    const { visible, record } = this.props
    const { getFieldDecorator } = this.props.form;
    let { userList,total } = this.props;
    if (userList != null) {
      userList.map((record, index)=> {
        record.key = index;
      });
    } else {
      userList = []
    }

    const pagination = {
      total: total, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (page, pageSize) => {
        this.props.dispatch({
            type: "permission/getUserPageListByRoleId",
            payload: { dataId: this.props.selectRole.id, page, size: pageSize},
          }
        );
      },
    }
    return (
      <Modal
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
          <div >
            <span className="span_border"></span>
            <Button className="find" onClick={this.managementInquire}>查询</Button>
          </div>
          <div className="CreateModaList">
            <Table bordered dataSource={ userList } columns={ this.columns } pagination = { pagination }/>
          </div>
        </div>

      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {
    userList,
    total
  } = state.permission;
  return {
    loading: state.loading.models.system,
    userList,
    total
  };
}
export default connect(mapStateToProps)(ShowMemberListFrom)
