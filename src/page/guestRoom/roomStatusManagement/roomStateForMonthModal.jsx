"use strict"

import React from 'react'
import {connect} from 'dva'
import DictionarySelect from 'common/dictionary_select';
import {
  Button,
  Card,
  Input,
  Tag,
  Row,
  Col,
  Form,
  DatePicker,
  Select,
  Modal,
  Table,
  message,
  InputNumber
} from 'antd'
import {routerRedux} from 'dva/router';
import './roomStatusManagementIndex.scss'
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
import {parse} from 'qs';


const formItemLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 17},
};

function CustomerSearch(props) {
  const {getFieldDecorator} = props.form;
  const {dispatch} = props;

  const searchAry = [
    [{title:'年龄',component:'Input',submitStr:'age1'},
      {component:'Input',submitStr:'age2'}],
    {title:'预产期',component:'Date',submitStr:'dueDate'},
    {title:'操作者2',component:'Input',submitStr:'operator'},
    {title:'会员身份',component:'Select',submitStr:'member',selectName:'MEMBER'},
    {title:'籍贯',component:'Input',submitStr:'placeOrigin'},
    {title:'第几胎',component:'Select',submitStr:'fetus',selectName:'FETUS'},
    {title:'意向套餐',component:'Select',submitStr:'intentionPackage',selectName:'IntentionPackage'},
    {title:'购买套餐',component:'Select',submitStr:'purchasePackage',selectName:'IntentionPackage'},
    {title:'孕周',component:'Input',submitStr:'gestationalWeeks'},
    {title:'宝宝生日',component:'Date',submitStr:'productionDate'},
    {title:'分娩医院',component:'Select',submitStr:'hospital',selectName:'Hospital'},
  ]

  function creatComponent(dict) {

    let formItemLayout = dict.title ? {labelCol: {span: 7},wrapperCol: {span: 17}} : {labelCol: {span: 0},wrapperCol: {span: 24}}

    return(
      <FormItem key={dict.submitStr} {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr)
        (
          dict.selectName?
            <Select className='antCli' placeholder="请选择" selectName={dict.selectName}/>
            :
            ( dict.component  === 'Date'?
                <DatePicker style={{width: '100%'}}/>:
                <Input min={1} max={365} placeholder="请填写" className='antCli'/>
            )
        )}
      </FormItem>
    )
  }


  let searchChiAry = [];
  let tempChiAry = [];

  for(let i = 0;i<searchAry.length;i++){
    const dict = searchAry[i];
    if((i%4) === 0){
      searchChiAry.push(<Row>{tempChiAry}</Row>)
      tempChiAry = [];
    }

    if(i === 0){

      tempChiAry.push (
        <Col span={4}>
          {creatComponent(dict[0])}
        </Col>,
        <Col span={2}>
          {creatComponent(dict[1])}
        </Col>
      )
    }
    else {
      tempChiAry.push (
        <Col span={6}>
          {creatComponent(dict)}
        </Col>
      )
    }
  }
  if(tempChiAry.length < 4){
    searchChiAry.push(<Row>{tempChiAry}</Row>)
  }


  function reset() {

  }

  function onSearch(e) {
    e.preventDefault();

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
          type: 'roomStatusManagement/getCustomerPage',
          payload: param,
        });
      }
    })
  }


  function HeadSrarch() {
    return(
      <Row>
        <Col span={16}>{creatComponent({component:'Input',submitStr:'sear'})}</Col>
        <Col span={4}>
          <Button onClick={ reset} style={{
            width: '100%',
            height: '40px',
            lineHeight: '40px',
            backgroundColor: 'rgba(255, 0, 0, 1)'
          }}>重置</Button>
        </Col>
        <Col span={4}>
          <Button onClick={ onSearch} style={{
          width: '100%',
          height: '40px',
          lineHeight: '40px',
          backgroundColor: 'rgba(255, 102, 0, 1)'}}>
            查询
          </Button>
        </Col>
      </Row>
    )
  }

  return(
    <div>
      <HeadSrarch/>
      {searchChiAry}
    </div>
  )
}

function CustomerTable({props,loading,selectCustomer,selectCustomerFun}) {
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
      selectCustomerFun(selectedRows);
    },
  };

  let tags = [];

  for(let i = 0;i<selectCustomer.length;i++){
    const dict = selectCustomer[i];
    tags.push(<Tag closable onClose={dict.name.id}>{dict.name}</Tag>)
  }

  return(
    <Card bodyStyle={{padding:'10px'}} title="预约客户">
      <Card bodyStyle={{padding:'10px'}}>
        {tags}
      </Card>
      <Table rowSelection={rowSelection} {...tableProps}/>
    </Card>
  )

}

//添加客户
class addCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      selectCustomer:[]
    }
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

  selectCustomerFun(array){
    console.log(array)
    this.setState({selectCustomer:array})
  }

  render(){
    const {CustomerVisible} = this.props.users;
    const SearchFormDiv = Form.create()(CustomerSearch)
    return(
      <Modal
        className="addCustomer"
        width="1000px"
        visible={CustomerVisible}
        title="预约"
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
      >
        <SearchFormDiv dispatch={this.props.dispatch}/>
        <CustomerTable selectCustomer={this.state.selectCustomer} selectCustomerFun={(array)=>{this.selectCustomerFun(array)}} loading={this.props.loading} props={this.props.users}/>
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
    handleCancel()
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
