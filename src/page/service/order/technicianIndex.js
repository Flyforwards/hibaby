/**
 * 预约技师
 */
import React, { Component } from 'react';
import { Card, Row, Col, Select, Input, DatePicker } from 'antd';
import { connect } from 'dva';
import   './SwimmingIndex.scss';
const Option = Select.Option;
import { Link } from 'react-router';
import moment from 'moment'
class TechnicianIndex extends Component {
  
  constructor(props) {
    super(props);
  }
  
  
  //英文周几对应的汉字周几
  chineseWeekDay(dayOfWeek) {
    var chinessWeek = '';
    if (dayOfWeek == 'Sunday') {
      chinessWeek = '周日';
    }
    else if (dayOfWeek == 'Monday') {
      chinessWeek = '周一';
    }
    else if (dayOfWeek == 'Tuesday') {
      chinessWeek = '周二';
    }
    else if (dayOfWeek == 'Wednesday') {
      chinessWeek = '周三';
    }
    else if (dayOfWeek == 'Thursday') {
      chinessWeek = '周四';
    }
    else if (dayOfWeek == 'Friday') {
      chinessWeek = '周五';
    }
    else if (dayOfWeek == 'Saturday') {
      chinessWeek = '周六';
    }
    
    return (
      chinessWeek
    )
  }
  
  changeTime = (date, dateString) => {
    dateString == '' ? dateString = moment().format("YYYY-MM-DD") : dateString;
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/changeTechniciansTime',
      payload: dateString
    })
  
  
    dispatch({
      type:"serviceCustomer/getTechnicians",
      payload:{date:dateString}
    })
   
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
  

  
  render() {
    const { techniciansList,todayTime } = this.props;
    return (
      <Card className="order-swimming order-technician">
        <div className="choose_time"><DatePicker defaultValue={moment()} format="YYYY-MM-DD" onChange={this.changeTime}/></div>
        <Row >
          {
            techniciansList.map((v, k) => {
              return (
                <Col span={8} key={k} className="technicianRow">
                  <Row>
                    <Col span={8}>
                      <div className="ItemLeft">
                        <Link to= {`/service/order-technician/detail?userid=${v.userId}&date=${moment(todayTime).format('YYYY-MM-DD')}`} >
                          <img className="swimming-icon" src="http://test.jubaopen365.com/upload/20170911/82e6eeb570da901a4700aa9071f43ab2.png" alt="技师信息"/>
                        </Link>
                        <p className="describe">{v.describe}</p>
                        <Select className="swimming-select" defaultValue={`${v.state}`} placeholder="请选择" onChange={this.handleChange.bind(this, v.userId)}>
                          <Option value="1">开工</Option>
                          <Option value="0">离开</Option>
                        </Select>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="ItemRight">
                        {
                          v.dates.map((vv, kk) => {
                            return (
                              <p key={kk}>{vv}</p>
                            )
                          })
                        }
                      </div>
                    </Col>
                  </Row>
                </Col>
              )
            })
          }
        </Row>
      
      </Card>
    );
  }
  
}
function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}
export default connect(mapStateToProps)(TechnicianIndex);
