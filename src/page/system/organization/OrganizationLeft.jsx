import React from 'react'
import {connect} from 'dva'
import "./OrganizationLeft.scss"
import {Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree, Menu} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router';

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

class OrganizationLeft extends React.Component {
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
    this.parentTissue = null;
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
    let is_head = false;
    const endemic = session.get('endemic');
    if (endemic && endemic.tissueProperty == 1 ) { // 是总部
      is_head = true;
    }
    if (value[0] != null) {

      // 该节点组织性质
      let TissueProperty = node.selectedNodes[0].props.dataIndex
      this.nodes = TissueProperty;
      // 父节点组织性质
      const parentTissue = node.selectedNodes[0].props.parentTissue
      this.parentTissue = parentTissue;
      this.changeNodeMenu(is_head, TissueProperty, parentTissue)

      if (node.selectedNodes[0].key != 1) {
        // console.log("value>>>>>",node.selectedNodes[0])
        if(node.selectedNodes[0].props.dataIndex != 3){
          this.setState({
            ID: node.selectedNodes[0].key,
            node: node.selectedNodes[0],
            parentId: node.selectedNodes[0].props.parentId,
            dataIndex: node.selectedNodes[0].props.dataIndex,
            unfolded:value,
            TissueProperty:node.selectedNodes[0].props.dataIndex
          })
        }else{
          this.setState({
            ID: node.selectedNodes[0].key,
            node: node.selectedNodes[0],
            parentId: node.selectedNodes[0].props.parentId,
            dataIndex: node.selectedNodes[0].props.dataIndex,
            TissueProperty:node.selectedNodes[0].props.dataIndex
          })
        }

        let disabled_add = false;
        if (TissueProperty == 2 || (TissueProperty == 3 && parentTissue != 1)) {
          disabled_add = true;
        }

        // if (is_head && parentTissue != 1) {
        this.props.onBtain(Number(node.selectedNodes[0].key), node.selectedNodes[0].props.dataIndex, disabled_add)
        // }

        this.props.statusType(false,1)
        // console.log("this.state.current",node.selectedNodes[0].props.dataIndex)
        if(node.selectedNodes[0].props.dataIndex != 0){
          this.props.dispatch({
            type: 'organization/organizationList',
            payload: {
              nodeid: Number(node.selectedNodes[0].key),
              page: 1,
              size: 10,
              tissueProperty: node.selectedNodes[0].props.dataIndex
            }
          });
        }
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
      this.changeNodeMenu(is_head, this.nodes, this.parentTissue)
    }
  }

  changeNodeMenu(is_head, TissueProperty, parentTissue) {
    // 总部可以看见所有节点，可以删除地方中心，不可更改除总部以外的地方中心。

    const userInfo = session.get("userInfo");
    // 管理员
    const manager = userInfo.categoryId == 0

    if (is_head) {
      // 凯贝姆节点
      if (TissueProperty == 0) {
        this.deleteDisplay = "none"
        if (manager) {
          this.addDisplay = "block"
        } else {
          this.addDisplay = "none"
        }
      }
      // 总部
      if (TissueProperty == 1) {
        this.addDisplay = "block"
        if (manager) {
          this.deleteDisplay = "block"
        } else {
          this.deleteDisplay = "none"
        }
      }
      // 其它节点
      if (TissueProperty == 2) {
        if (manager) {
          this.deleteDisplay = "block"
        } else {
          this.deleteDisplay = "none"
        }
        this.addDisplay = "none"
      }
      // 部门节点
      if (TissueProperty == 3) {
        if (parentTissue == 1) { // 总部部门
          this.deleteDisplay = "block"
          this.addDisplay = "none"
        } else { // 其它节点部门
          this.deleteDisplay = "none"
          this.addDisplay = "none"
        }
      }
    } else {
      if (TissueProperty == 0) {
        this.deleteDisplay = "none"
      } else {
        this.deleteDisplay = "block"
      }
      // 总部
      if (TissueProperty == 1) {
        this.addDisplay = "block"
        if (manager) {
          this.deleteDisplay = "block"
        } else {
          this.deleteDisplay = "none"
        }
      }
      // 其它节点
      if (TissueProperty == 2) {
        if (manager) {
          this.deleteDisplay = "block"
        } else {
          this.deleteDisplay = "none"
        }
        this.addDisplay = "none"
      }
      if (TissueProperty == 3) {
        this.addDisplay = "none"
      } else {
        this.addDisplay = "block"
      }
    }
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
    this.setState({
      DeleteNodeVisible: true,
      unfolded:this.state.unfolded
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
    const { permissionAlias, leftList } = this.props;

    let loops = []
    const nodesIteration = (nodes, parentTissue) => {
      return nodes.map((item) => {
        if (item.nodes && item.nodes.length) {
          return <TreeNode key={item.id} title={item.name + "(" + String(item.count) + ")"}
                           dataIndex={item.tissueProperty}
                           parentId={item.parentId}>{nodesIteration(item.nodes, item.tissueProperty)}</TreeNode>;
        }
        return <TreeNode key={item.id} title={item.name + "(" + String(item.count) + ")"}
                         dataIndex={item.tissueProperty} parentTissue={parentTissue} parentId={item.parentId}/>;
      })
    }
    if (leftList) {
      loops = nodesIteration(leftList.nodes, leftList.TissueProperty);
      loops = [<TreeNode key={leftList.id} title={leftList.name}
                         dataIndex={leftList.tissueProperty}
                         parentId={leftList.parentId}>{loops}</TreeNode>]
    }

    const add = !permissionAlias.contains('NODE_ADD');
    const detail = !permissionAlias.contains('NODE_DETAIL');
    const del = !permissionAlias.contains('NODE_DELETE');

    return (
      <div className="Organization-left">
        <Tree
          className="draggable-tree"
          onSelect={ this.onSelect.bind(this) }
          onExpand={this.expandHandler.bind(this)}
          autoExpandParent = { true }
          defaultSelectedKeys = { this.state.unfolded }
          expandedKeys = { this.state.unfolded }
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
export default connect(mapStateToProps)(OrganizationLeft)
