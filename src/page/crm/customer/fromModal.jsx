"use strict"
import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './fromModal.scss'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

const aaa = [{
  module: 'crm',
  authority: '客户档案',
  name: '客户档案',
  path: '/xxxx/xxxx/xxx',
  people:'里方法'
},{
  module: 'crm',
  authority: '客户档案',
  name: '客户档案',
  path: '/xxxx/xxxx/xxx',
  people:'里方法'
}];

const treeData = [{
      label: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [{
        label: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      }, {
        label: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      }],
    }, {
      label: 'Node2',
      value: '0-1',
      key: '0-1',
    }];
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
    handleOk(visible) {
        console.log("ok")
        this.props.onCancel()
    }
    checkbox(index) {
        console.log("index",index)

    }
    handleAfterClose() {
        this.props.form.resetFields()
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
        console.log(Date.now())
        setTimeout(() => {
            let now = Date.now()
            if (now % 2 === 1) {
                callback()
            } else {
                callback(new Error('自定义验证函数未通过'))
            }
        }, 1000)
    }
    render() {
        const {visible, form, confirmLoading} = this.props
        const {getFieldDecorator} = form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                okText="确定"
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this,visible)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={1000}
            >
            <div className="fromList">
              <span>主模块
              <TreeSelect
                style={{ width: 150 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={this.onChange}
              />
              </span>
              <span>上级权限
              <TreeSelect
                style={{ width: 150 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={this.onChange}
              />
              </span>
              <span>名称
              <TreeSelect
                style={{ width: 150 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={this.onChange}
              />
              </span>
              <span>路径
              <TreeSelect
                style={{ width: 130 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={this.onChange}
              />
              </span>
              <i>查询</i>
              <i>清空</i>
               <Table bordered dataSource = {aaa} columns={this.columns}  rowKey = "id"/>
            </div>
            </Modal>
        )
    }
}
export default FromModal
