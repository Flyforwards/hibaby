import React from 'react';
import './index.scss';
import { connect } from 'dva';
import {Select, Button, DatePicker, Table, Input, Form, Icon, Popconfirm, Pagination, Cascader, Col, Row, InputNumber, Modal,message} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import DictionarySelect from 'common/dictionary_select';
import { queryURL } from '../../../utils/index.js';
import PermissionLink from '../../../common/PermissionLink';

const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const monthFormat = 'YYYY';
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class PrepareMealPage extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text,record) => {
        return <span><Icon type="user" />{text}</span>
      }
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
    }, {
      title: '添加人',
      render: (record) => {
        if (record.operator2 != null) {
          return record.operator2;
        } else {
          return record.operator;
        }
      }
    }, {
      title: '餐单状态',
      dataIndex:'menuStatus',
      render: (text,record ,index) => {
        if (text == 0) {
          return "标准餐单";
        } else if(text == 1){
          return "禁忌餐单";
        }
      }
    },{
      title: '操作',
      dataIndex: 'operating',
      render: (text, record, index) => {
        // const detail = !this.props.permissionAlias.contains('CUSTOMER_DETAIL');
        // const del = !this.props.permissionAlias.contains('CUSTOMER_DELETE');
        return (
          <div>

            <PermissionLink testKey='CUSTOMER_MENU_EDIT' className="firstA" onClick={ this.onEdit.bind(this, record)}> 编辑餐单 </PermissionLink>
            <PermissionLink testKey='CUSTOMER_TABOO_EDIT' className="firstB" onClick={ this.onTaboo.bind(this, record)}> 禁忌 </PermissionLink>
            {/*<Link disabled={detail} className="firstA" onClick={ this.onEdit.bind(this, record)}> 编辑餐单 </Link>*/}
            {/*<Link disabled={del} className="firstB" onClick={ this.onTaboo.bind(this, record)}> 禁忌 </Link> */}
          </div>
        );
      }
    }];
  }
  //点击编辑餐单
  onEdit(record) {
   // message.warn("暂不可编辑")
    const dispatch = this.props.dispatch;
    dispatch(routerRedux.push(`/meals/nutritionist/editmenu?dataId=${record.id}`))
  }
  //点击禁忌
  onTaboo(record) {
    const dispatch = this.props.dispatch;
    dispatch({
      type:'dinner/getTabooFood',
      payload:{
        "dataId":record.id,
      }
    });
    dispatch({
      type:'dinner/getCustomerMsg',
      payload:{
        "dataId":record.id,
      }
    });
    dispatch(routerRedux.push(`/meals/nutritionist/taboo?dataId=${record.id}`))
  }
  //点击重置
  onReset() {
    const { pathname } = location;
    this.props.dispatch(routerRedux.push({
      pathname
    }))
    this.props.form.resetFields()
  }
  //点击查询
  onSearch() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.time != undefined) {
          values.year = values.time.get('year');
          values.month = values.time.get('month') + 1;
        }
        if (values.productionDate != undefined) {
          values.productionDate = values.productionDate.format("YYYY-MM-DD")
        }
        // this.props.dispatch({
        //   type:'dinner/getCustomerList',
        //   payload:{
        //     values,
        //   }
        // })
        this.props.dispatch(routerRedux.push({
          pathname: "/meals/nutritionist/dinner",
          query: values
        }))
      }
    })
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
    this.props.dispatch({type:'dinner/getCustomerList'});
    this.props.dispatch({ type: 'dinner/listByMain' });
    this.props.dispatch({ type: 'dinner/getMemberShipCard' });
    this.props.dispatch({ type: 'dinner/getDataDict', payload: { "abName": 'YCC' } });
  }

  render() {
    const columns = this.columns;
    const { list, loading, pagination, dispatch, form, shipCards, fetusAry, packageList,tabooData } = this.props;

    for (let i = 0; i < list.length; i++) {
      let dict = list[i];
      dict.fetus = this.textforkey(fetusAry, dict.fetus);
      dict.purchasePackage = this.textforkey(packageList, dict.purchasePackage)
    }
    const { getFieldDecorator } = form;
    const tableProps = {
      loading: loading,
      dataSource: list,
      pagination,
      columns,
      onChange (page) {
        const { pathname } = location;
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize
          }
        }))
      }
    };

    const options = shipCards.map((record) => {
      return (<Option key={record.id+""} value={record.id+""}>{record.name}</Option>)
    });

    const formChooseLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    };
    const formChooseOneAge = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const add = !this.props.permissionAlias.contains('CUSTOMER_ADD');
    let items = [];
    packageList ? packageList.map((elem,index) => {
      items.push(
        <Option key={elem.id}>{elem.name}</Option>
      )
    }):'';

    const searName = queryURL("sear");

    return (
      <div className="CustomerConents">
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
                <Button className='button-group-1' onClick={ this.onReset.bind(this)} >重置</Button>
              </div>
            </div>

            <Row gutter={16} style={{ height: 50 }}>
              <Col span={5} >
                <FormItem label="年龄" {...formChooseOneAge} >
                  {getFieldDecorator('age1', {
                    rules: [{ required: false }]
                  })(
                    <InputNumber min={1} max={100} style={{width:'100%'}} />
                  )}
                </FormItem>
              </Col>
              <Col span={1} style={{ marginLeft: -100, marginRight: 100 }}>
                {/*<FormItem >*/}
                  {/*{getFieldDecorator('age2', {*/}
                    {/*rules: [{ required: false }]*/}
                  {/*})(*/}
                    {/*<InputNumber min={1} max={100}/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
              </Col>
              <Col span={6} className="delDisplan">
                <FormItem label="预产期" {...formChooseOneAge}>
                  {getFieldDecorator('time', {
                    rules: [{ required: false }]
                  })(
                    <MonthPicker
                      placeholder="请选择"
                    />
                  )}
                </FormItem>
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
                    <Select placeholder="请选择" allowClear={ true }>
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
                    <Select
                    showSearch
                    allowClear
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    { items }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{ height: 50 }} gutter={16}>
              <Col span={5}>
                <FormItem label="孕周" {...formChooseOneAge}>
                  {getFieldDecorator('gestationalWeeks')(
                    <InputNumber max={40} min={1} style={{width:"100%"}} />
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
          <Table className='nutritionist-table' bordered {...tableProps} rowKey={ record => record.id}/>
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
    packageList,
    tabooData,
  } = state.dinner;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.dinner,
    list,
    fetusAry,
    pagination,
    shipCards,
    permissionAlias,
    packageList,
    tabooData,
  };
}
export default connect(mapStateToProps)(PrepareMealPage)
