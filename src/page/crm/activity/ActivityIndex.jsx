"use strict"

import React from 'react'
import { connect } from 'dva'
import './activityIndex.scss'
import { Table,Input,Icon,Button,Popconfirm,Pagination } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import AppointmentModalFrom from './appointmentModalFrom'
import AppointmentMemberFrom from './appointmentMemberFrom'
import AppointmentNotMemberFrom from './appointmentNotMemberFrom'
import Current from '../../Current'
import AlertModalFrom from 'common/AlertModalFrom'
class ActivityIndex extends React.Component {

  constructor(props) {
    super(props);
    this.selectRecord = null;
    this.state={
      appointmentVisible: false,
      memberVisible: false,
      notMemberVisible: false,
      alertModalVisible: false
    }
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '活动名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '活动内容',
      dataIndex: 'content',
      key: 'content'
    }, {
      title: '活动地点',
      dataIndex: 'address',
      key: 'address'

    }, {
      title: '活动时间',
      dataIndex: 'activityTime',
      key: 'modifyTime'
    },{
      title: '签到人数',
      dataIndex: 'appointments',
      key: 'appointments'
    },{
      title: '成单率',
      dataIndex: 'orders',
      key: 'orders'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        // to = {`/system/group-char/detail?dataId=${record.id}`}
        return (
          <div key = { index }>
            <Link onClick={ this.pushDetail.bind(this,record) }> 查看 </Link>
            <Link onClick={ this.appointment.bind(this,record) }> 预约 </Link>
            <Link onClick={ this.deleteActivity.bind(this,record)} > 删除 </Link>
          </div>
        )
      },
    }];
  }

  //删除
  deleteActivity(record) {
    this.selectRecord = record
    this.setState({
      alertModalVisible: true,
    })
  }

  // 确认删除
  onOk(record) {
    this.props.dispatch({
      type: 'activity/deleteActivity',
      payload: { dataId: record.id }
    })
    this.onCancel();
  }

  // 查看
  pushDetail(record) {
    this.selectRecord = record;
    this.props.dispatch(routerRedux.push({
      pathname:'/crm/activity/detail',
      query: {
        dataId:record.id
      },
    }))

  }
  // 预约
  appointment(record) {
    this.selectRecord = record
    this.setState({
      appointmentVisible: true,
    })
  }

  onCancel() {
    this.setState({
      appointmentVisible: false,
      memberVisible: false,
      notMemberVisible: false,
      alertModalVisible: false
    })
  }
  onChoose(on) {
    if(on){
      this.setState({
        appointmentVisible: false,
        memberVisible: true,
      })
    } else {
      this.setState({
        notMemberVisible: true,
        appointmentVisible: false,
      })
    }

  }



  render() {
    const { list, loading, pagination, dispatch } = this.props;
    const tableProps = {
      loading: loading.effects['activity/getActivityPage'],
      dataSource : list ,
      pagination,
      onChange (page) {
        const { query, pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            ...query,
            page: page.current,
            size: page.pageSize,
            type: 1,
          },
        }))
      },
    }
    return (
      <div className = "activity-cent">
        <div className = "button-wrapper">
          <Link to = '/crm/activity/add'>
            <Button className="button-add"> 添加 </Button>
          </Link >
        </div>
        <Table {...tableProps}  bordered  columns = { this.columns } rowKey={record => record.id}/>
        <AppointmentModalFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.appointmentVisible } selectRecord={ this.selectRecord } onChoose={ this.onChoose.bind(this)}/>
        <AppointmentMemberFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.memberVisible } selectRecord={ this.selectRecord }/>
        <AppointmentNotMemberFrom onCancel={ this.onCancel.bind(this) }  visible={ this.state.notMemberVisible } selectRecord={ this.selectRecord }/>
        <AlertModalFrom  onCancel={ this.onCancel.bind(this) } modalTitle="是否确定删除此活动"  visible={ this.state.alertModalVisible } onOk={ this.onOk.bind(this, this.selectRecord) }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.activity;

  return {
    loading: state.loading,
    list,
    pagination
  };
}

export default connect(mapStateToProps)(ActivityIndex);
