import React from 'react'
import { connect } from 'dva';
import './customerInformation.scss';
import { Tabs,message} from 'antd';
import CustomerInformation from './CustomerInformation';
import UserHealthInformation from './userHealthInformation'
import AddCourse from './AddCourse.jsx'

const TabPane = Tabs.TabPane;

function addCustomer(props) {

  function callback(key) {

  }
  return(
    <div>
      <Tabs  defaultActiveKey="1" onChange={callback} type="card">
        <TabPane className='tabsContent' tab="客户信息" key="1">
          <CustomerInformation/>
        </TabPane>
        <TabPane tab="健康档案" key="2">
          <UserHealthInformation/>
        </TabPane>
        <TabPane tab="套餐" key="3">
        {!props.users.dataDetailId?
          '请先填写用户信息':<AddCourse />
        }
        </TabPane>
      </Tabs>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    users: state.addCustomer,
  };
}
export default connect(mapStateToProps)(addCustomer)