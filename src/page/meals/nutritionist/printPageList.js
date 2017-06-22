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
      case 2:return "早餐";
      break;
      case 3:return "早加";
      break;
      case 4:return "午餐";
      break;
      case 5:return "午加";
      break;
      case 6:return "晚餐";
      break;
      case 7:return "晚加";
      break;
    }
  }

  getPrintList(data,menu){
    let menuItem = [];
    data.map((elem,index) => {
      menuItem.push(
        <div key={elem} className="menu">
          <p className="menuName">{this.getName(elem)}</p>
          <p className="menuCount">
            {menu.split(',').map((v,i) => {
             return <span key={i}>{v}</span>
            })}
          </p>
        </div>);
     });
    return menuItem;
  }



  render() {
    let menuList = []
    const { loading, printBaseMsg, systemTime,times ,printList, exportValue} = this.props;
    const danTime = systemTime ? new Date(systemTime).format('yyyy-MM-dd HH:mm:ss') : '';
    const data = [2,3,4,5,6,7];
    const menu ="菜单1,菜单2,菜单3,菜单4,菜单5,菜单6,菜单7"
    return (
      <div className="printList" style={{padding:'0px 30px'}}>
        <div className="print_all">
          <p className="time">2017年04月20日餐单 </p>
          <p className="userList">
            <span className="name">客户姓名 : 杨幂</span>
            <span className="roomNumber">房间号码 : 1001</span>
            <span className="status">菜单状态 :  基础菜单</span>
            <span className="timeOut">出单时间 :{danTime} </span>
          </p>
         {/*this.menuList(data);*/}
          {this.getPrintList(data,menu)}
          {/*<div className="menu">*/}
          {/*<p className="menuName">早餐 : </p>*/}
          {/*<p className="menuCount">*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单2</span>*/}
            {/*<span>菜单3</span>*/}
            {/*<span>菜单4</span>*/}
            {/*<span>菜单5</span>*/}
            {/*<span>菜单6</span>*/}
            {/*<span>菜单7</span>*/}
          {/*</p>*/}
        {/*</div>*/}
        {/*<div className="menu">*/}
          {/*<p className="menuName">早加 : </p>*/}
          {/*<p className="menuCount">*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单2</span>*/}
            {/*<span>菜单3</span>*/}
            {/*<span>菜单4</span>*/}
            {/*<span>菜单5</span>*/}
            {/*<span>菜单6</span>*/}
            {/*<span>菜单7</span>*/}
          {/*</p>*/}
        {/*</div>*/}
        {/*<div className="menu">*/}
          {/*<p className="menuName">午餐 : </p>*/}
          {/*<p className="menuCount">*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单2</span>*/}
            {/*<span>菜单3</span>*/}
            {/*<span>菜单4</span>*/}
            {/*<span>菜单5</span>*/}
            {/*<span>菜单6</span>*/}
            {/*<span>菜单7</span>*/}
          {/*</p>*/}
        {/*</div>*/}
        {/*<div className="menu">*/}
          {/*<p className="menuName">午加 : </p>*/}
          {/*<p className="menuCount">*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单1</span>*/}
            {/*<span>菜单1</span>*/}
          {/*</p>*/}
        {/*</div>*/}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { systemTime } = state.dinner;
  return {
    systemTime,
   loading: state.loading.models.dainer
  };
}
export default connect(mapStateToProps)(PrintPageList)

