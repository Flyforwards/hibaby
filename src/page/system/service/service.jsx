"use strict"
import React, {Component} from 'react'
import './service.scss'
import {Icon, Table, Input, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import request from '../../../common/request/request.js'
import {classification,dataList,ww} from '../../../constants.js'
import {Link} from 'react-router';
class position extends Component {
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
          dataIndex: 'content',
          key:'content',
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
              dataList.length >= 1 ?
              (
                <div>
                  <a href="#" className="firstA" onClick={this.Edit}>查看</a>
                  <a href="#" className="firstB" onClick={this.delete}>删除</a>
                </div>
              ) : null
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
            <div className="name"><Link to="/localchar/find"><span >添加</span></Link></div>
            <div className="CreateModaList">
                <Table bordered dataSource={dataList} columns={columns} pagination = {pagination} rowKey="Numbering"/>
                <p className="allList">共计0条,范围1-10</p>
            </div>
           </div>
        )
    }
}

export default position
