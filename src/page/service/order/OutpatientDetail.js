/**
 * 门诊
 * Created by LHW on 2017/9/5.
 */
import React, { Component } from 'react';
import {Tabs,Row,Col,DatePicker,Card,Select} from 'antd';
const TabPane = Tabs.TabPane
import { connect } from 'dva';
import './order.scss'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import outpatientImg from '../../../../src/assets/outpatient.png'
import {creatTitle,creatCoarseTitle,creatButton} from '../ServiceComponentCreat'

function handleChange() {

}


function creatRow() {
  return(
    <Row>
      {creatTitle('月红梅 - 1001')}
    </Row>
  )
}

function creatTabPane(dict) {
  var rightChi = []
  for(let i = 0;i<10;i++){
    rightChi.push(creatRow())
  }
  return(
    <TabPane tab={dict.title} key={dict.key}>
      <Row>
        <Col span={6} >
          <img  style={{ width: '60px' }} src={outpatientImg} />
          {creatTitle('儿童门诊')}
          <Select className="SelectPick" defaultValue="open" style={{ width: 120 }} onChange={handleChange}>
            <Option value="open">开工</Option>
            <Option value="close">离开</Option>
          </Select>
          <div style={{ marginTop: '100px' }}>
            {creatCoarseTitle('目前预约：22号')}
            {creatCoarseTitle('目前看诊：7号 - 王淑梅')}
            {creatCoarseTitle('本日还可约3位')}
          </div>

        </Col>
        <Col span={18}>
          {rightChi}
        </Col>
      </Row>
    </TabPane>
  )
}

class OutpatientDetail extends Component{

  constructor(props){
    super(props);
  }

  callback(){

  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push('/service/order-outpatient'));
  }

  history(){

  }

  render(){

    let ary = []
    for(let i = 0;i<5;i++){
      ary.push( creatTabPane({key:i,title:moment().add(i, 'days').format('YYYY-MM-DD')}))
    }

    return (
      <Card className="order">
        <div style={{textAlign:'center',marginBottom:'20px'}}><DatePicker/></div>
        <Tabs onChange={this.callback} type="card">
          {ary}
        </Tabs>
        <div className='button-group-bottom-common'>
          {creatButton('历史',this.history.bind(this))}{creatButton('返回',this.editBackClicked.bind(this))}
        </div>
      </Card>

    );
  }

}
function mapStateToProps(state) {
  return {...state.outpatient,loading:state.loading}
}
export default connect(mapStateToProps)(OutpatientDetail);
