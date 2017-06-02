import React from 'react'
import { connect } from 'dva';
import './customerInformation.scss';
import { Tabs} from 'antd';
import CustomerDetails from './customerDetails';
import UserHealthInformation from './userHealthInformation'
import MembershipCard from './../membershipcard/membershipcardIndex';
const TabPane = Tabs.TabPane;

function customerDetailsSuper() {

  function callback(key) {

  }

  return(
    <div>
      <Tabs  defaultActiveKey="1" onChange={callback} type="card">
        <TabPane className='tabsContent' tab="客户信息" key="1">
          <CustomerDetails/>
        </TabPane>
        <TabPane tab="健康档案" key="2">
          <UserHealthInformation/>
        </TabPane>
        <TabPane tab="套餐" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="会员卡" key="4">
         <MembershipCard />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default customerDetailsSuper;
