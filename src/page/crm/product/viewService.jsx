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
          type: 'packageInfo/getCardLevel',
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
        let levels = []
        let gradeList = []
        const columns = this.columns;
        const { getFieldDecorator } = this.props.form;
        if(this.props.packageItem.serviceInfoList){
            ListLnformation = this.props.packageItem.serviceInfoList;
              ListLnformation.map((record)=>{
                record.key = record.serviceInfoId;
            });
            loadingName = false
            if(this.props.packageItem.suiteId){
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
        if(this.props.getDictionary != null && this.props.packageItem.serviceInfoList){
          this.props.getDictionary.map((item)=>{
            if(item.id == this.props.packageItem.type){
              type = item.name
            }
          })
        }
        if(this.props.grade != null){
          gradeList = this.props.grade.map((item)=>{
            return (<Option value={item.id+""} key={item.id}>{item.name}</Option>)
          })
        }
        if(this.props.selectData != null && this.props.packageItem.serviceInfoList){
          levels.push(String(this.props.packageItem.levels))
          this.props.selectData.map((item)=>{
            if(item.id == this.props.packageItem.suiteId){
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
                      initialValue:this.props.packageItem.name,
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
                    initialValue:this.props.packageItem.price,
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
                  <FormItem
                   label="套餐等级"
                   className="packageLevel"
                  >
                    {getFieldDecorator('packageLevel', {
                      initialValue:levels,
                      rules: [],
                    })(
                      <Select disabled={true}
                    >
                     {
                      gradeList
                     }
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>:null
                }
              <div className="button-group-bottom-common">
                <Button className="button-group-bottom-1" onClick={this.handleSubmit}>返回</Button>
                <Button disabled={del} className="button-group-bottom-2" onClick={this.delete.bind(this)}>删除</Button>
                <Link to={{ pathname: '/crm/service-info/edit', query: { data:this.state.ID } }}>
                  <Button disabled={edit} className="button-group-bottom-3">编辑</Button>
                </Link>
              </div>
              <Delete
                visible={ this.state.DeleteVisible }
                onCancel ={ this.handleDeleteCancel.bind(this) }
                ID = { this.state.ID }
                serviceInfoList = { this.props.packageItem}
              />
            </div>
        )
    }
}


function mapStateToProps(state) {
  const {
    packageItem,
    getDictionary,
    grade,
    selectData
  } = state.packageInfo;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.packageInfo,
    packageItem,
    getDictionary,
    selectData,
    grade,
    permissionAlias
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
