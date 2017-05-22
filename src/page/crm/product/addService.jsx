"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
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
          loading: false,
        };
    }
    componentWillMount() {
    }
     onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRows });
      }
    componentDidMount() {
        this.props.dispatch({
            type: 'packageInfo/serviceListByPage',
            payload: {
               "page": 1,
               "size": 100
            }
        });
        this.props.dispatch({
            type: 'packageInfo/roomList',
            payload: { }
        });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(){
      const fields = this.props.form.getFieldsValue();
      console.log("fields",this.state.selectedRows)
      let serviceInfoList =[]
      if(this.state.selectedRows.length>=1){
        this.state.selectedRows.map((item)=>{
          if(item.usageCount){
            serviceInfoList.push({"serviceInfoId":item.id,"usageCount":Number(item.usageCount)})
          }else{
            serviceInfoList.push({"serviceInfoId":item.id,"usageCount":1})
          }
        })
        console.log(serviceInfoList)
        this.props.dispatch({
          type: 'packageInfo/add',
          payload: {
            "name": fields.name,
            "price": fields.price,
            "serviceInfoList":serviceInfoList,
            "suiteId": fields.room,
            "type": fields.type
          }
      });
       this.props.dispatch({
          type: 'packageInfo/serviceListByPage',
          payload: { }
      });
      history.go(-1)
    }else{
      message.success("请选择服务项目");
    }
     
    }
    render() {
        let loadingName = true
        const { getFieldDecorator } = this.props.form;
        const columns = this.columns;
        let ListLnformation = []
        let roomList = []
        if(this.props.serviceListByPage != null){
            ListLnformation = this.props.serviceListByPage;
              ListLnformation.map((record)=>{
                record.key = record.id;
            });
            loadingName = false
        }
        if(this.props.roomData != null){
          roomList = this.props.roomData.map((item)=>{
            return (<Option value={item.id+""} key={item.roomNo}>{item.roomNo}</Option>)
          })
        }
        const { loading, selectedRows } = this.state;
        const rowSelection = {
            selectedRows,
            onChange: this.onSelectChange,
        };
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
                      rules: [],
                    })(
                    <Select
                    >
                      <Option value="0">主套餐</Option>
                      <Option value="1">次套餐</Option>
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
                       rules: [],
                    })(
                      <Select
                    >
                      <Option value="0">主套餐</Option>
                      <Option value="1">次套餐</Option>
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <Button onClick={this.handleSubmit}>返回</Button>
                <Button type="primary" onClick={this.handleAdd.bind(this)}>保存</Button>
            </div>
        )
    }
}
function AddService({
  dispatch,
  serviceListByPage,
  roomData
}) {
  return ( < div >
    <AddServiceed dispatch = {
      dispatch
    }
    serviceListByPage = {
      serviceListByPage
    }
     roomData = {
       roomData
     }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    serviceListByPage,
    roomData
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceListByPage,
    roomData
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
