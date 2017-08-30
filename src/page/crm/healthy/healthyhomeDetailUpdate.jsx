"use strict"
import React, { Component } from 'react'
import { Button, Col, Form, Input, Row, Radio, Select,message } from 'antd'
import styles from './healthyhome.scss';
import FileUpload from './fileUpload';
import {radioInputRow,myRadioForm,uploadOptionsItem,radioSpaceRow,radioAllRow,apgarScoreRow,setImgInputRequired,radioAllRow2} from './CreateElement';
import { connect } from 'dva';
/**
 * 客户信息》健康档案》医疗健康档案详情页面编辑页面
 */



const FormItem = Form.Item;

//单选框的名字
const radioNames=[];
for(let i = 0; i < 47; i++) {
  radioNames.push('radio_'+i);
}


//输入框的名字
const inputNames=[];
for(let i = 0; i < 18; i++) {
  inputNames.push('input_'+i);
}






function HealthyhomeDetailUpdate(props) {
  function radioChangeFun1(e){
    setImgInputRequired("imgInput_1",e.target.value,props);
  }
  function radioChangeFun2(e){
    setImgInputRequired("imgInput_2",e.target.value,props);
  }
  function radioChangeFun3(e){
    setImgInputRequired("imgInput_3",e.target.value,props);
  }
  function radioChangeFun4(e){
    setImgInputRequired("imgInput_4",e.target.value,props);
  }
  function radioChangeFun5(e){
    setImgInputRequired("imgInput_5",e.target.value,props);
  }
  function radioChangeFun6(e){
    setImgInputRequired("imgInput_6",e.target.value,props);
  }
  function radioChangeFun7(e){
    setImgInputRequired("imgInput_7",e.target.value,props);
  }
  function radioChangeFun8(e){
    setImgInputRequired("imgInput_8",e.target.value,props);
  }

  function radioChangeFMTypeFun(e) {
    setImgInputRequired("input_5",e.target.value,props);
  }



  const { getFieldDecorator } = props.form;

  let disabled = false;
  const type = 1;
  const medicalHealthInformation = props.healthInformation.medicalHealthInformation;
  const healthInfo = medicalHealthInformation ? JSON.parse(medicalHealthInformation.healthInfo):{};

  const hide = !props.healthInformation.input_5_required?true:false;


  return(
      <Form>
        <Row className="firstItem" key="1">
          <Col span="2" style={{height: '110px',display: 'table'}}>
            <div className="itemTitle">既往史</div>
          </Col>
          <Col span="22">
            {radioInputRow(radioNames[0],inputNames[0],{title: '既往疾病史',radioItems: ['无','有'],value:healthInfo['radio_0'],info:healthInfo['input_0']},'请描述',false,null,props)}
            {radioInputRow(radioNames[1],inputNames[1],{title: '既往手术史',radioItems: ['无','有'],value:healthInfo['radio_1'],info:healthInfo['input_1']},'请描述',true,null,props)}
          </Col>
        </Row>

        <Row className="firstItem" key="2">
          <Col span="2" style={{height: '220px',display: 'table'}}>
            <div className="itemTitle"><span>优生四项</span></div>
          </Col>
          <Col span="22">
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[2], {title: '弓形体',radioItems: ['阴性','阳性'],value:healthInfo['radio_2'],radioChangeFun:radioChangeFun1},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(1,'imgInput_1',props.healthInformation.imgInput_1_required,props)}
                </div>
              </Col>
            </Row>
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[3], {title: '单纯疱疹病毒',radioItems: ['阴性','阳性'],value:healthInfo['radio_3'],radioChangeFun:radioChangeFun2},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(2,'imgInput_2',props.healthInformation.imgInput_2_required,props)}
                </div>
              </Col>
            </Row>
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[4], {title: '风疹病毒',radioItems: ['阴性','阳性'],value:healthInfo['radio_4'],radioChangeFun:radioChangeFun3},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(3,'imgInput_3',props.healthInformation.imgInput_3_required,props)}
                </div>
              </Col>
            </Row>
            <Row className="onlyLeftItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[5], {title: '巨细胞病毒',radioItems: ['阴性','阳性'],value:healthInfo['radio_5'],radioChangeFun:radioChangeFun4},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(4,'imgInput_4',props.healthInformation.imgInput_4_required,props)}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row  className="firstItem" key="3">
          <Col span="2" style={{height: '605px',display: 'table'}}>
            <div className="itemTitle">孕期合并症</div>
          </Col>
          <Col span="22">
            <Row className="topRightItemBg" style={{minHeight: '110px'}}>
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[6],{title: '乙肝病毒感染或携带',radioItems: ['否','大三阳','小三阳','单纯表面抗原阳性'],value:healthInfo['radio_6'],radioChangeFun:radioChangeFun5},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg" style={{minHeight: '110px'}}>
                  {uploadOptionsItem('5','imgInput_5',props.healthInformation.imgInput_5_required,props)}
                </div>
              </Col>
            </Row>
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[7], {title: '丙肝病毒感染或携带',radioItems: ['否','是'],value:healthInfo['radio_7'],radioChangeFun:radioChangeFun6},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(6,'imgInput_6',props.healthInformation.imgInput_6_required,props)}
                </div>
              </Col>
            </Row>
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[8], {title: '梅毒病毒感染或携带',radioItems: ['否','是'],value:healthInfo['radio_8'],radioChangeFun:radioChangeFun7},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(7,'imgInput_7',props.healthInformation.imgInput_7_required,props)}
                </div>
              </Col>
            </Row>
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[9], {title: '艾滋病病毒感染或携带',radioItems: ['否','是'],value:healthInfo['radio_9'],radioChangeFun:radioChangeFun8},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(8,'imgInput_8',props.healthInformation.imgInput_8_required,props)}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm(radioNames[10],{title: '血压异常',radioItems: ['否','是'],value:healthInfo['radio_10']},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    label={'血压'}>
                    {getFieldDecorator(`${inputNames[2]}`, {
                      initialValue : healthInfo['input_2'],
                      rules: [{ required: false, message: '  ' }]
                    })(
                      <Input
                        suffix="/ mmHg"
                      />
                    )}

                  </FormItem>
                </div>
              </Col>
            </Row>
            {radioSpaceRow(radioNames[11],{title: '贫血',radioItems: ['否','是'],value:healthInfo['radio_11']},false,props)}
            {radioSpaceRow(radioNames[12],{title: '糖尿病',radioItems: ['否','是'],value:healthInfo['radio_12']},false,props)}
            {radioSpaceRow(radioNames[13],{title: '子宫肌瘤',radioItems: ['否','是'],value:healthInfo['radio_13']},false,props)}
            {radioInputRow(radioNames[14], inputNames[3], {title: '甲状腺功能减退',radioItems: ['否','是'],value:healthInfo['radio_14'],info:healthInfo['input_3']},'用药',false,null,props)}

            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  {getFieldDecorator(`${inputNames[4]}`,{
                    initialValue : healthInfo['input_4']
                  })(
                    <Input />
                  )}
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2" style={{height: '495px',display: 'table'}}>
            <div className="itemTitle">分娩过程</div>
          </Col>
          <Col span="22">
            {radioAllRow(radioNames[15],{title: '分娩方式',radioItems: ['自然分娩','剖宫产'],value:healthInfo['radio_15'],radioChangeFun:radioChangeFMTypeFun},props)}
            <Row style={{display:hide?'none':''}}>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'剖宫产手术指征'}>
                  {getFieldDecorator(`${inputNames[5]}`, {
                    initialValue : healthInfo['input_5'],
                    rules: [{ required: props.healthInformation.input_5_required, message: '请输入剖宫产手术指征' }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </div>
            </Row>
            {radioAllRow(radioNames[16],{title: '自然分娩（会阴撕裂）',radioItems: ['无','I度','II度','III度','IV度'],value:healthInfo['radio_16']},props)}
            <Row>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'产时出血'}>
                  {getFieldDecorator(`${inputNames[6]}`, {
                    initialValue : healthInfo['input_6'],
                    rules: [{ required: false, message: '  ' }]
                  })(
                    <Input
                      suffix="ml"
                    />
                  )}
                </FormItem>
              </div>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm(radioNames[17],{title: '胎膜早破',radioItems: ['否','是'],value:healthInfo['radio_17']},props)}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    label={''}
                    wrapperCol={{span: 22, push: 1 }}>
                    {getFieldDecorator(`${inputNames[7]}`, {
                      initialValue : healthInfo['input_7'],
                      rules: [{ required: false, message: '  ' }]
                    })(
                      <Input
                        suffix="小时"
                      />
                    )}
                  </FormItem>
                </div>
              </Col>
            </Row>

            {radioAllRow(radioNames[18],{title: '前置胎盘',radioItems: ['否','是'],value:healthInfo['radio_18']},props)}
            {radioAllRow(radioNames[19],{title: '胎盘早剥',radioItems: ['否','是'],value:healthInfo['radio_19']},props)}
            {radioAllRow(radioNames[20],{title: '胎盘残留',radioItems: ['否','是'],value:healthInfo['radio_20']},props)}

            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  {getFieldDecorator(`${inputNames[8]}`,{
                    initialValue : healthInfo['input_8']
                  })(
                    <Input />
                  )}
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2" style={{height: '660px',display: 'table'}}>
            <div className="itemTitle">产后情况</div>
          </Col>
          <Col span="22">
            {radioAllRow(radioNames[21],{title: '产后清宫',radioItems: ['无','有'],value:healthInfo['radio_21']},props)}
            {radioInputRow(radioNames[22], inputNames[9], {title: '产后出血',radioItems: ['无','有'],value:healthInfo['radio_22'],info:healthInfo['input_9']},'出血量',false,'毫升',props)}
            {radioInputRow(radioNames[23], inputNames[18], {title: '血压异常',radioItems: ['无','有'],value:healthInfo['radio_23'],info:healthInfo['input_18']},'血压',false,'mmHg',props)}
            {radioAllRow(radioNames[24],{title: '会阴伤口',radioItems: ['正常','水肿','血肿','裂开','感染','无'],value:healthInfo['radio_24']},props)}
            {radioAllRow2(radioNames[24],{title: '腹部伤口',radioItems: ['正常','敷料覆盖未见渗出物','红肿','裂开','感染','无'],value:healthInfo['radio_24']},props)}
            {radioInputRow(radioNames[26], inputNames[10], {title: '产后发热',radioItems: ['无','有'],value:healthInfo['radio_26'],info:healthInfo['input_10']},'体温',false,'℃',props)}
            {radioAllRow(radioNames[27],{title: '乳房肿胀',radioItems: ['无','有'],value:healthInfo['radio_27']},props)}
            {radioAllRow(radioNames[28],{title: '哺乳困难',radioItems: ['无','有'],value:healthInfo['radio_28']},props)}
            {radioAllRow(radioNames[29],{title: '下肢水肿',radioItems: ['无','有'],value:healthInfo['radio_29']},props)}
            {radioAllRow(radioNames[30],{title: '排尿困难',radioItems: ['无','有'],value:healthInfo['radio_30']},props)}
            {radioAllRow(radioNames[31],{title: '排便困难',radioItems: ['无','有'],value:healthInfo['radio_31']},props)}
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  {getFieldDecorator(`${inputNames[11]}`,{
                    initialValue : healthInfo['input_11']
                  })(
                    <Input  />
                  )}
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>

  );
}




