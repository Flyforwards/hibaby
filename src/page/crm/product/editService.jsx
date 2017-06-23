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
            let count = 1
            if(this.props.findById != null){
              this.props.findById.serviceInfoList.map((item)=>{
                if(item.serviceInfoId == record.id){
                  count = item.usageCount
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
          selectedRowKeys:[],
          isNess: false
        };
        this.TableEdit = false
    }

    onSelectChange = (selectedRowKeys,selectedRows) => {
      this.setState({ selectedRows,selectedRowKeys });
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
          const { selectedRowKeys} = this.state;
          if(selectedRowKeys && selectedRowKeys.length>=1){
            serviceInfoList = selectedRowKeys.map((item)=>{

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
          console.log(values);
          console.log(serviceInfoList);
          return;
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
    onSelect(value, option){
      let isNess = false;
      if (option && option.props.title == "月子套餐") {
        isNess = true;
      }
      this.setState({
        isNess
      })
    }
    render() {
        let levels = []
        let rowSelection = {}
        const { getFieldDecorator } = this.props.form;
        const { serviceList, grade, } = this.props;
        const { selectedRowKeys } = this.state;
        const columns = this.columns;
        let roomList = []
        let type = []
        const ListLnformation = serviceList.map((record)=>{
            record.key = record.id;
            return record;
        });




        if(this.props.getDictionary != null &&　this.props.findById != null){
          roomList = this.props.getDictionary.map((item)=>{
            if(item.id == this.props.findById.type){
              type = String(item.id)
            }
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
          })
        }
        if(this.props.findById){
        let data = [];
        levels.push(String(this.props.findById.levels))
          if(this.props.findById.isUse == 1){
              this.TableEdit = true
          }else{
              this.TableEdit = false
          }
          this.props.findById.serviceInfoList.map((record)=>{
              data.push(record.serviceInfoId)
          });
          rowSelection = {
              selectedRowKeys,
              onChange: this.onSelectChange,
              getCheckboxProps: record => ({
                disabled: this.TableEdit,
              }),
          };
        }

      const botton_div = (
        <div className="addServiceinfoSuite">
          <p>选择套房<span className="roomVist">(只有月子套餐才可以选择套房)</span>:</p>
          <Form layout="inline">
            <FormItem
              label="套房"
              className="room"
            >
              { getFieldDecorator('room', { rules: [],
              })( <Select>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="套餐等级"
              className="packageLevel"
            >
              {getFieldDecorator('packageLevel', { rules: [],
              })( <Select>
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
                      initialValue:this.props.findById?this.props.findById.name:null,
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
                    initialValue:this.props.findById?this.props.findById.price:null,
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
                      initialValue:type,
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
                { this.state.isNess ? botton_div : null }
                <Button className="BackBtn" onClick={this.handleSubmit}>返回</Button>
                <Button className="SaveBtn" onClick={this.handleAdd.bind(this)}>保存</Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const {
    serviceList,
    selectData,
    findById,
    grade,
    getDictionary
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceList,
    selectData,
    findById,
    grade,
    getDictionary
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
