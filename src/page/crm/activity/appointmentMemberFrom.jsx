


import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal,Card, Input, DatePicker, Button, Form,Table, Select,Cascader, Row, Col } from 'antd'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;


@createForm()
class AppointmentMemberFrom extends Component {
  constructor(props) {
    super(props)
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
  handleCancel() {
    this.props.onCancel();
  }
  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.activityId = this.props.selectRecord.id;
        console.log(values);
        this.props.dispatch({
          type: "activity/saveOutsiderCustomer",
          payload: values
        })
        this.props.onCancel();
      }
    })
  }

  cellOnChange() {

  }



  render() {
    let { visible  } = this.props
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
    const rowSelection={
      onChange: this.cellOnChange.bind(this)
    }

    return (
      <Modal
        key = { visible }
        visible = { visible }
        title = { "预约" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        wrapClassName = { "appoint-vertical-center-modal" }
        width ={ 1000 }
      >
        <div>
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
          <Card title="预约客户:">
            <div>李磊磊
            </div>
            <Table rowSelection={ rowSelection } columns={this.columns}/>
          </Card>
        </div>
      </Modal>
    )
  }
}





export default connect()(AppointmentMemberFrom)
