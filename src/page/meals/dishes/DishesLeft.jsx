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
      unfolded:["0"]
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
        return <TreeNode title={child.name} level={child.level} key={child.id} parentId={child.parentId}>{_this.nodesIteration(child)}</TreeNode>;
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
    console.log(value,node);
    this.addDisplay = "block";
    this.deleteDisplay = "block";
    if(value[0]){
      this.selectNodeLevel = node.selectedNodes[0].props.level;
      if(this.selectNodeLevel == 0){//根目录
        this.deleteDisplay = "none";//设置删除按钮隐藏
      }else{
        this.deleteDisplay = "block";
      }
      if(this.selectNodeLevel > 1){//二级菜单
        this.addDisplay = "none"//设置添加按钮隐藏
      }else{
        this.addDisplay = "block"
      }
      //将选中节点信息放入state中
      this.setState({
        ID: node.selectedNodes[0].key,
        selectedNode: node.selectedNodes[0],
        selectedNodeParentId: node.selectedNodes[0].props.parentId,
        selectedNodeLevel:this.selectNodeLevel,
        unfolded : value
      });

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

  render() {
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
          <li className="li" style={{ display: this.addDisplay }}>添加子节点</li>
          <li className="li">查看详情</li>
          <li className="li" style={{ display: this.deleteDisplay }}>删除</li>
          <li className="fourLi">ID {this.state.ID}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dishes: state.dishes
  };
}
export default connect(mapStateToProps)(DishesLeft);
