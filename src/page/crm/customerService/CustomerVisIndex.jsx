
import React from 'react'
import { connect } from 'dva'
import './CustomerVisIndex.scss'
import { Table, Input, Row, Col, Icon, Button, Popconfirm, Modal, DatePicker, Card, Timeline } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
import { VISIT_TIME } from 'common/constants.js'
import PermissionButton from 'common/PermissionButton';
const confirm = Modal.confirm;
const TimeItem = Timeline.Item
class CustomerVisIndex extends React.Component {

  constructor(props) {
    super(props);
  }


  // 查看
  pushDetail(item) {
    this.selectRecord = item;
    this.props.dispatch(routerRedux.push({
      pathname: '/crm/customer-vis/detail',
      query: {
        dataId: item.id
      }
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

  edit() {
    this.props.dispatch(routerRedux.push('/crm/customer-vis/edit'))
  }

  render() {
    const { list, dispatch, date } = this.props;
    // const tableProps = {
    //   loading: loading.effects['activity/getActivityPage'],
    //   dataSource : list ,
    //   pagination,
    //   onChange (page) {
    //     const { pathname } = location
    //     dispatch(routerRedux.push({
    //       pathname,
    //       query: {
    //         page: page.current,
    //         size: page.pageSize,
    //       },
    //     }))
    //   },
    // }
    // let btns = []
    // for (let i=0; i< 100; i++) {
    //   btns.push(<Button className="left-time-btn" key={i}>范冰冰</Button>)
    // }
    const times = VISIT_TIME.map((record, index) => {
      let btns = []
      list.map((item) => {
        if (index + 1 == item.visitTimeId) {
          btns.push(
            <PermissionButton testKey='CUSTOMERVIS_DETAIL' onClick={this.pushDetail.bind(this, item)} className="left-time-btn" key={item.id}>{ item.name }</PermissionButton>)
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


    return (
      <div className="customer-vis-cent">
        <Row style={{ height: 40 }}>
          <Col span={12}>
            <span>预约日期：</span>
            <DatePicker style={{ width: 200 }} format="YYYY-MM-DD" defaultValue={ date } onChange={this.onChangeDate.bind(this)}/>
          </Col>
          <Col span={12}>
            <div style={{ float: 'right' }}>
              <Link to='/crm/customer-vis/add'>
                <PermissionButton testKey='CUSTOMERVIS_ADD' className="one-button"> 预约参观 </PermissionButton >
              </Link>
            </div>
          </Col>
        </Row>
        <Card title={ date.format('YYYY年MM月DD日') }>
          <Timeline>
            {
              times
            }
          </Timeline>
          <div className="button-group-bottom-common" style={{ marginBottom: '10px'}}>
            <PermissionButton testKey='CUSTOMERVIS_EDIT' onClick={this.edit.bind(this)} className="button-group-bottom-1">编辑</PermissionButton>
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

export default connect(mapStateToProps)(CustomerVisIndex);
