import React from 'react'
import './export.scss'
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
  Modal,
  Card
} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import DictionarySelect from 'common/dictionary_select';
import PrintPageList from './printPageList';
import { do_print } from 'common/util/dinner.js';


const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

@createForm()
class CustomerIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createModalVisible: false
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'customer/getCustomerPage' });
    this.props.dispatch({ type: 'customer/listByMain' });
    this.props.dispatch({ type: 'customer/getMemberShipCard' });
    this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });
  }
  onBack() {
    history.go(-1)
  }
  onPrint() {
    do_print('print-content');
  }
  onSelect(value,options) {
    console.log("onSelect",value)
  }
  render() {
    const columns = this.columns;
    const { loading, pagination, dispatch, form, shipCards } = this.props;
    const { getFieldDecorator } = form;
    const options = shipCards.map((record) => {
      return (<Option key={record.id+""} value={record.id+""}>{record.name}</Option>)
    });
    return (
      <div className="export">
        <div className="exportButton">
          <Button  onClick={this.onPrint.bind(this)} style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginRight:'38%',
            float:'right',
            marginButtom:'20px',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>打印</Button>
          <Button  onClick={this.onBack} style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginRight:'20px',
            float:'right',
            marginButtom:'20px',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>返回</Button>
          <Select defaultValue="1" 
            style={{ width: 300 }}
            allowClear={true}
            onSelect={ this.onSelect.bind(this) }
          >
            <Option value="1">当日餐单</Option>
            <Option value="2">早餐</Option>
            <Option value="3">早加</Option>
            <Option value="4">午餐</Option>
            <Option value="5">午加</Option>
            <Option value="6">晚餐</Option>
            <Option value="7">晚加</Option>
          </Select>
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
        <div id="print-content">
          <PrintPageList />
        </div>
      
      </div>
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
