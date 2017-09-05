/**
 * 退房通知单
 */

import React, { Component } from 'react';
import { Link} from 'react-router'
import { connect } from 'dva';
import {Button,Spin,Card,Form,Col} from 'antd';
import {CreatCard,creatButton} from './ServiceComponentCreat'
import { routerRedux } from 'dva/router'

function baseInfoDiv(props) {
  const {dispatch,baseInfoDict,CustomerInfoList} = props
  const PastMedicalHistoryAry = [
    {title:'通知内容',component:'Input',submitStr:'noticeInfo'},

  ]
  
  function onchange(e){
    dispatch({type:'serviceCustomer/getCustomerInfoByCustomerName',payload:{str:e}})
  }
  
  function onSelect(e){
    dispatch({type:'serviceCustomer/getCustomerInfoByCustomerId',payload:{dataId:e}})
  }
  
  let value = {ary:PastMedicalHistoryAry}
  value.baseInfoDict = baseInfoDict ? baseInfoDict : {}
  
  return (
    CreatCard(props.form,value)
  )
}


const BaseInfoDivForm = Form.create()(baseInfoDiv);

/**
 * 通知单
 */
class Detail extends Component {
  
  constructor(props) {
    super(props);
    this.state={babyDivAry:['baby1']}
  }
  
  
  editBackClicked(){
    this.props.dispatch(routerRedux.push('/service/send-message'));
    
    
  }
  
  submitClicked(){
    
    let dict = ''
    
    this.refs.BaseInfoDivForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).map(key=>{
          if(values[key]){
            if(typeof values[key] === 'object'){
              values[key] = values[key].format()
            }
          
            values.customerId = this.props.baseInfoDict.customerId
            values.name = this.props.baseInfoDict.name
            
          }
        })
        dict = values
        let departments = this.props.EndemicDeptList?this.props.EndemicDeptList.map((value)=>{
          return value.id
        }):''
        
        dict.departments = departments.join(",");
        
        this.props.dispatch({type:'serviceCustomer/sendCheckOutNotice',payload:dict})
      }
    });
    
    
  }
  
  
  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }
  
  render() {
    const {loading} = this.props
    
    const bottomDiv =
            <div className='button-group-bottom-common'>
              {creatButton('返回',this.editBackClicked.bind(this))}
              {creatButton('发送',this.submitClicked.bind(this))}
            </div>
    
    let departments = this.props.EndemicDeptList? this.props.EndemicDeptList.map((value)=>{
      return value.name
    }):[]
    
    let name = `默认发送至${departments.join(",")}部门`
    
    return (
      <Spin
        spinning={loading.effects['serviceCustomer/getCustomerInfoByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getCustomerInfoByCustomerId'] : false}>
        <Card  title="自由通知单" className='CheckBeforeInput' style={{width: '100%'}} bodyStyle={{padding: (0, 0, '20px', 0)}}>
          <BaseInfoDivForm {...this.props} ref="BaseInfoDivForm"/>
          <div style={{textAlign:'center'}}>{name}</div>
          
          {bottomDiv}
        </Card>
      </Spin>
    )
  }
}



function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(Detail) ;


