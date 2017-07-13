"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table } from 'antd'
import { Link} from 'react-router'
import {routerRedux} from 'dva/router';
import './serviceinfo.scss'
import AlertModalFrom from 'common/AlertModalFrom'

class Serviceinfo extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '套餐名称',
          dataIndex: 'name',
          key:'name',
        }, {
          title: '服务项',
          dataIndex: 'serviceInfoNameList',
          key:'serviceInfoNameList',
          render:(text,record,index) => {
            let serviceInfoNameList = []
            record.serviceInfoNameList.map((item,index)=>{
              if(serviceInfoNameList.length+1 == record.serviceInfoNameList.length){
                serviceInfoNameList.push(item)
              }else{
                serviceInfoNameList.push(item+"  ;  ")
              }
            })
            return (
              serviceInfoNameList
            )
          }
        }, {
          title: '套房',
          dataIndex: 'suiteId',
          key:'suiteId',
          render:(text,record,index) => {
            let suiteId = ""
            if(this.props.selectData != null){
              this.props.selectData.map((item)=>{
                if(item.id === record.suiteId){
                  suiteId = item.name
                }
              })
            }
            return (
             suiteId
            )
          }
        }, {
          title: '套餐价格',
          dataIndex: 'price',
          key: 'price',
          render:(text,record,index) => {
            let price = "￥"+record.price
            return (
              price
            )
          }
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '10%',
          render: (text, record, index) => {
            const detail = !this.props.permissionAlias.contains('SERVICEINFO_DETAIL');
            const del = !this.props.permissionAlias.contains('SERVICEINFO_DELETE');
            return (
            <div>
              <Link className='one-link link-style' disabled={detail} to={{ pathname: '/crm/service-info/detail', query: { data:record.id } }}>查看</Link>
              <Link className='two-link link-style' disabled={del} onClick={this.delete.bind(this,record)}>删除</Link>
            </div>
            );
          },
        }];
        this.state = {
          DeleteVisible:false,
          ID:null
        }
    }
    //删除
  delete(record) {
    this.record = record;
      this.setState({
        DeleteVisible:true
      })
  }
    componentWillMount() {
    }
    handleCreateModalCancel(){
      this.setState({
          DeleteVisible: false,
      })
    }
    //确定删除
    handleAlertModalOk(record) {
        this.props.dispatch({
          type: 'packageInfo/del',
          payload: {
            "dataId": record.id,
          }
        })
      this.handleCreateModalCancel();
    }
    componentDidMount() {
      this.props.dispatch({
         type: 'packageInfo/selectData',
          payload: { }
      })
    }
    render() {
        const { list, loading, pagination, dispatch } = this.props;
        const columns = this.columns;
        const tableProps = {
          loading: loading.effects['packageInfo/listByPage'],
          dataSource : list ,
          columns,
          pagination,
          onChange (page) {
            const { pathname } = location
            dispatch(routerRedux.push({
              pathname,
              query: {
                page: page.current,
                size: page.pageSize,
              },
            }))
          },
        }
        const add = !this.props.permissionAlias.contains('SERVICEINFO_ADD');
        return (
            <div className="serviceinfo">
                <div className="top-button">
                  <Link to="/crm/service-info/add">
                    <Button className='one-button' style={{ float:'right', marginBottom:'10px'}} disabled={add}>添加</Button>
                  </Link>
                </div>
                <Table className='serviceinfo-table' {...tableProps} rowKey = { record=>record.id } bordered/>
              <AlertModalFrom
                visible ={ this.state.DeleteVisible }
                onCancel ={ this.handleCreateModalCancel.bind(this) }
                onOk = { this.handleAlertModalOk.bind(this, this.record) }
                message = { "是否确定删除此套餐?" }
              />
            </div>
        )
    }
}

function mapStateToProps(state) {
  const {
    list,
    pagination,
    selectData
  } = state.packageInfo;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    permissionAlias,
    list,
    pagination,
    selectData
    };
}
export default connect(mapStateToProps)(Serviceinfo)
