/**
 * Created by Flyforwards on 2017/9/12.
 */

import React,{Component} from 'react';
import {connect} from 'dva';
import {Card,Row,Col,Tabs,Button,DatePicker,Select,Table,message,Modal,Radio} from 'antd';
import {Link} from 'react-router';
import SwimmingIndexCss from  './SwimmingIndex.scss';
import './order.scss';
import { routerRedux } from 'dva/router'
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import moment from 'moment'
import { queryURL,format } from '../../../utils/index.js';

class SweatHistory extends Component{
  constructor(props){
    super(props);
    this.state={
      startDate:'',
      endDate:'',
      visible:false,
      idValue:0,
    };
    this.columns = [
      {
        title: '预约时间',
        dataIndex: 'time',
        key: 'time'
      },{
        title: '客户姓名',
        dataIndex: 'customerName',
        key: 'customerName'
      },{
        title: '客户房间号',
        dataIndex: 'customerRoom',
        key: 'customerRoom'
      }
    ]

  }

  //初始化modal内容
  initModalContent(data){
    let newList = [];
    data.map(function(elem,index){
      newList.push(
        <Col span={5} style={{margin:'5px'}}>
          <Radio value={elem.id}>{elem.describes}</Radio>
        </Col>
      )
    })
    return newList;
  }


  handleSearch=()=>{
    if(this.state.endDate){
      this.props.dispatch({
        type:'orderSweat/getSweatingHistory',
        payload:{
          "appointmentId":queryURL("appointmentId"),
          "page":1,
          "size":10,
          "sortField": "time",
          "sortOrder": "AESC",
          "startDate":moment(this.state.startDate).format("YYYY-MM-DD"),
          "endDate":moment(this.state.endDate).format("YYYY-MM-DD"),
        }
      });
      this.props.dispatch({
        type:'orderSweat/getSweatingUtilization',
        payload:{
          "appointmentId":queryURL("appointmentId"),
          "page":1,
          "size":10,
          "sortField": "time",
          "sortOrder": "AESC",
          "startDate":moment(this.state.startDate).format("YYYY-MM-DD"),
          "endDate":moment(this.state.endDate).format("YYYY-MM-DD"),
        }
      })
    }else{
      message.error("请选择日期")
      }

  }

  handleBack=()=>{
    this.props.dispatch(routerRedux.push(`/service/order-sweat`));
  }
//modal
  onChoiceRoom() {
    this.setState({
      visible:true,
    })
  }
  onCancelModal() {
    this.setState({
      visible:false,
    })
  }
  onOk(){
    if(this.state.idValue && this.state.idValue != 0) {
      this.setState({
        visible:false,
      })
      if(this.state.startDate && this.state.endDate){
        this.props.dispatch(routerRedux.push(`/service/order-sweat/history?appointmentId=${this.state.idValue}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`))
      }else{
        this.props.dispatch(routerRedux.push(`/service/order-sweat/history?appointmentId=${this.state.idValue}`))
      }
     // this.props.dispatch(routerRedux.push(`/service/order-sweat/history?appointmentId=${this.state.idValue}`))
    }else{
      message.error("请选择一个房间")
    }

  }
  //日期改变
  onDateChange(value,dateString) {
    this.setState({
      startDate:dateString[0],
      endDate:dateString[1],
    })
  }
 //radio 改变
  onRadioChange(e) {
    this.setState({
      idValue:e.target.value
    })
  }
  render(){
    const {pagination,historyList,loading,usePersent,roomsAllList,historyDate} =this.props;
    let homeId = queryURL("appointmentId");
    const tableProps = {
      loading:loading,
      pagination:pagination,
      dataSource:historyList,
      onChange: (page) => {
        dispatch({
          type: 'orderSweat/getSweatingHistory',
          payload: {
            'page': page.current,
            'size': page.pageSize,
            'sortField': "time",
            'sortOrder': "AESC",
            'startDate':this.state.startDate ? moment(this.state.startDate).format("YYYY-MM-DD"):moment(historyDate.startDate).format("YYYY-MM-DD"),
            'endDate':this.state.endDate ? moment(this.state.endDate).format("YYYY-MM-DD"):moment(historyDate.endDate).format("YYYY-MM-DD"),
          }
        })
      }
    };
    return (
      <Card className="HistoryCard">
        <Row className="date-title">
          <Col offset={4} span={10} >
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD"
              placeholder={['开始时间', '结束时间']}
              onChange={this.onDateChange.bind(this)}
              allowClear={false}
            />
          </Col>
          <Col span={2} >
            <Button className="button-group-2" onClick={this.handleSearch.bind(this)}>搜索</Button>
          </Col>
        </Row>
        <div>
          <Row className="DetailRow">
            <Col span={4} className="DetailLeft">
              <div className="ItemLeft">
                <p>
                  <img className="swimming-icon" src="http://test.file.hbbcare.com/image-60040ee0-fe12-40cb-b5dc-0fa08d57936d?Expires=1819960890&OSSAccessKeyId=LTAIhcIOePZxurct&Signature=Onu6PS0%2BMFx7cfMm3oF3%2FF0C8F8%3D" alt="" />
                </p>
                <p style={{margin:'10px auto'}}>
                  {roomsAllList && roomsAllList!=null ? roomsAllList.map(function(elem,index){
                      if(elem.id == homeId){
                        return elem.describes;
                      }else{
                        return ;
                      }
                  }):''}
                </p>
                <Button icon="menu-unfold" onClick={this.onChoiceRoom.bind(this)}>切换房间</Button>
                <div className="useRateDiv">
                  使用率：{usePersent}
                </div>
              </div>
            </Col>
            <Col span={20}>
              <Table className="TableCenter" bordered columns={this.columns} { ...tableProps }/>
            </Col>
          </Row>
        </div>
        <div className="Detail-Bottom">
          <Button className="button-group-bottom-1" onClick={this.handleBack.bind(this)}>返回</Button>
        </div>

        <Modal
          title="选择房间"
          wrapClassName="vertical-center-modal"
          visible={this.state.visible}
          onCancel={this.onCancelModal.bind(this)}
          cancelText="取消"
          width={600}
          onOk={this.onOk.bind(this)}
          className="modal_s"
          maskClosable={false}
        >
          <RadioGroup onChange={this.onRadioChange.bind(this)}>
          <Row style={{textAlign:'center'}}>
            {roomsAllList && roomsAllList !=null ? this.initModalContent(roomsAllList):''}
          </Row>
          </RadioGroup>
        </Modal>
      </Card>
    );

  }

}
function mapStateToProps(state) {
  const { historyList ,pagination,historyDate,usePersent,roomsAllList,systemTime} = state.orderSweat;
  return {
    historyDate,
    systemTime,
    roomsAllList,
    historyList,
    pagination,
    usePersent,
    loading:state.loading.models.orderSweat
  }
}
export default connect(mapStateToProps)(SweatHistory);
