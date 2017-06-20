
import React from 'react'
import { connect } from 'dva'
import './PhoneSystemIndex.scss'
import { Table,Input,Icon,Button,Popconfirm, Modal, DatePicker, Card,Timeline } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import {local, session} from 'common/util/storage.js';
import moment from 'moment'
import { VISIT_TIME } from 'common/constants.js'
const confirm = Modal.confirm;
const TimeItem = Timeline.Item



class CustomerVisIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  loginSystem(){
    let params = {}
    params.hotLine = '59565234';
    params.cno =  '2000';
    params.pwd = 'z4FlIblV';
    params.bindTel =  '01043963489';
    params.bindType = 1;
    params.initStatus =  'online';
    window.executeAction('doLogin', params );//执行登陆 ccic2里面的js类


  }

  doQueueStatus(){
    window.executeAction('doQueueStatus');//获取队列数据
  }






  // 查看
  pushDetail(item) {
    this.selectRecord = item;
    this.props.dispatch(routerRedux.push({
      pathname:'/crm/customer-vis/detail',
      query: {
        dataId:item.id
      },
    }))

  }

  onChangeDate(date) {
    const { dispatch } = this.props;
    dispatch({
      type: 'customerVis/changeDate',
      payload: { date }
    })
    dispatch({
      type: 'customerVis/getCustomerVisByDate',
      payload: { visDate: date.format('YYYY-MM-DD') }
    })
  }

  edit(){
    this.props.dispatch(routerRedux.push('/crm/customer-vis/edit'))
  }

  render() {
    const { list, dispatch, date } = this.props;
    return (
      <div className = "customer-phone-system-cent">
        <Button onClick={ this.loginSystem.bind(this)}>登录</Button>
        <Button onClick={ this.doQueueStatus.bind(this)}>获取队列</Button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const {
  } = state.phoneSystem;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    permissionAlias,

  };
}

export default connect(mapStateToProps)(CustomerVisIndex);
