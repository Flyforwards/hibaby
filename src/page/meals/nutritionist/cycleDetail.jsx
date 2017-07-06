import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Cycle.scss';
import { Form, Icon, Col, Row, Modal, Card, Tabs, Radio, Button, Badge } from 'antd'

function mainCycleDetail(props) {

  console.log('-------------------------------');
  console.log(props.loopWeekDatas);

  function headerComponent (){
    return (

      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span="1">
            <Button
              icon="double-left"
              style={{height: '40px',width: '40px'}}
              onClick={prevDateComponent}
            />
          </Col>
          <Col span="22">
            <div className="dayTitle">{props.loopWeekDatas.date} {chineseWeekDay(props.loopWeekDatas.dayOfWeek)}</div>
            <div style={{marginLeft: '85%' ,marginTop: '-55px'}}><p>今日用餐客户共计<font color="#ac672c">{props.loopWeekDatas.allTotal}</font>人</p></div>
            <div style={{marginTop: '20px' ,marginBottom: '40px'}}>{ mainComponent() }</div>
          </Col>
          <Col span="1">
            <Button
              icon="double-right"
              style={{height: '40px',width: '40px', marginLeft: '20px'}}
              onClick={nextDateComponent}
            />
          </Col>
        </Row>
      </div>
    )
  }

  //英文周几对应的汉字周几
  function chineseWeekDay(dayOfWeek){
    var chinessWeek = '';
    if (dayOfWeek == 'Sunday'){
      chinessWeek = '周日';
    }
    else if (dayOfWeek == 'Monday'){
      chinessWeek = '周一';
    }
    else if (dayOfWeek == 'Tuesday'){
      chinessWeek = '周二';
    }
    else if (dayOfWeek == 'Wednesday'){
      chinessWeek = '周三';
    }
    else if (dayOfWeek == 'Thursday'){
      chinessWeek = '周四';
    }
    else if (dayOfWeek == 'Friday'){
      chinessWeek = '周五';
    }
    else if (dayOfWeek == 'Saturday'){
      chinessWeek = '周六';
    }

    return(
      chinessWeek
    )
  }

  function mainComponent () {

    let loopObj = {};
    if (props.loopWeekDatas.loops && props.loopWeekDatas.loops.length > 0){
      loopObj = props.loopWeekDatas.loops[0];
    }
    //标准菜品
    const normalObj = loopObj.loopTotals ? loopObj.loopTotals[0] : {} ;
    const normalCustomers = normalObj.customers ? normalObj.customers : [] ;

    //禁忌菜品
    const tabooObj = loopObj.loopTotals ? loopObj.loopTotals[1] : {} ;
    const tabooCustomers = tabooObj.customers ? tabooObj.customers : {} ;

    let title = '周期一';
    if (loopObj.week == 1) {
      title = '周期一';
    }
    else if (loopObj.week == 2){
      title = '周期二';
    }
    else if (loopObj.week == 3){
      title = '周期三';
    }
    else if (loopObj.week == 4){
      title = '周期四';
    }
    else if (loopObj.week == 5){
      title = '周期五';
    }

    return (
      <div>
        <Card title={title} bordered={true} style={{marginBottom: '20px', height: '100%', paddingBottom: '10px'}}>
          <Row style={{display: 'flex',justifyContent: 'flex-end'}}>
            <Badge count={loopObj.day} style={{
              backgroundColor: '#fff',
              color: '#999',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
              marginRight: '20px',
              marginTop: '-35px' }}
            />
          </Row>
          <Row>
            <div className="cardSubtitle" style={{color:'#a5a5a5'}}>标准用户{normalObj.total}人</div>
          </Row>
          { normalUserListComponnet(normalCustomers) }
          <Row>
            <div style={{background: '#e9e9e9', marginLeft: '20px', marginRight: '20px', marginTop: '20px', height: '1px'}}></div>
          </Row>
          <Row>
            <div className="cardSubtitle" style={{color:'#a5a5a5', height:'30px',lineHeight: '30px',marginTop: '10px'}}>禁忌用户{tabooObj.total}人</div>
          </Row>
          { tabooUserListComponnet(tabooCustomers) }
        </Card>
      </div>
    )
  }

  // 标准用户列表
  function normalUserListComponnet(customers) {
    const normalUserDivs = [];
    for (let i = 0; i < customers.length; i++) {
      const user = customers[i];
      normalUserDivs.push(
        <Col span="4" key={i}>
          <div className="tabooUser-content">V{user['level']}  {user['name']} -- {user['room']}</div>
        </Col>
      );
    }

    return (
      <div style={{marginLeft: '20px', marginRight: '20px'}}>
        <Row>
          {normalUserDivs}
        </Row>
      </div>
    )
  }

  //禁忌用户列表
  function tabooUserListComponnet(customers) {
    const tabooUserDivs = [];
    for (let i = 0; i < customers.length; i++) {
      const user = customers[i];
      tabooUserDivs.push(
        <Row key={i} style={ i%2 ?{backgroundColor :'#ffffff'} :{backgroundColor: '#f6f6f6'}}>
          <Col span="5">
            <div style={{minHeight: '40px'}}>
              <div className="tabooUser-detail-content">V{user['level']}  {user['name']} -- {user['room']}</div>
            </div>
          </Col>
          <Col>
            <div style={{minHeight: '40px'}}>
              <div className="tabooUser-detail-content">禁忌: {user['taboo']}</div>
            </div>
          </Col>
        </Row>
      );
    }

    return (
      <div style={{marginLeft: '20px', marginRight: '20px'}}>
        <Row>
          {tabooUserDivs}
        </Row>
      </div>
    )
  }

  //下一天
  function nextDateComponent() {

    var that = this;
    const {dispatch} = props;
    dispatch({
      type: 'cyclePage/changedDetailTabActivity',
      payload: { status: 1 }
    })

    let loopObj = {};
    if (props.loopWeekDatas.loops && props.loopWeekDatas.loops.length > 0){
      loopObj = props.loopWeekDatas.loops[0];
    }
    var curWeek = loopObj.week;
    curWeek = curWeek+1;
    if (curWeek > 5){
      curWeek = 1;
    }

    //查询单个循环的数据
    dispatch({
      type: 'cyclePage/getLoopListByWeek',
      payload: { week: curWeek }
    })

  }

  //前一天
  function prevDateComponent() {

    var that = this;
    const {dispatch} = props;
    dispatch({
      type: 'cyclePage/changedDetailTabActivity',
      payload: { status: -1 }
    })

    let loopObj = {};
    if (props.loopWeekDatas.loops && props.loopWeekDatas.loops.length > 0){
      loopObj = props.loopWeekDatas.loops[0];
    }
    var curWeek = loopObj.week;
    curWeek = curWeek-1;
    if (curWeek < 1){
      curWeek = 5;
    }

    //查询单个循环的数据
    dispatch({
      type: 'cyclePage/getLoopListByWeek',
      payload: { week: curWeek }
    })

  }

  function handleChangedState(){
    const {dispatch} = props;
    dispatch({
      type: 'cyclePage/changedShowStatus',
      payload: {value: 0}
    })
  }

  return (
    <div>
      <Row>
        { headerComponent() }
      </Row>
      <Row>
        <div className='bottomButton' style={{marginRight: '20px',marginBottom:'80px'}}>
          <Button style={{width: '160px'}} className='commitButton BackBtn' onClick={handleChangedState}>返回</Button>
        </div>
      </Row>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    curTabsIndex: state.cyclePage.curDetailTabsIndex
  };
}
export default connect(mapStateToProps)(mainCycleDetail)
