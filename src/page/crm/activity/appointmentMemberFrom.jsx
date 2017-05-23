


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
      dataIndex: 'operator',
      key: 'operator'
    }];
    this.state = {
      selectedRowKeys: [],
    }
  }
  handleCancel() {
    this.setState ({
      selectedRowKeys: [],
    })
    this.props.onCancel();
  }
  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.activityId = this.props.selectRecord.id;
        console.log(values);
        this.props.dispatch({
          type: "activity/saveMemberCustomer",
          payload: values
        })
        this.props.onCancel();
      }
    })
  }

  onOk() {
    this.props.dispatch({
      type: "activity/saveMemberCustomer",
      payload: {
        activityId: this.props.selectRecord.id,
        ids: this.state.selectedRowKeys.map((record)=>{ return {dataId:record}})
      }
    })
    this.handleCancel();
  }



  cellOnChange = ( selectedRowKeys ) => {
    this.setState({
      selectedRowKeys
    })
  }



  render() {
    let { visible,userList  } = this.props
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

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.cellOnChange.bind(this)
    };

    return (
      <Modal
        key = { visible }
        visible = { visible }
        title = { "预约" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.onOk.bind(this) }
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
            <Table rowSelection={ rowSelection }  rowKey = { record=>record.id } dataSource={ userList } columns={this.columns}/>
          </Card>
        </div>
      </Modal>
    )
  }
}
function mapStateToProps(state) {
  const {
    userList,
  } = state.activity;

  return {
    loading: state.loading,
    userList,
  };
}




export default connect(mapStateToProps)(AppointmentMemberFrom)
