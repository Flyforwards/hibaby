"use strict"
import React, {Component} from 'react';
import './module.scss';
import {Icon, Table, Input, Button, Form, Row, Col,Popconfirm, messageMenu,Select} from 'antd';
import request from '../../../common/request/request.js';
import { classification,dataList,ww } from 'common/constants.js';
import { connect } from 'dva'
const Option = Select.Option;

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

  }

   handleChange(value) {
    console.log(`selected ${value}`);
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

    return (
      <div className="MenuInside">
        <div className="menuHeard">
            <div className="MainModule">
                <h4 className="projectName">主模块：</h4>
                <Select className="SelectMenu"
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.handleChange.bind(this)}
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option key="meun1" value="系统管理">系统管理</Option>
                  <Option key="meun2"  value="CRM系统">CRM系统</Option>
                  <Option key="meun3"  value="套房管理">套房管理</Option>
                  <Option key="meun4"  value="套房管理">套房管理</Option>
                  <Option key="meun5"  value="服务管理">服务管理</Option>
                  <Option key="meun6"  value="膳食厨房">膳食厨房</Option>
                  <Option key="meun7"  value="进销存管理">进销存管理</Option>
                </Select>
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
