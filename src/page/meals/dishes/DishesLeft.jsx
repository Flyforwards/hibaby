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

const rootLevel = 1;//根节点级别
const minLevel = 2;//最底子节点级别
const TreeNode = Tree.TreeNode;
let plusEnter = false;
class DishesLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upblock: 'none',//控制操作悬浮框是否展示
      ulTop: 0,//控制操作悬浮框的距顶距离
      ID: null,//选中树节点id
      selectedNode: null,//选中树节点
      selectedNodeParentId : null,//选中树节点所属父id
      selectedNodeLevel : null,//选中树节点的级别
      unfolded:[this.props.dishes.nodeId+""],//默认展开的树节点集合
      nodeFormOrDetailModalVisible:false,//节点表单/详情页面弹出框显示状态
      nodeFormOrDetailModalTitle : null,//节点表单/详情页面弹出框标题
      isNodeDetail : false,//是否为查看详情状态
      isNodeEdit : false,//是否为编辑状态
      initialValue : {},//节点表单/详情页初始化数据值
      node : null
    }
    this.addDisplay = "block";
    this.deleteDisplay = "block";
    this.selectNodeLevel = null;//选中树节点等级
  }
  //递归函数生成树
  nodesIteration = (nodes) => {
    const _this = this;
    return nodes.map((item) => {
      if(item.nodes && item.nodes.length){
          return <TreeNode name={item.name} title={item.name+"("+item.dishesCount+")"} level={item.level} key={item.id} parentId={item.parentId}>{_this.nodesIteration(item.nodes)}</TreeNode>;
      }
      return <TreeNode  name={item.name} title={item.name+"("+item.dishesCount+")"} level={item.level} key={item.id} parentId={item.parentId} />;
    });
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
    }, 50);
  }

  //点击树节点触发
  onSelect = (value, node)=>{

    if(value[0]){//选中树节点
      this.selectNodeLevel = node.selectedNodes[0].props.level;
      if(this.selectNodeLevel == rootLevel){//根目录
        this.deleteDisplay = "none";//设置删除按钮隐藏
      }else{
        this.deleteDisplay = "block";
      }
      if(this.selectNodeLevel > minLevel){//二级菜单
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
        unfolded : node.node.props.children ? value:this.state.unfolded,
        node : node
      });
      //获取节点下的分页菜品信息
      this.props.dispatch({
        type: 'dishes/getDishesPageList',
        payload: {
          nodeId : selectedNodeId
        }
      });

    }else{
      this.setState({
        node : node
      });
      if(this.selectNodeLevel == rootLevel){//根目录
        this.deleteDisplay = "none";//设置删除按钮隐藏
      }else{
        this.deleteDisplay = "block";
      }
      if(this.selectNodeLevel > minLevel){//二级菜单
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


    this.selectNodeLevel = rootLevel;
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
        name : this.state.selectedNode.props.name
      }
    });
  }

  //删除节点
  handlerRemove = () =>{
    const {dispatch} = this.props;
    const _this = this;
    this.setState({
      unfolded : !this.state.node.node.props.children ? [this.state.selectedNodeParentId+""]:this.state.unfolded
    });
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
    if(this.state.isNodeEdit){
      this.setState({
        isNodeDetail : true,
        isNodeEdit : false
      });
    }else{
      this.setState({
        nodeFormOrDetailModalVisible : false,
        isNodeDetail : false,
        isNodeEdit: false,
        initialValue : null
      });
    }
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
    let treeNodes = dishesLibraryNodes?this.nodesIteration(dishesLibraryNodes.nodes):null;
    treeNodes =dishesLibraryNodes?<TreeNode name={dishesLibraryNodes.name} key={dishesLibraryNodes.id} level={dishesLibraryNodes.level} title={dishesLibraryNodes.name} parentId={dishesLibraryNodes.parentId}>{treeNodes}</TreeNode>:null;
    return (
      <div className="Dishes-left">
        <Tree
          className="draggable-tree"
          autoExpandParent = { true }
          onExpand={this.expandHandler.bind(this)}
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
  const { permissionAlias } = state.layout;
  return {
    dishes: state.dishes,
    permissionAlias
  };
}
export default connect(mapStateToProps)(DishesLeft);
