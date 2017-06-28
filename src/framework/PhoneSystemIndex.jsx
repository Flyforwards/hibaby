


import React from 'react'
import { Card, Button, Table, Input, Col, Row, Form, Select } from 'antd'

import { connect } from 'dva';
import './PhoneSystemIndex.scss'
import { message } from 'antd'
import moment from 'moment';
import { AREA_CODES } from 'common/constants.js'

const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option;
const InputGroup = Input.Group;

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
      status: 0, // 0:空闲， 1:响铃 2: 接通 3:整理
      info: {},
      nodeId: [], // 显示的按钮
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
    const { getFieldDecorator } = props.form;
    this.nodes = [
      <Button key="pause" className='system-button2' onClick={ this.actionType.bind(this,1) }>置忙</Button>, // 1
      <Button key="online" className='system-button2' onClick={ this.actionType.bind(this,2) }>置闲</Button>, // 2
      <Button key="answer" className='system-button2' onClick={ this.actionType.bind(this,3) }>接听</Button>, // 3
      <Button key="unLink" className='system-button2' onClick={ this.actionType.bind(this,4) }>挂断</Button>, // 4
      <Button key="refused"  className='system-button2' onClick={ this.actionType.bind(this,5) }>拒接</Button>, // 5
      <Button key="hold" className='system-button2' onClick={ this.actionType.bind(this,6) }>保持</Button>, // 6
      <Button key="unHold"  className="system-button3" onClick={ this.actionType.bind(this,7) }>保持接回</Button>, // 7
      <Button key="consult" className='system-button2' >咨询</Button>, // 8
      <Button key="consultBack"  className="system-button3" onClick={ this.actionType.bind(this,9) }>咨询接回</Button>, // 9
      <Button key="consultTransfer"  className="system-button3" onClick={ this.actionType.bind(this,10) }>咨询转接</Button>, // 10
      <Button key="consultThreeway"  className="system-button3" onClick={ this.actionType.bind(this,11) }>咨询三方</Button>, // 11
      <Button key="transfer"  className='system-button2'>转移</Button>, // 12
      <InputGroup className="phone-button-input" key="phoneCallText" compact>
        {getFieldDecorator('type',{
          rules: [{ required: true, }], initialValue: "0"
        })(
        <Select style={{ width: '78px', }} key="consultInput">
          <Option key='0' value="0">普通电话</Option>
          <Option key='1' value="1">座席号</Option>
        </Select>)}
        {getFieldDecorator('number',{
          rules: [{ required: true, max: 12}]
        })(
        <Input style={{ width: '90px',height: '33px' }} />)}
      </InputGroup>, //13
      <Button key="phoneCallout"  className="system-button3">呼叫</Button>, // 14
      <Button key="phoneCallCancel" className="system-button3" onClick={ this.actionType.bind(this,15) }>呼叫取消</Button>, // 15
      ];
  }

  actionType(type) {
    switch(type) {
      case 1 :
        window.executeAction('doPause', { description: "置忙"})
        break;
      case 2 :
        window.executeAction('doUnpause')
        break;
      case 3 :
        window.executeAction('doLink')
        break;
      case 4 :
        window.executeAction('doUnLink')
        break;
      case 5 :
        window.executeAction('doRefuse')
        break;
      case 6 :
        window.executeAction('doHold')
        break;
      case 7 :
        window.executeAction('doUnhold')
        break;
      case 8 :

        break;
      case 9 :
        window.executeAction('doUnconsult')
        break;
      case 10 :
        window.executeAction('doConsultTransfer');
        break;
      case 11 :
        window.executeAction('doConsultThreeway');
        break;
      case 12 :

        break;
      case 14 :

        break;
      case 15 :
        window.executeAction('doPreviewOutcallCancel')
        break;
    }
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
      switch(token.eventName){
        case 'outRinging' : //外呼座席响铃
          if(token.name == "ringing"){
            this.setState({
              nodeId: [15]
            })
            //第三方代码
            top.CTI_ID = token.uniqueId;//获取录音编号
          }
          break;
        case 'comeRinging' : //呼入座席响铃
          if(token.name == "ringing"){
            if(userBasic.getBindType() == '3') {
              this.setState({
                nodeId: [3,5]
              })
            } else {
              this.setState({
                nodeId: [3]
              })
            }
          }
          break;
        case 'normalBusy' : //呼入座席接听
          this.setState({
            nodeId: [4, 6, 8, 12, 13]
          })
          //typeButton.consultThreeway();
          //typeButton.consultTransfer();
          break;
        case 'outBusy' : //外呼客户接听 客户和座席通话
          this.setState({
            nodeId: [4, 6, 8, 12, 13]
          })
          //typeButton.consultThreeway();
          //typeButton.consultTransfer();
          break;
        case 'online' : //置闲
          this.setState({
            nodeId: [1, 13, 14,]
          })
          //$("#phoneCallCancel").hide();
          break;
        case 'pause' : //置忙
          this.setState({
            nodeId: [2, 13, 14,]
          })
          //$("#phoneCallCancel").hide();
          break;
        case 'waitLink' : //外呼座席接听等待客户接听

          break;
        case 'neatenStart' : //整理开始（座席挂断）
          this.setState({
            nodeId: [1, 2]
          })
          break;
        case 'neatenEnd' : //整理结束
          var s = deviceStatus.deviceStatusLoginStatus(token.deviceStatus+token.loginStatus, token.pauseDescription, token.busyDescription);
          if(s == '空闲'){
            this.setState({
              nodeId: [1, 13, 14]
            })
          }else{
            this.setState({
              nodeId: [2, 13, 14]
            })
          }
          break;
        case 'hold' : //保持开始
          this.setState({
            nodeId: [4, 7]
          })
          break;
        case 'unHold' : //保持结束
          this.setState({
            nodeId: [4, 6, 8]
          })
          //typeButton.consultThreeway();
          //typeButton.consultTransfer();
          //typeButton.transfer();
          break;
        case 'onlineUnlink' : //挂断后置闲
          this.setState({
            nodeId: [1, 13, 14]
          })
          break;
        case 'pauseUnlink' : //挂断后置忙
          this.setState({
            nodeId: [2, 13, 14]
          })
          break;
        case 'consultLink' : //咨询成功
          this.setState({
            nodeId: [9, 10, 11, 12]
          })
          break;
        case 'consulterOrTransferBusy' : //被咨询转接或转移的通话
          this.setState({
            nodeId: [4, 6]
          })
          break;
      }

      var str = deviceStatus.deviceStatusLoginStatus(token.deviceStatus+token.loginStatus, token.pauseDescription, token.busyDescription);
      if(str != ""){
        this.setState({
          loginStatus: str
        })
      }

      if(token.eventName=="outRinging"){//外呼座席响铃
        //top.CTI_ID = token.uniqueId;//获取录音编号
        this.setState({
          info: {
            title: '外呼号码',
            number: token.customerNumber
          }
        })
      }else if(token.eventName=="comeRinging"){//呼入座席响铃
        this.getCustomerInfo(token.customerNumber);
        this.toLarge();
        this.setState({
          info: {
            title: '来电号码',
            number: token.customerNumber,
            customerAreaCode: token.customerAreaCode
          },
          status: 1,
        })
      } else if(token.eventName=="normalBusy"){//呼入座席接听
        this.setState({
          info: {
            title: '来电号码',
            number: token.customerNumber,
            customerAreaCode: token.customerAreaCode
          },
          status: 2,
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
          info: {
            title: '外呼号码',
            number: token.customerNumber,
          },
        })
      } else if(token.eventName=="online"){//置闲
        this.setState({
          info: {},
          call_time: 0,
          status: 0
        })
        // 清除定时器， 隐藏输入框，用户信息，通话记录
        clearInterval(this.callTimer)
      }else if(token.eventName=="pause"){//置忙

      }else if(token.eventName=="waitLink"){//座席接听 等待客户接听

      }else if(token.eventName=="neatenStart"){//整理开始（座席挂断）
        this.setState({
          call_time: 0,
          status: 3,
          info: {},
        })
        // 清除定时器， 隐藏输入框，用户信息，通话记录
        clearInterval(this.callTimer)
      }else if(token.eventName=="neatenEnd"){//整理结束
        this.setState({
          info: {},
          status: 0
        })
      }else if(token.eventName=="hold"){//保持开始

      }else if(token.eventName=="unHold"){//保持结束

      }else if(token.eventName=="consultLink"){//咨询成功
        this.setState({
          info: {
            title: '咨询号码: ' + '席位号:',
            number: token.consultObject
          },
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
    const { style,  } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    if (style == 'large') {
      const { loginTime, dataSource, info, status, loginStatus, call_time, nodeId } = this.state
      const { callRecords, customerInfo } = this.props;

      let userName = '';
      if ( customerInfo == null) {
        userName = '未知用户';
      } else if ( customerInfo ) {
        userName = customerInfo.name;
      }

      const buttons = []
      if (nodeId) {
        nodeId.map(item=>{
          buttons.push(this.nodes[item-1])
        })
      }
      const callContent = (
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
        </div>)
      const customer = (
        <div>
          <div className="phone-system-phone-info">
            <Row style={{ marginTop:'4px' }}>
              <Col span="8">
                <Col span="6" style={{ lineHeight: '32px', textAlign: 'end' }}>{ info.title+':'} </Col>
                <Col span="18"><Input readOnly value={ info.number }/></Col>
              </Col>
              <Col span="8">
                <Row>
                <Col span="6" style={{ lineHeight: '32px', textAlign: 'end' }}>归属地:  </Col>
                <Col span="18"><Input readOnly value={ AREA_CODES[info.customerAreaCode] }/></Col>
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
            <Table bordered pagination={false} size='small' columns={this.cols} rowKey={ record=>record.id} dataSource={callRecords}/>
          </div>
          { status==2||status==3? callContent:null }
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
          { status== 0? null:customer }
          <div className="phone-system-action-button">
            { buttons }
          </div>
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





