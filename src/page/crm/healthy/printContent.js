/**
 * Created by Flyforwards on 2017/6/12.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import {Card,DatePicker,Table,Row,Col } from 'antd';
import { Link } from 'react-router';
import '../membershipcard/index.scss';
import '../membershipcard/printPage.css';
import moment from 'moment';
import { TxtKey } from './txtKey';
import {local,session} from 'common/util/storage.js'
import { format } from '../../../utils/index.js';
import NutritionHealthInformationDetail from './NutritionHealthInformationDetail';
import SkinHealthInformationDetail from './SkinHealthInformationDetail';
import HospitalHealthyDetail from './healthyhomeDetail';
//import './print.css';

class PrintContent extends Component {
  constructor(props) {
    super(props);
    this.state={
      time:'',
    }
  }

  tableList(checkValue,data) {
    let list=[];
    data&&checkValue ? checkValue.map(function(elem,index){
      if(elem == 'birthTime'||elem == 'dueDate'||elem == 'productionDate'||elem == 'productionDate'){
        list.push(<Col key={index} span = { 8 }>
          <p style={{ textAlign: 'left', fontSize: '14px',}}>{TxtKey[elem]}:{data[elem] ? new Date(data[elem]).format("yyyy-MM-dd"): ''}</p>
        </Col>)
      }else{
        list.push(<Col key={index} span = { 8 }>
          <p style={{ textAlign: 'left', fontSize: '14px',}}>{TxtKey[elem]}:{data[elem]}</p>
        </Col>)
      }
    }):null;
    return list;
  }



  render() {
    const { loading,checkedValues,baseData ,extendData ,showOne,showTwo,showThree} = this.props;
    extendData ? extendData.contact1 = extendData.contact: '';
    extendData ? extendData.operator2 =  extendData.operator: '';
    const checkValue = checkedValues && checkedValues.length > 0 ? checkedValues: session.get("checkValues")
    baseData ? Object.assign( baseData, extendData):null;
    return (
      <div className="print_all" style={{ width: '100%',margin:'0px auto 0px',border:'1px solid #e5e5e5',background: '#FFFFFF',fontFamily: '微软雅黑 Bold',marginTop: '10px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px',}}>
        <div className="print_w100" style={{ width:'100%', padding:'16px', overflow: 'hidden', border:'none', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', backgroundColor:'rgba(102, 102, 102, 1)', color: '#FFFFFF', margin:'0px auto 0px'}}>
          <h1 style={{ fontSize: '28px', fontWeight: 700,}}>健康档案</h1>
        </div>
        <div className="print_normal" style={{width:'100%', padding:'16px', overflow: 'hidden', backgroundColor:'rgba(102, 102, 102, 1)', color: '#FFFFFF',}}>
          <Row>
            {this.tableList(checkValue,baseData)}
          </Row>
        </div>
        {/*<Table class="cardTable" style={{width:'98%',margin:'10px auto 0px'}} columns={this.columns} pagination={false} bordered rowKey="id" dataSource={ this.dataSource}/>*/}
        <div>
          { showOne ?  <HospitalHealthyDetail/> :''}
          {showTwo ? <NutritionHealthInformationDetail style={{margin:'20px auto'}}/>:''}
          {showThree ? <SkinHealthInformationDetail/> : ''}
        </div>
      </div>


    )
  }
}


function mapStateToProps(state) {
  const { checkedValues } = state.healthInformation;
  const { baseData ,extendData ,showOne,showTwo,showThree} = state.printCustomer;
  return {
    loading: state.loading.models.healthInformation,
    checkedValues,
    baseData ,
    extendData,
    showOne,
    showTwo,
    showThree,
  };
}
export default connect(mapStateToProps)(PrintContent)

