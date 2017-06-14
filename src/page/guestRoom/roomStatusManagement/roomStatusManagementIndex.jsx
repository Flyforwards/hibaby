"use strict"

import React from 'react'
import {connect} from 'dva'
import {Button,Card,Checkbox,Row,Col,Form,DatePicker,Select,Switch} from 'antd'
import { routerRedux } from 'dva/router';
const { MonthPicker } = DatePicker;
import './roomStatusManagementIndex.scss'
import DictionarySelect from 'common/dictionary_select';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;

const statusDict = {0 :'空房',1: '维修', 2 :'脏房', 3 :'样板房', 4 :'住客房', 5 :'入所', 6 :'出所', 7 :'预约'}


function ScreenBar(props) {
  const { getFieldDecorator }= props.form;
  const {dayStatusData,statusChange,packageAry,selectValue} = props;

  function  onSearch(){
    props.form.validateFields((err, values) => {
      if (!err) {
        let param = {};
        Object.keys(values).map((key) => {
          const value = values[key];
          if(value){
            param[key] = value;
          }
        })
        props.dispatch(routerRedux.push({
          pathname: '/chamber/roomstatusindex',
          query: param
        }))
      }
    })
  }

  function reset() {
    props.form.resetFields();
    onSearch();
  }

  function onChange(e) {
    statusChange(e)
  }

  let packageChi = [];

  for (let i = 0; i < packageAry.length ; i++) {
    packageChi.push(<Option key={packageAry[i].id}>{packageAry[i].name}</Option>);
  }

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  function cusFromItem(dict) {
    return(
      <FormItem uid={dict.submitStr} {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr)
        (
          dict.selectName?
            (dict.selectName === 'package' ?
              <Select placeholder="请选择" className='antCli'>
                {packageChi}
              </Select>
              :
              <DictionarySelect className='antCli' placeholder="请选择" selectName={dict.selectName}/>
            )
            :
            <MonthPicker  style={{width: '100%' }}/>
        )}
      </FormItem>
    )
  }

  const selectData = [
    {title:'主副楼',submitStr:'building',selectName:'MainFloor'},
    {title:'楼层',submitStr:'floor',selectName:'Floor'},
    {title:'区域',submitStr:'region',selectName:'Area'},
    {title:'朝向',submitStr:'orientation',selectName:'Toward'},
    {title: '套餐', submitStr: 'packageInfoId',selectName:'package'},
    {title: '日期', submitStr: 'useDate'},
  ]

  let searchDiv = [];

  for(let i = 0;i<selectData.length;i++){
    searchDiv.push(<Col span={8}>{cusFromItem(selectData[i])}</Col>)
  }
  const options = [];
  options.push({label:'全选',value:'all'})
  Object.keys(statusDict).map((key)=>{
    options.push({label:statusDict[key],value:key})
  })

  return(
    <div className="ScreenBarDiv">
      <div className="headDiv">
        <Switch className='switchDiv' checkedChildren={'日房态'} unCheckedChildren={'月房态'} />
        <span className="titlespan">计划入住 <span style={{color:'rgb(0,185,156)'}}>{dayStatusData.beginCount}</span> 客人</span>
        <span className="titlespan">计划离所 <span style={{color:'rgb(247,171,63)'}}>{dayStatusData.endCount}</span> 客人</span>
        <span className="titlespan">今日在所 <span style={{color:'rgb(243,106,105)'}}>{dayStatusData.useCount}</span> 客人</span>

      </div>

      <Card className="SelectDiv" bodyStyle={{padding:'20px'}}>
          <Row style={{height: 50,width:'800px', overflow:'hidden',float:'left'}}>
            {searchDiv[0]}
            {searchDiv[1]}
            {searchDiv[2]}
          </Row>
        <Row style={{height: 50,width:'800px', overflow:'hidden',float:'left'}}>
            {searchDiv[3]}
            {searchDiv[4]}
            {searchDiv[5]}
          </Row>
        <Button className='btn' onClick={ onSearch}>查询</Button>
        <Button className='btn' onClick={ reset}>重置</Button>
      </Card>


      <div className="radioDiv">
        <Card bodyStyle={{padding:'20px'}} style={{ width: '100%' }}>
          <h4>状态筛选</h4>
          <CheckboxGroup value={selectValue} options={options}  onChange={onChange} />
        </Card>
      </div>
    </div>
  )
}

function CardArray({roomList}) {
  const chiAry = [1,2,3];

  function creatChiCard(dict) {

    let chiDivAry = [];

    for (let i = 0; i < chiAry.length ; i++) {
      chiDivAry.push(<Option key={i}>{statusDict[i]}</Option>);
    }

    let chiDiv = <div>
      <h1>{statusDict[ dict.status]}</h1>
    </div>

    if(dict.status === 4 || dict.status === 6){
      chiDiv = <div>
        <p>客户姓名：{dict.customerConsume.customerName}</p>
        <p>母婴护理师：朱禹桥</p>
        <p>会员卡种：{dict.customerConsume.membershipCardName}</p>
        <p>会员卡号：{dict.customerConsume.membershipCardId}</p>
        <p>离所日期：{dict.endDate}</p>
      </div>
    }

    return(
      <Card className="smallCard" bodyStyle={{padding:'10px'}} title={dict.roomNo} extra={statusDict[ dict.status]}>
        {chiDiv}
        <Row className='bottomLine'>
          <Col span={7}><p>房间状态</p></Col>
          <Col span={17}>
            <Select className='antCli'  placeholder='请选择'>
              {chiDivAry}
            </Select>
          </Col>
        </Row>
      </Card>
    )
  }

  let array = [];
  if(roomList){
    for (let i = 0;i<roomList.length;i++){
      array.push(creatChiCard(roomList[i]));
    }
  }


  return(
    <div className="cardArrayDiv">
      {array}
    </div>
  )
}

let isAll = false;

class roomStatusIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    roomList:'',
    selectValue:'',
  }


  statusChange(array){
    if(isAll){
      isAll = false;
      if(array.indexOf('all') != -1){
        array.map((value,index)=>{
          if(value== 'all') {
            array.splice(index, 1);
          }
        })

      }
      else{
        array=''
      }
    }
    else {
      if(array.indexOf('all') != -1){
        isAll = true;
        array=['all',0,1,2,3,4,5,6,7]
      }
    }

    let listArray = [];

    for(let i = 0;i<this.props.users.dayStatusData.roomList.length;i++){
      const dict = this.props.users.dayStatusData.roomList[i];
      for(let j = 0 ;j< array.length;j++){
        if(dict.status == array[j]){
          listArray.push(dict);
          break;
        }
      }
    }

    this.setState({
      selectValue :array,
      roomList :listArray
    })
  }

  render() {
    const ScreenBarDiv = Form.create()(ScreenBar)
    return (
      <div className="roomStatusDiv">
        <ScreenBarDiv selectValue={this.state.selectValue} statusChange={this.statusChange.bind(this)} dayStatusData={this.props.users.dayStatusData} packageAry={this.props.users.dayStatusData}></ScreenBarDiv>
        <CardArray roomList={this.state.roomList||this.props.users.dayStatusData.roomList}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.roomStatusManagement,
  };
}

export default connect(mapStateToProps)(roomStatusIndex) ;
