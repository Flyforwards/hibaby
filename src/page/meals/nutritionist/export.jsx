import React from 'react';
import './export.scss';
import { connect } from 'dva';
import {Select, Button, Table, Input, Form, Col, Row, InputNumber, Modal, Card, Tabs,message} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import DictionarySelect from 'common/dictionary_select';
import PrintPageList from './printPageList';
import { do_print } from 'common/util/dinner.js';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;
const TabPane = Tabs.TabPane;
import { queryURL } from '../../../utils/index.js';

@createForm()
class ExportMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exportValue: 1,
      initValue:"0",
      choiceValue:0,
      disabled:true,
      mainDisabled:false,
    }
  }
  // componentDidMount() {
  //   // this.props.dispatch({ type: 'customer/getCustomerPage' });
  //   // this.props.dispatch({ type: 'customer/listByMain' });
  //   // this.props.dispatch({ type: 'customer/getMemberShipCard' });
  //   // this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });
  // }
  onBack() {
    const dataId = queryURL("dataId");
    this.props.dispatch(routerRedux.push({
      pathname:'/meals/nutritionist/editmenu',
      query: {
        dataId: dataId
      }
    }));
  }
  onPrint() {
    const dataId = queryURL("dataId");
    do_print('print-content',dataId,this.state.choiceValue);
  }
  //tab切换
  onTab(key) {

  }
  handleChange(value) {
    const { dispatch } = this.props;
    const dataId = queryURL("dataId");
    if(value == ''){
      message.error("请选择要打印的餐单时间段");
      this.setState({
        mainDisabled:false,
        disabled:false,
      })
      return ;
    }else{
      let _this = this;
      value.map(function(elem,index){
        if(elem == '0') {
          _this.setState({
            disabled:true,
            mainDisabled:false,
          })
        }else{
          _this.setState({
            disabled:false,
            mainDisabled:true,
          })
        }
      })
    }
    dispatch({
      type:'dinner/getPrintMsg',
      payload:{
        "customerId":dataId,
        "type":value.join(','),
      }
    })
    //更新出单时间
    // this.props.dispatch({
    //   type:'dinner/getSystemTime',
    // })
    if(!this.props.printMsg) {
       this.setState({
         initValue:"0",
         choiceValue:'0'
       })
    }else{
      this.setState({
        choiceValue:value.join(','),
      })
    }
  }
  render() {
    const { loading, dispatch,form ,printMsg} = this.props;
    const { getFieldDecorator } =form;
    const tabKeys =
      <formItem>
        <Select mode="multiple" defaultValue={this.state.initValue}  style={{ width: 200 ,textAlign:'center',fontSzie:'16px',color:'#333333'}} placeholder="请选择导出的餐单" onChange={this.handleChange.bind(this)} >
          <Option value="0" disabled={this.state.mainDisabled}>当日餐单</Option>
          <Option value="1" disabled={this.state.disabled}>早餐</Option>
          <Option value="2" disabled={this.state.disabled}>早加</Option>
          <Option value="3" disabled={this.state.disabled}>午餐</Option>
          <Option value="4" disabled={this.state.disabled}>午加</Option>
          <Option value="5" disabled={this.state.disabled}>晚餐</Option>
          <Option value="6" disabled={this.state.disabled}>晚加</Option>
        </Select>
      </formItem>
    return (
      <div className="export">
        <Tabs type="card" onChange={this.onTab.bind(this)}>
          <TabPane tab={tabKeys} key="1">
            <div id="print-content">
              <PrintPageList  exportValue={ this.state.exportValue }/>
            </div>
          </TabPane>
        </Tabs>
        <div className="" style={{ overflow: 'hidden' }}>
          <div className="exportButton">
            <Button  onClick={this.onPrint.bind(this)} disabled={printMsg ? false:true} style={{
              width: '15%',
              height: '40px',
              lineHeight: '40px',
              float:'right',
              marginButtom:'20px',
              backgroundColor: !printMsg ? '#d9d9d9':'rgba(255, 102, 0, 1)',
            }}>打印</Button>
            <Button  onClick={this.onBack.bind(this)} style={{
              width: '15%',
              height: '40px',
              lineHeight: '40px',
              marginRight:'20px',
              float:'right',
              marginButtom:'20px',
              backgroundColor: 'rgba(255, 102, 0, 1)'
            }}>返回</Button>
          </div>

      </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
const { printMsg } = state.dinner;
  return {
    printMsg,
    loading: state.loading,
  };
}
export default connect(mapStateToProps)(ExportMenu)
