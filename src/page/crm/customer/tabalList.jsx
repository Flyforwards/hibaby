"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './fromModal.scss'
import SelectList from './from.jsx'
import {local, session} from '../../common/util/storage.js'
import DataConversion from '../dataConversion'
import FromCreateModal from './fromCreateModal'
const Option = Select.Option
const Dictionary = local.get("Dictionary")
const list =[{
    actionPath:"/serviceInfo/listByPage",
    alias:"serviceInfoList",
    description:"CRM数据管理-服务项目-显示",
    id:4,
    name:"显示",
    orderBy:0,
    parentId:0,
    parentName:"显示"
},{
    actionPath:"/serviceInfo/listByPage",
    alias:"serviceInfoList",
    description:"CRM数据管理-服务项目-显示",
    id:4,
    name:"显示",
    orderBy:0,
    parentId:1,
    parentName:"显示"
}]
class TabalListed extends Component {
  constructor(props) {
        super(props)
        this.columns = [{
          title: '主模块',
          dataIndex: 'mainName',
          key: 'mainName',
          width: '90px',
        }, {
          title: '上级权限',
          dataIndex: 'description',
          key: 'description',
          width: '90px',
        }, {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          width: '90px',
        }, {
          title: '路径',
          dataIndex: 'actionPath',
          key: 'actionPath',
          width: '90px',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '90px',
          render: (text, record, index) => {
            return (
                <div>
                 <a href="#">删除</a>
                  <a href="#" onClick={this.modify.bind(this,index)}>修改</a>
                </div>
            );
          },
        }];
        this.state = {
            dataSource: [{
                key:'1',
                mainName:'crm',
                description: '客户档案',
                name: '客户档案',
                actionPath:'/xxxx/xxxx/xxx',
                people:'里方法'
              }],
              createModalVisible: false,
              modifyModalVisible: false,
              modifyModalIndex: null
        }
    }
    showCreateModal() {
        this.setState({
            createModalVisible: true
        })
    }
    showModifyModal() {
        this.setState({
            modifyModalVisible: true
        })
    }
    handleModifyModalCancel() {
        this.setState({
            modifyModalVisible: false,
        })
    }
    handleCreateModalCancel() {
        this.setState({
            createModalVisible: false,
        })
    }
    addList(){
      this.setState({
        createModalVisible: true
      })
    }
    modify(index){
      this.setState({
        modifyModalVisible: true,
        modifyModalIndex: index,
      })
    }
    render() {
      console.log("sdsds",this.props.arr)
      let mainName = []
        {
          if(this.props.arr){
            mainName = DataConversion(list,"parentId",this.props.arr,"parentId")
            console.log("dsdssssssssss",mainName)
          }else{

          }
        }
        return (
          <div>
          <Table bordered dataSource = {mainName} columns={this.columns} className="fromModal" rowKey = "class"/>
          <FromCreateModal
            handleOk={this.state.handleOk}
            modelsList={mainName[this.state.modifyModalIndex]}
            visible={ this.state.modifyModalVisible}
            onCancel={ this.handleModifyModalCancel.bind(this) }
          />
          </div>
        )
    }
}

function TabalList({
    dispatch,
    arr,
    total,
    page,
    size,
    code
}) {
  return ( < div >
    < TabalListed dispatch = {
      dispatch
    }
    arr = {
        arr
    }
    total = {
      total
    }
    page = {
      page
    }
    size = {
      size
    }
    /> </div>
  )

}
function mapStateToProps(state) {
  const {
    arr,
    total,
    page,
    size
  } = state.system;
  return {
    loading: state.loading.models.system,
    arr,
    total,
    page,
    size
  };
}
export default connect(mapStateToProps)(TabalList)

