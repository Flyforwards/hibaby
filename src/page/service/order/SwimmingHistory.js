/**
 * 游泳历史页
 * Created by yangjingjing on 2017/9/6.
 */
import React,{Component} from 'react';
import {connect} from 'dva';
import {Card,Row,Col,Tabs,Button,DatePicker,Select,Table} from 'antd';
import {Link} from 'react-router';
import SwimmingIndexCss from  './SwimmingIndex.scss';

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class SwimmingHistory extends Component{
  constructor(props){
    super(props);
    this.columns = [
      {
        title: '预约时间',
        dataIndex: 'orderTime',
        key: 'orderTime'
      },{
        title: '客户姓名',
        dataIndex: 'name',
        key: 'name'
      }
    ]

  }

  onChange=(date, dateString)=> {
    console.log(date, dateString);
  }

  handleBack=()=>{

  }


  initBox(){
    return (
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
                <div className="useRateDiv">
                  使用率：13%
                </div>
              </div>
            </Col>
            <Col span={20}>
              <Table columns={this.columns} />
            </Col>
          </Row>
        </div>
    );
  }
  render(){
    return (
      <Card className="HistoryCard">
        <Row className="date-title">
          <Col span={24} >
            <RangePicker onChange={this.onChange.bind(this)} />
          </Col>
        </Row>
        {this.initBox()}
        <div className="Detail-Bottom">
          <Button className="button-group-bottom-1" onClick={this.handleBack.bind(this)}>返回</Button>
        </div>
      </Card>
    );

  }

}
export default connect()(SwimmingHistory);
