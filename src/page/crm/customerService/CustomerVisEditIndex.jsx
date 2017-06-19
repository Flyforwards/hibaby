/**
 * Created by wang on 2017/6/13.
 */

import React from 'react'
import { connect } from 'dva'
import './CustomerVisIndex.scss'
import { Table, Input, Icon, Button, Popconfirm, Modal, DatePicker, Card, Timeline, Row, Col } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
import { VISIT_TIME } from 'common/constants.js'
const confirm = Modal.confirm;
const TimeItem = Timeline.Item

class CustomerVisEditIndex extends React.Component {

  constructor(props) {
    super(props);
    this.removeIds = [];
  }

  deleteCustomerComp(record) {
    const { dispatch } = this.props;
    confirm({
      title: '提示',
      content: '是否确定删除此投诉？',
      onOk() {
        dispatch({
          type: 'customerComp/deleteCustomerComp',
          payload: { dataId: record.id }
        })
      },
      onCancel() {
      }
    });
  }


  onChangeDate(date) {
    const { dispatch } = this.props;
    this.removeIds = [];
    dispatch({
      type: 'customerVis/changeDate',
      payload: { date }
    })
    dispatch({
      type: 'customerVis/getCustomerVisByDate',
      payload: { visDate: date.format('YYYY-MM-DD') }
    })
  }

  save() {
    let ids = '';

    this.removeIds.map((record, index) => {
      if (index == 0) {
        ids = String(record);
      } else {
        ids = ids + ',' + String(record);
      }
    })
    if (ids.length <= 0 ) {
      this.props.dispatch(routerRedux.push('/crm/customer-vis'));
      return;
    }
    this.props.dispatch({
      type: 'customerVis/saveCustomerVisEdit',
      payload: { ids }
    })
  }

  remove(item) {
    if (!this.removeIds.contains(item.id)) {
      this.removeIds.push(item.id);
    }
    this.props.dispatch({
      type: 'customerVis/removeItemFromList',
      payload: { itemId: item.id }
    })
  }

  render() {
    const { list, dispatch, date } = this.props;
    const times = VISIT_TIME.map((record, index) => {
      let btns = []
      list.map((item) => {
        if (index + 1 == item.visitTimeId) {
          btns.push(
            <span key={item.id} className="left-time-div"><span className="left-time-span" key={item.id}>{ item.name }</span><Icon onClick={ this.remove.bind(this, item)} type="close-circle"/></span>)
        }
      })

      return (<TimeItem key={index}><span>{record}</span>
        <div>
          {
            btns
          }
        </div>
      </TimeItem>)
    })


    const add = !this.props.permissionAlias.contains('CUSTOMERCOMP_ADD');
    return (
      <div className="customer-vis-cent">
        <div className="button-wrapper">
          <Row style={{ height: 40 }}>
            <Col span={20}>
              <span>预约日期：</span>
              <DatePicker style={{ width: 200 }} format="YYYY-MM-DD" defaultValue={ date } onChange={this.onChangeDate.bind(this)}/>
            </Col>
            <Col span={4}>
              <Button disabled={add} className="button-add">
                <Link to='/crm/customer-vis/add'> 预约参观 </Link>
              </Button >
            </Col>
          </Row>
        </div>
        <Card title={ date.format('YYYY年MM月DD日') }>
          <Timeline>
            {
              times
            }
          </Timeline>
          <div style={{marginTop:20}}>
            <Row>
              <Col offset={16} span={4}>
                <Link to='/crm/customer-vis'>
                  <Button className="button-add"> 返回 </Button>
                </Link>
              </Col>
              <Col span={4}>
                <Button className="SaveBtn" onClick={ this.save.bind(this) }> 保存 </Button>
              </Col>
            </Row>
          </div>
        </Card>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
          list,
          date
        } = state.customerVis;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    list,
    permissionAlias,
    date
  };
}

export default connect(mapStateToProps)(CustomerVisEditIndex);
