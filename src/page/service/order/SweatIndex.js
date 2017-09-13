/**
 * Created by Flyforwards on 2017/9/8.
 */
import React, { Component } from 'react';
import {Card,Row,Col,Select,DatePicker} from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router';
import moment from  'moment';
import SwimmingIndexCss from  './SwimmingIndex.scss';
const Option = Select.Option;

class SweatIndex extends Component{

  constructor(props){
    super(props);
  }
  onChangeState(id,value){
    this.props.dispatch({
      type:'orderSweat/changeSweatingState',
      payload:{
        "appointmentId": id,
        "state": value
      }
    })
  }

  initBox(list){
    let arrList = [];
    let _this =this;
    list ? list.map(function(elem,index){
      arrList.push(<Col span={6} style={{marginBottom:'50px'}}>
        <Row>
          <Col span={8} style={{marginRight:'16px'}}>
            <div className="ItemLeft">
              <Link to={`/service/order-sweat/detail?date=${_this.props.currentDate}&appointmentId=${elem.appointmentId}`}>
                <p>
                  <img className="swimming-icon" src={elem.img} alt="" />
                </p>
                <p style={{margin:'10px auto'}}>{elem.describe}</p>
              </Link>
              <Select className="swimming-select" onChange={_this.onChangeState.bind(_this,elem.appointmentId)} defaultValue={elem.state+''} placeholder="请选择">
                <Option value="1">开工</Option>
                <Option value="0">离开</Option>
              </Select>
            </div>
          </Col>
          <Col span={14}>
            <div className="ItemRight">
              {elem.dates.map(function(v,i){
                return <p>{v}</p>
             })}
            </div>
          </Col>
        </Row>
      </Col>)
    }):'';

    return arrList;
  }
  onChange(value, dateString) {
    this.props.dispatch({
      type:'orderSweat/getSweatingRooms',
      payload:{
        "date":moment(dateString).format("YYYY-MM-DD")
      }
    })
  }

  render(){
    const { systemTime,roomsList,currentDate } = this.props;
    let systemTimes = moment(systemTime).format("YYYY-MM-DD");
    return (
      <Card className="order-swimming">
       <Row>
            <Col span={24} className="date-title">
              <div>
                <DatePicker
                defaultValue={moment(systemTimes,"YYYY-MM-DD")}
                onChange={this.onChange.bind(this)}
                />
              </div>
            </Col>
          </Row>
        <Row>
          {roomsList ? this.initBox(roomsList.list):''}
        </Row>
      </Card>
    );
  }

}
function mapStateToProps(state) {
  const { systemTime,roomsList,currentDate } = state.orderSweat;
  return{
    currentDate,
    systemTime,
    roomsList,
    loading:state.loading,
  };
}
export default connect(mapStateToProps)(SweatIndex);
