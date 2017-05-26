"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table } from 'antd'
import { Link} from 'react-router'
import {routerRedux} from 'dva/router';
import './serviceinfo.scss'
import Current from '../../Current'
import AlertModalFrom from 'common/AlertModalFrom'

class Serviceinfoed extends Component {

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
                serviceInfoNameList.push(item+"; ")
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
        }, {
          title: '套餐价格',
          dataIndex: 'price',
          key: 'price',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '10%',
          render: (text, record, index) => {
            return (
                <span>
                  <Link to={{ pathname: '/crm/serviceinfo/viewservice', query: { data:record.id } }}>查看</Link>
                  <a href="#" className="twoA" onClick={this.delete.bind(this,record)}>删除</a>
                </span>
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
        
    }
    render() {
        const { list, loading, pagination, dispatch } = this.props;
        console.log("list",list)
        const columns = this.columns;
        const tableProps = {
          loading: loading.effects['packageInfo/listByPage'],
          dataSource : list ,
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
        return (
            <div className="serviceinfo">
                <div className="serviceinfoButton"><Link to="/crm/serviceinfo/addservice"><Button type="primary">添加</Button></Link></div>
                <div className="serviceinfoTabal">
                    <Table {...tableProps} rowKey = { record=>record.id } bordered dataSource={ list } columns={ columns } pagination = {pagination} />
                </div>
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
    pagination
  } = state.packageInfo;
  return {
    loading: state.loading,
    list,
    pagination
    };
}
export default connect(mapStateToProps)(Serviceinfoed)
