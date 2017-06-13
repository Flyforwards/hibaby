"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import {Link,routerRedux} from 'react-router'
import {Button,Row, Col,pagination,Form,Select,Input} from 'antd'
import DictionarySelect from 'common/dictionary_select';

const Option = Select.Option;
const FormItem = Form.Item;

function SearchBar(props) {

  const { getFieldDecorator }= props.form;
  const {isSearch,onSearch} = props;

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };


  function cusFromItem(dict) {
    return(
      <FormItem uid={dict.submitStr} {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr,{rules: [{ required: isSearch?false:true,  message: `请选择${dict.title}!`}],})(
          <DictionarySelect className='antCli' placeholder="请选择" selectName={dict.selectName}/>
        )}
      </FormItem>
    )
  }

  const searchAry = [
    {title:'主副楼',submitStr:'building',selectName:'MainFloor'},
    {title:'楼层',submitStr:'floor',selectName:'Floor'},
    {title:'区域',submitStr:'region',selectName:'Area'},
    {title:'朝向',submitStr:'orientation',selectName:'Toward'}
  ];


  let searchDiv = [];

  for(let i = 0;i<searchAry.length;i++){
    searchDiv.push(<Col span={8}>{cusFromItem(searchAry[i])}</Col>  )
  }

  function reset() {
    props.form.resetFields();
    onSearch();
  }

  if(isSearch){
    searchDiv.push(
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
  else{
    searchDiv.unshift(
      <Col span={8}>
        <FormItem {...formItemLayout} label='房间号'>
          {getFieldDecorator('roomNo',{rules: [{ required: isSearch?false:true,  message: '请输入房间号！'}]})(
            <Input className='antCli' placeholder="请填写"/>
          )}
        </FormItem>
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
        {searchDiv[3]}
        {searchDiv[4]}
      </Row>

    </div>
  )
}


const SearchDiv = Form.create()(SearchBar);

export default (SearchDiv);
