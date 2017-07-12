"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form,message,InputNumber } from 'antd'
import { Link} from 'react-router'
import './serviceinfo.scss'
import Current from '../../Current'

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
            const { packageItem } = this.props;
            if(packageItem.serviceInfoList){
              packageItem.serviceInfoList.map((item)=>{
                if(item.serviceInfoId == record.id){
                  record.usageCount = item.usageCount
                }
              })
            }
            return (
              <span className="span">
                  <InputNumber defaultValue={record.usageCount} max={999} min={1} onChange={(number)=>{
                    record.usageCount = number
                  }}/>
                </span>
            );
          },
        }];
        this.state = {
            visible: true
        };
        this.first = true;
        this.defaultVisible = false;
        this.TableEdit = false
    }

    onSelectChange = (selectedRowKeys) => {
      this.props.dispatch({
        type: 'packageInfo/changeSelect',
        payload: { selectedRowKeys }
      });
    }

    componentDidMount() {
      let ID = window.location.search.split("=")[1]
        this.props.dispatch({
            type: 'packageInfo/findById',
            payload: {
              "dataId":ID
            }
        });
        this.props.dispatch({
            type: 'packageInfo/getServiceList',
            payload: { }
        });
        this.props.dispatch({
            type: 'packageInfo/selectData',
            payload: { }
        });
         this.props.dispatch({
            type: 'packageInfo/getCardLevel',
            payload: { }
        });
        this.props.dispatch({
            type: 'packageInfo/getDictionary',
            payload: {
              "abName":"TCLX" ,
              "softDelete": 0
            }
        });
    }
    handleSubmit = ()=>{
      history.go(-1)
    }
    handleAdd(){
      this.props.form.validateFields((err, values) => {
        if(!err){
          let serviceInfoList = [];
          const { selectedRowKeys, serviceList, packageItem } = this.props;
          if( selectedRowKeys.length>=1){
             selectedRowKeys.map((item)=>{
              serviceList.map((record)=>{
                if (record.id == item) {
                  serviceInfoList.push({"serviceInfoId": record.id, "usageCount": Number(record.usageCount),})
                }
              })
            })
          } else {
            message.error('至少选择一个服务项目!');
            return;
          }
          let visible = this.defaultVisible
          if (!this.first) {
            visible = this.state.visible;
          }
          // 是月子套餐
          if (visible) {
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
          values.id = packageItem.id;
          this.props.dispatch({
            type: 'packageInfo/edit',
            payload: {
              "name": values.name,
              "price": values.price,
              "serviceInfoList":serviceInfoList,
              "suiteId": values.room,
              "type": values.type,
              "levels":values.packageLevel,
              'id': values.id,
            }
          });
        }
      })
    }

    onSelect(value, option){
      let visible = false;
      if (option && option.props.title == "月子套餐") {
        visible = true;
      }
      this.first = false;
      this.setState({
        visible: visible
      })
    }
    render() {

        let rowSelection = {}
        const { getFieldDecorator,  } = this.props.form;
        const { serviceList, grade, selectData, packageItem, selectedRowKeys } = this.props;
        const columns = this.columns;
        let roomList = []
        let roomOption = []
        let gradeList = []
        const ListLnformation = serviceList.map((record)=>{
            record.key = record.id;
            return record;
        });

        if(selectData){
          roomOption = selectData.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }
        if(grade){
          gradeList = grade.map((item)=>{
            return (<Option value={item.id+""} key={item.id}>{item.name}</Option>)
          })
        }

        if(this.props.getDictionary != null &&　packageItem.type){
          roomList = this.props.getDictionary.map((item)=>{
            return (<Option value={item.id+""} title={item.name} key={item.name}>{item.name}</Option>)
          })
        }
        if(packageItem.name){
          if(packageItem.isUse == 1){
              this.TableEdit = true
          }else{
              this.TableEdit = false
          }
          rowSelection = {
              selectedRowKeys,
              onChange: this.onSelectChange,
              getCheckboxProps: record => ({
                disabled: this.TableEdit,
              }),
          };
        }


      if (packageItem.suiteId) {
          this.defaultVisible = true;
      } else {
          this.defaultVisible = false;
      }
      let visible = this.defaultVisible
      if (!this.first) {
        visible = this.state.visible;
      }

      const botton_div = (
        <div className="addServiceinfoSuite">
          <p>选择套房<span className="roomVist">(只有月子套餐才可以选择套房)</span>:</p>
          <Form layout="inline">
            <FormItem
              label="套房"
              className="room"
            >
              { getFieldDecorator('room', { rules: [],initialValue: packageItem.suiteId?String(packageItem.suiteId):packageItem.suiteId,
              })( <Select>
                { roomOption }
                </Select>
              )}
            </FormItem>
            <FormItem
              label="套餐等级"
              className="packageLevel"
            >
              {getFieldDecorator('packageLevel', { rules: [],initialValue: packageItem.levels?String(packageItem.levels):packageItem.levels,
              })( <Select>
                { gradeList }
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
                    {getFieldDecorator('name', {
                      initialValue: packageItem.name,
                      rules:  [{ required: true, message: '请填写套餐名称！限30字',max: 30 }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                     label="套餐价格"
                     className="price"
                  >
                  {getFieldDecorator('price', {
                    initialValue: packageItem.price,
                    rules: [{ required: true,pattern: /^\d{0,7}$/, message: '请输入0-7位数字' }],
                    })(
                    <Input
                      addonBefore="￥"
                      disabled = {this.TableEdit}
                    />
                    )}
                  </FormItem>
                   <FormItem
                   label="套餐类型"
                   >
                    {getFieldDecorator('type', {
                      initialValue: packageItem.type ? String(packageItem.type): packageItem.type,
                      rules: [{ required: true, message: '请选择套餐类型！' }],
                    })(
                    <Select onSelect = {this.onSelect.bind(this)} disabled={this.TableEdit}
                    >
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
                    rowSelection={rowSelection}
                    columns={ columns }
                    dataSource={ListLnformation}
                    pagination = { false }
                    scroll={{ y: 500 }}
                    defaultExpandedRowKeys = {ListLnformation}
                    />
                </div>
                { visible ? botton_div : null }
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
    selectData,
    packageItem,
    grade,
    getDictionary,
    selectedRowKeys
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceList,
    selectData,
    packageItem,
    grade,
    getDictionary,
    selectedRowKeys
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
