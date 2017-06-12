/**
 * 菜品库列表页
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"

import React from 'react';
import {connect} from 'dva';
import {message, Button, Icon,Table,Form,Row,Col,Input,Select} from 'antd';
import DishesLeft from './DishesLeft'
import DishesIndexCss from './DishesIndex.scss';
import Current from '../../Current';
import { Link } from 'react-router'
const FormItem = Form.Item;
const Option = Select.Option

class DishesIndex extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      pagination : {
        current : 1,
        showQuickJumper: true,
        pageSize: 10
      },
      nodeid : null

    }
    this.columns = [{
      title: '序号',
      dataIndex: 'identifier',
      key:'identifier',
      width: '10%',
    },{
      title: '菜品名',
      dataIndex: 'name',
      key:'name',
      width: '10%',
    },{
      title: '荤素类型',
      dataIndex: 'type',
      key:'type',
      width: '10%',
    },{
      title: '菜品类型',
      dataIndex: 'dishesType',
      key:'dishesType',
      width: '10%',
    },{
      title: '使用状态',
      dataIndex: 'status',
      key:'status',
      width: '10%',
    },{
      title: '操作',
      dataIndex: 'operating',
      key:'operating',
      width: '10%',
      render: (text, record, index) => {
        const detail = !this.props.permissionAlias.contains('CUSTOMER_DETAIL');
        const del = !this.props.permissionAlias.contains('CUSTOMER_DELETE');
        return (
          <div>
            <Link disabled={detail} className="firstA" onClick={ this.onLook.bind(this, record)}  > 查看 </Link>
            <Link disabled={del} className="firstB" onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
          </div>
        );
      },
    }];
  }

  componentDidMount(){
  }


  initTableSearch(){
    return (
      <div className="Dishes-right">
        <div className="Dishes-nav">
          <Form layout="inline">
            <Row  justify="space-between">
              <Col span={8}>
                <FormItem
                  label="荤素类型"
                >
                  <Select placeholder="请选择" style={{ width: 180 }} allowClear={true}>
                    <Option value="0">正常</Option>
                    <Option value="1">禁用</Option>
                  </Select>

                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="菜品类型"
                >
                    <Select placeholder="请选择" style={{ width: 180 }} allowClear={true}>
                      <Option value="0">正常</Option>
                      <Option value="1">禁用</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="使用状态"
                >
                    <Select placeholder="请选择" style={{ width: 180 }} allowClear={true}>
                      <Option value="0">正常</Option>
                      <Option value="1">禁用</Option>
                    </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className="btn">
            <span className="Dishes-Inquire"><Link to="/meals/dishes/addDishes"><Button className="SaveBtn" >创建菜品</Button></Link></span>
            <span className="Dishes-add" >查询</span>
          </div>
        </div>
      </div>
    );
  }


  render(){
    return(
      <div className="dishesConnet">
        <main className="yt-admin-framework-Customer-a">
          <DishesLeft/>
          {this.initTableSearch()}
          <Table dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.pagination}/>
        </main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dishes: state.dishes
  };
}
export default connect(mapStateToProps)(DishesIndex);
