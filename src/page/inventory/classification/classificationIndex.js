import React, { Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col, Table, Popconfirm, Modal, Select } from 'antd';
import { Link, routerRedux } from 'react-router';
import '../warehouse/inventoryIndex.scss'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;
import moment from 'moment'
import AddModal from './addModal'
import EditModal from './editModal'

@createForm()
class ClassificationIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    
  }
  
  
  //搜索
  handleSearch() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.size = 10;
        values.page = 1;
        this.props.dispatch({
          type: 'classification/getStockPageList',
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
      type: 'classification/getStockPageList',
      payload: { page: 1, size: 10 }
    })
    this.setState({
      sear: null
    })
  }
  
  //创建
  changeVisibleAdd(isChangge) {
    this.props.dispatch({
      type: 'classification/changeVisibleAdd',
      payload: isChangge
    })
  }
  
  
  changeVisibleView(isChangge) {
    this.props.dispatch({
      type: 'classification/changeVisibleView',
      payload: isChangge
    })
  }
  
  //查看
  getStockDetailById(data) {
    this.props.dispatch({
      type: 'classification/getStockDetailById',
      payload: { dataId: data.id }
    })
  }
  
  onDelete(dataId) {
    this.props.form.resetFields();
    this.setState({
      sear: null
    });
    this.props.dispatch({
      type: 'classification/deleteStock',
      payload: { dataId }
    })
  }
  
  getColumns() {
    let columns = [{
      title: '分类名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '上级分类',
      dataIndex: 'parentId',
      key: 'parentId',
      render: (text, record, index) => {
        let name = '无'
        this.props.parent.map((v, k) => {
          if (v.id == text) {
            return name = v.name
          }
        })
        return name;
      }
    }, {
      title: '属性',
      dataIndex: 'type',
      key: 'type',
      render: (text, record, index) => {
        if (text == 1) {
          return <span>主类</span>
        }
        if (text == 2) {
          return <span>子类</span>
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operating',
      render: (text, record, index) => {
        return (
          <div className="operation-list">
            <Link className="one-link link-style" onClick={ this.getStockDetailById.bind(this, record)}> 查看 </Link>
            <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(record.id)}>
              <Link className="two-link link-style">删除</Link>
            </Popconfirm>
          </div>
        );
      }
    }]
    
    return columns
  }
  
  render() {
    const { pagination, dispatch, pageList, loading, stockPageList } = this.props;
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
      pagination: pagination,
      dataSource: pageList,
      onChange: (page) => {
        dispatch({
          type: 'classification/getStockPageList',
          payload: this.state.sear ?
            {
              'page': page.current,
              'size': page.pageSize,
              'sear': this.state.sear
            } : {
              'page': page.current,
              'size': page.pageSize
            }
        })
      }
    };
    
    return (
      <div className="inventoryIndex">
        <AddModal/>
        <EditModal/>
        
        <Card>
          <Row>
            <Col span={12} style={{ marginRight: '10px' }}>
              <Form >
                <FormItem {...formItemLayout} label="">
                  {getFieldDecorator('sear', {
                    rules: [{ required: false, message: '' }]
                  })(
                    <Input placeholder="请输入存货分类进行搜索"/>
                  )}
                </FormItem>
              </Form>
            </Col>
            <Col span={6}>
              <Button className="button-group-bottom-2" onClick={ this.handleSearch.bind(this) } style={{ marginRight: '10px' }}>
                搜索 </Button>
              <Button className="button-group-bottom-3" onClick={ this.onReset.bind(this) }> 重置 </Button>
            </Col>
            <Col span={4}>
              <Button className="button-group-bottom-1" onClick={this.changeVisibleAdd.bind(this, true)}>
                创建 </Button>
            </Col>
          </Row>
          <Row>
            <Table {...tableProps} className="info-card-center" columns={ this.getColumns()} bordered rowKey="id" dataSource={stockPageList }/>
          </Row>
        </Card>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    ...state.classification
  };
}

export default connect(mapStateToProps)(ClassificationIndex);
