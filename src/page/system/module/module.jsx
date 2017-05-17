"use strict"
import React, {Component} from 'react'
import './module.scss'
import {Icon, Table, Input, Button, Form, Row, Col,Menu,Popconfirm, messageMenu, Dropdown, message} from 'antd'
import request from '../../../common/request/request.js'
import { classification,dataList,ww } from 'common/constants.js'
import { connect } from 'dva'

class Module extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.columns = [{
      title: '主模块',
      dataIndex: 'projectName',
      key:'projectName',
      width: '200px',
    }, {
      title: '上级菜单',
      dataIndex: 'parentName',
      key:'parentName',
      width: '200px',
    },{
      title: '名称',
      dataIndex: 'name',
      key:'name',
      width: '300px',
    },{
      title: '路径',
      dataIndex: 'path',
      key:'path',
      width: '300px',
    },{
      title: '权限名称',
      dataIndex: 'permissionName',
      key:'permissionName',
      width: '300px',
    },{
      title: '操作',
      dataIndex: 'operating',
      key: 'operating',
      width: '150px',
      render: (text, record, index) => {
        return (
          dataList.length >= 1 ?
            (
              <div>
                <a href="#" className="firstA" onClick={this.Edit}>编辑</a>
                <a href="#" className="firstB" onClick={this.delete}>删除</a>
              </div>
            ) : (<div></div>)
        );
      },
    }];
  }

  componentWillMount() {
    this.props.dispatch({
      type: "system/getAllMenu"
    });
  }

  handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }

  handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  managementInquire() {
    console.log("查询")
  }
  Edit(){
    console.log("编辑")
  }
  permissions(){
    console.log("设置权限")
  }
  Member(){
    console.log("成员列表")
  }
  delete(){
    console.log("删除")
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    const pagination = {
      total: 100, //数据总条数
      showQuickJumper: true,
      onChange: (current) => {
          this.props.dispatch(routerRedux.push({
             pathname: '/system/module',
             query: {
               "page": current,
               "results": 3
             },
         }));
      },
    };
    const menu = (
        <Menu onClick={this.handleMenuClick.bind(this)}>
          <Menu.Item key="1">系统管理</Menu.Item>
          <Menu.Item key="2">CRM系统</Menu.Item>
          <Menu.Item key="3">套房管理</Menu.Item>
          <Menu.Item key="4">服务管理</Menu.Item>
          <Menu.Item key="5">膳食厨房</Menu.Item>
          <Menu.Item key="6">进销存管理</Menu.Item>
        </Menu>
      );
    return (
      <div className="MenuInside">
        <div className="menuHeard">
            <div className="MainModule">
                <h4 className="projectName">主模块：</h4>
                <Dropdown.Button onClick={this.handleButtonClick.bind(this)} overlay={menu}>
                 请选择
                </Dropdown.Button>
            </div>
        </div>
        <div className="CreateModaList">
          <Table bordered dataSource={dataList} columns={columns} pagination = {pagination} rowKey="Numbering"/>
          <p className="allList">共计0条,范围1-10</p>
        </div>
      </div>
    )

  }
}

export default connect()(Module);
