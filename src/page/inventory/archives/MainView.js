/**
 * Created by Flyforwards on 2017/11/21.
 */

import React,{ Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker,Modal, Row, Col,Table,Tree,message } from 'antd';
const confirm = Modal.confirm;
import { Link,routerRedux } from 'react-router';
import { CreatModalForm ,AttributeModal} from './Modal';
import '../warehouse/inventoryIndex.scss'
import './archives.scss'
import PermissionLink from 'common/PermissionLink';
import moment from 'moment'

let selectRow = ''

const TreeNode = Tree.TreeNode;

class TopView extends Component{
  constructor(props) {
    super(props);
    this.state = {btnAry: [{title:"创建",className:"button-group-2"}, {title:"辅助属性",className:"button-group-bottom-2"},
        {title:"查询",className:"button-group-bottom-2"}]};

  }

  btnClick(btn){

    if (!selectRow && btn !== "创建"){
      message.error("请先选择要操作的数据")
      return
    }

    let type = "inventoryArchives/setCreatModalVisible";

    if (btn === "辅助属性"){
      this.props.dispatch({type:"inventoryArchives/setAttributeModalVisible" ,payload:true})
    }
    else if (btn === "创建"){
      this.props.dispatch({type:"inventoryArchives/setCreatModalVisible" ,payload:true})
      this.props.dispatch({type:"inventoryArchives/setCreatModelStyle" ,payload:"creat"})
    }
  }

  render(){
    return(
      <div style={{width:"100%",height:"40px"}}>
        {this.state.btnAry.map(value=>{
          return <Button  className={value.className} style={{marginRight:"10px",float:"right"}} key={value.title}
                          onClick={()=>{this.btnClick(value.title)}}>{value.title}</Button>
        })}

      </div>
    )
  }
}

class LeftTreeView extends Component{

  constructor(props){
    super(props);

  }

  // onChange = (value) => {
  //   console.log(arguments);
  //   this.setState({ value });
  // }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} disableCheckbox>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render(){
    const {treeData} = this.props
    return(

      <Tree

        // expandedKeys={this.state.expandedKeys}
        // autoExpandParent={this.state.autoExpandParent}
        // onCheck={this.onCheck}
        // checkedKeys={this.state.checkedKeys}
        // onSelect={this.onSelect}
        // selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>

    )
  }
}

function ResultsTable(props) {

  const {loading,clickRow,slectRow,dispatch,list,page,size,total} = props;

  function textforkey(array,value,valuekey = 'name') {
    if(array){
      for (let i = 0 ;i<array.length ;i++){
        let dict = array[i];
        if(dict['id'] === value){
          return  dict[valuekey];
        }
      }
    }
    else {
      return value
    }
  }

  function creatColumn(dict) {

    if(dict.title === '操作'){
      return(
        {title: '操作',width:'15%', dataIndex: 'operating',
          render: (text, record, index) => {
            return (
              <div>
                <Link className="one-link link-style" onClick={ ()=>{onLook(record)} }> 查看 </Link>
                <Link className="one-link link-style" onClick={ ()=>{onDelete(record)} }> 删除 </Link>
              </div>
            );
          },
        }
      )
    }  else if(dict.title === "创建时间"){
      return{
        title: '创建时间',
        render: (record) => {
          return moment(record).format("YYYY-MM-DD")
        }
      }
    }
    else {

      return(
        {title:dict.title, dataIndex:dict.key, key:dict.key,render:( record)=>{
          return(
            record
          )
        }}
      )
    }
  }

  function onLook(record) {
    dispatch({type:"inventoryArchives/setCreatModalVisible" ,payload:true})
    dispatch({type:"inventoryArchives/setCreatModelStyle" ,payload:"detail"})
    dispatch({type:"inventoryArchives/getInventoryFileDetailById" ,payload:{ dataId: record.id }})
  }

  function onDelete(record) {
    confirm({
      title: '提示',
      content: '是否确定删除此记录',
      onOk() {
        dispatch({
          type: 'inventoryArchives/deleteInventoryFile',
          payload: { dataId: record.id }
        })
      },
      onCancel() {
      }
    });
  }

  const columnAry = [
    {title: '存货编号', key: 'id'},
    {title: '存货名称', key: 'name'},
    {title: '规格型号', key: 'specificationModel'},
    {title: '存货分类', key: 'inventoryClasses'},
    {title: '计量单位', key: 'unit'},
    {title: '售价', key: 'price'},
    {title: '图片', key: 'img'},
    {title: '状态', key: 'status'},
    {title: '创建时间', key: 'operateTime'},
    {title: '操作'},
  ]

  const  columns = [];

  for(let i = 0;i<columnAry.length;i++){
    columns.push(creatColumn(columnAry[i]))
  }

  function onRowClick(e) {
    clickRow(e.id)
    selectRow = e.id
  }

  function rowClassName(record, index){
    if(slectRow && record.id ==  slectRow){
        return "selectRow"
    }
    else{
      return ""
    }
  }

  const tableProps = {
    loading: loading.effects['roomManagement/listByPage'] !== undefined ? loading.effects['roomManagement/listByPage']:false,
    dataSource : list,
    pagination: {
      showQuickJumper: true,
      showTotal: orderTotal => `共 ${orderTotal} 条`,
      current: page,
      pageSize:size,
      total: total,
    },
    onRowClick,
    columns,
    rowClassName,
    onChange (page) {
      const query = parse(location.search.substr(1))
      dispatch({type:"order/getOrderList",payload:{customerId:query.dataId,page:page}})
    }
  }

  return(
    <div className="inventoryIndex">
      <Table className="info-card-center" bordered {...tableProps} />
    </div>
  )
}


class RightTableView extends Component{

  constructor(props){
    super(props);
    this.state = {
      slectRowId : ""
    }
  }

  clickRow(slectRowId){
    this.setState({slectRowId:slectRowId})
  }

  render(){
    const {slectRowId} = this.state
    return(
      <div>
          {/**/}
        <ResultsTable clickRow={(e)=>this.clickRow(e)} slectRow={slectRowId} {...this.props}/>
      </div>
    )
  }
}

class MainView extends Component {
  constructor(props){
    super(props)
  }

  componentWillUnmount() {
  }
  render(){
    const {treeData} = this.props
    return (
      <div>
        <Row><TopView  dispatch={this.props.dispatch}/></Row>
        <Row>
          <Col span={4}><LeftTreeView treeData={treeData}/></Col>
          <Col span={20}><RightTableView {...this.props}/></Col>
        </Row>
        <CreatModalForm/>
        <AttributeModal/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return{
    ...state.inventoryArchives,
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(MainView);
