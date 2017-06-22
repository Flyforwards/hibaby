/**
 * 菜品管理左侧菜品库树
 * Created by yangjingjing on 2017/6/12.
 */
import React from 'react'
import {connect} from 'dva'
import "./DishesLeft.scss"
import {Tree,message,Modal} from 'antd';
import {routerRedux} from 'dva/router'
import {local, session} from 'common/util/storage.js';
import DishesLibraryFormOrDetailModal from './DishesLibraryFormOrDetailModal';


const TreeNode = Tree.TreeNode;
let plusEnter = false;
class DishesLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upblock: 'none',//控制操作悬浮框是否展示
      ulTop: 0,//控制操作悬浮框的距顶距离
      ID: null,
      selectedNode: null,
      selectedNodeParentId : null,
      selectedNodeLevel : null,
      unfolded:["0"],
      nodeFormOrDetailModalVisible:false,
      nodeFormOrDetailModalTitle : null,
      isNodeDetail : false,
      isNodeEdit : false,
      initialValue : {},
    }
    this.addDisplay = "block";
    this.deleteDisplay = "block";
    this.selectNodeLevel = null;//选中树节点等级
  }
  //递归函数生成树
  nodesIteration = (root) => {
    const _this = this;
    if(root.nodes){
      return root.nodes.map(function (child,index) {
        return <TreeNode title={child.name+"("+child.dishesCount+")"} level={child.level} key={child.id} parentId={child.parentId}>{_this.nodesIteration(child)}</TreeNode>;
      });
    }
    return <TreeNode title={root.name} level={root.level} key={root.id} parentId={root.parentId} />;
  }

  //展开/收起节点时触发
  expandHandler = (expandedKeys, {expanded: bool, node}) => {
    let len = []
    len.push(expandedKeys[expandedKeys.length-1])
    this.setState({
      unfolded:len
    })
    setTimeout(() => {
      $(".Dishes-left li").find(".ant-tree-title").each((index, e) => {
        if ($(e).siblings(".plus").length == 0) {
          $(e).after("<span class='plus'>+</span>");
        }
      })
    }, 50)
  }

  //点击树节点触发
  onSelect = (value, node)=>{
    if(value[0]){//选中树节点
      this.selectNodeLevel = node.selectedNodes[0].props.level;
      if(this.selectNodeLevel == 0){//根目录
        this.deleteDisplay = "none";//设置删除按钮隐藏
      }else{
        this.deleteDisplay = "block";
      }
      if(this.selectNodeLevel > 2){//二级菜单
        this.addDisplay = "none"//设置添加按钮隐藏
      }else{
        this.addDisplay = "block"
      }
      //将选中节点信息放入state中
      const selectedNodeId = node.selectedNodes[0].key;
      this.setState({
        ID: selectedNodeId,
        selectedNode: node.selectedNodes[0],
        selectedNodeParentId: node.selectedNodes[0].props.parentId,
        selectedNodeLevel:this.selectNodeLevel,
        unfolded : value
      });
      //获取节点下的分页菜品信息
      this.props.dispatch({
        type: 'dishes/getDishesPageList',
        payload: {
          nodeId : selectedNodeId
        }
      });

    }else{
      if(this.selectNodeLevel == 0){//根目录
        this.deleteDisplay = "none";//设置删除按钮隐藏
      }else{
        this.deleteDisplay = "block";
      }
      if(this.selectNodeLevel > 2){//二级菜单
        this.addDisplay = "none"//设置添加按钮隐藏
      }else{
        this.addDisplay = "block"
      }
    }
  }

  componentDidMount() {
    //设置鼠标移入，控制操作悬浮框显示
    $(document).on('mouseenter', '.plus', function (e){
      plusEnter = true;
    });
    //设置鼠标移入，控制操作悬浮框隐藏
    $(document).on('mouseout', '.plus', function (e){
      plusEnter = false;
    });

    const userInfo = session.get("userInfo");
    //设置树节点右侧【+】的点击事件
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


    //当用户点其他区域，隐藏操作悬浮框
    $(".Dishes-left").click(function (e) {
      if (this.state.upblock == 'block' && !plusEnter) {
        this.setState({
          upblock: 'none'
        })
        return
      }
    }.bind(this));
    $(".Dishes-right").click(function (e) {
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
    $(".Dishes-left li").find(".ant-tree-title").each((index, e) => {
      if ($(e).siblings(".plus").length == 0) {
        $(e).after("<span class='plus'>+</span>");
      }
    });

    if (userInfo != null && userInfo.categoryId != 0) {
      $("li").find(".plus").eq(0).css('display', 'none');
    }
  }
  //添加子节点
  handlerCreate(){
    this.setState({
      nodeFormOrDetailModalVisible : true,
      nodeFormOrDetailModalTitle : "创建食材",
      initialValue : null
    });
  }

  //查看节点详情
  handlerDetail(){
    this.setState({
      nodeFormOrDetailModalVisible : true,
      nodeFormOrDetailModalTitle : "食材详情",
      isNodeDetail : true,
      initialValue : {
        id : this.state.ID,
        name : this.state.selectedNode.props.title
      }
    });
  }

  //删除节点
  handlerRemove = () =>{
    const {dispatch} = this.props;
    const _this = this;
    Modal.confirm({
      title: '提示',
      content: '是否确定删除此菜品库节点?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'dishes/deleteDishesLibraryNodes',
          payload: {
            dataId : _this.state.ID
          }
        });
      }
    });
  }

  //节点表单/详情页取消按钮点击事件
  handleNodeCancel = () =>{
    this.setState({
      nodeFormOrDetailModalVisible : false,
      isNodeDetail : false,
      isNodeEdit: false,
      initialValue : null
    });
  }

  //节点表单/详情确认按钮点击事件
  handleNodeOk = (values) =>{
    const params = values;
    let path = null;
    if(!params.id){//创建
      params.parentId = this.state.ID;
      params.level = this.state.selectedNodeLevel + 1;
      path = 'dishes/saveDishesLibrary';
    }else{//修改
      path = 'dishes/updateDishesLibrary';
    }

    const{dispatch} = this.props;
    dispatch({
      type: path,
      payload: {
        ...params
      }
    });
    this.handleNodeCancel();
  }
  //节点表单/详情编辑按钮点击事件
  handleNodeEdit = (value) =>{
    this.setState({
      isNodeEdit : true,
      isNodeDetail : false,
      nodeFormOrDetailModalTitle : "修改食材"
    });
  }
  //节点表单/详情删除按钮点击事件
  handlerNodeRemove = (value) =>{
    const {dispatch} = this.props;
    const _this = this;
    Modal.confirm({
      title: '提示',
      content: '是否确定删除此菜品库节点?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'dishes/deleteDishesLibraryNodes',
          payload: {
            dataId : _this.state.ID
          }
        });
        _this.handleNodeCancel();
      }
    });
  }



  render() {
    const add = !this.props.permissionAlias.contains('NODE_ADD');
    const detail = !this.props.permissionAlias.contains('NODE_DETAIL');
    const del = !this.props.permissionAlias.contains('NODE_DELETE');


    const {dishesLibraryNodes} = this.props.dishes;
    let treeNodes = dishesLibraryNodes?this.nodesIteration(dishesLibraryNodes):null;
    treeNodes =dishesLibraryNodes?<TreeNode key={dishesLibraryNodes.id} level={dishesLibraryNodes.level} title={dishesLibraryNodes.name} parentId={dishesLibraryNodes.parentId}>{treeNodes}</TreeNode>:null;
    return (
      <div className="Dishes-left">
        <Tree
          className="draggable-tree"
          autoExpandParent = { true }
          onExpand={this.expandHandler.bind(this)}
          defaultSelectedKeys = { this.state.unfolded }
          expandedKeys = { this.state.unfolded }
          onSelect={ this.onSelect.bind(this) }
          >
          {treeNodes}
        </Tree>
        <ul className="nameList" style={{ top: this.state.ulTop, display: this.state.upblock }}>
          <li disabled={add} className="li" onClick={this.handlerCreate.bind(this)} style={{ display: this.addDisplay }}>添加子节点</li>
          <li disabled={detail} className="li" onClick={this.handlerDetail.bind(this)}>查看详情</li>
          <li disabled={del} className="li" onClick={this.handlerRemove.bind(this)} style={{ display: this.deleteDisplay }}>删除</li>
          <li className="fourLi">ID {this.state.ID}</li>
        </ul>

        <DishesLibraryFormOrDetailModal
          nodeFormOrDetailModalVisible={this.state.nodeFormOrDetailModalVisible}
          nodeFormOrDetailModalTitle={this.state.nodeFormOrDetailModalTitle}
          initialValue={this.state.initialValue}
          isNodeDetail={this.state.isNodeDetail}
          isNodeEdit={this.state.isNodeEdit}
          handleCancel={this.handleNodeCancel.bind(this)}
          handleOk={this.handleNodeOk.bind(this)}
          handleEdit={this.handleNodeEdit.bind(this)}
          handleRemove={this.handlerNodeRemove.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dishes: state.dishes,
    permissionAlias : state.layout
  };
}
export default connect(mapStateToProps)(DishesLeft);
