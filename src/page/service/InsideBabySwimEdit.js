/**
 * 对内婴儿游泳预约编辑页
 * Created by yangjingjing on 2017/8/23.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

const assessment = [
  {title:'预约日期',component:'DatePicker',submitStr:'reservationDate'},
  {title:'预约时间',component:'DatePicker',submitStr:'timeOfAppointment'},
  {title:'其他',component:'Input',submitStr:'other'},
  {title:'操作人',component:'Input',submitStr:'operator'},
  {title:'操作时间',component:'DatePicker',submitStr:'operatorTime'}
]
class Detail extends Component {

  constructor(props) {
    super(props);
  }

  onDelete(){
    this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:1,dataId:this.props.CheckBeforeID}})
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/${this.state.urlAddress}/detail?customerid=${parse(location.search.substr(1)).customerid}`));
  }

  print(){

  }

  submitClicked(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        Object.keys(values).map(key=>{
          if(typeof values[key] === 'object'){
            values[key] = values[key].format()
          }
        })

        const tempDict = parse(location.search.substr(1));

        let dict = { ...values, "customerId": tempDict.customerid};
        if(tempDict.dataId){
          dict.id = tempDict.dataId
        }

        let typeStr = 'serviceCustomer/saveInsideBabySwim'

        this.props.dispatch({type:typeStr,payload:dict})
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {

    const {loading,baseInfoDict,InsideBabySwimData} = this.props


    let baseInfoDivAry = detailComponent(baseInfoDict)

    const bottomDiv =
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='detailDiv' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
          {CreatCard(this.props.form,{title:'对内婴儿游泳预约',ary:assessment,netData:InsideBabySwimData?InsideBabySwimData:{}})}
          {bottomDiv}
        </Card>
      </Spin>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(DetailForm) ;
