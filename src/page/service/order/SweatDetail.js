/**
 * Created by Flyforwards on 2017/9/8.
 */
import React,{Component} from 'react';
import {connect} from 'dva';
import {Card,Row,Col,Tabs,Button,DatePicker,Select,Spin} from 'antd';
import {Link} from 'react-router';
import SwimmingIndexCss from  './SwimmingIndex.scss';
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import moment from 'moment'
import { queryURL,format } from '../../../utils/index.js';

const TabPane = Tabs.TabPane;
const Option = Select.Option;
class SweatDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      lookState:1,
      tabKey:''
    }
  }

  onTabChange(k){
    this.setState({
      tabKey:moment(k).format("YYYY-MM-DD"),
    })
    this.props.dispatch({
      type:'orderSweat/getSweatingRoomsInfo',
      payload:{
        "date":moment(k).format("YYYY-MM-DD"),
        "appointmentId":queryURL("appointmentId"),
        "type":this.state.lookState,
        "tabs":true,
      }
    })

  }
  //切换状态
  onChangeState(value){
    this.props.dispatch({
      type:'orderSweat/changeSweatingState',
      payload:{
        "appointmentId": queryURL("appointmentId"),
        "state": value
      }
    })
  }

  handleBack=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-sweat`));
  }
  //关闭预约
  onClose(v1,v2){
    console.log("guanbi ",v1,v2)
    this.props.dispatch({
      type:'orderState/saveDetailDate',
      payload:{
        "detailCurrentDates":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate
      }
    })
    this.props.dispatch({
      type:'orderSweat/closeSweating',
      payload:{
        "appointmentId":queryURL("appointmentId"),
        "date":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate,
        "time":v1,
        "timeId":v2,
      }
    })
  }
  //开启预约
  onOpen(id){
    this.props.dispatch({
      type:'orderState/saveDetailDate',
      payload:{
        "detailCurrentDates":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate
      }
    })
    this.props.dispatch({
      type:'orderSweat/openSweating',
      payload:{
       "dataId":id
      }
    })
  }
  //取消预约
  onCancel(id){
    this.props.dispatch({
      type:'orderState/saveDetailDate',
      payload:{
        "detailCurrentDates":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate
      }
    })
    this.props.dispatch({
      type:'orderSweat/cancelSweating',
      payload:{
        "dataId":id
      }
    })
  }
  handleHistory=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming/history`));
  }
  initBtn(data){
    if(data.sweatingState == 3){
      return  <Col span={8} style={{textAlign:"right"}}><Button className="historyBtn" onClick={this.onCancel.bind(this,data.sweatingId)}>取消预约</Button></Col>
    }
    if(data.sweatingState == 2) {
      return <Col span={8} style={{textAlign:"right"}}>
        <Link style={{marginRight:'20px',color:'#009900'}}>不可约</Link>
        <Button className="historyBtn" onClick={this.onOpen.bind(this,data.sweatingId)}>开启预约</Button>
      </Col>
    }
    if(data.sweatingState == 1){
      return <Col span={8} style={{textAlign:"right"}}>
        <Link style={{marginRight:'20px',color:'#009900'}}>可约</Link>
        <Button className="historyBtn" onClick={this.onClose.bind(this,data.time,data.timeId)}>关闭预约</Button>
      </Col>
    }
  }

  initTabPane(data,roomsInfo,i){
    console.log("data",data)
    let _this = this;
    return (
      <TabPane tab={data}  key={data} className="detailPane">
        <div>
          <Row className="DetailRow">
            <Col span={4} className="DetailLeft">
              <div className="ItemLeft">
                <p>
                  <img className="swimming-icon" src="" alt="" />
                </p>
                <p>{roomsInfo.describe}</p>
                <Select className="swimming-select" onChange={this.onChangeState.bind(this)} defaultValue={roomsInfo.state+''} placeholder="请选择">
                  <Option value="1">上线</Option>
                  <Option value="0">离线</Option>
                </Select>
              </div>
            </Col>
            <Col span={20} className="DetailRight">
              {
                roomsInfo.list.map(function(elem,index){
                 return   <div className="DetailValue" key={elem.timeId} style={{lineHeight:'50px'}}>
                   <Row className="TimeValue">
                     <Col span={8}>{elem.time}</Col>
                     <Col span={8}>
                       {
                         elem.sweatingState == 3 ? `${elem.customerName}-${elem.customerRoom}`:''
                       }
                     </Col>
                       {
                         _this.initBtn(elem)
                       }
                   </Row>
                 </div>
                })
              }
            </Col>
          </Row>
        </div>
      </TabPane>
    );
  }
