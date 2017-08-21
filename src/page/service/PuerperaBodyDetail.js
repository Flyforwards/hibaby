import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin,Table} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

const assessment = [
  {title:'体重',component:'Input',submitStr:'weight',unit:'Kg'},
]


const columns = [
  {title: '体温', dataIndex: 'temperature',key: 'temperature'},
  {title: '脉搏',dataIndex: 'pulse',key: 'pulse'},
  {title: '体重',dataIndex: 'weight',key: 'weight'},
  {title: '血压',dataIndex: 'bloodPressure',key: 'bloodPressure'},
  {title: '大便',dataIndex: 'shit',key: 'shit'},
  {title: '恶露',dataIndex: 'lochia',key: 'lochia'},
  {title: '子宫收缩',dataIndex: 'uterusShrink',key: 'uterusShrink'},
  {title: '伤口',dataIndex: 'wound',key: 'wound'},
  {title: '乳房',dataIndex: 'breast',key: 'breast'},
  {title: '乳头',dataIndex: 'papilla',key: 'papilla'},
  {title: '食欲',dataIndex: 'appetite',key: 'appetite'},
  {title: '情绪评分',dataIndex: 'emotionScore',key: 'emotionScore'},
  {title: '操作人',dataIndex: 'operator',key: 'operator'},
  {title: '操作时间',dataIndex: 'operatorTime',key: 'operatorTime'},
];

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

    // const ary = [{title:'表单信息',ary:baseInfoAry}]


    const tableProps = {
      loading: loading.effects['serviceCustomer/getMaternalEverydayPhysicalEvaluationList'],
      dataSource: PuerperaBodyList,
      // pagination,
      columns,
      // onChange (page) {
      //   dispatch({type:'serviceCustomer/getMaternalEverydayPhysicalEvaluationList',payload:{page:page.current}})
      // }
    }


    let baseInfoDivAry = detailComponent(baseInfoDict)

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
          <Table className="CustomerTable" {...tableProps}/>

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
