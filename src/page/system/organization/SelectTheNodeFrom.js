"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Tree, Button, Table, Modal, Form, Input } from 'antd'
import {local, session} from '../../../common/util/storage.js'
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
      render: (positionId)=>{
        const Position=this.props.getPosition;
        //console.log("position>>>>>",Position)
        let position=[];
        Position.map((res,index)=>{
          position.push(res.id)
        })
        for(let i=0;i<position.length;i++){
          if(position[i]==positionId){
            return Position[i].name;
          }
        }
      },
    }, {
      title: '隶属部门',
      dataIndex: 'deptId',
      render: (deptId)=>{
        const DeptList=this.props.getDeptList;
        let deptlist=[];
        DeptList.map((res,index)=>{
          deptlist.push(res.id)
        })
        for(let i=0;i<deptlist.length;i++){
          if(deptlist[i]==deptId){
            return (DeptList[i].name)
          }
        }
      },
    },{
      title: '地方中心',
      dataIndex: 'endemicId',
      render: (endemicId)=>{
        const Endemic=this.props.getEndemic;
        let endemicCenter=[];
        Endemic.map((res,index)=>{
          endemicCenter.push(res.id)
        })
        for(let i=0;i<endemicCenter.length;i++){
          if(endemicCenter[i]==endemicId){
            return (Endemic[i].name)
          }
        }
      }
    },{
      title: '系统角色',
      dataIndex: 'roleId',
      render: (roleId)=>{
        let roleIdData=[];
        let selectName=[];
        if(roleId){
          roleIdData=roleId.split(",")
          const selectData=local.get("rolSelectData");
          let roleData=[];
          selectData.map((res,index)=>{
            roleData.push(res.id)
          })
          for(let n=0;n<roleIdData.length;n++){
            for(let i=0;i<roleData.length;i++){
              if(roleData[i]==Number(roleIdData[n])){
                selectName.push(selectData[i].name+" ; ")
              }
            }
          }
        }
        return selectName
      },
    },{
      title: '账户状态',
      dataIndex: 'status',
      render: (status)=>{
        let statusName="";
        statusName=status?"禁用":"正常";
        return (statusName)
      },
    }];
    this.state = {
      selectedRows:[]
    }
  }

  handleCancel() {
    this.props.onCancel()
  }
  handleOk() {
    this.props.headelReturnTabal(this.state.selectedRows)
   this.props.onCancel()
  }

  delete(record) {
  }


  handleAfterClose() {

  }

  componentDidMount() {
    let endemic  = session.get("endemic")
    this.props.dispatch({
      type: 'organization/organizationList',
      payload: {
        "name":null,
        "roleId":null,
        "nodeid": endemic.id,
        "status":null,
        "page": 1,
        "size": 10,
        "tissueProperty":endemic.tissueProperty
      }
    });
    this.props.dispatch({
      type: 'organization/getPosition',
      payload: { }
    });
    this.props.dispatch({
      type: 'organization/getEndemic',
      payload: { }
    });
    this.props.dispatch({
      type: 'organization/getDeptList',
      payload: { }
    });

  }
  callback() {

  }

  expandHandler() {

  }
  onSelect(selectedKeys, e) {
    const  { selectedNodes } = e;
    if(selectedNodes[0]){
      const node = selectedNodes[0];
      console.log("节点>>>>",node.props.nodeId)
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
  }
  render() {
    const { visible, treeData, list,total } = this.props;
    let endemic = session.get("endemic")
    let loops = []
    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
      //console.log('selectedRows: ', selectedRows);
        // this.props.headelReturnTabal(selectedRows)
        this.setState({
          selectedRows:selectedRows
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    const nodesIteration = (nodes, itemKey) => {
      return nodes.map((item, index) => {
        //console.log("item>>>>>",item.id)
        if (item.nodes && item.nodes.length) {
          return <TreeNode key={ item.id } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty} >{nodesIteration(item.nodes, (index+1) * 10)}</TreeNode>;
        }
        return <TreeNode key={ item.id } title={item.name+"("+String(item.count)+")"} nodeId={item.id} tissueProperty={item.tissueProperty}/>;
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
      onChange: (current) => {
         let endemic  = session.get("endemic");
         let nodeId = this.nodeId
         let tissueProperty = this.tissueProperty
        this.props.dispatch({
          type: "organization/organizationList",
          payload: {
            nodeid:nodeId?nodeId:endemic.id,
            tissueProperty:tissueProperty?tissueProperty:endemic.tissueProperty,
            page:current,
            size: 10,
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
                onSelect={ this.onSelect.bind(this,) }
                defaultExpandedKeys = { [String(endemic.id)] }
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
    selectData,
    getPosition,
    getEndemic,
    getDeptList,
    page,
    total
  } = state.organization;
  return {
    list,
    selectData,
    getEndemic,
    getPosition,
    getDeptList,
    page,
    total
  };
}
export default connect(mapStateToProps)(SelectTheNodeFrom)
