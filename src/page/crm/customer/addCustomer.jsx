import React from 'react'
import { connect } from 'dva';
import './customerInformation.scss';
import { Tabs,message} from 'antd';
import CustomerInformation from './CustomerInformation';
import UserHealthInformation from './userHealthInformation'
import AddCourse from './AddCourse.jsx'
import CustomerDetails from './customerDetails'

const TabPane = Tabs.TabPane;

function addCustomer(props) {

  const {editCustomer,addCustomerTab,isDetail,homePageIsDetail}= props.users;
  const {addSuccess}= props.addCourse;
  function callback(key) {

  }
  let disabled = false
  if(!props.users.expandData==""){
    disabled = true
  }
  let TabPaneAry = [
    <TabPane className='tabsContent' tab="客户信息" key="1">
      {isDetail||homePageIsDetail ? <CustomerDetails/> : <CustomerInformation/>}
    </TabPane>,
  <TabPane tab="健康档案" key="2">
    <UserHealthInformation/>
    </TabPane>,
    <TabPane tab="套餐" key="3" disabled={disabled}>
     <AddCourse />
  </TabPane>];

  if(editCustomer){
    TabPaneAry.push(<TabPane tab="会员卡" key="4">
      Content of Tab Pane 3
    </TabPane>)
  }

  return(
    <div>
      <Tabs  defaultActiveKey={addSuccess?'3':"1"} onChange={callback} type="card">
        {TabPaneAry}
      </Tabs>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    users: state.addCustomer,
    addCourse:state.addCourse
  };
}
export default connect(mapStateToProps)(addCustomer)
