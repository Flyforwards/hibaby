"use strict"

import React, { Component } from 'react'
import { Button, Col, Form, Input, Row, Radio, Select, message, Icon } from 'antd'
import styles from './healthyhome.scss';
import FileUpload from './fileUpload';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option;
const type = 1;//医疗健康档案
/**
 * 客户信息》健康档案》医疗健康档案
 */
function HealthyhomeMainComponent(props) {

  console.log(props);

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  }

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

  const { getFieldDecorator } = props.form;


  function setImgInputRequired(imgInputName,value){
    props.dispatch({
      type : 'healthInformation/setImgInputRequired',
      payload : {
        imgInputName : imgInputName,
        value :value
      }
    });
  }

  function radioChangeFun1(e){
    setImgInputRequired("imgInput_1",e.target.value);
  }
  function radioChangeFun2(e){
    setImgInputRequired("imgInput_2",e.target.value);
  }
  function radioChangeFun3(e){
    setImgInputRequired("imgInput_3",e.target.value);
  }
  function radioChangeFun4(e){
    setImgInputRequired("imgInput_4",e.target.value);
  }
  function radioChangeFun5(e){
    setImgInputRequired("imgInput_5",e.target.value);
  }
  function radioChangeFun6(e){
    setImgInputRequired("imgInput_6",e.target.value);
  }
  function radioChangeFun7(e){
    setImgInputRequired("imgInput_7",e.target.value);
  }
  function radioChangeFun8(e){
    setImgInputRequired("imgInput_8",e.target.value);
  }

  function radioChangeFMTypeFun(e) {
    setImgInputRequired("input_5",e.target.value);
  }

  //单选item
  function myRadioForm (radioName, dict) {

    const radioItemDivs = [];
    for (let i = 0; i < dict.radioItems.length; i++) {
      radioItemDivs.push(
        <Radio key={i} value={i}>{dict.radioItems[i]}</Radio>
      );
    }

    return (
      <FormItem
        label={dict.title}
        {...formItemLayout}
        style={{height: '100%'}}
      >
        {getFieldDecorator(`${radioName}`, {
          rules: [{ required: false, message: '  ' }]
        })(
          <RadioGroup onChange= {dict.radioChangeFun}>
            {radioItemDivs}
          </RadioGroup>
        )}
      </FormItem>
    )
  }

  //整行的单选item
  function secondRadioForm (radioName ,dict) {
    const radioItemDivs = [];
    for (let i = 0; i < dict.radioItems.length; i++) {
      radioItemDivs.push(
        <Radio key={i} value={i}>{dict.radioItems[i]}</Radio>
      );
    }

    return (
      <FormItem
        label={dict.title}
        labelCol={{span: 5}}
        wrapperCol={{span: 18}}
      >
        {getFieldDecorator(`${radioName}`, {
          rules: [{ required: false, message: '  ' }]
        })(
          <RadioGroup onChange={dict.radioChangeFun}>
            {radioItemDivs}
          </RadioGroup>
        )}
      </FormItem>
    )
  }




  function imgInput_1AddImg(imgInputName,value){
    const {form} = props;
    props.dispatch({
      type : 'healthInformation/addImgData',
      payload : {
        imgInputName :imgInputName,
        value : value
      }
    });
  }

  function imgInputDeleteImgFun(imgInputName,value){
    const {form} = props;
    props.dispatch({
      type : 'healthInformation/delImgData',
      payload : {
        imgInputName :imgInputName,
        value : value
      }
    });
  }



  //上传附件 传一个key过来
  function uploadOptionsItem (key,imgInputName,required) {
    let addImgFun = imgInput_1AddImg;
    let deleteImgFun = imgInputDeleteImgFun;
    return (
          <FormItem
            labelCol={{span: 5}}
            wrapperCol={{span: 18}}
            label="附件:"
          >
            {getFieldDecorator(`${imgInputName}`, {
              rules: [{ required: required, message: '请上传附件' }]
            })(

              <FileUpload addImgFun={addImgFun} deleteImgFun={deleteImgFun} imgInputName={imgInputName}>
                <Button key={key} type="primary" className="uploadOptionsButton"><Icon type="upload"/>上传附件</Button>
              </FileUpload>
            )}
          </FormItem>
    )
  }

  //评分选择器
  function scoreSelectDiv (selectName) {

    const optionItemDivs = [];
    for (let i = 0; i <= 10; i++) {
      optionItemDivs.push(
        <Option key={i} value={''+i}>{i}</Option>
      );
    }

    return (
      <FormItem>
        {getFieldDecorator(`${selectName}`)(
          <Select
            showSearch
            style={{ width: 100 }}
            placeholder="请选择"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {optionItemDivs}
          </Select>
        )}
      </FormItem>
    )
  }

  //Apgar评分
  function apgarScoreRow () {
    return (
      <div className="ApgarOption">
        <Col span="5">
          <div className="uploadOptions">Apgar评分:</div>
        </Col>
        <Col span="2">
          <div className="upload">{scoreSelectDiv('select_0')}</div>
        </Col>
        <Col span="1">
          <div className="score-line">-</div>
        </Col>
        <Col span="2">
          <div className="upload">{scoreSelectDiv('select_1')}</div>
        </Col>
        <Col span="1">
          <div className="score-line">-</div>
        </Col>
        <Col span="2">
          <div className="upload">{scoreSelectDiv('select_2')}</div>
        </Col>
        <Col span="1">
          <div className="uploadOptions Fraction">分</div>
        </Col>
      </div>
    )
  }

  //row 左边单选右边输入框
  function radioInputRow (radioName, inputName, dict, inputTitle, lastRow, suffix) {

    const {input_requireds} = props;
    const input_required = input_requireds[`${inputName}_required`];

    var col1Class='topItembg';
    var col2Class='leftRightItemBg';
    if (lastRow == true){
      col1Class='bottomItemBg';
      col2Class='allNoneBg';
    }

    const radioValue = props.form.getFieldValue(`${radioName}`);
    dict['radioChangeFun'] = props.operationRadio({radioValue,radioName});

    return (
      <Row>
        <Col span="12">
          <div className={col1Class}>
            {myRadioForm(radioName ,dict)}
          </div>
        </Col>
        <Col span="12">
          <div className={col2Class}>
            <FormItem
              labelCol={{span: 4}}
              wrapperCol={{span: 18}}
              label={inputTitle}>
              {getFieldDecorator(`${inputName}`, {
                rules: [{ required: input_required, message: '  ' }]
              })(
                <Input
                  suffix={suffix}
                />
              )}

            </FormItem>
          </div>
        </Col>
      </Row>
    )
  }

  //row 左边单选右边空白
  function radioSpaceRow (radioName, dict, lastRow) {
    var col1Class='rightItemBg';
    var col2Class='leftRightItemBg';
    if (lastRow == true){
      col1Class='bottomItemBg';
      col2Class='allNoneBg';
    }

    return (
      <Row>
        <Col span="12">
          <div className={col1Class}>
            {myRadioForm(radioName, dict)}
          </div>
        </Col>
        <Col span="12">
          <div className={col2Class}></div>
        </Col>
      </Row>
    )
  }

  //row 整行单选
  function radioAllRow (radioName, dict) {
    return (
      <Row>
        <Col>
          <div className="rightItemBg">
            {secondRadioForm(radioName, dict)}
          </div>
        </Col>
      </Row>
    )
  }

  //row 整行单选
  function radioAllRow2 (radioName, dict) {
    return (
      <Row>
        <Col>
          <div className="rightItemBg">
            {secondRadioForm2(radioName, dict,6)}
          </div>
        </Col>
      </Row>
    )
  }



  //整行的单选item
  function secondRadioForm2 (radioName ,dict,index) {
    const radioItemDivs = [];
    for (let i = 0; i < dict.radioItems.length; i++) {
      radioItemDivs.push(
        <Radio key={i} value={i+index}>{dict.radioItems[i]}</Radio>
      );
    }

    return (
      <FormItem
        label={dict.title}
        labelCol={{span: 5}}
        wrapperCol={{span: 18}}
      >
        {getFieldDecorator(`${radioName}`, {
          rules: [{ required: false, message: '  ' }]
        })(
          <RadioGroup>
            {radioItemDivs}
          </RadioGroup>
        )}
      </FormItem>
    )
  }

  //提交表单
  function handleSubmit (e) {
    // console.log("您点击了保存按钮");
    const {dispatch,form} = props;
    const {imgInput_1_arr,imgInput_2_arr,imgInput_3_arr,imgInput_4_arr,imgInput_5_arr,imgInput_6_arr,imgInput_7_arr,imgInput_8_arr} = props.healthInformation;
    form.setFieldsValue({imgInput_1 : (imgInput_1_arr&&imgInput_1_arr.length>0)?JSON.stringify(imgInput_1_arr):null});
    form.setFieldsValue({imgInput_2 : (imgInput_2_arr&&imgInput_2_arr.length>0)?JSON.stringify(imgInput_2_arr):null});
    form.setFieldsValue({imgInput_3 : (imgInput_3_arr&&imgInput_3_arr.length>0)?JSON.stringify(imgInput_3_arr):null});
    form.setFieldsValue({imgInput_4 : (imgInput_4_arr&&imgInput_4_arr.length>0)?JSON.stringify(imgInput_4_arr):null});
    form.setFieldsValue({imgInput_5 : (imgInput_5_arr&&imgInput_5_arr.length>0)?JSON.stringify(imgInput_5_arr):null});
    form.setFieldsValue({imgInput_6 : (imgInput_6_arr&&imgInput_6_arr.length>0)?JSON.stringify(imgInput_6_arr):null});
    form.setFieldsValue({imgInput_7 : (imgInput_7_arr&&imgInput_7_arr.length>0)?JSON.stringify(imgInput_7_arr):null});
    form.setFieldsValue({imgInput_8 : (imgInput_8_arr&&imgInput_8_arr.length>0)?JSON.stringify(imgInput_8_arr):null});
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const allValue = props.form.getFieldsValue();
        Object.keys(allValue).map(key=>{
          if(!allValue[key]){
            allValue[key] = null
          }
        })
        const healthInfo = JSON.stringify(allValue);
        dispatch({
          type: 'healthInformation/saveHealthInformation',
          payload: {
            healthInfo : healthInfo,
            type : type,
            customerId : props.customerId
          }
        })
      }
    });
  }

  //返回
  function handleBack() {
    const {dispatch} = props;
    dispatch({
      type: 'addCustomer/changeTabs',
      payload: { activityKey: "1" }
    })
  }

  const hide = !props.healthInformation.input_5_required?true:false;


  return(
    <div className="healthContentDiv">
      <Form>
        <Row className="firstItem" key="1">
          <Col span="2" style={{height: '110px',display: 'table'}}>
            <div className="itemTitle">既往史</div>
          </Col>
          <Col span="22">
            {radioInputRow(radioNames[0],inputNames[0],{title: '既往疾病史',radioItems: ['无','有']},'请描述',false,'',props.input_0_required)}
            {radioInputRow(radioNames[1],inputNames[1],{title: '既往手术史',radioItems: ['无','有']},'请描述',true,'',props.input_1_required)}
          </Col>
        </Row>

        <Row className="firstItem" key="2">
          <Col span="2" style={{height: '220px',display: 'table'}}>
            <div className="itemTitle"><span>优生四向</span></div>
          </Col>
          <Col span="22">
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[2], {title: '弓形体',radioItems: ['阴性','阳性'],radioChangeFun:radioChangeFun1})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(1,'imgInput_1',props.healthInformation.imgInput_1_required)}
                </div>
              </Col>
            </Row>
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[3], {title: '单纯疱疹病毒',radioItems: ['阴性','阳性'],radioChangeFun:radioChangeFun2})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(2,'imgInput_2',props.healthInformation.imgInput_2_required)}
                </div>
              </Col>
            </Row>
            <Row className="topRightItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[4], {title: '风疹病毒',radioItems: ['阴性','阳性'],radioChangeFun:radioChangeFun3})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(3,'imgInput_3',props.healthInformation.imgInput_3_required)}
                </div>
              </Col>
            </Row>
            <Row className="onlyLeftItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[5], {title: '巨细胞病毒',radioItems: ['阴性','阳性'],radioChangeFun:radioChangeFun4})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(4,'imgInput_4',props.healthInformation.imgInput_4_required)}
                </div>
              </Col>
            </Row>

          </Col>
        </Row>

        <Row  className="firstItem">
          <Col span="2" style={{height: '605px',display: 'table'}}>
            <div className="itemTitle">孕期合并症</div>
          </Col>
          <Col span="22">
            <Row className="topRightItemBg" style={{minHeight: '110px'}}>
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[6],{title: '乙肝病毒感染或携带',radioItems: ['否','大三阳','小三阳','单纯表面抗原阳性'],radioChangeFun:radioChangeFun5})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg" style={{minHeight: '110px'}}>
                  {uploadOptionsItem('5','imgInput_5',props.healthInformation.imgInput_5_required)}
                </div>
              </Col>
            </Row>
            <Row className="onlyLeftItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[7], {title: '丙肝病毒感染或携带',radioItems: ['否','是'],radioChangeFun:radioChangeFun6})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(6,'imgInput_6',props.healthInformation.imgInput_6_required)}
                </div>
              </Col>
            </Row>
            <Row className="onlyLeftItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[8], {title: '梅毒病毒感染或携带',radioItems: ['否','是'],radioChangeFun:radioChangeFun7})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(7,'imgInput_7',props.healthInformation.imgInput_7_required)}
                </div>
              </Col>
            </Row>
            <Row className="onlyLeftItemBg">
              <Col span="12">
                <div>
                  {myRadioForm(radioNames[9], {title: '艾滋病病毒感染或携带',radioItems: ['否','是'],radioChangeFun:radioChangeFun8})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg">
                  {uploadOptionsItem(8,'imgInput_8',props.healthInformation.imgInput_8_required)}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm(radioNames[10],{title: '血压异常',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    label={'血压'}>
                    {getFieldDecorator(`${inputNames[2]}`, {
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
            {radioSpaceRow(radioNames[11],{title: '贫血',radioItems: ['否','是']})}
            {radioSpaceRow(radioNames[12],{title: '糖尿病',radioItems: ['否','是']})}
            {radioSpaceRow(radioNames[13],{title: '子宫肌瘤',radioItems: ['否','是']})}
            {radioInputRow(radioNames[14], inputNames[3], {title: '甲状腺功能减退',radioItems: ['否','是']},'用药')}

            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  {getFieldDecorator(`${inputNames[4]}`)(
                    <Input/>
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
            {radioAllRow(radioNames[15],{title: '分娩方式',radioItems: ['自然分娩','剖宫产'],radioChangeFun:radioChangeFMTypeFun})}

            <Row style={{display:hide?'none':''}}>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'剖宫产手术指征'}>
                  {getFieldDecorator(`${inputNames[5]}`, {
                    rules: [{ required: false, message: '  ' }]
                  })(
                    <Input/>
                  )}
                </FormItem>
              </div>
            </Row>
            {radioAllRow(radioNames[16],{title: '自然分娩（会阴撕裂）',radioItems: ['无','I度','II度','III度','IV度']})}
            <Row>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'产时出血'}>
                  {getFieldDecorator(`${inputNames[6]}`, {
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
                  {myRadioForm(radioNames[17],{title: '胎膜早破',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    label={''}
                    wrapperCol={{span: 22, push: 1 }}>
                    {getFieldDecorator(`${inputNames[7]}`, {
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

            {radioAllRow(radioNames[18],{title: '前置胎盘',radioItems: ['否','是']})}
            {radioAllRow(radioNames[19],{title: '胎盘早剥',radioItems: ['否','是']})}
            {radioAllRow(radioNames[20],{title: '胎盘残留',radioItems: ['否','是']})}

            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  {getFieldDecorator(`${inputNames[8]}`)(
                    <Input/>
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
            {radioAllRow(radioNames[21],{title: '产后清宫',radioItems: ['无','有']})}
            {radioInputRow(radioNames[22], inputNames[9], {title: '产后大出血',radioItems: ['无','有']},'出血量',false,'毫升')}
            {radioInputRow(radioNames[23], inputNames[18], {title: '血压异常',radioItems: ['无','有']},'血压',false,'mmHg')}
            {radioAllRow(radioNames[24],{title: '会阴伤口',radioItems: ['正常','水肿','血肿','裂开','感染','无']})}
            {radioAllRow2(radioNames[24],{title: '腹部伤口',radioItems: ['正常','敷料覆盖未见渗出物','红肿','裂开','感染','无']})}
            {radioInputRow(radioNames[26], inputNames[10], {title: '产后发热',radioItems: ['无','有']},'体温',false,'℃')}
            {radioAllRow(radioNames[27],{title: '乳房肿胀',radioItems: ['无','有']})}
            {radioAllRow(radioNames[28],{title: '哺乳困难',radioItems: ['无','有']})}
            {radioAllRow(radioNames[29],{title: '下肢水肿',radioItems: ['无','有']})}
            {radioAllRow(radioNames[30],{title: '排尿困难',radioItems: ['无','有']})}
            {radioAllRow(radioNames[31],{title: '排便困难',radioItems: ['无','有']})}
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  {getFieldDecorator(`${inputNames[11]}`)(
                    <Input/>
                  )}
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2" style={{height: '1045px',display: 'table'}}>
            <div className="itemTitle">新生儿情况</div>
          </Col>
          <Col span="22">
            {radioAllRow(radioNames[32],{title: '性别',radioItems: ['男','女']})}

            <Row>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'出生体重'}>
                  {getFieldDecorator(`${inputNames[12]}`, {
                    rules: [{ required: false, message: '  ' }]
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
                  {getFieldDecorator(`${inputNames[13]}`, {
                    rules: [{ required: false, message: '  ' }]
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
                {apgarScoreRow()}
              </div>
            </Row>
            {radioAllRow(radioNames[33],{title: '喂养方式',radioItems: ['纯母乳','混合','人工']})}
            {radioAllRow(radioNames[34],{title: '产时胎心异常',radioItems: ['无','胎心快','胎心慢']})}
            {radioAllRow(radioNames[35],{title: '高胆红素血症',radioItems: ['无','有']})}
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm(radioNames[36],{title: '蓝光治疗史',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    label={''}
                    wrapperCol={{span: 22, push: 1 }}>
                    {getFieldDecorator(`${inputNames[14]}`, {
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
            {radioAllRow(radioNames[37],{title: '羊水污染',radioItems: ['无','1度','2度','3度']})}
            {radioInputRow(radioNames[38], inputNames[15], {title: '发热史',radioItems: ['无','有']},'体温',false,'℃')}
            {radioAllRow(radioNames[39],{title: '低血糖史',radioItems: ['无','有']})}
            {radioAllRow(radioNames[40],{title: '呼吸困难',radioItems: ['无','有']})}
            {radioAllRow(radioNames[41],{title: '出生后窒息',radioItems: ['无','有']})}
            {radioInputRow(radioNames[42], inputNames[16], {title: '新生儿肺炎',radioItems: ['无','有']},'治疗方案',false,null)}
            {radioAllRow(radioNames[43],{title: '心脏杂音',radioItems: ['无','有']})}
            {radioAllRow(radioNames[44],{title: '皮疹',radioItems: ['无','有']})}
            {radioAllRow(radioNames[45],{title: '尿量少',radioItems: ['无','有']})}
            {radioAllRow(radioNames[46],{title: '尿结晶',radioItems: ['无','有']})}
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  {getFieldDecorator(`${inputNames[17]}`)(
                    <Input/>
                  )}
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
      <div className='button-group-bottom-common'>
        <Button className='button-group-bottom-1' onClick={handleBack}>返回</Button>
        <Button className='button-group-bottom-2' type="primary" onClick={handleSubmit}>保存</Button>
      </div>
    </div>
  );
}

const HealthyhomeFrom = Form.create()(HealthyhomeMainComponent);

class Healthyhome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input_requireds:{
        input_0_required:false,
        input_1_required:false,
        input_2_required:false,
        input_3_required:false,
        input_7_required:false,
        input_9_required:false,
        input_10_required:false,
        input_14_required:false,
        input_15_required:false,
        input_16_required:false
      }
    }
  }

  operationRadio(value) {
    console.log(this.state);

    this.setState ({
      input_0_required: true
    });

    console.log(this.state);

  }

  render (){
    return (
      <div>
        <HealthyhomeFrom ref="mainForm" {...this.props} {...this.state} operationRadio={() => {this.operationRadio.bind(this)}}/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId,
  };
}


export default connect(mapStateToProps)(Healthyhome)
