"use strict"
import React, {Component} from 'react'
import './index.scss'
import {Icon, Table, Input, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import request from 'common/request/request.js'
import {classification,dataList,ww} from '../../../constants.js'
class management extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.columns = [{
          title: '序号',
          dataIndex: 'Numbering',
          key:'Numbering',
          width: '60px',
        }, {
          title: '部门',
          dataIndex: 'name',
          key:'name',
          width: '500px',
        }, {
          title: '最后编辑人',
          dataIndex: 'position',
          key:'position',
          width: '180px',
        }, {
          title: '最后编辑时间',
          dataIndex: 'department',
          key: 'department',
          width: '180px',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '60px',
          render: (text, record, index) => {
            return (
              dataList.length >= 1 ?
              (
                <div>
                 <a href="#" className="firstA" >查看</a>
                </div>
              ) : null
            );
          },
        }];
    }
    managementInquire() {
      console.log("查询")
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        console.log("Organization",this.props.data)
        const pagination = {
        total: 100, //数据总条数
        showQuickJumper: true,
        onChange: (current) => {
        //   this.props.dispatch(routerRedux.push({
        //     pathname: '/system',
        //     query: {
        //       "page": current,
        //       "results": 3,
        //       "type": 1
        //     },
        //   }));
        },
      };
        return (
           <div className="management-cent">
            <div className="name">部门<Input /><span onClick={this.managementInquire}>查询</span></div>
            <div className="CreateModaList">
                <Table bordered dataSource={dataList} columns={columns} pagination = {pagination} rowKey="Numbering"/>
                <p className="allList">共计0条,范围1-10</p>
            </div> 
           </div>
        )
    }
}

export default management
