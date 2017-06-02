
import React from 'react'
import { connect } from 'dva'
import { Table ,Input, Icon, Button, Popconfirm, Pagination, Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import './userHealthInformation.scss'
import NutritionHealthInformation from '../healthy/NutritionHealthInformation'
import NutritionHealthInformationDetail from '../healthy/NutritionHealthInformationDetail'
import HospitalHealthy from '../healthy/healthyhome';
import HospitalHealthyDetail from '../healthy/healthyhomeDetail';
import SkinHealthInformation from '../healthy/SkinHealthInformation';
import SkinHealthInformationDetail from '../healthy/SkinHealthInformationDetail';



const TabPane = Tabs.TabPane;

class userHealthInformation extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    const isDetail = this.props.users.isDetail;
    const HospitalHealthyDiv = isDetail ? <HospitalHealthyDetail/>:<HospitalHealthy />;
    const NutritionHealthInformationDiv = isDetail ? <NutritionHealthInformationDetail/>:<NutritionHealthInformation />;
    const SkinHealthInformationDiv = isDetail ? <SkinHealthInformationDetail/>:<SkinHealthInformation />;

    return (
      <div className = "user-health-cent">
        <Tabs className="tabsContent" defaultActiveKey="1" type="card">
          <TabPane tab="医疗健康档案" key="1">
            {HospitalHealthyDiv}
          </TabPane>
          <TabPane tab="营养部健康档案" key="2">
            {NutritionHealthInformationDiv}
          </TabPane>
          <TabPane tab="美研中心孕期健康档案" key="3">
            {SkinHealthInformationDiv}
          </TabPane>
          <TabPane tab="出院小结" key="4">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.addCustomer,
  };
}

export default connect(mapStateToProps)(userHealthInformation);
