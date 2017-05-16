"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tree, Button, Table, Modal, Form, Input } from 'antd'
import "./SelectTheNodeFrom.scss"
const createForm = Form.create
const FormItem = Form.Item
const TreeNode = Tree.TreeNode;

class SelectTheNodeFrom extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '编号',
      dataIndex: 'identifier',
      key: 'identifier',
    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '职位',
      dataIndex: 'positionId',
      key: 'positionId',
    }, {
      title: '隶属部门',
      dataIndex: 'deptId',
      key: 'deptId',
    },{
      title: '地方中心',
      dataIndex: 'endemicId',
      key: 'endemicId',
    },{
      title: '系统角色',
      dataIndex: 'roleId',
      key: 'roleId',
    },{
      title: '账户状态',
      dataIndex: 'status',
      key: 'status',
    }];
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
      this.props.dispa

  }
  callback() {

  }

  expandHandler() {

  }
  onSelect(selectedKeys, e) {
    const  { selectedNodes } = e;
    const node = selectedNodes[0];
    this.nodeId = node.props.nodeId;
    this.tissueProperty = node.props.tissueProperty;
     this.props.dispatch({
        type: 'organization/organizationList',
        payload: {
            nodeid: this.nodeId,
            tissueProperty: this.tissueProperty
        },
      });
  }

  render() {
    const { visible, treeData, list, total } = this.props
    let loops = []
    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRows: ', selectedRows);
        this.props.headelReturnTabal(selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    const nodesIteration = (nodes, itemKey) => {
      return nodes.map((item, index) => {
        if (item.nodes && item.nodes.length) {
          return <TreeNode key={ index } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty} >{nodesIteration(item.nodes, (index+1) * 10)}</TreeNode>;
        }
        return <TreeNode key={ itemKey+index } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty}/>;
      })
    }
    if(list != null){
      list.map((record)=>{
      record.key = record.id;
    })
    }
    const pagination = {
      total: total, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (page, pageSize) => {
         let nodeId = this.nodeId
         let tissueProperty = this.tissueProperty
        this.props.dispatch({
          type: "organization/organizationList",
          payload: { 
            nodeid:nodeId,
            tissueProperty:tissueProperty,
            page:page,
            size: 5,
          }
        });
      },
    }
    if(treeData != null){
      loops = nodesIteration(treeData);
    }
    return (
      <Modal key= { visible }
             visible = { visible }
             title = "选择直系领导"
             okText =  "确定"
             cancelText = "关闭"
             onCancel = {this.handleCancel.bind(this)}
             afterClose = {this.handleAfterClose.bind(this)}
             onOk = {this.handleOk.bind(this)}
             closable = { false }
             width = { 800 }
      >
      <div className="SelectTheNodeFromConennt">
        <div className="SelectTheNodeFrom">
         <Row gutter={8}>
            <Col className="gutter-row" span={5}>
              <Tree
                className="draggable-tree"
                onExpand={ this.expandHandler.bind(this) }
                onSelect={ this.onSelect.bind(this) }
                defaultExpandedKeys = { ["0"] }
                defaultSelectedKeys = { ["10"] }
              >
              {
                loops
              }
              </Tree>
            </Col>
            <Col className="gutter-row" span={19}>
               <Table bordered   rowSelection={rowSelection} columns={ this.columns} dataSource={ list }  pagination = {pagination} key="w" />
            </Col>
          </Row>
        </div>
      </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {
    list,
    total
  } = state.organization;
  return {
    list,
    total
  };
}
export default connect(mapStateToProps)(SelectTheNodeFrom)