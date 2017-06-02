import React from 'react'
import { connect } from 'dva';
import './customerInformation.scss';
import { Tabs} from 'antd';
import CustomerInformation from './CustomerInformation';
import UserHealthInformation from './userHealthInformation'
import CustomerDetails from './customerDetails'
const TabPane = Tabs.TabPane;

function addCustomer(props) {

  const {editCustomer,addCustomerTab,isDetail,homePageIsDetail}= props.users;

  function callback(key) {

  }

  let TabPaneAry = [
    <TabPane className='tabsContent' tab="客户信息" key="1">
      <CustomerInformation/>
    </TabPane>,
  <TabPane tab="健康档案" key="2">
    <UserHealthInformation/>
    </TabPane>,
    <TabPane tab="套餐" key="3">
    Content of Tab Pane 3
  </TabPane>];

  if(editCustomer){
    TabPaneAry.push(<TabPane tab="会员卡" key="4">
      Content of Tab Pane 3
    </TabPane>)
  }

  return(
    <div>
      <Tabs  defaultActiveKey={addCustomerTab} onChange={callback} type="card">
        {TabPaneAry}
      </Tabs>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    users: state.addCustomer,
  };
}

export default connect(mapStateToProps)(addCustomer) ;
