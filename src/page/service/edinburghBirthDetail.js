/**
 * 爱丁堡忧郁单详情页
 */
import React, { Component } from 'react';
import { creatButton, detailComponent } from './ServiceComponentCreat'
import { Card,  Form, Spin, Row, Col, DatePicker,  InputNumber, Select } from 'antd';
import { connect } from 'dva';
import { parse } from 'qs'
import moment from 'moment'
const Option = Select.Option;
import './serviceComponent.scss'
import { routerRedux } from 'dva/router'
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
  
  //创建按钮
  createClicked(){
    this.props.dispatch(routerRedux.push(`/service/edinburgh-birth/create?customerid=${parse(location.search.substr(1)).customerid}`));
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
              {creatButton('创建', this.createClicked.bind(this))}
              {creatButton('打印', this.print.bind(this))}
            </div>
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
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
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您能看到事物有趣的一面，并笑得开心"
                          >
                            {getFieldDecorator(`one-${k}`, {
                              initialValue: v.one.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select disabled={v.isEdit ? false : true}>
                              <Option value='0'>同以前一样</Option>
                              <Option value='1'>没有以前那么多</Option>
                              <Option value='2'>肯定比以前少</Option>
                              <Option value='3'>完全不能</Option>
                              </Select>
                              
                              )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您欣然期待未来的一切"
                          >
                            {getFieldDecorator(`two-${k}`, {
                              initialValue: v.two.toString(),
                              rules: [
                                { required: true, message: '请选择!' }
                              ]
                            })(
  
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>同以前一样</Option>
                                <Option value='1'>没有以前那么多</Option>
                                <Option value='2'>肯定比以前少</Option>
                                <Option value='3'>完全不能</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="当事情出错时，您会不必要地责备自己"
                          >
                            {getFieldDecorator(`three-${k}`, {
                              initialValue: v.three.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>大部分时候这样</Option>
                                <Option value='1'>有时候这样</Option>
                                <Option value='2'>不经常这样</Option>
                                <Option value='3'>没有这样</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您无缘无故感到焦虑和担心"
                          >
                            {getFieldDecorator(`four-${k}`, {
                              initialValue: v.four.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>一点也没有</Option>
                                <Option value='1'>极少有</Option>
                                <Option value='2'>有时候这样</Option>
                                <Option value='3'>经常这样</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您无缘无故感到害怕和惊慌"
                          >
                            {getFieldDecorator(`five-${k}`, {
                              initialValue: v.five.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>相当多时候这样</Option>
                                <Option value='1'>有时候这样</Option>
                                <Option value='2'>不经常这样</Option>
                                <Option value='3'>一点也没有</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="很多事情冲着您而来，使您透不过气"
                          >
                            {getFieldDecorator(`six-${k}`, {
                              initialValue: v.six.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>大多数时候您都不能应付</Option>
                                <Option value='1'>有时候您不能像平时那样应付得好</Option>
                                <Option value='2'>大部分时候您都能像平时那样应付得好</Option>
                                <Option value='3'>您一直都能应付得好</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您很不开心，以致失眠"
                          >
                            {getFieldDecorator(`seven-${k}`, {
                              initialValue: v.seven.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>大部分时候这样</Option>
                                <Option value='1'>有时候这样</Option>
                                <Option value='2'>不经常这样</Option>
                                <Option value='3'>一点也没有</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您感到难过和悲伤"
                          >
                            {getFieldDecorator(`eight-${k}`, {
                              initialValue: v.eight.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>大部分时候这样</Option>
                                <Option value='1'>相当时候这样</Option>
                                <Option value='2'>不经常这样</Option>
                                <Option value='3'>一点也没有</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您不开心到哭泣"
                          >
                            {getFieldDecorator(`nine-${k}`, {
                              initialValue: v.nine.toString(),
                              rules: [
                                { required: true, message: '请选择！' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>大部分时候这样</Option>
                                <Option value='1'>有时候这样</Option>
                                <Option value='2'>只是偶而这样</Option>
                                <Option value='3'>没有这样</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="您想过要伤害自己"
                          >
                            {getFieldDecorator(`ten-${k}`, {
                              initialValue: v.ten.toString(),
                              rules: [
                                { required: true, message: '请选择!' }
                              ]
                            })(
                              <Select  disabled={v.isEdit ? false : true}>
                                <Option value='0'>相当多时候这样</Option>
                                <Option value='1'>有时候这样</Option>
                                <Option value='2'>很少这样</Option>
                                <Option value='3'>没有这样</Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem
                            {...formItemLayout}
                            label="总分"
                          >
                            {getFieldDecorator(`totalScore`, {
                              initialValue: v.totalScore,
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


