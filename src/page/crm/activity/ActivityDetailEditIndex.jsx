
import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Input, DatePicker, Button, Form,Table, Select,Cascader, Row, Col } from 'antd'
import {routerRedux} from 'dva/router';
import AlertModalFrom from 'common/AlertModalFrom'
import moment from 'moment'
import AppointmentModalFrom from './appointmentModalFrom'
import AppointmentMemberFrom from './appointmentMemberFrom'
import AppointmentNotMemberFrom from './appointmentNotMemberFrom'
import util from 'common/util'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;


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
      dataIndex: 'time',
      key: 'time'
    }, {
      title: '怀孕周期',
      dataIndex: 'count',
      key: 'count'

    }, {
      title: '第几胎',
      dataIndex: 'index',
      key: 'index'
    },{
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone'
    },{
      title: '购买套餐',
      dataIndex: 'pay',
      key: 'pay'
    },{
      title: '合同编号',
      dataIndex: 'number',
      key: 'number'
    },{
      title: '添加人',
      dataIndex: 'input',
      key: 'input'
    }, ];
  }


  cellOnChange() {

  }
  back() {
    this.props.dispatch(
      routerRedux.push('/crm/activity/detail')
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
    } else {
      this.setState({
        notMemberVisible: true,
        appointmentVisible: false,
      })
    }

  }





  render() {
    const { getFieldDecorator } = this.props.form;
    const { item } = this.props;

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
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const rowSelection={
      onChange: this.cellOnChange.bind(this)
    }


    let itemName = "";
    let address = "";
    let content = "";
    let activityTime = moment("")
    if (item != null) {
      itemName = item.name;
      activityTime = moment(item.activityTime);
      address = item.address;
      content = item.content;
    }


    return (
      <div>
        <Card>
          <div>活动信息:</div>
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
              <Input  disabled={ true } value={ content }/>
            </FormItem>
          </Form>
        </Card>
        <Card>
          <Row>
            <Col span={6}><div>预约客户:</div>
            </Col>
            <Col span={6}><div>预约人数87人</div>
            </Col>
            <Col span={6}><div>签到人数0人</div>
            </Col>
            <Col span={6}><div>成单率0%</div>
            </Col>
          </Row>
          <div>
            <Row>
              <Col span={5}><span>客户名称</span>
              </Col>
              <Col span={14}><span><Input /></span>
              </Col>
              <Col span={5}><span><Button>搜索</Button></span>
              </Col>
            </Row>
          </div>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout}  label="生日" >
                  {getFieldDecorator('birthday', {rules: [{ required: false }],
                  })(
                    <DatePicker format="YYYY-MM-DD" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="生产医院" >
                  {getFieldDecorator('hospital', {rules: [{ required: false }],
                  })(
                    <Select >
                      <Option value="beijing">北京医院</Option>
                      <Option value="beijing">协和医院</Option>
                      <Option value="beijing">人民医院</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem   {...formItemLayout} label="预产期" >
                  {getFieldDecorator('time', {rules: [{ required: false, }],
                  })(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="客户身份" >
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
                <FormItem  {...formItemLayout} label="现住址" >
                  {getFieldDecorator('address', {rules: [{ required: false }],
                  })(
                    <Cascader options={ options }/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div>李磊磊
          </div>
          <Table rowSelection={ rowSelection } columns={this.columns}/>
        </Card>
        <Row>
          <Col offset={16} span={4}><Button onClick={this.back.bind(this)}>返回</Button></Col>
          <Col span={4}><Button onClick={ this.appointment.bind(this) }  >保存</Button></Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    item,
  } = state.activity;

  return {
    loading: state.loading,
    item,
  };
}


export default connect(mapStateToProps)(ActivityDetailIndex)
