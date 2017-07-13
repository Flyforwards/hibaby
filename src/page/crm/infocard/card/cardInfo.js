/*
* updated by Flyforwards 2017/5/25
*
* */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col } from 'antd';
import { Link } from 'react-router';
import DictionarySelect from 'common/dictionary_select';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;


class CardModal extends Component {
  constructor(props) {
    super(props);
    const _this=this;
    this.state={
      showVisible:false,
    }

  }

  // componentWillMount() {
  //   const { dispatch } = this.props;
  //   const str = window.location.search
  //   const dataId = str.substr(str.length - 1, 1);
  //   dispatch({
  //     type: 'card/getCardKindInfo',
  //     payload: { dataId }
  //   })
  //
  //
  // }
  componentDidMount() {
    this.props.dispatch({
      type:'card/getLevelInfo',
      // payload:{
      //   "abName":'HYKJB',
      //   "softDelete":0,
      //   "type":1,
      // }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { cardKind, form, dispatch } = this.props;
    const { validateFields } = form;
    form.validateFields((err, values) => {
      console.log('cardinfo>>', values);
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
    if(value.length > 9){
      callback('必须小于9位数');
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


  //选择验证卡种
  onCradTypeChange = (e) => {
    console.log('radio checked', e.target.value);
    if(e.target.value == 1){
      this.setState({
       showVisible:true,
      });
    }else if(e.target.value == 2) {
      // this.props.form.setFieldsValue({"upgrade":0})
      // this.props.form.setFieldsValue({"level":1})
      this.props.form.getFieldDecorator('upgrade', {initialValue: 0});
      this.setState({
        showVisible:false,
      });
    }

  }
  render() {
    const { cardKind, form, level} = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 9 },
      wrapperCol:{ span:15 }
    }
    const formItemLayoutRadio = {
      labelCol:{ span: 8 },
      wrapperCol:{ span:14 },
    }
    const formTextItemLayout = {
      labelCol:{ span:4},
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
    return(
    <div className="info-card-cent">
      <div className="cardInfo" style={{ 'padding': '20px' }}>
        <Card title="会员卡信息" style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span = { 8 } style={{width:'251px'}} >
                <FormItem {...formItemLayout} label="会员卡名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入会员卡名称' }],
                  })(
                    <Input placeholder="请输入会员卡名称"/>
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="储值金额" {...formItemLayout}>
                  {getFieldDecorator('storedValue', {
                    rules: [{validator:this.checkPrice, required: true, }],
                  })(
                    <Input placeholder="请输入储值金额" addonAfter="元" type="number" min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="折扣权限" {...formItemLayout}>
                  {getFieldDecorator('salesDiscount', {
                    initialValue: 100,
                    rules: [{validator:this.checkPrice, required: true,}],
                  })(
                    <Input placeholder="请输入折扣权限" addonAfter="%"  type="number" min={0}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={22} style={{width:'401px' }}>
                <FormItem label="卡种类型" {...formRadioItemLayout}>
                  {getFieldDecorator('cardType', {
                    rules: [{ required: true, message: '请选择卡种类型' }]
                  })(
                    <RadioGroup onChange={this.onCradTypeChange.bind(this)} >
                      <Radio value="1">模板卡种</Radio>
                      <Radio value="2">自定义卡种</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            { this.state.showVisible ? (<span><Row>
              <Col span={22} style={{width:'401px' }}>
                <FormItem label="此卡是否允许升级" {...formItemLayoutRadio}>
                  {getFieldDecorator('upgrade', {
                    rules: [{ required: true, message: '请选择是否为可升级卡' }]
                  })(
                    <RadioGroup >
                      <Radio value="1">是</Radio>
                      <Radio value="0">否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span = { 8 } style={{width:'251px'}}>
                <FormItem label="会员卡级别" {...formItemLayout}>
                  {getFieldDecorator('level', {
                    rules: [{ required: this.state.showVisible, message: '请选择会员卡级别' }]
                  })(
                    <Select
                      showSearch
                      allowClear
                      placeholder="请选择"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      { options }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row></span>):''}

            <Row>
              <Col span={ 24 } style={{width:'400px'}}>
                <FormItem {...formTextItemLayout} label="备注">
                  {getFieldDecorator('remarks', {
                    rules: [{ required: true, message: '请填写备注' }],
                  })(
                    <Input type="textarea" rows={6}/>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span = { 16 }>
              </Col>
              <Col span = { 4 }>
                <Link to="/crm/card"><Button className="BackBtn" >返回</Button></Link>
              </Col>
              <Col span = { 4 }>
                <Button className="SaveBtn"  onClick={this.handleSubmit.bind(this)}>保存</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
    )
  }
}

const CardForm = Form.create()(CardModal);


function CardModalCom({ dispatch, cardKind, zheKou, level }) {
  return (
    <CardForm dispatch={dispatch} cardKind={cardKind} zheKou={zheKou} level={level}/>
  )
}
function mapStateToProps(state) {
  const { cardKind, level, zheKou } = state.card;
  return {
    loading: state.loading.models.card,
    cardKind,
    level,
    zheKou

  };
}
export default connect(mapStateToProps)(CardModalCom)
