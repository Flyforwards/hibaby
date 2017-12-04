/**
 * Created by Flyforwards on 2017/11/21.
 */

import React, { Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col, Table, Popconfirm } from 'antd';
import { Link, routerRedux } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create
import moment from 'moment'
import '../warehouse/inventoryIndex.scss'

@createForm()
class InventoryIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.columns = [{
      title: '存货编码',
      dataIndex: 'goodsId',
      key: 'goodsId'
    }, {
      title: '存货名称',
      dataIndex: 'goodsName',
      key: 'goodsName'
    }, {
      title: '辅助属性',
      dataIndex: 'resultValue',
      key: 'resultValue'
    }, {
      title: '规格型号',
      dataIndex: 'specificationModel',
      key: 'specificationModel'
    }, {
      title: '存货分类',
      dataIndex: 'inventoryClasses',
      key: 'inventoryClasses'
    }, {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit'
    }, {
      title: '售价',
      dataIndex: 'price',
      key: 'price',
      render: (text, record, index) => {
        return `${text}/件`
      }
    }, {
      title: '更新时间',
      dataIndex: 'operatorTime',
      key: 'operatorTime',
      render: (text, record, index) => {
        return moment(text).format("YYYY-MM-DD")
      }
    }];
    
  }
  
  //搜索
  handleSearch() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        values.size = 10;
        values.page = 1;
        
        this.props.dispatch({
          type: 'inventory/getInventoryList',
          payload: values
        })
        this.setState({
          sear: values.sear
        })
      }
    })
  }
  
  //重置
  onReset() {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'inventory/getInventoryList',
      payload: { page: 1, size: 10 }
    })
    this.setState({
      sear: null
    })
  }
  
  componentWillUnmount() {
    this.props.dispatch({ type: 'inventory/removeData' })
  }
  
  render() {
    const { inventoryPagination, dispatch, inventoryData, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    
    const formItemLayout = {
      labelCol: {
        span: 1
      },
      wrapperCol: {
        span: 24
      }
    }
    
    const tableProps = {
      loading: loading,
      pagination: inventoryPagination,
      dataSource: inventoryData,
      onChange: (page) => {
        dispatch({
          type: 'inventory/getInventoryList',
          payload: this.state.sear ?
            {
              'page': page.current,
              'size': page.pageSize,
              'sear': this.state.sear,
              'sortField': "operatorTime",
              'sortOrder': "desc"
            } : {
              'page': page.current,
              'size': page.pageSize,
              'sortField': "operatorTime",
              'sortOrder': "desc"
            }
        })
      }
    };
    
    return (
      <div className="inventoryIndex">
        <Card>
          <Row>
            <Col span={12} style={{ marginRight: '10px' }}>
              <Form >
                <FormItem {...formItemLayout} label="">
                  {getFieldDecorator('sear', {
                    rules: [{ required: false, message: '' }]
                  })(
                    <Input placeholder="请输入存货名称搜索存货"/>
                  )}
                </FormItem>
              </Form>
            </Col>
            <Col span={6}>
              <Button className="button-group-bottom-2" onClick={ this.handleSearch.bind(this) } style={{ marginRight: '10px' }}>
                搜索 </Button>
              <Button className="button-group-bottom-3" onClick={ this.onReset.bind(this) }> 重置 </Button>
            </Col>
          </Row>
          <Row>
            <Table className="info-card-center" dataSource={inventoryData} columns={this.columns} bordered rowKey="id" { ...tableProps }/>
          </Row>
        </Card>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    ...state.inventory
  };
}

export default connect(mapStateToProps)(InventoryIndex);
