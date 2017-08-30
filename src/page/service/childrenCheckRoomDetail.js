/**
 * 儿科查房记录单详情页
 */
import React, { Component } from 'react';
import { creatButton, detailComponent } from './ServiceComponentCreat'
import { Card, Input, Form, Button, Spin, Row, Col, message, DatePicker, Tabs } from 'antd';
import { connect } from 'dva';
import { parse } from 'qs'
import moment from 'moment'
const { TextArea } = Input;
import './serviceComponent.scss'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      descInfo: ''
    }
  }
  
  onDelete(postInfo) {
    const param = parse(location.search.substr(1));
    postInfo.operatorItem = 0;
    postInfo.customerId = param.customerid
    this.props.dispatch({
      type: 'serviceCustomer/DelPediatricNote',
      payload: postInfo
    })
  }
  
  //返回按钮
  backClicked() {
    window.history.go(-1)
  }
  
  print() {
  
  }
  
  
  edit = (info, e) => {
    info.descInfo = e.target.value;
    this.setState({
      postInfo: info
    })
  }
  
  //时间选择
  onChangeTime = (date, dateString) => {
    console.log(dateString, '??????')
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const { customerid } = param;
    let data = {
      customerId: parseInt(customerid)
    }
    dateString != '' ? data.date = dateString : null
    dispatch({
      type: 'serviceCustomer/getPediatricNoteList',
      payload: data
    })
  }
  
  //编辑中的返回按钮
  backButton = (k) => {
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const customerId = param.customerid
    dispatch({
      type: 'serviceCustomer/getPediatricNoteList',
      payload: {
        customerId: customerId,
        babyId: k
      }
    })
  }
  
  //编辑按钮
  editBackClicked(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/isEditChildren',
      payload: data
    })
  }
  
  //面板切换的回调
  changeTab = (activeKey) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/changeTab',
      payload: activeKey
    })
  }
  
  //确定按钮
  submitClicked(keys) {
    const { k, kk } = keys;
    const param = parse(location.search.substr(1));
    const customerId = param.customerid
    const { dispatch, describeChildrenInfo } = this.props;
    if (this.state.postInfo == null) {
      const values = describeChildrenInfo[k].notelist[kk];
      values.operatorItem = 0;
      dispatch({
        type: 'serviceCustomer/savePediatricNote',
        payload: { values, keys, customerId }
      })
    } else {
      let values = this.state.postInfo;
      if (values.descInfo == '') {
        message.error('请输入内容!')
      } else {
        values.operatorItem = 0
        dispatch({
          type: 'serviceCustomer/savePediatricNote',
          payload: { values, keys, customerId }
        })
      }
    }
  }
  
  render() {
    const { loading, baseInfoDict, describeChildrenInfo } = this.props;
    console.log(describeChildrenInfo,'////////')
    let baseInfoDivAry = detailComponent(baseInfoDict)
    let children = location.pathname.indexOf('children-record');
    const bottomDiv =
            <div className='button-group-bottom-common'>
              {creatButton('返回', this.backClicked.bind(this))}
              {creatButton('打印', this.print.bind(this))}
            </div>
    
    if (children !== -1) {
      return (
        <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
          <Card className="checkRoomDetailCard">
            {baseInfoDivAry}
            <span className="checkRoomDetailTimeSpan">筛选日期：</span>
            <DatePicker className="checkRoomDetailTime" onChange={this.onChangeTime}/>
            {
              describeChildrenInfo.length != 0 &&
              <Tabs type="card" onChange={this.changeTab} defaultActiveKey={this.props.activeKey ? this.props.activeKey : '0'}>
                {
                  describeChildrenInfo.map((v, k) => {
                    return (
                      <TabPane key={k} tab={`baby${k + 1}`}>
                        {
                          v.notelist.map((vv, kk) => {
                            return (
                              <div key={kk} className="checkRoomDetail">
                                <Row className="checkRoomDetailRow">
                                  <Col span={1}>描述：</Col>
                                  <Col span={14}>
                                    {
                                      vv.isEdit ?
                                        <TextArea defaultValue={vv.descInfo} autosize onChange={this.edit.bind(this, vv)}/> :
                                        <p>{vv.descInfo}</p>
                                    }
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={6} offset={12}><span>操作者：</span><span>{vv.operator}</span></Col>
                                  <Col span={6}><span>时间：</span><span>{moment(vv.operatorTime).format("YYYY-MM-DD")}</span></Col>
                                </Row>
                                <div className="buttonBox">
                                  <div className='button-group-bottom-common'>
                                    {vv.isEdit != true && creatButton('编辑', this.editBackClicked.bind(this, {
                                      k,
                                      kk,
                                      isEdit: true
                                    }))}
                                    {vv.isEdit != true && creatButton('删除', this.onDelete.bind(this, {
                                      id: vv.id,
                                      babyId: v.babyId
                                    }))}
                                    {vv.isEdit && creatButton('确定', this.submitClicked.bind(this, { k, kk }))}
                                    {vv.isEdit && creatButton('返回', this.backButton.bind(this, k))}
                                  </div>
                                </div>
                              </div>
                            
                            )
                          })
                        }
                      </TabPane>
                    )
                  })
                }
              </Tabs>
            }
          </ Card >
          { bottomDiv }
        </Spin>
      )
    } else {
      return (
        <Card className="checkRoomDetailCard">
          {
            describeChildrenInfo.length != 0 && <Tabs type="card" defaultActiveKey='0'>
              {
                describeChildrenInfo.map((v, k) => {
                  return (
                    <TabPane key={k} tab={`baby${k + 1}`}>
                      {
                        v.notelist.map((vv, kk) => {
                          return (
                            <div key={kk} className="checkRoomDetail">
                              <Row className="checkRoomDetailRow">
                                <Col span={1}>描述：</Col>
                                <Col span={14}><p>{vv.descInfo}</p></Col>
                              </Row>
                              <Row>
                                <Col span={6} offset={12}><span>操作者：</span><span>{vv.operator}</span></Col>
                                <Col span={6}><span>时间：</span><span>{moment(vv.operatorTime).format("YYYY-MM-DD")}</span></Col>
                              </Row>
                            </div>
                          )
                        })
                      }
                    </TabPane>
                  )
                })
              }
            </Tabs>
          }
        </Card>
      )
    }
    
    
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}

export default connect(mapStateToProps)(DetailForm);


