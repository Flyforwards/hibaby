/**
 * 门诊
 * Created by LHW on 2017/9/5.
 */
import React, { Component } from 'react';
import {Tabs,Row,Col,DatePicker,Card,Select,Spin} from 'antd';
const TabPane = Tabs.TabPane
import { connect } from 'dva';
import './order.scss'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import outpatientImg from '../../../../src/assets/outpatient.png'
import { parse } from 'qs'
import {creatTitle,creatCoarseTitle,creatButton} from '../ServiceComponentCreat'

function handleChange() {

}

class OutpatientDetail extends Component{

  constructor(props){
    super(props);
    let date = moment().format('YYYY-MM-DD')
    let query = parse(location.search.substr(1))
    if(query.date){
      date = query.date
    }
    this.state = {
      currTabKey:date
    }
  }

  creatRow(dict) {
    return(
      <Row className="detailRow">
        <Col style={{textAlign:'left'}} span={2}>{creatTitle(dict.num)}</Col>
        <Col style={{textAlign:'center'}} span={18}>{creatTitle(`${dict.customerName}-${dict.customerRoom}`)}</Col>
        <Col style={{textAlign:'right'}} span={4}>{creatButton('取消预约',this.cancelClinic.bind(this,dict.id))}</Col>
      </Row>
    )
  }

  creatTabPane(dict) {
    const {clinicRoomsInfoAry,title,key} = dict
    const info = clinicRoomsInfoAry[title]
    return(
      <TabPane tab={title} key={title}>
        {info?<Row>
          <Col span={6}>
            <img  style={{ width: '60px' }} src={outpatientImg} />
            {creatTitle(info.describe)}
            <Select className="SelectPick" defaultValue={info.clinicState} style={{ width: 120 }} onChange={handleChange}>
              <Option value={1}>开工</Option>
              <Option value={0}>离开</Option>
            </Select>
            <div style={{ marginTop: '200px' }}>
              {creatCoarseTitle(`目前预约：${info.nowNum}号`)}
              {creatCoarseTitle('目前看诊：7号 - 王淑梅')}
              {creatCoarseTitle(`本日还可约${info.surplusNum}位`)}
            </div>

          </Col>
          <Col span={18}>
            {
              info.list.map(value=> {
                return this.creatRow.bind(this,value)
              })
            }
          </Col>
        </Row>:''}

      </TabPane>
    )
  }


  cancelClinic(id){
    this.props.dispatch({type:'outpatient/cancelClinic',payload:{dataId:id}})
  }

  callback(e){
    const info = this.props.clinicRoomsInfoAry[e]
    if(!info){
      let query = parse(location.search.substr(1))
      this.props.dispatch({ type: 'outpatient/getClinicRoomsInfo',payload:{appointmentId:query.appointmentId,date:e} });
    }
    this.setState({currTabKey:e})
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push('/service/order-outpatient'));
  }

  history(){

  }

  onChange( date,dateString) {
    let query = parse(location.search.substr(1))
    this.props.dispatch(routerRedux.push({
      pathname:'/service/order-outpatient/detail',
      query: {...query,date:dateString}
    }))
    this.setState({currTabKey:dateString})
  }

  render(){
    const {clinicRoomsInfoAry,loading} = this.props

    let date = moment().format('YYYY-MM-DD')
    let query = parse(location.search.substr(1))
    if(query.date){
      date = query.date
    }

    let ary = []
    for(let i = 0;i<5;i++){
      ary.push( this.creatTabPane({title:moment(date).add(i, 'days').format('YYYY-MM-DD'),clinicRoomsInfoAry}))
    }

    return (
      <Spin spinning={loading.effects['outpatient/getClinicRoomsInfo']}>
        <Card className="order">..
          <div style={{textAlign:'center',marginBottom:'20px'}}><DatePicker onChange={this.onChange.bind(this)}/></div>
          <Tabs onChange={this.callback.bind(this)} activeKey={this.state.currTabKey}  type="card">
            {ary}
          </Tabs>
          <div className='button-group-bottom-common'>
            {creatButton('历史',this.history.bind(this))}{creatButton('返回',this.editBackClicked.bind(this))}
          </div>
        </Card>
      </Spin>
    );
  }

}
function mapStateToProps(state) {
  return {...state.outpatient,loading:state.loading}
}
export default connect(mapStateToProps)(OutpatientDetail);
