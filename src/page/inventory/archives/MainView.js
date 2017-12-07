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
const Search = Input.Search;

const TreeNode = Tree.TreeNode;

let searStr = ""

class TopView extends Component{
  constructor(props) {
    super(props);
    this.state = {btnAry: [{title:"创建",className:"button-group-2"}, {title:"辅助属性",className:"button-group-bottom-2"},
        {title:"查询",className:"button-group-bottom-2"}]};

  }

  btnClick(btn){

    if (!this.props.selectRowId && btn === "辅助属性"){
      message.error("请先选择要操作的数据")
      return;
    }

    if (btn === "辅助属性"){
      this.props.dispatch({type:"inventoryArchives/setAttributeModalVisible" ,payload:true})
      this.props.dispatch({type:"inventoryArchives/getInventoryAttTableKey",payload:{dataId:this.props.selectRowId}})
      this.props.dispatch({type:"inventoryArchives/getAttributesGroupByGoodsId"})
      this.props.dispatch({type:"inventoryArchives/getAttributesPageList",payload:{page:1,size:10000}})
    }
    else if (btn === "创建"){
      this.props.dispatch({type:"inventoryArchives/setCreatModalVisible" ,payload:true})
      this.props.dispatch({type:"inventoryArchives/setCreatModelStyle" ,payload:"creat"})
    }
    else {
      this.props.dispatch({type:"inventoryArchives/getInventoryFilePageList",payload:{sear:searStr}})
    }
  }

  render(){
    return(
      <Row style={{width:"100%",height:"40px"}}>
        <Col span={13 } style={{height:"30px"}}>
          <Input onChange={(e)=>{searStr = e.target.value}} placeholder="输入存货名称"/>
        </Col>
        <Col span={11} >
          {this.state.btnAry.map(value=>{
            return <Button  className={value.className} style={{marginRight:"10px",float:"right"}} key={value.title}
                            onClick={()=>{this.btnClick(value.title)}}>{value.title}</Button>
          })}
        </Col>
      </Row>
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

  onSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0){
      if (selectedKeys[0] !== "all"){
        this.props.dispatch({type:"inventoryArchives/getInventoryFilePageList",payload:{inventoryClassesId:selectedKeys[0]}})
      }
      else {
        this.props.dispatch({type:"inventoryArchives/getInventoryFilePageList"})
      }
    }
  }

  render(){
    const {treeData} = this.props
    return(
      <Tree
        defaultExpandAll={true}
        showLine={true}
        onSelect={this.onSelect}
      >
        <TreeNode title="全部" key="all">
          {this.renderTreeNodes(treeData)}
        </TreeNode>
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

    if(dict.title === "图片"){
      return(
        {title: '图片',width:'15%', dataIndex: 'img',
          render: (text, record, index) => {
            return (
              record.img ?
                <img height="100px" width="100px" src={record.img.split("|*|")[0]}   />
                : ""

          );
          },
        }
      )
    }
    else if(dict.title === '操作'){
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
    loading: loading.effects['inventoryArchives/getInventoryFilePageList'] !== undefined ? loading.effects['inventoryArchives/getInventoryFilePageList']:false,
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
      <Table className="info-card-center" bordered {...tableProps}/>
    </div>
  )
}


class RightTableView extends Component{

  constructor(props){
    super(props);
  }

  clickRow(slectRowId){
    this.props.dispatch({type:"inventoryArchives/savaSelectRowId" ,payload:slectRowId})

  }

  render(){
    const {selectRowId,dispatch} = this.props
    return(
      <div>
          {/**/}
        <Row><TopView  dispatch={dispatch} selectRowId={selectRowId}/></Row>

        <ResultsTable clickRow={(e)=>this.clickRow(e)} slectRow={selectRowId} {...this.props}/>
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
    const {treeData,selectRowId,dispatch} = this.props
    return (
      <div >
        <Row>
          <Col span={4}><LeftTreeView dispatch={dispatch} treeData={treeData}/></Col>
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
