"use strict"
import React, {Component} from 'react'
import './pormission.scss'
import {Icon, Table, Input,Modal, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import {connect} from 'dva';
const createForm = Form.create
const FormItem = Form.Item


@createForm()
class pormissionForm extends Component{
  constructor(props) {
    super(props)
  }
  state = { visible: false }
  handleCancel() {
    this.props.onCancel()
  }
  handleOk() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.props.dispatch({
        //   type: 'system/permissionAdd',
        //   payload: {
        //     actionPath:values.actionPath,
        //     alias: values.alias,
        //     description: values.authority,
        //     name: values.name,
        //     orderBy:Number(values.orderBy),
        //     parentId: Number(values.mainName),
        //     projectId: local.get("projectId")
        //   }
        // });
      }
    });
    this.props.onCancel()
  }
  checkbox(index) {
    console.log("index",index)
  }
  handleCancel(){
    this.props.onCancel()
  }
  handleAfterClose() {
    this.props.form.resetFields()
  }


  render() {
    const {visible, form, confirmLoading,modelsList,ListIndex} = this.props
    const { getFieldDecorator } = this.props.form;


    return (
      <Modal
        visible={visible}
        key={visible}
        okText="确定"
        onCancel={this.handleCancel.bind(this)}
        confirmLoading={confirmLoading}
        afterClose={this.handleAfterClose.bind(this)}
        onOk={this.handleOk.bind(this,visible)}
        style={{pointerEvents: confirmLoading ? 'none' : ''}}
        maskClosable={!confirmLoading}
      >
        <div className="fromCreateList">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="主模块"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 20 }}
            >
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}

class Pormission extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.columns = [{
          title: '编号',
          dataIndex: 'id',
          key:'id',
          width: '100px',
        }, {
          title: '角色名称',
          dataIndex: 'roleName',
          key:'roleName',
          width: '500px',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '300px',
          render: (text, record, index) => {
            return (
                <div key = { record }>
                  <a href="#" className="firstA" onClick={this.Edit}>编辑</a>
                  <a href="#" className="firstA" onClick={this.permissions}>设置权限</a>
                  <a href="#" className="firstA" onClick={this.Member}>成员列表</a>
                  <a href="#" className="firstB" onClick={this.delete}>删除</a>
                </div>
            );
          },
        }];
    }
    componentWillMount() {
      this.props.dispatch({
        type : "pormission/getRolesByPage",
        payload : { page : 1, size : 5}
      });
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
    add() {

    }
    render() {
        let { total, data } = this.props.pormission;
        const pagination = {
          total: total, //数据总条数
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
            <div className="name">部门<Input /> <Button className="find" onClick={this.managementInquire}>查询</Button> <Button className="add" onClick={this.managementInquire}>添加</Button> </div>
            <div className="CreateModaList">
                <Table bordered dataSource={ data } columns={ this.columns } pagination = { pagination } rowKey="Numbering"/>
                <p className="allList">共计0条,范围1-10</p>
            </div>
           </div>
        )
    }
}

export default connect(( pormission ) => ( pormission ))(Pormission);
