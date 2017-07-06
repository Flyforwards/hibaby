"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import {Link,routerRedux} from 'react-router'
import {Button,Row, Col,pagination,Form,Input} from 'antd'
import DictionarySelect from 'common/dictionary_select';
const FormItem = Form.Item;

function SearchBar(props) {

  const { getFieldDecorator }= props.form;
  const {isSearch,onSearch,supProps,isDetail} = props;
  let {MainFloorAry,FloorAry,AreaAry,TowardAry} = ''
  if (supProps){
    MainFloorAry = supProps.MainFloorAry;
    FloorAry = supProps.FloorAry;
    AreaAry = supProps.AreaAry;
    TowardAry = supProps.TowardAry;
  }


  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
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

  function cusFromItem(dict) {
    return(
      <FormItem uid={dict.submitStr} {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr,{rules: [{ required: (isSearch||isDetail)?false:true,  message: `请选择${dict.title}!`}],initialValue:dict.initValue})(
          <DictionarySelect disabled={isDetail} labelInValue={true} className='antCli' placeholder="请选择" selectName={dict.selectName}/>
        )}
      </FormItem>
    )
  }


  const searchAry = [
    {title:'主副楼',submitStr:'building',selectName:'MainFloor',dataArray:MainFloorAry},
    {title:'楼层',submitStr:'floor',selectName:'Floor',dataArray:FloorAry},
    {title:'区域',submitStr:'region',selectName:'Area',dataArray:AreaAry},
    {title:'朝向',submitStr:'orientation',selectName:'Toward',dataArray:TowardAry}
  ];


  let searchDiv = [];

  for(let i = 0;i<searchAry.length;i++){
    let dict = searchAry[i];
    if (supProps){
      dict.initValue = {key: supProps.detailData[dict.submitStr], label: textforkey(dict.dataArray,supProps.detailData[dict.submitStr])};
    }
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
            <Link to="/chamber/room/creatroom"><Button style={{width:'136px',backgroundColor:'rgba(182, 114, 51, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>建立房间</Button></Link>
          </Col>
        </Row>
      </Col>
    )
  }
  else{
    searchDiv.unshift(
      <Col span={8}>
        <FormItem {...formItemLayout} label='房间号'>
          {getFieldDecorator('roomNo',{rules: [{ required: (isSearch||isDetail)?false:true,  message: '请输入房间号！'}],initialValue:supProps?supProps.detailData.roomNo:''})(
            <Input maxLength="10"  style={{height:'32px'}} disabled={isDetail} className='antCli' placeholder="请填写"/>
          )}
        </FormItem>
      </Col>
    )
  }


  return(
    <div className="searchDiv">
      <Row style={{clean:both,height: 50,overflow:'hidden'}}>
        {searchDiv[0]}
        {searchDiv[1]}
        {searchDiv[2]}
      </Row>
      <Row style={{clean:both,height: 50,overflow:'hidden'}}>
        {searchDiv[3]}
        {searchDiv[4]}
      </Row>

    </div>
  )
}


const SearchDiv = Form.create()(SearchBar);

export default (SearchDiv);