function newBabyHtml(props) {
  const { getFieldDecorator } = props.form;

  let disabled = false;
  const type = 1;
  const newBabyList = props.healthInformation.newBabyList;
  const newBabyValues = newBabyList&&newBabyList.length>0?newBabyList[props.index]:null;
  const healthInfo = newBabyValues ? JSON.parse(newBabyValues.babyInfo):{};
  let title = "新生儿情况";
  switch(props.index){
    case 0:
      title = title+"(宝宝A)";
          break;
    case 1:
      title = title+"(宝宝B)";
      break;
    case 2:
      title = title+"(宝宝C)";
      break;
    case 3:
      title = title+"(宝宝D)";
      break;
    case 4:
      title = title+"(宝宝E)";
      break;
    case 5:
      title = title+"(宝宝F)";
      break;
    case 6:
      title = title+"(宝宝G)";
      break;
    case 7:
      title = title+"(宝宝H)";
      break;
    case 8:
      title = title+"(宝宝I)";
      break;
    case 9:
      title = title+"(宝宝J)";
      break;
    case 10:
      title = title+"(宝宝K)";
      break;
    case 11:
      title = title+"(宝宝L)";
      break;
  }
  return (
    <Row className="firstItem">
      <Col span="2" style={{height: '1045px',display: 'table'}}>
        <div className="itemTitle">{title}</div>
      </Col>
      <Col span="22">
        <Row style={{display:"none"}}>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'宝宝'}>
              {getFieldDecorator("babyId", {
                initialValue : newBabyValues?newBabyValues['babyId']:(props.index+1),
                rules: [{ required: false, message: '  ' }]
              })(
                <Input />
              )}
            </FormItem>
          </div>
        </Row>
        {radioAllRow("babySex",{title: '性别',radioItems: ['男','女'],value:(newBabyValues?newBabyValues['babySex']+"":null),required:true,message:"请选择宝宝性别"},props)}


        <Row style={{display:"none"}}>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'婴儿健康档案id'}>
              {getFieldDecorator("id", {
                initialValue : newBabyValues?newBabyValues['id']:null,
                rules: [{ required: false, message: '  ' }]
              })(
                <Input />
              )}
            </FormItem>
          </div>
        </Row>
        <Row>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'出生体重'}>
              {getFieldDecorator("babyWeight", {
                initialValue : newBabyValues?newBabyValues['babyWeight']:null,
                rules: [{ required: true, message: '请输入出生体重' }]
              })(
                <Input
                  suffix="g"
                />
              )}
            </FormItem>
          </div>
        </Row>
        <Row>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'出生身长'}>
              {getFieldDecorator("babyLength", {
                initialValue : newBabyValues?newBabyValues['babyLength']:null,
                rules: [{ required: true, message: '请输入出生身长' }]
              })(
                <Input
                  suffix="cm"
                />
              )}
            </FormItem>
          </div>
        </Row>
        <Row>
          <div className="rightItemBg">
            {apgarScoreRow(props,healthInfo)}
          </div>
        </Row>
        {radioAllRow(radioNames[33],{title: '喂养方式',radioItems: ['纯母乳','混合','人工'],value:healthInfo['radio_33']},props)}
        {radioAllRow(radioNames[34],{title: '产时胎心异常',radioItems: ['无','胎心快','胎心慢'],value:healthInfo['radio_34']},props)}
        {radioAllRow(radioNames[35],{title: '高胆红素血症',radioItems: ['无','有'],value:healthInfo['radioNam_35']},props)}
        <Row>
          <Col span="12">
            <div className="topItembg">
              {myRadioForm(radioNames[36],{title: '蓝光治疗史',radioItems: ['否','是'],value:healthInfo['radio_36']},props)}
            </div>
          </Col>
          <Col span="12">
            <div className="leftRightItemBg">
              <FormItem
                label={''}
                wrapperCol={{span: 22, push: 1 }}>
                {getFieldDecorator(`${inputNames[14]}`, {
                  initialValue : healthInfo['input_14'],
                  rules: [{ required: false, message: '  ' }]
                })(
                  <Input
                    suffix="小时"
                  />
                )}
              </FormItem>
            </div>
          </Col>
        </Row>
        {radioAllRow(radioNames[37],{title: '羊水污染',radioItems: ['无','1度','2度','3度'],value:healthInfo['radio_37']},props)}
        {radioInputRow(radioNames[38], inputNames[15], {title: '发热史',radioItems: ['无','有'],value:healthInfo['radio_38'],info:healthInfo['input_15']},'体温',false,'℃',props)}
        {radioAllRow(radioNames[39],{title: '低血糖史',radioItems: ['无','有'],value:healthInfo['radio_39']},props)}
        {radioAllRow(radioNames[40],{title: '呼吸困难',radioItems: ['无','有'],value:healthInfo['radio_40']},props)}
        {radioAllRow(radioNames[41],{title: '出生后窒息',radioItems: ['无','有'],value:healthInfo['radio_41']},props)}
        {radioInputRow(radioNames[42], inputNames[16], {title: '新生儿肺炎',radioItems: ['无','有'],value:healthInfo['radio_42'],info:healthInfo['input_16']},'治疗方案',false,null,props)}
        {radioAllRow(radioNames[43],{title: '心脏杂音',radioItems: ['无','有'],value:healthInfo['radio_43']},props)}
        {radioAllRow(radioNames[44],{title: '皮疹',radioItems: ['无','有'],value:healthInfo['radio_44']},props)}
        {radioAllRow(radioNames[45],{title: '尿量少',radioItems: ['无','有'],value:healthInfo['radio_45']},props)}
        {radioAllRow(radioNames[46],{title: '尿结晶',radioItems: ['无','有'],value:healthInfo['radio_46']},props)}
        <Row>
          <div className="bottomRightItemBg">
            <FormItem
              labelCol={{span: 2}}
              wrapperCol={{span: 21}}
              label={'其它'}>
              {getFieldDecorator(`${inputNames[17]}`,{
                initialValue : healthInfo['input_17']
              })(
                <Input  />
              )}
            </FormItem>
          </div>
        </Row>
      </Col>
    </Row>

  );
}




