/**
 * Created by Flyforwars on 2017/6/5.
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
//import './print.css';

class MemberShipCard extends Component {
  constructor(props) {
    super(props);
    this.state={
        time:'',
    }
  }
getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentYears = date.getFullYear() +seperator1 + month + seperator1 + strDate 
    var currentData = date.getHours() + seperator2 + date.getMinutes()+ seperator2 + date.getSeconds();
    var dataTime = {currentYears:currentYears,currentData:currentData}
    return dataTime;
}


  render() {
    const { loading, printBaseMsg, systemTime,times ,printList} = this.props;
    const danTime = printBaseMsg ? new Date(printBaseMsg.billTime).format('yyyy-MM-dd HH:mm:ss') : '';
    let {currentYears,currentData} = this.getNowFormatDate()
    console.log("time>>>>",currentYears)
    return (
      <div className="printList">
        <div className="print_all">
          <p className="time">2017年04月20日餐单 </p>
          <p className="userList">
            <span className="name">客户姓名 : 杨幂</span>
            <span className="memberLevel">会员级别 :  白金会员</span>
            <span className="roomNumber">房间号码 : 1001</span>
            <span className="status">菜单状态 :  基础菜单</span>
            <span className="timeOut">出单时间:{ currentYears } { currentData } </span>
          </p>
          <div className="menu">
          <p className="menuName">早餐 : </p>
          <p className="menuCount">
            <span>菜单1</span>
            <span>菜单2</span>
            <span>菜单3</span>
            <span>菜单4</span>
            <span>菜单5</span>
            <span>菜单6</span>
            <span>菜单7</span>
          </p>
        </div>
        <div className="menu">
          <p className="menuName">早加 : </p>
          <p className="menuCount">
            <span>菜单1</span>
            <span>菜单2</span>
            <span>菜单3</span>
            <span>菜单4</span>
            <span>菜单5</span>
            <span>菜单6</span>
            <span>菜单7</span>
          </p>
        </div>
        
        <div className="menu">
          <p className="menuName">早加 : </p>
          <p className="menuCount">
            <span>菜单1</span>
            <span>菜单2</span>
            <span>菜单3</span>
            <span>菜单4</span>
            <span>菜单5</span>
            <span>菜单6</span>
            <span>菜单7</span>
          </p>
        </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    loading: state.loading.models.membershipcard
  };
}
export default connect(mapStateToProps)(MemberShipCard)

