"use strict"

import React from 'react'
import './roomManagementIndex.scss'
import {routerRedux} from 'react-router'
import {Button,Row, Col,Form,Input} from 'antd'

import DictionarySelect from 'common/dictionary_select';
import PermissionLink from '../../../common/PermissionLink';
import fileUpload from '../../crm/customer/fileUpload'
const FormItem = Form.Item;

function websiteManageHead(props) {

  const { getFieldDecorator }= props.form;

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
        <div className='option-list'>
          <Button onClick={ onSearch} className='button-group-2'>查询</Button>
          <Button onClick={ reset} className='button-group-1'>重置</Button>
          {/*<Link to="/chamber/room/creatroom"><Button className='button-group-3'>建立房间</Button></Link>*/}
          <PermissionLink testKey='ROOM_ADD'  to="/chamber/room/creatroom"><Button className='button-group-3'>建立房间</Button></PermissionLink>

        </div>
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


const websiteManageHeadDiv = Form.create()(websiteManageHead);

export default (websiteManageHeadDiv);

