import React, { Component } from 'react';
import { creatButton, detailComponent } from './ServiceComponentCreat'
import { Card, Input, Form, Button, Spin, Row, Col, message, DatePicker } from 'antd';
import { connect } from 'dva';
import { parse } from 'qs'
import moment from 'moment'
import { routerRedux, Link } from 'dva/router'

const { TextArea } = Input;
import './serviceComponent.scss'

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      descInfo: ''
      
    }
  }
  
  onDelete(id) {
    const param = parse(location.search.substr(1));
    this.props.dispatch({
      type: 'serviceCustomer/DelDoctornote',
      payload: { dataId: id, operatorItem: parseInt(param.operatoritem) }
    })
  }
  
  //返回按钮
  backClicked() {
    window.history.go(-1)
  }
  
  createClicked() {
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const createInfo = {
      operatorItem: parseInt(param.operatoritem),
      customerId: parseInt(param.customerid),
      type: parseInt(param.type),
      isEdit: true,
      descInfo: '',
      isCreate: true
    };
    dispatch({
      type: 'serviceCustomer/CreateDescribeInfo',
      payload: createInfo
    })
    
  }
  
  noCreateClicked(k){
    
    this.props.dispatch({
      type: 'serviceCustomer/noCreateDescribeInfo',
      payload:k
    })
  
  }
  
  
  //编辑按钮
  editBackClicked(postInfo) {
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    postInfo.operatorItem = parseInt(param.operatoritem)
    dispatch({
      type: 'serviceCustomer/isEditGetDoctorNoteById',
      payload: postInfo
    })
  }
  
  backButton = (postData) => {
    const param = parse(location.search.substr(1));
    postData.operatorItem = parseInt(param.operatoritem)
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/getDoctorNoteById',
      payload: postData
    })
  }
  
  print() {
  
  }
  
  //确定按钮
  submitClicked(k) {
    const { dispatch, describeInfo } = this.props;
    const param = parse(location.search.substr(1));
    if (this.state.postInfo == null) {
      const postData = describeInfo[k];
      postData.operatorItem = parseInt(param.operatoritem)
      dispatch({
        type: 'serviceCustomer/saveDoctorNote',
        payload: { ...postData }
      })
    } else {
      let { postInfo } = this.state;
      if (postInfo.descInfo == '') {
        message.error('请输入内容!')
      } else {
        postInfo.operatorItem = parseInt(param.operatoritem)
        dispatch({
          type: 'serviceCustomer/saveDoctorNote',
          payload: { ...postInfo }
        })
      }
    }
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
    const { customerid, type, operatoritem } = param;
    let data = {
      customerId: parseInt(customerid),
      type: parseInt(type),
      operatorItem: parseInt(operatoritem)
    }
    dateString != '' ? data.date = dateString : null
    dispatch({
      type: 'serviceCustomer/getdoctornoteList',
      payload: data
    })
    dispatch({
      type: 'serviceCustomer/isChooseTime',
      payload: dateString
    })
  }
  
  
  render() {
    const { loading, baseInfoDict, describeInfo } = this.props;
    let baseInfoDivAry = detailComponent(baseInfoDict)
    const bottomDiv =
            <div className='button-group-bottom-common'>
              {creatButton('返回', this.backClicked.bind(this))}{this.props.CheckBeforeData ? creatButton('删除', this.onDelete.bind(this)) : ''}
              {creatButton('创建', this.createClicked.bind(this))}
              {creatButton('打印', this.print.bind(this))}
            </div>
    
    let diagnosis = location.pathname.indexOf('diagnosis-record');//中医查房
    let puerpera = location.pathname.indexOf('puerpera-record');//产妇护理
    let butler = location.pathname.indexOf('butler-rounds');//管家查房
    let nutrition = location.pathname.indexOf('nutrition-record');//营养查房
    
    if (diagnosis !== -1 || puerpera !== -1 || butler !== -1 || nutrition !== -1) {
      return (
        <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
          <Card className="checkRoomDetailCard">
            {baseInfoDivAry}
            <span className="checkRoomDetailTimeSpan">筛选日期：</span>
            <DatePicker className="checkRoomDetailTime" onChange={this.onChangeTime}/>
            {
              describeInfo.length != 0 && describeInfo.map((v, k) => {
                return (
                  <div key={k} className="checkRoomDetail">
                    <Row key={describeInfo.length} className="checkRoomDetailRow" >
                      <Col span={1} key={k}>
                        描述：
                      </Col>
                      <Col span={14}>
                        {
                          v.isEdit ?
                            <TextArea  defaultValue={v.descInfo} autosize onChange={this.edit.bind(this, v)}/> :
                            <p>{v.descInfo}</p>
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6} offset={12}>
                        <span>操作者：</span><span>{v.operator}</span>
                      </Col>
                      <Col span={6}>
                        <span>时间：</span><span>{moment(v.operatorTime).format("YYYY-MM-DD")}</span>
                      </Col>
                    </Row>
                    <div className="buttonBox">
                      <div className='button-group-bottom-common'>
                        {v.isEdit != true && creatButton('编辑', this.editBackClicked.bind(this, {
                          isEdit: true,
                          info: v,
                          key: k
                        }))}
                        {v.isEdit != true && creatButton('删除', this.onDelete.bind(this, v.id))}
                        {v.isEdit && creatButton('确定', this.submitClicked.bind(this, k))}
                        {v.isCreate == undefined && v.isEdit && creatButton('返回', this.backButton.bind(this, {
                          info: v,
                          key: k
                        }))}
                        
                        {v.isCreate&&creatButton('取消', this.noCreateClicked.bind(this,k))}
                        
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </Card>
          {bottomDiv}
        </Spin>
      )
    } else {
      const { describeDiagnosisInfo, describeObstetricInfo, describeButlerInfo, describeNutritionInfo, type } = this.props;
      let info = [];
      switch (type) {
        case (2):
          info = describeDiagnosisInfo;
          break;
        case (3):
          info = describeObstetricInfo;
          break;
        case (5):
          info = describeButlerInfo;
          break;
        case (6):
          info = describeNutritionInfo;
          break;
        default:
          info = describeDiagnosisInfo;
      }
      
      return (
        <Spin spinning={loading.effects['serviceCustomer/getdoctornoteListSum'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
          <Card>
            {
              info.length != 0 && info.map((v, k) => {
                return (
                  <div key={k} className="checkRoomDetail">
                    <Row className="checkRoomDetailRow">
                      <Col span={1}>
                        描述：
                      </Col>
                      <Col span={14}>
                        <p>{v.descInfo}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6} offset={12}>
                        <span>操作者：</span><span>{v.operator}</span>
                      </Col>
                      <Col span={6}>
                        <span>时间：</span><span>{moment(v.operatorTime).format("YYYY-MM-DD")}</span>
                      </Col>
                    </Row>
                  </div>
                )
              })
            }
          </Card>
        </Spin>
      )
    }
    
  }
}

const
  DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}

export default connect(mapStateToProps)(DetailForm);


