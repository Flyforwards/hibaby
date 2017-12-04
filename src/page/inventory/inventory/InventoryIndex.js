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
import '../warehouse/inventoryIndex.scss'

@createForm()
class InventoryIndex extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.columns = [{
      title: '存货编码',
      dataIndex: 'goodsId',
      key: 'goodsId'
    }, {
      title: '存货名称',
      dataIndex: 'inventoryName',
      key: 'inventoryName'
    }, {
      title: '辅助属性',
      dataIndex: 'resultValue',
      key: 'resultValue'
    },{
      title: '规格型号',
      dataIndex: 'specificationModel',
      key: 'specificationModel'
    }, {
      title: '存货分类',
      dataIndex: 'inventoryClasses',
      key: 'inventoryClasses',
    },{
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit'
    },{
      title: '售价',
      dataIndex: 'price',
      key: 'price'
    },{
      title: '更新时间',
      dataIndex: 'operatorTime',
      key: 'operatorTime',
      render:(text,record,index) => {
        return moment(text).format("YYYY-MM-DD")
      }
    }];

  }

  // //点击查看
  // onLook(record){
  //   this.props.dispatch(
  //     routerRedux.push({
  //       pathname:'/inventory/warehouse/detail',
  //       query:{
  //         id:record.id
  //       }
  //     })
  //   )
  // }
  // //点击删除
  // onDelete(id){
  //   this.props.dispatch({
  //     type:'inventory/deleteWarehouse',
  //     payload:{
  //       'id':id
  //     }
  //   })
  // }
//搜索
  handleSearch(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(routerRedux.push({
          pathname: "/inventory/getInventoryList",
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

  componentWillUnmount() {
    this.props.dispatch({ type: 'inventory/removeData' })
  }
  render(){
    const { inventoryPagination ,dispatch,inventoryData,loading} = this.props;
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
      pagination:inventoryPagination,
      dataSource:inventoryData,
      onChange: (page) => {
        dispatch({
          type: 'inventory/getInventoryList',
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
                    <Input placeholder="请输入存货名称搜索存货" />
                  )}
                </FormItem>
              </Form>
            </Col>
            <Col span={6}>
              <Button className="button-group-bottom-2"  onClick={ this.handleSearch.bind(this) } style={{marginRight:'10px'}}> 搜索 </Button>
              <Button className="button-group-bottom-3"  onClick={ this.onReset.bind(this) }> 重置 </Button>
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
  const { inventoryPagination,inventoryData } = state.inventory;
  return{
    loading: state.loading.models.inventory,
    inventoryPagination,
    inventoryData
  };
}

export default connect(mapStateToProps)(InventoryIndex);
