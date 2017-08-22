import React, { Component } from 'react';
import {chiDetailComponent,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Row,Form,Col,Spin,DatePicker} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import moment from 'moment'
import { routerRedux,Link } from 'dva/router'


//
const feeding = [
  {title:'喂养方式',submitStr:'feedingMode',chiAry:['亲喂','母乳','配方奶']},
  {title:'喂养时间',unit:'分钟',submitStr:'feedingTime'},
  {title:'喂养计量',submitStr:'feedingMeasurement',unit:'ml'},
  {title:'小便颜色',chiAry:['清','黄'],submitStr:'urineColor'},
  {title:'小便量',chiAry:['少','中'],submitStr:'urineOutput'},
  {title:'大便颜色',chiAry:['浅棕','棕'],submitStr:'stoolColor'},
  {title:'大便量',chiAry:['少','中'],submitStr:'stoolVolume'},
  {title:'形状',chiAry:['软','糊状'],submitStr:'shape'},
]

const growth = [
  {title:'体重',submitStr:'weight',unit:'gm'},
  {title:'身长',submitStr:'length',unit:'cm'},
  {title:'亲喂',submitStr:'personallyFeed',unit:'次'},
  {title:'母乳',submitStr:'breastMilk',unit:'ml'},
  {title:'配方奶',submitStr:'powderedFormulas',unit:'ml'},
  {title:'大便',submitStr:'shit',unit:'次'},
  {title:'小便',submitStr:'urine',unit:'次'},
]


const assessment = [
  {title: '体温', submitStr:'temperature',unit:'℃'},
  {title: '脉搏',submitStr:'pulse',unit:'次/分'},
  {title: '体重',submitStr:'weight',unit:'Kg'},
  {title: '血压',submitStr:'bloodPressure',unit:'mmHg'},
  {title: '大便',submitStr:'shit',unit:'次数/天'},
  {title: '恶露',submitStr:'lochia',chiAry:['红/多','红/中', '淡红/少']},
  {title: '子宫收缩',submitStr:'uterusShrink',chiAry:['软','硬']},
  {title: '伤口',submitStr:'wound',chiAry:['正常','微红']},
  {title: '乳房',submitStr:'breast',chiAry:['正常','红','涨硬','痛']},
  {title: '乳头',submitStr:'papilla',chiAry:['正常','破皮', '结痂']},
  {title: '食欲',submitStr:'appetite',chiAry:['差','佳']},
  {title: '情绪评分',submitStr:'emotionScore'},
]



class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={
      urlAddress:location.pathname.indexOf('baby-grow') !== -1? 'baby-grow': (location.pathname.indexOf('baby-feed') !== -1?'baby-feed':'puerpera-body')
    }
  }

  editBtnClick(dict){
    this.props.dispatch(routerRedux.push(`/service/${this.state.urlAddress}/edit?customerid=${parse(location.search.substr(1)).customerid}&dataId=${dict.id}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/'+this.state.urlAddress));
  }

  print(){

  }

  CreatDetailCard(dict) {

    let ary = this.state.urlAddress === 'baby-feed' ? feeding : (this.state.urlAddress === 'baby-grow'?growth:assessment);

    ary.map((subDict)=>{
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
        {chiDetailComponent(ary)}
      </Card>
    )
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData',})
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

  render() {

    const {loading,baseInfoDict,PuerperaBodyList} = this.props

    let baseInfoDivAry = detailComponent(baseInfoDict)
    let detailCard = (PuerperaBodyList).map((dict)=>{
      return this.CreatDetailCard(dict)
    })

    const bottomDiv =
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.backClicked.bind(this))}
        {creatButton('打印',this.print.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card  extra = {<DatePicker onChange={this.onChange.bind(this)}/>} className='detailDiv' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
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
