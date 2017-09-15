/**
 * Created by Flyforwards on 2017/9/12.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, DatePicker, Table, message, Modal, Radio, Pagination } from 'antd';
import  './SwimmingIndex.scss';
import './order.scss';
import { routerRedux } from 'dva/router'
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
import moment from 'moment'
import { queryURL, format } from '../../../utils/index.js';

class TechnicianHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      visible: false,
      idValue: 0
    };
    this.columns = [
      {
        title: '时间段',
        dataIndex: 'time',
        key: 'time'
      }, {
        title: '服务项',
        dataIndex: 'serviceName',
        key: 'serviceName'
      }, {
        title: '客户姓名',
        dataIndex: 'customerName',
        key: 'customerName'
      }, {
        title: '客户房间号',
        dataIndex: 'customerRoom',
        key: 'customerRoom'
      }
    ]
    
  }
  
  
  handleBack = () => {
    this.props.dispatch(routerRedux.push(`/service/order-technician`));
  }
  
  
  onChoiceRoom() {
    this.setState({
      visible: true
    })
  }
  
  onCancelModal() {
    this.setState({
      visible: false
    })
  }
  
  onOk() {
    if (this.state.userIdValue && this.state.userIdValue != 0) {
      
      this.state.startDate ?
        this.props.dispatch(routerRedux.push(`/service/order-technician/history?userid=${this.state.userIdValue}&startdate=${this.state.startDate }&enddate=${this.state.endDate}`)) :
        this.props.dispatch(routerRedux.push(`/service/order-technician/history?userid=${this.state.userIdValue}`))
      this.setState({
        visible: false
      })
    } else {
      message.error("请选择一个技师")
    }
    
  }
  
  handleSearch = () => {
    if (this.state.endDate) {
      const userId = queryURL('userid')
      this.props.dispatch({
        type: 'serviceCustomer/getTechnicianHistory',
        payload: {
          userId,
          "page": 1,
          "size": 10,
          "sortField": "time",
          "sortOrder": "AESC",
          "startDate": moment(this.state.startDate).format("YYYY-MM-DD"),
          "endDate": moment(this.state.endDate).format("YYYY-MM-DD")
        }
      });
      this.props.dispatch({
        type: 'serviceCustomer/getTechnicianUtilization',
        payload: {
          userId,
          "page": 1,
          "size": 10,
          "sortField": "time",
          "sortOrder": "AESC",
          "startDate": moment(this.state.startDate).format("YYYY-MM-DD"),
          "endDate": moment(this.state.endDate).format("YYYY-MM-DD")
        }
      })
    } else {
      message.error("请选择日期")
    }
  }
  
  onDateChange(value, dateString) {
    this.setState({
      startDate: dateString[0],
      endDate: dateString[1]
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/saveChooseTechnicianTime',
      payload: dateString
    })
  }
  
  
  chooseTechnician = (e) => {
    this.setState({
      userIdValue: e.target.value
    })
  }
  
  changeTechnicianNamePageInfo = (pageNumber) => {
    console.log(pageNumber)
    const { dispatch } = this.props
    dispatch({
      type: 'serviceCustomer/getTechnicianList',
      payload: { page: pageNumber, size: 10 }
    })
  }
  
  render() {
    const { technicianUtilization, technicianHistoryList, dispatch, technicianHistoryPageInfo, technicianNameList, technicianNamePageInfo } = this.props;
    let userId = queryURL("userid");
    const today = moment().format("YYYY-MM-DD")
    const tableProps = {
      pagination: {
        showQuickJumper: true,
        showTotal: total => `共 ${technicianHistoryPageInfo.total} 条`,
        current: technicianHistoryPageInfo.page,
        pageSize: technicianHistoryPageInfo.size,
        total: technicianHistoryPageInfo.total
      },
      dataSource: technicianHistoryList,
      onChange: (page) => {
        dispatch({
          type: 'serviceCustomer/getTechnicianHistory',
          payload: {
            'page': page.current,
            'size': page.pageSize,
            'sortField': "time",
            'sortOrder': "AESC",
            userId,
            startDate: this.state.startDate ? this.state.startDate : today,
            endDate: this.state.endDate ? this.state.endDate : today
          }
        })
      }
    };
    return (
      <Card className="HistoryCard">
        <Row className="date-title">
          <Col offset={4} span={10}>
            <RangePicker
              allowClear={false}
              format="YYYY-MM-DD"
              placeholder={['开始时间', '结束时间']}
              onChange={this.onDateChange.bind(this)}
            />
          </Col>
          <Col span={2}>
            <Button className="button-group-2" onClick={this.handleSearch.bind(this)}>搜索</Button>
          </Col>
        </Row>
        <div>
          <Row className="DetailRow">
            <Col span={4} className="DetailLeft">
              <div className="ItemLeft">
                <p style={{ 'marginBottom': '30px', 'marginTop': '30px' }}>
                  <img className="swimming-icon" src="http://test.jubaopen365.com/upload/20170911/82e6eeb570da901a4700aa9071f43ab2.png" alt=""/>
                </p>
                
                <Button icon="menu-unfold" onClick={this.onChoiceRoom.bind(this)}>切换技师</Button>
                <div className="useRateDiv">
                  使用率：{technicianUtilization}
                </div>
              </div>
            </Col>
            <Col span={20}>
              <Table rowKey="id" className="TableCenter" bordered columns={this.columns} { ...tableProps }/>
            </Col>
          </Row>
        </div>
        <div className="Detail-Bottom">
          <Button className="button-group-bottom-1" onClick={this.handleBack.bind(this)}>返回</Button>
        </div>
        
        <Modal
          title="选择房间"
          wrapClassName="vertical-center-modal"
          visible={this.state.visible}
          onCancel={this.onCancelModal.bind(this)}
          cancelText="取消"
          width={600}
          onOk={this.onOk.bind(this)}
          className="modal_s"
          maskClosable={false}
        >
          
          <RadioGroup onChange={this.chooseTechnician}>
            <Row>
              {
                technicianNameList.map((v, k) => {
                  return (
                    <Col span={12} key={k} className='chooseTechnician'>
                      <Radio value={v.id}>{v.name}</Radio>
                    </Col>)
                })
              }
            </Row>
            <Pagination
              className="technicianNamePagination"
              showQuickJumper={true}
              showTotal={total => `共 ${technicianNamePageInfo.total} 条`}
              defaultCurrent={technicianNamePageInfo.page}
              total={technicianNamePageInfo.total}
              onChange={this.changeTechnicianNamePageInfo}
            />
          </RadioGroup>
        
        
        </Modal>
      </Card>
    );
    
  }
  
}
function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}
export default connect(mapStateToProps)(TechnicianHistory);
