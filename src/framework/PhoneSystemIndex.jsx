


import React from 'react'
import { Card, Button, Table, Input, Col, Row, Form } from 'antd'

import { connect } from 'dva';
import './PhoneSystemIndex.scss'
import { message } from 'antd'
import moment from 'moment';



var setIntlId= new Array();

const createForm = Form.create
const FormItem = Form.Item

@createForm()
class PhoneSystemIndex extends React.Component {
  constructor(props) {
    super(props)
    this.bigExtra=(
      <div>
        <Button onClick={ this.toHidden.bind(this) } className='system-button-option'>隐藏</Button>
        <Button onClick={ this.toMin.bind(this) } className='system-button-option'>最小化</Button>
      </div>)
    this.minExtra=(
      <div>
        <Button onClick={ this.toHidden.bind(this) } className='system-button-option'>隐藏</Button>
        <Button onClick={ this.toLarge.bind(this) } className='system-button-option'>最大化</Button>
      </div>)
    this.state = {
      style: 'hidden',
      loginTime: 0,
      dataSource: [],
    }
    this.cols = [{
      dataIndex: 'createTime',
      key: 'createTime',
      render: (record) => {
        if (record!=null) {
          return moment(record).format("YYYY-MM-DD HH:mm:ss")
        }
      }
    },{
      dataIndex: 'content',
      key: 'content',
    }]

    this.columns = [{
      title: '主叫号码',
      dataIndex: 'customerNumber',
      key: 'customerNumber',
    },{
      title: '来电时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },{
      title: '进入队列时间',
      dataIndex: 'joinTime',
      key: 'joinTime',
    },{
      title: '排队等待时长',
      dataIndex: 'waitTime',
      key: 'waitTime',
    },{
      title: '呼叫状态',
      dataIndex: 'call_status',
      key: 'call_status',
    },{
      title: '溢出次数',
      dataIndex: 'overflow',
      key: 'overflow',
    },{
      title: '排队位置',
      dataIndex: 'position',
      key: 'position',
    },]
    this.getCustomerInfo('13269778099')
  }

  toMin() {
    this.setState({
      style: 'min'
    })
  }

  toHidden() {
    this.setState({
      style: 'hidden'
    })
  }

  toLarge() {
    this.setState({
      style: 'large'
    })
  }

  onClick(){

    // this.props.dispatch({
    //   type:'layout/xxxx'
    // })
    console.log(window.callback)

    if (window.callback.type == 'login') {
      message.success('登录成功');
    } else if (window.callback.type == 'queueStatus') {
      var data = window.callback.data;
      for(var i=0;i<setIntlId.length;i++){
        clearInterval(setIntlId[i]);
      }
      setIntlId.length=0;
      $("#callTable").empty();
      var showData="";
      if(showData == ""){
        showData = data.queueStatus[0];
      }

      var online=0;

      for(var i=0;i<showData.memberStatus.length; i++){

        var ms = showData.memberStatus[i];
        var status = window.deviceStatus.deviceStatusLoginStatus(ms.deviceStatus+ms.loginStatus, ms.pauseDescription, ms.busyDescription);

        if(status != "离线"){
          online+=1;
        }
        var customerNumber =showData.memberStatus[i].customerNumber;
        var callstaken = showData.memberStatus[i].callstaken;
        var loginTime = showData.memberStatus[i].loginTime;
        var cno = showData.memberStatus[i].cid.substring(7,showData.memberStatus[i].cid.length);

        if(callstaken == undefined){
          callstaken = "--";
        }
        if(loginTime == undefined ){
          loginTime = 0;
        } else{
          loginTime = millisecondToDate(parseInt(loginTime,10));
        }

        if(customerNumber == undefined){
          customerNumber = "--";
        }
        showData.queueEntry.map((item)=>{
          item.key = item.uniqueId.replace(".",'');
        })
        this.setState({
          dataSource: showData.queueEntry
        })
        if(status != '离线' && 2000 == cno) {
          this.time = setInterval(
            () => {
              loginTime++;
              this.setState({
                loginTime
              })
            },
            1000
          );
        }
      }

      $("#onlineCno").text(online);
    } else if (window.callback.type == 'queue'){
      const json = window.callback.json;
      const dataSource = this.state.dataSource;
      if(json.name == 'joinQueue'){
        json.key = json.uniqueId.replace(".",'');
        if (json.overflow == null) {
          json.overflow = '0'
        }
        dataSource.push(json);
        this.setState({
          dataSource
        })

      }
      if(json.name == 'leaveQueue'){
        var uniqueId = json.uniqueId.replace(".",'');
        this.setState({
          dataSource: dataSource.filter(item => item.key !== uniqueId)
        })
      }
      if(json.name == 'queueCall'){

      }
    } else if (window.callback.type == 'status') {
      const token = window.callback.token;
      var str = deviceStatus.deviceStatusLoginStatus(token.deviceStatus+token.loginStatus, token.pauseDescription, token.busyDescription);
      if(str != ""){
        $("#status").text(str);
      }

      if(token.eventName=="outRinging"){//外呼座席响铃
        //top.CTI_ID = token.uniqueId;//获取录音编号
        this.setState({
          info: '外呼号码: ' + token.customerNumber
        })
      }else if(token.eventName=="comeRinging"){//呼入座席响铃
        this.getCustomerInfo(token.customerNumber);
        this.setState({
          info: '外呼号码: ' + token.customerNumber
        })
      }else if(token.eventName=="normalBusy"){//呼入座席接听
        // $('#call_input').show();
        // $('#call_history').show();

        this.setState({
          info: '来电号码: ' + token.customerNumber
        })
         this.getCustomerInfo(token.customerNumber);

        // window.document.getElementById('call_time').innerHTML = millisecondToDate(0);
        // var setIntervaldurationId = setInterval("timerCount('call_time')", 1000);
        // setIntlId.push(setIntervaldurationId);
        // $("#call_time").attr("setIntervaldurationId",setIntervaldurationId);
      }else if(token.eventName=="outBusy"){//外呼客户接听
        //if(top.CTI_ID == "") {
        //	top.CTI_ID = token.uniqueId;
        //}

        this.setState({
          info: '外呼号码: ' + token.customerNumber
        })
      }else if(token.eventName=="online"){//置闲
        // $('#call_phone').text('');
        // $('#call_div').hide();
        // $('#call_input').hide();
        // $('#call_history').hide();
      }else if(token.eventName=="pause"){//置忙

      }else if(token.eventName=="waitLink"){//座席接听 等待客户接听

      }else if(token.eventName=="neatenStart"){//整理开始（座席挂断）
        // $('#call_phone').text('');
        // $('#call_div').hide();
        // $('#call_input').hide();
        // $('#call_history').hide();
        // clearInterval(document.getElementById('call_time').setIntervalCnoTimeId);
        // document.getElementById('call_time').innerHTML="";
      }else if(token.eventName=="neatenEnd"){//整理结束

      }else if(token.eventName=="hold"){//保持开始

      }else if(token.eventName=="unHold"){//保持结束

      }else if(token.eventName=="consultLink"){//咨询成功
        this.setState({
          info: '咨询号码: ' + '席位号:' + token.consultObject
        })
      }else if(token.eventName=="consulterOrTransferBusy"){//被咨询转接或转移的通话

      }
    }
  }

