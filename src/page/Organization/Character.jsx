"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './fromModal.scss'
const Option = Select.Option;
class Charactered extends Component {
     state = {
      value: undefined
    }
   onChange = (value) => {
    console.log(arguments);
    this.setState({ value });
  }
    render() {
        return (
            <div className="SelectList">
              <span>上级权限
              <TreeSelect
                style={{ width: 150 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.props.list}
                placeholder="请选择"
                treeDefaultExpandAll
                onChange={this.onChange.bind(this)}
              />
              </span>
            </div>
        )
    }
}
function Character({
    dispatch,
    list,
    code
}) {
  return ( < div >
    < Charactered dispatch = {
      dispatch
    }
    list = {
        list
    }
    / > < /div >
  )

}
function mapStateToProps(state) {
  const {
    list,
    code
  } = state.system;
  return {
    loading: state.loading.models.system,
    list
  };
}
export default connect(mapStateToProps)(Character)

