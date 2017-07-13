import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Cycle.scss';
import CycleDetail from './cycleDetail.jsx';
import CycleDishesDetail from './cycleDishesDetail.jsx';
import CycleTabooDetail from './cycleTabooDetail.jsx';
import { Form, Icon, Col, Row, Modal, Card, Tabs, Radio, Button, Badge, Select, Spin } from 'antd'
const Option = Select.Option;

var curWeek = 1;

// 主页面
function mealCycle (props) {
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
            <div className="dayTitle">{props.loopDatas.date} {chineseWeekDay(props.loopDatas.dayOfWeek)}</div>
            <div style={{marginTop: '-65px'}}>
              { props.curTabsIndex == 0
                ? <div></div>
                : filterDiv()
              }
              <div style={{marginLeft: '85%', marginTop: '-15px'}}><p>今日用餐客户共计<font color="#ac672c">{props.loopDatas.allTotal}</font>人</p></div>
            </div>
            <div style={{marginTop: '20px' ,marginBottom: '40px'}}>{ showCurrentComponent(props.curTabsIndex) }</div>
          </Col>
          <Col span="1">
            <Button
              icon="double-right"
              style={{height: '40px', width: '40px', marginLeft: '20px'}}
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

  //筛选
  function filterDiv() {
    return (
      <Select defaultValue={props.curType}  style={{ width: 200 ,textAlign:'center',fontSzie:'16px',color:'#333333'}} placeholder="" onChange={handleChangeType} >
        <Option value="0">当日餐单</Option>
        <Option value="1">早餐</Option>
        <Option value="2">早加</Option>
        <Option value="3">午餐</Option>
        <Option value="4">午加</Option>
        <Option value="5">晚餐</Option>
        <Option value="6">晚加</Option>
      </Select>
    )
  }

  function handleChangeType (value) {

    console.log('----------------------value');
    console.log(value);

    const {dispatch} = props;
    if (value != props.curType) {

      dispatch({
        type: 'cyclePage/chooicesType',
        payload:{ value }
      })

      //请求对应页面的数据
      getComponentData(props.curTabsIndex, value);
    }
  }

  function showCurrentComponent(index) {
    const components = [];
    components.push (
      <div>
        { mainComponent() }
      </div>
    );
    components.push (
      <div>
        { secondComponet() }
      </div>
    );
    components.push (
      <div>
        { thirdComponet() }
      </div>
    );

    return (
      components[index]
    )
  }

  /**
   * 第一页的界面: 禁忌用户列表
   * @returns {XML}
   */
  function mainComponent() {
    return (
      <div>
        <Row>
          <Col span="12">
            { itemCardComponent(0) }
          </Col>
          <Col span="12">
            { itemCardComponent(1) }
          </Col>
          <Col span="12">
            { itemCardComponent(2) }
          </Col>
          <Col span="12">
            { itemCardComponent(3) }
          </Col>
          <Col span="12">
            { itemCardComponent(4) }
          </Col>
        </Row>
      </div>
    )
  }

  function itemCardComponent(index) {

    let loopObj = {};
    if (props.loopDatas.loops){
      for (let i = 0; i < props.loopDatas.loops.length; i++) {
        const tmp_Obj = props.loopDatas.loops[i];
        if (tmp_Obj.week == index+1){
          loopObj = tmp_Obj;
          break;
        }
      }
    }
    //标准用户
    const normalUser = loopObj.loopTotals ? loopObj.loopTotals[0] : {} ;

    //禁忌用户
    const tabooUser = loopObj.loopTotals ? loopObj.loopTotals[1] : {} ;

    //禁忌用户列表
    const customers = loopObj.loopTotals ? tabooUser.customers : [] ;

    let title = '周期一';
    if (index == 0) {
      title = '周期一';
    }
    else if (index == 1){
      title = '周期二';
    }
    else if (index == 2){
      title = '周期三';
    }
    else if (index == 3){
      title = '周期四';
    }
    else if (index == 4){
      title = '周期五';
    }

    return (
      <div>
        <Card title={title} bordered={true} style={{marginBottom: '10px'}} onClick={() => { handleChangedState(index+1) }}>
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
            <div className="cardSubtitle">{`标准用户${normalUser.total}人`}</div>
            <div style={{background: '#e9e9e9', marginLeft: '20px', marginRight: '20px',height: '1px'}}></div>
          </Row>
          <Row>
            { tabooUserDiv(customers) }
          </Row>
        </Card>
      </div>
    )
  }

  function tabooUserDiv(customers) {

    if (customers.length > 0) {
      return (
        <div>
          <Row>
            <div className="cardSubtitle" style={{color:'#a5a5a5', height:'30px',lineHeight: '30px',marginTop: '10px'}}>禁忌用户:</div>
          </Row>
          <Row>
            <div style={{marginLeft: '20px', marginRight: '20px'}}>
              { tabooUserListComponnet(customers) }
            </div>
          </Row>
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }

  // 禁忌用户列表
  function tabooUserListComponnet(customers) {
    const firstColDivs = [];
    const secondColDivs = [];
    const thirdColDivs = [];
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      let num = i%18;
      if (num < 6){
        firstColDivs.push(
          <Col key={i}>
            <div className="tabooUser-content">V{customer['level']}   {customer['name']}  --  {customer['room']}</div>
          </Col>
        );
      }
      else if (num < 12){
        secondColDivs.push(
          <Col key={i}>
            <div className="tabooUser-content">{customer['level']}   {customer['name']}  --  {customer['room']}</div>
          </Col>
        );
      }
      else {
        thirdColDivs.push(
          <Col key={i}>
            <div className="tabooUser-content">{customer['level']}   {customer['name']}  --  {customer['room']}</div>
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

  /**
   * 第二页的界面: 禁忌的菜品
   * @returns {XML}
     */
  function secondComponet() {
    return (
      <div>
        <Row>
          <Col span="12">
            { secondItemCard(0) }
          </Col>
          <Col span="12">
            { secondItemCard(1) }
          </Col>
          <Col span="12">
            { secondItemCard(2) }
          </Col>
          <Col span="12">
            { secondItemCard(3) }
          </Col>
          <Col span="12">
            { secondItemCard(4) }
          </Col>
        </Row>
      </div>
    )
  }

  function secondItemCard(index) {

    let loopObj = {};
    if (props.loopSecondDatas.loops){
      for (let i = 0; i < props.loopSecondDatas.loops.length; i++) {
        const tmp_Obj = props.loopSecondDatas.loops[i];
        if (tmp_Obj.week == index+1){
          loopObj = tmp_Obj;
          break;
        }
      }
    }
    //标准菜品
    const normalObj = loopObj.loopTotals ? loopObj.loopTotals[0] : {} ;
    const normalDishes = normalObj.dishes ? normalObj.dishes : [] ;

    //禁忌菜品
    const tabooObj = loopObj.loopTotals ? loopObj.loopTotals[1] : {} ;
    const tabooDishes = tabooObj.dishes ? tabooObj.dishes : {} ;

    let title = '周期一';
    if (index == 0) {
      title = '周期一';
    }
    else if (index == 1){
      title = '周期二';
    }
    else if (index == 2){
      title = '周期三';
    }
    else if (index == 3){
      title = '周期四';
    }
    else if (index == 4){
      title = '周期五';
    }

    return (
      <div>
        <Card title={title} bordered={true} style={{marginBottom: '10px', backgroundColor: '#ffb3b3'}} onClick={() => { handleGotoTabooDetail(index+1) }}>
          <div style={{display: 'flex',justifyContent: 'flex-end'}}>
            <Badge count={loopObj.day} style={{
              backgroundColor: '#fff',
              color: '#999',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
              marginRight: '20px',
              marginTop: '-35px' }}
            />
          </div>
          <div style={{scroll: 'auto'}}>
            { normalDishes.length==0 ?
              <div></div>
              :
              <div>
                <Row style={{backgroundColor: '#b3ffb3'}}>
                  <div style={{marginBottom: '10px'}}>
                    {normalDishesDivs(normalDishes)}
                  </div>
                </Row>
                <div style={{background: '#e9e9e9',
                               height: '1px'}}>
                </div>
              </div>
            }

            <div>
              {tabooDishesDivs(tabooDishes)}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  function handleGotoTabooDetail(week) {

    curWeek = week;

    const {dispatch} = props;
    dispatch({
      type: 'cyclePage/changedShowStatus',
      payload: {value: 2}
    }),

      //单个循环周期房间送餐详情
      dispatch({
        type: 'cyclePage/getLoopDishesListByWeek',
        payload: { week: week , type: Number(props.curType)}
      })
  }

  //标准菜品和数量
  function normalDishesDivs(dishes) {

    const colDivs = [];
    for (let i = 0; i < dishes.length; i++) {
      const dish = dishes[i];
      colDivs.push(
        <Col span="6" key={i}>
          <div className="tabooUser-content">{dish['dishesName']}*{dish['total']}</div>
        </Col>
      );
    }

    return (
      <Row style={{marginLeft: '20px', marginTop: '10px'}}>
        {colDivs}
      </Row>
    )
  }

  //禁忌的菜品
  function tabooDishesDivs(dishes) {

    const colDivs = [];
    for (let i = 0; i < dishes.length; i++) {
      const dish = dishes[i];
      var mark = '';
      if (dish['sugar'] == 1){
        mark = '糖';
      }
      colDivs.push(
          <Col span="8" key={i}>
            <div className="tabooUser-content"><p>{dish['dishesName']}*{dish['total']}<font color="#ac672c" size="3">   {mark}</font></p></div>
          </Col>
      );
    }

    return (
      <Row style={{marginLeft: '20px', marginTop: '10px'}}>
        {colDivs}
      </Row>
    )
  }

  /**
   * 第三页的界面: 每个房间的菜单
   * @returns {XML}
   */
  function thirdComponet() {
    return (
      <div>
        <Row>
          <Col span="12">
            { thirdItemCard(0) }
          </Col>
          <Col span="12">
            { thirdItemCard(1) }
          </Col>
          <Col span="12">
            { thirdItemCard(2) }
          </Col>
          <Col span="12">
            { thirdItemCard(3) }
          </Col>
          <Col span="12">
            { thirdItemCard(4) }
          </Col>
        </Row>
      </div>
    )
  }

  function thirdItemCard(index) {

    let loopObj = {};
    if (props.loopThirdDatas.loops){
      for (let i = 0; i < props.loopThirdDatas.loops.length; i++) {
        const tmp_Obj = props.loopThirdDatas.loops[i];
        if (tmp_Obj.week == index+1){
          loopObj = tmp_Obj;
          break;
        }
      }
    }

    const loopDishes = loopObj.loopTotals ? loopObj.loopTotals : [] ;

    let title = '周期一';
    if (index == 0) {
      title = '周期一';
    }
    else if (index == 1){
      title = '周期二';
    }
    else if (index == 2){
      title = '周期三';
    }
    else if (index == 3){
      title = '周期四';
    }
    else if (index == 4){
      title = '周期五';
    }

    return (
      <div>
        <Card title={title} bordered={true} style={{marginBottom: '10px'}} onClick={() => { handleGotoDishesDetail(index+1) }}>
          <div style={{display: 'flex',justifyContent: 'flex-end'}}>
            <Badge count={loopObj.day} style={{
              backgroundColor: '#fff',
              color: '#999',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
              marginRight: '20px',
              marginTop: '-35px' }}
            />
          </div>
          {foodMenuDivs(loopDishes)}
        </Card>
      </div>
    )
  }

  function handleGotoDishesDetail(week) {

    curWeek = week;

    const {dispatch} = props;
    dispatch({
      type: 'cyclePage/changedShowStatus',
      payload: {value: 3}
    }),

    //单个循环周期房间送餐详情
    dispatch({
      type: 'cyclePage/getLoopRoomDishesListByWeek',
      payload: { week: week , type: Number(props.curType)}
    })
  }

  function foodMenuDivs(loopDishes) {

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
          <div style={{minHeight: '40px',marginLeft: '20px', marginRight: '20px'}}>
            <Col span="2">
              <div className="tabooUser-detail-content">{loopObj.room}</div>
            </Col>
            <Col span="22">
              <div className="tabooUser-detail-content">{dishesStr}</div>
            </Col>
          </div>
        </Row>
      );
    }

    return (
      <div>
        { colDivs }
      </div>
    )
  }

  function handleChangedState(week){

    curWeek = week;

    const {dispatch} = props;
    dispatch({
      type: 'cyclePage/changedShowStatus',
      payload: {value: 1}
    }),

    //查询单个循环的数据
    dispatch({
      type: 'cyclePage/getLoopListByWeek',
      payload: { week: week }
    })
  }

  function nextDateComponent() {

    const {dispatch} = props;

    let index = props.curTabsIndex+1;
    if (index > 2){
      index = 0;
    }
    getComponentData(index, props.curType);

    dispatch({
      type: 'cyclePage/changedTabActivity',
      payload: { status: 1 }
    })

  }

  function prevDateComponent() {

    const {dispatch} = props;

    let index = props.curTabsIndex-1;
    if (index < 0){
      index = 2;
    }
    getComponentData(index, props.curType);

    dispatch({
      type: 'cyclePage/changedTabActivity',
      payload: { status: -1 }
    })
  }

  //请求对应页面的数据
  function getComponentData(index, type) {

    const {dispatch} = props;

    if (index == 0){

      dispatch({
        type: 'cyclePage/getLoopList',
        payload:{  type: 0 }
      })
    }
    else if (index == 1){

      dispatch({
        type: 'cyclePage/getLoopDishesList',
        payload:{ type: type }
      })
    }
    else {

      dispatch({
        type: 'cyclePage/getLoopRoomDishesList',
        payload:{ type: type }
      })
    }
  }

  const {loading} = props;
  if (props.showPageIndex == 0) {

    return (
      <div className="MealCycle">
        <Spin
          spinning={loading.effects['cyclePage/getLoopList'] !== undefined ? loading.effects['cyclePage/getLoopList'] : false}>
          {headerComponent()}
        </Spin>
      </div>
    )
  }
  else if (props.showPageIndex == 1) {
    return (
      <div className="MealCycle">
        <Spin
          spinning={loading.effects['cyclePage/getLoopListByWeek'] !== undefined ? loading.effects['cyclePage/getLoopListByWeek'] : false}>
          <CycleDetail loopWeekDatas={props.loopWeekDatas} week={curWeek}/>
        </Spin>
      </div>
    )
  }
  else if (props.showPageIndex == 2) {
    return (
      <div className="MealCycle">
        <Spin
          spinning={loading.effects['cyclePage/getLoopDishesListByWeek'] !== undefined ? loading.effects['cyclePage/getLoopDishesListByWeek'] : false}>
          <CycleTabooDetail loopWeekTabboDatas={props.loopWeekTabboDatas} type={props.curType} week={curWeek}/>
        </Spin>
      </div>
    )
  }
  else {
    return (
      <div className="MealCycle">
        <Spin
          spinning={loading.effects['cyclePage/getLoopRoomDishesListByWeek'] !== undefined ? loading.effects['cyclePage/getLoopRoomDishesListByWeek'] : false}>
          <CycleDishesDetail loopWeekDishesDatas={props.loopWeekDishesDatas} type={props.curType} week={curWeek}/>
        </Spin>
      </div>
    )
  }
}

var refreshInterval;

class MealCyclePage extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount() {
    //定义一个反复执行的调用
    var that = this;
    refreshInterval = setInterval(function () {

      if (this.props.curTabsIndex == 0){

        this.props.dispatch({
          type: 'cyclePage/getLoopList',
          payload:{  type: 0 }
        })
      }
      else if (this.props.curTabsIndex == 1){

        this.props.dispatch({
          type: 'cyclePage/getLoopDishesList',
          payload:{ type: this.props.curType }
        })
      }
      else {

        this.props.dispatch({
          type: 'cyclePage/getLoopRoomDishesList',
          payload:{ type: this.props.curType }
        })
      }

    }.bind(that), 3600000);
  }

  componentWillUnmount() {

    clearInterval(refreshInterval);

    this.props.dispatch({
      type: 'cyclePage/changedShowStatus',
      payload: {value: 0}
    })

    this.props.dispatch({
      type: 'cyclePage/chooicesType',
      payload:{ value: '0' }
    })


    this.props.dispatch({
      type: 'cyclePage/changedTabActivity',
      payload: { status: 0 }
    })
  }

  render(){
    return (
      mealCycle(this.props)
    );
  }
}

function mapStateToProps(state) {

  return {
    loading: state.loading,
    curType: state.cyclePage.curType,
    showPageIndex: state.cyclePage.showPageIndex,
    curTabsIndex: state.cyclePage.curTabsIndex,
    loopDatas: state.cyclePage.loopDatas,
    loopSecondDatas: state.cyclePage.loopSecondDatas,
    loopThirdDatas: state.cyclePage.loopThirdDatas,
    loopWeekDatas: state.cyclePage.loopWeekDatas,
    loopWeekDishesDatas: state.cyclePage.loopWeekDishesDatas,
    loopWeekTabboDatas: state.cyclePage.loopWeekTabboDatas,
    systemTime: state.cyclePage.systemTime
  };
}
export default connect(mapStateToProps)(MealCyclePage)
