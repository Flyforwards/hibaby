import React from 'react'
import { connect } from 'dva';
import './customerInformation.scss';
import { Tabs,message} from 'antd';
import CustomerInformation from './CustomerInformation';
import UserHealthInformation from './userHealthInformation'
import AddCourse from './AddCourse.jsx'
import CustomerDetails from './customerDetails';
import MembershipCard from '../membershipcard/membershipcardIndex'

const TabPane = Tabs.TabPane;

class addCustomer extends React.Component{

  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
    this.props.dispatch({type:'addCustomer/reductionState'})
  }

  render(){

    const {editCustomer,isDetail}= this.props.users;
    const {addSuccess}= this.props.course;

    let TabPaneAry = [
      <TabPane className='tabsContent' tab="客户信息" key="1">
        {isDetail ? <CustomerDetails/> : <CustomerInformation/>}
      </TabPane>,
      <TabPane tab="健康档案" disabled={!(editCustomer || isDetail)} key="2">
        <UserHealthInformation/>
      </TabPane>,
      <TabPane tab="套餐" key="3" disabled={!this.props.users.expandData}>
        <AddCourse />
      </TabPane>];

    if((editCustomer || isDetail)&&this.props.users.expandData){
      TabPaneAry.push(<TabPane tab="会员卡" key="4">
        <MembershipCard/>
      </TabPane>)
    }
    let defaultActiveKey = '1';
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
    course:state.addCourse
  };
}
export default connect(mapStateToProps)(addCustomer)
