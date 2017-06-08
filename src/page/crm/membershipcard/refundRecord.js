/**
 * Created by Flyforweards on 2017/6/2.
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import './index.scss'
import {Link} from 'react-router'
import { Table, Icon, } from 'antd';
import { format } from '../../../utils/index.js';

class RefundRecord extends Component {
  constructor(props) {
    super(props);
    const _this = this;
    this.columns = [{
      title: '退费时间',
      dataIndex: 'refundTime',
      key: 'refundTime',
      render:(text,record,index)=>{
        return new Date(text).format('yyyy-MM-dd HH:mm:ss');
      }
    }, {
      title: '卡内余额',
      dataIndex: 'cardBalance',
      key: 'cardBalance'
    }, {
      title: '退费金额',
      dataIndex: 'refundAmount',
      key: 'refundAmount'
    }, {
      title: '会员卡级别变动',
      dataIndex: 'levelChange',
      key: 'levelChange'
    },{
      title: '操作人',
      dataIndex: 'operatorName',
      key: 'operatorName',
    }, ];

  }
  render() {
    const { dispatch, total,loading,refundRecordPagination,refundRecord } = this.props;
    const tableProps = {
      loading:loading,
      pagination:refundRecordPagination,
      dataSource:refundRecord,
      onChange: (page) => {
        dispatch({
          type: 'membershipcard/getFeeDuctionRecord',
          payload: {
            'page': page.current,
            'size': page.pageSize,
            'sortField': "deductionTime",
            'sortOrder': "AESC"
          }
        })
      }
    };
    return (
      <div>
        <Table class="cardTable" columns={this.columns} bordered rowKey="id" { ...tableProps }/>
      </div>

    )
  }
}


function mapStateToProps(state) {
  const {total,refundRecordPagination,refundRecord} = state.membershipcard;
  return {
    loading: state.loading.models.membershipcard,
    total,
    refundRecordPagination,
    refundRecord,
  };
}
export default connect(mapStateToProps)(RefundRecord)


