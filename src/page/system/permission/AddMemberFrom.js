"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tree, Button, Table, Modal, Form, Input } from 'antd'
import "./permission.scss"
const createForm = Form.create
const FormItem = Form.Item
const TreeNode = Tree.TreeNode;


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
      dataIndex: 'position',
      key:'position',
    }, {
      title: '隶属部门',
      dataIndex: 'dept',
      key:'dept',
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

  expandHandler() {

  }

  onSelect() {

  }



  render() {
    const { visible, record } = this.props
    const { getFieldDecorator } = this.props.form;
    let { currentOrganizationTree, club , memberTotal } = this.props;
    let  endemicTree = [];
    if (club != null && currentOrganizationTree != null) {
      club.nodes = currentOrganizationTree;
      endemicTree = [ club  ];
    }


    const values = [{
      name: "总部",
      key: "1",
      nodes:[
        { name: "财务部", key: "14", },
        { name: "运营部", key: "2", },
        { name: "品控部", key: "3", },
        { name: "总务部", key: "4", },
        { name: "信息部", key: "5", },
        { name: "营销部", key: "6", },
        { name: "营养部", key: "7", },
        { name: "医疗部", key: "8", },
        { name: "护理部", key: "9", },
        { name: "人力资源部", key: "10",},
        { name: "总办部", key: "11", },
        { name: "产后康复部", key: "12", },
        ]
      }];

    const list = [
      { name: "李欢", position: "产品经理", identifier: "a98542", key: "1", dept: "财务部"},
      { name: "李欢", position: "产品经理", identifier: "a98543", key: "2", dept: "财务部"},
      { name: "李欢", position: "产品经理", identifier: "a98544", key: "3", dept: "财务部"},
      { name: "李欢", position: "产品经理", identifier: "a98545", key: "4", dept: "财务部"},
      { name: "李欢", position: "产品经理", identifier: "a98546", key: "5", dept: "财务部"},
      { name: "李欢", position: "产品经理", identifier: "a98547", key: "6", dept: "财务部"},
      { name: "李欢", position: "产品经理", identifier: "a98548", key: "7", dept: "财务部"},
    ]

    const pagination = {
      total: memberTotal, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (page, pageSize) => {
      },
    }

    let loops = []
    const nodesIteration = (nodes, key = 0) => {
      return nodes.map((item, index) => {
        if (item.nodes && item.nodes.length) {
          return <TreeNode key={index + key} title={item.name} dataIndex={item.id}>{nodesIteration(item.nodes, (index+1) * 10)}</TreeNode>;
        }
        return <TreeNode key={item.id} title={item.name} dataIndex={item.id} />;
      })
    }
    const  nodes  = endemicTree;
    loops = nodesIteration(nodes);
    // loops.unshift(<TreeNode key={this.props.leftList.id} title={this.props.leftList.name} dataIndex={this.props.leftList.tissueProperty}/>)
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
                onExpand={this.expandHandler.bind(this)}
                onSelect={this.onSelect.bind(this)}
                defaultExpandedKeys = { ["0"] }
              >{
                loops
              }
              </Tree>
            </Col>
            <Col className="gutter-row" span={19}>
              <Table bordered dataSource={ list } columns={ this.columns} pagination = {pagination} />
            </Col>
          </Row>

        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {
    club,
    currentOrganizationTree
  } = state.permission;
  return {
    club,
    currentOrganizationTree
  };
}
export default connect(mapStateToProps)(ShowMemberListFrom)
