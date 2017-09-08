/**
 * 游泳
 * Created by yangjingjing on 2017/9/5.
 */
import React, { Component } from 'react';
import {Card,Row,Col,Select,DatePicker} from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router';
import SwimmingIndexCss from  './SwimmingIndex.scss';
const Option = Select.Option;

class SwimmingIndex extends Component{

  constructor(props){
    super(props);
  }


  initBox(){
    return (
      <Col span={6}>
        <Row>
          <Col span={8}>
            <div className="ItemLeft">
              <Link to="/service/order-swimming/detail">
                <p>
                  <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                </p>
                <p>小红</p>
              </Link>
              <Select className="swimming-select" defaultValue="1" placeholder="请选择">
                <Option value="1">开工</Option>
                <Option value="0">离开</Option>
              </Select>
            </div>
          </Col>
          <Col span={14}>
            <div className="ItemRight">
              <p>9:00-9:30</p>
              <p>9:00-9:30</p>
              <p>9:00-9:30</p>
              <p>9:00-9:30</p>
              <p>9:00-9:30</p>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }

  render(){
    return (
      <Card className="order-swimming">
        <Row>
          <Col span={24} className="date-title">
          <div><DatePicker/></div>
          </Col>
        </Row>
        <Row>
          {this.initBox()}
          {this.initBox()}
          {this.initBox()}
          {this.initBox()}
        </Row>
      </Card>
    );
  }

}
function mapStateToProps(state) {
  return{
    loading:state.loading,
  };
}
export default connect(mapStateToProps)(SwimmingIndex);
