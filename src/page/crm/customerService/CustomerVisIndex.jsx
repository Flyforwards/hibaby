import React from 'react'
import { connect } from 'dva'
import './CustomerVisIndex.scss'
import { Table, Input, Row, Col, Icon, Button, Popconfirm, Modal, DatePicker, Card, Timeline } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
import { VISIT_TIME } from 'common/constants.js'
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
    // console.log(list);
    const times = VISIT_TIME.map((record, index) => {
      let btns = []
      // console.log(record);
      list.map((item) => {
        if (index + 1 == item.visitTimeId) {
          btns.push(
            <Button onClick={this.pushDetail.bind(this, item)} className="left-time-btn" key={item.id}>{ item.name }</Button>)
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
          <Row>
            <Col span={20}/>
            <Col span={4}>
              <Button onClick={this.edit.bind(this)} className="button-add">编辑</Button>
            </Col>
          </Row>
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
