import React, { Component } from 'react';
import { creatButton, detailComponent } from './ServiceComponentCreat'
import { Card, Input, Form, Button, Spin, Row, Col, message, DatePicker } from 'antd';
import { connect } from 'dva';
import { parse } from 'qs'
import moment from 'moment'
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

  onDelete() {
    this.props.dispatch({
      type: 'serviceCustomer/DelAssessment',
      payload: { type: 1, dataId: this.props.CheckBeforeID }
    })
  }

  editBtnClick() {
    this.setState({
      isEdit: true
    })
  }

  backClicked() {
    window.history.go(-1)
  }

  editBackClicked(data) {
    const { dispatch } = this.props;
    data.info = { ...data.info, isEdit: true };
    dispatch({
      type: 'serviceCustomer/isEdit',
      payload: data
    })

  }

  print() {

  }

  submitClicked() {
    const { describeInfo, dispatch } = this.props;
    let test = {
      "customerId": 1,
      "descInfo": "测试数据",
      type: 3
    }
    //if (this.state.descInfo == '') {
    //  message.error('请输入内容!')
    //} else {
    //describeInfo.descInfo = this.state.descInfo;
    dispatch({
      type: 'serviceCustomer/saveDoctorNote',
      payload: test
    })
    this.setState({
      isEdit: false
    })
    //}
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'serviceCustomer/removeData' })
  }

  onChange = (e) => {
    const { value } = e.target;
    console.log(value)

    this.setState({
      descInfo: value
    })
  }

  onChangeTime = (date, dateString) => {
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const { customerid, type } = param;
    console.log(customerid, '???')
    let data = { customerId: parseInt(customerid), type: parseInt(type), date: dateString }
    dispatch({
      type: 'serviceCustomer/getdoctornoteList',
      payload: data
    })
  }

  render() {
    const { loading, baseInfoDict, describeInfo } = this.props;
    let baseInfoDivAry = detailComponent(baseInfoDict)
    const bottomDiv = this.state.isEdit ?
      <div className='button-group-bottom-common'>
        {creatButton('返回', this.editBackClicked.bind(this))}{creatButton('确定', this.submitClicked.bind(this))}
      </div> :
      <div className='button-group-bottom-common'>
        {creatButton('返回', this.backClicked.bind(this))}{this.props.CheckBeforeData ? creatButton('删除', this.onDelete.bind(this)) : ''}
        {creatButton('打印', this.print.bind(this))}
      </div>

    const test  = describeInfo.length != 0 && describeInfo.map((v, k) => {
        return (
          <div key={k} className="checkRoomDetail">
            <Row className="checkRoomDetailRow">
              <Col span={1}>
                描述：
              </Col>
              <Col span={14}>
                {
                  v.isEdit ?
                    <TextArea defaultValue={v.descInfo} autosize/> :
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
                {creatButton('编辑', this.editBackClicked.bind(this, { info: v, key: k }))}
                {creatButton('删除', this.submitClicked.bind(this))}
              </div>
            </div>

          </div>
        )
      })
    console.log(describeInfo, '到底是有没有编辑')
    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
        <Card className="checkRoomDetailCard">
          {baseInfoDivAry}
          <span className="checkRoomDetailTimeSpan">筛选日期：</span>
          <DatePicker className="checkRoomDetailTime" onChange={this.onChangeTime}/>
          {
            test
          }
        </Card>
        {bottomDiv}
      </Spin>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}

export default connect(mapStateToProps)(DetailForm) ;


