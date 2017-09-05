/**
 * 游泳
 * Created by yangjingjing on 2017/9/5.
 */
import React, { Component } from 'react';
import {Row,Col,Select,Input} from 'antd';
import { connect } from 'dva';
import SwimmingIndexCss from  './SwimmingIndex.scss';
const Option = Select.Option;

class SwimmingIndex extends Component{

  constructor(props){
    super(props);
  }


  //英文周几对应的汉字周几
  chineseWeekDay(dayOfWeek){
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

  render(){
    return (
      <div className="order-swimming">
        <Row>
          <Col span={24} className="date-title">
          <div><h1>2017年09月05号</h1></div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Row>
              <Col span={8}>
                <div className="ItemLeft">
                  <p>
                    <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                  </p>
                  <p>小红</p>
                  <Select className="swimming-select" labelInValue={true} placeholder="请选择">
                    <Option key={1}>开工</Option>
                    <Option key={0}>离开</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
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
          <Col span={8}>
            <Row>
              <Col span={8}>
                <div className="ItemLeft">
                  <p>
                    <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                  </p>
                  <p>小红</p>
                  <Select className="swimming-select" labelInValue={true} placeholder="请选择">
                    <Option key={1}>开工</Option>
                    <Option key={0}>离开</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
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
          <Col span={8}>
            <Row>
              <Col span={8}>
                <div className="ItemLeft">
                  <p>
                    <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                  </p>
                  <p>小红</p>
                  <Select className="swimming-select" labelInValue={true} placeholder="请选择">
                    <Option key={1}>开工</Option>
                    <Option key={0}>离开</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
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
        </Row>
      </div>
    );
  }

}
function mapStateToProps(state) {
  return{
    loading:state.loading,
  };
}
export default connect(mapStateToProps)(SwimmingIndex);
