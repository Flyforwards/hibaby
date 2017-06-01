/**
 * Created by Flyforwards on 2017/5/25.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio, Row, Col, Popconfirm, DatePicker, Modal, InputNumber, Table } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Link } from 'react-router';
import DictionarySelect from 'common/dictionary_select';
import './card.scss';
import {routerRedux} from 'dva/router';
const createForm = Form.create

const { MonthPicker } = DatePicker

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


  }

  onSearch() {}
  reset() {}

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
    const { cardKind, form, level,loading, userPagination} = this.props;
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

    const formChooseOneLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span: 10 }
    }
    const formChooseLayout = {
      labelCol:{ span: 10 },
      wrapperCol:{ span: 14 }
    }

    const tableProps = {
      loading: loading.effects['localData/localChar'],
      dataSource : [] ,
      pagination: userPagination,
      onChange (page) {
        const { pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize,
            type: 2,
          },
        }))
      },
    }

    //卡种级别渲染
    let options = [];
    level? level.map(function(elem,index){
      options.push(<Option key={elem.id}>{elem.name}</Option>)
    }):null;
    return (
      <div className="cardDetail" style={{ 'padding': '20px' }}>
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
              <Col span = { 12}>
              </Col>
              <Col span = { 4}>
                <Link to="/crm/card"><Button type="default">返回</Button></Link>
              </Col>
              <Col span = { 4 }>
                  <Button className="delbtn" onClick={this.onDelete.bind(this)}>删除</Button>
              </Col>
              <Col span = { 4 }>
                <Link to={{ pathname: '/crm/cardEdit', query: { data:location.search.substr(1).split('=')[1] } }} ><Button type="primary" >编辑</Button></Link>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card>
          <div className="card-title">
            <h3>客户列表:</h3>
          </div>
          <Form>
            <div>
              <Row style={{width:'1116px'}}>
                <Col span={10} style={{float:'left'}}>
                  <FormItem {...formChooseLayout} style={{ width:'774px',height:'40px',lineHeight:'40px'}} >
                    {getFieldDecorator('sear', {rules: [{ required: false }],
                    })(
                      <Input placeholder="输入客户编号、客户姓名、联系方式、合同编号" style={{height:'40px'}}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={4} style={{ float:'left'}}>
                  <span>
                    <Button onClick={ this.onSearch.bind(this)} style={{width:'136px',backgroundColor:'rgba(255, 102, 0, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>查询</Button>
                  </span>
                </Col>
                <Col span={4} style={{ float:'left'}}>
                  <span>
                    <Button onClick={ this.reset.bind(this)} style={{width:'136px',backgroundColor:'rgba(255, 102, 0, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>重置</Button>
                  </span>
                </Col>
              </Row>
            </div>
            <Row>
              <Col span={4} style={{width:'140px'}}>
                <FormItem {...formChooseOneLayout}  label="年龄" >
                  {getFieldDecorator('age1', {rules: [{ required: false }],
                  })(
                    <InputNumber style={{width: "80px"}} min={1} max={100}  />
                  )}
                </FormItem>
              </Col>
              <Col span={3}  style={{width:'140px'}}>
                <FormItem {...formChooseLayout} style={{width:'100%'}}>
                  {getFieldDecorator('age2', {rules: [{ required: false }],
                  })(
                    <InputNumber min={1} max={100} style={{width: "80px"}} />
                  )}
                </FormItem>

              </Col>
              <Col span={4} style={{width:'251px'}}>
                <FormItem {...formChooseOneLayout}  label="预产期" >
                  {getFieldDecorator('time', {rules: [{ required: false }],
                  })(
                    <MonthPicker
                      placeholder="请选择"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={4} style={{width:'251px'}}>
                <FormItem  {...formChooseOneLayout} label="第几胎" >
                  {getFieldDecorator('fetus', {rules: [{ required: false }],
                  })(
                    <DictionarySelect  placeholder="请选择" selectName="FETUS" />
                  )}
                </FormItem>
              </Col>
              <Col span={4} style={{width:'251px'}} >
                <FormItem  {...formChooseOneLayout} label="会员身份" >
                  {getFieldDecorator('member', {rules: [{ required: false }],
                  })(
                    <Select   placeholder="请选择" >
                      {
                        options
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={4} style={{width:'180px'}}>
                <FormItem  {...formChooseOneLayout} label="操作者2" >
                  {getFieldDecorator('operator2', {rules: [{ required: false }],
                  })(
                    <Input max={40}  />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Table {...tableProps} bordered size="small" rowKey = { record=>record.id } columns={ this.columns }/>
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



function mapStateToProps(state) {
  const { cardKind, level, zheKou,userPagination } = state.card;
  return {
    loading: state.loading,
    userPagination,
    cardKind,
    level,
    zheKou,
  };
}
export default connect(mapStateToProps)(CardDetail)
