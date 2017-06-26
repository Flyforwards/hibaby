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


let SELECT_CUSTOMER = ''

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
            <DictionarySelect className='antCli' placeholder="请选择" selectName={dict.selectName}/>
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
          <Row><Col span={22} offset={2}>
            {creatComponent(dict[0])}
          </Col></Row>
        </Col>,
        <Col span={2}>
          <Row><Col span={23} offset={1}>
            {creatComponent(dict[1])}
          </Col></Row>
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
    props.form.resetFields();
    onSearch()
  }

  function onSearch(e) {

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
        <Col offset={1} span={15}>{creatComponent({component:'Input',submitStr:'sear'})}</Col>
        <Col span={4}>
          <Row><Col span={23} offset={1}>
            <Button onClick={ reset} style={{
              width: '100%',
              height: '40px',
              lineHeight: '40px',
              backgroundColor: 'rgba(255, 0, 0, 1)'
            }}>重置</Button>
          </Col></Row>

        </Col>
        <Col span={4}>
          <Row><Col span={23} offset={1}>
            <Button onClick={ onSearch} style={{
            width: '100%',
            height: '40px',
            lineHeight: '40px',
            backgroundColor: 'rgba(255, 102, 0, 1)'}}>
              查询
            </Button>
          </Col></Row>

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

function CustomerTable({props,loading, selectedRowKeys,selectCustomerFun,dispatch}) {
  const {allCusList,pagination,defSelectCustomers} = props
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
      dispatch({type:'roomStatusManagement/getCustomerPage',payload:{page:page.current}})
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectCustomerFun(selectedRowKeys);
    },
    getCheckboxProps: (record) =>
      {
        let disabled = false;
        allCusList.map((item)=>{
          if(item.id == record.id){
            disabled = true;
          }
        })
        return(
          {disabled:disabled}
        )
    },
    selectedRowKeys
  };

  function onClose(e) {

  }

  let tags = [];
  if(selectedRowKeys){
    for(let i = 0;i<selectedRowKeys.length;i++){
      const dict = allCusList[selectedRowKeys[i]] ;
        tags.push(<Tag closable={defSelectCustomers.indexOf(selectedRowKeys[i]) === -1} onClose={onClose(selectedRowKeys[i])}>{dict.name}</Tag>)
    }
  }


  return(
    <Card bodyStyle={{padding:'10px'}} title="预约客户">
      <Card bodyStyle={{padding:'10px'}}>
        {tags}
      </Card>
      <Table  className="CustomerTable" rowSelection={rowSelection} {...tableProps}/>
    </Card>
  )

}

const CusSearchFormDiv = Form.create()(CustomerSearch);

//添加客户
class addCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      selectedRowKeys:null,
    }
  }

  componentDidMount(){
    this.props.dispatch({type: 'roomStatusManagement/getCustomerPage'});
  }

  handleOk(){
    this.handleCancel()
  }

  handleCancel(){
    this.props.dispatch({
      type: 'roomStatusManagement/setCustomerVisible',
      payload: false
    });
  }

  selectCustomerFun(selectedRowKeys){
    this.setState({selectedRowKeys:selectedRowKeys})
  }

  render(){
    const {CustomerVisible} = this.props.users;
    return(
      <Modal
        className="addCustomer"
        width="1000px"
        visible={CustomerVisible}
        title="预约"
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
      >
        <CusSearchFormDiv dispatch={this.props.dispatch}/>
        <CustomerTable
          selectedRowKeys={this.state.selectedRowKeys||this.props.users.defSelectCustomers}
          selectCustomerFun={(selectedRowKeys)=>{this.selectCustomerFun(selectedRowKeys)}}
          loading={this.props.loading} props={this.props.users} dispatch={this.props.dispatch}/>
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

        if (SELECT_CUSTOMER){
          param.customerId = SELECT_CUSTOMER.customerId;
          param.customerName = SELECT_CUSTOMER.customerName;
        }

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

const SearchFormDiv = Form.create()(SearchForm)


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
    return ary.length > 0 ? ary : <h2 className="noResults">没有符合条件的结果</h2>
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
    this.setState({
      currSelect:index
    })
  }

  handleOk(){
    const {resultsRowHouses} = this.props.users;

    if(this.state.currSelect === ''){
      message.error('请先选择一个方案')
      return;
    }

    if(!SELECT_CUSTOMER){
      message.error('请先选择一个客户')
      return;
    }

    this.handleCancel()

    this.props.dispatch({
      type: 'roomStatusManagement/monthRoomUpdate',
      payload: resultsRowHouses[this.state.currSelect].monthRoomUpdateList
    });


  }

  handleCancel(){
    SELECT_CUSTOMER = '';
    this.props.dispatch({
      type: 'roomStatusManagement/setRowHousesVisible',
      payload: false
    });
  }

  render(){
    const {packageAry,resultsRowHouses, RowHousesVisible} = this.props.users;
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

function RowHousesWay(props) {
  const {RowHousesWayVisible} = props.users;
  const selectCuntomer = props.selectCuntomer;
  SELECT_CUSTOMER = selectCuntomer;
  function handleCancel(){
    props.dispatch({
      type: 'roomStatusManagement/setRowHousesWayVisible',
      payload: false
    });
  }

  function autoRowHouses(){
    handleCancel()
    props.dispatch({
      type: 'roomStatusManagement/setRowHousesVisible',
      payload: true
    });
  }

  return(
    <Modal
      title="提示"
      className="RowHousesWay"
      visible={RowHousesWayVisible}
      closable={false}
      maskClosable
      footer={[
        <Button className='backBtn' key="back" onClick={handleCancel}>取消</Button>,
      ]}
    >
      <h3>请选择此客户的排房方式</h3>
      <Button type="primary" onClick={()=>handleCancel()}>手动排房</Button>
      <Button type="primary" onClick={()=>autoRowHouses()}>自动排房</Button>
    </Modal>
  )
}

function mapStateToProps(state) {
  return {
    users: state.roomStatusManagement,
    loading: state.loading,
  };
}

export const RowHousesWayModal = connect(mapStateToProps)(RowHousesWay) ;
export const AddCustomerModal = connect(mapStateToProps)(addCustomer) ;
export const RowHousesModal = connect(mapStateToProps)(RowHouses) ;
