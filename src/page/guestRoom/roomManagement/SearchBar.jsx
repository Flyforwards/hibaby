"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import {Link,routerRedux} from 'react-router'
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
    searchDiv.push(<Col span={8}>{cusFromItem(searchAry[i])}</Col>  )
  }

  function onSearch() {

    props.form.validateFields((err, values) => {
      if (!err) {
        props.dispatch(routerRedux.push({
          pathname: '/chamber/roomindex',
          query: values
        }))
      }
    })
  }

  function reset() {
    props.form.resetFields();
    onSearch();
  }

  const divArray = [searchDiv[3]];
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
        {searchDiv[0]}
        {searchDiv[1]}
        {searchDiv[2]}
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
