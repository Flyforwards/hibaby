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
    this.state = {}
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key:'ids',
      width: '100px',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key:'name',
    }, {
      title: '职位',
      dataIndex: 'position',
      key:'position',
    }, {
      title: '隶属部门',
      dataIndex: 'department',
      key:'department',
    }, {
      title: '地方中心',
      dataIndex: 'endemic',
      key:'endemic',
    }, {
      title: '系统角色',
      dataIndex: 'roleName',
      key:'roleName',
    },{
      title: '账户状态',
      dataIndex: 'accountState',
      key:'accountState',
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
    let { total, data } = this.props;

    if (data != null) {
      data.map((item,index)=>{
        item.key = item.id;
        return item;
      })
    }
    const pagination = {
      total: total, //数据总条数
      showQuickJumper: true,
      onChange: (current) => {
        //   this.props.dispatch(routerRedux.push({
        //     pathname: '/system',
        //     query: {
        //       "page": current,
        //       "results": 3,
        //       "type": 1
        //     },
        //   }));
      },
    };
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
            <Table bordered dataSource={ data } columns={ this.columns } pagination = { pagination }/>
            <p className="allList">共计0条,范围1-10</p>
          </div>
        </div>

      </Modal>
    )
  }
}
function ShowMemberListFrom({
  dispatch,
  data,
  code
}) {
  return (
    <div>
      <ShowMemberListFrom dispatch = { dispatch } />
    </div>
  )
}
function mapStateToProps(state) {
  const {
    data,
    code,
    total,
  } = state.permission;
  return {
    loading: state.loading.models.system,
    data,
    total,
  };
}
export default connect(mapStateToProps)(ShowMemberListFrom)
