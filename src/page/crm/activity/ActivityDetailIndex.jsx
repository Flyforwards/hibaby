
import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Input, DatePicker, InputNumber, Button, Form,Table, Select,Cascader, Row, Col, Modal } from 'antd'
import { Link } from 'react-router';
import { routerRedux } from 'dva/router';
import './activityIndex.scss'
import AlertModalFrom from 'common/AlertModalFrom'
import moment from 'moment'
import AppointmentModalFrom from './appointmentModalFrom'
import AppointmentMemberFrom from './appointmentMemberFrom'
import AppointmentNotMemberFrom from './appointmentNotMemberFrom'
import DictionarySelect from 'common/dictionary_select';
import { parse } from 'qs'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;
const confirm = Modal.confirm;
const { MonthPicker } = DatePicker;


@createForm()
class ActivityDetailIndex extends Component {
  constructor(props) {
    super(props)
    this.state={
      appointmentVisible: false,
      memberVisible: false,
      notMemberVisible: false,
      alertModalVisible: false
    }
    this.columns = [{
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name'
    },{
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: '预产期',
      dataIndex: 'dueDate',
      render: (record) => {
        if (record!=null) {
          return moment(record).format("YYYY-MM-DD")
        }
      }
    }, {
      title: '怀孕周期',
      dataIndex: 'gestationalWeeks',
      key: 'gestationalWeeks'

    }, {
      title: '第几胎',
      dataIndex: 'fetus',
      key: 'fetus'
    },{
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact'
    },{
      title: '购买套餐',
      dataIndex: 'purchasePackage',
      key: 'purchasePackage'
    },{
      title: '合同编号',
      dataIndex: 'contractNumber',
      key: 'contractNumber'
    },{
      title: '添加人',
      dataIndex: 'operator2',
      key: 'operator2'
    },{
      title: '客户状态',
      dataIndex: 'customerStatus',
      key: 'customerStatus'
    },{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        if (this.props.item) {
          const timestamp = new Date().getTime();
          // 活动未开始无法签到
          if (this.props.item.activityTime > this.props.systemTime) {
            return (
              <div key = { index }>
                <span> 活动未开始 </span>
              </div>
            )
          } else {
            if (record.signed) {
              return (
                <div key = { index }>
                  <span> 已签到 </span>
                </div>
              )
            } else {
              return (
                <div key = { index }>
                  <Link onClick={ this.sign.bind(this,record)} > 签到 </Link>
                </div>
              )
            }
          }
        }


      },
    }];
  }

  sign(record) {
    const dispatch = this.props.dispatch;
    confirm({
      title: '提示',
      content: '是否确认此用户签到?',
      onOk() {
        dispatch({
          type: 'activity/signedActivityCustomer',
          payload: {
            dataId: record.id,
          }
        })
      },
      onCancel() {
      },
    });
  }


  back() {
    this.props.dispatch(
      routerRedux.push('/crm/activity')
    )
  }
  // 编辑
  edit() {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/crm/activity/edit',
        query: { dataId: this.props.item.id }
      })
    )
  }



  //删除
  deleteActivity() {
    this.setState({
      alertModalVisible: true,
    })
  }

  // 取消弹框
  onCancel() {
    this.setState({
      appointmentVisible: false,
      memberVisible: false,
      notMemberVisible: false,
      alertModalVisible: false
    })
  }
  // 确定删除
  onOk(record) {
    this.props.dispatch({
      type: 'activity/deleteActivity',
      payload: { dataId: record.id }
    })
    this.onCancel();
  }
  // 预约
  appointment() {
    this.setState({
      appointmentVisible: true,
    })
  }


  onChoose(on) {
    if(on){
      this.setState({
        appointmentVisible: false,
        memberVisible: true,
      })
      this.props.dispatch({
        type: 'activity/getNoAppointmentCustomerPageList',
        payload: { 'activityId': this.props.item.id }
      })
    } else {
      this.setState({
        notMemberVisible: true,
        appointmentVisible: false,
      })
    }
  }

  onSearch(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.activityId = this.props.item.id;

        if (values.time != undefined) {
          values.year = values.time.get('year');
          values.month = values.time.get('month')+1;
        }
      //  console.log(values);

        this.props.dispatch({
          type: "activity/getActivityCustomerPageList",
          payload: values
        })
      }
    })
  }

  reset() {
    const { pathname } = location;
    const query = parse(location.search.substr(1))
    this.props.dispatch(routerRedux.push({
      pathname,
      query
    }))
    this.props.form.resetFields()
  }


  render() {

    const { form, item, signUserList,loading, signPagination, dispatch, shipCards, systemTime } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const formTimeLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
    }
    const formItemsLayout = {
      labelCol:{ span: 7 },
      wrapperCol:{ span:15 }
    }
    const formChooseLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span: 12 }
    }
    const formChooseOneLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span: 10 }
    }


    let itemName = "";
    let address = "";
    let content = "";
    let activityTime = moment().format("YYYY-MM-DD HH:mm")
    let appointments = 0;
    let signeds = 0;
    let orders = 0;
    const edit = !this.props.permissionAlias.contains('ACTIVITY_EDIT');
    const appoint = !this.props.permissionAlias.contains('ACTIVITY_APPOINT');
    const del = !this.props.permissionAlias.contains('ACTIVITY_DELETE');


    const edit_btn = (<Button key="1" disabled={edit} className="button-group-bottom-4" onClick={ this.edit.bind(this) }>编辑</Button>);
    const del_btn = (<Button key="2" disabled={del} className="button-group-bottom-3" onClick={ this.deleteActivity.bind(this) }>删除</Button>);
    const app_btn = (<Button key="3" disabled={appoint} className="button-group-bottom-2" onClick={ this.appointment.bind(this) } >预约</Button>);
    const back_btn = (<Button key="4" className="button-group-bottom-1" onClick={this.back.bind(this)}>返回</Button>);


    let buttons = (
      <div className="button-group-bottom-common">
        {
          [back_btn,app_btn,edit_btn]
        }
      </div>)
    if (item != null) {
      itemName = item.name;
      activityTime = moment(item.activityTime).format("YYYY-MM-DD HH:mm");
      address = item.address;
      content = item.content;
      appointments = item.appointments;
      signeds = item.signeds;
      orders = item.orders;
      // 与当前时间比对，后面会与服务器时间对比, 活动已经开始，和已经有预约的情况无法删除活动
      if (item.activityTime < systemTime ) {
        buttons = (
          <div className="button-group-bottom-common">
            { [back_btn,app_btn] }
          </div>)
      } else {
        if ( item.appointments > 0 ) {
          buttons = (
            <div className="button-group-bottom-common">
            { [back_btn,app_btn,edit_btn] }
          </div>)
        } else {
          buttons = (
            <div className="button-group-bottom-common">
            { [back_btn,app_btn,del_btn,edit_btn,] }
          </div>)
        }
      }

    }
    const tableProps = {
      loading: loading.effects['activity/getActivityCustomerPageList'],
      dataSource : signUserList ,
      pagination: signPagination,
      onChange (page) {
        form.validateFields((err, values) => {
          let query = {
            activityId: item.id,
            page: page.current,
            size: page.pageSize,
          }
          if (!err) {
            if (values.time != undefined) {
              values.year = values.time.get('year');
              values.month = values.time.get('month')+1;
            }
            query = {...query,...values}
          }
          dispatch({
            type: "activity/getActivityCustomerPageList",
            payload: query
          })
        })
      },
    }

    const options = shipCards.map((record)=>{
      return (<Option key={record.id} value={record.id}>{record.name}</Option>)
    });


    return (
        <div className="activity-cent">
          <Card>
            <div className="card-title">
              <h3>活动信息:</h3>
            </div>
            <Form >
              <FormItem  {...formItemLayout} label="活动名称" >
                <Input readOnly value={ itemName }/>
              </FormItem>
              <FormItem {...formTimeLayout} label="活动时间" >
                <Input readOnly value={ activityTime }/>
              </FormItem>
              <FormItem {...formItemLayout} label= "活动地点">
                <Input   readOnly value={ address }/>
              </FormItem>
              <FormItem {...formItemLayout} label={"活动内容"}>
                <Input  type="textarea" rows={6} readOnly value={ content }/>
              </FormItem>
            </Form>
          </Card>
          <Card style={{ marginTop: '10px'}}>
            <div className="card-title">
              <h3>预约客户:</h3>
            </div>
            <Row>
              <Col span={ 6 }></Col>
              <Col span={6} >
                <FormItem {...formItemsLayout} style={{ width:'249px'}} label= "预约人数">
                  <Input value={ appointments }  addonAfter="人" readOnly/>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemsLayout} style={{ width:'249px'}} label= "签到人数">
                  <Input value={ signeds } addonAfter="人" readOnly/>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemsLayout} style={{ width:'249px'}} label= "成单率">
                  <Input value={ orders } addonAfter="%" readOnly/>
                </FormItem>
              </Col>
            </Row>
            <Form>
              <div style={{ position: 'relative'}}>
                <FormItem {...formChooseLayout}>
                  {getFieldDecorator('sear', {rules: [{ required: false }],
                  })(
                    <Input placeholder="输入客户编号、客户姓名、联系方式、合同编号"/>
                  )}
                </FormItem>
                <div className="activity-operation">
                  <Button className='button-group-2' onClick={ this.onSearch.bind(this)}>查询</Button>
                  <Button className='button-group-1' onClick={ this.reset.bind(this)}>重置</Button>
                </div>
              </div>
              <Row className="titleInfo">
                <Col span={4} style={{width:'140px'}}>
                    <FormItem {...formChooseOneLayout}  label="年龄" >
                      {getFieldDecorator('age1', {rules: [{ required: false }],
                      })(
                        <InputNumber style={{width: "80px"}} min={1} max={100}  />
                      )}
                    </FormItem>
                </Col>
                <Col span={3}  style={{width:'90px'}}>
                    <FormItem {...formChooseLayout} style={{width:'100%'}}>
                      {getFieldDecorator('age2', {rules: [{ required: false }],
                      })(
                        <InputNumber min={1} max={100} style={{width: "80px"}} />
                      )}
                    </FormItem>

                </Col>
                <Col className="PreData" span={4} style={{width:'170px'}}>
                  <FormItem {...formChooseOneLayout}  label="预产期" >
                    {getFieldDecorator('time', {rules: [{ required: false }],
                    })(
                      <MonthPicker
                        placeholder="请选择"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col className="TireNum" span={4} style={{width:'180px'}}>
                  <FormItem  {...formChooseOneLayout} label="第几胎" >
                    {getFieldDecorator('fetus', {rules: [{ required: false }],
                    })(
                      <DictionarySelect  placeholder="请选择" selectName="FETUS" />
                    )}
                  </FormItem>
                </Col>
                <Col className="idCard" span={4} style={{width:'190px'}} >
                  <FormItem  {...formChooseOneLayout} label="会员身份" >
                    {getFieldDecorator('member', {rules: [{ required: false }],
                    })(
                      <Select   placeholder="请选择" >
                      {
                        options
                      }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col className="Operator" span={4} style={{width:'180px'}}>
                  <FormItem  {...formChooseOneLayout} label="操作者2" >
                    {getFieldDecorator('operator2', {rules: [{ required: false }],
                    })(
                      <Input max={40}  />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Table {...tableProps} bordered size="small" rowKey = { record=>record.id } columns={ this.columns }/>
          </Card>
            {
              buttons
            }
          <AppointmentModalFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.appointmentVisible } selectRecord={ item } onChoose={ this.onChoose.bind(this)}/>
          <AppointmentMemberFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.memberVisible } selectRecord={ item } from={ false}/>
          <AppointmentNotMemberFrom onCancel={ this.onCancel.bind(this) }  visible={ this.state.notMemberVisible } selectRecord={ item }  from={ false}/>
          <AlertModalFrom  onCancel={ this.onCancel.bind(this) } modalTitle="是否确定删除此活动"  visible={ this.state.alertModalVisible } onOk={ this.onOk.bind(this, item) }/>
        </div>
    )
  }
}



function mapStateToProps(state) {
  const {
    item,
    signUserList,
    signPagination,
    shipCards
  } = state.activity;
  const {
    systemTime,
    permissionAlias
  } = state.layout;
  return {
    loading: state.loading,
    systemTime,
    shipCards,
    item,
    signUserList,
    signPagination,
    permissionAlias
  };
}


export default connect(mapStateToProps)(ActivityDetailIndex)
