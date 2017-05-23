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
   console.log("文本>>>>",value)
    this.setState({ value });
  }
  onSearch=(value)=>{
      console.log("文本>>>>",value)
  }
  onSelect = (value,node, extra) => {
  console.log("文本>>>>",value)
    local.set("dataId",value)
  }
    render() {
        console.log(this.props.menu)
        return (
              <TreeSelect
                style={{ width: 310 }}
                key={this.props.menu.id}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.props.menu}
                placeholder="请选择"
                treeDefaultExpandAll
                onChange={this.onChange}
                onSelect={this.onSelect.bind(this)}
                onSearch={this.onSearch.bind(this)}
              />

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
  console.log("上级>>>>",state.module.menu)
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
