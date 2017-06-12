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
  render() {

    return (
      <div className="Dishes-left">
      <Tree
        className="draggable-tree"
        draggable
      >
        <TreeNode title="parent 1" key="0-0">
        </TreeNode>
      </Tree>
      </div>
    );



  }
}
export default DishesLeft;
