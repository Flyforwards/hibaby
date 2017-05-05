import React from 'react'
import './Organization.scss'
import { connect } from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import { classification,dataList } from './constants.js'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;
class OrganizationLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
      $("li").find(".ant-tree-title").after("<span class='plus'>+</span>")
      $(".plus").click(function(e){
          if(this.state.upblock == 'none'){
            this.setState({
              ulTop:e.pageY-e.offsetY-33,
              upblock:'block'
            })
            return
          }
          if(this.state.upblock == 'block'){
            this.setState({
              ulTop:e.pageY-e.offsetY,
              upblock:'none'
            })
            return
          }
      }.bind(this))
    }
    expandHandler = () => {
      setTimeout(() => {
        $("li").find("li .ant-tree-title").after("<span class='plus'>+</span>")
         $(".plus").click(function(e){
          if(this.state.upblock == 'none'){
            this.setState({
              ulTop:e.pageY-e.offsetY-33,
              upblock:'block'
            })
            return
          }
          if(this.state.upblock == 'block'){
            this.setState({
              ulTop:e.pageY-e.offsetY,
              upblock:'none'
            })
            return
          }
      }.bind(this))
      }, 50)
    }
    onDrop = (info) => {
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
  }
    showCreateModal() {
        this.setState({
            createModalVisible: true
        })
    }
    render() {
      const loop = data => data.map((item) => {
        if (item.children && item.children.length) {
          return <TreeNode key={item.name} title={item.name}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.name} title={item.name} />;
      });
        return (
            <div className="Organization-left">
                <Tree
                  className="draggable-tree"
                  defaultExpandedKeys={this.state.expandedKeys}
                  draggable
                  onExpand={this.expandHandler.bind(this)}
                  onDragEnter={this.onDragEnter}
                  onDrop={this.onDrop}
                >
                  {loop(classification)}
                </Tree>
                <ul className="nameList" style={{top:this.state.ulTop,display:this.state.upblock}}>
                  <li>添加子节点</li>
                  <li>查看详情</li>
                  <li>删除</li>
                  <li>ID 0002</li>
                </ul>
            </div>
        )
    }
}

function OrganizationLeft({
  dispatch,
  loading,
  code
}) {
  return ( < div >
    <OrganizationLeft dispatch = {
      dispatch
    }
    /></div >
  )
}
function mapStateToProps(state) {
  console.log("modelss",state.system)
  const {
    data,
    code
  } = state.system;
  return {
    loading: state.loading.models.system,
    code
    };
}
export default connect(mapStateToProps)(OrganizationLeft)
