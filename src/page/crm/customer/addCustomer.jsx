import React from 'react'
import { connect } from 'dva';
import './customerInformation.scss';
import { Tabs} from 'antd';
import CustomerInformation from './CustomerInformation';
import CustomerHealthy from '../healthy/healthyhome.jsx';
import UserHealthInformation from './userHealthInformation'
const TabPane = Tabs.TabPane;

function addCustomer() {

  function callback(key) {

  }

  return(
    <div>
      <Tabs  defaultActiveKey="1" onChange={callback} type="card">
        <TabPane className='tabsContent' tab="客户信息" key="1">
          <CustomerInformation/>
        </TabPane>
        <TabPane tab="健康档案" key="2">
          <CustomerHealthy/>
        </TabPane>
        <TabPane tab="套餐" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default addCustomer;
