
import React from 'react'
import { connect } from 'dva'
import { Table ,Input, Icon, Button, Popconfirm, Pagination, Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import './userHealthInformation.scss'
import NutritionHealthInformation from '../healthy/NutritionHealthInformation'
import NutritionHealthInformationDetail from '../healthy/NutritionHealthInformationDetail';
import NutritionHealthInformationDetailUpdate from '../healthy/NutritionHealthInformationDetailUpdate';
import HospitalHealthy from '../healthy/healthyhome';
import HospitalHealthyDetail from '../healthy/healthyhomeDetail';
import HospitalHealthyDetailUpdate from '../healthy/healthyhomeDetailUpdate';
import SkinHealthInformation from '../healthy/SkinHealthInformation';
import SkinHealthInformationDetail from '../healthy/SkinHealthInformationDetail';
import SkinHealthInformationDetailUpdate from '../healthy/SkinHealthInformationDetailUpdate';
import ConclusionInformation from '../healthy/ConclusionInformation';
import ConclusionInformationDetail from '../healthy/ConclusionInformationDetail';




const TabPane = Tabs.TabPane;

class userHealthInformation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    debugger;
    const isDetail = this.props.users.isDetail;
    const {saveDone,type,editMedicalFlag,editNutritionFlag,editSkinFlag} = this.props.healthInformation;
    const medicalHealthInformation = this.props.healthInformation.medicalHealthInformation;
    const nutritionHealthInformation = this.props.healthInformation.nutritionHealthInformation;
    const skinHealthInformation = this.props.healthInformation.skinHealthInformation;
    const conclusionInformation = this.props.healthInformation.conclusionInformation;

    let HospitalHealthyDiv = (saveDone || isDetail )&&medicalHealthInformation ? <HospitalHealthyDetail/>:<HospitalHealthy />;
    if(editMedicalFlag){
      HospitalHealthyDiv = <HospitalHealthyDetailUpdate/>;
    }
    let NutritionHealthInformationDiv = (saveDone || isDetail)&&nutritionHealthInformation ? <NutritionHealthInformationDetail/>:<NutritionHealthInformation />;
    if(editNutritionFlag){
      NutritionHealthInformationDiv = <NutritionHealthInformationDetailUpdate />
    }
    let SkinHealthInformationDiv = (saveDone || isDetail)&&skinHealthInformation ? <SkinHealthInformationDetail/>:<SkinHealthInformation />;
    if(editSkinFlag){
      SkinHealthInformationDiv = <SkinHealthInformationDetailUpdate/>
    }
    const ConclusionInformationDiv = (saveDone || isDetail)&&conclusionInformation ? <ConclusionInformationDetail/>:<ConclusionInformation />;
    let defaultActiveKey = "1";
    if(type){
      defaultActiveKey = type+"";
    }
    return (
      <div className = "user-health-cent">
        <Tabs className="tabsContent" defaultActiveKey={defaultActiveKey} type="card">
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
            {ConclusionInformationDiv}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.addCustomer,
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}

export default connect(mapStateToProps)(userHealthInformation);
