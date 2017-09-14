/**
 * 游泳详情页
 * Created by yangjingjing on 2017/9/6.
 */
import React,{Component} from 'react';
import {connect} from 'dva';
import {Card,Row,Col,Tabs,Button,DatePicker,Select} from 'antd';
import {Link} from 'react-router';
import SwimmingIndexCss from  './SwimmingIndex.scss';
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import moment from  'moment'
import { queryURL,format } from '../../../utils/index.js';



const TabPane = Tabs.TabPane;
const Option = Select.Option;
class SwimmingDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      lookState:1,
      tabKey:'',
      changeDate:''
    }
  }

  callback=(key)=>{
    console.log("key",key);

    this.props.dispatch({
      type: 'swimming/getSwimmingRoomsInfo',
      payload:{
        ...params
      }
    })
  }

  handleBack=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming`));
  }

  handleHistory=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming/history?appointmentId=${queryURL("appointmentId")}`));
  }


  handleChangeState=(appointmentId,value)=>{
    this.props.dispatch({
      type: 'swimming/changeSwimmingState',
      payload:{
        appointmentId : appointmentId,
        state : value
      }
    })
  }


  //关闭预约
  onClose(v1,v2){
    this.props.dispatch({
      type:'swimming/closeSwimming',
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
      type:'swimming/openSwimming',
      payload:{
        "dataId":id,
        "date":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate,
      }
    })
  }
  //取消预约
  onCancel(id){
    this.props.dispatch({
      type:'swimming/cancelSwimming',
      payload:{
        "dataId":id,
        "date":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate,
      }
    })
  }


  initBtn(data){
    if(data.swimmingState == 3){
      return  <Col span={8} style={{textAlign:"right"}}><Button className="historyBtn" onClick={this.onCancel.bind(this,data.swimmingId)}>取消预约</Button></Col>
    }
    if(data.swimmingState == 2) {
      return <Col span={8} style={{textAlign:"right"}}>
        <Link style={{marginRight:'20px',color:'#009900'}}>不可约</Link>
        <Button className="historyBtn" onClick={this.onOpen.bind(this,data.swimmingId)}>开启预约</Button>
      </Col>
    }
    if(data.swimmingState == 1){
      return <Col span={8} style={{textAlign:"right"}}>
        <Link style={{marginRight:'20px',color:'#009900'}}>可约</Link>
        <Button className="historyBtn" onClick={this.onClose.bind(this,data.time,data.timeId)}>关闭预约</Button>
      </Col>
    }
  }

  initTabPane(data,roomsInfo,i){
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
                <Select className="swimming-select" onChange={this.handleChangeState.bind(this)} defaultValue={roomsInfo.state+''} placeholder="请选择">
                  <Option value="1">上线</Option>
                  <Option value="0">离线</Option>
                </Select>
              </div>
            </Col>
            <Col span={20} className="DetailRight">
              {
                roomsInfo.list.map(function(elem,index){
                  return   <div className="DetailValue" key={`${data}-${elem.timeId}`} style={{lineHeight:'50px'}}>
                    <Row className="TimeValue">
                      <Col span={8}>{elem.time}</Col>
                      <Col span={8}>
                        {
                          elem.swimmingState == 3 ? `${elem.customerName}-${elem.customerRoom}`:''
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
      type:'swimming/getSwimmingRoomsInfo',
      payload:{
        // "date":moment(this.props.detailCurrentDate).format("YYYY-MM-DD"),
        "date":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate,
        "appointmentId":queryURL("appointmentId"),
        "tabs":true,
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
      type:'swimming/getSwimmingRoomsInfo',
      payload:{
        // "date":moment(this.props.detailCurrentDate).format("YYYY-MM-DD"),
        "date":this.state.tabKey != ''?this.state.tabKey:this.props.detailCurrentDate,
        "appointmentId":queryURL("appointmentId"),
        "tabs":true,
        "type":1,
      }
    })
  }
  //点击改变日期
  onChangeDetailDate(value, dateString) {
    this.setState({
      changeDate:'',
    })
    this.props.dispatch({
      type:'swimming/getSwimmingRoomsInfo',
      payload:{
        "date":moment(dateString).format("YYYY-MM-DD"),
        "appointmentId":queryURL("appointmentId"),
        "type":this.state.lookState,
      }
    })
    this.props.dispatch({
      type:'swimming/saveDetailDate',
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
      type: 'swimming/saveDetailDate',
      payload:{
        "detailCurrentDates":''
      }
    })
  }
  //tab点击
  onTabClick(key) {
    this.setState({
      changeDate: key,
    })
  }


  onTabChange(k){
    this.setState({
      tabKey:moment(k).format("YYYY-MM-DD"),
    })
    this.props.dispatch({
      type:'swimming/getSwimmingRoomsInfo',
      payload:{
        "date":moment(k).format("YYYY-MM-DD"),
        "appointmentId":queryURL("appointmentId"),
        "type":this.state.lookState,
        "tabs":true,
      }
    })

  }

  render(){
    const { loading ,detailCurrentDate,detailData} = this.props;
    const tabPanelArr = [];
    let dateTime = detailCurrentDate;
    let defaultKeys = '';
    if(this.state.changeDate != ''){
      defaultKeys = this.state.changeDate;
    }else{
      defaultKeys = detailCurrentDate && detailCurrentDate != '' ? moment(dateTime).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD");
    }
    console.log("default",detailCurrentDate)
    for(let i=0;i<5;i++){
      detailData ? tabPanelArr.push(this.initTabPane(moment(dateTime).add(i,'days').format("YYYY-MM-DD"),detailData,i)):'';
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
        <Tabs onChange={this.onTabChange.bind(this)} activeKey={defaultKeys} onTabClick={this.onTabClick.bind(this)} type="card" tabBarExtraContent={btns}>
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
  return {
    ...state.swimming,
    loading:state.loading
  }
}
export default connect(mapStateToProps)(SwimmingDetail);
