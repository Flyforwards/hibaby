/**
 * Created by Flyforwards on 2017/5/25.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col,Popconfirm,Modal } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Link } from 'react-router';
import './card.scss';
import {routerRedux} from 'dva/router';

class CardDetail extends Component {
  constructor(props) {
    super(props)
    this.state={
      modalVisible:false,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const dataId = location.search.substr(1).split('=')[1]
    dispatch({
      type: 'card/getCardKindInfo',
      payload: { dataId }
    })


  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { cardKind, form, dispatch } = this.props;
    const { validateFields } = form;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'card/saveCard',
          payload:{  ...values }
        })
      }
    })
  }
  //验证表单

  checkPrice = (rule, value, callback) => {
    if(!value){
      callback('不能为空');
      return;
    }
    if(/^\d*$/g.test(value)){
      callback();
      return;
    }else{
      callback('只能输入整数')
    }
    if (value > 0||value ==0) {
      callback();
      return;
    }
    callback('不能为负数');
  }

  //delete
  onDelete() {
    this.setState({
      modalVisible:true,
    })
  }
  //取消model
  hideModel() {
    this.setState({
      modalVisible:false,
    })
  }
  //确定modal
  confirmModel() {
    const { dispatch } = this.props;
    const dataId = location.search.substr(1).split('=')[1];
    dispatch({
      type:'card/deleteCardById',
      payload:{
        dataId:dataId,
      }
    })
    this.setState({
      modalVisible:false,
    })
  }
  onEdit() {

  }
  render() {
    const { cardKind, form, level,} = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span:15 }
    }
    const formTextItemLayout = {
      labelCol:{ span:3},
      wrapperCol:{ span:19 }
    }
    const formRadioItemLayout = {
      labelCol:{ span:5},
      wrapperCol:{ span:17 }
    }
    //卡种级别渲染
    let options = [];
    level? level.map(function(elem,index){
      options.push(<Option key={elem.id}>{elem.name}</Option>)
    }):null;
    return (
      <div  style={{ 'padding': '20px' }}>
        <Card title="会员卡信息" style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span = { 8 } style={{width:'251px'}} >
                <FormItem {...formItemLayout} label="会员卡名称">
                  {getFieldDecorator('name', {
                    initialValue: cardKind ?cardKind.name : '' ,
                    rules: [{ required: true, message: '请输入会员卡名称' }],
                  })(
                    <Input placeholder="请输入会员卡名称" readOnly/>
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="储值金额" {...formItemLayout}>
                  {getFieldDecorator('storedValue', {
                    initialValue: cardKind ? cardKind.storedValue : '',
                    rules: [{validator:this.checkPrice, required: true, }],
                  })(
                    <Input placeholder="请输入储值金额" addonAfter="元" readOnly type="number" min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="折扣权限" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: cardKind ? cardKind.salesDiscount : ''  ,
                    rules: [{validator:this.checkPrice, required: true,}],
                  })(
                    <Input placeholder="请输入折扣权限" readOnly addonAfter="%"  type="number" min={0}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="会员卡级别" {...formItemLayout}>
                  {getFieldDecorator('level', {
                    initialValue: cardKind ? cardKind.level+'':''  ,
                    rules: [{ required: true, message: '请选择会员卡级别' }]
                  })(
                    <Select
                      showSearch
                      allowClear
                      placeholder="请选择"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      disabled={ true }
                    >
                      { options }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={ 24 } style={{width:'400px'}}>
                <FormItem {...formTextItemLayout} label="备注">
                  {getFieldDecorator('remarks', {
                    initialValue: cardKind ? cardKind.remarks : '' ,
                    rules: [{ required: true, message: '请填写备注' }],
                  })(
                    <Input type="textarea" rows={6} readOnly />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={22} style={{width:'401px' }}>
                <FormItem label="卡种类型" {...formRadioItemLayout}>
                  {getFieldDecorator('cardType', {
                    initialValue: cardKind ? cardKind.cardType+'' : '' ,
                    rules: [{ required: true, message: '请选择卡种类型' }]
                  })(
                    <RadioGroup disabled >
                      <Radio value="1">模板卡种</Radio>
                      <Radio value="2">自定义卡种</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            {/*
              此处放列表组件
            */}
            <Row>
              <Col span = { 17 }>
              </Col>
              <Col span = { 2 }>
                <Link to="/crm/card"><Button type="default">返回</Button></Link>
              </Col>
              <Col span = { 2 }>
                  <Button type="primary" onClick={this.onDelete.bind(this)}>删除</Button>
              </Col>
              <Col span = { 2 }>
                <Link to={{ pathname: '/crm/cardEdit', query: { data:location.search.substr(1).split('=')[1] } }} ><Button type="primary" >编辑</Button></Link>
              </Col>
            </Row>
          </Form>
        </Card>

        <Modal
          title="提示"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onOk={this.confirmModel.bind(this)}
          okText="确定"
          cancelText="取消"
          width={300}
          maskClosable={ false }
          onCancel={this.hideModel.bind(this)}
        >
          <p>是否确定删除此卡种?</p>
        </Modal>


      </div>
    )
  }
}

const CardForms = Form.create()(CardDetail);


function CardDetailCom({ dispatch, cardKind, zheKou, level }) {
  return (
    <CardForms dispatch={dispatch} cardKind={cardKind} zheKou={zheKou} level={level}/>
  )
}
function mapStateToProps(state) {
  const { cardKind, level, zheKou, } = state.card;
  return {
    loading: state.loading.models.card,
    cardKind,
    level,
    zheKou,
  };
}
export default connect(mapStateToProps)(CardDetailCom)
