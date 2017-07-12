"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './module.scss'
import {local, session} from 'common/util/storage.js'

class SelectListed extends Component {
     state = {
      value: undefined
    }
   onChange = (value) => {
    this.setState({ value });
  }
  onSelect = (value,node, extra) => {
    local.set("dataId",value)
  }
    render() {
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

function mapStateToProps(state) {
  const {
    permission,
  } = state.module;
  return {
    loading: state.loading.models.module,
    permission
  };
}
export default connect(mapStateToProps)(SelectListed)
