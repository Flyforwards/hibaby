"use strict"

import React from 'react'
import {connect} from 'dva'
import {Button,Card,Checkbox,Row,Col,Form,Select} from 'antd'
import { routerRedux } from 'dva/router';
import './roomStatusManagementIndex.scss'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;

function ScreenBar(props) {
  const { getFieldDecorator }= props.form;

  function onSearch() {

  }

  function onChange(e) {

  }

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  function cusFromItem(dict) {
    return(
      <FormItem uid={dict.submitStr} {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr)(
          <Select className='antCli' placeholder='请选择'>{dict.children}</Select>
        )}
      </FormItem>
    )
  }


  const selectData = [
    {title: '主副楼', submitStr: 'building', },
    {title: '楼层', submitStr: 'floor', },
    {title: '区域', submitStr: 'region',},
    {title: '朝向', submitStr: 'orientation'},
    {title: '套餐', submitStr: 'name'},
    {title: '套餐', submitStr: 'date'},
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
        <div className="switchDiv">
          <span>
            月
            <br/>
            房态
          </span>
        </div>

          <Row className="statisticalDiv">
            <Col span={8}><span>计划入住 <span style={{color:'yellow'}}>12</span> 客人</span></Col>
            <Col span={8}><span>计划离所 <span style={{color:'green'}}>8</span> 客人</span></Col>
            <Col span={8}><span>今日在所 <span style={{color:'red'}}>8</span> 客人</span></Col>
          </Row>
        <Button className='btn' onClick={ onSearch} style={{width:'136px',height:'40px',lineHeight:'40px',backgroundColor:'rgba(255, 102, 0, 1)',color:'#ffffff'}}>查询</Button>
      </div>
      <div className="SelectDiv">
        <Row style={{height: 50,overflow:'hidden'}}>
          {searchDiv[0]}
          {searchDiv[1]}
          {searchDiv[2]}
        </Row>
        <Row style={{height: 50,overflow:'hidden'}}>
          {searchDiv[3]}
          {searchDiv[4]}
          {searchDiv[5]}
        </Row>
      </div>
      <div className="radioDiv">
        <Card title="状态筛选"  style={{ width: '100%' }}>
          <CheckboxGroup options={options}  onChange={onChange} />
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
        <ScreenBarDiv></ScreenBarDiv>
        <CardArray/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.roomManagement,
  };
}

export default connect(mapStateToProps)(roomStatusIndex) ;
