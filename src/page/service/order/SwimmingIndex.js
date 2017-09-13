/**
 * 游泳
 * Created by yangjingjing on 2017/9/5.
 */
import React, { Component } from 'react';
import {Card,Row,Col,Select,DatePicker} from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router';
import SwimmingIndexCss from  './SwimmingIndex.scss';
import moment from  'moment'

const Option = Select.Option;

class SwimmingIndex extends Component{

  constructor(props){
    super(props);
    this.state = {
    }
  }


  handleDate=(value)=>{
    this.props.dispatch({
      type:'orderSweat/getSwimmingRooms',
      payload:{
        "date":moment(value).format("YYYY-MM-DD")
      }
    })
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


  initBox=(indexData)=>{
    const _this = this;
    const boxArr = indexData?
      indexData.map(function (item,index) {

        const dateArr = item.dates?item.dates.map(function (index,dataValue) {
          return <p>{dataValue}</p>;
        }):null;

        return (
          <Col span={6}>
            <Row>
              <Col span={8}>
                <div className="ItemLeft">
                  <Link  to={`/service/order-swimming/detail?appointmentId=${item.appointmentId}&date=${moment().format('YYYY-MM-DD')}&type=1`}>
                    <p>
                      <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                    </p>
                    <p>{item.describe}</p>
                  </Link>
                  <Select className="swimming-select" defaultValue={item.state+''} placeholder="请选择" onChange={_this.handleChangeState.bind(_this,item.appointmentId)}>
                    <Option value={'1'}>开工</Option>
                    <Option value={'0'}>离开</Option>
                  </Select>
                </div>
              </Col>
              <Col span={14}>
                <div className="ItemRight">
                  {dateArr}
                </div>
              </Col>
            </Row>
          </Col>
        );

      }):null;

    return boxArr;


  }

  render(){
    const {indexData,systemTime} = this.props;
    let systemTimes = moment(systemTime).format("YYYY-MM-DD");

    return (
      <Card className="order-swimming">
        <Row>
          <Col span={24} className="date-title">
          <div><DatePicker
            defaultValue={moment(systemTimes,"YYYY-MM-DD")}
            onChange={this.handleDate.bind(this)}/></div>
          </Col>
        </Row>
        <Row>
          {this.initBox(indexData)}
        </Row>
      </Card>
    );
  }

}
function mapStateToProps(state) {
  return{
    ...state.swimming,
    loading:state.loading,
  };
}
export default connect(mapStateToProps)(SwimmingIndex);
