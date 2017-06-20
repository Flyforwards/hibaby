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


class MemberShipCard extends Component {
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

  render() {
    let menuList = []
    const { loading, printBaseMsg, systemTime,times ,printList, exportValue} = this.props;
    const danTime = printBaseMsg ? new Date(printBaseMsg.billTime).format('yyyy-MM-dd HH:mm:ss') : '';
    console.log("exportValue>>>>",exportValue)
    return (
      <div className="printList" style={{padding:'0px 30px'}}>
        <div className="print_all">
          <p className="time">2017年04月20日餐单 </p>
          <p className="userList">
            <span className="name">客户姓名 : 杨幂</span>
            <span className="memberLevel">会员级别 :  白金会员</span>
            <span className="roomNumber">房间号码 : 1001</span>
            <span className="status">菜单状态 :  基础菜单</span>
            <span className="timeOut">出单时间 :{new Date().format('yyyy-MM-dd HH:mm:ss')} </span>
          </p>
         {/*this.menuList(data);*/}
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
          <p className="menuName">午餐 : </p>
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
          <p className="menuName">午加 : </p>
          <p className="menuCount">
            <span>菜单1</span>
            <span>菜单1</span>
            <span>菜单1</span>
            <span>菜单1</span>
            <span>菜单1</span>
            <span>菜单1</span>
            <span>菜单1</span>
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

