/**
 * 菜品库列表页
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"
import React from 'react';
import { connect } from 'dva';
import { message, Button, Icon, Table, Form, Row, Col, Input, Select, Modal } from 'antd';
import DishesLeft from './DishesLeft'
import DishesIndexCss from './DishesIndex.scss';
import Current from '../../Current';
import { Link } from 'react-router';
import { routerRedux } from 'dva/router';
import PermissionLink from '../../../common/PermissionLink';

window.location.pathname == '/meals/dishes' &&window.addEventListener('scroll', function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      var widthNum =  $('#Dishes-right').width();
      $('#Dishes-nav').width(widthNum);
      $('#Dishes-nav').addClass('DishesTopfixed');
      $('#Dishes-right').addClass('Dishes-right-Top');
      
    }
    else {
      $('#Dishes-nav').removeClass('DishesTopfixed');
      $('#Dishes-right').removeClass('Dishes-right-Top');
    }
  });
})


const FormItem = Form.Item;
const Option = Select.Option

class DishesIndex extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      mvType: null,
      vdType: null,
      status: null
    }
    this.columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: '10%'
    }, {
      title: '菜品名',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    }, {
      title: '荤素类型',
      dataIndex: 'mvType',
      key: 'mvType',
      width: '10%',
      render: (text, record, index) => {
        const { mvTypeData } = this.props.dishes;
        let result = null;
        mvTypeData.map(function (item) {
          if (text == item.id) {
            result = <span>{item.name}</span>;
            return;
          }
        });
        return result;
      }
    }, {
      title: '菜品类型',
      dataIndex: 'vdType',
      key: 'vdType',
      width: '10%',
      render: (text, record, index) => {
        const { vdTypeData } = this.props.dishes;
        let result = null;
        vdTypeData.map(function (item) {
          if (text == item.id) {
            result = <span>{item.name}</span>;
            return;
          }
        });
        return result;
      }
    }, {
      title: '使用状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text, record, index) => {
        if (text === 0) {
          return <span>未使用</span>
        } else if (text === 1) {
          return <span>已使用</span>
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operating',
      key: 'operating',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div>
            <PermissionLink testKey='DISHES_DETAIL' className="firstA" onClick={ this.onLook.bind(this, record)}>
              查看 </PermissionLink>
            <PermissionLink testKey='DISHES_DELETE' className="firstB" onClick={ this.onDelete.bind(this, record)}>
              删除 </PermissionLink>
          </div>
        );
      }
    }];
  }
  
  //查看
  onLook(record) {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/meals/dishes/dishesDetail?dataId=${record.id}`));
  }
  
  //删除
  onDelete(record) {
    const _this = this;
    Modal.confirm({
      title: '提示',
      content: '是否确定删除此菜品?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        const { dispatch } = _this.props;
        dispatch({
          type: 'dishes/deleteDishes',
          payload: {
            dataId: record.id
          }
        });
      }
    });
  }
  
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dishes/getDishesLibraryNodes'
    });
    
    dispatch({
      type: 'dishes/getDictionary',
      payload: {
        abName: "MVTYPE"
      }
    });
    
    dispatch({
      type: 'dishes/getDictionary',
      payload: {
        abName: "VDTYPE"
      }
    });
    
    this.getTableData({
      nodeId: this.props.dishes.nodeId,
      page: this.props.dishes.page,
      size: this.props.dishes.size
    });
    
  }
  
  handleSearch = () => {
    this.getTableData({
      nodeId: this.props.dishes.nodeId,
      page: 1,
      size: this.props.dishes.size
    });
  }
  
  onTableChange = (pageNumber) => {
    this.getTableData({
      nodeId: this.props.dishes.nodeId,
      page: pageNumber,
      size: this.props.dishes.size
    });
  }
  
  getTableData(params = {}) {
    const { dispatch } = this.props;
    dispatch({
      type: 'dishes/getDishesPageList',
      payload: {
        ...params,
        name: this.state.name,
        mvType: this.state.mvType,
        vdType: this.state.vdType,
        status: this.state.status
      }
    });
  }
  
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  handleMvTypeChange = (value) => {
    this.setState({
      mvType: value
    });
  }
  handleVdTypeChange = (value) => {
    this.setState({
      vdType: value
    });
  }
  handleStatus = (value) => {
    this.setState({
      status: value
    });
  }
  
  
  //表格上方筛选框
  initTableSearch() {
    let addBtn = null;
    if (this.props.dishes.nodeId != 1) {//根节点无法创建菜品
      addBtn =
        <span className="Dishes-add"><PermissionLink testKey='DISHES_ADD' to="/meals/dishes/addDishes"><Button className="button-group-1">创建菜品</Button></PermissionLink></span>;
    }
    const { mvTypeData, vdTypeData } = this.props.dishes;
    const mvTypeOptions = [];
    mvTypeData.map(function (item, index) {
      mvTypeOptions.push(<Option key={item.id + ""} value={item.id + ""}>{item.name}</Option>);
    });
    const vdTypeOptions = [];
    vdTypeData.map(function (item, index) {
      vdTypeOptions.push(<Option key={item.id + ""} value={item.id + ""}>{item.name}</Option>);
    });
    
    
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
    
    
    return (
      <div className="Dishes-nav" id="Dishes-nav">
        <Form layout="inline">
          <Row justify="space-between">
            <Col span={6}>
              <FormItem
                label="菜品名"
                {...formItemLayout}
              >
                <Input placeholder="菜品名或主副食材" style={{ minWidth: 140 }} onChange={this.handleNameChange.bind(this)}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="荤素类型"
                {...formItemLayout}
              >
                <Select placeholder="请选择" style={{ minWidth: 140 }} allowClear={true} onChange={this.handleMvTypeChange.bind(this)}>
                  {mvTypeOptions}
                </Select>
              
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="菜品类型"
                {...formItemLayout}
              >
                <Select placeholder="请选择" style={{ minWidth: 140 }} allowClear={true} onChange={this.handleVdTypeChange.bind(this)}>
                  {vdTypeOptions}
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="使用状态"
                {...formItemLayout}
              >
                <Select placeholder="请选择" style={{ minWidth: 140 }} allowClear={true} onChange={this.handleStatus.bind(this)}>
                  <Option value="0">未使用</Option>
                  <Option value="1">已使用</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="btn">
          {addBtn}
          {/*<span className="Dishes-add">
           <PermissionLink testKey='DISHES_ADD' to="/meals/dishes/addDishes"><Button className="SaveBtn" >创建菜品</Button></PermissionLink>
           </span>*/}
          <Link><Button className="Dishes-Inquire" onClick={this.handleSearch.bind(this)}>查询</Button></Link>
        </div>
      </div>
    );
  }
  
  
  render() {
    const dataSource = this.props.dishes.dishesPageList;
    const pagination = {
      total: this.props.dishes.total,
      showQuickJumper: true,
      current: this.props.dishes.page,
      pageSize: this.props.dishes.size,
      onChange: this.onTableChange.bind(this)
    };
    return (
      <div className="dishesConnet">
        <main className="yt-admin-framework-Customer-a">
          <DishesLeft/>
          <div className="Dishes-right" id="Dishes-right">
            {this.initTableSearch()}
            <div className="CreateModaList" >
              <Table
                bordered
                dataSource={dataSource}
                columns={this.columns}
                pagination={pagination}
              />
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