//点击只看可约
  onLook() {
   this.setState({
     lookState:2,
   });
    this.props.dispatch({
      type:'orderSweat/getSweatingRoomsInfo',
      payload:{
        "date":moment(this.props.detailCurrentDate).format("YYYY-MM-DD"),
        "appointmentId":queryURL("appointmentId"),
        "type":2,
      }
    })
  }
  //点击查看全部
  onLookAll() {
    this.setState({
      lookState:1
    })
    this.props.dispatch({
      type:'orderSweat/getSweatingRoomsInfo',
      payload:{
        "date":moment(this.props.detailCurrentDate).format("YYYY-MM-DD"),
        "appointmentId":queryURL("appointmentId"),
        "type":1,
      }
    })
  }
  //点击改变日期
  onChangeDetailDate(value, dateString) {
    this.props.dispatch({
      type:'orderSweat/getSweatingRoomsInfo',
      payload:{
        "date":moment(dateString).format("YYYY-MM-DD"),
        "appointmentId":queryURL("appointmentId"),
        "type":this.state.lookState,
      }
    })
    this.props.dispatch({
      type:'orderSweat/saveDetailDate',
      payload:{
        'detailCurrentDates':moment(dateString).format("YYYY-MM-DD"),
      }
    })
    this.setState({
      tabKey:'',
    })
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'orderSweat/saveDetailDate',
      payload:{
        "detailCurrentDates":''
      }
    })
  }
  render(){
    const { loading ,detailCurrentDate,roomsInfo} = this.props;
    console.log("sss",detailCurrentDate)
    const tabPanelArr = [];
    let dateTime = detailCurrentDate;
    for(let i=0;i<5;i++){
      roomsInfo ? tabPanelArr.push(this.initTabPane(moment(dateTime).add(i,'days').format("YYYY-MM-DD"),roomsInfo,i)):'';
    }
    let btns = this.state.lookState == 1 ? <Button onClick={this.onLook.bind(this)} className="button-group-1">查看可约</Button>:<Button onClick={this.onLookAll.bind(this)} className="button-group-1">查看全部</Button>;
    return (
      <Card className="DetailCard">
       <Row className="date-title">
          <Col span={24}>
            {
              detailCurrentDate ? <DatePicker
                defaultValue={moment(dateTime,"YYYY-MM-DD")}
                onChange={this.onChangeDetailDate.bind(this)}
              />:''
            }
          </Col>
        </Row>
         <Tabs onChange={this.onTabChange.bind(this)} defaultActiveKey={detailCurrentDate ? moment(dateTime).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD")}  type="card" tabBarExtraContent={btns}>
            {tabPanelArr}
          </Tabs>
        <div className="Detail-Bottom">
          <Button className="historyBtn button-group-bottom-2" onClick={this.handleHistory.bind(this)}>历史</Button>
          <Button className="button-group-bottom-1" onClick={this.handleBack.bind(this)}>返回</Button>
        </div>
      </Card>
    );

  }

}
function mapStateToProps(state) {
  const { roomsInfo,currentDate ,detailCurrentDate} = state.orderSweat;
  console.log("chushi",roomsInfo);
  return {
    roomsInfo,
    currentDate,
    detailCurrentDate,
    loading:state.loading
  }
}
export default connect(mapStateToProps)(SweatDetail);
