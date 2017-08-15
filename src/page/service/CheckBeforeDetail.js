import React, { Component } from 'react';
import {CreatCard} from './ServiceComponentCreat'
import {Card ,Input,Form} from 'antd';
import PermissionButton from 'common/PermissionButton';

// 基本信息
const baseInfoAry = [
  {title:'客户姓名',component:'Input',submitStr:'name'},
  {title:'年龄',component:'Input',submitStr:'contact'},
  {title:'宝宝性别',component:'Input',submitStr:'contact'},
  {title:'分娩日期',component:'DatePicker',submitStr:'contact'},
  {title:'入住日期',component:'DatePicker',submitStr:'contact'},
  {title:'房间',component:'Input',submitStr:'contact'},
  {title:'产次',component:'Input',submitStr:'contact',selectName:'FETUS'},
  {title:'孕次',component:'Input',submitStr:'contact',selectName:'GRAVIDITY'},
  {title:'孕周',component:'Input',submitStr:'contact'},
  {title:'分娩医院',component:'Input',submitStr:'contact',selectName:'Hospital'},
  {title:'产妇电话',component:'Input',submitStr:'contact'},
  {title:'家属电话',component:'Input',submitStr:'contact'},
]

// 既往史
const PastMedicalHistoryAry = [
  {title:'既往疾病史',component:'InputGroup',submitStr:'name',span:24},
  {title:'既往手术史',component:'InputGroup',submitStr:'contact',span:24},
]

// 孕期合并症
const PregnancyComplicationsAry = [
  {title:'乙肝病毒感染或携带',component:'Select',chiAry:['否','大三阳', '小三阳', '单纯表面抗原阳性']},
  {title:'丙肝病毒感染或携带',component:'RadioGroup'},
  {title:'梅毒感染或携带',component:'RadioGroup'},
  {title:'艾滋病毒感染或携带',component:'RadioGroup'},
  {title:'高血压',component:'Input'},
  {title:'贫血',component:'RadioGroup'},
  {title:'糖尿病',component:'RadioGroup'},
  {title:'子宫肌瘤',component:'RadioGroup'},
  {title:'甲状腺功能减退',component:'RadioGroup',span:24},
]

// 分娩过程
const DeliveryProcessAry = [
  {title:'分娩方式',component:'Input'},
  {title:'会阴撕裂',component:'Select',chiAry:['无','Ⅰ度', 'Ⅱ度', 'Ⅲ度','Ⅳ度']},
  {title:'产时出血',component:'Input'},
  {title:'胎盘早破',component:'Input'},
  {title:'前置胎盘',component:'RadioGroup'},
  {title:'胎盘早剥',component:'RadioGroup'},
  {title:'胎盘残留',component:'RadioGroup'},
  {title:'其他',component:'Input',span:24},
]

// 产后情况
const PostpartumSituationAry = [
  {title:'产后清宫',component:'RadioGroup'},
  {title:'产后出血',component:'InputGroup'},
  {title:'血压异常',component:'InputGroup'},
  {title:'会阴伤口',component:'Select',chiAry:['正常','水肿', '血肿', '裂开','感染']},
  {title:'腹部伤口',component:'Select',chiAry:['正常','红肿', '裂开','感染']},
  {title:'产后发热',component:'InputGroup'},
  {title:'乳房肿胀',component:'RadioGroup'},
  {title:'下肢水肿',component:'RadioGroup'},
  {title:'排尿困难',component:'RadioGroup'},
  {title:'排便困难',component:'RadioGroup'},
  {title:'其他',component:'Input',span:24},
]

// 新生儿情况
const newbornAry = [
  {title:'性别',component:'Input'},
  {title:'出生体重',component:'Input'},
  {title:'出生身长',component:'Input'},
  {title:'Apgar评分',component:'Input'},
  {title:'喂养方式',component:'Input'},
  {title:'产时胎心异常',component:'Input'},
  {title:'高胆红素血症',component:'RadioGroup'},
  {title:'蓝光治疗史',component:'Input'},
  {title:'产时胎心异常',component:'Input'},
  {title:'羊水污染',component:'Input'},
  {title:'排便困难',component:'Input'},
  {title:'出生后窒息',component:'RadioGroup'},
  {title:'呼吸困难',component:'Input'},
  {title:'新生儿肺炎',component:'Input'},
  {title:'发热史',component:'Input'},
  {title:'心脏杂音',component:'Input'},
  {title:'尿量少',component:'Input'},
  {title:'尿结晶',component:'RadioGroup'},
  {title:'皮疹',component:'RadioGroup'},
  {title:'其他',component:'Input',span:24},
]

// 新生儿情况
const newbornTwoAry = [
  {title:'特殊注意事项',component:'Input',span:24},
  {title:'评估结论',component:'Input',span:24},
  {title:'特殊提示',component:'Input',span:24},
  {title:'评估者',component:'Input',span:24},
]

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  onDelete(){

  }

  editBtnClick(){

  }

  render() {

    return (
      <div>
        <Card style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {CreatCard(this.props.form,{title:'基本信息',key:'baseInfo',ary:baseInfoAry})}
          {CreatCard(this.props.form,{title:'既往史',key:'PastMedicalHistory',ary:PastMedicalHistoryAry})}
          {CreatCard(this.props.form,{title:'孕期合并症',key:'PregnancyComplications',ary:PregnancyComplicationsAry})}
          {CreatCard(this.props.form,{title:'分娩过程',key:'DeliveryProcess',ary:DeliveryProcessAry})}
          {CreatCard(this.props.form,{title:'产后情况',key:'PostpartumSituation',ary:PostpartumSituationAry})}
          {CreatCard(this.props.form,{title:'新生儿情况',key:'newborn',ary:newbornAry})}
          {CreatCard(this.props.form,{title:'新生儿情况',key:'newbornTwo',ary:newbornTwoAry})}

          <div className='button-group-bottom-common'>
            <PermissionButton testKey='CUSTOMER_DELETE' className='button-group-bottom-2' onClick={this.onDelete.bind(this)}>删除</PermissionButton>
            <PermissionButton testKey='CUSTOMER_EDIT' className='button-group-bottom-3' onClick={this.editBtnClick.bind(this)}>编辑</PermissionButton>
            <PermissionButton testKey='CUSTOMER_EDIT' className='button-group-bottom-3' onClick={this.editBtnClick.bind(this)}>打印</PermissionButton>
          </div>
        </Card>
      </div>
    )
  }
}

const DetailForm = Form.create()(Detail);

export default DetailForm;
