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
let plusEnter = false;

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
      DeleteNodeVisible: false,
      unfolded:["0"]
    }
    this.addDisplay = "block";
    this.nodes = null;
    this.unfolded = null;
  }

  expandHandler = (expandedKeys, {expanded: bool, node}) => {
    // console.log("sds",expandedKeys[expandedKeys.length-1])
    let len = []
    len.push(expandedKeys[expandedKeys.length-1])
    // console.log("sdsssss",len)
    this.unfolded = len
    //console.log("len>>>",len)
    this.setState({
      unfolded:len
    })
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
      console.log("node节点",node.selectedNodes[0].key)
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
        console.log("value>>>>>",node.selectedNodes[0])
        this.setState({
          ID: node.selectedNodes[0].key,
          node: node.selectedNodes[0],
          parentId: node.selectedNodes[0].props.parentId,
          dataIndex: node.selectedNodes[0].props.dataIndex,
          unfolded:value,
          TissueProperty:node.selectedNodes[0].props.dataIndex
        })
        this.props.onBtain(Number(node.selectedNodes[0].key), node.selectedNodes[0].props.dataIndex)
        this.props.statusType(false,1)
        //console.log("this.state.current",this.props.current)
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
       // console.log("sdsssss>>>>",node.selectedNodes[0].key)
        this.setState({
          ID: node.selectedNodes[0].key,
          node: node.selectedNodes[0],
          parentId: node.selectedNodes[0].props.parentId,
          dataIndex: node.selectedNodes[0].props.dataIndex,
          unfolded:value
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
     console.log("this.state.unfolded",this.state.ID)
  }

  seeDetails() {
    //console.log("this.state.ID>>>>",this.state.unfolded)
    if(this.state.ID){
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
  }

  DeleteNode() {
    // console.log("DeleteNode>>>>>",this.state.unfolded)
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

    $(document).on('mouseenter', '.plus', function (e){
        plusEnter = true;
        // console.log('mouseenter>>', plusEnter);
    });
    $(document).on('mouseout', '.plus', function (e){
      plusEnter = false;
      // console.log('mouseout>>', plusEnter);
    });

    const userInfo = session.get("userInfo");
    $(document).on('click', '.plus', function (e) {

      if (this.state.upblock == 'none') {
        this.setState({
          ulTop: e.pageY - e.offsetY - 44,
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
      if (this.state.upblock == 'block' && !plusEnter) {
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
    
    if (userInfo != null && userInfo.categoryId != 0) {
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

    const add = !this.props.permissionAlias.contains('NODE_ADD');
    const detail = !this.props.permissionAlias.contains('NODE_DETAIL');
    const del = !this.props.permissionAlias.contains('NODE_DELETE');
    return (
      <div className="Organization-left">
        <Tree
          className="draggable-tree"
          onSelect={ this.onSelect.bind(this) }
          onExpand={this.expandHandler.bind(this)}
          autoExpandParent = { true }
          defaultSelectedKeys = { this.state.unfolded }
        
        >
          { loops }
        </Tree>
        <ul className="nameList" style={{ top: this.state.ulTop, display: this.state.upblock }}>
          <li disabled={add} className="li" onClick={this.AddChildNode.bind(this)} style={{ display: this.addDisplay }}>添加子节点</li>
          <li disabled={detail} className="li" onClick={this.seeDetails.bind(this)}>查看详情</li>
          <li disabled={del} className="li" onClick={this.DeleteNode.bind(this)} style={{ display: this.deleteDisplay }}>删除</li>
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
          parentTissueProperty={this.state.TissueProperty}
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
          TissueProperty={this.state.TissueProperty}
          dataIndex={this.state.dataIndex}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {
    data,
    leftList,
    getDepartmentNode,
    TissueProperty,
    AllTissueProperty,
  } = state.organization;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.organization,
    data,
    leftList,
    getDepartmentNode,
    TissueProperty,
    AllTissueProperty,
    permissionAlias
  };
}
export default connect(mapStateToProps)(OrganizationLefted)
