/**
 * 对内婴儿游泳预约详情
 * Created by yangjingjing on 2017/8/23.
 */
import React, { Component } from 'react';
import {chiDetailComponent,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Row,Form,Col,Spin,DatePicker} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import moment from 'moment'
import { routerRedux,Link } from 'dva/router'


const assessment = [
  {title:'预约日期',component:'DatePicker',submitStr:'reservationDate'},
  {title:'预约时间',component:'Input',submitStr:'timeOfAppointment'},
  {title:'其他',component:'Input',submitStr:'other'},
  // {title:'操作人',component:'Input',submitStr:'operator'},
  // {title:'操作时间',component:'DatePicker',submitStr:'operatorTime'}
]



class Detail extends Component {

  constructor(props) {
    super(props);
  }

  editBtnClick(dict){
    this.props.dispatch(routerRedux.push(`/service/baby-swimming/edit?customerid=${parse(location.search.substr(1)).customerid}&dataId=${dict.id}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/baby-swimming'));
  }

  print(){

  }



  CreatDetailCard(dict) {


    assessment.map((subDict)=>{
      if(subDict.chiAry){
        subDict.initValue =subDict.chiAry[dict[subDict.submitStr]]
      }
      else {
        subDict.initValue = dict[subDict.submitStr]
      }
    })

    return (
      <Card title={'操作人：'+dict.operator+'   '+'操作时间：'+moment(dict.operatorTime).format('YYYY-MM-DD') }
            extra = {creatButton('编辑',()=>{this.editBtnClick(dict)})}
            bodyStyle={{ padding:'0 15px 0 15px'}} style={{marginTop:'5px', width: '100%' }}>
        {chiDetailComponent(assessment)}
      </Card>
    )
  }


  onChange(date, dateString) {

    let query = {customerid:parse(location.search.substr(1)).customerid}
    if(dateString){
      query.date = dateString
    }
    this.props.dispatch(routerRedux.push({
      pathname:location.pathname,
      query
    }));
  }


  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData'})
  }

  render() {
    const {loading,baseInfoDict,InsideBabySwimList} = this.props;

    let baseInfoDivAry = detailComponent(baseInfoDict);

    let detailCard = InsideBabySwimList ? (InsideBabySwimList).map((dict)=>{
      return this.CreatDetailCard(dict)
    }):''

    const bottomDiv =
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.backClicked.bind(this))}
        {creatButton('打印',this.print.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card  extra = {<DatePicker onChange={this.onChange.bind(this)}/>} className='bigDetailDiv' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
          {detailCard}
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
