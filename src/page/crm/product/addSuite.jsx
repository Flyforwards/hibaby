"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form,message} from 'antd'
import { Link} from 'react-router'
import './addSuite.scss'
import Current from '../../Current'
 import {local, session} from 'common/util/storage.js'

const FormItem = Form.Item;
const Option = Select.Option;

class AddSuiteed extends Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: false
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'packageInfo/serviceListByPage',
            payload: { }
        });
        this.props.dispatch({
            type: 'packageInfo/getDictionary',
            payload: {
              "abName":"TCLX" ,
              "softDelete": 0
            }
        });
        this.props.dispatch({
            type: 'packageInfo/selectData',
            payload: { }
        });
        this.props.dispatch({
            type: 'packageInfo/roomList',
            payload: { }
        });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(){
      const fields = this.props.form.getFieldsValue();
      this.props.form.validateFields((err, fieldsValue) => {
        if(!err){
          let roomIdList = []
      $(".roomColorA").each(function(){
        roomIdList.push($(this).attr("value"))
      })
      if(fields.name){
        if(fields.price){
          if(fields.introduction){
            this.props.dispatch({
              type: 'packageInfo/roomAdd',
              payload: {
                "description": fields.introduction,
                "price": fields.price,
                "name":fields.name,
                "roomIdList": roomIdList,
              }
            });
          }else{
            message.warning('请输入套房简介')
          }
        }else{
          message.warning('请输入套房价格')
        }
      }else{
        message.warning('请输入套房名称')
      }
        }
      })
    }
    roomClick(data,e){
      if(e.target.className == "roomColor"){
        e.target.className = "roomColorA"
      }else{
        e.target.className = "roomColor"
      }
    }
    render() {
        let loadingName = true
        let roomInformation = []
        const { getFieldDecorator } = this.props.form;
        let ListLnformation = []
        let roomList = []
        let selectData = []
        if(this.props.roomData != null){
          this.props.roomData.map((item)=>{
            roomInformation.push(<span key= {item.id} value={item.id} onClick={this.roomClick.bind(this,item.id)} className="roomColor">{item.roomNo}</span>)
          })
        }
        if(this.props.selectData != null){
          selectData = this.props.selectData.map((item)=>{
             return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }
        if(this.props.serviceListByPage != null){
            ListLnformation = this.props.serviceListByPage;
              ListLnformation.map((record)=>{
                record.key = record.id;
            });
            loadingName = false
        }
        if(this.props.selectData != null){
          selectData = this.props.selectData.map((item)=>{
            return (<Option value={item.id+""} key={item.id}>{item.name}</Option>)
          })
        }
        if(this.props.getDictionary != null){
          roomList = this.props.getDictionary.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }

        return (
          <div className="addSuite">
              <div className="addSuiteList">
              <p>套房信息:</p>
              <Form layout="inline">
                <FormItem
                 label="套房名称"
                 className="name"
                >
                  {getFieldDecorator('name', {
                     rules: [],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                   label="套房价格"
                   className="price"
                >
                {getFieldDecorator('price', {
                rules: [{
                  pattern: /^\d{0,7}$/, message: '请输入0-7位数字'
                }],
                  })(
                  <Input
                    addonBefore="￥"
                  />
                  )}
                </FormItem>
                 <FormItem
                 label="套房简介"
                 className="introduction"
                 >
                  {getFieldDecorator('introduction', {
                    rules: [],
                  })(
                  <Input type="textarea" rows={6} />
                  )}
                </FormItem>
              </Form>
              </div>
              <div className="roomName">
               <p>房间信息:</p>
                {
                  roomInformation
                }
              </div>
              <div className="button-group-bottom-common">
                <Button className="button-group-bottom-1" onClick={this.handleSubmit}>返回</Button>
                <Button className="button-group-bottom-2" onClick={this.handleAdd.bind(this)}>保存</Button>
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const {
    serviceListByPage,
    roomData,
    selectData,
    getDictionary
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceListByPage,
    roomData,
    selectData,
    getDictionary
    };
}
const addSuite = Form.create()(AddSuiteed);
export default connect(mapStateToProps)(addSuite)
