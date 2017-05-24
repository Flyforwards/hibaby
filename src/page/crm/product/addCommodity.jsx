"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form,message } from 'antd'
import { Link} from 'react-router'
import './commodity.scss'
import Current from '../../Current'
 import {local, session} from 'common/util/storage.js'

const FormItem = Form.Item;
const Option = Select.Option;
let str = null

class AddCommodityed extends Component {

    constructor(props) {
      super(props)
    }
    componentWillMount() {
    }
     onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRows });
      }
    componentDidMount() {
      if(str != null){
        str = null
      }
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(){
      const fields = this.props.form.getFieldsValue();
      if(fields.name){
        if(fields.price){
          if(fields.nameLetter){

          }else{
              message.warning("请输入首字母缩写");
          }

        }else{
          message.warning("请输入商品价格");
        }

      }else{
        message.warning("请输入商品名称");
      }


      this.props.dispatch({
        type: 'packageInfo/commodityAdd',
        payload: {
          "remark": fields.introduction,
          "price": fields.price,
          "name":fields.name,
          "nameLetter":fields.nameLetter,
        }
      });
    }
    chineseToPinyin(){
      const fields = this.props.form.getFieldsValue();
      if(fields.name){
        this.props.dispatch({
          type: 'packageInfo/chineseToPinyin',
          payload: {
            "str": fields.name
          }
        });
        this.setState({
          str:true
        })
      }else{
        message.warning('请先输入商品名称')
      }
    }
    render() {
        let loadingName = true
        let roomInformation = []
        const { getFieldDecorator } = this.props.form;
        const columns = this.columns;
        let ListLnformation = []
        let roomList = []
        let selectData = []
        if(this.props.chineseToPinyin != null){
          str = this.props.chineseToPinyin
        }
        return (
            <div className="addCommodity">
                <div className="addSuiteList">
                <p>商品信息:</p>
                <Form layout="inline">
                  <FormItem
                   label="商品名称"
                   className="name"
                  >
                    {getFieldDecorator('name', {
                       rules: [],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                     label="商品价格"
                     className="price"
                  >
                  {getFieldDecorator('price', {
                      rules: [],
                    })(
                    <Input 
                      addonBefore="￥"
                      addonAfter='元'
                    />
                    )}
                  </FormItem>
                   <FormItem
                   label="商品备注"
                   className="introduction"
                   >
                    {getFieldDecorator('introduction', {
                      rules: [],
                    })(
                    <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} className="input" />
                    )}
                  </FormItem>
                  <FormItem
                     label="首字母"
                     className="nameLetter"
                  >
                  {getFieldDecorator('nameLetter', {
                    rules: [],
                    })(
                    <Input 
                    disabled = {true}
                    />
                    )}
                  </FormItem>
                  <FormItem
                  >
                  {getFieldDecorator('button', {
                      rules: [],
                    })(
                    <span className="button" onClick={this.chineseToPinyin.bind(this)}>生成首字母</span>
                    )}
                  </FormItem>
                </Form>
                </div>
                <Button onClick={this.handleSubmit}>返回</Button>
                <Button type="primary" onClick={this.handleAdd.bind(this)}>保存</Button>
            </div>
        )
    }
}
function AddCommodity({
  dispatch,
  serviceListByPage,
  roomData,
  selectData,
  getDictionary,
  chineseToPinyin
}) {
  return ( < div >
    <AddCommodityed dispatch = {
      dispatch
    }
    selectData = {
      selectData
    }
    serviceListByPage = {
      serviceListByPage
    }
    roomData = {
      roomData
    }
    getDictionary = {
      getDictionary
    }
    chineseToPinyin = {
      chineseToPinyin
    }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    serviceListByPage,
    roomData,
    selectData,
    getDictionary,
    chineseToPinyin
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceListByPage,
    roomData,
    selectData,
    getDictionary,
    chineseToPinyin
    };
}
const addCommodity = Form.create()(AddCommodityed);
export default connect(mapStateToProps)(addCommodity)