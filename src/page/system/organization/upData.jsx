"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import {local, session} from '../../../common/util/storage.js'
import DropDownMenued from './dropDownMenu.jsx'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
//地方中心字段
const endemic  = session.get("endemic")
const SelectData = local.get("rolSelectData")
let traversalDataId = []

class UpDataed extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {  
      
      return(
        
      )
  }
}

function UpData({
    dispatch
}) {
  return ( <div>
    <UpDataed dispatch = {
      dispatch
    }
    /> </div>
  )
}
function mapStateToProps(state) {
  const {
  
  } = state.organization;

  return {
    loading: state.loading.models.organization
  };
}

const upDataed = Form.create()(upDataed);
export default connect(mapStateToProps)(upDataed)
