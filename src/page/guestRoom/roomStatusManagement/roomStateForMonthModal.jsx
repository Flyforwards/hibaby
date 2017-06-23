"use strict"

import React from 'react'
import {connect} from 'dva'
import {
  Button,
  Card,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Form,
  DatePicker,
  Select,
  Modal,
  Table,
  message,
} from 'antd'
import {routerRedux} from 'dva/router';
import './roomStatusManagementIndex.scss'
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
import {parse} from 'qs';

function customerSearch() {
  return(
    <div>

    </div>
  )
}

function CustomerTable({props,loading}) {
  const {allCusList,pagination} = props
  const columns = [{title: '客户姓名', dataIndex: 'name',key: 'name'},
    {title: '年龄',dataIndex: 'age',key: 'age'},
    {title: '预产期',dataIndex: 'dueDate',render: (record) => {
        return moment(record).format("YYYY-MM-DD")
      }
    },
    {title: '怀孕周期',dataIndex: 'gestationalWeeks',key: 'gestationalWeeks'},
    {title: '第几胎', dataIndex: 'fetus', key: 'fetus'},
    {title: '联系方式', dataIndex: 'contact', key: 'contact'},
    {title: '购买套餐', dataIndex: 'purchasePackage', key: 'purchasePackage'},
    {title: '合同编号', dataIndex: 'contractNumber', key: 'contractNumber'},
    {title: '添加人', render: (record) => {
        if (record.operator2 != null) {
          return record.operator2;
        } else {
          return record.operator;
        }
      }
    },
  ];

  const tableProps = {
    loading: loading.effects['roomStatusManagement/getCustomerPage'],
    dataSource: allCusList,
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };

  return(
    <Table rowSelection={rowSelection} {...tableProps}/>
  )

}

//添加客户
class addCustomer extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){
    this.props.dispatch({type: 'roomStatusManagement/getCustomerPage'});
  }

  handleOk(){
    this.props.dispatch({
      type: 'roomStatusManagement/setCustomerVisible',
      payload: false
    });
  }

  handleCancel(){
    this.props.dispatch({
      type: 'roomStatusManagement/setCustomerVisible',
      payload: false
    });
  }

  render(){
    const {CustomerVisible} = this.props.users;


    return(
      <Modal

        className="RowHouses"
        width="1000px"
        visible={CustomerVisible}
        title="预约"
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
      >
        <CustomerTable loading={this.props.loading} props={this.props.users}/>
      </Modal>
    )
  }
}




function SearchForm(props){
  const {getFieldDecorator} = props.form;
  const {packageAry,dispatch} = props;


  function onSearch() {
    props.form.validateFields((err, values) => {
      if (!err) {


        let param = {};
        Object.keys(values).map((key) => {
          const value = values[key];
          if(value){
            if(typeof value === 'object'){
              param[key] = value.format();
            }
            else {
              param[key] = value;
            }
          }
        })

        dispatch({
          type: 'roomStatusManagement/arrangeRoom',
          payload: param,
        });
      }
    })
  }

  function cusFromItem(dict) {

    const formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 17},
    };

    let packageChi = [];
    for (let i = 0; i < packageAry.length; i++) {
      packageChi.push(<Option key={packageAry[i].id}>{packageAry[i].name}</Option>);
    }

    let numberChi = [];
    for (let i = 1; i <= 5; i++) {
      numberChi.push(<Option key={i}>{i}</Option>);
    }

    return (
      <Col span={8}>
        <FormItem key={dict.subMitStr} {...formItemLayout} label={dict.title}>
          {getFieldDecorator(dict.subMitStr,{ rules: [{ required:true,  message: `请输入${dict.title || '此项'}!`}],})
          (
            dict.componentStyle  === 'select'?
              (dict.subMitStr === 'packageInfoId' ?
                  <Select placeholder="请选择" className='antCli'>
                    {packageChi}
                  </Select>
                  :
                  <Select placeholder="请选择" className='antCli'>
                    {numberChi}
                  </Select>
              )
              :
              ( dict.componentStyle  === 'date'?
                  <DatePicker style={{width: '100%'}}/>:
                  <InputNumber min={1} max={365} placeholder="请填写" className='antCli'/>
              )
          )}
        </FormItem>
      </Col>
    )
  }

  const array = [
    {title:'起始时间',subMitStr:'beginDate',componentStyle:'date'},
    {title:'套餐',subMitStr:'packageInfoId',componentStyle:'select'},
    {title:'总天数',subMitStr:'days',componentStyle:'Input'},
    {title:'拼房次数',subMitStr:'jumpNo',componentStyle:'select'}
  ]


  return(
    <div>
      <h3>排房条件</h3>
      <Row>
        {cusFromItem(array[0])}
        {cusFromItem(array[1])}
        {cusFromItem(array[2])}
      </Row>
      <Row>
        {cusFromItem(array[3])}
        <Col offset={13} span={3}><Button className='btn' onClick={ onSearch}>查询</Button></Col>
      </Row>
    </div>
  )
}

function SearResults({resultsRowHouses,selectFun,currSelect}) {

  function creatCard() {
    let ary = [];
    for (let i = 0; i < resultsRowHouses.length; i++) {
      const dict = resultsRowHouses[i];
      let chiAry = [];
      for (let j = 0; j < dict.jumpList.length; j++) {
        const chiDict = dict.jumpList[j];
        chiAry.push(<span key={j}>{chiDict.roomNo}  停留天数{chiDict.stayDay}</span>)
      }
      ary.push(<Card onClick={()=>{selectFun(i)}} style={{border: i === currSelect ? '1px solid red' : '1px solid #e9e9e9'}} key={i} bodyStyle={{padding:'10px'}} className="cardCli">{chiAry}</Card>)

    }
    return ary
  }


  return(
    <div>
      <h3>排房结果</h3>
      {creatCard()}
    </div>
  )
}

class RowHouses extends React.Component{

  constructor(props) {
    super(props);

    this.state={
      currSelect:''
    }
  }

  selectFun(index){
    console.log(index)
    this.setState({
      currSelect:index
    })
  }

  handleOk(){
    this.props.dispatch({
      type: 'roomStatusManagement/setRowHousesVisible',
      payload: false
    });
  }

  handleCancel(){
    this.props.dispatch({
      type: 'roomStatusManagement/setRowHousesVisible',
      payload: false
    });
  }

  render(){
    const {packageAry,resultsRowHouses, RowHousesVisible} = this.props.users;
    const SearchFormDiv = Form.create()(SearchForm)
    return(
      <Modal

        className="RowHouses"
        width="1000px"
        visible={RowHousesVisible}
        title="一键排房"
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
      >
        <SearchFormDiv packageAry={packageAry} dispatch={this.props.dispatch}/>
        <SearResults selectFun={this.selectFun.bind(this)} currSelect={this.state.currSelect} resultsRowHouses={resultsRowHouses}/>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.roomStatusManagement,
    loading: state.loading,
  };
}

export const AddCustomerModal = connect(mapStateToProps)(addCustomer) ;
export const RowHousesModal = connect(mapStateToProps)(RowHouses) ;
