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

const TabPane = Tabs.TabPane;
const Option = Select.Option;
class SweatDetail extends Component{
  constructor(props){
    super(props);
  }

  callback=()=>{

  }

  handleBack=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-sweat`));
  }

  handleHistory=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-swimming/history`));
  }


  initTabPane(data){
    return (
      <TabPane tab={data} key={data} className="detailPane">
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
              <div className="DetailValue" style={{lineHeight:'50px'}}>
                <Row className="TimeValue">
                  <Col span={8}>9:00 - 9:30</Col>
                  <Col span={8}></Col>
                  <Col span={8} style={{textAlign:"right"}}><Link style={{marginRight:'20px',color:'#009900'}}>可约</Link><Button className="historyBtn">关闭预约</Button></Col>
                </Row>
              </div>
              <div className="DetailValue" style={{lineHeight:'50px'}}>
                <Row className="TimeValue">
                  <Col span={8}>9:00 - 9:30</Col>
                  <Col span={8}>月红梅 - 1001</Col>
                  <Col span={8} style={{textAlign:"right"}}><Button className="historyBtn">取消预约</Button></Col>
                </Row>
              </div>
              <div className="DetailValue" style={{lineHeight:'50px'}}>
                <Row className="TimeValue">
                  <Col span={8}>9:00 - 9:30</Col>
                  <Col span={8}>月红梅 - 1001</Col>
                  <Col span={8} style={{textAlign:"right"}}><Button className="historyBtn">取消预约</Button></Col>
                </Row>
              </div>
              <div className="DetailValue" style={{lineHeight:'50px'}}>
                <Row className="TimeValue">
                  <Col span={8}>9:00 - 9:30</Col>
                  <Col span={8}>月红梅 - 1001</Col>
                  <Col span={8} style={{textAlign:"right"}}><Button className="historyBtn">取消预约</Button></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </TabPane>
    );
  }
//点击只看可约
  onLook() {
    console.log("xxxx")
  }

  render(){
    const { loading } = this.props;
    const tabPanelArr = [];
    for(let i=0;i<5;i++){
      tabPanelArr.push(this.initTabPane(moment().add(i,'days').format("YYYY-MM-DD")));
    }
    let btns = <Button onClick={this.onLook.bind(this)} className="button-group-1">查看可约</Button>;
    return (
      <Card className="DetailCard">
        <Row className="date-title">
          <Col span={24}>
            <DatePicker/>
          </Col>
        </Row>
        <Tabs onChange={this.callback.bind(this)} type="card" tabBarExtraContent={btns}>
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
    loading:state.loading
  }
}
export default connect(mapStateToProps)(SweatDetail);
