/**
 * Created by Flyforwards on 2017/6/2.
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import './index.scss'
import {Link} from 'react-router'
import { Table, Icon, } from 'antd';


class ChargebackRecord extends Component {
  constructor(props) {
    super(props);
    const _this = this;
    this.columns = [{
      title: '扣费时间',
      dataIndex: 'deductionTime',
      key: 'deductionTime'
    }, {
      title: '服务项目名称',
      dataIndex: 'commodityName ',
      key: 'commodityName '
    }, {
      title: '服务项目数量',
      dataIndex: 'commodityQuantity ',
      key: 'commodityQuantity '
    }, {
      title: '扣费金额',
      dataIndex: 'deductionAmount ',
      key: 'deductionAmount ',
    },{
      title: '操作人',
      dataIndex: 'operatorName',
      key: 'operatorName',
    }, ];

  }
  render() {
    const { dispatch, total,loading,pagination,feeRecord } = this.props;
    const tableProps = {
      loading:loading,
      pagination:pagination,
      dataSource:feeRecord,
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
  const {total,pagination,feeRecord} = state.membershipcard;
  console.log("扣费记录",feeRecord)
  return {
    loading: state.loading.models.membershipcard,
    total,
    pagination,
    feeRecord,
  };
}
export default connect(mapStateToProps)(ChargebackRecord)
