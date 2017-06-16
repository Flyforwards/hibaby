"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table } from 'antd'
import { Link} from 'react-router'
import './serviceinfo.scss'
import Current from '../../Current'
import Delete from './DeleteSuite.jsx'


class Suiteed extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '套房名称',
          dataIndex: 'name',
          key:'name',
        }, {
          title: '房间',
          dataIndex: 'roomNoList',
          key:'roomNoList',
          render:(text,record,index) => {
            let roomNoList = []
            record.roomNoList.map((item,index)=>{
              if(roomNoList.length+1 == record.roomNoList.length){
                roomNoList.push(item)
              }else{
                roomNoList.push(item+"; ")
              }
            })
            return (
                roomNoList
            )
          }
        }, {
          title: '套房简介',
          dataIndex: 'description',
          key:'description',
        }, {
          title: '套房价格',
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
            const detail = !this.props.permissionAlias.contains('SUITE_DETAIL');
            const del = !this.props.permissionAlias.contains('SUITE_DELETE');
            return (
                <span>
                  <Link disabled={detail} to={{ pathname: '/crm/suite/detail', query: { suite:record.id } }}>查看</Link>
                  <Link disabled={del} className="twoA" onClick={this.delete.bind(this,record)}>删除</Link>
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
      this.setState({
        DeleteVisible:true,
        ID:record.id
      })
    }
    componentWillMount() {
    }
    handleDeleteCancel(){
      this.setState({
          DeleteVisible: false,
      })
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'packageInfo/suiteListByPage',
            payload: {
              "page":1,
              "size":10
            }
        });
    }
    render() {
        const { suiteListByPage, loading, suitepagination, dispatch } = this.props;
        const columns = this.columns;
        const tableProps = {
          loading: loading.effects['packageInfo/suiteListByPage'],
          dataSource : suiteListByPage ,
          pagination: suitepagination,
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
        const add = !this.props.permissionAlias.contains('SUITE_ADD');
        return (
            <div className="serviceinfo">
                <div className="serviceinfoButton"><Link to="/crm/suite/add"><Button disabled={add} type="primary">添加</Button></Link></div>
                <div className="serviceinfoTabal">
                    <Table {...tableProps} rowKey = { record=>record.id } bordered dataSource={ suiteListByPage } columns={ columns } />
                </div>
                <Delete
                   visible={ this.state.DeleteVisible }
                   onCancel ={ this.handleDeleteCancel.bind(this) }
                   ID = { this.state.ID }
                  />
            </div>
        )
    }
}

function mapStateToProps(state) {
  const {
    suiteListByPage,
    suitepagination
  } = state.packageInfo;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    suiteListByPage,
    suitepagination,
    permissionAlias
    };
}
export default connect(mapStateToProps)(Suiteed)
