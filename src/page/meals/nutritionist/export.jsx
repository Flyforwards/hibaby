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
  Card,
  Tabs
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
const TabPane = Tabs.TabPane;

@createForm()
class ExportMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exportValue: 1,
      backgroundDayState:"rgba(204, 204, 204, 1)",
      backgroundMonthState:"rgba(255,255,255,1)",
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
    this.setState({
      exportValue:value,
    })
  }

  // //点击当日菜单
  // onDay(e) {
  //   e.stopPropagation();
  //   this.setState({
  //     backgroundDayState:"rgba(204, 204, 204, 1)",
  //     backgroundMonthState:"rgba(255,255,255,1)",
  //   })
  //   console.log("value",e.target.value)
  // }
  //
  // onMonth() {
  //   this.setState({
  //     backgroundMonthState:"rgba(204, 204, 204, 1)",
  //     backgroundDayState:"rgba(255,255,255,1)",
  //   })
  // }
  //tab切换
  onTab(key) {

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
        <Tabs type="card" onChange={this.onTab.bind(this)}>
          <TabPane tab="当日餐单" key="1">
            <div id="print-content">
              <PrintPageList  exportValue={ this.state.exportValue }/>
            </div>
          </TabPane>
          <TabPane tab="全部餐单" key="2">
            <div id="print-content">
              <PrintPageList  exportValue={ this.state.exportValue }/>
            </div>
          </TabPane>
        </Tabs>
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="exportButton">
            <Button  onClick={this.onPrint.bind(this)} style={{
              width: '15%',
              height: '40px',
              lineHeight: '40px',
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
            {/*<Select defaultValue="1"*/}
            {/*style={{ width: 300 }}*/}
            {/*allowClear={true}*/}
            {/*onSelect={ this.onSelect.bind(this) }*/}
            {/*>*/}
            {/*<Option value="1">当日餐单</Option>*/}
            {/*<Option value="2">早餐</Option>*/}
            {/*<Option value="3">早加</Option>*/}
            {/*<Option value="4">午餐</Option>*/}
            {/*<Option value="5">午加</Option>*/}
            {/*<Option value="6">晚餐</Option>*/}
            {/*<Option value="7">晚加</Option>*/}
            {/*</Select>*/}
            {/*<Button className="cardBtn"  style={{width:'180px',backgroundColor:this.state.backgroundDayState}}  onClick={this.onDay.bind(this)}>当日餐单</Button>*/}
            {/*<Button className="cardBtn"  style={{width:'180px',marginLeft:'10px',background:this.state.backgroundMonthState}} onClick={this.onMonth.bind(this)} >全部餐单</Button>*/}
          </div>

      </div>
      </div>
      // </Card>
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
export default connect(mapStateToProps)(ExportMenu)
