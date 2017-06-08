/**
 * Created by Flyforwards on 2017/6/2.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal,Form,Row,Col,Input} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import "./index.scss";
import { queryURL } from '../../../utils/index.js';

@createForm()
class AlertModalFrom extends Component {
  constructor(props) {
    super(props)
    this.state={
      visible:false,
    }
    this.flag = {
      'REFUND': 0,
      'CHARGE': 0,
      'DELETE': 0
    };
  }
  handleCancel() {
    this.setState({
      visible:false,
    })
  }
  handleOk() {
   this.props.form.validateFields((err, values) => {
     values.customerId= queryURL('dataId');
      if (!err) {
      this.props.onOk(values)
        this.setState({
          visible:false,
        });
      }
    })
  }

  handleAfterClose() {

  }
  showModel() {
    // this.props.dispatch({
    //   type:'membershipcard/switchCommonState'
    // })
    this.setState({
      visible:true,
    })
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
    if (value > 0||value ==0) {
      callback();
      return;
    }
    callback('不能为负数');
  }
  render() {
    let {  modalTitle , okText, cancel, message,form,labelValue,prams,commonVisible, type } = this.props
    let visible = this.state.visible;
    if (commonVisible[type] != undefined && commonVisible[type] != this.flag[type] ) {
      visible = false;
      this.flag[type] = commonVisible[type]
    }
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:15 }
    }
    return (
      <span>
         <span onClick={this.showModel.bind(this)}>{this.props.children}</span>
      <Modal
        key = { visible }
        visible = { visible }
        title = { modalTitle || "提示" }
        okText = { okText || "确定" }
        cancelText = { cancel || "取消" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        width = { 400 }
        style={{height:'300px'}}
        maskClosable={false}
        wrapClassName = { "alert-vertical-center-modal" }
      >
        <Form layout="vertical">
          <Row>
            <Col span={24}>
              <FormItem { ...formItemLayout } label={labelValue|| ''}>
                {getFieldDecorator(prams, {
                  rules: [{validator:this.checkPrice, required: true, message: '' }],
                })(
                  <Input  placeholder="" type="number" min={0} addonAfter="元" addonBefore="￥" />
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
  const { cancelCardCode,commonVisible } = state.membershipcard;
  return {
    user:state.addCustomer,
    cancelCardCode,
    commonVisible,
  };
}

export default connect(mapStateToProps)(AlertModalFrom)
