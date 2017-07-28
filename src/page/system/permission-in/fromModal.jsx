"use strict"

import React, {Component} from 'react'
import {connect} from 'dva'
import { Modal, Form, Input, Radio, Select,Button, Icon, TreeSelect,Table,Popconfirm,Row, Col} from 'antd'
import './fromModal.scss'
import { routerRedux } from 'dva/router'
import TabalList from './tabalList.jsx'
import {local, session} from 'common/util/storage.js'
import AddFromCreateModal from './addFromCreateModal.jsx'
const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option
const Dictionary = local.get("Dictionary")
import { parse } from 'qs'


@createForm()
class permissionInside extends Component {
    constructor(props) {
        super(props)
        this.state = {
          modifyModalVisible: false
        }
    }
    state = {
        visible: false,
        value: undefined
    }
    onChange = (value) => {
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

    Inquire(){
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const { pathname } = location;
          this.props.dispatch(routerRedux.push({
            pathname,
            query: values
        }));
        }
      });
    }
    emptied(){
      const { pathname } = location;
      this.props.dispatch(routerRedux.push({
        pathname
      }))
      this.props.form.resetFields()
    }

    render() {
        if(this.props.data){
          local.set("mainName",this.props.data)
        }
        const { permissions, form } = this.props;
        const { getFieldDecorator } = form;
        let mainName = local.get("Dictionary");

        let nodes = [];
        if (mainName != null) {
          nodes = mainName.map((item,index)=>{
            return (
                <Option value={String(item.id)} key={item.id}  >{item.name}</Option>
            )})
        }
        const values = parse(location.search.substr(1))
        return (
            <div className="permission-in-cent">
              <div className="form-heard">
                <Form className="ant-advanced-search-form">
                  <FormItem  label="主模块">
                   {getFieldDecorator('projectId', {
                     required: false,
                     rules: [],
                     initialValue: values.projectId,
                   })(
                      <Select className="SelectMenu" placeholder="请选择" >
                        { nodes }
                      </Select>
                    )}
                  </FormItem>
                  <FormItem label="上级权限">
                     {getFieldDecorator('parentId', {
                       required: false,
                       rules: [],
                       initialValue: values.parentId?Number(values.parentId):undefined,
                     })(
                       <TreeSelect
                         dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                         treeData={ permissions }
                         placeholder="请选择"
                         treeDefaultExpandAll
                         className="SelectMenu"
                       />
                      )}
                  </FormItem>
                  <FormItem label="名称">
                     {getFieldDecorator('name', {
                       required: false,
                       initialValue: values.name,
                       rules: [],
                     })(
                         <Input className="input"/>
                      )}
                  </FormItem>
                </Form>
                <div className="button-group">
                  <Button className="button-group-1" onClick={ this.Inquire.bind(this)}>查询</Button>
                  <Button className="button-group-2" onClick={ this.emptied.bind(this) }>重置</Button>
                  <Button className="button-group-3" onClick={ this.addList.bind(this) }>添加</Button>
                </div>
              </div>
              <TabalList form={form} />
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
    permissions
  } = state.myPermission;
  return {
    loading: state.loading,
    data,
    permissions
  };
}

export default connect(mapStateToProps)(permissionInside)
