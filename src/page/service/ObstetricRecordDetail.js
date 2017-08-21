/**
 *  婴儿护理记录单详情
 * Created by yangjingjing on 2017/8/21.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

const assessment = [
  {title:'体温',component:'Input',submitStr:'temperature',unit:'℃'},
  {title:'脉搏',component:'Input',unit:'ml',submitStr:'pulse',unit:'次/分'},
  {title:'呼吸',component:'Input',submitStr:'breathing',unit:'次/分'},
  {title:'体重',component:'Input',submitStr:'weight',unit:'g'},
  {title:'身长',component:'Input',submitStr:'length',unit:'cm'},
  {title:'脐带',component:'Input',submitStr:'umbilicalCord'},
  {title:'黄疸',component:'Input',unit:'mg/dl',submitStr:'jaundice'},
  {title:'托管状态',component:'Select',chiAry:['托管','未托管'],submitStr:'towState'},
  {title:'托管起始',component:'Input',submitStr:'towStart'},
  {title:'操作人',component:'Input',submitStr:'operator'},
  {title:'操作时间',component:'DatePicker',submitStr:'operatorTime'}
]



class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  onDelete(){
    this.props.dispatch({type:'serviceCustomer/DelAssessment',payload:{type:1,dataId:this.props.CheckBeforeID}})
  }

  editBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/baby-nursing/edit?${location.search.substr(1)}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/baby-nursing'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/baby-nursing/detail?${location.search.substr(1)}`));
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
        const assessmentInfo =  JSON.stringify(values);

        let dict = { "assessmentInfo": assessmentInfo, "customerId": parse(location.search.substr(1)).customerid,"type": 6};

        if(this.props.CheckBeforeID){
          dict.id = this.props.CheckBeforeID
        }
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
  }

  render() {

    const {loading,baseInfoDict} = this.props
    let baseInfoDivAry = detailComponent(baseInfoDict)

    const bottomDiv = location.pathname === '/service/baby-nursing/edit' ?
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div> :
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.backClicked.bind(this))}{this.props.CheckBeforeData?creatButton('删除',this.onDelete.bind(this)):''}
        {creatButton('编辑',this.editBtnClick.bind(this))}{creatButton('打印',this.print.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
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
