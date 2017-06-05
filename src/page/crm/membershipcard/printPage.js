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

class MemberShipCard extends Component {
  constructor(props) {
    super(props);
    this.state={

    }

  }
  //日期选择改变
  onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  render() {
    return (
      <div className="card" style={{overflow:'hidden'}}>
        <RangePicker
          ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
          showTime
          defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
          format="YYYY-MM-DD"
          onChange={this.onChange.bind(this)}
        />
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

