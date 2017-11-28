import React from 'react'
import './CustomerIndex.scss'
import { connect } from 'dva'
import { browserHistory } from 'react-router';

import { Select, Button, DatePicker, Table, Input, Card, Form, Icon, Popconfirm, Pagination, Cascader, Col, Row, InputNumber, Modal } from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import DictionarySelect from 'common/dictionary_select';
import PermissionButton from 'common/PermissionButton';

const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create

//这是表单的数据操作
class Customer extends React.Component {
  state = {
    value: this.props.value,
    editable: false
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

@createForm()
class CustomerIndex extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
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
    }, {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact'
    }, {
      title: '购买套餐',
      dataIndex: 'purchasePackage',
      key: 'purchasePackage',
      render: (record) => {
        return record ? record : "无"
      }
    }, {
      title: '合同编号',
      dataIndex: 'contractNumber',
      key: 'contractNumber'
    },{
      title: '会员卡卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber'
    }, {
      title: '添加人',
      render: (record) => {
        if (record.operator2 != null) {
          return record.operator2;
        } else {
          return record.operator;CUSTOMER_DELETE
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operating',
      render: (text, record, index) => {
        const detail = !this.props.permissionAlias.contains('CUSTOMER_DETAIL');
        const del = !this.props.permissionAlias.contains('CUSTOMER_DELETE');
        return (
          <div className="operation-list">
            <Link disabled={detail} className="one-link link-style" onClick={ this.onLook.bind(this, record)}> 查看 </Link>
            <Link disabled={del} className="two-link link-style" onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
          </div>
        );
      }
    }];
    this.state = {
      createModalVisible: false
    }
  }

  onLook(record) {
    const dispatch = this.props.dispatch;
    dispatch(routerRedux.push(`/crm/customer/detail?dataId=${record.id}`))
  }

  onDelete(record) {
    const dispatch = this.props.dispatch;
    confirm({
      title: '提示',
      content: '是否确定删除此用户',
      onOk() {
        dispatch({
          type: 'customer/deleteCustomer',
          payload: { dataId: record.id }
        })
      },
      onCancel() {
      }
    });
  }

  handleCreateModalCancel() {
    this.setState({
      createModalVisible: false
    })
  }

  showCreateModal() {
    this.setState({
      createModalVisible: true
    })
  }

