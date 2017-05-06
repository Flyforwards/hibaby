"use strict"

import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm,Row, Col} from 'antd'
import './fromModal.scss'
import SelectList from './from.jsx'
import TabalList from './TabalList.jsx'
import {local, session} from '../../../common/util/storage.js'
import FromCreateModal from './fromCreateModal.jsx'
import AddFromCreateModal from './addFromCreateModal.jsx'
const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option
const Dictionary = local.get("Dictionary")
@createForm()
class FromModaled extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          modifyModalVisible: false
        }
    }
}


class FromModal extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: '主模块',
          dataIndex: 'module',
          width: '90px',
        }, {
          title: '上级权限',
          dataIndex: 'authority',
          width: '90px',
        }, {
          title: '名称',
          dataIndex: 'name',
          width: '90px',
        }, {
          title: '路径',
          dataIndex: 'path',
          width: '90px',
        },{
          title: '操作',
          dataIndex: 'operating',
          width: '90px',
          render: (text, record, index) => {
            return (
              this.state.dataSource.length >= 1 ?
              (
                <Popconfirm title="是否要删除该数据?" onConfirm={() => this.onDelete(index)}>
                 <a href="#">增加</a>
                  <a href="#">修改</a>
                </Popconfirm>
              ) : null
            );
          },
        }];
        this.state = {
            dataSource: [{
                module: 'crm',
                authority: '客户档案',
                name: '客户档案',
                path: '/xxxx/xxxx/xxx',
                people:'里方法'
              }],
        }
    }
    state = {
        visible: false,
        value: undefined
    }
    onChange = (value) => {
        console.log(arguments);
        this.setState({ value });
    }
    handleCancel() {
        this.props.onCancel()
    }
    addList(){
      this.setState({
        modifyModalVisible: true
      })
    }
    handleCreateModalCancel() {
        this.setState({
            modifyModalVisible: false,
        })
      }
    checkbox(index) {
        console.log("index",index)
    }
    Inquire(){
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          concole.log("projectId",local.get("projectId"))
          this.props.dispatch({
            type: 'system/permissionAdd',
            payload: {
                actionPath:values.actionPath,
                alias: values.alias,
                description: values.description,
                name: values.name,
                orderBy:Number(values.orderBy),
                parentId: values.mainName,
                projectId: local.get("projectId")
            }
        });
        }
      });
    }
    emptied(){
      console.log($("input").val())
        $(".ant-select-selection-selected-value").html("请选择")
        $(".name").val("")
        $(".actionPath").val("")
    }
    onSelect = (value,key) => {
      this.props.dispatch({
          type: 'system/SelectList',
          payload: {
              "projectId":value
          }
      });
    }
    render() {
      {if(this.props.data){
        local.set("mainName",this.props.data)
      }}
       const {visible, form, confirmLoading,modelsList,ListIndex} = this.props
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        }
        return (
            <div className="fromList">
              <Form 
                onSubmit={this.handleSubmit}
                className="ant-advanced-search-form"
              >
                <FormItem
                  label="主模块"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 20 }}
                >
               {getFieldDecorator('mainName', {
                  rules: [],
                })(
                  <Select placeholder="请选择" onSelect={this.onSelect}>
                    {
                    local.get("mainName").map((item,index)=>{
                    return (
                        <Option value={item.id} key={index} >{item.name}</Option>
                    )
                  })}
                  </Select>
                )}
              </FormItem>
                <FormItem
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
               {getFieldDecorator('authority', {
                  rules: [],
                  onChange: this.handleSelectChange,
                })(
                  <SelectList />
                )}
              </FormItem>
                <FormItem
                  label="名称"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 20 }}
                >
               {getFieldDecorator('name', {
                  rules: [],
                  onChange: this.handleSelectChange,
                })(
                   <Input className="name"/>
                )}
              </FormItem>
                <FormItem
                  label="路径"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 20 }}
                >
               {getFieldDecorator('actionPath', {
                  rules: [],
                  onChange: this.handleSelectChange,
                })(
                  <Input className="actionPath"/>
                )}
              </FormItem>
              </Form>
              <i onClick={this.Inquire.bind(this)}>查询</i>
              <i onClick={this.emptied.bind(this)}>清空</i>
               <i onClick={this.addList.bind(this)}>新增</i>
               <TabalList />
               <AddFromCreateModal
                visible={ this.state.modifyModalVisible}
                onCancel={ this.handleCreateModalCancel.bind(this) }
              />
            </div>
        )
    }
}

function mapStateToProps(state) {
  const {
    data,
    code
  } = state.system;
  return {
    loading: state.loading.models.system,
    data
  };
}

export default connect(mapStateToProps)(FromModal)

