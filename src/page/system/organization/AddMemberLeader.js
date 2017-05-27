"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tree, Button, Table, Modal, Form, Input } from 'antd'
import "./AddMemberLeader.scss"
const TreeNode = Tree.TreeNode;

class AddMemberLeader extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '编号',
      dataIndex: 'Numbering',
      key: 'Numbering',
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
      dataIndex: 'localCenter',
      key: 'localCenter',
    },{
      title: '系统角色',
      dataIndex: 'roles',
      key: 'roles',
    },{
      title: '账户状态',
      dataIndex: 'status',
      key: 'status',
    }];
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
  cellOnChange = ( selectedRowKeys ) => {
      this.props.dispatch({
        type: "permission/selectedRowsChange",
        payload: { selectedRowKeys },
      })

  }

  onClose() {
    this.props.onCancel();
  }
  expandHandler() {

  }
  render() {
    const { visible, treeData, list, total } = this.props
    let loops = []
    const nodesIteration = (nodes, itemKey) => {
      return nodes.map((item, index) => {
        if (item.nodes && item.nodes.length) {
          return <TreeNode key={ index } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty} >{nodesIteration(item.nodes, (index+1) * 10)}</TreeNode>;
        }
        return <TreeNode key={ itemKey+index } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty}/>;
      })
    }
    if(list != null){
      loops = nodesIteration(list);
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
    const { selectedRowKeys } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.cellOnChange.bind(this)
    };
    return (
      <div className="AddMemberLeader" style={{display:this.props.display}}>
      <div>
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
            <Col className="gutter-row" span={ 19 }>
              <div>
                <div className="divs">
                  <Input className="search-input-div" />
                  <Button className="search-button-div">查询</Button>
                </div>
                <Table bordered   columns={ this.columns}  />
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
    list,
    total
  } = state.organization;
  return {
    list,
    total
  };
}
export default connect(mapStateToProps)(AddMemberLeader)
