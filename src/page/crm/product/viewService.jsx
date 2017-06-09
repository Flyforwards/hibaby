"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
import { Link} from 'react-router'
import './viewService.scss'
import Current from '../../Current'
import Delete from './DeleteService.jsx'

const FormItem = Form.Item;
const Option = Select.Option;

class AddServiceed extends Component {

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
          type: 'packageInfo/findById',
          payload: {
             "dataId":ID
          }
      });
     this.props.dispatch({
        type: 'packageInfo/selectData',
        payload: { }
      });
      this.props.dispatch({
        type: 'packageInfo/getDictionary',
        payload: {
          "abName":"TCLX" ,
          "softDelete": 0
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
            if(this.props.findById.suiteId){
              this.roomVisbled = true
            }else{
              this.roomVisbled = false
            }
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
        const edit = !this.props.permissionAlias.contains('SERVICEINFO_EDIT');
        const del = !this.props.permissionAlias.contains('SERVICEINFO_DELETE');
        return (
            <div className="viewServiceinfo">
                <div className="viewServiceinfoList">
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
                    <Input disabled={true}/>
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
                      disabled={true}
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
                    <Select disabled={true}
                    >
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <div className="viewServiceinfoTable">
                <p>选择服务项目:</p>
                  <Table bordered
                    columns={ columns }
                    dataSource={ListLnformation}
                    pagination = { false }
                    loading = { loadingName }
                  />
                </div>
                {
                  this.roomVisbled?<div className="viewServiceinfoSuite">
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
                      <Select disabled={true}
                    >
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>:null
                }
                <Button className="BackBtn" onClick={this.handleSubmit}>返回</Button>
                <Button disabled={del} className="delet" onClick={this.delete.bind(this)}>删除</Button>
                <Link to={{ pathname: '/crm/serviceinfo/editservice', query: { data:this.state.ID } }}><Button disabled={edit} className="editBtn" type="primary">编辑</Button></Link>
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


function mapStateToProps(state) {
  const {
    findById,
    getDictionary,
    selectData
  } = state.packageInfo;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.packageInfo,
    findById,
    getDictionary,
    selectData,
    permissionAlias
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
