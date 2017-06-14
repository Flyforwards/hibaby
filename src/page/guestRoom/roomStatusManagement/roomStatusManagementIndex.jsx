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

function ScreenBar(props) {
  const { getFieldDecorator }= props.form;
  const {packageAry} = props.users;

  function onSearch() {

  }

  function onChange(e) {

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

  const options = [
    { label: '全选', value: 'Apple' },
    { label: '空房', value: 'Pear' },
    { label: '维修', value: 'Orange' },
    { label: '脏房', value: '1' },
    { label: '样板房', value: '2' },
    { label: '住客房', value: '3' },
    { label: '入所', value: '4' },
    { label: '离所', value: '5' },
  ];

  return(
    <div className="ScreenBarDiv">
      <div className="headDiv">
        <Switch className='switchDiv' checkedChildren={'日房态'} unCheckedChildren={'月房态'} />
        <span className="titlespan">计划入住 <span style={{color:'rgb(0,185,156)'}}>12</span> 客人</span>
        <span className="titlespan">计划离所 <span style={{color:'rgb(247,171,63)'}}>8</span> 客人</span>
        <span className="titlespan">今日在所 <span style={{color:'rgb(243,106,105)'}}>8</span> 客人</span>

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

      </Card>


      <div className="radioDiv">
        <Card bodyStyle={{padding:'20px'}} style={{ width: '100%' }}>
          <h4>状态筛选</h4>
          <CheckboxGroup size="large" options={options}  onChange={onChange} />
        </Card>
      </div>
    </div>
  )
}

function CardArray() {
  function creatChiCard(index) {
    return(
      <Card className="smallCard" bodyStyle={{padding:'10px'}} title={1000+index} extra="空房">
        <p>客户姓名：王妙春</p>
        <p>母婴护理师：朱禹桥</p>
        <p>会员卡种：铂金会员</p>
        <p>会员卡号：a12345</p>
        <p>离所日期：2017-04-05</p>
        <Row className='bottomLine'>
          <Col span={8}><p>房间状态</p></Col>
          <Col offset={1} span={15}>
            <Select className='antCli'  placeholder='请选择'>

            </Select>
          </Col>
        </Row>
      </Card>
    )
  }

  let array = [];
  for (let i = 1;i<=15;i++){
    array.push(creatChiCard(i));
  }



  return(
    <div className="cardArrayDiv">
      {array}
    </div>
  )
}

class roomStatusIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const ScreenBarDiv = Form.create()(ScreenBar)
    return (
      <div className="roomStatusDiv">
        <ScreenBarDiv users = {this.props.users}></ScreenBarDiv>
        <CardArray/>
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
