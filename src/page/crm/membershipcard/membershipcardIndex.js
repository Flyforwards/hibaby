/**
 * Created by Flyforwards on 2017/6/1.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col,Popconfirm,Modal,Tabs ,message} from 'antd';
import './index.scss';
import {routerRedux} from 'dva/router';
import CardMessage from './cardMessage';
import CardBalance from './balanceMessage';
import ChargebackRecord from './chargebackRecord';
import RenewRecord from './renewRecord';
import RefundRecord from './refundRecord';
import AlertModalFrom from './commonModel';
import ChargeBackFeeModal from './chargeBackFeeModal'
import PermissionButton from 'common/PermissionButton';

const TabPane = Tabs.TabPane;
import { Link } from 'react-router';


class MemberShipCard extends Component {
  constructor(props) {
    super(props);
    const _this=this;
    this.dispatch = props.dispatch;
    this.state={
      commonVisible:false,
      flagValue:1,
    }

  }

  //销卡
  onChargebcakCard(){
    this.setState({
      commonVisible:true,
    })
  }

  componentDidMount() {
  const { dispatch } = this.props;
  dispatch({
    type:'membershipcard/getCardInfo',
    // payload:{
    //   dataId:101
    // }
  })
  dispatch({
    type:'membershipcard/getBalanceInfo',
    // payload:{
    //   dataId:101
    // }
  })
  //扣费记录
  dispatch({
    type:'membershipcard/getFeeDuctionRecord',
    payload:{
      // "customerId":101,
      "page":1,
      "size":10,
      "sortField": "deductionTime",
      "sortOrder": "AESC"
    }
  })
  //续费记录
  dispatch({
    type:'membershipcard/getRenewRecord',
    payload:{
      // "customerId":101,
      "page":1,
      "size":10,
      "sortField": "renewTime",
      "sortOrder": "AESC"
    }
  })
  //退费记录
  dispatch({
    type:'membershipcard/getRefundRecord',
    payload:{
      // "customerId":101,
      "page":1,
      "size":10,
      "sortField": "refundTime ",
      "sortOrder": "AESC"
    }
  })
  dispatch({
    type:'membershipcard/getLevelInfo',
    // payload:{
    //   "abName":'HYKJB',
    //   "softDelete":0,
    // }
  });
}


  //销卡点击确定
  handleCancelCard (values){
    this.props.dispatch({
      type: 'membershipcard/cancelCard',
      payload:{  ...values, type: 'DELETE' }
    })

  }
  //退费点击确定
  handleRefundCard (values){
    this.props.dispatch({
      type: 'membershipcard/returnsAmount',
      payload:{  ...values, type: 'REFUND' }
    })
  }
  //续费点击确定
  handleRenewFee (values){
    this.props.dispatch({
      type: 'membershipcard/renewAmount',
      payload:{  ...values, type: 'CHARGE' }
    })
  }
 //扣费点击确定

  onCharge(values) {
    this.props.dispatch({
      type: 'membershipcard/getFeeDeduction',
      payload:{  ...values }
    })
  }
 //点击打印
  onPrint() {
     if(this.props.feeRecord != '' || this.props.renewRecord != '' || this.props.refundRecord != ''){
      this.props.dispatch(routerRedux.push({
        pathname:'/crm/customer/printPage',
        query:{
          dataId:this.props.user.dataDetailId,
        }
      }))
    }else{
      message.warn('暂无可打印数据')
    }

  }

  tabChange(key){
    this.setState({
      flagValue:key,
    })
  }
  //tab点击
  onTabClick(key){
   this.props.dispatch({
     type:'membershipcard/getChangeTabKey',
     payload:{
       activeKeys:key,
     }
   })
  }

  backTabs() {

    this.props.dispatch({
      type: 'addCustomer/changeTabs',
      payload: { activityKey: "1" }
    })
  }



  render() {
    const { feeRecord,renewRecord,refundRecord,activeKey } = this.props;
    return (
      <div className="member-card-cent">
      <div className="card" style={{overflow:'hidden'}}>
        <div>
          <CardMessage />
          <CardBalance />
        </div>
        <Card title="会员卡费用记录" style={{ width: '100%' }}>
          <div>

          </div>
          <Tabs activeKey={activeKey} onChange={this.tabChange.bind(this)} type="card" onTabClick={this.onTabClick.bind(this)}>
            <TabPane tab="扣费记录" key="1">
                <ChargebackRecord />
            </TabPane>
            <TabPane tab="续费记录" key="2">
                <RenewRecord />
            </TabPane>
            <TabPane tab="退费记录" key="3">
                <RefundRecord />
            </TabPane>
          </Tabs>
        </Card>
        <div className="button-group-bottom-common">
          <Button onClick={this.backTabs.bind(this)} className="button-group-bottom-1">返回</Button>
          <PermissionButton testKey='CARD_PRINT' className="button-group-bottom-2"  onClick={this.onPrint.bind(this)}>打印</PermissionButton>
          <AlertModalFrom
            modalTitle="会员销卡"
            okText="确定"
            cancel="取消"
            labelValue="退费金额"
            prams="amount"
            onOk={this.handleCancelCard.bind(this)}
            type="DELETE"
          >
            <PermissionButton testKey='CARD_CANCEL' className="button-group-bottom-3">销卡</PermissionButton>
          </AlertModalFrom>

          <AlertModalFrom
            modalTitle="会员退费"
            okText="确定"
            cancel="取消"
            labelValue="退费金额"
            prams="amount"
            onOk={this.handleRefundCard.bind(this)}
            type="REFUND"
          >
            <PermissionButton testKey='CARD_REFUND' className="button-group-bottom-4">退费</PermissionButton>
          </AlertModalFrom>

          <AlertModalFrom
            modalTitle="会员续费"
            okText="确定"
            cancel="取消"
            labelValue="续费金额"
            prams="amount"
            onOk={this.handleRenewFee.bind(this)}
            type="CHARGE"
          >
            <PermissionButton testKey='CARD_RENEWAL' className="button-group-bottom-5" >续费</PermissionButton>
          </AlertModalFrom>

          <ChargeBackFeeModal
            onOk={this.onCharge.bind(this)}
          >
            <PermissionButton testKey='CARD_DEDUCTION' className="button-group-bottom-6">扣费</PermissionButton>
          </ChargeBackFeeModal>

        </div>

      </div>
      </div>

    )
  }
}


function mapStateToProps(state) {
  const { feeRecord,renewRecord,refundRecord ,activeKey} = state.membershipcard;
  return {
    feeRecord,
    renewRecord,
    refundRecord,
    activeKey,
    user:state.addCustomer,
    cards:state.membershipcard,
  };
}
export default connect(mapStateToProps)(MemberShipCard)
