/**
 * 门诊
 * Created by LHW on 2017/9/5.
 */
import React, { Component } from 'react';
import {Card,Row,Col,Select,DatePicker} from 'antd';
const Option = Select.Option;
import { routerRedux } from 'dva/router'
import { connect } from 'dva';
import './order.scss'
import outpatientImg from '../../../../src/assets/outpatient.png'

function handleChange() {

}


function creatTitle(title) {
  return(
    <div className="detailTitle">{title}</div>
  )
}


class OutpatientIndex extends Component{

  constructor(props){
    super(props);
  }

  onclick(){
    this.props.dispatch(routerRedux.push('/service/order-outpatient/detail'));
  }

  creatChiCard() {
    return(
      <Col span={8} >
        <Card onClick={this.onclick.bind(this)}>
          <Row>
            <Col span={10}>
              <img  style={{ width: '60px' }} src={outpatientImg} />
              {creatTitle('儿童门诊')}
              <Select className="SelectPick" defaultValue="open" style={{ width: 120 }} onChange={handleChange}>
                <Option value="open">开工</Option>
                <Option value="close">离开</Option>
              </Select>
            </Col>
            <Col offset={1} span={13}>
              {creatTitle('韩么么-1002')}
              {creatTitle('韩么么-1002')}
              {creatTitle('韩么么-1002')}
              {creatTitle('韩么么-1002')}
              {creatTitle('韩么么-1002')}
            </Col>
          </Row>
          {creatTitle('目前预约：22号')}
          {creatTitle('目前看诊：7号 - 王淑梅')}
          {creatTitle('本日还可约3位')}
        </Card>
      </Col>

    )
  }

  render(){
    return (
      <Card className="order">
        <div style={{textAlign:'center',marginBottom:'20px'}}><DatePicker/></div>
        <Row>
          {this.creatChiCard()}
          {this.creatChiCard()}
          {this.creatChiCard()}
        </Row>
      </Card>

    );
  }

}
function mapStateToProps(state) {
  return {...state.outpatient,loading:state.loading}
}
export default connect(mapStateToProps)(OutpatientIndex);
