import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Cycle.scss';
import { Form, Icon, Col, Row, Modal, Card, Tabs, Radio, Button } from 'antd'

const FormItem = Form.Item;

const  tabooUsers = [
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'}
];
//<div className="headerDate">2017-06-12 周一</div>
// 头部

// 主页面
function mealCycle (props) {
    function headerComponent (){
      return (
        <div>
          <Row style={{height: '30px'}}>
            <Col span="21">
              {headerDateTabs()}
            </Col>
            <Col span="3">
              <p style={{marginTop: '25px'}}>今日用餐客户共计<font color="#ac672c">40</font>人</p>
            </Col>
          </Row>
        </div>
      )
    }

    // 头部日期切换
    const TabPane = Tabs.TabPane;
    function headerDateTabs () {
      return (
        <div className="cycle-tabs">
          <Tabs defaultActiveKey='1'
                activeKey={props.curTabsIndex}
                onPrevClick={() => { prevDateComponent() }}
                onNextClick={() => { nextDateComponent() }}
          >
            <TabPane tab="2017-06-11 周日" key="1"> { mainComponent() } </TabPane>
            <TabPane tab="2017-06-12 周一" key="2"> { mainComponent() } </TabPane>
            <TabPane tab="2017-06-13 周二" key="3"> { mainComponent() } </TabPane>
            <TabPane tab="2017-06-14 周三" key="4"> { mainComponent() } </TabPane>
            <TabPane tab="2017-06-15 周四" key="5"> { mainComponent() } </TabPane>
            <TabPane tab="2017-06-16 周五" key="6"> { mainComponent() } </TabPane>
          </Tabs>
        </div>
      )
    }

    function itemCardComponent() {

      return (
        <div>
          <Card title="周期一" bordered={true} style={{marginBottom: '20px'}} onClick={() => { handleChangedState() }}>
            <Row>
              <div className="cardSubtitle">标准用户14人</div>
              <div style={{background: '#e9e9e9', marginLeft: '20px', marginRight: '20px',height: '1px'}}></div>
            </Row>
            <Row>
              <div className="cardSubtitle" style={{height:'30px',lineHeight: '30px',marginTop: '10px'}}>禁忌用户:</div>
            </Row>
            <Row>
              <div style={{marginLeft: '20px', marginRight: '20px'}}>
                { tabooUserListComponnet() }
              </div>
            </Row>
          </Card>
        </div>
      )
    }

    // 禁忌用户列表
    function tabooUserListComponnet() {
      const firstColDivs = [];
      const secondColDivs = [];
      const thirdColDivs = [];
      for (let i = 0; i < tabooUsers.length; i++) {
        const user = tabooUsers[i];
        let num = i%18;
        if (num < 6){
          firstColDivs.push(
            <Col key={i}>
              <div className="tabooUser-content">{user['VIP']}  {user['userName']} -- {user['roomNum']}</div>
            </Col>
          );
        }
        else if (num < 12){
          secondColDivs.push(
            <Col key={i}>
              <div className="tabooUser-content">{user['VIP']}  {user['userName']} -- {user['roomNum']}</div>
            </Col>
          );
        }
        else {
          thirdColDivs.push(
            <Col key={i}>
              <div className="tabooUser-content">{user['VIP']}  {user['userName']} -- {user['roomNum']}</div>
            </Col>
          );
        }
      }

      return (
        <div>
          <Row type="flex" justify="center">
            <Col span="8">
              {firstColDivs}
            </Col>
            <Col span="8">
              {secondColDivs}
            </Col>
            <Col span="8">
              {thirdColDivs}
            </Col>
          </Row>
        </div>
      )
    }

    // 卡片
    function mainComponent() {
      return (
        <div style={{ padding: '30px' }}>
          <Row>
            <Col span="12">
              { itemCardComponent() }
            </Col>
            <Col span="12">
              { itemCardComponent() }
            </Col>
            <Col span="12">
              { itemCardComponent() }
            </Col>
            <Col span="12">
              { itemCardComponent() }
            </Col>
            <Col span="12">
              { itemCardComponent() }
            </Col>
          </Row>
        </div>
      )
    }

    function handleChangedState(){
      const {dispatch} = props;
      dispatch({
        type: 'cyclePage/changedShowStatus',
        payload: { status: 1 }
      })
    }

    function nextDateComponent() {

      var that = this;
      const {dispatch} = props;
      setTimeout(function(){
        dispatch({
          type: 'cyclePage/changedTabActivity',
          payload: { status: 1 }
        })
      }.bind(that), 450);

    }

    function prevDateComponent() {

      var that = this;
      const {dispatch} = props;
      setTimeout(function(){
        dispatch({
          type: 'cyclePage/changedTabActivity',
          payload: { status: -1 }
        })
      }.bind(that), 450);
    }

    return (
      <div className="MealCycle">
        { props.isShowDetail ?  '' :headerComponent()}
      </div>

    )
}


function mapStateToProps(state) {

  return {
    isShowDetail: state.cyclePage.isShowDetail,
    curTabsIndex: state.cyclePage.curTabsIndex
  };
}
export default connect(mapStateToProps)(mealCycle)
