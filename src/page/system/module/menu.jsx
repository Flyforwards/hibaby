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
  onSelect = (value,node, extra) => {
    local.set("projectId",value)
  }
    render() {
        return (
            <div className="SelectList">
              <TreeSelect
                style={{ width: 150 }}
                key={this.props.menu.id}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.props.menu}
                placeholder="请选择"
                treeDefaultExpandAll
                onSelect={this.onSelect.bind(this)}
                onChange={this.onChange.bind(this)}
              />
            </div>
        )
    }
}
function SelectMenu({
    dispatch,
    menu,
    code
}) {
  return ( <div>
    <SelectListed dispatch = {
      dispatch
    }
    menu = {menu}
    /> </div>
  )

}
function mapStateToProps(state) {
  const {
    menu,
    code
  } = state.module;
  return {
    loading: state.loading.models.module,
    menu
  };
}
export default connect(mapStateToProps)(SelectMenu)
