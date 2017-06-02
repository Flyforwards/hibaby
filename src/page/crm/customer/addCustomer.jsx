import React from 'react'
import { connect } from 'dva';
import './customerInformation.scss';
import { Tabs,message} from 'antd';
import CustomerInformation from './CustomerInformation';
import UserHealthInformation from './userHealthInformation'
import AddCourse from './AddCourse.jsx'
import CustomerDetails from './customerDetails'

const TabPane = Tabs.TabPane;

class addCustomer extends React.Component{

  constructor(props) {
    super(props);
  }



  render(){

    const {editCustomer,addCustomerTab,isDetail,homePageIsDetail}= this.props.users;
    const {addSuccess}= this.props.addCourse;
    const {saveDone} = this.props.healthInformation;

    let TabPaneAry = [
      <TabPane className='tabsContent' tab="客户信息" key="1">
        {isDetail ? <CustomerDetails/> : <CustomerInformation/>}
      </TabPane>,
      <TabPane tab="健康档案" key="2">
        <UserHealthInformation/>
      </TabPane>,
      <TabPane tab="套餐" key="3" disabled={!this.props.users.expandData}>
        <AddCourse />
      </TabPane>];

    if(editCustomer){
      TabPaneAry.push(<TabPane tab="会员卡" key="4">
        Content of Tab Pane 4
      </TabPane>)
    }
    let defaultActiveKey = '1';
    if (saveDone){
      defaultActiveKey = '2';
    }
    if (addSuccess){
      defaultActiveKey = '3';
    }
    return(
      <div>
        <Tabs  defaultActiveKey={defaultActiveKey} type="card">
          {TabPaneAry}
        </Tabs>
      </div>
    )

  }
}


function mapStateToProps(state) {
  return {
    users: state.addCustomer,
    addCourse:state.addCourse,
    healthInformation: state.healthInformation

  };
}
export default connect(mapStateToProps)(addCustomer)
