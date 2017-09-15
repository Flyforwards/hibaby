/**
 * 游泳详情页
 * Created by yangjingjing on 2017/9/6.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Tabs, Button, DatePicker, Select } from 'antd';
import { Link } from 'react-router';
import   './SwimmingIndex.scss';
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import moment from 'moment'

const TabPane = Tabs.TabPane;
const Option = Select.Option;
class SwimmingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '0'
    }
  }
  
  handleBack = () => {
    this.props.dispatch(routerRedux.push(`/service/order-technician`));
  }
  
  handleHistory = (userId) => {
    this.props.dispatch(routerRedux.push(`/service/order-technician/history?userid=${userId}`));
  }
  
  handleChange = (userId, value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/changeTechnicianState',
      payload: {
        state: parseInt(value),
        userId: parseInt(userId)
      }
    })
  }
  
  changeTime = (userId, date, dateString) => {
    dateString == '' ? dateString = moment().format("YYYY-MM-DD") : dateString;
    const { dispatch, isAllTechnicians } = this.props;
    dispatch({
      type: 'serviceCustomer/changeTechniciansTime',
      payload: dateString
    })
    
    dispatch({
      type: 'serviceCustomer/getTechniciansInfo',
      payload: { type: isAllTechnicians, userId, date: dateString }
    })
    this.setState({ activeKey: '0', selectedTime: dateString });
  }
  
  callback = (userId, key) => {
    const { todayTime, dispatch, isAllTechnicians } = this.props;
    this.setState({ activeKey: key });
    const date = moment(todayTime).add(key, 'days').format("YYYY-MM-DD")
    this.setState({
      selectedTime: date
    })
    dispatch({
      type: 'serviceCustomer/getTechniciansInfo',
      payload: { type: isAllTechnicians, userId, date }
    })
  }
  
  
  closeTechnician = (info, userId) => {
    const { time, timeId } = info;
    const { dispatch, todayTime } = this.props;
    
    let dateInfo = this.state.selectedTime ? this.state.selectedTime : todayTime;
    dispatch({
      type: 'serviceCustomer/changeIsAllTechnicians',
      payload: 1
    })
    dispatch({
      type: 'serviceCustomer/closeTechnician',
      payload: { time, timeId, userId, date: moment(dateInfo).format("YYYY-MM-DD") }
    })
    
    
  }
  
  openTechnician = (dataId, userId) => {
    const { dispatch, todayTime } = this.props;
    let dateInfo = this.state.selectedTime ? this.state.selectedTime : todayTime
    dispatch({
      type: 'serviceCustomer/openTechnician',
      payload: { dataId, userId, date: moment(dateInfo).format("YYYY-MM-DD") }
    })
  }
  
  cancelTechnician = (dataId, userId) => {
    const { dispatch, todayTime } = this.props;
    let dateInfo = this.state.selectedTime ? this.state.selectedTime : todayTime
    dispatch({
      type: 'serviceCustomer/cancelTechnician',
      payload: { dataId, userId, date: moment(dateInfo).format("YYYY-MM-DD") }
    })
  }
  
  
  isAll = (userId, isAllType) => {
    const { dispatch, todayTime } = this.props;
    let dateInfo = this.state.selectedTime ? this.state.selectedTime : todayTime
    dispatch({
      type: 'serviceCustomer/changeIsAllTechnicians',
      payload: isAllType
    })
    dispatch({
      type: 'serviceCustomer/getTechniciansInfo',
      payload: { type: isAllType, userId, date: moment(dateInfo).format('YYYY-MM-DD') }
    })
  }
  
  
  render() {
    const { techniciansListDetail, todayTime, isAllTechnicians } = this.props;
    const { describe, list, state, userId } = techniciansListDetail;
    let timeArr = [];
    for (var i = 0; i < +5; i++) {
      timeArr.push(moment(todayTime).add(i, 'days').format("YYYY-MM-DD"))
    }
    const param = parse(location.search.substr(1));
    console.log(param.date)
    
    return (
      <Card className="DetailCard">
        <Row className="date-title">
          <Col span={24}>
            <DatePicker defaultValue={moment(param.date)} format="YYYY-MM-DD" onChange={this.changeTime.bind(this, userId)}/>
          </Col>
        </Row>
        {
          isAllTechnicians == 1 ?
            <Button className='button-group-1 clickBtn' onClick={this.isAll.bind(this, userId, 2)}>只看可约</Button> :
            <Button className='button-group-1 clickBtn' onClick={this.isAll.bind(this, userId, 1)}>查看全部</Button>
        }
        
        <Tabs type="card" onChange={this.callback.bind(this, userId)} activeKey={this.state.activeKey}>
          {
            timeArr.map((v, k) => {
              return (
                <TabPane key={`${k}`} tab={v}>
                  <Row className="DetailRow">
                    <Col span={4} className="DetailLeft">
                      <div className="ItemLeft">
                        <img className="swimming-icon" src="http://test.jubaopen365.com/upload/20170911/82e6eeb570da901a4700aa9071f43ab2.png" alt=""/>
                        <p className="describe">{describe}</p>
                        <Select className="swimming-select" defaultValue={`${state}`} placeholder="请选择" onChange={this.handleChange.bind(this, userId)}>
                          <Option value="1">开工</Option>
                          <Option value="0">离开</Option>
                        </Select>
                      </div>
                    </Col>
                    <Col span={20} className="DetailRight">
                      {
                        list.map((vv, kk) => {
                          return (
                            <div className="DetailValue" key={kk}>
                              <Row className="TimeValue">
                                <Col span={6}>{vv.time}</Col>
                                <Col span={6}>{vv.serviceInfo}</Col>
                                <Col span={6}>{vv.customerName} - {vv.customerRoom}</Col>
                                {
                                  vv.technicianState == 1 ?
                                    <Col span={6}><span className="txtValue">可约</span><Button onClick={this.closeTechnician.bind(this, vv, userId)}>关闭预约</Button></Col> : vv.technicianState == 2 ?
                                    <Col span={6}><span className="txtValue">不可约</span><Button onClick={this.openTechnician.bind(this, vv.technicianId, userId)}>开启预约</Button></Col> :
                                    <Col span={6}><span className="txtValue">已约</span><Button onClick={this.cancelTechnician.bind(this, vv.technicianId, userId)}>取消预约</Button></Col>
                                }
                              </Row>
                            </div>
                          )
                        })
                      }
                    </Col>
                  </Row>
                </TabPane>
              )
            })
          }
        </Tabs>
        
        
        <div className="Detail-Bottom">
          <Button className="historyBtn button-group-bottom-2" onClick={this.handleHistory.bind(this, userId)}>历史</Button>
          <Button className="button-group-bottom-1" onClick={this.handleBack.bind(this)}>返回</Button>
        </div>
      </Card>
    );
    
  }
  
}
function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}
export default connect(mapStateToProps)(SwimmingDetail);