const HealthyhomeDetailUpdateFrom = Form.create()(HealthyhomeDetailUpdate);
const NewBabyFrom = Form.create()(newBabyHtml);
const type = 1;
class HealthyhomeDetailUpdateClass extends Component{
  constructor(props){
    super(props);
    this.state = {
      newBabyArr : [],
      newBabyIndex : 0,
      removeBabyBtnDisabled : false
    }
    this.formRef = {};
  }


  //提交表单
  handleSubmit(){
    const {dispatch} = this.props;
    const {imgInput_1_arr,imgInput_2_arr,imgInput_3_arr,imgInput_4_arr,imgInput_5_arr,imgInput_6_arr,imgInput_7_arr,imgInput_8_arr} = this.props.healthInformation;
    this.refs.baseForm.setFieldsValue({imgInput_1 : (imgInput_1_arr&&imgInput_1_arr.length>0)?JSON.stringify(imgInput_1_arr):null});
    this.refs.baseForm.setFieldsValue({imgInput_2 : (imgInput_2_arr&&imgInput_2_arr.length>0)?JSON.stringify(imgInput_2_arr):null});
    this.refs.baseForm.setFieldsValue({imgInput_3 : (imgInput_3_arr&&imgInput_3_arr.length>0)?JSON.stringify(imgInput_3_arr):null});
    this.refs.baseForm.setFieldsValue({imgInput_4 : (imgInput_4_arr&&imgInput_4_arr.length>0)?JSON.stringify(imgInput_4_arr):null});
    this.refs.baseForm.setFieldsValue({imgInput_5 : (imgInput_5_arr&&imgInput_5_arr.length>0)?JSON.stringify(imgInput_5_arr):null});
    this.refs.baseForm.setFieldsValue({imgInput_6 : (imgInput_6_arr&&imgInput_6_arr.length>0)?JSON.stringify(imgInput_6_arr):null});
    this.refs.baseForm.setFieldsValue({imgInput_7 : (imgInput_7_arr&&imgInput_7_arr.length>0)?JSON.stringify(imgInput_7_arr):null});
    this.refs.baseForm.setFieldsValue({imgInput_8 : (imgInput_8_arr&&imgInput_8_arr.length>0)?JSON.stringify(imgInput_8_arr):null});

    const newBabyIndex = this.state.newBabyIndex;
    const newBabyInfoArr = [];
    let flag = true;
    for(let i = 0;i<= newBabyIndex; i++){
      let babyForm = 'babyForm'+i;
      this.refs[`${babyForm}`].validateFieldsAndScroll((err, values) => {
        if (!err) {
          const babyValue = this.refs[`${babyForm}`].getFieldsValue();
          Object.keys(babyValue).map(key=>{
            if(!babyValue[key]){
              babyValue[key] = null
            }
          })
          const babyInfo = JSON.stringify(babyValue);
          const newBaby = {
            "babyId": babyValue.babyId,
            // "babyId": 0,
            "babyInfo": babyInfo,
            "babyLength": babyValue.babyLength,
            "babySex": babyValue.babySex,
            "babyWeight": babyValue.babyWeight,
            "customerId": this.props.customerId,
            "id": babyValue.id
          }
          newBabyInfoArr.push(newBaby);
        }else{
          flag = false;
          return false;
        }
      });
    }
    if(!flag){
      return;
    }


    this.refs.baseForm.validateFieldsAndScroll((err, values) => {
      const medicalHealthInformation = this.props.healthInformation.medicalHealthInformation;
      if (!err) {
        const allValue = this.refs.baseForm.getFieldsValue()

        Object.keys(allValue).map(key=>{
          if(!allValue[key]){
            allValue[key] = null
          }
        })
        const healthInfo = JSON.stringify(allValue);
        if(medicalHealthInformation){
          dispatch({
            type: 'healthInformation/updateHealthInformation',
            payload: {
              customerBabyList : newBabyInfoArr,
              healthInfo : healthInfo,
              type : type,
              customerId : this.props.customerId,
              id : medicalHealthInformation.id
            }
          })
        }
        else {
          dispatch({
            type: 'healthInformation/saveHealthInformation',
            payload: {
              customerBabyList : newBabyInfoArr,
              healthInfo : healthInfo,
              type : type,
              customerId : this.props.customerId
            }
          })
        }
      }
    });
  }

