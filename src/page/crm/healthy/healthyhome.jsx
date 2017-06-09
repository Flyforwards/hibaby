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
function Healthyhome(props) {

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
          <RadioGroup onChange={dict.radioChangeFun} >
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
          <RadioGroup>
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

    var col1Class='topItembg';
    var col2Class='leftRightItemBg';
    if (lastRow == true){
      col1Class='bottomItemBg';
      col2Class='allNoneBg';
    }

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
                rules: [{ required: false, message: '  ' }]
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

  //row 左边单选右边上传附件
  function radioUploadOptionsRow (radioName, dict, key, lastRow,imgInputName,imgRequired) {
    var col1Class='topRightItemBg';
    var col2Class='onlyLeftItemBg';

    return (
      <Row className={col1Class}>
        <Col span="12">
          <div>
            {myRadioForm(radioName ,dict)}
          </div>
        </Col>
        <Col span="12">
          <div className={col2Class}>
            {uploadOptionsItem(key,imgInputName,imgRequired)}
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

  //提交表单
  function handleSubmit (e) {
    //console.log("您点击了保存按钮");
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
    props.form.validateFields((err, values) => {
      if (!err) {
        const healthInfo = JSON.stringify(values);
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
    props.dispatch(routerRedux.push('/crm/customer'));
  }

  return(
    <div className="healthContentDiv">
      <Form>
        <Row className="firstItem" key="1">
          <Col span="2" style={{height: '110px',display: 'table'}}>
            <div className="itemTitle">既往史</div>
          </Col>
          <Col span="22">
            {radioInputRow(radioNames[0],inputNames[0],{title: '既往疾病史',radioItems: ['无','有']},'请描述')}
            {radioInputRow(radioNames[1],inputNames[1],{title: '既往手术史',radioItems: ['无','有']},'请描述',true)}
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
                  {myRadioForm(radioNames[6],{title: '已肝病毒感染或携带',radioItems: ['否','是','大三阳','小三阳','单纯表面抗原阳性']})}
                </div>
              </Col>
              <Col span="12">
                <div className="onlyLeftItemBg" style={{minHeight: '110px'}}>
                  {uploadOptionsItem('5','imgInput_5')}
                </div>
              </Col>
            </Row>
            {radioUploadOptionsRow(radioNames[7],{title: '丙肝病毒感染或携带',radioItems: ['否','是']},'6',false,'imgInput_6',false)}
            {radioUploadOptionsRow(radioNames[8],{title: '梅毒病毒感染或携带',radioItems: ['否','是']},'7',false,'imgInput_7',false)}
            {radioUploadOptionsRow(radioNames[9],{title: '艾滋病病毒感染或携带',radioItems: ['否','是']},'8',false,'imgInput_8',false)}
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm(radioNames[10],{title: '高血压',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    label={'孕期最高血压'}>
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
            {radioAllRow(radioNames[15],{title: '自然分娩（侧切）',radioItems: ['无','有']})}
            {radioAllRow(radioNames[16],{title: '自然分娩（会阴撕裂）',radioItems: ['无','有','I度','II度','III度','IV度']})}
            <Row>
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
            {radioAllRow(radioNames[23],{title: '血压异常',radioItems: ['无','有','低血压','高血压']})}
            {radioAllRow(radioNames[24],{title: '会阴伤口',radioItems: ['正常','水肿','血肿','裂开']})}
            {radioAllRow(radioNames[25],{title: '腹部伤口',radioItems: ['正常','水肿','裂开','感染']})}
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
            {radioAllRow(radioNames[34],{title: '产时胎心异常',radioItems: ['无','有','胎心快','胎心慢']})}
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
            {radioAllRow(radioNames[37],{title: '羊水污染',radioItems: ['无','有','1度','2度','3度']})}
            {radioInputRow(radioNames[38], inputNames[15], {title: '发热史',radioItems: ['否','是']},'体温',false,'℃')}
            {radioAllRow(radioNames[39],{title: '低血糖史',radioItems: ['无','有']})}
            {radioAllRow(radioNames[40],{title: '呼吸困难',radioItems: ['无','有']})}
            {radioAllRow(radioNames[41],{title: '出生后窒息',radioItems: ['无','有']})}
            {radioInputRow(radioNames[42], inputNames[16], {title: '新生儿肺炎',radioItems: ['否','是']},'体温',false,'℃')}
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

      <div className='bottomButton'>
        <Button className='commitButton BackBtn' onClick={handleBack}>返回</Button>
        <Button className='commitButton SaveBtn' type="primary" onClick={handleSubmit}>保存</Button>
      </div>

    </div>
  );
}

const HealthyhomeFrom = Form.create()(Healthyhome);


function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}


export default connect(mapStateToProps)(HealthyhomeFrom)
