"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class DropDownMenued extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {   
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      return(
            <FormItem
             label={this.props.tital}
             className={this.props.nameClass}
            >
            { getFieldDecorator(`{this.props.nameClass}`,{
            })(
              <Select placeholder="请选择">
                <Option value="0">male</Option>
                <Option value="1">female</Option>
              </Select>
            )}
            </FormItem>
      )
    }
  }

function DropDownMenu({
    dispatch,
    data,
    code
}) {
  return ( <div>
    <DropDownMenued dispatch = {
      dispatch
    }
    data = {
      data
    }
    /> </div>
  )
}
function mapStateToProps(state) {
  const {
    data,
    code
  } = state.organization;

  return {
    loading: state.loading.models.organization,
    data,
    code
  };
}
DropDownMenued = Form.create({})(DropDownMenued)
export default connect(mapStateToProps)(DropDownMenued)
