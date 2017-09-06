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
  }

  callback=()=>{

  }

  handleBack=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming`));
  }

  handleHistory=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming/history`));
  }


  initTabPane(data){
    return (
      <TabPane tab={"Tab "+data} key={data} className="detailPane">
        <div>
          <Row className="DetailRow">
            <Col span={4} className="DetailLeft">
              <div className="ItemLeft">
                <p>
                  <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                </p>
                <p>小红</p>
                <Select className="swimming-select" defaultValue="1" placeholder="请选择">
                  <Option value="1">开工</Option>
                  <Option value="0">离开</Option>
                </Select>
              </div>
            </Col>
            <Col span={20} className="DetailRight">
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
    const tabPanelArr = [];
    for(let i=0;i<5;i++){
      tabPanelArr.push(this.initTabPane(i));
    }
    return (
      <Card className="DetailCard">
        <Row className="date-title">
          <Col span={24}>
            <DatePicker/>
          </Col>
        </Row>
        <Tabs onChange={this.callback.bind(this)} type="card">
          {tabPanelArr}
        </Tabs>
        <div className="Detail-Bottom">
          <Button className="historyBtn" onClick={this.handleHistory.bind(this)}>历史</Button>
          <Button className="" onClick={this.handleBack.bind(this)}>返回</Button>
        </div>
      </Card>
    );

  }

}
function mapStateToProps(state) {
  return {
    loading:state.loading
  }
}
export default connect(mapStateToProps)(SwimmingDetail);
