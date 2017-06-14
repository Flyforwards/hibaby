/**
 * Created by Flyforwars on 2017/6/5.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import {Card,DatePicker,Table } from 'antd';
import { Link } from 'react-router';

import './printPage.scss';
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
    this.columns = [{
      title: '时间',
      dataIndex: 'renewTime',
      key: 'renewTime'
    }, {
      title: '服务项目名称',
      dataIndex: 'renewAmount',
      key: 'renewAmount'
    }, {
      title: '服务项目数量',
      dataIndex: 'renewAmount',
      key: 'leverlChange'
    },{
      title: '金额',
      dataIndex: 'operatorName',
      key: 'operatorName',
    }, ];
  }

  tdList(printList){
    let childrenList = [];
    printList ? printList.map(function(elem,index){
      if(elem.type == 1) {
        //扣费
        childrenList.push(
          <tr style={{textAlign:'center',height:40,fontSize:'14px',lineHeight:'40px',color:'#333333',}}>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>{new Date(elem.time).format('yyyy-MM-dd HH:mm:ss')}</td>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>{elem.commodity_name}</td>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>{elem.commodity_quantity}</td>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>￥{elem.amount}</td>
          </tr>
        )
      }else if(elem.type == 2) {
        //续费
        childrenList.push(
          <tr style={{textAlign:'center',height:40,fontSize:'14px',lineHeight:'40px',color:'#ffffff',backgroundColor:'#666666'}}>
            <td colSpan="4" style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}> {new Date(elem.time).format('yyyy-MM-dd HH:mm:ss')}  续费  ￥{elem.amount} {elem.level_change }</td>
          </tr>
        )
      }else if(elem.type == 3) {
        //退费
        childrenList.push(
          <tr style={{textAlign:'center',height:40,fontSize:'14px',lineHeight:'40px',color:'#ffffff',backgroundColor:'#666666'}}>
            <td colSpan="4" style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}> {new Date(elem.time).format('yyyy-MM-dd HH:mm:ss')}  退费  ￥{elem.amount} {elem.level_change }</td>
          </tr>
        )
      }
    }):'';

    return childrenList;
  }

 tableList(printList) {
   let list='';
   return (<table width='98%'  className='table_d'  height='auto' cellSpacing='1' cellPadding='0'  style={{margin:'10px auto 10px',borderCollapse:'collapse',border:'1px solid #e9e9e9',rules:'all'}}>
       <thead style={{height:40,backgroundColor:'#666666',fontSize:'14px',lineHeight:'40px',color:'#ffffff',}}>
         <tr style={{textAlign:'center',}}>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>时间</td>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>服务项目名称</td>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>服务项目数量</td>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>金额</td>
         </tr>
       </thead>
      <tbody>
      {this.tdList(printList)}
      </tbody>
      </table>
   )
 }



  render() {
    const { loading, printBaseMsg, systemTime,times ,printList} = this.props;
    const danTime = printBaseMsg ? new Date(printBaseMsg.billTime).format('yyyy-MM-dd HH:mm:ss') : '';

    return (
      <div className="printList">
        <div className="print_all">
          <p className="time">2017年04月20日餐单 </p>
          <p className="timeOut">出单时间:<span className="span2">2017-04-12</span><span className="span1">17:37:32</span> </p>
          <p className="userList">
            <span className="name">客户姓名 : 杨幂</span>
            <span className="roomNumber">房间号码 : 1001</span>
            <span className="status">餐单状态 :  基础餐单</span>
          </p>
        </div>
        <div className="menu">
          <p className="menuName">早餐</p>
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
          <p className="menuName">早加</p>
          <p className="menuCount"><span>菜单1</span></p>
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

