"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form,message } from 'antd'
import { Link} from 'react-router'
import './serviceinfo.scss'
import Current from '../../Current'

const FormItem = Form.Item;
const Option = Select.Option;

class AddServiceed extends Component {

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
            let count = 1
            if(record.usageCount){
              count = record.usageCount
              check
            }
            return (
                <span className="span">
                  <Input defaultValue ={ count } onChange={(event)=>{
                    record.usageCount = event.target.value
                  }}/>
                </span> 
            );
          },
        }];
        this.state = {
          loading: false,
          selectedRowKeys:[],
          selectedRows: []
        };
    }
    shouldComponentUpdate (nextProps) {
      if(nextProps.findById){
        let selectedRowKeys = []
        nextProps.findById.serviceInfoList.map((item)=>{
            selectedRowKeys.push(item.serviceInfoId)
        })
        this.setState({
          selectedRowKeys: selectedRowKeys
        })
      }
       return true 
    }
    onSelectChange = (selectedRowKeys,selectedRows) => {
      console.log(selectedRows)
      this.setState({ selectedRows,selectedRowKeys });
    }
    componentDidMount() {
      let ID = window.location.search.split("=")[1]
        this.props.dispatch({
            type: 'packageInfo/findById',
            payload: {
              "dataId":ID
            }
        });
        this.props.dispatch({
            type: 'packageInfo/serviceListByPage',
            payload: { }
        });
        this.props.dispatch({
            type: 'packageInfo/selectData',
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
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(data){
      let serviceInfoList =[]
      let ID = window.location.search.split("=")[1]
      const fields = this.props.form.getFieldsValue();
      if(this.state.selectedRows.length>=1){
        this.state.selectedRows.map((item)=>{
          if(item.usageCount){
            serviceInfoList.push({"serviceInfoId":item.id,"usageCount":Number(item.usageCount),"serviceInfoContents":item.contents,"serviceInfoPrice":item.price,"serviceInfoName":item.name})
          }else{
            serviceInfoList.push({"serviceInfoId":item.id,"usageCount":1,"serviceInfoContents":item.contents,"serviceInfoPrice":item.price,"serviceInfoName":item.name})
          }
        })
      }else{
          data.serviceInfoList.map((item)=>{
            if(item.usageCount){
             serviceInfoList.push({"serviceInfoId":item.serviceInfoId,"usageCount":Number(item.usageCount),"serviceInfoContents":item.contents,"serviceInfoPrice":item.price,"serviceInfoName":item.name})
            }else{
              serviceInfoList.push({"serviceInfoId":item.serviceInfoId,"usageCount":1,"serviceInfoContents":item.contents,"serviceInfoPrice":item.price,"serviceInfoName":item.name})
            }
          })
      }
      console.log("目",serviceInfoList)
      if(fields.name){
        if(fields.price){
          if(fields.type){
            if(serviceInfoList.length>=1){
              this.props.dispatch({
                type: 'packageInfo/edit',
                payload: {
                  "id":ID,
                  "name": fields.name,
                  "price": fields.price,
                  "serviceInfoList":serviceInfoList,
                  "suiteId": fields.room,
                  "type": fields.type
                }
              });
            }else{
              message.warning("请选择服务项目");
            }
          }else{
            message.warning("请选择套餐的类型");
          }
        }else{
          message.warning("请输入套餐的价格");
        }
      }else{
        message.warning("请输入套餐的名称");
      }
    }
    render() {
        let loadingName = true
        let rowSelection = {}
        const { getFieldDecorator } = this.props.form;
        const { loading, selectedRows,selectedRowKeys} = this.state;
        const columns = this.columns;
        let ListLnformation = []
        let selectData = []
        let roomList = []
        let type = ''
        let suiteId = ''
        if(this.props.serviceListByPage != null){
            ListLnformation = this.props.serviceListByPage;
              ListLnformation.map((record)=>{
                record.key = record.id;
            });
            loadingName = false
        }
        if(this.props.selectData != null && this.props.findById){
          selectData = this.props.selectData.map((item)=>{
            if(item.id == this.props.findById.suiteId){
              suiteId = item.id
            }
            return (<Option value={item.id+""} key={item.id}>{item.name}</Option>)
          })
        }
        if(this.props.getDictionary != null &&　this.props.findById != null){
          roomList = this.props.getDictionary.map((item)=>{
            if(item.id == this.props.findById.type){
              type = item.id
            }
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }
        if(this.props.findById){
          let data = [];
          this.props.findById.serviceInfoList.map((record)=>{
              data.push(record.serviceInfoId)
          });
          rowSelection = {
              selectedRows,
              selectedRowKeys,
              onChange: this.onSelectChange,
          };
        }
        return (
            <div className="addServiceinfo">
                <div className="addServiceinfoList">
                <p>套餐信息:</p>
                <Form layout="inline">
                  <FormItem
                   label="套餐名称"
                   className="name"
                  >
                    {getFieldDecorator('name', {
                      initialValue:this.props.findById?this.props.findById.name:null,
                       rules: [],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                     label="套餐价格"
                     className="price"
                  >
                  {getFieldDecorator('price', {
                    initialValue:this.props.findById?this.props.findById.price:null,
                    rules: [],
                    })(
                    <Input 
                      addonBefore="￥"
                    />
                    )}
                  </FormItem>
                   <FormItem
                   label="套餐类型"
                   >
                    {getFieldDecorator('type', {
                      initialValue:type,
                      rules: [],
                    })(
                    <Select
                    >
                      {
                        roomList
                      }
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <div className="addServiceinfoTable">
                  <Table bordered 
                    rowSelection={rowSelection} 
                    columns={ columns } 
                    dataSource={ListLnformation}
                    pagination = { false }
                    scroll={{ y: 500 }}
                    loading = { loadingName } 
                    defaultExpandedRowKeys = {ListLnformation}      
                    />
                </div>  
                <div className="addServiceinfoSuite">
                <p>选择套房:</p>
                <Form layout="inline">
                  <FormItem
                   label="套房"
                   className="room"
                  >
                    {getFieldDecorator('room', {
                      initialValue:suiteId,
                       rules: [],
                    })(
                      <Select 
                    >
                     {
                      selectData
                     }
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <Button onClick={this.handleSubmit}>返回</Button>
                <Button type="primary" onClick={this.handleAdd.bind(this,this.props.findById)}>保存</Button>
            </div>
        )
    }
}
function AddService({
  dispatch,
  serviceListByPage,
  selectData,
  findById,
  getDictionary
}) {
  return ( < div >
    <AddServiceed dispatch = {
      dispatch
    }
    serviceListByPage = {
      serviceListByPage
    }
    selectData = {
      selectData
    }
    findById = {
      findById
    }
    getDictionary = {
      getDictionary
    }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    serviceListByPage,
    selectData,
    findById,
    getDictionary
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceListByPage,
    selectData,
    findById,
    getDictionary
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
