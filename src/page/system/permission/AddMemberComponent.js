"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tree, Button, Table, Modal, Form, Input } from 'antd'
import "./permission.scss"
const TreeNode = Tree.TreeNode;

class AddMemberComponent extends Component {
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
    selectedRowKeys: [],
    selectedKeys: [],
  }

  search() {
    const currentTree = this.props.currentDeptTree;
    const char = this.refs.input.refs.input.value;
    if ( currentTree != null && char != null && char.length > 0) {
      this.nodeId = currentTree.id;
      this.tissueProperty =  currentTree.tissueProperty
      this.setState({
        selectedKeys: [],
      })
      this.props.dispatch({
          type: "permission/getUserPageListByUserRole",
          payload: { nodeid:currentTree.id, tissueProperty: currentTree.tissueProperty, roleId:this.props.selectRole.id, name: char }
        }
      );
    }

  }


  expandHandler() {

  }

  onSelect(selectedKeys, e) {
    const  { selectedNodes } = e;
    if (selectedNodes !== null && selectedNodes.length !== 0) {
      const node = selectedNodes[0];
      this.nodeId = node.props.nodeId;
      this.tissueProperty = node.props.tissueProperty;
      this.props.dispatch({
        type: "permission/getUserPageListByUserRole",
        payload: { nodeid:this.nodeId, tissueProperty:this.tissueProperty, roleId:this.props.selectRole.id }
      })
    }

  }

  cellOnChange = ( selectedRowKeys ) => {
      this.props.dispatch({
        type: "permission/selectedRowsChange",
        payload: { selectedRowKeys },
      })

  }

  onClose() {
    this.props.onCancel();
  }


  render() {
    let { currentDeptTree ,undisUserList, undisUserTotal } = this.props;
    let  endemicTree = [];
    if (currentDeptTree != null) {
      endemicTree = [ currentDeptTree  ];
    }
    undisUserList.map((record)=>{
      record.key = record.id;
    })
    if (this.nodeId === null && this.tissueProperty === null) {
      this.nodeId = this.props.nodeid;
      this.tissueProperty = this.props.tissueProperty;
    }

    const pagination = {
      total: undisUserTotal, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (page, pageSize) => {
        this.props.dispatch({
            type: "permission/getUserPageListByUserRole",
            payload: { nodeid: this.nodeId, tissueProperty: this.tissueProperty, roleId:this.props.selectRole.id, page, size: pageSize }
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
    const { selectedRowKeys } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.cellOnChange.bind(this)
    };
    //  <Button className="search-button-div">重置</Button>
    return (
      <div>
        <div>
          <Row gutter={8}>
            <Col className="gutter-row" span={5}>
              <Tree
                className="draggable-tree"
                onExpand={ this.expandHandler.bind(this) }
                onSelect={ this.onSelect.bind(this) }
                defaultExpandedKeys = { ["0"] }
                defaultSelectedKeys = { ["10"] }
                selectedKeys = { this.state.selectedKeys }
              >{
                loops
              }
              </Tree>
            </Col>
            <Col className="gutter-row" span={ 19 }>
              <div>
                <div className="divs">
                  <Input className="search-input-div" ref="input" />
                  <Button className="search-button-div" onClick={ this.search.bind(this) }>查询</Button>
                </div>
                <Table bordered rowSelection={ rowSelection } dataSource={ undisUserList } columns={ this.columns} pagination = {pagination} />
              </div>
            </Col>
          </Row>
        </div>
        <div className="close-button-div" >
          <Button  onClick={ this.onClose.bind(this) }>关闭</Button>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  const {
    currentDeptTree,
    undisUserList,
    undisUserTotal,
    selectedRowKeys,
    nodeid,
    tissueProperty
  } = state.permission;
  return {
    currentDeptTree,
    undisUserList,
    undisUserTotal,
    selectedRowKeys,
    nodeid,
    tissueProperty
  };
}
export default connect(mapStateToProps)(AddMemberComponent)
