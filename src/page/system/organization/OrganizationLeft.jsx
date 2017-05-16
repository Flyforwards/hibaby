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
import DeleteNode from './DeleteNode.jsx'
import {local, session} from 'common/util/storage.js'

const Option = Select.Option
const endemic  = session.get("endemic")
const userInfo  = session.get("userInfo")
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
          DeleteNodeVisible:false
        }
        this.addDisplay="block"
    }
    expandHandler = () => {
      setTimeout(() => {
        $("li").find("li .ant-tree-title").after("<span class='plus'>+</span>")
      }, 50)
    }
    onSelect(value,node){
      let TissueProperty = null
      if(value[0] != null){
        console.log('111111',node);
        TissueProperty=node.selectedNodes[0].props.dataIndex
        if(node.selectedNodes[0].key !=1){
          this.setState({
            ID:node.selectedNodes[0].key,
            node:node.selectedNodes[0],
            parentId:node.selectedNodes[0].props.parentId,
          })
          TissueProperty=node.selectedNodes[0].props.dataIndex
          console.log("TissueProperty",TissueProperty)
          if(TissueProperty==3){
           this.addDisplay="none"
          }else{
           this.addDisplay="block"
          }
          this.props.onBtain(Number(node.selectedNodes[0].key),node.selectedNodes[0].props.dataIndex)
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
        this.props.dispatch({
          type: 'organization/getTissueProperty',
          payload: {
              "dataId": TissueProperty
          }
        })
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
    DeleteNode(){
      this.setState({
        DeleteNodeVisible:true
      })
    }
    handleCreateModalCancel() {
        this.setState({
            addChildNodeVisible: false
        })
    }
    handleDeleteNodeCancel() {
        this.setState({
             DeleteNodeVisible: false
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
      if(endemic.categoryId == 999){
        $('.plus :first').hide()
      }else{
         $('.plus :first').show()
      }
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
            return <TreeNode key={item.id} title={item.name+"("+String(item.count)+")"} dataIndex={item.tissueProperty} parentId={item.parentId}>{nodesIteration(item.nodes)}</TreeNode>;
          }
          return <TreeNode key={item.id} title={item.name+"("+String(item.count)+")"} dataIndex={item.tissueProperty} parentId={item.parentId} />;
      })
      }
      if (this.props.leftList != null) {
        const  nodes  = this.props.leftList.nodes;
          loops = nodesIteration(nodes);
          loops.unshift(<TreeNode key={this.props.leftList.id} title={this.props.leftList.name} dataIndex={this.props.leftList.tissueProperty} parentId={nodes[0].parentId} />)
        } 
        return (  
            <div className="Organization-left">
                <Tree
                  className="draggable-tree"
                  onExpand={ this.expandHandler.bind(this) }
                  onSelect={ this.onSelect.bind(this) }
                >
                { loops }
                </Tree>
                <ul className="nameList" style={{top:this.state.ulTop,display:this.state.upblock}}>
                  <li onClick={this.AddChildNode.bind(this)} style={{display:this.addDisplay}}>添加子节点</li>
                  <li onClick={this.seeDetails.bind(this)}>查看详情</li>
                  <li onClick={this.DeleteNode.bind(this)}>删除</li>
                  <li>ID {this.state.ID}</li>
                </ul>
                <AddChildNode
                    visible={ this.state.addChildNodeVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleCreateModalCancel.bind(this) }
                    ID = {this.state.ID}
                    parentId ={this.state.parentId}
                    TissueProperty = {this.props.TissueProperty}
                />
                <SeeDtail
                    visible={ this.state.SeeDtailNodeVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleSeeModalCancel.bind(this) }
                    ID = {this.state.ID}
                    parentId ={this.state.parentId}
                    TissueProperty = {this.props.TissueProperty}
                />
                <DeleteNode
                    visible={ this.state.DeleteNodeVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleDeleteNodeCancel.bind(this) }
                    ID = {this.state.ID}
                    parentId ={this.state.parentId}
                    TissueProperty = {this.props.TissueProperty}
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
  TissueProperty,
  code
}) {
  return ( < div >
    <OrganizationLefted dispatch = {
      dispatch
    }
    leftList = {
      leftList
    }
    TissueProperty = {
      TissueProperty
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
    TissueProperty,
    code
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    data,
    leftList,
    getDepartmentNode,
    TissueProperty,
    code
    };
}
export default connect(mapStateToProps)(OrganizationLefted)
