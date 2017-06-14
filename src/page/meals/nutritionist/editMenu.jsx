import React from 'react'
import './dinner.scss'
import { connect } from 'dva'
import {
  Select,
  Button,
  DatePicker,
  Table,
  Input,
  Form,
  Icon,
  Popconfirm,
  Pagination,
  Cascader,
  Col,
  Row,
  InputNumber,
  Modal
} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import DictionarySelect from 'common/dictionary_select';
import Current from '../../Current'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
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
      title: '操作',
      dataIndex: 'operating',
      render: (text, record, index) => {
        const detail = !this.props.permissionAlias.contains('CUSTOMER_DETAIL');
        const del = !this.props.permissionAlias.contains('CUSTOMER_DELETE');
        return (
          <div>
            <Link disabled={detail} className="firstA" onClick={ this.onLook.bind(this, record)}> 查看 </Link>
            <Link disabled={del} className="firstB" onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
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
    dispatch(routerRedux.push(`/crm/customer/customerDetails?dataId=${record.id}`))
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
  onBack(){
    history.go(-1)
  }
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
      return (<Option key={record.id+""} value={record.id+""}>{record.name}</Option>)
    });
    
    const formChooseLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
    const formChooseOneLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 13 }
    }
    const formChooseOneAge = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    
    const formChooseTwoAge = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }
    
    const add = !this.props.permissionAlias.contains('CUSTOMER_ADD');
    return (
      <div className="CustomerConent">
        <div className="button">
          <Button  style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            float:'right',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>导出</Button>
          <Button  onClick={this.onBack.bind(this)} style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            float:'right',
            marginButtom:'20px',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>返回</Button>
        </div>
        <main className="yt-admin-framework-Customer">
          <div className="CreateModaList-a">
            <Table bordered {...tableProps} rowKey={ record => record.id}/>
          </div>
          <CreateModal
            handleOk={this.state.handleOk}
            visible={ this.state.createModalVisible }
            onCancel={ this.handleCreateModalCancel.bind(this) }
          />
        </main>
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
