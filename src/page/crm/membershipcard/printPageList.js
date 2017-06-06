/**
 * Created by Flyforwars on 2017/6/5.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import {Card,DatePicker,Table } from 'antd';
import { Link } from 'react-router';
import './index.scss';
import './printPage.scss';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
import { format } from '../../../utils/index.js'

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
    this.dataSource = [{
      key: '1',
      renewTime: '胡彦斌',
      renewAmount: 32,
      renewAmount: '西湖区湖底公园1号'
    }, {
      key: '2',
      renewTime: '胡彦斌',
      renewAmount: 32,
      renewAmount: '西湖区湖底公园1号'
    }];
  }

 tableList(printList) {
   let list='';
   list=`<table>
      
      </table>`
 }



  render() {
    const { loading, printBaseMsg, systemTime,times ,printList} = this.props;
    const danTime = printBaseMsg ? new Date(printBaseMsg.billTime).format('yyyy-MM-dd HH:mm:ss') : '';

    return (
      <div className="print_all">
        <div className="print_w100">
          <p className="print_w_ll_50">{times}账单</p>
          <p className="print_w_rr_50">出单时间:<span>{ danTime }</span></p>
        </div>
        <div className="print_normal">
          <p className="print_w_ll_30">客户姓名:<span>{ printBaseMsg ? printBaseMsg.name:'' }</span></p>
          <p className="print_w_lc_30">房间号码:<span>{ printBaseMsg ? printBaseMsg.roomNumber:'' }</span></p>
          <p className="print_w_rr_30">合计金额:<span>{ printBaseMsg ? printBaseMsg.amount:'' }</span></p>
        </div>
        { this.tableList(printList) }
        <Table class="cardTable" style={{width:'98%',margin:'10px auto 0px'}} columns={this.columns} pagination={false} bordered rowKey="id" dataSource={ this.dataSource}/>

      </div>


    )
  }
}


function mapStateToProps(state) {
  const { printBaseMsg,systemTime,times,printList } = state.membershipcard;
  return {
    loading: state.loading.models.membershipcard,
    printBaseMsg,
    systemTime,
    times,
    printList,
    user:state.addCustomer,
    cards:state.membershipcard,
  };
}
export default connect(mapStateToProps)(MemberShipCard)

