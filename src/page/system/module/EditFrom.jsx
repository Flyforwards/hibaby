"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './module.scss'
import {local, session} from 'common/util/storage.js'


const Option = Select.Option;
class SelectListed extends Component {
     state = {
      value: undefined
    }
   onChange = (value) => {
    this.setState({ value });
  }
    render() {
        console.log("权限>>>>",this.props.permission)
        return (
            <div className="SelectList">
              <TreeSelect
                style={{ width: 310 }}
                key={this.props.permission.id}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.props.permission}
                placeholder="请选择"
                treeDefaultExpandAll
                onSelect={this.onSelect.bind(this)}
                onChange={this.onChange.bind(this)}
              />
            </div>
        )
    }
}
function SelectList({
    dispatch,
    permission,
    code
}) {
  return ( <div>
    <SelectListed dispatch = {
      dispatch
    }
    permission = {permission}
    /> </div>
  )

}
function mapStateToProps(state) {
console.log("permission添加>>>",state.module.permission)
  const {
    permission,
    code
  } = state.module;
  return {
    loading: state.loading.models.module,
    permission
  };
}
export default connect(mapStateToProps)(SelectList)
