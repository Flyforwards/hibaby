import React from 'react'
import {connect} from 'dva'
import "./OrganizationLeft.scss"
import {Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree, Menu} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import AddChildNode from './AddChildNode.jsx'
import SeeDtail from './SeeDtail.jsx'
import DeleteNode from './DeleteNode.jsx'
import {local, session} from 'common/util/storage.js';


const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class OrganizationLefted extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upblock: 'none',
      ulTop: 0,
      addChildNodeVisible: false,
      SeeDtailNodeVisible: false,
      ID: null,
      node: null,
      DeleteNodeVisible: false
    }
    this.addDisplay = "block"
    this.nodes = null
  }

  expandHandler = () => {
    setTimeout(() => {
      $(".Organization-left li").find(".ant-tree-title").each((index, e) => {
        if ($(e).siblings(".plus").length == 0) {
          $(e).after("<span class='plus'>+</span>");
        }
      })
    }, 50)
  }

  onSelect(value, node) {
    this.addDisplay = "block"
    this.deleteDisplay = "block"
    if (value[0] != null) {
      this.nodes = node.selectedNodes[0].props.dataIndex
      let TissueProperty = node.selectedNodes[0].props.dataIndex
      if (TissueProperty == 0) {
        this.deleteDisplay = "none"
      } else {
        this.deleteDisplay = "block"
      }
      if (TissueProperty == 3) {
        this.addDisplay = "none"
      } else {
        this.addDisplay = "block"
      }
      if (node.selectedNodes[0].key != 1) {
        this.setState({
          ID: node.selectedNodes[0].key,
          node: node.selectedNodes[0],
          parentId: node.selectedNodes[0].props.parentId,
          dataIndex: node.selectedNodes[0].props.dataIndex
        })
        this.props.onBtain(Number(node.selectedNodes[0].key), node.selectedNodes[0].props.dataIndex)
        this.props.dispatch({
          type: 'organization/organizationList',
          payload: {
            nodeid: Number(node.selectedNodes[0].key),
            page: 1,
            size: 10,
            tissueProperty: node.selectedNodes[0].props.dataIndex
          }
        });
      } else {
        this.setState({
          ID: node.selectedNodes[0].key,
          node: node.selectedNodes[0],
          parentId: node.selectedNodes[0].props.parentId,
          dataIndex: node.selectedNodes[0].props.dataIndex
        })
      }
      this.props.dispatch({
        type: 'organization/getTissueProperty',
        payload: {
          "dataId": node.selectedNodes[0].props.dataIndex
        }
      })
    } else {
      if (this.nodes == 0) {
        this.deleteDisplay = "none"
      } else {
        this.deleteDisplay = "block"
      }
      if (this.nodes == 3) {
        this.addDisplay = "none"
      } else {
        this.addDisplay = "block"
      }
    }
  }

  seeDetails() {
    this.props.dispatch({
      type: 'organization/getDepartment',
      payload: {
        "dataId": this.state.ID,
      }
    })
    this.setState({
      SeeDtailNodeVisible: true
    })
  }

  DeleteNode() {
    this.setState({
      DeleteNodeVisible: true
    })
  }

  handleCreateModalCancel() {
    this.setState({
      addChildNodeVisible: false
    })
  }

  handleDeleteNodeCancel() {
    this.setState({
      DeleteNodeVisible: false,
      upblock: "none"
    })
  }

  handleSeeModalCancel() {
    this.setState({
      SeeDtailNodeVisible: false,
      upblock: "none"
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'organization/getAllTissueProperty'
    })
    const userInfo = session.get("userInfo")
    $(".Organization-left").on('click', '.plus', function (e) {
      //  console.log("dd",e.pageY-e.offsetY-11)
      e.stopPropagation();
      if (this.state.upblock == 'none') {
        this.setState({
          ulTop: e.pageY - e.offsetY - 31,
          upblock: 'block'
        })
        return
      }
      if (this.state.upblock == 'block') {
        this.setState({
          ulTop: e.pageY - e.offsetY,
          upblock: 'none'
        })
        return
      }
    }.bind(this));

    $(".Organization-left").click(function (e) {
      if (this.state.upblock == 'block') {
        this.setState({
          upblock: 'none'
        })
        return
      }
    }.bind(this))
    $(".Organization-right").click(function (e) {
      if (this.state.upblock == 'block') {
        this.setState({
          upblock: 'none'
        })
        return
      }
    }.bind(this))
  }

  componentDidUpdate() {
    const userInfo = session.get("userInfo")
    $(".Organization-left li").find(".ant-tree-title").each((index, e) => {
      if ($(e).siblings(".plus").length == 0) {
        $(e).after("<span class='plus'>+</span>");
      }
    })
    // $(".Organization-left li").find(".ant-tree-title").after("<span class='plus'>+</span>");
    if (userInfo.categoryId != 0) {
      $("li").find(".plus").eq(0).css('display', 'none');
    }
  }

  //添加子节点
  AddChildNode() {
    this.setState({
      addChildNodeVisible: true,
      upblock: "none"
    })
  }

  render() {
    let loops = []
    let tissueProperty = null
    const nodesIteration = (nodes) => {
      return nodes.map((item) => {
        if (item.nodes && item.nodes.length) {
          return <TreeNode key={item.id} title={item.name + "(" + String(item.count) + ")"}
                           dataIndex={item.tissueProperty}
                           parentId={item.parentId}>{nodesIteration(item.nodes)}</TreeNode>;
        }
        return <TreeNode key={item.id} title={item.name + "(" + String(item.count) + ")"}
                         dataIndex={item.tissueProperty} parentId={item.parentId}/>;
      })
    }
    if (this.props.leftList != null) {
      let nodes = this.props.leftList.nodes;
      loops = nodesIteration(nodes);
      loops = [<TreeNode key={this.props.leftList.id} title={this.props.leftList.name}
                         dataIndex={this.props.leftList.tissueProperty}
                         parentId={this.props.leftList.parentId}>{loops}</TreeNode>]
    }
    return (
      <div className="Organization-left">
        <Tree
          className="draggable-tree"
          onSelect={ this.onSelect.bind(this) }
          onExpand={this.expandHandler.bind(this)}
          autoExpandParent={ true }
          defaultExpandedKeys={ ["0"] }
        >
          { loops }
        </Tree>
        <ul className="nameList" style={{ top: this.state.ulTop, display: this.state.upblock }}>
          <li className="li" onClick={this.AddChildNode.bind(this)} style={{ display: this.addDisplay }}>添加子节点</li>
          <li className="li" onClick={this.seeDetails.bind(this)}>查看详情</li>
          <li className="li" onClick={this.DeleteNode.bind(this)} style={{ display: this.deleteDisplay }}>删除</li>
          <li className="fourLi">ID {this.state.ID}</li>
        </ul>
        <AddChildNode
          visible={ this.state.addChildNodeVisible }
          handleOk={this.state.handleOk}
          onCancel={ this.handleCreateModalCancel.bind(this) }
          ID={this.state.ID}
          parentId={this.state.parentId}
          TissueProperty={this.props.TissueProperty}
          dataIndex={this.state.dataIndex}
        />
        <SeeDtail
          visible={ this.state.SeeDtailNodeVisible }
          handleOk={this.state.handleOk}
          onCancel={ this.handleSeeModalCancel.bind(this) }
          ID={this.state.ID}
          Nodesdata={this.props.getDepartmentNode}
          parentId={this.state.parentId}
          dataIndex={this.state.dataIndex}
          TissueProperty={this.props.TissueProperty}
          AllTissueProperty={ this.props.AllTissueProperty }
        />
        <DeleteNode
          visible={ this.state.DeleteNodeVisible }
          handleOk={this.state.handleOk}
          onCancel={ this.handleDeleteNodeCancel.bind(this) }
          ID={this.state.ID}
          parentId={this.state.parentId}
          TissueProperty={this.props.TissueProperty}
          dataIndex={this.state.dataIndex}
        />
      </div>
    )
  }
}

function OrganizationLeft({
                            dispatch,
                            loading,
                            data,
                            leftList,
                            getDepartmentNode,
                            TissueProperty,
                            AllTissueProperty,
                            code
                          }) {
  return ( < div >
      <OrganizationLefted dispatch={
        dispatch
      }
                          leftList={
                            leftList
                          }
                          TissueProperty={
                            TissueProperty
                          }
                          getDepartmentNode={
                            getDepartmentNode
                          }
                          AllTissueProperty={
                            AllTissueProperty
                          }
      /></div >
  )
}
function mapStateToProps(state) {
  const {
    data,
    leftList,
    getDepartmentNode,
    TissueProperty,
    AllTissueProperty,
    code
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    data,
    leftList,
    getDepartmentNode,
    TissueProperty,
    AllTissueProperty,
    code
  };
}
export default connect(mapStateToProps)(OrganizationLefted)
