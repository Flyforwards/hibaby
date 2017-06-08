/**
 * Created by Flyforwards on 2017/6/2.
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal,Form,Row,Col,Input,Select, Spin} from 'antd'
const Option = Select.Option;
const createForm = Form.create
const FormItem = Form.Item
import "./index.scss"

@createForm()
class ChargeBackFeeModal extends Component {
  constructor(props) {
    super(props)
    this.state={
      visible:false,
      data: [],
      value: [],
      InputValue:'',
     objValue:{},
     quaiity:'',
     disabledValue:true,

     // fetching: false,
    }
  }
  handleCancel() {
   this.props.dispatch({
     type:'membershipcard/switchChargeState'
   })
  }
  handleOk() {
    this.props.form.validateFields((err, values) => {
      values.customerId=this.props.user.dataDetailId
      values.commodityId = values.name.key;
      values.name=values.name.label;
      if (!err) {
        this.props.onOk(values)
        this.setState({
          InputValue:'',
          objValue:{},
          disabledValue:false,
        })
      }
    })
  }

  handleAfterClose() {

  }
  showModel() {

      this.props.dispatch({
        type:'membershipcard/switchChargeState'
      })


    // this.setState({
    //   visible:true,
    // })
  }
  checkPrice = (rule, value, callback) => {
    if(!value){
      callback('不能为空');
      return;
    }
    if((/^\d*$/g)||(/^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/g).test(value)){
      callback();
      return;
    }else{
      callback('输入格式不正确')
    }
    if (value > 0) {
      callback();
      return;
    }
    callback('购买件数大于0件');
  }

  fetchUser = (value) => {
    this.props.dispatch({
      type:'membershipcard/getGoodsList',
      payload:{
        "name":value
      }
    })
  }
  handleChange = (value) => {
    const goodPrice =  value.title*this.state.quaiity;
    this.setState({
      objValue:value,
      InputValue:goodPrice,
      disabledValue:false,
    })

  }

  //件数改变
  numHandleChange(e) {
    const { value } =e.target;
    const goodPrice = value*this.state.objValue.title;
    this.setState({
      quaiity:value,
      InputValue:goodPrice,
    })
  }

  render() {
    let {  modalTitle , okText, cancel, message,form,labelValue,fetching, goodsInfoList, value,chargeVisible } = this.props
  //  const value = value|| '';
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:15 }
    }
    return (
      <span>
         <span onClick={this.showModel.bind(this)}>{this.props.children}</span>
      <Modal
        key = { chargeVisible }
        visible = {chargeVisible }
        title = { modalTitle || "提示" }
        okText = { okText || "确定" }
        cancelText = { cancel || "取消" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        width = { 400 }
        style={{height:'300px'}}
        wrapClassName = { "alert-vertical-center-modal" }
      >
        <Form layout="vertical">
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="商品名称">
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '商品名称必填' }],
                })(
                  <Select
                    //mode="multiple"
                     labelInValue
                   // value={value}
                    placeholder="输入选择商品"
                   // notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    showSearch
                    onSearch={this.fetchUser.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    style={{ width: '100%' }}
                  >
                    {goodsInfoList ?goodsInfoList.map(d => <Option key={d.id} title={d.price}>{d.name}</Option>):null}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="消费数量">
                {getFieldDecorator('quantity', {
                  rules: [{validator:this.checkPrice, required: true, message: '' }],
                })(
                  <Input  placeholder="" type="number" min={0} addonAfter="件" disabled={this.state.disabledValue} onChange={this.numHandleChange.bind(this)}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label="合计金额">
                {getFieldDecorator("amount", {
                  initialValue: this.state.InputValue || '' ,
                 // rules: [{validator:this.checkPrice, required: true, message: '' }],
                })(
                  <Input  placeholder="" readOnly  min={0} addonAfter="元" addonBefore="￥" />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
       </span>
    )
  }
}
function mapStateToProps(state) {
  const { goodsInfoList,fetching ,chargeVisible} = state.membershipcard;
  return {
    user:state.addCustomer,
    goodsInfoList,
    fetching,
    chargeVisible,
  };
}

export default connect(mapStateToProps)(ChargeBackFeeModal)

