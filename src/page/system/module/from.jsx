"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './fromModal.scss'
import {local, session} from 'common/util/storage.js'


const Option = Select.Option;
class SelectListed extends Component {
     state = {
      value: undefined
    }
   onChange = (value) => {
    this.setState({ value });
  }
  onSelect = (value,node, extra) => {
    local.set("projectId",value)
  }
    render() {
        return (
            <div className="SelectList">
              <span>上级权限
              <TreeSelect
                style={{ width: 150 }}
                key={this.props.list.id}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.props.list}
                placeholder="请选择"
                treeDefaultExpandAll
                onSelect={this.onSelect.bind(this)}
                onChange={this.onChange.bind(this)}
              />
              </span>
            </div>
        )
    }
}
function SelectList({
    dispatch,
    list,
    code
}) {
  return ( <div>
    <SelectListed dispatch = {
      dispatch
    }
    data = { data }
    /> </div>
  )

}
function mapStateToProps(state) {
  const {
    item:data,
    code
  } = state.module;
  return {
    loading: state.loading.models.module,
    data
  };
}
export default connect(mapStateToProps)(SelectList)
