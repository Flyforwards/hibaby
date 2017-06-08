/**
 * Created by Flyforwards on 2017/6/2.
 */


import React, { Component } from 'react'
import { connect } from 'dva'
import './index.scss'
import {Link} from 'react-router'
import { Table, Icon, } from 'antd';
import { format } from '../../../utils/index.js';

class RenewRecord extends Component {
  constructor(props) {
    super(props);
    const _this = this;
    this.columns = [{
      title: '续费时间',
      dataIndex: 'renewTime',
      key: 'renewTime',
      render:(text,record,index)=>{
        return new Date(text).format('yyyy-MM-dd HH:mm:ss');
      }
    }, {
      title: '续费金额',
      dataIndex: 'renewAmount',
      key: 'renewAmount'
    }, {
      title: '会员级别变动',
      dataIndex: 'levelChange',
      key: 'levelChange'
    },{
      title: '操作人',
      dataIndex: 'operatorName',
      key: 'operatorName',
    }, ];

  }
  render() {
    const { dispatch, total,loading,renewRecordPagination,renewRecord } = this.props;
    const tableProps = {
      loading:loading,
      pagination:renewRecordPagination,
      dataSource:renewRecord,
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
  const {total,renewRecordPagination,renewRecord} = state.membershipcard;
  return {
    loading: state.loading.models.membershipcard,
    total,
    renewRecordPagination,
    renewRecord,
  };
}
export default connect(mapStateToProps)(RenewRecord)


