import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Cycle.scss';
import { Form, Icon, Col, Row, Modal, Card, Tabs, Radio, Button, Badge } from 'antd'

var changeWeek = 0;

function mainCycleTabooDetail(props) {

  console.log('-------------------------------');
  console.log(props.loopWeekTabboDatas);

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
            <div className="dayTitle">{props.loopWeekTabboDatas.date} {chineseWeekDay(props.loopWeekTabboDatas.dayOfWeek)}</div>
            <div style={{marginLeft: '85%' ,marginTop: '-55px'}}><p>今日用餐客户共计<font color="#ac672c">{props.loopWeekTabboDatas.allTotal}</font>人</p></div>
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
    if (props.loopWeekTabboDatas.loops && props.loopWeekTabboDatas.loops.length > 0){
      loopObj = props.loopWeekTabboDatas.loops[0];
    }

    const dishes = loopObj.loopTotals ? loopObj.loopTotals :{};

    let title = '周期一';
    var curWeek = props.week+changeWeek;
    if (curWeek == 1) {
      title = '周期一';
    }
    else if (curWeek == 2){
      title = '周期二';
    }
    else if (curWeek == 3){
      title = '周期三';
    }
    else if (curWeek == 4){
      title = '周期四';
    }
    else if (curWeek == 5){
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
          {dishesListComponnet(dishes)}
        </Card>
      </div>
    )
  }

  //房间对应菜单
  function dishesListComponnet(loopDishes) {

    const colDivs = [];
    for (let i = 0; i < loopDishes.length; i++) {
      const loopObj = loopDishes[i];
      const dishes = loopObj?loopObj.dishes:[];
      let dishesStr = '';
      for (let k = 0; k < dishes.length; k++){
        const dishObj = dishes[k];
        if (k != 0){
          dishesStr += '、';
        }
        dishesStr += dishObj['dishesName'];
      }

      colDivs.push(
        <Row key={i} style={ i%2 ?{backgroundColor :'#f6f6f6'} :{backgroundColor: '#ffffff'}}>
          <div style={{minHeight: '40px'}}>
            <Col span="1">
              <div className="tabooUser-detail-content">{loopObj.room}</div>
            </Col>
            <Col>
              <div className="tabooUser-detail-content">{dishesStr}</div>
            </Col>
          </div>
        </Row>
      );
    }

    return (
      <div style={{marginLeft: '20px', marginRight: '20px'}}>
        {colDivs}
      </div>
    )
  }

  //下一天
  function nextDateComponent() {

    var that = this;
    const {dispatch} = props;

    changeWeek++;
    if (changeWeek > 5-props.week){
      changeWeek = 1-props.week;
    }

    var curWeek = props.week+changeWeek;

    //查询单个循环的数据
    dispatch({
      type: 'cyclePage/getLoopDishesListByWeek',
      payload: { week: curWeek , type: Number(props.type)}
    })

  }

  //前一天
  function prevDateComponent() {

    var that = this;
    const {dispatch} = props;

    changeWeek--;
    if (changeWeek < 1-props.week){
      changeWeek = 5-props.week;
    }

    var curWeek = props.week+changeWeek;

    //查询单个循环的数据
    dispatch({
      type: 'cyclePage/getLoopDishesListByWeek',
      payload: { week: curWeek , type: Number(props.type)}
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
  };
}
export default connect(mapStateToProps)(mainCycleTabooDetail)
