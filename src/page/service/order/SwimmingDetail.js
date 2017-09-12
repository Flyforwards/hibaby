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

const TabPane = Tabs.TabPane;
const Option = Select.Option;
class SwimmingDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      params : null
    }
  }

  callback=()=>{

  }

  handleBack=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming`));
  }

  handleHistory=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming/history?appointmentId=${params?params.appointmentId:null}`));
  }

  componentDidMount() {
    const params = parse(location.search.substr(1));
    console.log(params);
    this.setState({
      params : params
    });
    this.props.dispatch({
      type: 'swimming/getSwimmingRoomsInfo',
      payload:{
        ...params
      }
    })
  }
  handleChangeState=(value)=>{
    this.props.dispatch({
      type: 'swimming/changeSwimmingState',
      payload:{
        appointmentId : value.split(":")[0],
        state : value.split(":")[1]
      }
    })
  }

  handleUpdateOrderState=()=>{

  }

  initTabPane(item,key){

      return (
        <TabPane tab={this.state.params?this.state.params.date:null} key={key} className="detailPane">
          <div>
            <Row className="DetailRow">
              <Col span={4} className="DetailLeft">
                <div className="ItemLeft">
                  <p>
                    <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                  </p>
                  <p>{item.describe}</p>
                  <Select className="swimming-select" defaultValue={item.appointmentId+":"+item.state} placeholder="请选择" onChange={this.handleChangeState.bind(item.appointmentId)}>
                    <Option value={item.appointmentId+":"+1}>开工</Option>
                    <Option value={item.appointmentId+":"+0}>离开</Option>
                  </Select>
                </div>
              </Col>
              <Col span={20} className="DetailRight">
                <div className="DetailValue">
                  <Row className="TimeValue">
                    <Col span={8}>9:00 - 9:30</Col>
                    <Col span={8}>月红梅 - 1001</Col>
                    <Col span={8}><Button className="historyBtn" onClick={this.handleUpdateOrderState.bind(this)}>取消预约</Button></Col>
                  </Row>
                </div>
                <div className="DetailValue">
                  <Row className="TimeValue">
                    <Col span={8}>9:00 - 9:30</Col>
                    <Col span={8}>月红梅 - 1001</Col>
                    <Col span={8}><Button className="historyBtn">取消预约</Button></Col>
                  </Row>
                </div>
                <div className="DetailValue">
                  <Row className="TimeValue">
                    <Col span={8}>9:00 - 9:30</Col>
                    <Col span={8}>月红梅 - 1001</Col>
                    <Col span={8}><Button className="historyBtn">取消预约</Button></Col>
                  </Row>
                </div>
                <div className="DetailValue">
                  <Row className="TimeValue">
                    <Col span={8}>9:00 - 9:30</Col>
                    <Col span={8}>月红梅 - 1001</Col>
                    <Col span={8}><Button className="historyBtn">取消预约</Button></Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </TabPane>
      );


  }
  render(){
    const {detailData} = this.props;
    console.log("detailData",detailData);
    const tabPanelArr = [];
    const key = "0";
    const panel = detailData?this.initTabPane(detailData,key):null;
    tabPanelArr.push(panel);
    debugger;

    return (
      <Card className="DetailCard">
        <Row className="date-title">
          <Col span={24}>
            <DatePicker/>
          </Col>
        </Row>
        <Tabs onChange={this.callback.bind(this)} type="card" defaultActiveKey={key}>
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
