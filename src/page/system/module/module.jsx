"use strict"
import React, {Component} from 'react';
import {connect} from 'dva'
import './module.scss';
import {routerRedux} from 'dva/router'
import {Icon, Table, Input, Button, Form, Row, Col,Popconfirm, Modal,Radio,messageMenu,Select,message} from 'antd';
import request from '../../../common/request/request.js';
import Current from '../../Current';
import AlertModalFrom from 'common/AlertModalFrom'
import AddModule from './AddModule'
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create


@createForm()

class Module extends Component {
  constructor(props) {
    super(props);
    this.state={
        alertModalVisible:false,
        modifyModalVisible:false
    }
    this.columns = [{
      title: '主模块',
      dataIndex: 'projectName',
      key:'projectName',
      width: '200px',
    },{
      title: '名称',
      dataIndex: 'name',
      key:'name',
      width: '200px',
    },{
      title: '描述',
      dataIndex: 'description',
      key:'description',
      width: '200px',
    },{
      title: '上级菜单',
      dataIndex: 'parentName',
      key:'parentName',
      width: '200px',
    },{
      title: '路径',
      dataIndex: 'path',
      key:'path',
      width: '300px',
    },{
      title: '权限名称',
      dataIndex: 'permissionName',
      key:'permissionName',
      width: '150px',
    },{
      title: '模块编号',
      dataIndex: 'orderBy',
      key:'orderBy',
      width: '100px',
    },{
      title: '操作',
      dataIndex: 'operating',
      key: 'operating',
      width: '150px',
      render: (text, record, index) => {
        console.log(record)
        return (
              <div className="OperateList" key={ index }>
                <a href="#" className="firstA" onClick={this.Edit}>编辑</a>
                <a className="firstB" onClick={this.delete.bind(this,record)}>删除</a>
              </div>
        );
      },
    }];
  }

  componentWillMount() {

  }


  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if(!err){
          let projectName='';
          Object.keys(values).map((key, index) => {
            if (key.indexOf("projectName") == 0) {

            }
          })
      }
    });
    console.log("content>>>>",this.props.form.validateFields)
  }

  handleReset = () => {
    this.props.form.resetFields();
  }
  componentWillMount() {
    this.props.dispatch({
      type : "module/MenuData",
    });
  }

  // 删除弹框
  delete(record){
    this.record = record;
    this.setState({
      alertModalVisible: true,
    })
  }
  addList(){
    this.setState({
      modifyModalVisible: true,
      add: true,
    })
  }
  //确定删除
  handleAlertModalOk(record) {
      console.log("del>>>",record.id)
      this.props.dispatch({
        type: 'module/deleteService',
        payload: {
          dataId: record.id,
          page: this.page,
          pageSize: this.pageSize,
        }
      })
    this.handleCreateModalCancel();
  }
  handleCreateModalCancel() {
      this.setState({
        modifyModalVisible: false,
        alertModalVisible: false,
      })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    console.log("value>>>>",getFieldValue('key'))
    const formItemLayout = {
     labelCol: { span: 5 },
     wrapperCol: { span: 19 },
   };
    console.log("moduleData>>>>",this.props.list)
    const data=this.props.data?this.props.data:null;
    const columns = this.columns;
    const pagination = {
      total: 100, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (current) => {
          this.props.dispatch(routerRedux.push({
             pathname: '/module/MenuData',
             query: {
             'page': current,
             size:10,
             'results': 10
             },
         }));
      },
    };
    if (this.props.data !== null) {
      this.props.data.map((record)=>{
        record.key = record.id;
      })
    }
    return (
      <div className="MenuInside">
        <div className="menuHeard">
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
            <div className="MainModule">
                <h4 className="projectName">主模块：</h4>
                {getFieldDecorator('projectName', {rules: [{ required: true, message: '字段名称为必填项！' }],
                })(
                <Select className="SelectMenu"
                  showSearch
                  style={{ width: 150 }}
                  placeholder="请选择"
                  optionFilterProp="children"

                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option key='首页' value="首页">首页</Option>
                  <Option key='系统管理' value="系统管理">系统管理</Option>
                  <Option key='CRM系统' value="CRM系统">CRM系统</Option>
                  <Option key='套房管理' value="套房管理">套房管理</Option>
                  <Option key='服务管理'  value="服务管理">服务管理</Option>
                  <Option key='膳食厨房'  value="膳食厨房">膳食厨房</Option>
                  <Option key='进销存管理'  value="进销存管理">进销存管理</Option>
                </Select>)}
            </div>

                <div className="MeunName">
                  <h4 className="Name">名称：</h4>
                  <FormItem className = "NameBox">
                    {getFieldDecorator('name', {rules: [{ required: true, message: '字段名称为必填项！' }],
                    })(
                        <Input className="input"/>
                    )}
                  </FormItem>
                </div>
                <div className="MeunPath">
                  <h4 className="Route">路径：</h4>
                  <FormItem {...formItemLayout} className = "PathBox">
                    {getFieldDecorator('path', {rules: [{ required: true, message: '字段名称为必填项！' }],
                    })(
                        <Input className="input"/>
                    )}
                  </FormItem>
                </div>
                <div className="Button">
                    <Button className="Select" htmlType="submit">查询</Button>
                    <Button className="Select" onClick={this.handleReset}>清空</Button>
                    <Button className="Select" onClick={this.addList.bind(this)}>新增</Button>
                    <AddModule
                      visible ={ this.state.modifyModalVisible }
                      onCancel ={ this.handleCreateModalCancel.bind(this) }
                      record = { this.record }
                      add = { this.state.add }
                      page = { this.page }
                      pageSize = { this.pageSize }
                    />
                </div>
            </Form>
        </div>
        <div className="CreateModaList">
          <Table className="search-result-list" bordered dataSource={data} columns={columns} pagination = {pagination} rowKey="name"/>
        </div>
        <AlertModalFrom
          visible ={ this.state.alertModalVisible }
          onCancel ={ this.handleCreateModalCancel.bind(this) }
          onOk = { this.handleAlertModalOk.bind(this, this.record) }
          message = { "是否确定删除此服务项?" }
        />
      </div>

    )

  }
}

function Module({ dispatch, data, code, page, size, total,list,permission,menu}) {
  return (
    <Module dispatch={dispatch} data={data} id={id} code={code} list={list} permission={permission}
    menu={menu}  page={page} size={size} total={total}/>
  )
}
function mapStateToProps(state) {
  console.log("module>>>>",state.module.menu)
  const { item:data,size,total,page,permission,list,menu} = state.module;
  return {
    loading: state.loading.models.module,
    data,
    permission,
    list,
    menu
  };
}

export default connect(mapStateToProps)(Module);
