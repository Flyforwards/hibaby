/**
 * Created by Flyforwards on 2017/5/25.
 */

import DictionarySelect from 'common/dictionary_select';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Card, Radio, Row, Col, Modal} from 'antd';
import { Link } from 'react-router';
import CustomerByCard from './CustomerByCard';
import './card.scss';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const createForm = Form.create
import { parse } from 'qs'

@createForm()
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
    dispatch({
      type:'card/listByMain',
    });
    dispatch({
      type:'card/getDataDict',
      payload:{
        "abName": 'YCC',
      }
    });
    dispatch({
      type:'card/getLevelInfo',
      // payload:{
      //   "abName":"HYKJB",
      //   "softDelete":0,
      //   "type":1,
      // }
    });
    dispatch({
      type: 'card/getCustomerPage',
      payload: { member: dataId }
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

  render() {
    const { cardKind, form, level,loading, userPagination, list,fetusAry,packageAry} = this.props;
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

    let cardLevel = null;
    const values = parse(location.search.substr(1))

    const edit = !this.props.permissionAlias.contains('CARD_EDIT');
    const del = !this.props.permissionAlias.contains('CARD_DELETE');

    //卡种级别渲染
    let options = [];
    level? level.map(function(elem,index){
      options.push(<Option key={elem.id}>{elem.name}</Option>)
    }):null;
    if (cardKind && cardKind.level) {
      cardLevel = <Row>
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
    }
    return (
      <div className="info-card-cent">
      <div className="cardDetail" >
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
                    <Input placeholder="请输入储值金额" addonAfter="元" readOnly  min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="折扣权限" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: cardKind ? cardKind.salesDiscount : ''  ,
                    rules: [{validator:this.checkPrice, required: true,}],
                  })(
                    <Input placeholder="请输入折扣权限" readOnly addonAfter="%"  min={0}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            {cardLevel}
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
          </Form>
          <CustomerByCard {...{loading,userPagination, list,packageAry, fetusAry}} />
        </Card>
        <div className="button-group-bottom-common">
          <Link to="/crm/card">
            <Button className="button-group-bottom-1">返回</Button>
          </Link>
          <Button disabled={del} className="button-group-bottom-2" onClick={this.onDelete.bind(this)}>删除</Button>
          <Link to={{ pathname: '/crm/card/edit', query: values }} >
            <Button disabled={edit} className="button-group-bottom-3">编辑</Button>
          </Link>
        </div>
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
      </div>
    )
  }
}



function mapStateToProps(state) {
  const { cardKind, level, zheKou,userPagination,list,packageAry,
    fetusAry} = state.card;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    userPagination,
    list,
    cardKind,
    level,
    zheKou,
    permissionAlias,
    packageAry,
    fetusAry
  };
}
export default connect(mapStateToProps)(CardDetail)
