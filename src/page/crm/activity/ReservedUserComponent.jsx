

import React, { Component } from 'react';
import DictionarySelect from 'common/dictionary_select';
import { connect } from 'dva';
import { Card,Input,Button,Form,Table,InputNumber,Col, Row,DatePicker,Select,Cascader } from 'antd';
import { Link } from 'react-router';
import AlertModalFrom from 'common/AlertModalFrom'
import './activityIndex.scss'
import moment from 'moment'
const FormItem = Form.Item;
const createForm = Form.create;
const { MonthPicker } = DatePicker

@createForm()
class ReservedUserComponent extends Component {
  constructor(props) {
    super(props)
    this.state={
      alertModalVisible: false,
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
            <Link onClick={ this.deleteUser.bind(this,record)} > 删除 </Link>
          </div>
        )
      },
    }];
  }

  deleteUser(record){
    this.selectRecord = record;
    this.setState({
      alertModalVisible: true,
    })
  }

  onOk(record) {
    this.props.dispatch({
      type: 'activity/deleteUserFromActivity',
      payload: { dataId:  record.id }
    })
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      alertModalVisible: false,
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

  onSearch(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.activityId = this.props.editItem.id;

        if (values.time != undefined) {
          values.year = values.time.get('year');
          values.month = values.time.get('month')+1;
        }

        this.props.dispatch({
          type: "activity/getActivityCustomerPageList",
          payload: values
        })
      }
    })
  }

  render() {
    let { tableProps, editItem  } = this.props
    const { getFieldDecorator } = this.props.form;

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



    const formItemsLayout = {
      labelCol:{ span: 7 },
      wrapperCol:{ span:15 }
    }
    const formChooseLayout = {
      labelCol:{ span: 10 },
      wrapperCol:{ span: 14 }
    }
    const formChooseOneLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span: 10 }
    }

    let appointments = 0;
    let signeds = 0;
    let orders = 0;
    if (editItem != null) {
      appointments = editItem.appointments;
      signeds = editItem.signeds;
      orders = editItem.orders;
    }



    return (
      <div>
      <Card>
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
          <div>
            <Row className="topTitleInfo">
              <Col span={10} style={{float:'left'}}>
                <FormItem {...formChooseLayout} style={{ width:'774px',height:'40px',lineHeight:'40px'}} >
                  {getFieldDecorator('sear', {rules: [{ required: false }],
                  })(
                    <Input placeholder="输入客户编号、客户姓名、联系方式、合同编号" style={{height:'40px'}}/>
                  )}
                </FormItem>
              </Col>
              <Col span={4} style={{ float:'left'}}>
                  <span>
                    <Button onClick={ this.onSearch.bind(this)} style={{width:'136px',backgroundColor:'rgba(255, 102, 0, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>查询</Button>
                  </span>
              </Col>
              <Col span={4} style={{ float:'left'}}>
                  <span>
                    <Button onClick={ this.reset.bind(this)} style={{width:'136px',backgroundColor:'rgba(255, 0, 0, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>重置</Button>
                  </span>
              </Col>
            </Row>
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
                  <Select  placeholder="请选择" />
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
        <AlertModalFrom  onCancel={ this.handleCancel.bind(this) } message="是否确定删除此客户？"  visible={ this.state.alertModalVisible } onOk={ this.onOk.bind(this, this.selectRecord) }/>
      </div>
    )
  }
}

export default connect()(ReservedUserComponent)
