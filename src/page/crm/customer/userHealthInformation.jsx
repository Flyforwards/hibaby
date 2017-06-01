
import React from 'react'
import { connect } from 'dva'
import { Table ,Input, Icon, Button, Popconfirm, Pagination, Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import './userHealthInformation.scss'
import NutritionHealthInformation from '../healthy/NutritionHealthInformation'
import HospitalHealthy from '../healthy/healthyhome';
import SkinHealthInformation from '../healthy/SkinHealthInformation';

const TabPane = Tabs.TabPane;

class userHealthInformation extends React.Component {

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
      title: '签到/人数',
      render: (record) => {
        return String(record.signeds)+'/'+String(record.appointments);
      },
    },{
      title: '成单率',
      dataIndex: 'orders',
      key: 'orders'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
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
    const editCustomer = this.props.users.editCustomer;
    const HospitalHealthyDiv = editCustomer ? '':<HospitalHealthy />;
    return (
      <div className = "user-health-cent">
        <Tabs className="tabsContent" defaultActiveKey="1" type="card">
          <TabPane tab="医疗健康档案" key="1">
            {HospitalHealthyDiv}
          </TabPane>
          <TabPane tab="营养部健康档案" key="2">
            <NutritionHealthInformation/>
          </TabPane>
          <TabPane tab="美研中心孕期健康档案" key="3">
            <SkinHealthInformation />
          </TabPane>
          <TabPane tab="出院小结" key="4">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.addCustomer,
  };
}

export default connect(mapStateToProps)(userHealthInformation);
