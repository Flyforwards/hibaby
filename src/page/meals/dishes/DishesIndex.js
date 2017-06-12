/**
 * 菜品库列表页
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"

import React from 'react';
import {connect} from 'dva';
import {message, Button, Icon,Table} from 'antd';
import Current from '../../Current';

class DishesIndex extends React.Component{

  constructor(props) {
    super(props);
    this.state = {

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
    }];
  }

  componentDidMount(){
    message.info("杨晶晶")
  }


  render(){
    return(
      <div className="dishesConnet">
        <main className="yt-admin-framework-Customer">
          1111111
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
