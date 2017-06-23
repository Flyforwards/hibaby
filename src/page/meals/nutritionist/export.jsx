import React from 'react';
import './export.scss';
import { connect } from 'dva';
import {Select, Button, Table, Input, Form, Col, Row, InputNumber, Modal, Card, Tabs} from 'antd';
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
      clickState:false,
      choiceValue:0,
    }
  }
  // componentDidMount() {
  //   this.props.dispatch({ type: 'customer/getCustomerPage' });
  //   this.props.dispatch({ type: 'customer/listByMain' });
  //   this.props.dispatch({ type: 'customer/getMemberShipCard' });
  //   this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });
  // }
  onBack() {
    history.go(-1)
  }
  onPrint() {
    const dataId = queryURL("dataId");
    do_print('print-content',dataId,this.state.choiceValue);
  }
  // onSelect(value,options) {
  //   console.log("onSelect",value)
  //   this.setState({
  //     exportValue:value,
  //   })
  // }

  //tab切换
  onTab(key) {

  }
  handleChange(value) {
    const { dispatch } = this.props;
    console.log("select Accept",value);
    const dataId = queryURL("dataId");
    dispatch({
      type:'dinner/getPrintMsg',
      payload:{
        "customerId":dataId,
        "type":value,
      }
    })
    //更新出单时间
    // this.props.dispatch({
    //   type:'dinner/getSystemTime',
    // })
    if(value.length <=0) {
       this.setState({
         initValue:"0",
         clickState:true,
         choiceValue:'0'
       })
    }else{
      this.setState({
        choiceValue:value,
        clickState:false,
      })
    }
  }
  render() {
    const { loading, dispatch,form } = this.props;
    const { getFieldDecorator } =form;
    const tabKeys =
      <formItem>
        <Select defaultValue={this.state.initValue}  style={{ width: 200 ,textAlign:'center',fontSzie:'16px',color:'#333333'}} placeholder="请选择导出的餐单" onChange={this.handleChange.bind(this)} >
          <Option value="0">当日餐单</Option>
          <Option value="1">早餐</Option>
          <Option value="2">早加</Option>
          <Option value="3">午餐</Option>
          <Option value="4">午加</Option>
          <Option value="5">晚餐</Option>
          <Option value="6">晚加</Option>
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
            <Button  onClick={this.onPrint.bind(this)} disabled={this.state.clickState} style={{
              width: '15%',
              height: '40px',
              lineHeight: '40px',
              float:'right',
              marginButtom:'20px',
              backgroundColor: this.state.clickState ? '#d9d9d9':'rgba(255, 102, 0, 1)',
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
    )
  }
}


function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}
export default connect(mapStateToProps)(ExportMenu)
