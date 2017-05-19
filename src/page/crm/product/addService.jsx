"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form } from 'antd'
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
        }, {
          title: '服务项价格',
          dataIndex: 'price',
          key:'price',
        }, {
          title: '服务项目内容',
          dataIndex: 'suiteId',
          key:'suiteId',
        },{
          title: '使用次数',
          dataIndex: 'usageCount',
          key: 'usageCount',
          render: (text, record, index) => {
            return (
                <span>
                  <Input defaultValue ={1}/>
                </span>
            );
          },
        }];
    }
    //删除
    delete(record) {
    console.log(record)

    // this.props.dispatch({
    //     type: 'packageInfo/listByPage',
    //     payload: {
    //         "dataId":record.id
    //     }
    // })
     this.props.dispatch({
        type: 'packageInfo/serviceListByPage',
        payload: { }
    });
    }
    checkPrice = (rule, value, callback) => {
      if (value.number > 0) {
        callback();
        return;
      }
      callback('Price must greater than zero!');
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'packageInfo/serviceListByPage',
            payload: {
               "page": 1,
               "size": 10
            }
        });
    }
    render() {
        console.log("dad",this.props.serviceListByPage)
        const { getFieldDecorator } = this.props.form;
        console.log("sds",this.props.total)
        let ListLnformation = []
        const columns = this.columns;
        if(this.props.list != null){
            ListLnformation = this.props.list;
              ListLnformation.map((record)=>{
                record.key = record.id;
            });
        }
        const { size } = this.props;
        const state = this.state;
        const rowSelection = {
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',    // Column configuration not to be checked
          }),
        };
        return (
            <div className="addServiceinfo">
                <div className="addServiceinfoList">
                <p>套餐信息:</p>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <FormItem
                   label="套餐名称"
                   className="name"
                  >
                    {getFieldDecorator('name', {
                       rules: [],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                     label="套餐价格"
                     className="price"
                  >
                  {getFieldDecorator('price', {
                      rules: [],
                    })(
                     <Input />
                    )}
                  </FormItem>
                   <FormItem
                   label="套餐类型"
                   >
                    {getFieldDecorator('type', {
                      rules: [],
                    })(
                    <Select
                    >
                      <Option value="0">主套餐</Option>
                      <Option value="1">次套餐</Option>
                    </Select>
                    )}
                  </FormItem>
                </Form>
                </div>
                <div className="addServiceinfoTable">
                  <Table bordered 
                    rowSelection={rowSelection} 
                    dataSource={ListLnformation}
                    columns={ columns } 
                    
                  />
                </div>  
            </div>
        )
    }
}
function AddService({
  dispatch,
  serviceListByPage,
  total,
  page,
  results,
  range
}) {
  return ( < div >
    <AddServiceed dispatch = {
      dispatch
    }
    serviceListByPage = {
      serviceListByPage
    }
    total = {
      total
    }
    page={page}
    results={results}
    range={range}
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    serviceListByPage,
    total,
    page,
    results,
    range
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    serviceListByPage,
    total,
    page,
    results,
    range
    };
}
const addService = Form.create()(AddServiceed);
export default connect(mapStateToProps)(addService)
