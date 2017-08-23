import React, { Component } from 'react';
import { CreatCard, creatButton, detailComponent } from './ServiceComponentCreat'
import { Card, Input, Form, Button, Spin, Row, Col, message, DatePicker } from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux } from 'dva/router'
const FormItem = Form.Item;
const { TextArea } = Input;

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
    //this.props.dispatch(routerRedux.push(`/service/puerpera-body/edit?${location.search.substr(1)}`));
    this.setState({
      isEdit: true
    })
  }
  
  backClicked() {
    window.history.go(-1)
    //this.props.dispatch(routerRedux.push('/service/puerpera-body'));
  }
  
  editBackClicked() {
    //this.props.dispatch(routerRedux.push(`/service/puerpera-body/detail?${location.search.substr(1)}`));
    this.setState({
      isEdit: false
    })
  }
  
  print() {
  
  }
  
  submitClicked() {
    const { describeInfo, dispatch } = this.props;
    if (this.state.descInfo == '') {
      message.error('请输入内容!')
    } else {
      describeInfo.descInfo = this.state.descInfo;
      dispatch({
        type: 'serviceCustomer/saveDoctorNote',
        payload: describeInfo
      })
      this.setState({
        isEdit: false
      })
    }
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
    console.log(date, dateString, '/////');
    const { describeInfo } = this.props
  }
  
  render() {
    const { loading, baseInfoDict, describeInfo } = this.props
    let baseInfoDivAry = detailComponent(baseInfoDict)
    
    const bottomDiv = this.state.isEdit ?
      <div className='button-group-bottom-common'>
        {creatButton('返回', this.editBackClicked.bind(this))}{creatButton('确定', this.submitClicked.bind(this))}
      </div> :
      <div className='button-group-bottom-common'>
        {creatButton('返回', this.backClicked.bind(this))}{this.props.CheckBeforeData ? creatButton('删除', this.onDelete.bind(this)) : ''}
        { describeInfo != null && creatButton('编辑', this.editBtnClick.bind(this))}{creatButton('打印', this.print.bind(this))}
      </div>
    
    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
        <Card>
          {baseInfoDivAry}
          <span style={{ 'marginTop': '30px', 'marginLeft': '15px' }}>筛选日期：</span>
          <DatePicker style={{
            'marginTop': '30px',
            'marginLeft': '20px',
            'marginBottom': '30px'
          }} onBlur={this.onChangeTime}/>
          
          {
            describeInfo != null &&
            <Card>
              <Row>
                <Col span={1}>
                  描述：
                </Col>
                <Col span={14}>
                  {
                    this.state.isEdit ?
                      <TextArea defaultValue={describeInfo.descInfo} autosize onChange={this.onChange}/> :
                      <p>{describeInfo.descInfo}</p>
                  }
                </Col>
              </Row>
              <Row style={{ 'marginTop': '40px' }}>
                <Col span={6} offset={12}>
                  <span>操作者：</span><span>{describeInfo.operator}</span>
                </Col>
                <Col span={6}>
                  <span>时间：</span><span>{describeInfo.operatorTime}</span>
                </Col>
              </Row>
            </Card>
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
