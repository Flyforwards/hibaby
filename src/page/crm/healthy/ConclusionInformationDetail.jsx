"use strict"

import React, { Component } from 'react'
import {Icon, Button, Col, Form, Input, Row, Radio, Select } from 'antd'
import styles from './ConclusionInformation.scss';
import FileUpload from './fileUpload';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import BigImageModal from '../customer/BigImageModal';
import PermissionButton from 'common/PermissionButton';


const FormItem = Form.Item
const type = 4;//出院小结
/**
 * 客户信息》健康档案》出院小结
 */
function ConclusionInformationDetail(props) {
  const {dispatch} = props;
  const { getFieldDecorator } = props.form;
  const conclusionInformation = props.healthInformation.conclusionInformation;

  function showImg() {
    const bigImageData = props.healthInformation.conclusionImg_arr;
    props.dispatch({
      type: 'healthInformation/setBigImageModalProps',
      payload: {
        bigImageData : bigImageData,
        bigImageHidden : true
      }
    });


  }

  function handleImgDivCancel() {
    props.dispatch({
      type: 'healthInformation/setBigImageModalProps',
      payload: {
        bigImageData : [],
        bigImageHidden : false
      }
    });
  }

  //返回
  function handleBack() {
    dispatch({
      type: 'addCustomer/changeTabs',
      payload: { activityKey: "1" }
    })
  }

  function handleEdit(){
    dispatch({
      type: 'healthInformation/setHealthInformationEditFlag',
      payload: {
        type : type
      }
    })
  }

  const bigImageData = props.healthInformation.conclusionImg_arr;

  return(
    <div className="conclusionInformationContentDiv">
      <Form className="tableForm">
        <Row className="firstItem" key="1">
          <Col span="2">
            <div className="uploadOptions">出院小结:</div>
          </Col>
          { bigImageData.length>0
            ?
            <Col span="18">
              <Button type="primary" className="uploadOptionsButton" onClick={()=>showImg()}>查看附件</Button>
            </Col>
            : <div></div>}
        </Row>
      </Form>
      <div className='button-group-bottom-common'>
        <Button className='button-group-bottom-1' onClick={handleBack}>返回</Button>
        <PermissionButton testKey="HEALTHINFO_EDIT" className='button-group-bottom-2' onClick={handleEdit}>编辑</PermissionButton>
      </div>
      <BigImageModal
        images={props.healthInformation.bigImageData}
        isOpen={props.healthInformation.bigImageHidden}
        onClose={handleImgDivCancel}
      />

    </div>
  );
}
const ConclusionInformationDetailFrom = Form.create()(ConclusionInformationDetail);


function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}

export default connect(mapStateToProps)(ConclusionInformationDetailFrom)
