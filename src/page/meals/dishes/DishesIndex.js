/**
 * 菜品库列表页
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"

import React from 'react';
import {connect} from 'dva';
import {message, Button, Icon,Table,Form,Row,Col,Input,Select,Modal} from 'antd';
import DishesLeft from './DishesLeft'
import DishesIndexCss from './DishesIndex.scss';
import Current from '../../Current';
import DishesDetailPage from './DishesDetailPage';
import { Link } from 'react-router';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option

class DishesIndex extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      dataSource : [{
        id : 1,
        name : '红烧鲫鱼',
        mvType : 1,
        vdType : 1,
        nodeId : 1
      }],
      pagination : {
        current : 1,
        showQuickJumper: true,
        pageSize: 10
      },
    }
    this.columns = [{
      title: '序号',
      dataIndex: 'id',
      key:'id',
      width: '10%',
    },{
      title: '菜品名',
      dataIndex: 'name',
      key:'name',
      width: '10%',
    },{
      title: '荤素类型',
      dataIndex: 'mvType',
      key:'mvType',
      width: '10%',
    },{
      title: '菜品类型',
      dataIndex: 'vdType',
      key:'vdType',
      width: '10%',
    },/*{
      title: '使用状态',
      dataIndex: 'status',
      key:'status',
      width: '10%',
    },*/{
      title: '操作',
      dataIndex: 'operating',
      key:'operating',
      width: '10%',
      render: (text, record, index) => {
        // const detail = !this.props.permissionAlias.contains('CUSTOMER_DETAIL');
        // const del = !this.props.permissionAlias.contains('CUSTOMER_DELETE');
        return (
          <div>
            <Link disabled={false} className="firstA" onClick={ this.onLook.bind(this, record)}  > 查看 </Link>
            <Link disabled={false} className="firstB" onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
          </div>
        );
      },
    }];
  }
  //查看
  onLook(record){
    const {dispatch} = this.props;
    dispatch({
      type: 'dishes/getDishesById',
      payload: {
        dataId : record.id
      }
    });
  }
  //删除
  onDelete(record){
    Modal.confirm({
      title: '提示',
      content: '是否确定删除此菜品?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        const {dispatch} = this.props;
        dispatch({
          type: 'dishes/deleteDishes',
          payload: {
            dataId : record.id
          }
        });
      }
    });
  }



  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'dishes/getDishesPageList',
      payload: {
        nodeId : 1
      }
    });
  }

  //表格上方筛选框
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
            <span className="Dishes-Inquire"><Link to="/meals/dishes/addOrEditDishes"><Button className="SaveBtn" >创建菜品</Button></Link></span>
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
