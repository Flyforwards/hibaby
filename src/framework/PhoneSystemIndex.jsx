


import React from 'react'
import { Card, Button, Table, Input, Col, Row, Form } from 'antd'

import { connect } from 'dva';
import './PhoneSystemIndex.scss'
import { message } from 'antd'
import moment from 'moment';


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
      loginStatus: '离线',
      loginTime: 0,
      dataSource: [],
      call_time: 0,
    }
    this.cols = [{
      dataIndex: 'createTime',
      key: 'createTime',
      with: '20%',
      render: (record) => {
        if (record!=null) {
          return moment(record).format("YYYY-MM-DD HH:mm:ss")
        }
      }
    },{
      with: '80%',
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
      render: (record) => {
        if (record) {
          return this.transportTime(record);
        }
      }
    },{
      title: '呼叫状态',
      dataIndex: 'call_status',
      key: 'call_status',
      render: (record) => {
        if (record) {
          return '响铃'
        } else {
          return '排队'
        }
      }
    },{
      title: '溢出次数',
      dataIndex: 'overflow',
      key: 'overflow',
      render: (record) => {
        if (!record) {
          return '0'
        }
      }
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
    console.log(window.callback)

    if (window.callback.type == 'login') {
      message.success('登录成功');
    } else if (window.callback.type == 'queueStatus') {

      var data = window.callback.data;

      clearInterval(this.time);
      clearInterval(this.customerTimer)

      this.setState({
        dataSource: [],
      })
      var showData="";
      if(showData == ""){
        showData = data.queueStatus[0];
      }

      for(var i=0;i<showData.memberStatus.length; i++){

        var ms = showData.memberStatus[i];
        var status = window.deviceStatus.deviceStatusLoginStatus(ms.deviceStatus+ms.loginStatus, ms.pauseDescription, ms.busyDescription);

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
          loginTime = parseInt(loginTime,10);
        }

        if(customerNumber == undefined){
          customerNumber = "--";
        }
        showData.queueEntry.map((item)=>{
          item.key = item.uniqueId.replace(".",'');
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
      showData.queueEntry.map(item=>{
        const a = moment();
        const b = moment(item.startTime , "YYYY-MM-DD HH:mm:ss");
        item.waitTime = a.diff(b, 'seconds');;
      })
      this.setState({
        dataSource: showData.queueEntry
      })

      this.customerTimer = setInterval(
        () => {
          const { dataSource } = this.state
          dataSource.map((record)=> {
            record.waitTime ++;
          })
          this.setState({
            dataSource
          })
        },
        1000
      );

    } else if (window.callback.type == 'queue'){
      const json = window.callback.json;
      json.key = json.uniqueId.replace(".",'');
      const dataSource = this.state.dataSource;
      if(json.name == 'joinQueue'){
        const a = moment();
        const b = moment(json.startTime , "YYYY-MM-DD HH:mm:ss");
        json.waitTime = a.diff(b, 'seconds');
        if (json.overflow == null) {
          json.overflow = '0'
        }
        dataSource.push(json);
        this.setState({
          dataSource
        })

      }
      if(json.name == 'leaveQueue'){
        this.setState({
          dataSource: dataSource.filter(item => item.key !== json.key)
        })
      }
      if(json.name == 'queueCall'){
        const { dataSource } = shis.state;
        dataSource.map(item=>{
          if (item.key == json.key) {
            item.call_status = json.call_status;
          }
        })
        this.setState({
          dataSource
        })
      }
    } else if (window.callback.type == 'status') {
      const token = window.callback.token;

      var str = deviceStatus.deviceStatusLoginStatus(token.deviceStatus+token.loginStatus, token.pauseDescription, token.busyDescription);
      if(str != ""){
        this.setState({
          loginStatus: str
        })
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

        this.callTimer = setInterval(()=>{
          let { call_time } =  this.state;
          call_time ++;
          this.setState({
            call_time: call_time
          })
        }, 1000);

      }else if(token.eventName=="outBusy"){//外呼客户接听
        //if(top.CTI_ID == "") {
        //	top.CTI_ID = token.uniqueId;
        //}

        this.setState({
          info: '外呼号码: ' + token.customerNumber
        })
      }else if(token.eventName=="online"){//置闲
        this.setState({
          call_time: 0
        })
        // 清除定时器， 隐藏输入框，用户信息，通话记录
        clearInterval(this.callTimer)
      }else if(token.eventName=="pause"){//置忙

      }else if(token.eventName=="waitLink"){//座席接听 等待客户接听

      }else if(token.eventName=="neatenStart"){//整理开始（座席挂断）
        this.setState({
          call_time: 0
        })
        // 清除定时器， 隐藏输入框，用户信息，通话记录
        clearInterval(this.callTimer)
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

  transportTime(time){
    const s=this.toDub(parseInt(time%60));
    const m=this.toDub(parseInt(time/60));
    const h=this.toDub(parseInt(m/60));
    return h+':'+m+':'+s;
  }

  render() {
    let bottom = null;
    const { style } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    if (style == 'large') {
      const { loginTime, dataSource, info, loginStatus, call_time } = this.state
      const { callRecords, customerInfo } = this.props;

      let userName = '';
      if ( customerInfo == null) {
        userName = '未知用户';
      } else if ( customerInfo ) {
        userName = customerInfo.name;
      }
      console.log(call_time);
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
              <Col span="8">
                <Row>
                  <Col span="6" style={{ lineHeight: '32px', textAlign: 'end' }}>通话时长:  </Col>
                  <Col span="18"><Input readOnly value={ this.transportTime(call_time) }/></Col>
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
                rules: [{ required: true, message: '通话备注不能为空！限200字！', max: 200 }]
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
            <span style={{ 'marginLeft':'10px', 'lineHeight': '40px'}} id="status">{ loginStatus }</span>
            <span style={{ 'marginLeft':'20px', 'lineHeight': '40px' }}>登录时间</span>
            <span style={{ 'marginLeft':'10px', 'lineHeight': '40px' }} >{ this.transportTime(loginTime) }</span>
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
      bottom = (
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





