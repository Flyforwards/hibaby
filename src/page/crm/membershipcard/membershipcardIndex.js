/**
 * Created by Flyforwards on 2017/6/1.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col,Popconfirm,Modal,Tabs } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import { Link } from 'react-router';
import './index.scss';
import {routerRedux} from 'dva/router';
import CardMessage from './cardMessage';
import CardBalance from './balanceMessage';
import ChargebackRecord from './chargebackRecord';
import RenewRecord from './renewRecord';
import RefundRecord from './refundRecord';
import AlertModalFrom from './commonModel';
import ChargeBackFeeModal from './chargeBackFeeModal'
class MemberShipCard extends Component {
  constructor(props) {
    super(props);
    this.state={
      commonVisible:false,
    }

  }

  //销卡
  onChargebcakCard(){
    this.setState({
      commonVisible:true,
    })
  }

  //销卡点击确定
  handleCancelCard (values){
    console.log(">>>>",values)
    this.props.dispatch({
      type: 'membershipcard/cancelCard',
      payload:{  ...values }
    })
  }
  //退费点击确定
  handleRefundCard (values){
    console.log("《《《",values)
    this.props.dispatch({
      type: 'membershipcard/returnsAmount',
      payload:{  ...values }
    })
  }
  //续费点击确定
  handleRenewFee (values){
    console.log("《《《",values)
    this.props.dispatch({
      type: 'membershipcard/returnsAmount',
      payload:{  ...values }
    })
  }
 //扣费点击确定

  onCharge(values) {
    this.props.dispatch({
      type: 'membershipcard/getFeeDeduction',
      payload:{  ...values }
    })
  }


  tabChange(key){
    console.log(key);
  }

  render() {
    return (
      <div className="card" style={{overflow:'hidden'}}>
        <div>
          <CardMessage />
          <CardBalance />
        </div>
        <Card title="会员卡费用记录" style={{ width: '100%' }}>
          <div>

          </div>
          <Tabs onChange={this.tabChange.bind(this)} type="card">
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
        <div style={{textAlign:'right',marginTop:'20px'}}>
          <Link to="/crm/customer"><Button className="cardBtn">返回</Button></Link>

          {/*<Button className="cardBtn"  >打印</Button>*/}
          <AlertModalFrom
            modalTitle="会员销卡"
            okText="确定"
            cancel="取消"
            labelValue="退费金额"
            prams="amount"
            onOk={this.handleCancelCard.bind(this)}
          >
            <Button  type="danger" className="cardBtn">消卡</Button>
          </AlertModalFrom>

          <AlertModalFrom
            modalTitle="会员退费"
            okText="确定"
            cancel="取消"
            labelValue="退费金额"
            prams="amount"
            onOk={this.handleRefundCard.bind(this)}
          >
            <Button type="danger" className="cardBtn">退费</Button>
          </AlertModalFrom>

          <AlertModalFrom
            modalTitle="会员续费"
            okText="确定"
            cancel="取消"
            labelValue="续费金额"
            prams="amount"
            onOk={this.handleRenewFee.bind(this)}
          >
            <Button type="primary" className="cardBtn" >续费</Button>
          </AlertModalFrom>

          <ChargeBackFeeModal
            onOk={this.onCharge.bind(this)}
          >
            <Button type="primary" className="cardBtn">扣费</Button>
          </ChargeBackFeeModal>

        </div>





      </div>

    )
  }
}


function mapStateToProps(state) {
  return {
    user:state.addCustomer,
    cards:state.membershipcard,
  };
}
export default connect(mapStateToProps)(MemberShipCard)
