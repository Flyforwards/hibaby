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
          }];
        this.state = {
          DeleteVisible:false,
          ID:null
        };
    }
    delete() {
      this.setState({
        DeleteVisible:true,
        ID:2
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
      console.log("ID",ID)
        this.props.dispatch({
            type: 'packageInfo/findById',
            payload: {
               "dataId":1
            }
        });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    render() {
        console.log("findById",this.props.findById)
        let roomList = []
        let ListLnformation = []
        let loadingName = true
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
                      initialValue:this.props.findById?this.props.findById.name:null,
                      rules: [],
                    })(
                    <Select disabled={true}
                    >
                      <Option value="0">主套餐</Option>
                      <Option value="1">次套餐</Option>
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <div className="viewServiceinfoTable">
                  <Table bordered 
                    columns={ columns } 
                    dataSource={ListLnformation}
                    pagination = { false }
                    loading = { loadingName }
                  />
                </div>  
                <div className="viewServiceinfoSuite">
                <p>选择套房:</p>
                <Form layout="inline">
                  <FormItem
                   label="套房"
                   className="room"
                  >
                    {getFieldDecorator('room', {
                       initialValue:this.props.findById?this.props.findById.suiteId:null,
                       rules: [],
                    })(
                      <Select disabled={true}
                    >
                      <Option value="0">主套餐</Option>
                      <Option value="1">次套餐</Option>
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <Button onClick={this.handleSubmit}>返回</Button>
                <Button className="delet" onClick={this.delete.bind(this)}>删除</Button>
                <Link to={{ pathname: '/crm/serviceinfo/editservice', query: { data:this.state.ID } }}><Button type="primary">编辑</Button></Link>
                <Delete 
                   visible={ this.state.DeleteVisible }
                   onCancel ={ this.handleDeleteCancel.bind(this) }
                   ID = { this.state.ID }
                  />
            </div>
        )
    }
}
function AddService({
  dispatch,
  findById
}) {
  return ( < div >
    <AddServiceed dispatch = {
      dispatch
    }
    findById = {
      findById
    }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    findById
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    findById
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
