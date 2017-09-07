


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
      style: 'none',
      loginStatus: '离线',
      loginTime: 0,
      dataSource: [],
      call_time: 0,
      status: 0, // 0:空闲， 1:响铃 2: 接通 3:整理
      info: {},
      nodeId: [], // 显示的按钮
      memberStatus: [] // 席座 队列
    }
    this.cols = [{
      dataIndex: 'createTime',
      key: 'createTime',
      width: '20%',
      render: (record) => {
        if (record!=null) {
          return moment(record).format("YYYY-MM-DD HH:mm:ss")
        }
      }
    },{
      dataIndex: 'content',
      key: 'content',
      width: '80%',
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
    },];
    this.nodes = [
      <Button key="pause" className='system-button2' onClick={ this.actionType.bind(this,1) }>置忙</Button>, // 1
      <Button key="online" className='system-button2' onClick={ this.actionType.bind(this,2) }>置闲</Button>, // 2
      <Button key="answer" className='system-button2' onClick={ this.actionType.bind(this,3) }>接听</Button>, // 3
      <Button key="unLink" className='system-button2' onClick={ this.actionType.bind(this,4) }>挂断</Button>, // 4
      <Button key="refused"  className='system-button2' onClick={ this.actionType.bind(this,5) }>拒接</Button>, // 5
      <Button key="hold" className='system-button2' onClick={ this.actionType.bind(this,6) }>保持</Button>, // 6
      <Button key="unHold"  className="system-button3" onClick={ this.actionType.bind(this,7) }>保持接回</Button>, // 7
      <Button key="consult" className='system-button2' onClick={ this.actionType.bind(this,8) }>咨询</Button>, // 8
      <Button key="consultBack"  className="system-button3" onClick={ this.actionType.bind(this,9) }>咨询接回</Button>, // 9
      <Button key="consultTransfer"  className="system-button3" onClick={ this.actionType.bind(this,10) }>咨询转接</Button>, // 10
      <Button key="consultThreeway"  className="system-button3" onClick={ this.actionType.bind(this,11) }>咨询三方</Button>, // 11
      <Button key="transfer"  className='system-button2' onClick={ this.actionType.bind(this,12) }>转移</Button>, // 12
      <InputGroup className="phone-button-input" style={{ width: '170px' }} key="phoneText" compact>
        <Select disabled defaultValue='0' style={{ width: '78px' }} key="consultInput">
          <Option key='0' value="0">普通电话</Option>
        </Select>
        <Input ref="phone" style={{ width:'88px',height: '33px' }} />
      </InputGroup>, //13
      <Button key="phoneCallout"  className="system-button3" onClick={ this.actionType.bind(this,14) }>呼叫</Button>, // 14
      <Button key="phoneCallCancel" className="system-button3" onClick={ this.actionType.bind(this,15) }>呼叫取消</Button>, // 15
      ];
    // this.getCustomerInfo('15623578269');
  }
  // 切换呼叫类型
  onChange(value) {
    if (value  == '1') {
      // 获取队列数据
      window.executeAction('doQueueStatus');//获取队列数据
    }
  }



  actionType(id) {

    switch(id) {
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
      case 8 : {
          const { getFieldValue } = this.props.form
          const type = getFieldValue('type');
          const cno = getFieldValue('cno');
          if ( type == '0' ) {
            const number = this.refs.number.refs.input.value;
            if (!number || number.length==0 && number.length>12) {
              message.error('请输入正确号码！')
              return;
            }
            object.consultObject = number;
          } else {
            if (!cno) {
              message.error('请选择正确座席!');
              return;
            }
            object.consultObject = cno
          }
          window.executeAction('doConsult', object);
        }
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
      case 12 : {
          const { getFieldValue } = this.props.form
          const type = getFieldValue('type');
          const cno = getFieldValue('cno');
          let object = { objectType: type };
          if ( type == '0' ) {
            const number = this.refs.number.refs.input.value;
            if (!number || number.length==0 && number.length>12) {
              message.error('请输入正确号码！')
              return;
            }
            object.transferObject = number;
          } else {
            if (!cno) {
              message.error('请选择正确座席!');
              return;
            }
            object.transferObject = cno
          }
          window.executeAction('doTransfer', object);
        }

        break;
      case 14 :
        return
          const phone = this.refs.phone.refs.input.value;
          if (phone && phone.length>0 && phone.length<12) {
            const params = { callType: '3', tel: phone };
            window.executeAction('doPreviewOutCall', params);
          } else {
            message.error('请输入正确号码！')
          }
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

  toNone() {
    this.setState({
      style: 'none'
    })
  }

  toLarge() {
    this.setState({
      style: 'large'
    })
  }

  onClick(){
    console.log(window.callback)
    const { type } = window.callback;
    if (type == 'login') {
      message.success('400电话,登录成功');
      this.toLarge();
    } else if (type == 'loginFailed') {
      const { token } = window.callback;
      message.error("400电话 登录失败！" + token.msg);
    } else if (type == 'logout') {
      message.success('400电话,退出成功');
      this.toNone();
      this.setState({
        nodeId: []
      })
      clearInterval(this.time);
      clearInterval(this.customerTimer)
    } else if (type == 'queueStatus') {

      const data = window.callback.data;
      clearInterval(this.time);
      clearInterval(this.customerTimer)

      this.setState({
        dataSource: [],
      })
      var showData="";
      if(showData == ""){
        showData = data.queueStatus[0];
      }

      for(var i=0;i<showData.memberStatus.length; i++) {

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
        } else {
          loginTime = parseInt(loginTime,10);
        }

        if(customerNumber == undefined){
          customerNumber = "--";
        }
        showData.queueEntry.map((item)=>{
          item.key = item.uniqueId.replace(".",'');
        })
        if(window.threeInfo &&  status != '离线' && window.threeInfo.cno == cno) {
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

      this.setState({
        memberStatus: showData.memberStatus
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

    } else if (type == 'queue'){
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
    } else if (type == 'status') {
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
                nodeId: [5]
              })
            }
          }
          break;
        case 'normalBusy' : //呼入座席接听
          this.setState({
            nodeId: [4, 6, 8, 12, 16]
          })
          //typeButton.consultThreeway();
          //typeButton.consultTransfer();
          break;
        case 'outBusy' : //外呼客户接听 客户和座席通话
          this.setState({
            nodeId: [4, 6, 8, 12, 16]
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
          if(s == '空闲') {
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
        })
        // 清除定时器， 隐藏输入框，用户信息，通话记录
        clearInterval(this.callTimer)
      }else if(token.eventName=="neatenEnd"){//整理结束
        this.setState({
          call_time: 0,
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

      if(window.threeInfo && token.cno == window.threeInfo.cno){
        //callType：
        //1：呼入，2：网上400,3：点击外呼，4：预览外呼，5：IVR外呼，6：分机直接外呼
        if(token.eventName == "comeRinging"&&token.name == "ringing"){	//呼入响铃
          // alert("来电号码：" + token.customerNumber);
          //var call_id = token.uniqueId;		//获取录音编号
        }
        if(token.eventName == "normalBusy"&&token.name == "status"){ // 呼入接听
          // alert("来电号码：" + token.customerNumber + "已接听");
        }

        if(token.eventName == "consultLink"&&token.name == "consultLink"){	//咨询接听
          // alert("咨询号码" + token.consultObject + "已接听");
        }

        if(token.eventName == "normalBusy"&&token.name == "consultError"){	//咨询失败
          // alert("咨询失败");
        }
        if(token.eventName == "neatenStart"){	//客户挂断，整理开始：呼入、空闲时外呼
          // alert("已挂机，开始整理");
        }
        if(token.eventName == "neatenEnd"){	//客户挂断，整理结束：呼入、空闲时外呼
          // alert("整理结束");
        }
        if(token.eventName == "outRinging"&&token.name == "ringing"&&token.callType == "3"){	//外呼时座席响铃: 3、点击外呼
          // alert("外呼号码：" + token.customerNumber);
          //var call_id = token.uniqueId;		//获取录音编号
        }
        if(token.eventName == "waitLink"&&token.callType == "3"){	//座席接听后外呼客户:3、点击外呼
          // alert("座席接听，开始呼叫客户");
        }
        if(token.eventName == "outBusy"&&token.name == "previewOutcallBridge"&&token.callType == "3"){	//外呼客户:3、点击外呼
          // alert("外呼号码：" + token.customerNumber + "已接听");
        }
        if(token.eventName == "onlineUnlink"){	//空闲时外呼，客户无应答，座席挂机
          // alert("已挂机");
        }
        if(token.eventName == "pauseUnlink"){	// 置忙时外呼，客户挂断或无应答，座席挂机
          // alert("已挂机");
        }
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
      const { info } = this.state;
      if (!err) {
        if (info && info.number && info.number.length > 0) {
          dispatch({
            type: 'layout/saveCallRecords',
            payload: { number: info.number, content: values.content }
          })
          values.content = '';
        } else {
          alert('保存信息出错，拿不到电话数据');
        }
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
    const { style, info, status, call_time, loginStatus  } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    if (style == 'large') {
      const { loginTime, dataSource, nodeId, memberStatus } = this.state
      const { callRecords, customerInfo } = this.props;

      let input_bottom_16 = null;
      if  (this.state.type == '0') {
        input_bottom_16 = <Input ref="number" style={{ width: '113px',height: '33px' }} />
      } else {
        const options = memberStatus.map((record)=>{
          const number = record.cid.substring(7, record.cid.length)
          const name = record.cname
          // const type = '席位类型' + record.power == 1?'班长席':'普通座席';
          const status = window.deviceStatus.deviceStatusLoginStatus(record.deviceStatus+record.loginStatus, record.pauseDescription, record.busyDescription);
          let disabled = true;
          if ( status == '空闲') {
            disabled = false
          }
          return <Option value={ number } disabled={ disabled } key={ record.cid }>{ name + ' ' + status }</Option>;
        })
        input_bottom_16 = getFieldDecorator('cno')(<Select style={{ width: '113px' }}>{ options }</Select>)
      }
      const input_16 = <InputGroup className="phone-button-input" key="phoneCallText" style={{ width: '190px' }} compact>
          {getFieldDecorator('type', { initialValue: '0' })(
            <Select style={{width: '77px'} } onChange={ this.onChange.bind(this) }
                    key="consultInput">
              <Option key='0' value="0">普通电话</Option>
              <Option key='1' value="1">座席号</Option>
            </Select>
          )}
          { input_bottom_16 }
        </InputGroup> //16
      const buttons = []
      if (nodeId) {
        nodeId.map(item=>{
          if (item != 16) {
            buttons.push(this.nodes[item-1])
          } else {
            buttons.push(input_16)
          }
        })
      }
      const callContent =  status!=2&&status!=3 ? null:(
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

      let user = <div className="phone-button-user">新用户</div>;
      if ( customerInfo ) {
        user = <div className="phone-button-user">
          <Row>
            <Col span='8'>
              <Col className="phone-button-user-title" span='8'>客户姓名：</Col>
              <Col className="phone-button-user-content" span='16'>{ customerInfo.name }</Col>
            </Col>
            <Col span='8'>
              <Col className="phone-button-user-title" span='8'>年龄：</Col>
              <Col className="phone-button-user-content" span='16'>{ customerInfo.age }</Col>
            </Col>
            <Col span='8'>
              <Col className="phone-button-user-title" span='8'>预产期：</Col>
              <Col className="phone-button-user-content" span='16'>{ moment(customerInfo.dueDate).format("YYYY-MM-DD") }</Col>
            </Col>
          </Row>
          <Row>
            <Col span='8'>
              <Col className="phone-button-user-title" span='8'>怀孕周期：</Col>
              <Col className="phone-button-user-content" span='16'>{ customerInfo.gestationalWeeks }</Col>
            </Col>
            <Col span='8'>
              <Col className="phone-button-user-title" span='8'>购买套餐：</Col>
              <Col className="phone-button-user-content" span='16'>{ customerInfo.purchasePackage || '无'}</Col>
            </Col>
            <Col span='8'>
              <Col className="phone-button-user-title" span='8'>合同编号：</Col>
              <Col className="phone-button-user-content" span='16'>{ customerInfo.contractNumber || '无' }</Col>
            </Col>
          </Row>
        </div>;
      }
      const customer = status == 0 ? null: (
        <div>
          <div className="phone-system-phone-info">
            <Row style={{ marginTop:'4px' }}>
              <Col span="8">
                <Col span="6" style={{ lineHeight: '32px', textAlign: 'end' }}>{ info.title || '来电号码'+':'} </Col>
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
            <div className="phone-system-board-title">
              <h4>客户信息</h4>
            </div>
            { user }
          </div>
          <div className="phone-system-board">
            <div className="phone-system-board-title">
              <h4>来往通话内容</h4>
            </div>
            <div style = {{ maxHeight: '160px', overflowY: 'auto' }}>
              <Table bordered pagination={false} size='small' columns={this.cols} rowKey={ record=>record.id} dataSource={callRecords}/>
            </div>
          </div>
          { callContent }
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
          <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
            <Table bordered pagination={false} columns={this.columns} rowKey={ record=>record.uniqueId} dataSource={dataSource} size='small'/>
          </div>
          { customer }
          <div className="phone-system-action-button">
            { buttons }
          </div>
        </Card>
      )
    } else if (style == 'min') {
      const customer = status == 0 ?
        <div style={{ height: '40px' }}>
          <span style={{ 'marginLeft':'10px', fontSize: '14px', 'lineHeight': '40px' }}>登录状态</span>
          <span style={{ 'marginLeft':'10px', fontSize: '14px', 'lineHeight': '40px'}} id="status">{ loginStatus }</span>
        </div>:
        <div style={{ fontSize: '14px' }}>
          <div style={{ linHeight: '33px', borderBottom: '1px solid #e5e5e5'}}>
            <span>{ info.title || '来电号码'+': ' + info.number || ' ' }</span>
          </div>
          <div style={{ linHeight: '33px'}}>
            <span>{ '通话时长: ' + this.transportTime(call_time) }</span>
          </div>
        </div>
      bottom = (
        <Card className="phone-system-min-cent" title = '来电弹屏' extra={ this.minExtra }>
          { customer }
        </Card>
      )
    } else if (style == 'hidden') {
      bottom = (
        <Button className='system-button-option-show' onClick={ this.toLarge.bind(this) }> 显示 </Button>
      )
    } else if (style == 'none') {
      bottom = null;
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
    callRecords,
  } = state.layout;
  return {
    customerInfo,
    callRecords,
  };
}


export default connect(mapStateToProps)(PhoneSystemIndex);





