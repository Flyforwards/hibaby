

import React, { Component } from 'react';
import { connect } from 'dva';
import { Card,Input,Button,Form,Table,Col, Row,DatePicker,Select,Cascader } from 'antd';
import { Link } from 'react-router';
import AlertModalFrom from 'common/AlertModalFrom'
import './activityIndex.scss'
const FormItem = Form.Item;
const createForm = Form.create;


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

  render() {
    let { tableProps  } = this.props
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
    return (
      <div>
      <Card>
        <div className="card-title">
          <h3>预约客户:</h3>
        </div>
        <Row>
          <Col offset={6} span={6}><span>预约人数87人</span>
          </Col>
          <Col span={6}><span>签到人数0人</span>
          </Col>
          <Col span={6}><span>成单率0%</span>
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
        <Table {...tableProps} bordered size="small" rowKey = { record=>record.id } columns={ this.columns }/>
      </Card>
        <AlertModalFrom  onCancel={ this.handleCancel.bind(this) } message="是否确定删除此客户？"  visible={ this.state.alertModalVisible } onOk={ this.onOk.bind(this, this.selectRecord) }/>
      </div>
    )
  }
}

export default connect()(ReservedUserComponent)






