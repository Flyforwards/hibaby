import React from 'react'
import { connect } from 'dva';
import { Tabs} from 'antd';
import CustomerInformation from './CustomerInformation';
const TabPane = Tabs.TabPane;

function addCustomer() {

  function callback(key) {

  }

  return(
    <div>
      <Tabs  defaultActiveKey="1" onChange={callback} type="card">
        <TabPane tab="客户信息" key="1">
          <CustomerInformation/>
        </TabPane>
        <TabPane tab="健康档案" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="套餐" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default addCustomer;
