import React from 'react'
import './Organization.scss'
import { connect } from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import { classification,dataList } from '../../../constants.js'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;
class OrganizationLefted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          upblock:'none',
          ulTop:0
        }
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
              upblock:'none'
            })
            return
          }
      }.bind(this))
      }, 50)
    }
    onSelect(){
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
      let loops = []
      const nodesIteration = (nodes) => {
        return nodes.map((item) => {
          if (item.nodes && item.nodes.length) {
            return <TreeNode key={item.id} title={item.name}>{nodesIteration(item.nodes)}</TreeNode>;
          }
          return <TreeNode key={item.id} title={item.name} />;
      })
      }
      if (this.props.leftList != null) {
        const  nodes  = this.props.leftList.nodes;
          loops = nodesIteration(nodes);
          loops.unshift(<TreeNode key={this.props.leftList.id} title={this.props.leftList.name}/>)
          $("li").find(".ant-tree-title").after("<span class='plus'>+</span>")  
        }
        return (
            <div className="Organization-left">
                <Tree
                  className="draggable-tree"
                  draggable
                  onExpand={this.expandHandler.bind(this)}
                  onDragEnter={this.onDragEnter}
                  onSelect={this.onSelect.bind(this)}
                  onDrop={this.onDrop}
                >
                { loops }
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
  data,
  leftList,
  code
}) {
  return ( < div >
    <OrganizationLefted dispatch = {
      dispatch
    }
    leftList = {
      leftList
    }
    /></div >
  )
}
function mapStateToProps(state) {
  const {
    data,
    leftList,
    code
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    data,
    leftList,
    code
    };
}
export default connect(mapStateToProps)(OrganizationLeft)
