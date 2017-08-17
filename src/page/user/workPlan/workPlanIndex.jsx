import React from 'react'
import { connect } from 'dva'
import { Calendar, Button, Table, Card, Popconfirm, Icon } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment';
import $ from 'jquery'
import './workPlanIndex.scss'

class WorkPlanIndex extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      bgClass:'removeRef'
    }
    this.columns = [{
      title: '日期',
      dataIndex: 'planTime',
      key: 'planTime',
      width: '15%',
      render: (record) => {
        return moment(record).format("YYYY-MM-DD")
      }
    }, {
      title: '工作计划',
      dataIndex: 'planInfo',
      key: 'planInfo',
      render: (text, record) => {
        const dataId = record.id;
        return (
          <Link style={{ color: '#323232' }} onClick={() => {this.pushPlanInfo(record)}} to={{
            pathname: '/user/work-plan-edit',
            query: { dataId }
          }}>{text}</Link>
        )
      }
    }, {
      title: '操作',
      key: 'id',
      width: '10%',
      render: (text, record) => {
        const dataId = record.id;
        return (
          <Popconfirm title="确定删除？" style={{ width: 70 }} placement="right" onConfirm={() => this.onDelete(record)}>
            <Icon style={{ color: '#b67233' }} type="delete"/>
          </Popconfirm>
        )
      }
    }];
  }
  
  onPanelChange = (value) => {
    console.log(2)
    this.setState({
      bgClass:'removeRef'
    })
    $('.calendar').find('.ant-fullcalendar-today').addClass(this.state.bgClass)
    //$('.calendar').find('.ant-fullcalendar-selected-day').addClass(this.state.bgClass)
    console.log(3)
    const { dispatch } = this.props;
    const month = value.format('YYYY-MM');
    //console.log(month)
    dispatch({
      type: 'workPlanIndex/getDateList',
      payload: {
        month
      }
    })
    dispatch({
      type: 'workPlanIndex/getWorkPlanInfo',
      payload: {
        month
      }
    })
  }
  
  dateCellRender = (value) => {
    const { dataInfo } = this.props;
    const date = value.format('YYYY-MM-DD');
    let listData = [];
    $.inArray(date, dataInfo) != -1 ? listData = [
      { type: 'error' }
    ] : ''
    return (
      <ul className="events">
        {
          listData && listData.map(item => (
            <li key={item.content}>
              <span className={`event-${item.type}`}>●</span>
              { item.content}
            </li>
          ))
        }
      </ul>
    );
  }
  
  
  pushPlanInfo = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'workPlanIndex/pushPlanInfo',
      payload: {
        record
      }
    })
  }
  
  onDelete = (record) => {
    const { dispatch } = this.props;
    const { time, id } = record;
    const planTime = moment(time).format("YYYY-MM-DD")
    dispatch({
      type: 'workPlanIndex/delWorkPlanInfo',
      payload: {
        dataId: id,
        planTime: planTime
      }
    })
  }
  
  onSelect = (value) => {
    console.log(1)
    //$('.calendar').find('.removeRef').removeClass('removeRef')
    this.setState({
      bgClass:''
    })
    const { dispatch } = this.props;
    const date = value.format('YYYY-MM-DD');
    dispatch({
      type: 'workPlanIndex/timeInfo',
      payload: {
        date
      }
    })
    dispatch({
      type: 'workPlanIndex/getWorkPlanInfo',
      payload: {
        day: date
      }
    })
  }
  
  
  render() {
    const { planListInfo } = this.props;
    $('.calendar').find('.ant-fullcalendar-today').addClass(this.state.bgClass)
    return (
      <div className="workPlanIndex">
        <Button className='addBtn'>
          <Link to={{ pathname: '/user/work-plan-add', query: {} }}>添加工作计划</Link>
        </Button>
        <div className="calendar">
          <Calendar fullscreen={false} onSelect={this.onSelect} onPanelChange={this.onPanelChange} dateCellRender={this.dateCellRender}/>
        </div>
        <div className="planInfo">
          <h4>工作计划:</h4>
          <Table rowKey="id" size="middle" showHeader={false} pagination={false} bordered={false} dataSource={planListInfo} columns={this.columns} scroll={{ y: 300 }}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  
  const { planListInfo, dataInfo } = state.workPlanIndex;
  return {
    loading: state.loading,
    planListInfo,
    dataInfo
  };
}

export default connect(mapStateToProps)(WorkPlanIndex);
