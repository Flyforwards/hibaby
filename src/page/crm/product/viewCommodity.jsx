"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
import { Link} from 'react-router'
import './commodity.scss'
import Current from '../../Current'
 import {local, session} from 'common/util/storage.js'
 import Delete from './DeleteCommodity.jsx'

const FormItem = Form.Item;
const Option = Select.Option;
let roomId = []

class ViewCommodityed extends Component {

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
    }
    delete() {
      let ID = window.location.search.split("=")[1]
      this.setState({
        DeleteVisible:true,
        ID:ID
      })
    }
    render() {
        let loadingName = true
        let roomInformation = []
        const { getFieldDecorator } = this.props.form;
        const columns = this.columns;
        let ListLnformation = []
        let roomList = []
        let selectData = []
        let ID = window.location.search.split("=")[1]
        if(this.props.roomFindById != null){
          this.props.roomFindById.roomNoList.map((item)=>{
            roomInformation.push(<span key= {item} className="roomColor">{item}</span>)
          })
        }
        const edit = !this.props.permissionAlias.contains('COMMODITY_EDIT');
        const del = !this.props.permissionAlias.contains('COMMODITY_DELETE');
        return (
            <div className="viewCommodity">
                <div className="viewCommodityList">
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
                      <Input disabled = { true }/>
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
                      disabled = { true }
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
                    <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} className="input" disabled = { true }/>
                    )}
                  </FormItem>
                  <FormItem
                     label="首字母"
                     className="nameLetter"
                  >
                  {getFieldDecorator('nameLetter', {
                    initialValue:this.props.commodityFindById?this.props.commodityFindById.nameLetter:null,
                    rules: [],
                    })(
                    <Input
                    disabled = {true}
                    />
                    )}
                  </FormItem>
                </Form>
                </div>
                <Button className="BackBtn" onClick={this.handleSubmit}>返回</Button>
                <Button disabled={del} className="delBtn" onClick={this.delete.bind(this)}>删除</Button>
                <Link to={{ pathname: '/crm/commodity/editcommodity', query:{ commodity:ID } }}><Button disabled={edit} className="SaveBtn">编辑</Button></Link>
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
    serviceListByPage,
    roomData,
    selectData,
    getDictionary,
    roomFindById,
    commodityFindById
  } = state.packageInfo;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.packageInfo,
    serviceListByPage,
    roomData,
    selectData,
    getDictionary,
    roomFindById,
    commodityFindById,
    permissionAlias
    };
}
const viewCommodity = Form.create()(ViewCommodityed);
export default connect(mapStateToProps)(viewCommodity)
