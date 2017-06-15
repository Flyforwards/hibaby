/**
 * 菜品管理左侧菜品库树
 * Created by yangjingjing on 2017/6/12.
 */
import React from 'react'
import {connect} from 'dva'
import "./DishesLeft.scss"
import {Tree} from 'antd';
import {routerRedux} from 'dva/router'
import {local, session} from 'common/util/storage.js';


const TreeNode = Tree.TreeNode;
let plusEnter = false;
class DishesLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  //递归函数生成树
  nodesIteration = (nodes) => {
    const _this = this;
    if(nodes.nodes){
      return nodes.nodes.map(function (child,index) {
        return <TreeNode title={child.name} key={child.id} parentId={child.parentId}>{_this.nodesIteration(child)}</TreeNode>;
      });
    }
    return <TreeNode title={nodes.name} key={nodes.id} parentId={nodes.parentId} />;
  }
  render() {
    const {dishesLibraryNodes} = this.props.dishes;
    let treeNodes = dishesLibraryNodes?this.nodesIteration(dishesLibraryNodes):null;
    treeNodes =dishesLibraryNodes?<TreeNode key={dishesLibraryNodes.id} title={dishesLibraryNodes.name} parentId={dishesLibraryNodes.parentId}>{treeNodes}</TreeNode>:null;
    return (
      <div className="Dishes-left">
      <Tree
        className="draggable-tree"
        draggable
      >
        {treeNodes}
      </Tree>
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
