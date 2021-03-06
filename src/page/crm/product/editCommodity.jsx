"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
import { Link} from 'react-router'
import './commodity.scss'
import Current from '../../Current'
 import {local, session} from 'common/util/storage.js'
 import Delete from './DeleteSuite.jsx'

const FormItem = Form.Item;
const Option = Select.Option;
let str = null

class EditCommodityed extends Component {

    constructor(props) {
        super(props)
        this.state = {
          DeleteVisible: false
        }
    }
    componentWillMount() {
    }
    handleDeleteCancel(){
      this.setState({
        DeleteVisible: false,
      })
    }
    componentDidMount() {
        let ID = window.location.search.split("=")[1]
        this.props.dispatch({
          type: 'packageInfo/commodityFindById',
          payload: {
            "dataId" :ID
          }
        });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    roomClick(data,e){
      if(e.target.className == "roomColor"){
        e.target.className = "roomColorA"
        roomId[data] = data
      }else{
        e.target.className = "roomColor"
        roomId[data] = null
      }
    //  console.log(roomId)
    }
    delete() {
      let ID = window.location.search.split("=")[1]
      this.setState({
        DeleteVisible:true,
        ID:ID
      })
    }
    handleDeleteCancel(){
      this.setState({
          DeleteVisible: false,
      })
    }
    handleAdd(data){
      let ID = window.location.search.split("=")[1]
      const fields = this.props.form.getFieldsValue();
      this.props.dispatch({
        type: 'packageInfo/commodityFindEdit',
        payload: {
          "id":ID,
          "remark": fields.introduction,
          "price": fields.price,
          "name":fields.name,
          "nameLetter":fields.nameLetter,
        }
      });
    }
    chkvalue(e){
      if(e.target.value){
          this.props.dispatch({
            type: 'packageInfo/chineseToPinyin',
            payload: {
              "str": e.target.value
            }
          });
          this.setState({
            str:true
          })
        }
    }
    chineseToPinyin(){
      const fields = this.props.form.getFieldsValue();
      //console.log(fields.name)
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
        const { getFieldDecorator } = this.props.form;
        let ID = window.location.search.split("=")[1]
       if(this.props.chineseToPinyin != null){
        if(str == this.props.chineseToPinyin){
            str = null
          }else{
            str = this.props.chineseToPinyin
          }
        }
        return (
            <div className="editCommodity">
                <div className="editCommodityList">
                <p>商品信息:</p>
                <Form layout="inline">
                  <FormItem
                   label="商品名称"
                   className="name"
                  >
                    {getFieldDecorator('name', {
                      initialValue:this.props.commodityFindById?this.props.commodityFindById.name:null,
                      rules: [],
                    })(
                      <Input className="inputName" onBlur={this.chkvalue.bind(this)}/>
                    )}
                  </FormItem>
                  <FormItem
                     label="商品价格"
                     className="price"
                  >
                  {getFieldDecorator('price', {
                    initialValue:this.props.commodityFindById?this.props.commodityFindById.price:null,
                    rules: [],
                    })(
                    <Input
                      addonBefore="￥"
                      addonAfter='元'
                    />
                    )}
                  </FormItem>
                   <FormItem
                   label="商品简介"
                   className="introduction"
                   >
                    {getFieldDecorator('introduction', {
                      initialValue:this.props.commodityFindById?this.props.commodityFindById.remark:null,
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
                    initialValue:this.props.chineseToPinyin?this.props.chineseToPinyin:this.props.commodityFindById?this.props.commodityFindById.nameLetter:null,
                    rules: [],
                    })(
                    <Input
                    disabled = { true }
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
                <div className="button-group-bottom-common">
                  <Button className="button-group-bottom-1" onClick={this.handleSubmit}>返回</Button>
                  <Button className="button-group-bottom-2" onClick={this.handleAdd.bind(this)}>保存</Button>
                </div>
                <Delete
                  visible={ this.state.DeleteVisible }
                  onCancel ={ this.handleDeleteCancel.bind(this) }
                  ID = { this.state.ID }
                  serviceInfoList = { this.props.findById}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
  const {
    commodityFindById,
    chineseToPinyin
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    commodityFindById,
    chineseToPinyin
    };
}
const editCommodity = Form.create()(EditCommodityed);
export default connect(mapStateToProps)(editCommodity)
