"use strict"

import React, { Component } from 'react'
import {Icon, Button, Col, Form, Input, Row, Radio, Select } from 'antd'
import styles from './ConclusionInformation.scss';
import FileUpload from './fileUpload';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';


const FormItem = Form.Item
const type = 4;//出院小结
/**
 * 客户信息》健康档案》出院小结
 */
function ConclusionInformation(props) {
  const {dispatch} = props;
  const { getFieldDecorator } = props.form;

  function imgInputAddImg(imgInputName,value){
    const {form} = props;
    props.dispatch({
      type : 'healthInformation/addImgData',
      payload : {
        imgInputName :imgInputName,
        value : value
      }
    });
  }

  function imgInputDeleteImgFun(imgInputName,value){
    const {form} = props;
    props.dispatch({
      type : 'healthInformation/delImgData',
      payload : {
        imgInputName :imgInputName,
        value : value
      }
    });
  }

  //返回
  function handleBack() {
    dispatch(routerRedux.push('/crm/customer'));
  }

  function handleSubmit(){
    const {conclusionImg_arr} = props.healthInformation;
    props.form.setFieldsValue({conclusion : (conclusionImg_arr&&conclusionImg_arr.length>0)?JSON.stringify(conclusionImg_arr):null});
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const healthInfo = JSON.stringify(conclusionImg_arr);
        dispatch({
          type: 'healthInformation/saveHealthInformation',
          payload: {
            healthInfo : healthInfo,
            type : type,
            customerId : props.customerId
          }
        })
      }
    });

  }

  return(
    <div className="conclusionInformationContentDiv">
      <Form className="tableForm">
        <Row className="firstItem" key="1">
          <Col span="2">
            <div className="uploadOptions">出院小结:</div>
          </Col>
          <Col span="18">
            <FormItem
              wrapperCol={{span: 18}}
            >
              {getFieldDecorator("conclusion", {
                rules: [{ required: true, message: '请上传附件' }]
              })(
                <FileUpload addImgFun={imgInputAddImg} deleteImgFun={imgInputDeleteImgFun} imgInputName="conclusion">
                  <Button key="1" className="uploadOptionsButton"><Icon type="upload"/>上传附件</Button>
                </FileUpload>
              )}
            </FormItem>


          </Col>
        </Row>
      </Form>
      <div className='bottomButton'>
        <Button className='commitButton BackBtn' onClick={handleBack}>返回</Button>
        <Button className='commitButton SaveBtn' type="primary" onClick={handleSubmit}>保存</Button>
      </div>
    </div>
  );
}
const ConclusionInformationFrom = Form.create()(ConclusionInformation);


function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}

export default connect(mapStateToProps)(ConclusionInformationFrom)
