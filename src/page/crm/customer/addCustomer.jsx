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

  onChangeTabs(activityKey) {
    this.props.dispatch({
      type: 'addCustomer/changeTabs',
      payload: { activityKey }
    })
  }


  render(){

    const {editCustomer,isDetail}= this.props.users;
    const {addSuccess}= this.props.course;
    const { getSuccess } =this.props.membershipcard;
    // console.log("membershipcard>>>>",getSuccess)
    let TabPaneAry = [
      <TabPane className='tabsContent' tab="客户信息" key="1">
        {isDetail ? <CustomerDetails/> : <CustomerInformation/>}
      </TabPane>,
      <TabPane tab="健康档案" disabled={!(this.props.users.expandData||addSuccess || getSuccess)} key="2">
        <UserHealthInformation/>
      </TabPane>,
      <TabPane tab="套餐" key="3" disabled={!(this.props.users.expandData||addSuccess || getSuccess)}>
        <AddCourse />
      </TabPane>];

    if(((editCustomer || isDetail)&&this.props.users.expandData)||addSuccess || getSuccess){
      TabPaneAry.push(<TabPane tab="会员卡" key="4">
        <MembershipCard/>
      </TabPane>)
    }
    let defaultActiveKey = '1';
    if (addSuccess){
      defaultActiveKey = '3';
    }
    if(getSuccess){
      defaultActiveKey = '4';
    }
    console.log("defaultActiveKey>>>",defaultActiveKey)
    return(
      <div>
        <Tabs onChange={this.onChangeTabs.bind(this)} defaultActiveKey={defaultActiveKey} type="card">
          {TabPaneAry}
        </Tabs>
      </div>
    )

  }
}


function mapStateToProps(state) {
  return {
    users: state.addCustomer,
    course:state.addCourse,
    activityKey: state.addCustomer.activityKey,
    membershipcard:state.membershipcard
  };
}
export default connect(mapStateToProps)(addCustomer)
