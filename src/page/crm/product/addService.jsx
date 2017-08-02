"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form ,InputNumber, message} from 'antd'
import { Link} from 'react-router'
import './serviceinfo.scss'
import Current from '../../Current'
 import {local, session} from 'common/util/storage.js'

const FormItem = Form.Item;
const Option = Select.Option;

class AddServiceed extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'name',
          key:'name',
          width: "20%",
        }, {
          title: '服务项价格',
          dataIndex: 'price',
          key:'price',
          width: "20%",
          render:(text,record,index) => {
            let price = "￥"+record.price
            return (
              price
            )
          }
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key:'contents',
          width: "40%",
        },{
          title: '使用次数',
          dataIndex: 'usageCount',
          key: 'usageCount',
          width: "20%",
          render: (text, record, index) => {
            const onChange=(number)=>{
              this.state.selectedRows.map(item=> {
                if (item.id == record.id) {
                  item.usageCount = number;
                }
              });
              record.usageCount = number
            }
            return (
                <span className="span" id={index}>
                  <InputNumber defaultValue={record.usageCount} max={999} min={1} onChange = {onChange}/>
                </span>
            );
          },
        }];
        this.state = {
          selectedRows: [],
          loading: false,
          isNess: false
        };
    }

    onSelect(value, option){
      let isNess = false;
      if (option && option.props.title == "月子套餐") {
        isNess = true;
      }
      this.setState({
        isNess
      })
    }
    onSelectChange = ( selectedRowKeys, selectedRows) => {
      this.setState({ selectedRows });
    }

    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(){
      this.props.form.validateFields((err, values) => {
        if(!err){
          let serviceInfoList = [];
          const { selectedRows} = this.state;
          if(selectedRows && selectedRows.length>=1){
            serviceInfoList = selectedRows.map((item)=>{
              return {"serviceInfoId":item.id,"usageCount":Number(item.usageCount),}
            })
          } else {
            message.error('至少选择一个服务项目!');
            return;
          }

          // 是月子套餐
          if (this.state.isNess) {
            if (!values.packageLevel) {
              message.error('请选择套餐级别!')
              return;
            }
            if (!values.room) {
              message.error('请选择套房!');
              return;
            }
          } else {
            values.packageLevel = undefined;
            values.room = undefined;
          }
          this.props.dispatch({
            type: 'packageInfo/add',
            payload: {
              "name": values.name,
              "price": values.price,
              "serviceInfoList":serviceInfoList,
              "suiteId": values.room,
              "type": values.type,
              "levels":values.packageLevel
            }
          });
        }
      })
    }
    componentWillUnmount(){
      this.props.serviceList.map(record=>{
        record.usageCount = 1;
      })
    }
    render() {
        const { form, serviceList, selectData, grade } = this.props;
        const { getFieldDecorator } = form;
        let len = 1
        const columns = this.columns;
        let roomList = []
        let roomOption = []
        let gradeList = []
        if(selectData){
          roomOption = selectData.map((item)=>{
             return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }

        const ListLnformation = serviceList.map((record)=>{
          record.key = record.id;
          return record;
        });

        if(grade){
          gradeList = grade.map((item)=>{
            return (<Option value={item.id+""} key={item.id}>{item.name}</Option>)
          })
        }
        if(this.props.getDictionary != null){
          roomList = this.props.getDictionary.map((item)=>{
            return (<Option value={item.id+""} title={item.name} key={item.id}>{item.name}</Option>)
          })
          if(roomList.length>10){
            len = 10
          }else{
            len = roomList.length
          }
        }

        const { selectedRows } = this.state;
        const rowSelection = {
            selectedRows,
            onChange: this.onSelectChange,
        };


        const botton_div = (
          <div className="addServiceinfoSuite">
            <p>选择套房<span className="roomVist">(只有月子套餐才可以选择套房)</span>:</p>
            <Form layout="inline">
              <FormItem
                label="套房"
                className="room"
              >
                { getFieldDecorator('room', { rules: [],
                })( <Select >
                    { roomOption }
                  </Select>
                )}
              </FormItem>
              <FormItem
                label="套餐等级"
                className="packageLevel"
              >
                {getFieldDecorator('packageLevel', { rules: [],
                })( <Select>
                    { gradeList  }
                  </Select>
                )}
              </FormItem>
            </Form>
          </div>)
        return (
            <div className="addServiceinfo">
                <div className="addServiceinfoList">
                <p>套餐信息:</p>
                <Form layout="inline">
                  <FormItem
                   label="套餐名称"
                   className="name"
                  >
                    {getFieldDecorator('name', { rules: [{ required: true, message: '请填写套餐名称！限30字',max: 30 }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                     label="套餐价格"
                     className="price"
                  >
                  {getFieldDecorator('price', {  rules: [{ required: true,pattern: /^\d{0,7}$/, message: '请输入0-7位数字' }],
                    })(
                    <Input addonBefore="￥" />
                    )}
                  </FormItem>
                   <FormItem
                   label="套餐类型"
                   >
                    {getFieldDecorator('type', { rules: [{ required: true, message: '请选择套餐类型！' }],
                    })(
                    <Select dropdownStyle= {{height:`${len*40}px`,overflow:"auto"}} onSelect = {this.onSelect.bind(this)} >
                     {
                      roomList
                     }
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <div className="addServiceinfoTable">
                  <Table bordered
                    rowSelection={ rowSelection }
                    columns={ columns }
                    dataSource={ ListLnformation }
                    pagination = { false }
                    scroll={{ y: 470 }}
                  />
                </div>
                { this.state.isNess ? botton_div : null }
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
    serviceList,
    roomData,
    selectData,
    getDictionary,
    grade
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceList,
    roomData,
    selectData,
    getDictionary,
    grade
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
