"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, TreeSelect,Table,Popconfirm} from 'antd'
import './fromModal.scss'
import SelectList from './from.jsx'
import TabalList from './TabalList.jsx'
import {local, session} from '../../common/util/storage.js'
const Option = Select.Option
const Dictionary = local.get("Dictionary")

class FromModaled extends Component {
    constructor(props) {
        super(props)  
    }
     handleChange(key,option) {
        console.log(key)
          if(key == "CRM"){
           this.props.dispatch({
                type: 'system/SelectList',
                payload: {
                    "projectId":2
                }
            });
        }
    }
    addList(){
      this.setState({
        createModalVisible: true
      })
    }
    cx(){
        const value0 = $(".ant-select-selection-selected-value").html()
        const value1 = this.refs.input1.refs.input.value
        const value2 = this.refs.input2.refs.input.value
        const value3 = $(".SelectList").find(".ant-select-selection-selected-value").html()
        console.log("ssss", $(".ant-select-selection-selected-value").attr("index"))
        // this.props.dispatch({
        //     type: 'system/listByPage',
        //     payload: {
        //         "name": value1,
        //         "actionpath": value2,
        //         "id": null,
        //         "sortOrder": "string"
        //     }
        // });
    }
    qk(){
        $(".ant-select-selection-selected-value").html("请选择")
        $(".SelectList").find(".ant-select-selection-selected-value").html("")
        this.refs.input1.refs.input.value=""
        this.refs.input2.refs.input.value=""
    }
    render() {
        return (
            <div className="fromList">
              <span>主模块
                <Select defaultValue="请选择" style={{ width: 120 }} 
                onSelect={this.handleChange.bind(this)}>
                  {
                    this.props.data.map((item,index)=>{
                    return (
                        <Option value={item.name} key={index} >{item.name}</Option>
                    )
                  })}
                </Select>
              </span>
              <span className="SelectList">
              <SelectList/>
              </span>
              <span>名称
                <Input placeholder="请输入名称" ref="input1"/>
              </span>
              <span>路径
              <Input placeholder="请输入地址" ref="input2"/>
              </span>
              <i onClick={this.cx.bind(this)}>查询</i>
              <i onClick={this.qk.bind(this)}>清空</i>
               <i onClick={this.addList.bind(this)}>新增</i>
               <TabalList />
            </div>
        )
    }
}
function FromModal({
    dispatch,
    data,
    code
}) {
  return ( < div >
    < FromModaled dispatch = {
      dispatch
    }
    data = {
        data
    }
    / > < /div >
  )

}
function mapStateToProps(state) {
  const {
    data,
    code
  } = state.system;
  return {
    loading: state.loading.models.system,
    data
  };
}
export default connect(mapStateToProps)(FromModal)

