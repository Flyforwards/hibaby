"use strict"
import React, {Component} from 'react';
import {connect} from 'dva'
import './module.scss';
import {routerRedux} from 'dva/router'
import {Icon, Table, Input, Button, Form, Row, Col,Popconfirm, Modal,Radio,messageMenu,Select,TreeSelect,message} from 'antd';
import request from '../../../common/request/request.js';
import Current from '../../Current';
import AlertModalFrom from 'common/AlertModalFrom'
import AddModule from './AddModule'
import EditModule from './EditModule'

const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create


@createForm()

class Module extends Component {
  constructor(props) {
    super(props);
    this.state={
        alertModalVisible:false,
        modifyModalVisible:false,
        EditModuleModal:false,
        value: undefined,
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
      title: '图标',
      dataIndex: 'icon',
      key:'icon',
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
        return (
              <div className="OperateList" key={ index }>
                <a href="#" className="firstA" onClick={this.editMenu.bind(this,record)}>编辑</a>
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
    const data=[];
    this.props.form.validateFields((err, values) => {
      if(!err){
          this.props.dispatch({
            type: 'module/MenuData',
            payload: {
                  name: values.name,
                  path:values.path,
                  page:this.state.page,
                  size:10,
                  projectId: values.projectId
                }
              });
            }
          })
        }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'module/MenuData',
      payload: {
            name:'',
            path:'',
            page:0,
            size:10,
            projectId:null
          }
        });
  };


  // 删除弹框
  delete(record){
    this.record = record;
    this.setState({
      alertModalVisible: true,
    })
  }
  // 编辑
  editMenu(record){
    this.record = record;
    this.setState({
      EditModuleModal: true,
    })
  }
  addMenuList(){
    this.setState({
      modifyModalVisible: true,
    })
  }
  //确定删除
  handleAlertModalOk(record) {
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
        EditModuleModal:false
      })
  }
  //权限改变
  onChange = (value) => {
   this.setState({ value });
 }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
     labelCol: { span: 5 },
     wrapperCol: { span: 19 },
   };
    const data=this.props.data?this.props.data:null;
    const columns = this.columns;
    const pagination = {
      total:this.props.total,
      showQuickJumper: true,
      pageSize:10,
      onChange: (current) => {
        this.props.dispatch({
          type: 'module/MenuData',
          payload: {
              "page": current,
              "size": 10,
          },
        });
      },
    }
    const list=this.props.list;
    const children = [];
    list.map((res,index)=>{
          children.push(<Option key={res.id}>{res.name}</Option>)
    });
    if (this.props.data !== null) {
      this.props.data.map((record)=>{
        record.key = record.id;
      })

    }
    return (
      <div className="MenuInside">
        <div className="menuHeard">
        <Form className="ant-advanced-search-form">
            <div className="MainModule">
                <h4 className="projectName">主模块：</h4>
                {getFieldDecorator('projectId', {rules: [{ required: false, message: '字段名称为必填项！' }],
                })(
                <Select className="SelectMenu" style={{ width:180 }} placeholder="请选择">
                    {children}
                </Select>)}
            </div>

                <div className="MeunName">
                  <h4 className="Name">名称：</h4>
                  <FormItem className = "NameBox">
                    {getFieldDecorator('name', {rules: [{ required: false, message: '字段名称为必填项！' }],
                    })(
                        <Input className="input"/>
                    )}
                  </FormItem>
                </div>
                <div className="MeunPath">
                  <h4 className="Route">路径：</h4>
                  <FormItem {...formItemLayout} className = "PathBox">
                    {getFieldDecorator('path', {rules: [{ required: false, message: '字段名称为必填项！' }],
                    })(
                        <Input className="input"/>
                    )}
                  </FormItem>
                </div>
                <div className="btn">
                    <Button className="Select" onClick={this.handleSearch.bind(this)}>查询</Button>
                    <Button className="Select" onClick={this.handleReset.bind(this)}>清空</Button>
                    <Button className="Select" onClick={this.addMenuList.bind(this)}>新增</Button>
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
        <EditModule
          visible ={ this.state.EditModuleModal}
          onCancel ={ this.handleCreateModalCancel.bind(this) }
          record = { this.record }
          add = { this.state.add }
          page = { this.page }
          pageSize = { this.pageSize }
        />
      </div>
    )
  }
}

function Module({ dispatch, data, page, size,edit, total,list,permission,menu,results,
range}) {
  return (
    <Module dispatch={dispatch} data={data} id={id} list={list} permission={permission}
    menu={menu} page={page} size={size} edit={edit} total={total} range={range} results={results} />
  )
}
function mapStateToProps(state) {
  console.log("菜单>>>",state.module.item)
  const { item:data,size,total,page,edit,permission,results,range,list,menu} = state.module;
  return {
    loading: state.loading.models.module,
    data,
    permission,
    list,
    menu,
    results,
    range,
    total,
    edit
  };
}

export default connect(mapStateToProps)(Module);
