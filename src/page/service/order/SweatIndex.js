/**
 * Created by Flyforwards on 2017/9/8.
 */
import React, { Component } from 'react';
import {Card,Row,Col,Select,DatePicker} from 'antd';
import { connect } from 'dva';
import { Link } from 'react-router';
import SwimmingIndexCss from  './SwimmingIndex.scss';
const Option = Select.Option;

class SweatIndex extends Component{

  constructor(props){
    super(props);
  }

  initBox(list){
    console.log(list)
    let arrList = [];
    list ? list.map(function(elem,index){
      arrList.push(<Col span={6}>
        <Row>
          <Col span={8}>
            <div className="ItemLeft">
              <Link to={`/service/order-sweat/detail?id=${elem.id}`}>
                <p>
                  <img className="swimming-icon" src={elem.img} alt="" />
                </p>
                <p>{elem.name}</p>
              </Link>
              <Select className="swimming-select" defaultValue={elem.operatetion} placeholder="请选择">
                <Option value="1">开工</Option>
                <Option value="0">离开</Option>
              </Select>
            </div>
          </Col>
          <Col span={14}>
            <div className="ItemRight">
              {elem.time.map(function(v,i){
                return <p>{v}</p>
             })}
            </div>
          </Col>
        </Row>
      </Col>)
    }):'';

    return arrList;
  }


  render(){
    const arr = [
      {
        img:'http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D',
        name:'小李',
        operatetion:'0',
        time:["9:00-10:00","10:00-12:00","13:00-15:00"],
        id:1
      },
      {
        img:'http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D',
        name:'小红',
        operatetion:'1',
        time:["8:00-9:00","10:00-12:00","13:00-15:00"],
        id:2,
      },
      {
        img:'http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D',
        name:'小酒',
        operatetion:'1',
        time:["8:00-9:00","10:00-12:00","13:00-15:00"],
        id:3
      },
    ];
    return (
      <Card className="order-swimming">
        <Row>
          <Col span={24} className="date-title">
            <div><DatePicker/></div>
          </Col>
        </Row>
        <Row>
          {this.initBox(arr)}
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
export default connect(mapStateToProps)(SweatIndex);
