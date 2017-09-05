/**
 * 爱丁堡忧郁单详情页
 */
import React, { Component } from 'react';
import { creatButton, detailComponent } from './ServiceComponentCreat'
import { Card, Input, Form, Button, Spin, Row, Col, message, DatePicker, Tabs, InputNumber } from 'antd';
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
  
  onDelete(values) {
    const param = parse(location.search.substr(1));
    const customerId = param.customerid
    this.props.dispatch({
      type: 'serviceCustomer/delEdinburghMelancholyGauge',
      payload: { values, customerId }
    })
  }
  
  //返回按钮
  backClicked() {
    window.history.go(-1)
  }
  
  print() {
  
  }
  
  
  //时间选择
  onChangeTime = (date, dateString) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/edinburghChangeTime',
      payload: dateString
    })
    
    const param = parse(location.search.substr(1));
    const { customerid } = param;
    let data = {
      customerId: parseInt(customerid)
    }
    dateString != '' ? data.date = dateString : null
    dispatch({
      type: 'serviceCustomer/getEdinburghMelancholyGaugeList',
      payload: data
    })
   
  }
  
  //编辑按钮和编辑中的返回按钮
  editBackClicked(data) {
    this.props.form.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'serviceCustomer/isEditEdinburgh',
      payload: data
    })
    
  }
  
  
  //确定按钮
  handleSubmit(data, e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const customerId = param.customerid
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { k, info } = data;
        const keysArray = Object.keys(values);
        keysArray.map((v, kk) => {
          const arrTxt = v.split('-');
          const name = arrTxt[0];
          const keyTxt = arrTxt[1];
          if (parseInt(keyTxt) == k) {
            info[name] = values[v]
          }
        })
        info.operatorItem = 12;
        dispatch({
          type: 'serviceCustomer/saveEdinburghMelancholyGauge',
          payload: { info, customerId }
        })
      }
    });
  }
  
  
  render() {
    const { loading, baseInfoDict, edinburghListInfo, form } = this.props;
    const { getFieldDecorator } = form;
    let baseInfoDivAry = detailComponent(baseInfoDict)
    let edinburgh = location.pathname.indexOf('edinburgh-birth');
    const bottomDiv =
            <div className='button-group-bottom-common'>
              {creatButton('返回', this.backClicked.bind(this))}
              {creatButton('打印', this.print.bind(this))}
            </div>
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    if (edinburgh !== -1) {
      return (
        <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId'] : false}>
          <Card className="checkRoomDetailCard edinburghCard">
            {baseInfoDivAry}
            <span className="checkRoomDetailTimeSpan">筛选日期：</span>
            <DatePicker className="checkRoomDetailTime" onChange={this.onChangeTime}/>
            {
              edinburghListInfo.length != 0 &&
              edinburghListInfo.map((v, k) => {
                return (
                  <Card key={k}>
                    <Form className="formBox">
                      <Row gutter={40}>
                        <Col span={6}>
                          <FormItem
                            {...formItemLayout}
                            label="1"
                          >
                            {getFieldDecorator(`one-${k}`, {
                              initialValue: v.one,
                              rules: [
                                { required: true, message: '请输入数值!' }
                              ]
                            })(
                              <InputNumber min={0} disabled={v.isEdit ? false : true}/>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={6}>
                          <FormItem
                            {...formItemLayout}
                            label="2"
                          >
                            {getFieldDecorator(`two-${k}`, {
                              initialValue: v.two,
                              rules: [
                                { required: true, message: '请输入数值!' }
                              ]
                            })(
                              <InputNumber min={0} disabled={v.isEdit ? false : true}/>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={6}>
                          <FormItem
                            {...formItemLayout}
                            label="3"
                          >
                            {getFieldDecorator(`three-${k}`, {
                              initialValue: v.three,
                              rules: [
                                { required: true, message: '请输入数值!' }
                              ]
                            })(
                              <InputNumber min={0} disabled={v.isEdit ? false : true}/>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={4} offset={14}><span>操作者:</span> {v.operator}</Col>
                        <Col span={4}><span>操作时间:</span> {moment(v.operatorTime).format("YYYY-MM-DD HH:mm:ss")}</Col>
                        <div className="buttonBox">
                          <div className='button-group-bottom-common'>
                            {v.isEdit != true && creatButton('编辑', this.editBackClicked.bind(this, {
                              k,
                              isEdit: true
                            }))}
                            {v.isEdit != true && creatButton('删除', this.onDelete.bind(this, {
                              operatorItem: 12,
                              dataId: v.id
                            }))}
                            {v.isEdit && creatButton('确定', this.handleSubmit.bind(this, { info: v, k }))}
                            {v.isEdit && creatButton('返回', this.editBackClicked.bind(this, { k, isEdit: false }))}
                          
                          </div>
                        </div>
                      
                      </Row>
                    </Form>
                  </Card>
                )
              })
              
            }
          </ Card >
          { bottomDiv }
        </Spin>
      )
    } else {
      return (
        <Card className="checkRoomDetailCard edinburghCard">
          {
            edinburghListInfo.length != 0 &&
            edinburghListInfo.map((v, k) => {
              return (
                <Card key={k}>
                  <Row className="rowBox">
                    <Col span={6}><span className="number">1:</span> {v.one}</Col>
                    <Col span={6}><span className="number">2:</span> {v.two}</Col>
                    <Col span={6}><span className="number">3:</span> {v.three}</Col>
                    <Col span={6}><span className="number">4:</span> {v.four}</Col>
                    <Col span={6}><span className="number">5:</span> {v.five}</Col>
                    <Col span={6}><span className="number">6:</span> {v.six}</Col>
                    <Col span={6}><span className="number">7:</span> {v.seven}</Col>
                    <Col span={6}><span className="number">6:</span> {v.eight}</Col>
                    <Col span={6}><span className="number">9:</span> {v.nine}</Col>
                    <Col span={6}><span className="number">10:</span> {v.ten}</Col>
                    <Col span={6}><span className="number">总分:</span> {v.totalScore}</Col>
                    <Col span={4} offset={14}><span>操作者:</span> {v.operator}</Col>
                    <Col span={4}><span>操作时间:</span> {moment(v.operatorTime).format("YYYY-MM-DD HH:mm:ss")}</Col>
                  </Row>
                </Card>
              )
            })
            
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


