import React, { Component } from 'react';
import {chiDetailComponent,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Row,Form,Col,Spin,Table} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import moment from 'moment'
import { routerRedux,Link } from 'dva/router'


const assessment = [
  {title: '体温', key: 'temperature',unit:'℃'},
  {title: '脉搏',key: 'pulse',unit:'次/分'},
  {title: '体重',key: 'weight',unit:'Kg'},
  {title: '血压',key: 'bloodPressure',unit:'mmHg'},
  {title: '大便',key: 'shit',unit:'次数/天'},
  {title: '恶露',key: 'lochia',chiAry:['红/多','红/中', '淡红/少']},
  {title: '子宫收缩',key: 'uterusShrink',chiAry:['软','硬']},
  {title: '伤口',key: 'wound',chiAry:['正常','微红']},
  {title: '乳房',key: 'breast',chiAry:['正常','红','涨硬','痛']},
  {title: '乳头',key: 'papilla',chiAry:['正常','破皮', '结痂']},
  {title: '食欲',key: 'appetite',chiAry:['差','佳']},
  {title: '情绪评分',key: 'emotionScore'},
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
    this.props.dispatch(routerRedux.push(`/service/puerpera-body/edit?${location.search.substr(1)}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/puerpera-body'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/puerpera-body/detail?${location.search.substr(1)}`));
  }

  print(){

  }

  CreatDetailCard(dict) {
    assessment.map((subDict)=>{
      if(subDict.chiAry){
        subDict.initValue =subDict.chiAry[dict[subDict.key]]
      }
      else {
        subDict.initValue = dict[subDict.key]
      }
    })

    return (
      <Card bodyStyle={{ padding:'0 15px 0 15px'}} style={{ width: '100%' }}>
        {chiDetailComponent(assessment)}
        <Row>
          <Col span={12}/>
          {chiDetailComponent([ {title: '操作人',initValue: dict.operator}, {title: '操作时间',initValue: moment(dict.operatorTime).format('YYYY-MM-DD') },])}
        </Row>
      </Card>
    )
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

    const {loading,baseInfoDict,PuerperaBodyList} = this.props

    let baseInfoDivAry = detailComponent(baseInfoDict)
    let detailCard = (PuerperaBodyList).map((dict)=>{
      return this.CreatDetailCard(dict)
    })

    console.log(detailCard)

    const bottomDiv = location.pathname === '/service/puerpera-body/edit' ?
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div> :
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.backClicked.bind(this))}{this.props.CheckBeforeData?creatButton('删除',this.onDelete.bind(this)):''}
        {creatButton('编辑',this.editBtnClick.bind(this))}{creatButton('打印',this.print.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='detailDiv' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
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
