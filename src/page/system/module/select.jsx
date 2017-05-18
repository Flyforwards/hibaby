"use strict"
import React, {Component} from 'react';
import {connect} from 'dva'
import './module.scss';
import {routerRedux} from 'dva/router'
import {Icon, Table, Input, Button, Form, Row, Col,Popconfirm, messageMenu,Select} from 'antd';
import request from '../../../common/request/request.js';
import { classification,dataList,ww } from 'common/constants.js';
import Current from '../../Current'
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create
@createForm()

class Module extends Component {
  constructor(props) {
    super(props);
    this.state={
         expand: false,
    }
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
              <div>
                <a href="#" className="firstA" onClick={this.Edit}>编辑</a>
                <a href="#" className="firstB" onClick={this.delete}>删除</a>
              </div>
        );
      },
    }];
  }

  componentWillMount() {

  }

   handleChange(value) {
    console.log(`selected ${value}`);
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
     labelCol: { span: 5 },
     wrapperCol: { span: 19 },
   };
   const children = [];
   for (let i = 0; i < 2; i++) {
     children.push(
       <Col span={8} key={i}>
         <FormItem {...formItemLayout} label={`Field ${i}`}>
           {getFieldDecorator(`field-${i}`)(
             <Input placeholder="placeholder" />
           )}
         </FormItem>
       </Col>
     );
   }
    console.log("moduleData>>>>",this.props.data)
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

    return (
      <div className="MenuInside">
        <div className="menuHeard">
            <div className="MainModule">
                <h4 className="projectName">主模块：</h4>
                <Select className="SelectMenu"
                  showSearch
                  style={{ width: 150 }}
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.handleChange.bind(this)}
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option key='系统管理' value="系统管理">系统管理</Option>
                  <Option key='CRM系统' value="CRM系统">CRM系统</Option>
                  <Option key='套房管理' value="套房管理">套房管理</Option>
                  <Option key='服务管理'  value="服务管理">服务管理</Option>
                  <Option key='膳食厨房'  value="膳食厨房">膳食厨房</Option>
                  <Option key='进销存管理'  value="进销存管理">进销存管理</Option>
                </Select>
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
                <Button className="Select">查询</Button>
                <Button className="Select">查询</Button>
                <Button className="Select">查询</Button>
            </div>
        </div>
        <div className="CreateModaList">
          <Table bordered dataSource={data} columns={columns} pagination = {pagination} rowKey="name"/>
          < Current page = {
                this.props.page
              }
              totalpage = {
                this.props.totalpage
              }
              total = {
                this.props.total
              }
              results = {
                this.props.results
              }
              range = {
                this.props.range
              }
              />
          <p className="allList">共计0条,范围1-10</p>
        </div>
      </div>
    )

  }
}

function Module({ dispatch, data, code, page, size, total}) {
  return (
    <Module dispatch={dispatch} data={data} code={code} page={page} size={size} total={total}/>
  )
}
function mapStateToProps(state) {
  console.log("module>>>>",state.module)
  const { item:data,size,total,page} = state.module;
  return {
    loading: state.loading.models.module,
    data
  };
}

export default connect(mapStateToProps)(Module);
