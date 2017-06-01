

import React, {Component} from 'react'
import {connect} from 'dva'
import { Cascader,} from 'antd'
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
      local.set("projectId",value)
    }
    render() {
       const { permissionList }= this.props;
      // console.log(permissionList);

        return (
            <div className="SelectList">

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
