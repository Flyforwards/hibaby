"use strict"
import React, {Component} from 'react'
import './position.scss'
import {Icon, Table, Input, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import request from 'common/request/request.js'
import {classification,dataList,ww} from '../../../constants.js'
class position extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.columns = [{
          title: '编号',
          dataIndex: 'Numbering',
          key:'Numbering',
          width: '100px',
        }, {
          title: '角色名称',
          dataIndex: 'name',
          key:'name',
          width: '600px',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '300px',
          render: (text, record, index) => {
            return (
              dataList.length >= 1 ?
              (
                <div>
                  <a href="#" className="firstA" >编辑</a>
                  <a href="#" className="firstA" >设置权限</a>
                  <a href="#" className="firstA" >成员列表</a>
                  <a href="#" className="firstB" >删除</a>
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

export default position
