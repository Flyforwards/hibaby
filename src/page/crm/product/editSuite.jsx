"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
import { Link} from 'react-router'
import './viewSuite.scss'
 import {local, session} from 'common/util/storage.js'
 import Delete from './DeleteSuite.jsx'

const FormItem = Form.Item;
const Option = Select.Option;

class EditSuiteed extends Component {

    constructor(props) {
        super(props)
    }
    componentWillMount() {
    }
    componentDidMount() {
        let ID = window.location.search.split("=")[1]
        this.props.dispatch({
            type: 'packageInfo/roomList',
            payload: { }
        });
         this.props.dispatch({
            type: 'packageInfo/roomFindById',
            payload: { 
              "dataId":ID
            }
        });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(){
      let ID = window.location.search.split("=")[1]
      const fields = this.props.form.getFieldsValue();
      let roomIdList = []
     $(".roomColorA").each(function(){
        roomIdList.push($(this).attr("value"))
      })
       if(fields.name){
        if(fields.price){
          if(fields.introduction){
            this.props.dispatch({
              type: 'packageInfo/roomEdit',
              payload: {
                "id":ID,
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
     this.props.dispatch({
        type: 'packageInfo/suiteListByPage',
        payload: {
          "page":1,
          "size":10
        }
      });
    }
    roomClick(data,e){
      if(e.target.className == "roomColor"){
        e.target.className = "roomColorA"
      }else{
        e.target.className = "roomColor"
      }
    }
    render() {
        let roomInformation = []
        const { getFieldDecorator } = this.props.form;
        let roomList = []
        if(this.props.roomData != null){
          this.props.roomData.map((item)=>{
            roomInformation.push(<span key= {item.id} value={item.id} onClick={this.roomClick.bind(this,item.id)} className="roomColor">{item.roomNo}</span>)
          })
        }
        if(this.props.roomFindById){
          this.props.roomFindById.roomList.map((item)=>{
            roomInformation.push(<span  key={item.id} value={item.id} onClick={this.roomClick.bind(this,item.id)} className="roomColorA">{item.roomNo}</span>)
          })
        }
        return (
            <div className="editSuite">
                <div className="viewSuiteList">
                <p>套房信息:</p>
                <Form layout="inline">
                  <FormItem
                   label="套房名称"
                   className="name"
                  >
                    {getFieldDecorator('name', {
                      initialValue:this.props.roomFindById?this.props.roomFindById.name:null,
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
                    initialValue:this.props.roomFindById?this.props.roomFindById.price:null,
                    rules: [],
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
                      initialValue:this.props.roomFindById?this.props.roomFindById.description:null,
                      rules: [],
                    })(
                    <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} className="input"/>
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
                <Button onClick={this.handleSubmit}>返回</Button>
                <Button type="primary" onClick={this.handleAdd.bind(this)}>保存</Button>
            </div>
        )
    }
}
function EditSuite({
  dispatch,
  roomData,
  roomFindById
}) {
  return ( < div >
    <EditSuiteed dispatch = {
      dispatch
    }
    roomData = {
      roomData
    }
    roomFindById = {
      roomFindById
    }
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    roomData,
    roomFindById
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    roomData,
    roomFindById
    };
}
const editSuite = Form.create()(EditSuiteed);
export default connect(mapStateToProps)(editSuite)
