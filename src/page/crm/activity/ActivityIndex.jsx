import React from 'react'
import { connect } from 'dva'
import './activityIndex.scss'
import { Table,Input,Icon,Button,Popconfirm,Pagination } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import AppointmentModalFrom from './appointmentModalFrom'
import AppointmentMemberFrom from './appointmentMemberFrom'
import AppointmentNotMemberFrom from './appointmentNotMemberFrom'
import moment from 'moment'
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
      key: 'id',
      width: '5%'
    },{
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%'
    }, {
      title: '活动内容',
      dataIndex: 'content',
      key: 'content',
      width: '40%'
    }, {
      title: '活动地点',
      dataIndex: 'address',
      key: 'address',
      width: '10%'
    }, {
      title: '活动时间',
      dataIndex: 'activityTime',
      width: '10%',
      render: (record) => {
        return moment(record).format("YYYY-MM-DD HH:mm:ss")
      }
    },{
      title: '签到/人数',
      width: '5%',
      render: (record) => {
        return String(record.signeds)+'/'+String(record.appointments);
      },
    },{
      title: '成单率',
      dataIndex: 'orders',
      key: 'orders',
      width: '5%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      render: (text, record, index) => {
        const timestamp = new Date().getTime()
        // 与当前时间比对，后面会与服务器时间对比, 活动已经开始，和已经有预约的情况服务删除活动
        if (record.activityTime < timestamp || record.appointments > 0 ) {
          return (
            <div key = { index }>
              <Link onClick={ this.pushDetail.bind(this,record) }> 查看 </Link>
              <Link onClick={ this.appointment.bind(this,record) }> 预约 </Link>
            </div>
          )
        } else {
          return (
            <div key = { index }>
              <Link onClick={ this.pushDetail.bind(this,record) }> 查看 </Link>
              <Link onClick={ this.appointment.bind(this,record) }> 预约 </Link>
              <Link onClick={ this.deleteActivity.bind(this,record)} > 删除 </Link>
            </div>
          )
        }

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
      this.props.dispatch({
        type: 'activity/getNoAppointmentCustomerPageList',
        payload: { 'activityId': this.selectRecord.id }
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
        const { pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize,
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
        <AppointmentMemberFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.memberVisible } selectRecord={ this.selectRecord } from={ true }/>
        <AppointmentNotMemberFrom onCancel={ this.onCancel.bind(this) }  visible={ this.state.notMemberVisible } selectRecord={ this.selectRecord } from={ true }/>
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
