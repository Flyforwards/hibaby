"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {local, session} from '../../../common/util/storage.js'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const systemRoleData = []

class DropDownMenued extends React.Component {
    constructor(props) {
      super(props);
    }
    onSelect(value){
      const fields = this.props.form.getFieldsValue();
    }
    render() {   
      let selectData = []
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      if(this.props.SelectData != null){
          selectData = this.props.SelectData.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }
      return(
            <FormItem
             label="系统角色"
             className="systemRole"
            >
            { getFieldDecorator(`systemRole${this.props.datakey}`,{
            })(
              <Select placeholder="请选择" onSelect={this.onSelect.bind(this)} dropdownMatchSelectWidth>
                { selectData }
              </Select>
            )}
            </FormItem>
      )
    }
  }
DropDownMenued = Form.create({})(DropDownMenued)
export default DropDownMenued
