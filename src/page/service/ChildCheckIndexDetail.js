/**
 * Created by Flyforwards on 2017/8/17.
 */

import React, { Component } from 'react';
import {CreatCard,creatButton} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux } from 'dva/router'

// 基本信息
const baseInfoAry = [
  {title:'客户姓名',span:8,component:'Input',submitStr:'name'},
  {title:'年龄',span:8,component:'Input',submitStr:'age'},
  {title:'宝宝性别',span:8,component:'gender',submitStr:'baseInfo0'},
  {title:'分娩日期',span:8,component:'DatePicker',submitStr:'baseInfo1'},
  {title:'入住日期',span:8,component:'DatePicker',submitStr:'baseInfo2'},
  {title:'房间',span:8,component:'Input',submitStr:'baseInfo3'},
  {title:'破水时间',span:8,component:'Input',submitStr:'baseTime0'},
  {title:'APGAR SCORE',span:8,component:'Input',submitStr:'select_0'},
  {title:'孕次',span:8,component:'Input',selectName:'GRAVIDITY',submitStr:'gravidity'},
  {title:'产次',span:8,component:'Input',selectName:'FETUS',submitStr:'fetus'},
  {title:'生产数量',span:16,component:'RadioGroups',submitStr:'babyNum',radioAry:[{'name':'单胞胎','value':'0'},{'name':'双胞胎','value':'1'},{'name':'','value':'3','Element':'Input','submitStr':'babuNum2'}]},
  {title:'周数',span:8,component:'Input',submitStr:'weekNum'},
  {title:'生产方式',component:'RadioGroups',span:16,submitStr:'babyWay',radioAry:[{'name':'自然生产','value':'0'},{'name':'剖腹生产','value':'1'}]},
]
// 新生儿情况
const newbornAry = [
  {title:'出生体重',component:'Input',unit:'g',submitStr:'input_12'},
  {title:'出生身长',component:'Input',unit:'cm',submitStr:'input_13'},
  {title:'出生时头围',component:'Input',unit:'cm',submitStr:'babyHead0'},
  {title:'出生时胸围',component:'Input',unit:'cm',submitStr:'babyHead1'},
  {title:'囱门',formItems:'TwoWords',component:'RadioGroups',span:12,submitStr:'babyHead2',radioAry:[{'name':'平坦柔软','value':'0'},{'name':'紧绷鼓出','value':'1'},{'name':'凹陷','value':'2'}]},
  {title:'头皮',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead3', checkAry:[{'label':'正常','value':'0'},{'label':'破皮','value':'1'},{'label':'产瘤','value':'2'},{'label':'头血肿','value':'3'},{'label':'其他','value':'4'}]},
  {title:'眼睛',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead4',checkAry:[{'label':'正常','value':'0'},{'label':'日落眼','value':'1'},{'label':'分泌物','value':'2'},{'label':'眼睑肿胀','value':'3'},{'label':'巩膜出血','value':'4'},{'label':'其他','value':'5'}]},
  {title:'瞳孔大小',formItems:'FourWords',component:'RadioGroups',span:12,submitStr:'babyhead5',radioAry:[{'name':'对称','value':'0'},{'name':'不对称','value':'1'}]},
  {title:'耳朵',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead6',checkAry:[{'label':'正常','value':'0'},{'label':'红','value':'1'},{'label':'肿','value':'2'},{'label':'分泌物','value':'3'},{'label':'低下','value':'4'},{'label':'畸形','value':'5'},{'label':'耳边瘜肉','value':'6'}]},
  {title:'口腔',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead7',checkAry:[{'label':'正常','value':'0'},{'label':'腭裂','value':'1'},{'label':'唇裂','value':'2'},{'label':'歪嘴','value':'3'},{'label':'舌苔','value':'4'},{'label':'鹅口疮','value':'5'},{'label':'溃疡','value':'6'},{'label':'舌系代短','value':'7'}]},
  {title:'鼻子',formItems:'TwoWords',component:'CheckBoxGroup',span:12,submitStr:'babyhead8',checkAry:[{'label':'正常','value':'0'},{'label':'肿胀','value':'1'},{'label':'鼻塞','value':'2'},{'label':'鼻分泌物','value':'3'},{'label':'出血','value':'4'},{'label':'鼻道畸形','value':'5'},{'label':'其他','value':'6'},]},
  {title:'颈部',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead9',checkAry:[{'label':'正常','value':'0'},{'label':'肿胀','value':'1'},{'label':'疑斜颈','value':'2'},{'label':'僵硬','value':'3'}]},
  {title:'胸部',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead10',checkAry:[{'label':'正常','value':'0'},{'label':'胸骨凹陷','value':'1'},{'label':'水桶胸','value':'2'}]},
  {title:'腹部',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead11',checkAry:[{'label':'正常','value':'0'},{'label':'疤痕','value':'1'},{'label':'脐膨出','value':'2'},{'label':'疝气','value':'3',"t1":'222','Element':'Input','submitStr':'babyhead11-0'}]},
  {title:'脐带脱落',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyhead12',radioAry:[{'name':'是','value':'0'},{"name":'否','value':'1'}]},
  {title:'脐带状态',formItems:'FourWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead13',checkAry:[{'label':'干燥','value':'0'},{'label':'分泌物','value':'1'},{'label':'潮湿','value':'2'},{'label':'渗血','value':'3'},{'label':'红肿','value':'4'}]},
  {title:'交付状态',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyhead14',radioAry:[{'name':'已交付','value':'0'},{'name':'未交付','value':'1'}]},
  {title:'交付时间',component:'DatePicker',submitStr:'babyhead15'},
  {title:'骨骼',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead16',checkAry:[{'label':'正常','value':'0'},{'label':'脊髓膜膨出','value':'1'},{'label':'脊椎弯曲','value':'2'},{'label':'骨折','value':'3'},]},
  {title:'上肢',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead17',checkAry:[{'label':'正常','value':'0'},{'label':'无力','value':'1'},{'label':'僵直','value':'2'},{'label':'缺损','value':'3'},{'label':'畸形','value':'4'}]},
  {title:'下肢',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead18',checkAry:[{'label':'正常','value':'0'},{'label':'无力','value':'1'},{'label':'内翻','value':'2'},{'label':'外翻','value':'3'},{'label':'僵直','value':'4'},{'label':'缺损','value':'5'},{'label':'畸形','value':'6'},]},
  {title:'皮肤',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead19',checkAry:[{'label':'红润','value':'0'},{'label':'黄','value':'1'},{'label':'苍白','value':'2'},{'label':'青铜','value':'3'},{'label':'发绀','value':'4'},{'label':'红臀','value':'5'},{'label':'红疹','value':'6'},{'label':'毒性红斑','value':'7'},]},
  {title:'生殖器男',formItems:'FourWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead20',checkAry:[{'label':'正常','value':'0'},{'label':'睾丸已下降','value':'1'},{'label':'睾丸未下降','value':'2'},{'label':'尿道下裂','value':'3'},{'label':'红肿','value':'4'},{'label':'阴囊水肿','value':'5'},{'label':'疝气','value':'6'},{'label':'包皮过长','value':'7'},{'label':'阴茎无法外露包皮紧','value':'8'},{'label':'已行包皮环割术','value':'9'},]},
  {title:'生殖器女',formItems:'FourWords',span:12,component:'CheckBoxGroup',submitStr:'babyhead22',checkAry:[{'label':'正常','value':'0'},{'label':'睾丸已下降','value':'1'},{'label':'睾丸未下降','value':'2'},{'label':'尿道下裂','value':'3'},{'label':'红肿','value':'4'},{'label':'阴囊水肿','value':'5'},{'label':'疝气','value':'6'},{'label':'包皮过长','value':'7'},{'label':'阴茎无法外露包皮紧','value':'8'},{'label':'已行包皮环割术','value':'9'},]},
  {title:'分泌物',formItems:'TwoWords',span:12,component:'RadioGroups',submitStr:'babyhead21',radioAry:[{'name':'无','value':'0'},{'name':'有','value':'1'}]},
]

// 新生儿情况
const newbornTwoAry = [
  {title:'呼吸状态',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyCare0',radioAry:[{'name':'正常','value':'0'},{'name':'异常','value':'1','Element':'Input',"submitStr":'babyCare0-0'}]},
  {title:'呼吸速率',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyCare1',radioAry:[{'name':'正常','value':'0'},{'name':'呼吸急促','value':'1'},{'name':'呼吸过慢','value':'2'},{'name':'呼吸暂停','value':'3'}]},
  {title:'呼吸音',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyCare2',radioAry:[{'name':'清晰','value':'0'},{'name':'异常','value':'1','Element':'Input','submitStr':'babyCare2-0'}]},
  {title:'心跳',formItems:'TwoWords',span:12,component:'RadioGroups',submitStr:'babyCare3',radioAry:[{'name':'正常','value':'0'},{'name':'心跳过快','value':'1'},{'name':'心跳过慢','value':'2'},{'name':'心率不整','value':'3'}]},
  {title:'心音',formItems:'TwoWords',span:12,component:'RadioGroups',submitStr:'babyCare4',radioAry:[{'name':'正常','value':'0'},{'name':'杂音','value':'1'}]},
  {title:'饮食',formItems:'TwoWords',span:12,component:'CheckBoxGroup',submitStr:'babyCare15',checkAry:[{'label':'母乳喂养','value':'0'},{'label':'奶瓶喂食','value':'1'}]},
  {title:'腹部',formItems:'TwoWords',span:12,component:'RadioGroups',submitStr:'babyCare5',radioAry:[{'name':'柔软','value':'0'},{'name':'腹胀','value':'1'}]},
  {title:'肠蠕动声',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyCare6',radioAry:[{'name':'有','value':'0'},{'name':'无','value':'1'}]},
  {title:'吐奶',formItems:'TwoWords',span:12,component:'RadioGroups',submitStr:'babyCare7',radioAry:[{'name':'无','value':'0'},{'name':'有','value':'1'}]},
  {title:'活动力',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyCare8',radioAry:[{'name':'活动力佳','value':'0'},{'name':'活动力差','value':'1'}]},
  {title:'姿势',formItems:'TwoWords',span:12,component:'RadioGroups',submitStr:'babyCare9',radioAry:[{'name':'屈曲状','value':'0'},{'name':'软弱伸展','value':'1'}]},
  {title:'哭声',formItems:'TwoWords',span:12,component:'RadioGroups',submitStr:'babyCare10',radioAry:[{'name':'正常','value':'0'},{'name':'微弱','value':'1'},{'name':'沙哑','value':'2'},{'name':'尖锐','value':'3'}]},
  {title:'拥抱反射',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyCare11',radioAry:[{'name':'正常','value':'0'},{'name':'异常','value':'1','Element':'Input','submitStr':'babyCare11-0'}]},
  {title:'踏步反射',formItems:'FourWords',span:12,component:'RadioGroups',submitStr:'babyCare12',radioAry:[{'name':'正常','value':'0'},{'name':'异常','value':'1','Element':'Input','submitStr':'babyCare12-0'}]},
  {title:'吸允反应',formItems:'FourWords',span:24,component:'RadioGroups',submitStr:'babyCare13',radioAry:[{'name':'正常','value':'0'},{'name':'异常','value':'1','Element':'Input','submitStr':'babyCare13-0'}]},
  {title:'其他',component:'TextArea',spna:24,submitStr:'babyCare14'},
  {title:'评估者',component:'Input',span:6,submitStr:'newborn_3'},
  {title:'评估时间',component:'DatePicker',offset:12,span:6,submitStr:'newborn_4'},
]

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  onDelete(){

  }

  editBtnClick(){
    this.props.dispatch(routerRedux.push(`/service/child-check-in/edit?${location.search.substr(1)}`));
  }

  backClicked(){
    this.props.dispatch(routerRedux.push('/service/child-check-in'));
  }

  editBackClicked(){
    this.props.dispatch(routerRedux.push(`/service/child-check-in/detail?${location.search.substr(1)}`));
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
        let dict = { "assessmentInfo": assessmentInfo, "customerId": 16,"type": 3};
        if(this.props.CheckBeforeID){
          dict.id = this.props.CheckBeforeID
        }
        this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
      }
    });
  }

  render() {

    const {loading} = this.props

    const ary = [{title:'基本信息',ary:baseInfoAry},{title:'入住时婴儿评估',ary:newbornAry},{title:'入住时婴儿评估',ary:newbornTwoAry}]

    let chiAry = ary.map(value=>{
      value.netData = this.props.CheckBeforeData
      return CreatCard(this.props.form,value)
    })


    const bottomDiv = location.pathname === '/service/check-before/edit' ?
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.editBackClicked.bind(this))}{creatButton('确定',this.submitClicked.bind(this))}
      </div> :
      <div className='button-group-bottom-common'>
        {creatButton('返回',this.backClicked.bind(this))}{creatButton('删除',this.onDelete.bind(this))}
        {creatButton('编辑',this.editBtnClick.bind(this))}{creatButton('打印',this.print.bind(this))}
      </div>

    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>

        <Card className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {chiAry}

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
