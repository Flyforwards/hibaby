

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal,Card, Input, DatePicker, Button, Form,Table, Select,Cascader, Row, Col,InputNumber } from 'antd'
import DictionarySelect from 'common/dictionary_select';
import PropTypes from 'prop-types'
import './appointmentMemberFrom.scss'
import { message } from 'antd'

const FormItem = Form.Item;
const createForm = Form.create
const { MonthPicker } = DatePicker
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
      render: (record) => {
        if (record.operator2 != null) {
          return record.operator2;
        } else {
          return record.operator;
        }
      }
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
        // 做搜索筛选
      }
    })
  }

  onOk() {
    if (this.state.selectedRowKeys.length === 0)
    {
      message.error('请至少选择一个用户');
      return;
    }
    this.props.dispatch({
      type: "activity/saveMemberCustomer",
      payload: {
        activityId: this.props.selectRecord.id,
        ids: this.state.selectedRowKeys.map((record)=>{ return {dataId:record}}),
        from: this.props.from
      }
    })
    this.handleCancel();
  }



  cellOnChange = ( selectedRowKeys ) => {
    this.setState({
      selectedRowKeys
    })
  }

  onSearch(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.activityId = this.props.selectRecord.id;

        if (values.time != undefined) {
          values.year = values.time.get('year');
          values.month = values.time.get('month')+1;
        }
        //  console.log(values);

        this.props.dispatch({
          type: "activity/getNoAppointmentCustomerPageList",
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
    let { dispatch,visible, userList, loading, noAppointmentPagination, selectRecord, form, shipCards } = this.props
    const { getFieldDecorator } = form;

    const options = shipCards.map((record)=>{
      return (<Option key={record.id} value={record.id}>{record.name}</Option>)
    });

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.cellOnChange.bind(this)
    };
    const tableProps = {
      loading: loading.effects['activity/getNoAppointmentCustomerPageList'],
      dataSource: userList ,
      pagination: noAppointmentPagination,
      onChange (page) {

        form.validateFields((err, values) => {
          let query = {
            activityId: selectRecord.id,
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
            type: "activity/getNoAppointmentCustomerPageList",
            payload: query
          })
        })
      },
    }
    const formChooseLayout = {
      labelCol:{ span: 12 },
      wrapperCol:{ span: 12 }
    }
    const formChooseOneLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span: 10 }
    }

    return (
      <Modal
        key = { visible }
        visible = { visible }
        title = { "预约" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.onOk.bind(this) }
        wrapClassName = { "vertical-center-modal appointMentModal" }
        width ={ 1000 }
      >
        <div className="activity-cent">
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
            <div className="activityTitle">
            <Row>
              <Col className="selItem ageItem" >
                <FormItem {...formChooseOneLayout}  label="年龄" >
                  {getFieldDecorator('age1', {rules: [{ required: false }],
                  })(
                    <InputNumber min={1} max={100}  />
                  )}
                </FormItem>
              </Col>
              <Col className="selItem ageItem2" style={{width:'55px'}}>
                <FormItem {...formChooseLayout} style={{width:'100%'}}>
                  {getFieldDecorator('age2', {rules: [{ required: false }],
                  })(
                    <InputNumber min={1} max={100} style={{width: "55px"}} />
                  )}
                </FormItem>

              </Col>
              <Col className="PreData selItem" >
                <FormItem {...formChooseOneLayout}  label="预产期" >
                  {getFieldDecorator('time', {rules: [{ required: false }],
                  })(
                    <MonthPicker
                      placeholder="请选择"
                    />
                  )}
                </FormItem>
              </Col>
              <Col className="TireNum selItem">
                <FormItem  {...formChooseOneLayout} label="第几胎" >
                  {getFieldDecorator('fetus', {rules: [{ required: false }],
                  })(
                    <DictionarySelect  placeholder="请选择" selectName="FETUS" />
                  )}
                </FormItem>
              </Col>
              <Col className="idCard selItem" >
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
              <Col className="Operator selItem">
                <FormItem  {...formChooseOneLayout} label="操作者2" >
                  {getFieldDecorator('operator2', {rules: [{ required: false }],
                  })(
                    <Input max={40}  />
                  )}
                </FormItem>
              </Col>
            </Row>
            </div>
          </Form>
          <Card>
            <div className="card-title">
              <h3>预约客户:</h3>
            </div>
            <Table {...tableProps}  bordered size="small"  rowSelection={ rowSelection } rowKey = { record=>record.id } columns={this.columns}/>
          </Card>
        </div>
      </Modal>
    )
  }
}

AppointmentMemberFrom.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  selectRecord: PropTypes.object,
  noAppointmentPagination: PropTypes.object,
  // 有两个不同的入口并且有不同的行为从这里判断
  from: PropTypes.bool,
}


function mapStateToProps(state) {
  const {
    userList,
    noAppointmentPagination,
    shipCards
  } = state.activity;

  return {
    loading: state.loading,
    userList,
    noAppointmentPagination,
    shipCards
  };
}




export default connect(mapStateToProps)(AppointmentMemberFrom)
