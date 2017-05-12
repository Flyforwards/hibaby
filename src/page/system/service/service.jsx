"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import './service.scss'
import {Icon, Table, Input, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import {classification,dataList,ww} from 'common/constants.js'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router';
import Current from '../../Current'
class serviceData extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'name',
          key:'name',
          width: '300px',
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key:'contents',
          width: '300px',
        },{
          title: '服务项目价格',
          dataIndex: 'price',
          key:'price',
          width: '300px',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '300px',
          render: (text, record, index) => {
            return (
                <div>
                  <a href="#" className="firstA" onClick={this.Edit}>查看</a>
                  <a href="#" className="firstB" onClick={this.delete}>删除</a>
                </div>
            );
          },
        }];
    }
    managementInquire() {
      console.log("查询")
    }
    Edit(){
      console.log("查看")
    }
    delete(){
      console.log("删除")
    }
    render() {
        const columns = this.columns;
        const pagination = {
          total: this.props.total, //数据总条数
          showQuickJumper: true,
          pageSize:10,
          onChange: (current) => {
            this.props.dispatch(routerRedux.push({
              pathname: '/system/serviceitem',
              query: {
                "page": current,
                "results": 10,
                "type": 1
              },
            }));
          },
        };
        return (
           <div className="management-cent">
            <div className="name"><Link to="/service/Addservice"><span >添加</span></Link></div>
            <div className="CreateModaList">
                <Table bordered dataSource={this.props.data} columns={columns} pagination = {pagination} rowKey="Numbering"/>
                <p className="allList">共计0条,范围1-10</p>
            </div>
           </div>
        )
    }
}

function service({
  dispatch,
  loading,
  data,
  total,
  page,
  results,
  range,
  code
}) {
  return ( < div >
    < serviceData dispatch = {
      dispatch
    }
    loading = {
      loading
    }
    data={
      data
    }
    total = {
      total
    }
    page={page}
    results={results}
    range={range}
    /> </div >
  )

}
function mapStateToProps(state) {
  console.log("modelss",state.service)
  const {
    data,
    total,
    page,
    range,
    code
  } = state.service;

  return {
    loading: state.loading.models.service,
    data,
    total,
    page,
    range,
    code
  };
}

export default connect(mapStateToProps)(serviceData);
