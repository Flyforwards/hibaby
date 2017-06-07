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
  //console.log("healthInformation="+props);
 // console.log("healthInformation2="+props.healthInformation.conclusionInformation.healthInfo);
  let fileList = new Array();
  fileList = eval((props.healthInformation.conclusionInformation&&props.healthInformation.conclusionInformation!=null)?JSON.parse(props.healthInformation.conclusionInformation.healthInfo):[]);
  if(typeof(fileList) === 'string' ){
    fileList = eval(fileList);
  }
  for(let i = 0;i<fileList.length;i++){
   // console.log("fileList[i]="+fileList[i]);
    let dict = fileList[i];

   // let dict = JSON.parse(fileList[i]);
    //dict.add("uid",i);
    dict.uid = i;
  }

  var conclusionInformationId = (props.healthInformation.conclusionInformation&&props.healthInformation.conclusionInformation!=null)?props.healthInformation.conclusionInformation.id:null;
  function uploadConclusionInformationProps(values) {
    if(conclusionInformationId!=null){
      //console.log("您上传了出院小票"+fileList+"kkkk="+conclusionInformationId);

    }else{
      //console.log("您上传了出院小票"+fileList);

    }
    fileList.push(values);
    const healthInfo = JSON.stringify(fileList);
    if(conclusionInformationId!=null){
      dispatch({
        type: 'healthInformation/updateHealthInformation',
        payload: {
          id : conclusionInformationId,
          healthInfo : healthInfo,
          type : type,
          customerId : props.customerId
        }
      })
    }else{

      dispatch({
        type: 'healthInformation/saveHealthInformation',
        payload: {
          healthInfo : healthInfo,
          type : type,
          customerId : props.customerId
        }
      })
    }

  }
  function deleteConclusionInformationProps(values) {
    dispatch({type:'healthInformation/deleteConclusionInformation',payload:values})
    //console.log("您删除了出院小票");

    const healthInfo = JSON.stringify(props.healthInformation.conclusionInformation.healthInfo);
    dispatch({
      type: 'healthInformation/updateHealthInformation',
      payload: {
        id : props.healthInformation.conclusionInformation.id,
        healthInfo : healthInfo,
        type : type,
        customerId : props.customerId
      }
    })
  }
  return(
    <div className="conclusionInformationContentDiv">
      <Row className="firstItem" key="1">
        <Col span="2">
          <div className="uploadOptions">出院小结2:</div>
        </Col>
        <Col span="18">
          <FileUpload fun={uploadConclusionInformationProps.bind()} deleteFun={deleteConclusionInformationProps.bind()}  value={fileList} multiple = {false}>
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
