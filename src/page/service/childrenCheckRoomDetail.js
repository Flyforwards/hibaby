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
  backButton = () => {
    //const{babyId}  =data
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const customerId = param.customerid
    dispatch({
      type: 'serviceCustomer/getPediatricNoteList',
      payload: {
        customerId: customerId
        //babyId: babyId
      }
    })
  }
  
  //编辑按钮
  editBackClicked(data) {
    const { dispatch } = this.props;
    //dispatch({
    //  type: 'serviceCustomer/isEditChildren',
    //  payload: data
    //})
    dispatch({
      type: 'serviceCustomer/getPediatricNoteById',
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
        payload: { values, customerId }
      })
    } else {
      let values = this.state.postInfo;
      if (values.descInfo == '') {
        message.error('请输入内容!')
      } else {
        values.operatorItem = 0
        dispatch({
          type: 'serviceCustomer/savePediatricNote',
          payload: { values, customerId }
        })
      }
    }
  }
  
  //创建按钮
  createButton(data) {
    const { babyId } = data;
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const createInfo = {
      descInfo: '',
      isEdit: true,
      customerId: parseInt(param.customerid),
      operatorItem: parseInt(param.operatoritem),
      babyId,
      isCreate: true
    }
    
    dispatch({
      type: 'serviceCustomer/createDescribeChildrenInfo',
      payload: createInfo
    })
  }
  
  //取消按钮
  cancelCreate(data) {
    
    this.props.dispatch({
      type: 'serviceCustomer/noCreateDescribeChildrenInfo',
      payload: data
    })
    
  }
  
  render() {
    const { loading, baseInfoDict, describeChildrenInfo, BabyList } = this.props;
    let baseInfoDivAry = detailComponent(baseInfoDict)
    let children = location.pathname.indexOf('children-record');
    const bottomDiv =
            <div className='button-group-bottom-common'>
              {creatButton('返回', this.backClicked.bind(this))}
              {creatButton('打印', this.print.bind(this))}
            </div>
    const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    if (children !== -1) {
      return (
        <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
          <Card className="checkRoomDetailCard">
            {baseInfoDivAry}
            <span className="checkRoomDetailTimeSpan">筛选日期：</span>
            <DatePicker className="checkRoomDetailTime" onChange={this.onChangeTime}/>
            {
              <Tabs type="card" onChange={this.changeTab} defaultActiveKey={this.props.activeKey ? this.props.activeKey : '0'}>
                {
                  this.props.BabyList && this.props.BabyList.map((v, k) => {
                    return (
                      <TabPane key={k} tab={`宝${letter[k]}`}>
                        {
                          describeChildrenInfo.length != 0 && describeChildrenInfo.map((vv, kk) => {
                            if (vv.babyId == v.babyId) {
                              return (
                                vv.notelist.map((vvv, kkk) => {
                                  return (
                                    <div key={kkk} className="checkRoomDetail">
                                      <Row key={vv.notelist.length} className="checkRoomDetailRow">
                                        <Col span={1}>描述：</Col>
                                        <Col span={14}>
                                          {
                                            vvv.isEdit ?
                                              <TextArea defaultValue={vvv.descInfo} autosize onChange={this.edit.bind(this, vvv)}/> :
                                              <p>{vvv.descInfo}</p>
                                          }
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col span={6} offset={12}><span>操作者：</span><span>{vvv.operator}</span></Col>
                                        <Col span={6}><span>时间：</span><span>{moment(vvv.operatorTime).format("YYYY-MM-DD")}</span></Col>
                                      </Row>
                                      <div className="buttonBox">
                                        <div className='button-group-bottom-common'>
                                          {vvv.isEdit != true && creatButton('编辑', this.editBackClicked.bind(this, {
                                            kk,
                                            kkk,
                                            isEdit: true,
                                            dataId: vvv.id,
                                            babyId: vvv.babyId
                                          }))}
                                          {vvv.isEdit != true && creatButton('删除', this.onDelete.bind(this, {
                                            id: vvv.id,
                                            babyId: vv.babyId
                                          }))}
                                          {vvv.isEdit && creatButton('确定', this.submitClicked.bind(this, {
                                            k: kk,
                                            kk: kkk
                                          }))}
                                          {vvv.isCreate ? creatButton('取消', this.cancelCreate.bind(this, {
                                            kk,
                                            kkk
                                          })) : (vvv.isEdit && creatButton('返回', this.backButton.bind(this)))}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              )
                            }
                          })
                        }
                        <div className="buttonBox">
                          <div className='button-group-bottom-common'> { creatButton('创建', this.createButton.bind(this, { babyId: v.babyId }))}
                          </div>
                        </div>
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
                    <TabPane key={k} tab={`宝${letter[k]}`}>
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


