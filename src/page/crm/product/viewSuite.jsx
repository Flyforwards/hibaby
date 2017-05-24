"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
import { Link} from 'react-router'
import './viewSuite.scss'
import Current from '../../Current'
 import {local, session} from 'common/util/storage.js'
 import Delete from './DeleteSuite.jsx'

const FormItem = Form.Item;
const Option = Select.Option;
let roomId = []

class ViewSuiteed extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'name',
          key:'name',
          width: "20%",
        }, {
          title: '服务项价格',
          dataIndex: 'price',
          key:'price',
          width: "20%",
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key:'contents',
          width: "40%",
        },{
          title: '使用次数',
          dataIndex: 'usageCount',
          key: 'usageCount',
          width: "20%",
          render: (text, record, index) => {
            return (
                <span className="span">
                  <Input defaultValue ={1} onChange={(event)=>{
                    record.usageCount = event.target.value
                  }}/>
                </span> 
            );
          },
        }];
        this.state = {
          selectedRows: [],
          loading: false
        };
    }
    componentWillMount() {
    }
     onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRows });
      }
    componentDidMount() {
        let ID = window.location.search.split("=")[1]
        this.props.dispatch({
            type: 'packageInfo/serviceListByPage',
            payload: { }
        });
        this.props.dispatch({
            type: 'packageInfo/getDictionary',
            payload: {
              "id":5 ,
              "softDelete": 0,
              "type": 2
            }
        });
        this.props.dispatch({
            type: 'packageInfo/selectData',
            payload: { }
        });
        this.props.dispatch({
            type: 'packageInfo/roomList',
            payload: { }
        });
        console.log("ID",ID)
         this.props.dispatch({
            type: 'packageInfo/roomFindById',
            payload: { 
              "dataId":ID
            }
        });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(){
      const fields = this.props.form.getFieldsValue();
      let roomIdList = []
      roomId.map((item)=>{
        if(item){
         roomIdList.push(item)
        }
      })
      console.log("fields",roomIdList)
      this.props.dispatch({
        type: 'packageInfo/roomAdd',
        payload: {
          "description": fields.introduction,
          "price": fields.price,
          "name":fields.name,
          "roomIdList": roomIdList,
        }
      });
     this.props.dispatch({
        type: 'packageInfo/suiteListByPage',
        payload: {
          "page":1,
          "size":10
        }
      });
      history.go(-1)
    }
    roomClick(data,e){
      if(e.target.className == "roomColor"){
        e.target.className = "roomColorA"
        roomId[data] = data
      }else{
        e.target.className = "roomColor"
        roomId[data] = null
      }
      console.log(roomId)
    }
    delete() {
      let ID = window.location.search.split("=")[1]
      this.setState({
        DeleteVisible:true,
        ID:ID
      })
    }
     handleDeleteCancel(){
      this.setState({
          DeleteVisible: false,
      })
      window.location.reload( true )
    }
    render() {
        let loadingName = true
        let roomInformation = []
        const { getFieldDecorator } = this.props.form;
        const columns = this.columns;
        let ListLnformation = []
        let roomList = []
        let selectData = []
        let ID = window.location.search.split("=")[1]
        if(this.props.roomFindById != null){
          this.props.roomFindById.roomNoList.map((item)=>{
            roomInformation.push(<span key= {item} className="roomColor">{item}</span>)
          })
        }
        if(this.props.selectData != null){
          selectData = this.props.selectData.map((item)=>{
             return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }
        if(this.props.serviceListByPage != null){
            ListLnformation = this.props.serviceListByPage;
              ListLnformation.map((record)=>{
                record.key = record.id;
            });
            loadingName = false
        }
        if(this.props.selectData != null){
          selectData = this.props.selectData.map((item)=>{
            return (<Option value={item.id+""} key={item.id}>{item.name}</Option>)
          })
        }
        if(this.props.getDictionary != null){
          roomList = this.props.getDictionary.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }
        const { loading, selectedRows } = this.state;
        const rowSelection = {
            selectedRows,
            onChange: this.onSelectChange,
        };
        return (
            <div className="viewSuite">
                <div className="viewSuiteList">
                <p>套房信息:</p>
                <Form layout="inline">
                  <FormItem
                   label="套房名称"
                   className="name"
                  >
                    {getFieldDecorator('name', {
                      initialValue:this.props.roomFindById?this.props.roomFindById.name:null,
                      rules: [],
                    })(
                      <Input disabled = { true }/>
                    )}
                  </FormItem>
                  <FormItem
                     label="套房价格"
                     className="price"
                  >
                  {getFieldDecorator('price', {
                    initialValue:this.props.roomFindById?this.props.roomFindById.price:null,
                    rules: [],
                    })(
                    <Input 
                      addonBefore="￥"
                      disabled = { true }
                    />
                    )}
                  </FormItem>
                   <FormItem
                   label="套房简介"
                   className="introduction"
                   >
                    {getFieldDecorator('introduction', {
                      initialValue:this.props.roomFindById?this.props.roomFindById.description:null,
                      rules: [],
                    })(
                    <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} className="input" disabled = { true }/>
                    )}
                  </FormItem>
                </Form>
                </div>
                <div className="roomName">
                 <p>房间信息:</p>
                  {
                    roomInformation
                  }
                </div>
                <Button onClick={this.handleSubmit}>返回</Button>
                <Button className="delet" onClick={this.delete.bind(this)}>删除</Button>
                <Link to={{ pathname: '/crm/serviceinfo/editsuite', query:{ suite:ID } }}><Button type="primary">编辑</Button></Link>
                <Delete 
                  visible={ this.state.DeleteVisible }
                  onCancel ={ this.handleDeleteCancel.bind(this) }
                  ID = { this.state.ID }
                  serviceInfoList = { this.props.findById}
                />
            </div>
        )
    }
}
function ViewSuite({
  dispatch,
  serviceListByPage,
  roomData,
  selectData,
  getDictionary,
  roomFindById
}) {
  return ( < div >
    <ViewSuiteed dispatch = {
      dispatch
    }
    selectData = {
      selectData
    }
    serviceListByPage = {
      serviceListByPage
    }
    roomData = {
      roomData
    }
    getDictionary = {
      getDictionary
    }
    roomFindById = {
      roomFindById
    }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    serviceListByPage,
    roomData,
    selectData,
    getDictionary,
    roomFindById
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceListByPage,
    roomData,
    selectData,
    getDictionary,
    roomFindById
    };
}
const viewSuite = Form.create()(ViewSuiteed);
export default connect(mapStateToProps)(viewSuite)
