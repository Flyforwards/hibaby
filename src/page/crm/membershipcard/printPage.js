/**
 * Created by Flyforwards on 2017/6/5.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon, Card, Radio,Row,Col,Popconfirm,Modal,Tabs,DatePicker } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import { Link } from 'react-router';
import './index.scss';
import './printPage.scss';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
import PrintPageList from './printPageList';
import { format } from '../../../utils/index.js'
class MemberShipCard extends Component {
  constructor(props) {
    super(props);
    this.state={
      startTime:new Date(),
      endTime:moment(new Date(), dateFormat),
      data:null,
    }

  }
  //查询
  onSearch() {
      this.props.dispatch({
        type:'membershipcard/getPrintBaseMsg',
        payload:{
          startTime:this.state.data.startTime,
          endTime:this.state.data.endTime,
        }
      })
      //账单打印信息
     this.props.dispatch({
       type:'membershipcard/getPrintAccount',
       payload:{
         startTime:this.state.data.startTime,
         endTime:this.state.data.endTime,
       }
    })
  }
  //日期选择改变
  onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    const data = {};
    data.startTime =  dateStrings[0];
    data.endTime =  dateStrings[1];

    this.setState({
      data:data,
    })
    // this.props.dispatch({
    //   type:'membershipcard/getTimeDates',
    //   payload:{
    //     data
    //   }
    // })
  }
  render() {
    const { systemTime } = this.props;
    return (
      <div className="card" style={{overflow:'hidden'}}>
        <div>
          <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
            showTime
            defaultValue={[moment(new Date(systemTime), dateFormat), moment(new Date(systemTime), dateFormat)]}
            format="YYYY-MM-DD"
            onChange={this.onChange.bind(this)}
          />
          <Button type="primary" className="cardBtn" onClick={this.onSearch.bind(this)}>查询</Button>
          <Button type="primary" className="cardBtn" style={{float:'right'}}>打印</Button>
        </div>

        <PrintPageList />
        <Card style={{width:'100%',height:'200px',margin:'10px auto',fontSize:'14px',fontWeight:'700',fontFamily:'微软雅黑'}}>
          <p>客户签名：</p>
        </Card>


      </div>


    )
  }
}


function mapStateToProps(state) {
  const { systemTime } = state.membershipcard;
  return {
    systemTime,
    user:state.addCustomer,
    cards:state.membershipcard,
  };
}
export default connect(mapStateToProps)(MemberShipCard)

