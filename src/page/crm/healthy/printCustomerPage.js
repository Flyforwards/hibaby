/**
 * Created by Flyforwards on 2017/6/12.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col,Popconfirm,Modal,Tabs } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import { Link } from 'react-router';
// import '../membershipcard/index.scss';
// import '../membershipcard/printPage.css';
import moment from 'moment';
import { format } from '../../../utils/index.js';
import { do_print } from 'common/util/printRoute.js';
import PrintContent from './printContent';

//let borderState = '"rgba(204, 204, 204, 1)"';
class PrintShow extends Component {
  constructor(props) {
    super(props);
    this.state={
      borderStateOne:'',
      borderStateTwo:'',
      borderStateThree:'',
    }
    this.flagOne=false;
    this.flagTwo=false;
    this.flagThree=false;
  }

  onPrint(){
    do_print('print-content');
  };
  //返回
  onBack(){
    this.props.dispatch({
      type: 'printCustomer/setAddCustomerTab',
      payload: true
    })
    history.go(-1)
  }

  //边框
  onBorderone() {
    this.flagOne = !this.flagOne;
    if( this.flagOne){
      this.props.dispatch({
        type:'printCustomer/switchShowOne'
      });
     this.setState({
       borderStateOne:"1px solid red"
     })
    }else{
      this.props.dispatch({
        type:'printCustomer/switchShowOne'
      });
      this.setState({
        borderStateOne:"1px solid #d9d9d9"
      })
    }
  }
  onBordertwo() {
    this.flagTwo = !this.flagTwo;
    if( this.flagTwo){
      this.props.dispatch({
        type:'printCustomer/switchShowTwo'
      });
      this.setState({
        borderStateTwo:"1px solid red"
      })
    }else{
      this.props.dispatch({
        type:'printCustomer/switchShowTwo'
      });
      this.setState({
        borderStateTwo:"1px solid #d9d9d9"
      })
    }
  }
  onBorderthree() {
    this.flagThree = !this.flagThree;
    if( this.flagThree){
      this.props.dispatch({
        type:'printCustomer/switchShowThree'
      });
      this.setState({
        borderStateThree:"1px solid red"
      })
    }else{
      this.props.dispatch({
        type:'printCustomer/switchShowThree'
      });
      this.setState({
        borderStateThree:"1px solid #d9d9d9"
      })
    }
  }
  render() {
    const { checkedValues} = this.props;
    return (
      <div className="card" style={{overflow:'hidden'}}>
        <div>
          <Button className="cardBtn"  style={{width:'180px',border:this.state.borderStateOne}} onClick={this.onBorderone.bind(this)}>医疗健康档案</Button>
          <Button className="cardBtn"  style={{width:'180px',border:this.state.borderStateTwo}} onClick={this.onBordertwo.bind(this)} >营养部健康档案</Button>
          <Button  className="cardBtn"  style={{width:'180px',border:this.state.borderStateThree}} onClick={this.onBorderthree.bind(this)}>美研中心孕期健康档案</Button>
          <Button type="primary" className="cardBtn" style={{float:'right',width:'180px'}} onClick={this.onBack.bind(this)}>返回</Button>
          <Button type="primary" className="cardBtn" style={{float:'right',width:'180px'}} onClick={this.onPrint.bind(this)}>打印</Button>
        </div>
        <div  id="print-content">
          <PrintContent/>
        </div>

        {/*<div id="print-content">*/}

        {/*</div>*/}

      </div>


    )
  }
}


function mapStateToProps(state) {
  const {checkedValues } = state.healthInformation;

  return {
    checkedValues,
    user:state.addCustomer,
    cards:state.membershipcard,
  };
}
export default connect(mapStateToProps)(PrintShow)


