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
    dispatch(routerRedux.push(`/meals/dishes/dishesDetail?dataId=${record.id}`));
  }
  //删除
  onDelete(record){
    const _this = this;
    Modal.confirm({
      title: '提示',
      content: '是否确定删除此菜品?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        const {dispatch} = _this.props;
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
      type: 'dishes/getDishesLibraryNodes'
    });
    this.getTableData({
      nodeId : 1,
      page : this.props.dishes.page,
      size : this.props.dishes.size
    });
  }

  onTableChange = (pageNumber) =>{
    this.getTableData({
      nodeId : 1,
      page : pageNumber,
      size : this.props.dishes.size
    });
  }

  getTableData(params = {}){
    const {dispatch} = this.props;
    dispatch({
      type: 'dishes/getDishesPageList',
      payload: {
        ...params
      }
    });
  }

  //表格上方筛选框
  initTableSearch(){
    return (
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
            <span className="Dishes-add"><Link to="/meals/dishes/addDishes"><Button className="SaveBtn" >创建菜品</Button></Link></span>
            <span className="Dishes-Inquire" >查询</span>
          </div>
        </div>
    );
  }


  render(){
    const dataSource = this.props.dishes.dishesPageList;
    const pagination = {
      total: this.props.dishes.total,
      showQuickJumper: true,
      current: this.props.dishes.page,
      pageSize: this.props.dishes.size,
      onChange: this.onTableChange.bind(this)
    };
    return(
      <div className="dishesConnet">
        <main className="yt-admin-framework-Customer-a">
          <DishesLeft/>
          <div className="Dishes-right">
            {this.initTableSearch()}
            <div className="CreateModaList">
              <Table
                bordered
                dataSource={dataSource}
                columns={this.columns}
                pagination={pagination}/>
              <Current
                page={this.props.dishes.page}
                total={ this.props.dishes.total}
                range={this.props.dishes.range}
              />
            </div>
          </div>
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
