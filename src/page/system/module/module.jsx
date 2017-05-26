
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
import { parse } from 'qs'

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


  handleSearch = (e) => {
    e.preventDefault();
    const data=[];
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log(values);
        const { pathname } = location
        this.props.dispatch(routerRedux.push({
          pathname,
          query: values,
        }))
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
    const { getFieldDecorator  } = this.props.form;
    const { pagination, list, dispatch, loading, projectList } = this.props;
    const formItemLayout = {
     labelCol: { span: 5 },
     wrapperCol: { span: 19 },
    };

    const children = projectList.map((res,index)=>{
      return (<Option value={ String(res.id)} key={res.id}>{res.name}</Option>)
    });

    const columns = this.columns;
    const tableProps = {
      loading: loading.effects['module/getMenuData'],
      dataSource : list ,
      pagination,
      columns,
      rowKey:"id",
      onChange (page) {
        const { pathname } = location
        const values = parse(location.search.substr(1))
        dispatch(routerRedux.push({
          pathname,
          query: {...values,
            page: page.current,
            size: page.pageSize,
          },
        }))
      },
    }

    return (
      <div className="MenuInside">
        <div className="menuHeard">
        <Form className="ant-advanced-search-form">
                <FormItem {...formItemLayout} label="主模块：">
                  {getFieldDecorator('projectId', {rules: [{ required: false, }],
                  })(
                  <Select className="SelectMenu"  placeholder="请选择">
                      {children}
                  </Select>)}
                </FormItem>
                <FormItem {...formItemLayout} label="名称：">
                  {getFieldDecorator('name', {rules: [{ required: false, }],
                  })(
                      <Input className="input"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="路径：">
                  {getFieldDecorator('path', {rules: [{ required: false, }],
                  })(
                      <Input className="input"/>
                  )}
                </FormItem>
                <div className="btn">
                    <Button className="Select" onClick={this.handleSearch.bind(this)}>查询</Button>
                    <Button className="Select" onClick={this.handleReset.bind(this)}>清空</Button>
                    <Button className="Select" onClick={this.addMenuList.bind(this)}>新增</Button>
                </div>
            </Form>
        </div>
        <div className="CreateModaList">
          <Table {...tableProps} className="search-result-list" bordered />
        </div>
        <AddModule
          visible ={ this.state.modifyModalVisible }
          onCancel ={ this.handleCreateModalCancel.bind(this) }
          record = { this.record }
          add = { this.state.add }
          page = { this.page }
          pageSize = { this.pageSize }
        />
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
  const {item:data,projectList,edit,permission,results,list,menu, pagination} = state.module;
  return {
    loading: state.loading,
    pagination,
    projectList,
    data,
    permission,
    list,
    menu,
    results,
    edit
  };
}

export default connect(mapStateToProps)(Module);
