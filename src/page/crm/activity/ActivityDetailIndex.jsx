
import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Input, DatePicker, Button, Form,Table, Select,Cascader, Row, Col } from 'antd'
import { Link } from 'react-router';
import { routerRedux } from 'dva/router';
import AlertModalFrom from 'common/AlertModalFrom'
import moment from 'moment'
import AppointmentModalFrom from './appointmentModalFrom'
import AppointmentMemberFrom from './appointmentMemberFrom'
import AppointmentNotMemberFrom from './appointmentNotMemberFrom'
import util from 'common/util'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;
import { parse } from 'qs'

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
      key: 'dueDate'
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
        // to = {`/system/group-char/detail?dataId=${record.id}`}
        return (
          <div key = { index }>
            <Link onClick={ this.Sign.bind(this,record)} > 签到 </Link>
          </div>
        )
      },
    }];
  }
  Sign(record) {

  }



  cellOnChange() {

  }
  back() {
    this.props.dispatch(
      routerRedux.push('/crm/activity')
    )
  }
  // 编辑
  edit() {
    const values = parse(location.search.substr(1))
    this.props.dispatch(
      routerRedux.push({
        pathname: '/crm/activity/edit',
        query: values
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
      const values = parse(location.search.substr(1))
      this.props.dispatch({
        type: 'activity/getCustomerPageList',
        payload: { 'activityId': values.dataId }
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
    const { item, signUserList } = this.props;

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
            <Table rowKey = { record=>record.id } dataSource={ signUserList } columns={this.columns}/>
          </Card>
          <Row>
            <Col offset={8} span={4}><Button onClick={this.back.bind(this)}>返回</Button></Col>
            <Col span={4}><Button onClick={ this.appointment.bind(this) }  >预约</Button></Col>
            <Col span={4}><Button onClick={ this.deleteActivity.bind(this) }>删除</Button></Col>
            <Col span={4}><Button  onClick={ this.edit.bind(this) }>编辑</Button></Col>
          </Row>
          <AppointmentModalFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.appointmentVisible } selectRecord={ item } onChoose={ this.onChoose.bind(this)}/>
          <AppointmentMemberFrom onCancel={ this.onCancel.bind(this) } visible={ this.state.memberVisible } selectRecord={ item }/>
          <AppointmentNotMemberFrom onCancel={ this.onCancel.bind(this) }  visible={ this.state.notMemberVisible } selectRecord={ item }/>
          <AlertModalFrom  onCancel={ this.onCancel.bind(this) } modalTitle="是否确定删除此活动"  visible={ this.state.alertModalVisible } onOk={ this.onOk.bind(this, item) }/>
        </div>
    )
  }
}



function mapStateToProps(state) {
  const {
    item,
    signUserList
  } = state.activity;

  return {
    loading: state.loading,
    item,
    signUserList
  };
}


export default connect(mapStateToProps)(ActivityDetailIndex)
