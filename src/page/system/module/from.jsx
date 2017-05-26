

import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon,Cascader, TreeSelect,Table,Popconfirm} from 'antd'
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
       const { permissionList }= this.props;
       console.log(permissionList);
      permissionList.map((record)=>{
        record.children.map((record)=>{
          // record.children=child
        })
      })
        return (
            <div className="SelectList">
              <Cascader
                style={{ width: 310 }}
                options={ permissionList }
                placeholder="请选择"
                onSelect={this.onSelect.bind(this)}
                onChange={this.onChange.bind(this)}
              />
            </div>
        )
    }
}

function mapStateToProps(state) {
  const {
    permissionList
  } = state.module;
  return {
    loading: state.loading.models.module,
    permissionList
  };
}
export default connect(mapStateToProps)(SelectListed)
