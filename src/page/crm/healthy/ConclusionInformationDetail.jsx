"use strict"

import React, { Component } from 'react'
import {Icon, Button, Col, Form, Input, Row, Radio, Select } from 'antd'
import styles from './ConclusionInformation.scss';
import FileUpload from '../customer/fileUpload';
import { connect } from 'dva';

const FormItem = Form.Item
const type = 4;//出院小结
/**
 * 客户信息》健康档案》出院小结
 */
function ConclusionInformationDetail(props) {
  const {dispatch} = props;
  var fileList = props.healthInformation.conclusionInformation;
  function uploadConclusionInformationProps(values) {
    fileList.push(values);
    console.log("您上传了出院小票");
    const healthInfo = JSON.stringify(fileList);

    dispatch({
      type: 'healthInformation/saveHealthInformation',
      payload: {
        healthInfo : healthInfo,
        type : type,
        customerId : props.customerId
      }
    })
  }
  function deleteConclusionInformationProps(values) {
    dispatch({type:'healthInformation/deleteConclusionInformation',payload:values})

  }
  return(
    <div className="conclusionInformationContentDiv">
      <Row className="firstItem" key="1">
        <Col span="2">
          <div className="uploadOptions">出院小结2:</div>
        </Col>
        <Col span="18">
          <FileUpload fun={uploadConclusionInformationProps.bind()} deleteFun={deleteConclusionInformationProps.bind()} values = {fileList}>
            <Button className="uploadOptionsButton"><Icon type="upload"/>上传附件</Button>
          </FileUpload>
        </Col>
      </Row>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId,
  };
}

export default connect(mapStateToProps)(ConclusionInformationDetail)
