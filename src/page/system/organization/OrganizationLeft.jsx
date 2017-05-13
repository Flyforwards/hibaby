import React from 'react'
import './Organization.scss'
import { connect } from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import AddChildNode from './AddChildNode.jsx'
import SeeDtail from './SeeDtail.jsx'


const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;
class OrganizationLefted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          upblock:'none',
          ulTop:0,
          addChildNodeVisible:false,
          SeeDtailNodeVisible:false,
          ID:null,
          node:null,
        }
    }
    expandHandler = () => {
      setTimeout(() => {
        $("li").find("li .ant-tree-title").after("<span class='plus'>+</span>")
      }, 50)
    }
    onSelect(value,node){
      if(value[0] != null){
        if(node.selectedNodes[0].key !=1){
          this.setState({
            ID:node.selectedNodes[0].key,
            node:node.selectedNodes[0]
          })
          this.props.dispatch({
            type: 'organization/organizationList',
            payload: {
              nodeid: Number(node.selectedNodes[0].key),
              page: 1,
              size: 5,
              tissueProperty: node.selectedNodes[0].props.dataIndex
            }
          });
        }else{
          this.setState({
            ID:node.selectedNodes[0].key,
            node:node.selectedNodes[0]
          })
        }
      }
    }
    seeDetails(){
          this.props.dispatch({
          type: 'organization/getDepartment',
          payload: {
              "dataId":this.state.ID,
          }
        })
      this.setState({
            SeeDtailNodeVisible: true
        })
    }
    handleCreateModalCancel() {
        this.setState({
            addChildNodeVisible: false
        })
    }
    handleSeeModalCancel() {
        this.setState({
            SeeDtailNodeVisible: false
        })
    }
    componentDidMount(){
      setTimeout(() => {
      $("li").find(".ant-tree-title").after("<span class='plus'>+</span>")}, 800)
      $(document).on('click', '.plus', function(e) {
          if(this.state.upblock == 'none'){
              this.setState({
                ulTop:e.pageY-e.offsetY-21,
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
        }.bind(this));
    }
    //添加子节点
    AddChildNode(){
      this.setState({
        addChildNodeVisible:true
      })
    }
    render() {
      let loops = []
      const nodesIteration = (nodes) => {
        return nodes.map((item) => {
          if (item.nodes && item.nodes.length) {
            return <TreeNode key={item.id} title={item.name} dataIndex={item.tissueProperty}>{nodesIteration(item.nodes)}</TreeNode>;
          }
          return <TreeNode key={item.id} title={item.name} dataIndex={item.tissueProperty} />;
      })
      }
      if (this.props.leftList != null) {
        const  nodes  = this.props.leftList.nodes;
          loops = nodesIteration(nodes);
          loops.unshift(<TreeNode key={this.props.leftList.id} title={this.props.leftList.name} dataIndex={this.props.leftList.tissueProperty}/>) 
        } 
        return (
            <div className="Organization-left">
                <Tree
                  className="draggable-tree"
                  onExpand={this.expandHandler.bind(this)}
                  onSelect={this.onSelect.bind(this)}
                >
                { loops }
                </Tree>
                <ul className="nameList" style={{top:this.state.ulTop,display:this.state.upblock}}>
                  <li onClick={this.AddChildNode.bind(this)}>添加子节点</li>
                  <li onClick={this.seeDetails.bind(this)}>查看详情</li>
                  <li>删除</li>
                  <li>ID {this.state.ID}</li>
                </ul>
                <AddChildNode
                    visible={ this.state.addChildNodeVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleCreateModalCancel.bind(this) }
                    ID = {this.state.ID}
                />
                <SeeDtail
                    visible={ this.state.SeeDtailNodeVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleSeeModalCancel.bind(this) }
                    ID = {this.state.ID}
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
  code
}) {
  return ( < div >
    <OrganizationLefted dispatch = {
      dispatch
    }
    leftList = {
      leftList
    }
    getDepartmentNode = {
      getDepartmentNode
    }
    /></div >
  )
}
function mapStateToProps(state) {
  const {
    data,
    leftList,
    getDepartmentNode,
    code
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    data,
    leftList,
    getDepartmentNode,
    code
    };
}
export default connect(mapStateToProps)(OrganizationLeft)
