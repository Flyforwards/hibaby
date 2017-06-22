import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Cycle.scss';
import { Form, Icon, Col, Row, Modal, Card, Tabs, Radio, Button } from 'antd'

const  normalUsers = [
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1001'},
];

const  tabooUsers = [
  {VIP: 'V2',userName: '红霄霄',roomNum: '1001',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '大梅',roomNum: '1002',taboo: '汤、胡萝卜'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1003',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '红霄霄',roomNum: '1004',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '红霄霄',roomNum: '1005',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '红霄霄',roomNum: '1006',taboo: '汤、胡萝卜'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1007',taboo: '汤、胡萝卜'},
  {VIP: 'V2',userName: '赵大宝',roomNum: '1008',taboo: '汤、胡萝卜'},
  {VIP: 'V2',userName: '红霄霄',roomNum: '1001',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '大梅',roomNum: '1002',taboo: '汤、胡萝卜'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1003',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '红霄霄',roomNum: '1004',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '赵大宝',roomNum: '1008',taboo: '汤、胡萝卜'},
  {VIP: 'V2',userName: '红霄霄',roomNum: '1001',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '大梅',roomNum: '1002',taboo: '汤、胡萝卜'},
  {VIP: 'V2',userName: '赵丽颖',roomNum: '1003',taboo: '胡萝卜、芹菜、柠檬'},
  {VIP: 'V2',userName: '红霄霄',roomNum: '1004',taboo: '胡萝卜、芹菜、柠檬'},
];

function mainCycleDetail(props) {

  function headerComponent (){
    return (
      <div>
        <div style={{marginLeft: '85%' ,marginTop: '20px'}}><p style={{marginTop: '10px'}}>今日用餐客户共计<font color="#ac672c">40</font>人</p></div>
        <div style={{marginTop: '-40px', marginRight: '20px'}}>{headerDateTabs()}</div>
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

  function mainComponent () {
    return (
      <div style={{marginLeft: '10px', marginTop: '20px'}}>
        <Card title="周期一" bordered={true} style={{marginBottom: '20px', height: '100%', paddingBottom: '10px'}}>
          <Row>
            <div className="cardSubtitle" style={{color:'#a5a5a5'}}>标准用户14人</div>
          </Row>
          { normalUserListComponnet() }
          <Row>
            <div style={{background: '#e9e9e9', marginLeft: '20px', marginRight: '20px', marginTop: '20px', height: '1px'}}></div>
          </Row>
          <Row>
            <div className="cardSubtitle" style={{color:'#a5a5a5', height:'30px',lineHeight: '30px',marginTop: '10px'}}>禁忌用户18人</div>
          </Row>
          { tabooUserListComponnet() }
        </Card>
      </div>
    )
  }

  // 标准用户列表
  function normalUserListComponnet() {
    const normalUserDivs = [];
    for (let i = 0; i < normalUsers.length; i++) {
      const user = normalUsers[i];
      normalUserDivs.push(
        <Col span="4" key={i}>
          <div className="tabooUser-content">{user['VIP']}  {user['userName']} -- {user['roomNum']}</div>
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
  function tabooUserListComponnet() {
    const tabooUserDivs = [];
    for (let i = 0; i < tabooUsers.length; i++) {
      const user = tabooUsers[i];
      tabooUserDivs.push(
        <Row key={i} style={ i%2 ?{backgroundColor :'#ffffff'} :{backgroundColor: '#f6f6f6'}}>
          <Col span="5">
            <div className="tabooUser-detail-content">{user['VIP']}  {user['userName']} -- {user['roomNum']}</div>
          </Col>
          <Col>
            <div className="tabooUser-detail-content">禁忌: {user['taboo']}</div>
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
    setTimeout(function(){
      dispatch({
        type: 'cyclePage/changedDetailTabActivity',
        payload: { status: 1 }
      })
    }.bind(that), 450);
  }

  //前一天
  function prevDateComponent() {

    var that = this;
    const {dispatch} = props;
    setTimeout(function(){
      dispatch({
        type: 'cyclePage/changedDetailTabActivity',
        payload: { status: -1 }
      })
    }.bind(that), 450);
  }

  function handleChangedState(){
    const {dispatch} = props;
    dispatch({
      type: 'cyclePage/changedShowStatus',
    })
  }

  return (
    <div>
      <Row>
        { headerComponent() }
      </Row>
      <Row>
        <div className='bottomButton' style={{marginRight: '20px'}}>
          <Button style={{width: '160px'}} className='commitButton BackBtn' onClick={handleChangedState}>返回</Button>
        </div>
      </Row>
    </div>
  )
}
//onClick={handleBack}
function mapStateToProps(state) {
  return {
    curTabsIndex: state.cyclePage.curDetailTabsIndex
  };
}
export default connect(mapStateToProps)(mainCycleDetail)