  onSearch() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.dueDate1) {
          values.dueDate1 = values.dueDate1.format("YYYY-MM-DD");
        }
        else{
          values.dueDate2 = undefined
        }
        if (values.dueDate2) {
          values.dueDate2 = values.dueDate2.format("YYYY-MM-DD");
        }
        else{
          values.dueDate2 = undefined
        }

        if (values.productionDate != undefined) {
          values.productionDate = values.productionDate.format("YYYY-MM-DD")
        }

        this.props.dispatch(routerRedux.push({
          pathname: "/crm/customer",
          query: values
        }))
      }
    })
  }

  reset() {
    const { pathname } = location;
    this.props.dispatch(routerRedux.push({
      pathname
    }))
    this.props.form.resetFields()
  }


  textforkey(array, value, valuekey = 'name') {
    for (let i = 0; i < array.length; i++) {
      let dict = array[i];
      if (dict['id'] === value) {
        return dict[valuekey];
      }
    }
    return value;
  }

  componentDidMount() {
    this.props.dispatch({ type: 'customer/getCustomerPage' });
    this.props.dispatch({ type: 'customer/listByMain' });
    this.props.dispatch({ type: 'customer/getMemberShipCard' });
    this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown(event){
    if(location.pathname === '/crm/customer'){
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==13){
        this.onSearch()
      }
    }

  }

  rowClassName(record, index){
    if(!record.purchasePackage &&  record.dueDate){
      if( moment().diff(record.dueDate,"days") > 3){
        return "selectRow"
      }
    }
    else{
      return ""
    }
  }

  render() {
    const columns = this.columns;
    const { list, loading, pagination, dispatch, form, shipCards, fetusAry, packageList } = this.props;

    for (let i = 0; i < list.length; i++) {
      let dict = list[i];
      dict.fetus = this.textforkey(fetusAry, dict.fetus)
      dict.purchasePackage = this.textforkey(packageList, dict.purchasePackage)
    }


    const { getFieldDecorator } = form;
    const tableProps = {
      loading: loading.effects['customer/getCustomerPage'],
      dataSource: list,
      pagination,
      columns,
      rowClassName:this.rowClassName,
      onChange (page) {
        const { pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize
          }
        }))
      }
    }

    const options = shipCards.map((record) => {
      return (<Option key={record.id} value={record.id}>{record.name}</Option>)
    });

    const purchasePackageOptions = packageList.map((record) => {
      return (<Option key={record.id} value={record.id}>{record.name}</Option>)
    });

    const formChooseLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    }
    const formChooseOneAge = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    const dueData = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    }
    return (
      <div className="CustomerConent">
        <Form style={{minWidth:'1200px'}}>
          <div style={{position: 'relative'}}>
            <FormItem style={{ height: '40px' }} {...formChooseLayout}>
              {getFieldDecorator('sear', {
                rules: [{ required: false }]
              })(
                <Input placeholder="输入客户编号、客户姓名、联系方式、合同编号"/>
              )}
            </FormItem>
            <div className="customer-operation">
              <Button className='button-group-2' onClick={ this.onSearch.bind(this)}>查询</Button>
              <Button className='button-group-1' onClick={ this.reset.bind(this)} >重置</Button>
              <Link to="/crm/customer/add">
                <PermissionButton className='button-group-3' testKey='CUSTOMER_ADD' >新增客户</PermissionButton>
              </Link>
            </div>
          </div>
          <Row gutter={16} style={{ height: 50 }}>
            <Col span={5} >
              <FormItem label="年龄" {...formChooseOneAge}>
                {getFieldDecorator('age1', {
                  rules: [{ required: false }]
                })(
                  <InputNumber min={1} max={100}/>
                )}
              </FormItem>
            </Col>
            <Col span={1} style={{ marginLeft: -100, marginRight: 100 }}>
              <FormItem >
                {getFieldDecorator('age2', {
                  rules: [{ required: false }]
                })(
                  <InputNumber min={1} max={100}/>
                )}
              </FormItem>

            </Col>
            <Col span={6} className="delDisplan">
              <Row>
                <Col offset={2} span={12}>
                  <FormItem label="预产期" {...dueData}>
                    {getFieldDecorator('dueDate1', {
                      rules: [{ required: false }]
                    })(
                      <DatePicker
                        placeholder="请选择"
                      />
                    )}
                  </FormItem>
                </Col>

                <Col offset={1} span={9} className="delDisplan">
                  <FormItem>
                    {getFieldDecorator('dueDate2', {
                      rules: [{ required: false }]
                    })(
                      <DatePicker
                        placeholder="请选择"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>

            </Col>

            <Col span={6}>
              <FormItem label="操作者2" {...formChooseOneAge}>
                {getFieldDecorator('operator2', {
                  rules: [{ required: false }]
                })(
                  <Input max={40}/>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="会员身份" {...formChooseOneAge}>
                {getFieldDecorator('member', {
                  rules: [{ required: false }]
                })(
                  <Select placeholder="请选择">
                    {
                      options
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row style={{ height: 50 }} gutter={16}>
            <Col span={5}>
              <FormItem label="籍贯" {...formChooseOneAge}>
                {getFieldDecorator('placeOrigin')(
                  <Input max={40}/>
                )}
              </FormItem>
            </Col>
            <Col span={1}/>
            <Col span={6}>
              <FormItem label="第几胎" {...formChooseOneAge}>
                {getFieldDecorator('fetus', {
                  rules: [{ required: false }]
                })(
                  <DictionarySelect placeholder="请选择" selectName="FETUS"/>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="意向套餐" {...formChooseOneAge}>
                {getFieldDecorator('intentionPackage')(
                  <DictionarySelect placeholder="请选择" selectName="IntentionPackage"/>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="购买套餐" {...formChooseOneAge}>
                {getFieldDecorator('purchasePackage')(
                  <Select placeholder="请选择">
                    {
                      purchasePackageOptions
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row style={{ height: 50 }} gutter={16}>
            <Col span={5}>
              <FormItem label="孕周" {...formChooseOneAge}>
                {getFieldDecorator('gestationalWeeks')(
                  <InputNumber max={40} min={1}/>
                )}
              </FormItem>
            </Col>
            <Col span={1}/>
            <Col span={6} className="delDisplan">
              <FormItem label="宝宝生日"  {...formChooseOneAge}>
                {getFieldDecorator('productionDate')(
                  <DatePicker placeholder="请选择"/>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="分娩医院" {...formChooseOneAge}>
                {getFieldDecorator('hospital', {
                  rules: [{ required: false }]
                })(
                  <DictionarySelect placeholder="请选择" selectName="Hospital"/>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table className='customer-table' bordered {...tableProps} rowKey={ record => record.id}/>
        <CreateModal
          handleOk={this.state.handleOk}
          visible={ this.state.createModalVisible }
          onCancel={ this.handleCreateModalCancel.bind(this) }
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {
    list,
    pagination,
    shipCards,
    fetusAry,
    packageList
  } = state.customer;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    list,
    fetusAry,
    pagination,
    shipCards,
    permissionAlias,
    packageList
  };
}
export default connect(mapStateToProps)(CustomerIndex)
