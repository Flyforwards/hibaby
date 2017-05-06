"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './fromModal.scss'
import SelectList from './from.jsx'
import {local, session} from '../../../common/util/storage.js'
import DataConversion from '../../dataConversion'
import FromCreateModal from './fromCreateModal'
import Current from '../../Current'
import {routerRedux} from 'dva/router'

const Option = Select.Option
const Dictionary = local.get("Dictionary")
const list = local.get("listByPage")

class TabalListed extends Component {
  constructor(props) {
        super(props)
        this.columns = [{
          title: '主模块',
          dataIndex: 'id',
          key: 'id',
          width: '90px',
        }, {
          title: '上级权限',
          dataIndex: 'parentName',
          key: 'parentName',
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
                parentName:'crm',
                description: '客户档案',
                name: '客户档案',
                actionPath:'s',
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
      var mainName = []
      console.log("current",this.props.arr)
        {
          if(this.props.arr){
            mainName = DataConversion(list,"parentId",this.props.arr,"parentId")
          }
        }

        const pagination = {
          total: 40, //数据总条数
          showQuickJumper: true,
          defaultPageSize:5,
          onChange: (current) => {
            this.props.dispatch({
                type: 'system/listByPage',
                payload: {
                    "page": current,
                    "size": 5
                }
            });
          },
        };
        return (
          <div>
          <Table bordered dataSource = {this.props.arr} columns={this.columns} pagination = {pagination} className="fromModal" rowKey = "class"/>
          < Current page = {
                this.props.page
              }
              totalpage = {
                this.props.totalpage
              }
              total = {
                this.props.total
              }
              results = {
                this.props.results
              }
              range = {
                this.props.range
              }
              />
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

