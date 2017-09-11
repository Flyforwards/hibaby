/**
 * 门诊
 * Created by LHW on 2017/9/5.
 */
import React, { Component } from 'react';
import {Card,Row,Col,Select,DatePicker,Spin} from 'antd';
const Option = Select.Option;
import {creatTitle,creatCoarseTitle} from '.././ServiceComponentCreat'
import { routerRedux } from 'dva/router'
import { connect } from 'dva';
import './order.scss'
import outpatientImg from '../../../../src/assets/outpatient.png'
import { parse } from 'qs'

var selectState = null

class OutpatientIndex extends Component{

  constructor(props){
    super(props);
  }

  onclick(appointmentId){
    let query = parse(location.search.substr(1))

    const {date} = query
    this.props.dispatch(routerRedux.push({
      pathname:'/service/order-outpatient/detail',
      query: {
        appointmentId: appointmentId,
        date,
      },
    }))
  }

  handleChange(appointmentId) {
    this.props.dispatch({type:'outpatient/changeClinicState',payload:{appointmentId,state:selectState}})
  }

  onSelect(e){
    selectState = e
  }

  onChange( date,dateString) {

    this.props.dispatch(routerRedux.push({
      pathname:'/service/order-outpatient',
      query: {
        date:dateString,
      },
    }))
  }

  creatChiCard(dict) {
    return(
      <Col span={8} >
        <Card onClick={this.onclick.bind(this,dict.appointmentId)}>
          <Row>
            <Col span={10}>
              <img  style={{ width: '60px' }} src={outpatientImg} />
              {creatTitle(dict.describe)}
              <Select className="SelectPick" defaultValue={dict.clinicState} style={{ width: 120 }} onSelect={this.onSelect.bind(this)} onChange={()=>{this.handleChange(dict.appointmentId)}}>
                <Option value={1}>开工</Option>
                <Option value={0}>离开</Option>
              </Select>
            </Col>
            <Col offset={1} span={13}>
              {
                dict.customerDos.map(value=> {
                  return creatTitle(`${value.customerName}-${value.customerRoom}`)
                })
              }
            </Col>
          </Row>
          {creatCoarseTitle(`目前预约：${dict.nowNum}号`)}
          {creatCoarseTitle('目前看诊：7号 - 王淑梅')}
          {creatCoarseTitle(`本日还可约${dict.surplusNum}位`)}
        </Card>
      </Col>

    )
  }

  render(){
    const {clinicRooms,loading} = this.props
    return (
      <Spin spinning={loading.effects['outpatient/getClinicRooms']}>
        <Card className="order">
          <div style={{textAlign:'center',marginBottom:'20px'}}><DatePicker onChange={this.onChange.bind(this)}/></div>
          <Row>
            {clinicRooms?clinicRooms.map(value=>{
              return this.creatChiCard(value)
            }):''}
          </Row>
        </Card>
      </Spin>

    );
  }

}
function mapStateToProps(state) {
  return {...state.outpatient,loading:state.loading}
}
export default connect(mapStateToProps)(OutpatientIndex);