  getCustomerInfo(number){
    const { dispatch } = this.props;
    dispatch({
      type: 'layout/getCustomerByMobile',
      payload: { mobile: number }
    })
    // 查询来电备注记录
    dispatch({
      type: 'layout/getCallRecordsList',
      payload: { str: number }
    })

  }

  onSave() {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        values.number = '13269778099'
        dispatch({
          type: 'layout/saveCallRecords',
          payload: values
        })
      }
    })
  }

  toDub(n){
    return n<10?"0"+n:""+n;
  }

  render() {
    let bottom = null;
    const { style } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    if (style == 'large') {
      const { loginTime, dataSource, info } = this.state

      const { callRecords, customerInfo } = this.props;
      const time = loginTime
      const s=this.toDub(parseInt(time%60));
      const m=this.toDub(parseInt(time/60));
      const h=this.toDub(parseInt(m/60));

      let userName = '';
      if ( customerInfo == null) {
        userName = '未知用户';
      } else if ( customerInfo ) {
        userName = customerInfo.name;
      }

      const customer = (
        <div>
          <div className="phone-system-phone-info">
            <Row style={{ marginTop:'4px' }}>
              <Col span="8">
                <Col span="6" style={{ lineHeight: '32px', textAlign: 'end' }}>来电号码: </Col>
                <Col span="18"><Input readOnly value="13269778099"/></Col>

              </Col>
              <Col span="8">
                <Row>
                <Col span="6" style={{ lineHeight: '32px', textAlign: 'end' }}>归属地:  </Col>
                <Col span="18"><Input readOnly value="北京市"/></Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="phone-system-board">
            <div className="phone-system-board-title"><h4>客户信息</h4></div>
            <span>{ userName }</span>
          </div>
          <div className="phone-system-board">
            <div className="phone-system-board-title"><h4>来往通话内容</h4></div>
            <Table bordered pagination={false} size='small' columns={this.cols} rowKey='id' dataSource={callRecords}/>
          </div>
          <div className="phone-system-board">
            <div className="phone-system-board-title"><h4>本次通话内容</h4></div>
            <FormItem>
              {getFieldDecorator('content',{
              })(
                <Input type='textarea'/>
              )}
            </FormItem>

            <Button onClick={ this.onSave.bind(this) }>保存</Button>
          </div>
        </div>
      )
      bottom = (
        <Card className="phone-system-cent" title = '来电弹屏' extra={ this.bigExtra }>
          <div style={{ height: '40px' }}>
            <span style={{ 'marginLeft':'10px', 'lineHeight': '40px' }}>登录状态</span>
            <span style={{ 'marginLeft':'10px', 'lineHeight': '40px'}} id="status">离线</span>
            <span style={{ 'marginLeft':'20px', 'lineHeight': '40px' }}>登录时间</span>
            <span style={{ 'marginLeft':'10px', 'lineHeight': '40px' }} >{ h+':'+m+':'+s }</span>
          </div>
          <Table bordered pagination={false} columns={this.columns} rowKey='id' dataSource={dataSource} size='small'/>
          {customer}
        </Card>
      )
    } else if (style == 'min') {
      bottom = (
        <Card className="phone-system-min-cent" title = '来电弹屏' extra={ this.minExtra }>


        </Card>
      )
    } else if (style == 'hidden') {
      bottom =  (
        <Button className='system-button-option-show' onClick={ this.toLarge.bind(this) }> 显示 </Button>
      )
    }
    return (
      <div>
        <Button onClick={ this.onClick.bind(this)}  id="bridging-btn" style={{position: 'absolute', left: 0, top: 0,width:'40px',height:'30px', display: 'none'}} >桥接中介</Button>
        { bottom }
      </div>
    )



  }
}

function mapStateToProps(state) {
  const {
    customerInfo,
    callRecords
  } = state.layout;
  return {
    customerInfo,
    callRecords
  };
}


export default connect(mapStateToProps)(PhoneSystemIndex);





