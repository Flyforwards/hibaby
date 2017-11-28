/**
 * Created by Flyforwards on 2017/11/21.
 */

import React,{ Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col,Table,Popconfirm } from 'antd';
import { Link,routerRedux } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create
import moment from 'moment'
import './inventoryIndex.scss'

@createForm()
class WarehouseIndex extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.columns = [{
      title: '仓库名称',
      dataIndex: 'warehouseName',
      key: 'warehouseName'
    }, {
      title: '所属机构',
      dataIndex: 'belongOrganization',
      key: 'belongOrganization'
    }, {
      title: '管理人',
      dataIndex: 'managerName',
      key: 'managerName'
    }, {
      title: '联系方式',
      dataIndex: 'mobile',
      key: 'mobile',
    },{
      title: '仓库状态',
      dataIndex: 'status',
      key: 'status',
      render:(text,record, index) => {
        if(text == '0'){
          return "正常"
        }
        if(text == "1"){
          return "停用"
        }
      }
    },{
      title: '最后编辑时间',
      dataIndex: 'operatorTime',
      key: 'operatorTime',
      render:(text,record,index) => {
        return moment(text).format("YYYY-MM-DD")
      }
    }, {
      title: '操作',
      dataIndex: 'operating',
      render: (text, record, index) => {
        return (
          <div className="operation-list">
            <Link className="one-link link-style" onClick={ this.onLook.bind(this, record)}> 查看 </Link>
            <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(record.id)}>
              <Link  className="two-link link-style">删除</Link>
            </Popconfirm>
          </div>
        );
      }
    }];

  }

  //点击查看
  onLook(record){
    this.props.dispatch(
      routerRedux.push({
        pathname:'/inventory/warehouse/detail',
        query:{
          id:record.id
        }
      })
    )
  }
  //点击删除
  onDelete(id){
    this.props.dispatch({
      type:'inventory/deleteWarehouse',
      payload:{
        'id':id
      }
    })
  }
//搜索
  handleSearch(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(routerRedux.push({
          pathname: "/inventory/warehouse",
          query: values
        }))
      }
    })
  }

  //重置
  onReset(){
    const { pathname } = location;
    this.props.dispatch(routerRedux.push({
      pathname
    }))
    this.props.form.resetFields()
  }

  //创建
  handleCreate(){
    this.props.dispatch(
      routerRedux.push({
        pathname:'/inventory/warehouse/edit'
      })
    )
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'inventory/removeData' })
  }
  render(){
    const { pagination ,dispatch,pageList,loading} = this.props;
    const { getFieldDecorator } = this.props.form;


    const formItemLayout = {
      labelCol: {
        span:1
      },
      wrapperCol: {
        span:24
      },
    }

    const tableProps = {
      loading:loading,
      pagination:pagination,
      dataSource:pageList,
      onChange: (page) => {
        dispatch({
          type: 'inventory/getWarehousePageList',
          payload: {
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
            <Col span={12} style={{marginRight:'10px'}}>
            <Form >
              <FormItem {...formItemLayout} label="" >
                {getFieldDecorator('sear', {rules: [{ required: false, message: '' }],
                })(
                  <Input placeholder="请输入仓库名字、所属机构来搜索仓库" />
                )}
              </FormItem>
            </Form>
          </Col>
            <Col span={6}>
              <Button className="button-group-bottom-2"  onClick={ this.handleSearch.bind(this) } style={{marginRight:'10px'}}> 搜索 </Button>
              <Button className="button-group-bottom-3"  onClick={ this.onReset.bind(this) }> 重置 </Button>
            </Col>
            <Col span={4}>
              <Button className="button-group-bottom-1"  onClick={ this.handleCreate.bind(this) }> 创建 </Button>
            </Col>
          </Row>
          <Row>
            <Table className="info-card-center" columns={this.columns} bordered rowKey="id" { ...tableProps }/>
          </Row>
        </Card>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { pagination,pageList } = state.inventory;
  return{
    loading: state.loading.models.inventory,
    pagination,
    pageList
  };
}

export default connect(mapStateToProps)(WarehouseIndex);
