"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import {Icon, Table, Input,Modal, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import { Link} from 'react-router'
import {routerRedux} from 'dva/router';
import './commodity.scss'
import Delete from './DeleteCommodity.jsx'


class Commodityed extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '商品名称',
          dataIndex: 'name',
          key:'name',
          width:'15%'
        }, {
          title: '首字母',
          dataIndex: 'nameLetter',
          key:'nameLetter',
          width:'10%'
        }, {
          title: '商品备注',
          dataIndex: 'remark',
          key:'remark',
        }, {
          title: '商品单价',
          dataIndex: 'price',
          key: 'price',
          width:'10%',
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
          width: '20%',
          render: (text, record, index) => {
            const detail = !this.props.permissionAlias.contains('COMMODITY_DETAIL');
            const del = !this.props.permissionAlias.contains('COMMODITY_DELETE');
            return (
                <span>
                  <Link disabled={detail} to={{ pathname: '/crm/commodity/detail', query: { commodity:record.id } }} className="twoB">查看</Link>
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
    }
    render() {
        const { commodityListByPage, loading, commoditypagination, dispatch } = this.props;
        const columns = this.columns;
        const tableProps = {
          loading: loading.effects['packageInfo/commodityListByPage'],
          dataSource: commodityListByPage ,
          pagination: commoditypagination,
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
        const add = !this.props.permissionAlias.contains('COMMODITY_ADD');
        return (
            <div className="commodity">
                <div className="commodityButton"><Link to="/crm/commodity/add"><Button disabled={add} type="primary">添加</Button></Link></div>
                <div className="commodityTabal">
                  <Table {...tableProps} rowKey = { record=>record.id } bordered columns={ columns } />
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
    commodityListByPage,
    commoditypagination
  } = state.packageInfo;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    commodityListByPage,
    commoditypagination,
    permissionAlias
    };
}
export default connect(mapStateToProps)(Commodityed)
