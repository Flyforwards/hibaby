
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
import util from 'common/util'
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
        return moment(record).format("YYYY-MM-DD")
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
      dataIndex: 'operator1',
      key: 'operator1'
    },{
      title: '客户状态',
      dataIndex: 'customerStatus',
      key: 'customerStatus'
    },{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
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
        console.log(values);

        this.props.dispatch({
          type: "activity/getActivityCustomerPageList",
          payload: values
        })
      }
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { item, signUserList,loading, signPagination, dispatch } = this.props;
    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];
    const formItemLayout = {
      labelCol:{ span: 2 },
      wrapperCol:{ span:22 }
    }

    const formChooseLayout = {
      labelCol:{ span: 10 },
      wrapperCol:{ span: 14 }
    }


    let itemName = "";
    let address = "";
    let content = "";
    let activityTime = moment("")
    let appointments = 0;
    let signeds = 0;
    let orders = 0;
    if (item != null) {
      itemName = item.name;
      activityTime = moment(item.activityTime);
      address = item.address;
      content = item.content;
      appointments = item.appointments;
      signeds = item.signeds;
      orders = item.orders;
    }
    const tableProps = {
      loading: loading.effects['activity/getActivityCustomerPageList'],
      dataSource : signUserList ,
      pagination: signPagination,
      onChange (page) {
        dispatch({
          type: 'activity/getActivityCustomerPageList',
          payload:{
            activityId: item.id,
            page: page.current,
            size: page.pageSize,
          }
        })
      },
    }

    return (
        <div className="activity-cent">
          <div className="add-activity">
          <Card>
            <div className="card-title">
              <h3>活动信息:</h3>
            </div>
            <Form >
              <FormItem  {...formItemLayout} label="活动名称" >
                <Input disabled={ true } value={ itemName }/>
              </FormItem>
              <FormItem {...formItemLayout} label="活动时间" >
                <DatePicker disabled={ true } showTime value= { activityTime } format="YYYY-MM-DD HH:mm:ss" />
              </FormItem>
              <FormItem {...formItemLayout} label= "活动地点">
                <Input  disabled={ true } value={ address }/>
              </FormItem>
              <FormItem {...formItemLayout} label={"活动内容"}>
                <Input  type="textarea" rows={6} disabled={ true } value={ content }/>
              </FormItem>
            </Form>
          </Card>
          </div>
          <div className="add-activity">
          <Card>
            <div className="card-title">
              <h3>预约客户:</h3>
            </div>
            <Row>
              <Col offset={ 6 } span={6}>预约人数{appointments}人 </Col>
              <Col span={6}>签到人数{signeds}人 </Col>
              <Col span={6}>成单率{orders}% </Col>
            </Row>
            <Form>
            <div>
              <Row>
                <Col span={20}>
                  <FormItem {...formChooseLayout}  label="客户名称" >
                    {getFieldDecorator('sear', {rules: [{ required: false }],
                    })(
                      <Input placeholder="输入客户编号、客户姓名、联系方式、合同编号"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={4}><span><Button onClick={ this.onSearch.bind(this)}>搜索</Button></span>
                </Col>
              </Row>
            </div>
              <Row>
                <Col span={8}>
                  <Row>
                  <Col span={14}>
                    <FormItem {...formChooseLayout}  label="年龄" >
                      {getFieldDecorator('age1', {rules: [{ required: false }],
                      })(
                        <InputNumber min={1} max={100}  />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={10}>
                    <FormItem {...formChooseLayout} >
                      {getFieldDecorator('age2', {rules: [{ required: false }],
                      })(
                        <InputNumber min={1} max={100} />
                      )}
                    </FormItem>
                  </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <FormItem {...formChooseLayout}  label="预产期" >
                    {getFieldDecorator('time', {rules: [{ required: false }],
                    })(
                      <MonthPicker
                        placeholder="请选择"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  {...formChooseLayout} label="生产医院" >
                    {getFieldDecorator('hospital', {rules: [{ required: false }],
                    })(
                      <Select >
                        <Option value="beijing">北京医院</Option>
                        <Option value="xiehe">协和医院</Option>
                        <Option value="renming">人民医院</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  {...formChooseLayout} label="会员身份" >
                    {getFieldDecorator('customer', {rules: [{ required: false }],
                    })(
                      <Select >
                        <Option value="v1">vip1</Option>
                        <Option value="v2">vip2</Option>
                        <Option value="v3">vip3</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  {...formChooseLayout} label="现住址" >
                    {getFieldDecorator('address', {rules: [{ required: false }],
                    })(
                      <Cascader options={ options }/>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Table {...tableProps} bordered size="small" rowKey = { record=>record.id } columns={ this.columns }/>
            <Row>
              <Col offset={8} span={4}><Button onClick={this.back.bind(this)}>返回</Button></Col>
              <Col span={4}><Button onClick={ this.appointment.bind(this) }  >预约</Button></Col>
              <Col span={4}><Button onClick={ this.deleteActivity.bind(this) }>删除</Button></Col>
              <Col span={4}><Button  onClick={ this.edit.bind(this) }>编辑</Button></Col>
            </Row>
          </Card>

          <AppointmentModalFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.appointmentVisible } selectRecord={ item } onChoose={ this.onChoose.bind(this)}/>
          <AppointmentMemberFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.memberVisible } selectRecord={ item } from={ false}/>
          <AppointmentNotMemberFrom onCancel={ this.onCancel.bind(this) }  visible={ this.state.notMemberVisible } selectRecord={ item }  from={ false}/>
          <AlertModalFrom  onCancel={ this.onCancel.bind(this) } modalTitle="是否确定删除此活动"  visible={ this.state.alertModalVisible } onOk={ this.onOk.bind(this, item) }/>
          </div>
        </div>
    )
  }
}



function mapStateToProps(state) {
  const {
    item,
    signUserList,
    signPagination,
  } = state.activity;

  return {
    loading: state.loading,
    item,
    signUserList,
    signPagination,
  };
}


export default connect(mapStateToProps)(ActivityDetailIndex)
