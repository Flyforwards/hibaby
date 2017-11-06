/**
 * 爱丁堡忧郁单详情页
 */
import React, { Component } from 'react';
import { creatButton, detailComponent } from '../ServiceComponentCreat'
import { Card, Form, Row, Col, InputNumber, Select } from 'antd';
import { parse } from 'qs'
import { connect } from 'dva';
const Option = Select.Option;
import '../serviceComponent.scss'
const FormItem = Form.Item;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      descInfo: ''
    }
  }
  
  //返回按钮
  backClicked() {
    window.history.go(-1)
  }
  
  
  //确定按钮
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const param = parse(location.search.substr(1));
    const customerId = param.customerid
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const info = values;
        info.operatorItem = 12;
        info.customerId = customerId;
        dispatch({
          type: 'serviceCustomer/saveEdinburghMelancholyGauge',
          payload: { info, customerId ,isBack:true}
        })
      }
    });
  }
  
  
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    let edinburgh = location.pathname.indexOf('edinburgh-birth');
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    }
    return (
      <Card className="checkRoomDetailCard edinburghCard">
        <div className="tooltipTxt">
          
          <h2>最近一周心情感受</h2>
          <p>我们想了解一下您的感受。请选择一个最能反映您过去七天感受的答案。</p>
          <p className="redTxt">注意：不只是您今天的感觉，而是过去七天的感受。</p>
          <p>例如：我感到愉快。 （0）大部分时候这样。（1）有时候这样。（2）不经常这样。（3）一点也没有。</p>
          <p>选择答案（2）表明在上一周内你大部分时间都感到愉快。请照同样方法完成以下各题。</p>
        </div>
        <Form className="formBox">
          <Row gutter={40}>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="您能看到事物有趣的一面，并笑得开心"
              >
                {getFieldDecorator(`one`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select>
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
                {getFieldDecorator(`two`, {
                  rules: [
                    { required: true, message: '请选择!' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`three`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`four`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`five`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`six`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`seven`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`eight`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`nine`, {
                  rules: [
                    { required: true, message: '请选择！' }
                  ]
                })(
                  <Select  >
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
                {getFieldDecorator(`ten`, {
                  rules: [
                    { required: true, message: '请选择!' }
                  ]
                })(
                  <Select  >
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
                  rules: [
                    { required: true, message: '请输入数值!' }
                  ]
                })(
                  <InputNumber min={0}/>
                )}
              </FormItem>
            </Col>
            <div className="buttonBox">
              <div className='button-group-bottom-common'>
                {creatButton('确定', this.handleSubmit.bind(this))}
                { creatButton('返回', this.backClicked.bind(this))}
              
              </div>
            </div>
          
          </Row>
        </Form>
      </Card>
    )
  }
}


const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return { ...state.serviceCustomer, loading: state.loading }
}

export default connect(mapStateToProps)(DetailForm);


