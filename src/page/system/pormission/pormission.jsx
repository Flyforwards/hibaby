"use strict"
import React, {Component} from 'react';
import { Icon, Table, Input,Modal, Button, Form, Row, Col, Popconfirm, message } from 'antd';
import { connect } from 'dva';
const createForm = Form.create;
const FormItem = Form.Item;
import  './pormission.scss';
import AddRoleFrom from './AddRoleFrom';
import SettingPormissionFrom from './SettingPormissionFrom'


@createForm()
class pormissionForm extends Component{
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    modifyModalVisible: false,
    settingModalVisible: false,
    record, null,
    value: undefined,
    add: true, // 编辑还是添加
    isDel: false,
  }
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
          key:'ids',
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
                <div key = { index }>
                  <a href="#" className="firstA" onClick={ this.editPermissions.bind(this,record) }>编辑</a>
                  <a href="#" className="firstA" onClick={ this.setPermissions.bind(this,record) }>设置权限</a>
                  <a href="#" className="firstA" onClick={ this.showMemberList.bind(this,record) }>成员列表</a>
                  <a href="#" className="firstB" onClick={ this.delete.bind(this,record )}>删除</a>
                </div>
            );
          },
        }];
    }
    componentWillMount() {
      this.props.dispatch({
        type : "pormission/getRolesByPage",
        payload : { page : 1, size : 10}
      });
    }
    managementInquire() {
      console.log("查询")
    }
  // 编辑
    editPermissions(record){
      console.log("编辑", record)
      this.setState({
        modifyModalVisible: true,
        record: record,
        add: false,
        isDel: false,
      })
    }
    // 设置权限
    setPermissions(record){
      console.log("设置权限", record)
      this.setState({
        settingModalVisible: true,
        record: record,
      })

    }
    showMemberList(record){
      console.log("成员列表", record)
    }

    delete(record){
      console.log("删除", record)
      this.setState({
        modifyModalVisible: true,
        record: record,
        add: false,
        isDel: true,
      })
    }

    // 添加
    addList(){
      this.setState({
        modifyModalVisible: true,
        record: null,
        add: true,
        isDel: false,
      })
    }
    handleCreateModalCancel() {
        this.setState({
          modifyModalVisible: false,
          settingModalVisible: false,
        })
    }
    render() {
        let { total, data } = this.props.pormission;
        if (data != null) {
          data.map((item,index)=>{
            item.key = item.id;
            return item;
          })
        }
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
            <div className="name">部门<Input />
              <Button className="find" onClick={this.managementInquire}>查询</Button>
              <Button className="add" onClick={ this.addList.bind(this) }>添加</Button>
            </div>
            <div className="CreateModaList">
                <Table bordered dataSource={ data } columns={ this.columns } pagination = { pagination }/>
                <p className="allList">共计0条,范围1-10</p>
            </div>
             <AddRoleFrom
               visible ={ this.state.modifyModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
               record = { this.state.record }
               add = { this.state.add }
               isDel = { this.state.isDel }
             />
             <SettingPormissionFrom
               visible ={ this.state.settingModalVisible }
               onCancel ={ this.handleCreateModalCancel.bind(this) }
             />
           </div>
        )
    }
}

export default connect(( pormission ) => ( pormission ))(Pormission);
