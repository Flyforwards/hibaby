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
            return (
                <span>
                  <Link to={{ pathname: '/crm/commodity/viewCommodity', query: { commodity:record.id } }} className="twoB">查看</Link>
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
        const { commodityListByPage, loading, pagination, dispatch } = this.props;
        const columns = this.columns;
        const tableProps = {
          loading: loading.effects['packageInfo/commodityListByPage'],
          dataSource : commodityListByPage ,
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
            <div className="commodity">
                <div className="commodityButton"><Link to="/crm/commodity/addcommodity"><Button type="primary">添加</Button></Link></div>
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
    pagination
  } = state.packageInfo;
  return {
    loading: state.loading,
    commodityListByPage,
    pagination
    };
}
export default connect(mapStateToProps)(Commodityed)
