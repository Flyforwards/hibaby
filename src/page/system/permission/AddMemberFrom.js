"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tree, Button, Table, Modal, Form, Input } from 'antd'
import "./permission.scss"
const createForm = Form.create
const FormItem = Form.Item
const TreeNode = Tree.TreeNode;

class AddMemberFrom extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
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
    }];

  }

  state = {
    visible: false,
    selectedRowKeys: []
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

  expandHandler() {

  }

  onSelect(selectedKeys, e) {
    const  { selectedNodes } = e;
    const node = selectedNodes[0];
    this.nodeId = node.props.nodeId;
    this.tissueProperty = node.props.tissueProperty;
    this.props.dispatch({
      type: "permission/getUserPageListByUserRole",
      payload: { nodeid:node.props.nodeId, tissueProperty:node.props.tissueProperty, roleId:this.props.selectRole.id }
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  render() {
    const { visible, record } = this.props
    let { currentDeptTree ,undisUserList, undisUserTotal } = this.props;
    let  endemicTree = [];
    if (currentDeptTree != null) {
      endemicTree = [ currentDeptTree  ];
    }
    undisUserList.map((record)=>{
      record.key = record.id;
    })

    const pagination = {
      total: undisUserTotal, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: "permission/getUserPageListByUserRole",
          payload: { nodeid:this.nodeId, tissueProperty:this.tissueProperty, roleId:this.props.selectRole.id, page, size: pageSize }
          }
        );
      },
    }

    let loops = []
    const nodesIteration = (nodes, itemKey) => {
      return nodes.map((item, index) => {
        if (item.nodes && item.nodes.length) {
          return <TreeNode key={ index } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty} >{nodesIteration(item.nodes, (index+1) * 10)}</TreeNode>;
        }
        return <TreeNode key={ itemKey+index } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty}/>;
      })
    }
    loops = nodesIteration(endemicTree);
    // loops.unshift(<TreeNode key={this.props.leftList.id} title={this.props.leftList.name} dataIndex={this.props.leftList.tissueProperty}/>)
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Modal key= { visible }
             visible = { visible }
             okText =  "保存"
             cancelText = "关闭"
             onCancel = {this.handleCancel.bind(this)}
             afterClose = {this.handleAfterClose.bind(this)}
             onOk = {this.handleOk.bind(this)}
             closable = { false }
             width = { 800 }
      >
        <div className="addMember">
          <Row gutter={8}>
            <Col className="gutter-row" span={5}>
              <Tree
                className="draggable-tree"
                onExpand={ this.expandHandler.bind(this) }
                onSelect={ this.onSelect.bind(this) }
                defaultExpandedKeys = { ["0"] }
                defaultSelectedKeys = { ["10"] }
              >{
                loops
              }
              </Tree>
            </Col>
            <Col className="gutter-row" span={19}>
              <Table bordered rowSelection={rowSelection} dataSource={ undisUserList } columns={ this.columns} pagination = {pagination} />
            </Col>
          </Row>

        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {
    currentDeptTree,
    undisUserList,
    undisUserTotal,
  } = state.permission;
  return {
    currentDeptTree,
    undisUserList,
    undisUserTotal
  };
}
export default connect(mapStateToProps)(AddMemberFrom)