  handleBack=()=>{
    const {dispatch} = this.props;
    dispatch({
      type: 'healthInformation/getHealthInformationListByCustomerId',
      payload: {
        type : type,
        customerId : this.props.customerId
      }
    })
  }

  handleCreateBaby(){
    if(this.state.newBabyIndex < 10){
      const newBabyIndex = this.state.newBabyIndex+1;
      let removeBabyBtnDisabled = false;
      if(newBabyIndex >= 10){
          removeBabyBtnDisabled = true
      }
      this.setState({
        newBabyIndex:newBabyIndex,
        removeBabyBtnDisabled:removeBabyBtnDisabled
      });

    }else{
      message.warn("新生儿情况已达上限");
    }

  }

  handleRemoveBaby(){
    const id = this.formRef[this.state.newBabyIndex].props.form.getFieldValue('id')// => The instance of Form
    if(id){
      message.warn("已保存的新生儿情况不可删除");
      return;
    }
    if(this.state.newBabyIndex > 0){
      let {newBabyIndex} = this.state;
      const {newBabyList} = this.props.healthInformation;
      const size= newBabyList?newBabyList.length:0;
      delete this.formRef[newBabyIndex];
      if(newBabyIndex == size){
        this.setState({
          removeBabyBtnDisabled:true,
        });
      }
      newBabyIndex = newBabyIndex-1
      this.setState({
        newBabyIndex:newBabyIndex,
      });


    }else{
      message.warn("最少保留一组新生儿情况");
    }
  }


