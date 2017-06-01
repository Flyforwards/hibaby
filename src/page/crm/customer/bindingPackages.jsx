"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
import { Link} from 'react-router'
import "../product/viewService.scss"

const FormItem = Form.Item;
const Option = Select.Option;

class BindingPackagesed extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'serviceInfoName',
          key:'serviceInfoName',
          width: "20%",
        }, {
          title: '服务项价格',
          dataIndex: 'serviceInfoPrice',
          key:'serviceInfoPrice',
          width: "20%",
          render:(text,record,index) => {
            let price = "￥"+record.serviceInfoPrice
            return (
              price
            )
          }
        }, {
          title: '服务项目内容',
          dataIndex: 'serviceInfoContents',
          key:'serviceInfoContents',
          width: "40%",
        },{
          title: '使用次数',
          dataIndex: 'usageCount',
          key: 'usageCount',
          width: "20%",
          }];
        this.state = {
          DeleteVisible:false,
          ID:null
        };
    }
    handleAdd(data){
      let userId = window.location.search.split("=")[1]
      this.props.dispatch({
         type:'addCourse/saveCustomerPackage',
          payload: {
            "customerId":userId,
            "packageId": data.id
          }
      })
      console.log(data.id)
    }
    handleDeleteCancel(){
      this.setState({
          DeleteVisible: false,
      })
    }
    componentWillMount() {
    }
      onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRows });
      }
    componentDidMount() {
      let ID = window.location.search.split("=")[1]
      this.setState({
        ID:ID
      })
      this.props.dispatch({
          type: 'addCourse/findById',
          payload: {
             "dataId":9
          }
      });
     this.props.dispatch({
        type: 'addCourse/selectData',
        payload: { }
      });
      this.props.dispatch({
        type: 'addCourse/getDictionary',
        payload: {
          "id":5 ,
          "softDelete": 1,
          "type": 2
        }
      });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    render() {
        let roomList = []
        let ListLnformation = []
        let loadingName = true
        let type = ''
        let suiteId = ''
        const columns = this.columns;
        const { getFieldDecorator } = this.props.form;
        if(this.props.findById != null){
            ListLnformation = this.props.findById.serviceInfoList;
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
        if(this.props.getDictionary != null && this.props.findById != null){
          this.props.getDictionary.map((item)=>{
            if(item.id == this.props.findById.type){
              type = item.name
            }
          })
        }
        if(this.props.selectData != null && this.props.findById != null){
          this.props.selectData.map((item)=>{
            if(item.id == this.props.findById.suiteId){
              suiteId = item.name
            }
          })
        }
        console.log(this.props.findById)
        return (
            <div className="viewServiceinfo">
                <div className="viewServiceinfoList">
                <p>套餐信息:</p>
                <p className="namep">套餐名称: {this.props.findById?this.props.findById.name:null}</p>
                <p className="pricep">套餐价格: {this.props.findById?this.props.findById.price:null}</p>
                <p className="typep">套餐类型: {type}</p>
                </div>
                <div className="viewServiceinfoTable">
                 <p>服务项目:</p>
                  <Table bordered 
                    columns={ columns } 
                    dataSource={ListLnformation}
                    pagination = { false }
                    loading = { loadingName }
                  />
                </div>  
                <Button onClick={this.handleSubmit}>返回</Button>
                <Button type="primary" onClick={this.handleAdd.bind(this,this.props.findById)}>确定</Button>      
            </div>
        )
    }
}
function BindingPackages({
  dispatch,
  findById,
  getDictionary,
  selectData
}) {
  return ( < div >
    <BindingPackagesed dispatch = {
      dispatch
    }
    findById = {
      findById
    }
    getDictionary = {
      getDictionary
    }
    selectData = {
      selectData
    }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    findById,
    getDictionary,
    selectData
  } = state.addCourse;
  return {
    loading: state.loading.models.addCourse,
    findById,
    getDictionary,
    selectData,
    users: state.addCustomer
    };
}
const bindingPackages = Form.create()(BindingPackagesed);
export default connect(mapStateToProps)(bindingPackages)
