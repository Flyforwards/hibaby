 import React, { Component } from 'react';
import {chiDetailComponent,creatButton,detailComponent,letter} from './ServiceComponentCreat'
import {Card ,Row,Form,Tabs,Spin,DatePicker,message} from 'antd';
const TabPane = Tabs.TabPane;
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { do_print } from 'common/util/printRoute.js';
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
      urlAddress:props.urlAddress?props.urlAddress:(location.pathname.indexOf('baby-grow') !== -1? 'baby-grow': (location.pathname.indexOf('baby-feed') !== -1?'baby-feed':'puerpera-body'))
    }
    this.tabKey = '';
  }

  editBtnClick(dict){
    this.props.dispatch(routerRedux.push(`/service/${this.state.urlAddress}/edit?customerid=${parse(location.search.substr(1)).customerid}&dataId=${dict.id}`));
  }
  onCreate(){
    if(location.pathname === "/service/puerpera-body/detail"){
      this.props.dispatch(routerRedux.push(`/service/${this.state.urlAddress}/edit?customerid=${parse(location.search.substr(1)).customerid}`));
    }else{
      if(this.props.BabyList.length <= 0){
        message.warn("没有婴儿信息")
      } else{
        this.props.dispatch(routerRedux.push(`/service/${this.state.urlAddress}/edit?customerid=${parse(location.search.substr(1)).customerid}&babyId=${this.tabKey}`));
      }
    }

  }

   componentWillUnmount(){
     this.props.dispatch({type: 'serviceCustomer/removeData',})
   }
  deleteClick(dict){

    let typeStr = 'serviceCustomer/delBabyGrowthNote'
    let operatorItem = 8
    if(this.state.urlAddress === 'baby-feed'){
      typeStr = 'serviceCustomer/delBabyFeedingNote'
      operatorItem = 13
    }
    if(this.state.urlAddress === 'puerpera-body'){
      typeStr = 'serviceCustomer/delMaternalEverydayPhysicalEvaluation'
      operatorItem = 14
    }
    dict.operatorItem = operatorItem;
    dict.dataId = dict.id

    this.props.dispatch({type:typeStr,payload:dict})
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/'+this.state.urlAddress));
  }

  print(){
    do_print('bigDetailDiv');
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
            extra = {this.props.summary?'': (
              <div>
                {creatButton('编辑',()=>{this.editBtnClick(dict)})}
                {creatButton('删除',()=>{this.deleteClick(dict)})}
              </div>
            )}
            bodyStyle={{ padding:'0 15px 0 15px'}} style={{marginTop:'5px', width: '100%' }}>
        {chiDetailComponent(ary)}
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
  tabChange(key) {
    this.tabKey = key;
  }
  render() {

    const {loading,baseInfoDict,MaternalEverydayPhysicalEvaluationAry,BabyFeedingNoteAry,BabyGrowthNoteAry,summary} = this.props

    let url = this.state.urlAddress === 'baby-feed' ? 'getBabyFeedingNoteList' : (this.state.urlAddress === 'baby-grow'?'getBabyGrowthNoteList':'getMaternalEverydayPhysicalEvaluationList');

    let netAry = this.state.urlAddress === 'baby-feed' ? BabyFeedingNoteAry : (this.state.urlAddress === 'baby-grow'?BabyGrowthNoteAry:MaternalEverydayPhysicalEvaluationAry);

    let baseInfoDivAry = detailComponent(baseInfoDict)

    let detailCard = ''
    const _this = this;
    if(this.state.urlAddress === 'baby-feed'||this.state.urlAddress === 'baby-grow'){
      if(netAry){
        if(netAry.length > 1){
          this.tabKey = netAry[0].babyId;
          let tempCard = (netAry).map((value,index)=>{
            let str = '宝'+letter[index]
            return <TabPane tab={str} key={value.babyId} >{
              value.notelist.length > 0 ? ( summary?value.notelist.slice(0,5): value.notelist).map((dict)=>{
                return this.CreatDetailCard(dict)
              }):''
            }</TabPane>
          })
          detailCard = <Tabs defaultActiveKey="0" onChange={_this.tabChange.bind(this)} type="card">{tempCard}</Tabs>
        }
        else if(netAry.length == 1){
          this.tabKey = netAry[0].babyId;
          detailCard = netAry[0].notelist.length > 0 ? (summary?netAry[0].notelist.slice(0,5): netAry[0].notelist).map((dict)=>{
            return this.CreatDetailCard(dict)
          }):''
        }
      }
    }
    else {
     // console.log("sss",netAry)
      //netAry && netAry != [] ? this.tabKey = netAry[0].babyId :''
      detailCard = netAry ? (netAry).map((dict)=>{
        return this.CreatDetailCard(dict)
      }):''
    }

    const bottomDiv =
      <div className='button-group-bottom-common'>
        {creatButton('新建',this.onCreate.bind(this))}
        {creatButton('返回',this.backClicked.bind(this))}
        {creatButton('打印',this.print.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects[`serviceCustomer/${url}`] !== undefined ? loading.effects[`serviceCustomer/${url}`]:false}>
        <Card  extra = {summary?'':<DatePicker onChange={this.onChange.bind(this)}/>} id="bigDetailDiv" className='bigDetailDiv' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {this.props.summary?'':baseInfoDivAry}
          {detailCard}
          {this.props.summary?'':bottomDiv}
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
