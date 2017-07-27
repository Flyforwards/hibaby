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
  InputNumber,
  Spin
} from 'antd'
import {routerRedux} from 'dva/router';

const { MonthPicker } = DatePicker;

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

function textforkey(array,value,valuekey = 'name') {
  if(array){
    for (let i = 0 ;i<array.length ;i++){
      let dict = array[i];
      if(dict['id'] === value){
        return  dict[valuekey];
      }
    }
  }
  else {
    return value
  }
}


function CustomerSearch(props) {
  const {getFieldDecorator} = props.form;
  const {dispatch,shipCards,packageAry} = props;
  const searchAry = [
    [{title:'年龄',component:'InputNumber',submitStr:'age1'},
      {component:'InputNumber',submitStr:'age2'}],
    {title:'预产期',component:'MonthDate',submitStr:'dueDate'},
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

  const options = shipCards.map((record) => {
    return (<Option key={record.id} value={record.id}>{record.name}</Option>)
  });

  const purchasePackageOptions = packageAry.map((record) => {
    return (<Option key={record.id} value={record.id}>{record.name}</Option>)
  });

  function creatComponent(dict) {

    let formItemLayout = dict.title ? {labelCol: {span: 8},wrapperCol: {span: 16}} : {labelCol: {span: 0},wrapperCol: {span: 24}}

    return(
      <FormItem {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr)
        (
          dict.selectName?(
            dict.submitStr === 'member'?<Select className='antCli' placeholder='请选择'>{options}</Select>:(
                dict.submitStr === 'purchasePackage'?<Select className='antCli' placeholder='请选择'>{purchasePackageOptions}</Select>:
                  <DictionarySelect className='antCli' placeholder="请选择" selectName={dict.selectName}/>
              )
          )
            :
            ( dict.component  === 'Date'?
                <DatePicker style={{width: '100%'}}/>:
                (dict.component  === 'MonthDate')?
                  <MonthPicker style={{width: '100%'}}/>:
              (
                dict.component  === 'Input'? <Input style={{height:dict.submitStr === 'sear'?'40px':'32px'}} placeholder={dict.submitStr === 'sear' ? '输入客户编号、客户姓名、联系方式、合同编号':"请填写"} className='antCli'/>
                  :<InputNumber min={1} max={100}/>
              )

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
      searchChiAry.push(<Row key={i}>{tempChiAry}</Row>)
      tempChiAry = [];
    }

    if(i === 0){

      tempChiAry.push (
        <Col  key={dict[0].submitStr} span={4}>
          <Row><Col span={19} offset={5}>
            {creatComponent(dict[0])}
          </Col></Row>
        </Col>,
        <Col key={dict[1].submitStr} span={2}>
          <Row><Col span={23} offset={1}>
            {creatComponent(dict[1])}
          </Col></Row>
        </Col>
      )
    }
    else {
      tempChiAry.push (
        <Col key={dict.submitStr} span={6}>
          {creatComponent(dict)}
        </Col>
      )
    }
  }
  if(tempChiAry.length < 4){
    searchChiAry.push(<Row key={searchAry.length}>{tempChiAry}</Row>)
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
              if(key === 'dueDate'){
                param.year = value.format('YYYY');
                param.month = value.format('M');
              }
              else{
                param[key] = value.format();
              }
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

  const searBar = creatComponent({component:'Input',submitStr:'sear'})

  const HeadSrarch = () =>{
    return(
      <Row>
        <Col offset={1} span={17}>{searBar}</Col>
        <Col offset={1} span={5}>
          <Row><Col>
            <Button onClick={ reset} style={{float:'right'}} className='button-group-1'>重置</Button>
            <Button onClick={ onSearch} style={{float:'right',marginRight:'10px'}} className='button-group-2'>查询</Button>
          </Col></Row>
        </Col>
      </Row>
    )
  }

  return(
    <div>
      {HeadSrarch()}
      {searchChiAry}
    </div>
  )
}

function CustomerTable({props,loading,selectCustomerFun,dispatch,selectItem,permissionAlias}) {
  const {allCusList,pagination,monthStateCustomers,fetusAry,packageAry} = props
  const columns = [{title: '客户姓名', dataIndex: 'name',key: 'name'},
    {title: '年龄',dataIndex: 'age',key: 'age'},
    {title: '预产期',dataIndex: 'dueDate',render: (record) => {
        return moment(record).format("YYYY-MM-DD")
      }
    },
    {title: '怀孕周期',dataIndex: 'gestationalWeeks',key: 'gestationalWeeks'},
    {title: '第几胎', dataIndex: 'fetus', key: 'fetus',render:(record)=>{
      return textforkey(fetusAry,record)
    }},
    {title: '联系方式', dataIndex: 'contact', key: 'contact'},
    {title: '购买套餐', dataIndex: 'purchasePackage', key: 'purchasePackage',render:(record)=>{
      return textforkey(packageAry,record)
    }},
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

  function disabled(value) {
    let disabled = false;
    monthStateCustomers.map((item)=>{

      if(((item.customerId || item.id) === (value.id||value.customerId)) && (!item.edit && !item.change)){
        disabled = true;
      }
    })
    return disabled;
  }

  for(let j = 0;j< allCusList.length;j++) {
    const subDict = allCusList[j];
    subDict.key = j;
  }


  let ary = [];
  for(let i = 0;i< selectItem.length;i++){
    const dict = selectItem[i];
    if(dict){
      for(let j = 0;j< allCusList.length;j++) {
        const subDict = allCusList[j];
        if (((subDict.id || subDict.customerId) == ( dict.id||dict.customerId)) && !dict.change){
          ary.push(j);
          break;
        }
      }
    }

  }

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

    onSelect: (record, selected, selectedRows) => {

      selectCustomerFun(record,selected);
    },
    getCheckboxProps: (record) =>
      {
        return(
          {disabled:record.purchasePackage? disabled(record):true}
        )
    },
    selectedRowKeys:ary
  };

  function onClose(record) {
    selectCustomerFun(record,false);

  }

  let tags = [];
  if(selectItem){

    for(let i = 0;i<selectItem.length;i++){
      const dict = selectItem[i] ;

      if(!dict.change){
        let flag = !disabled(dict);
        tags.push(<Tag key={dict.customerId || dict.id} closable={flag} onClose={()=>{onClose(dict)}}>{dict.customerName||dict.name}</Tag>)

      }
    }
  }

  return(
    <Card bodyStyle={{padding:'10px'}} title="预约客户">
      <Card bodyStyle={{padding:'10px', paddingTop:0}} >
        {tags}
      </Card>
      <Table className="CustomerTable" rowSelection={rowSelection} {...tableProps}/>
    </Card>
  )

}

const CusSearchFormDiv = Form.create()(CustomerSearch);

//添加客户
class addCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      selectItem:'',
    }
  }

  componentDidMount(){
    this.setState({
      selectItem:[...this.props.users.monthStateCustomers],
    })
    this.props.dispatch({type: 'roomStatusManagement/getCustomerPage'});
  }

  handleOk(){
    let ary = [...this.state.selectItem];

    for(let i = 0;i<ary.length;i++){
      const dict = ary[i];
      if (dict.id){
        dict.customerId = dict.id;
        dict.customerName = dict.name;
        dict.reserveDays = 28;
        dict.edit = true;
      }
    }

    this.props.dispatch({type: 'roomStatusManagement/setMonthStatusCustomers',payload:{data:ary}});
    this.props.dispatch({type: 'roomStatusManagement/setCustomerVisible', payload: false});
  }

  handleCancel(){
    this.props.dispatch({type: 'roomStatusManagement/setCustomerVisible', payload: false});
  }

  selectCustomerFun(record,selected){
    let ary = this.state.selectItem ;
    if(selected){
      ary.push(record)
    }
    else {
      for(var i=0; i<ary.length; i++) {
        const dict = ary[i]

        if((dict.customerId||dict.id) == (record.id||record.customerId)) {
          ary.splice(i, 1);
        }
      }

    }
    this.setState({selectItem:ary})
  }

  render(){
    const {CustomerVisible} = this.props.users;
    const {permissionAlias} = this.props;


    return(
      <Modal
        className="addCustomer"
        width="1000px"
        visible={CustomerVisible}
        title="预约"
        maskClosable
        closable={false}
        onCancel={this.handleCancel.bind(this)}
        footer={[
          <Button className='button-group-bottom-1' onClick={this.handleCancel.bind(this)}>取消</Button>,
          <Button className='button-group-bottom-2' onClick={this.handleOk.bind(this)}> 确定</Button>
        ]}

      >
        <CusSearchFormDiv packageAry={this.props.users.packageAry} shipCards={this.props.users.shipCards} dispatch={this.props.dispatch}/>
        <CustomerTable
          selectItem={this.state.selectItem}
          selectCustomerFun={(record,selected)=>{this.selectCustomerFun(record,selected)}}
          loading={this.props.loading} props={this.props.users} dispatch={this.props.dispatch} permissionAlias={permissionAlias} />
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
          {getFieldDecorator(dict.subMitStr,{ rules: [{ required:(dict.subMitStr === 'packageInfoId'?false: true),  message: `请输入${dict.title || '此项'}!`}],})
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
                  <InputNumber style={{height:'32px'}} min={1} max={365} placeholder="请填写" className='antCli'/>
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
        <Col offset={13} span={3}><Button style={{float:'right'}} className='button-group-2' onClick={ onSearch}>查询</Button></Col>
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

        chiAry.push(<span style={{lineHeight:'30px'}} key={j}>{j>0?' --> ':''} {chiDict.roomNo}  停留天数{chiDict.stayDay}</span>)
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
    this.setState({
      currSelect:''
    })

    this.props.dispatch({
      type: 'roomStatusManagement/setRowHousesVisible',
      payload: false
    });
  }

  render(){
    const {packageAry,resultsRowHouses, RowHousesVisible} = this.props.users;
    const {loading} = this.props;
    return(

      <Modal
        className="RowHouses"
        width="1000px"
        visible={RowHousesVisible}
        title="一键排房"
        maskClosable
        closable={false}
        onCancel={this.handleCancel.bind(this)}

        footer={[
          <Button className='button-group-bottom-1' onClick={this.handleCancel.bind(this)}>取消</Button>,
          <Button className='button-group-bottom-2' onClick={this.handleOk.bind(this)}>确定</Button>,
        ]}
      >
        <SearchFormDiv packageAry={packageAry} dispatch={this.props.dispatch}/>
        <Spin
          spinning={loading.effects['roomStatusManagement/arrangeRoom'] !== undefined ? loading.effects['roomStatusManagement/arrangeRoom'] : false}>
          <SearResults selectFun={this.selectFun.bind(this)} currSelect={this.state.currSelect} resultsRowHouses={resultsRowHouses}/>
        </Spin>
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
      onCancel={handleCancel}
      footer={[
        <Button className='button-group-bottom-1' key="back" onClick={handleCancel}>取消</Button>,
      ]}
    >
      <h3>请选择此客户的排房方式</h3>
      <Button type="primary" style={{marginRight:'10px'}} className='button-group-1' onClick={()=>handleCancel()}>手动排房</Button>
      <Button type="primary" className='button-group-1' onClick={()=>autoRowHouses()}>自动排房</Button>
    </Modal>
  )
}

function mapStateToProps(state) {
  const { permissionAlias } = state.layout;

  return {
    users: state.roomStatusManagement,
    loading: state.loading,
    permissionAlias
  };
}

export const RowHousesWayModal = connect(mapStateToProps)(RowHousesWay) ;
export const AddCustomerModal = connect(mapStateToProps)(addCustomer) ;
export const RowHousesModal = connect(mapStateToProps)(RowHouses) ;
