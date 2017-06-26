/**
 * update by Flyforwars on 2017/6/5.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import {Card,DatePicker,Table } from 'antd';
import { Link } from 'react-router';

import './printPage.css';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
import { format } from '../../../utils/index.js';
import testData from './test';


class PrintPageList extends Component {
  constructor(props) {
    super(props);
    this.state={
        time:'',
    }
  }
 // menuList(data) {
 //    data ? data.map(function(elem,index){
 //      let menuArray = [];
 //      menuArray.push(
 //
 //      )
 //    }):null;
 // }
  getName(i) {
    switch(i){
      case 1:return "早餐";
      break;
      case 2:return "早加";
      break;
      case 3:return "午餐";
      break;
      case 4:return "午加";
      break;
      case 5:return "晚餐";
      break;
      case 6:return "晚加";
      break;
    }
  }

  getPrintList(data) {
    let menuItem = [];
    data.map((elem,index) => {
      menuItem.push(
        <div key={index} className="menu">
          <p className="menuName">{this.getName(elem.type)}</p>
          <p className="menuCount">
            {elem.dishes.map((v,i) => {
                return <span key={i}>{v.dishesName}</span>
            })}
          </p>
        </div>);
    });
    return menuItem;
  }

  render() {
    const { loading, systemTime ,printMsg} = this.props;
    const danTime = systemTime ? new Date(systemTime).format('yyyy-MM-dd HH:mm:ss') : '';
    const dayTime = systemTime ? new Date(systemTime).format('yyyy年MM月dd日') : '';
    return (
      <div className="printList" style={{padding:'0px 30px'}}>
        <div className="print_all">
          <p className="time">{dayTime}餐单 </p>
          <p className="userList">
            <span className="name">客户姓名 : {printMsg ? printMsg.name : ''}</span>
            <span className="roomNumber">房间号码 : {printMsg ? printMsg.room : ''}</span>
            <span className="status">菜单状态 :  {printMsg ? (printMsg.menuStatus == 0 ?"标准餐单":"禁忌餐单"):''}</span>
            <span className="timeOut">出单时间 :{danTime} </span>
          </p>
          {printMsg ? this.getPrintList(printMsg.adjustlist):''}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { systemTime,printMsg } = state.dinner;
  return {
    systemTime,
    printMsg,
   loading: state.loading.models.dainer
  };
}
export default connect(mapStateToProps)(PrintPageList)