  initNewBaby(){
    const newBabyArr = [];
    const newBabyIndex = this.state.newBabyIndex;
    for(let i = 0;i<= newBabyIndex; i++){
      newBabyArr.push(<NewBabyFrom wrappedComponentRef={(inst) => this.formRef[i] = inst} ref={"babyForm"+i} index={i}  {...this.props}/>);
    }
    return newBabyArr;
  }

  componentWillUnmount() {
    // this.props.dispatch({type: 'serviceCustomer/removeData'})
  }

  componentWillMount() {
    const {newBabyList} = this.props.healthInformation;
    this.setState({
      newBabyIndex : newBabyList&&newBabyList.length>0 ? (newBabyList.length-1) : 0,
      removeBabyBtnDisabled:true
    })
  }



  render(){
    return(
      <div className="healthContentDiv">
        <HealthyhomeDetailUpdateFrom ref="baseForm"  {...this.props}/>
        {this.initNewBaby()}
        <div className='button-group-bottom-common'>
          <Button className='button-group-bottom-1' onClick={this.handleBack.bind(this)}>返回</Button>
          <Button className='button-group-bottom-1' onClick={this.handleCreateBaby.bind(this)}>新增新生儿情况</Button>
          <Button className='button-group-bottom-1' disabled={this.state.removeBabyBtnDisabled} onClick={this.handleRemoveBaby.bind(this)}>移除新生儿情况</Button>
          <Button className='button-group-bottom-2' onClick={this.handleSubmit.bind(this)} >保存</Button>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}
export default connect(mapStateToProps)(HealthyhomeDetailUpdateClass)
