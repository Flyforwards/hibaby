/**
 *  婴儿护理记录单详情
 * Created by yangjingjing on 2017/8/21.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin,Row,Col} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

const assessment = [
  {title:'体温',component:'Input',submitStr:'temperature',unit:'℃'},
  {title:'脉搏',component:'Input',unit:'ml',submitStr:'pulse',unit:'次/分'},
  {title:'呼吸',component:'Input',submitStr:'breathing',unit:'次/分'},
  {title:'体重',component:'Input',submitStr:'weight',unit:'g'},
  {title:'身长',component:'Input',submitStr:'length',unit:'cm'},
  {title:'脐带',component:'Input',submitStr:'umbilicalCord'},
  {title:'黄疸',component:'Input',unit:'mg/dl',submitStr:'jaundice'},
  {title:'托管状态',component:'Select',chiAry:['托管','未托管'],submitStr:'towState'},
  {title:'托管起始',component:'Input',submitStr:'towStart'},
  {title:'操作人',component:'Input',submitStr:'operator'},
  {title:'操作时间',component:'DatePicker',submitStr:'operatorTime'}
]



class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }




  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData'})
  }

  render() {
    const {loading,baseInfoDict} = this.props
    let baseInfoDivAry = detailComponent(baseInfoDict);
    const colSpan = {
      span: 6
    }
    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
        </Card>
        <Card style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          <Row>
            <Col span={2} >体温</Col>
            <Col span={2}>心跳</Col>
            <Col span={2}>呼吸</Col>
            <Col span={2}>体重</Col>
            <Col span={2}>身长</Col>
            <Col span={2}>脐带</Col>
            <Col span={2}>黄疸</Col>
            <Col span={2}>托管状态</Col>
            <Col span={2}>托管时长</Col>
            <Col span={2}>操作者</Col>
            <Col span={2}>修改时间</Col>
            <Col span={2}>操作</Col>
          </Row>
          <Row>
            <Col span={2} >体温</Col>
            <Col span={2}>心跳</Col>
            <Col span={2}>呼吸</Col>
            <Col span={2}>体重</Col>
            <Col span={2}>身长</Col>
            <Col span={2}>脐带</Col>
            <Col span={2}>黄疸</Col>
            <Col span={2}>托管状态</Col>
            <Col span={2}>托管时长</Col>
            <Col span={2}>操作者</Col>
            <Col span={2}>修改时间</Col>
            <Col span={2}><Link >返回</Link><Link >编辑</Link><Link >删除</Link></Col>
          </Row>
        </Card>
      </Spin>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(DetailForm) ;
