
import React, {Component} from 'react';
import {connect} from 'dva'
import './module.scss';
import { routerRedux } from 'dva/router'
import {Icon, Table, Input, Button, Form, Row, Col,Popconfirm, Modal,Radio,messageMenu,Select,TreeSelect,message} from 'antd';
import { Link } from 'react-router';
import AlertModalFrom from 'common/AlertModalFrom'
import AddModule from './AddModule'
import EditModule from './EditModule'

const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create
import { parse } from 'qs'

@createForm()

class moduleIndex extends Component {
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
      width: '10%',
    },{
      title: '名称',
      dataIndex: 'name',
      key:'name',
      width: '10%',
    },{
      title: '描述',
      dataIndex: 'description',
      key:'description',
      width: '10%',
    },{
      title: '上级菜单',
      dataIndex: 'parentName',
      key:'parentName',
      width: '10%',
    },{
      title: '路径',
      dataIndex: 'path',
      key:'path',
      width: '20%',
    },{
      title: '权限名称',
      dataIndex: 'permissionName',
      key:'permissionName',
      width: '10%',
    },{
      title: '图标',
      dataIndex: 'icon',
      key:'icon',
      width: '10%',
    },{
      title: '排序',
      dataIndex: 'orderBy',
      key:'orderBy',
      width: '5%',
    },{
      title: '操作',
      dataIndex: 'operating',
      key: 'operating',
      width: '15%',
      render: (text, record, index) => {
        return (
          <div className="operate-list" key={ index }>
            <Link className="one-link" style={{ width: '50%'}} onClick={this.editMenu.bind(this,record)}>编辑</Link>
            <Link className="two-link" style={{ width: '50%'}} onClick={this.delete.bind(this,record)}>删除</Link>
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
    this.props.dispatch({
      type: 'module/parentNodeData',
      payload: {
        projectId: record.projectId,
      }
    });
    this.props.dispatch({
      type: 'module/menuPermissionData',
      payload: {
        projectId: record.projectId,
      }
    });
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
      <div className="menu-cent">
        <div className="menu-heard">
          <Form className="ant-advanced-search-form">
              <FormItem label="主模块：">
                {getFieldDecorator('projectId', {rules: [{ required: false, }],
                })(
                <Select  placeholder="请选择">
                    { children }
                </Select>)}
              </FormItem>
              <FormItem label="名称：">
                {getFieldDecorator('name', {rules: [{ required: false, }],
                })(
                    <Input />
                )}
              </FormItem>
              <FormItem label="路径：">
                {getFieldDecorator('path', {rules: [{ required: false, }],
                })(
                    <Input />
                )}
              </FormItem>
              <div className="button-group">
                  <Button className="button-group-1" onClick={this.handleSearch.bind(this)}>查询</Button>
                  <Button className="button-group-2" onClick={this.handleReset.bind(this)}>清空</Button>
                  <Button className="button-group-3" onClick={this.addMenuList.bind(this)}>新增</Button>
              </div>
          </Form>
        </div>
        <div className="menu-center">
          <Table {...tableProps}  bordered />
        </div>
        <AddModule
          visible ={ this.state.modifyModalVisible }
          onCancel ={ this.handleCreateModalCancel.bind(this) }
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
        />
      </div>
    )
  }
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

export default connect(mapStateToProps)(moduleIndex);
