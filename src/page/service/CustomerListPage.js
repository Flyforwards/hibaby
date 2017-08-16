/**
 * 客户列表
 * Created by yangjingjing on 2017/8/15.
 */
import React, { Component } from 'react';
import { Select, Button, DatePicker, Table, Input, Form, Icon, Popconfirm, Pagination, Cascader, Col, Row, InputNumber, Modal } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { Link } from 'react-router'
import '../crm/customer/CustomerIndex.scss'
import DictionarySelect from 'common/dictionary_select';
import { routerRedux } from 'dva/router'
import Current from '../Current';



const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class CustomerListPage extends Component {
  constructor(props){
    super(props);
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
      key: 'purchasePackage'
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
            <Link disabled={detail} className="one-link link-style" > 查看 </Link>
            <Link disabled={del} className="two-link link-style" > 删除 </Link>
          </div>
        );
      }
    }];


    this.state = {
      searchParams : {},
    }
  }



  onSearch(){
    const this_ = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.time != undefined) {
          values.year = values.time.get('year');
          values.month = values.time.get('month') + 1;
        }

        if (values.productionDate != undefined) {
          values.productionDate = values.productionDate.format("YYYY-MM-DD")
        }

        this_.setState({
          searchParams : values
        })

        values.page = 1;
        values.size = this.props.serviceCustomer.size;
        this.getTableData(values);
      }
    })
  }


  reset() {
    this.props.form.resetFields();
    this.setState({
      searchParams : {}
    });
    this.getTableData({
      page : 1,
      size : this.props.serviceCustomer.size
    });
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'serviceCustomer/listByMain'
    });
    dispatch({type: 'serviceCustomer/getMemberShipCard',});
    dispatch({ type: 'serviceCustomer/getDataDict',payload:{"abName": 'YCC',}});

    this.getTableData({
      page : this.props.serviceCustomer.page,
      size : this.props.serviceCustomer.size
    });
  }


  onTableChange = (pageNumber) =>{
    const {searchParams} = this.state;
    this.getTableData({
      page : pageNumber,
      size : this.props.serviceCustomer.size,
      ...searchParams
    });
  }

  getTableData(params = {}){
    const {dispatch} = this.props;
    dispatch({
      type: 'serviceCustomer/getCustomerPageList',
      payload: {
        ...params,
      }
    });
  }




  initSeachDiv(){
    const {form, shipCards, packageList } = this.props;
    const { getFieldDecorator } = form;

    const options = shipCards.map((record) => {
      return (<Option key={record.id} value={record.id+""}>{record.name}</Option>)
    });

    const purchasePackageOptions = packageList.map((record) => {
      return (<Option key={record.id} value={record.id+""}>{record.name}</Option>)
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
      <Form>
        <div style={{ position: 'relative'}}>
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
              <Col offset={2} span={11}>
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

              <Col offset={3} span={8} className="delDisplan">
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
    );

  }

  textforkey(array, value, valuekey = 'name') {
    if(array){
      for (let i = 0; i < array.length; i++) {
        let dict = array[i];
        if (dict['id'] === value) {
          return dict[valuekey];
        }
      }
      return value;
    }
  }

  render() {
    const { serviceCustomer,fetusAry,packageList } = this.props;

    const dataSource = serviceCustomer.customerPageList;

   if(dataSource){
      for (let i = 0; i < dataSource.length; i++) {
        let dict = dataSource[i];
        dict.fetus = this.textforkey(fetusAry, dict.fetus)
        dict.purchasePackage = this.textforkey(packageList, dict.purchasePackage)
      }
    }


    const pagination = {
      total: serviceCustomer.total,
      showQuickJumper: true,
      current: serviceCustomer.page,
      pageSize: serviceCustomer.size,
      onChange: this.onTableChange.bind(this)
    };

    return (
      <div className="CustomerConent">

        {this.initSeachDiv()}

        <Table
          className='customer-table'
          bordered
          dataSource={dataSource}
          columns={this.columns}
          pagination={pagination}
          rowKey={ record => record.id}
        />

        <Current
          page={ serviceCustomer.page}
          total={ serviceCustomer.total}
          range={ serviceCustomer.range}
        />
      </div>
    )
  }
}
function mapStateToProps(state) {
  const {
    shipCards,
    packageList,
    fetusAry
  } = state.serviceCustomer;
  const { permissionAlias } = state.layout;
  return {
    serviceCustomer : state.serviceCustomer,
    shipCards,
    packageList,
    fetusAry,
    permissionAlias
  };
}
export default connect(mapStateToProps)(CustomerListPage)

