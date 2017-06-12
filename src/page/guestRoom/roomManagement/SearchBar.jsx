"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import {Link} from 'react-router'
import {Button,Row, Col,pagination,Form,Select} from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;


function SearchBar(props) {

  const { getFieldDecorator }= props.form;
  const {isSearch} = props;

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

  const searchAry = [
    {title:'主副楼',submitStr:'building'},
    {title:'楼层',submitStr:'floor'},
    {title:'区域',submitStr:'region'},
    {title:'朝向',submitStr:'orientation'}
  ];

  let searchDiv = [];

  for(let i = 0;i<searchAry.length;i++){
    searchDiv.push(cusFromItem(searchAry[i]))
  }

  function onSearch() {

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(routerRedux.push({
          type: 'roomManagement/listByPage',
          query: values
        }))
      }
    })
  }

  function reset() {
    props.form.resetFields();
    onSearch();
  }

  const divArray = [<Col span={8}>{searchDiv[3]}</Col>];
  if(isSearch){
    divArray.push(
      <Col span={16}>
        <Row>
          <Col offset={9} span={5}>
            <Button onClick={ onSearch} style={{width:'136px',height:'40px',lineHeight:'40px',backgroundColor:'rgba(255, 102, 0, 1)',color:'#ffffff'}}>查询</Button>
          </Col>
          <Col span={5}>
            <Button onClick={ reset} style={{width:'136px',height:'40px',lineHeight:'40px',backgroundColor:'rgba(255, 0, 0, 1)',color:'#ffffff'}}>重置</Button>
          </Col>
          <Col span={5}>
            <Link to="/chamber/creatroom"><Button style={{width:'136px',backgroundColor:'rgba(182, 114, 51, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>建立房间</Button></Link>
          </Col>
        </Row>
      </Col>
    )
  }


  return(
    <div className="searchDiv">
      <Row style={{height: 50,overflow:'hidden'}}>
        <Col span={8}>{searchDiv[0]}</Col>
        <Col span={8}>{searchDiv[1]}</Col>
        <Col span={8}>{searchDiv[2]}</Col>
      </Row>
      <Row style={{height: 50,overflow:'hidden'}}>
        {divArray}
      </Row>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    users: state.roomManagement,
  };
}

export default connect(mapStateToProps)(Form.create()(SearchBar));
