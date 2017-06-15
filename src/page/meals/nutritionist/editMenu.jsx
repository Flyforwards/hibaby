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
import PrepareMeals from '../prepareMeals/prepareMeals.js'

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
    
  }
  onBack(){
    history.go(-1)
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
    const { getFieldDecorator } = form;
    
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
        <Link to={{pathname:'/meals/nutritionist/taboo/export',query:{ dataId:`${this.edit}`}}}>
          <Button  style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            float:'right',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>导出</Button></Link>
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
        <PrepareMeals/>
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
