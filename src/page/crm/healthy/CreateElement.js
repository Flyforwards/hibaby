/**
 * Created by yangjingjing on 2017/8/28.
 */
import React from 'react';
import { Button, Col, Form, Input, Row, Radio, Select,Modal,Checkbox } from 'antd'
import FileUpload from './fileUpload';
const Option = Select.Option;
const InputGroup = Input.Group;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
const disabled = false;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
}

let props_ = null;
export function setImgInputRequired(imgInputName,value,props){
  props_ = props;
  props.dispatch({
    type : 'healthInformation/setImgInputRequired',
    payload : {
      imgInputName : imgInputName,
      value :value
    }
  });
}


//单选item
export function myRadioForm (radioName, dict,props) {
  const { getFieldDecorator } = props.form;


  const radioItemDivs = [];
  for (let i = 0; i < dict.radioItems.length; i++) {
    radioItemDivs.push(
      <Radio key={i} value={i+""} disabled={disabled}>{dict.radioItems[i]}</Radio>
    );
  }

  return (
    <FormItem
      label={dict.title}
      {...formItemLayout}
      style={{height: '100%'}}
    >
      {getFieldDecorator(`${radioName}`, {
        initialValue : dict.value,
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
export function secondRadioForm (radioName ,dict,props) {
  const { getFieldDecorator } = props.form;

  const radioItemDivs = [];
  for (let i = 0; i < dict.radioItems.length; i++) {
    radioItemDivs.push(
      <Radio key={i} value={i+""} disabled={disabled}>{dict.radioItems[i]}</Radio>
    );
  }

  return (
    <FormItem
      label={dict.title}
      labelCol={{span: 5}}
      wrapperCol={{span: 18}}
    >
      {getFieldDecorator(`${radioName}`, {
        initialValue : dict.value,
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
  console.log(value);
  const {form} = props_;
  props_.dispatch({
    type : 'healthInformation/addImgData',
    payload : {
      imgInputName :imgInputName,
      value : value
    }
  });
}
function imgInputDeleteImgFun(imgInputName,value){
  console.log("删除图片成功");
  console.log(value);
  const {form} = props_;
  props_.dispatch({
    type : 'healthInformation/delImgData',
    payload : {
      imgInputName :imgInputName,
      value : value
    }
  });
}

//上传附件 传一个key过来
export function uploadOptionsItem (key,imgInputName,required,props) {
  props_ = props;
  let addImgFun = imgInput_1AddImg;
  let deleteImgFun = imgInputDeleteImgFun;
  let defaultFileList = [];
  if(imgInputName === 'imgInput_1'){
    defaultFileList = props.healthInformation.imgInput_1_arr;
  }else if(imgInputName === 'imgInput_2'){
    defaultFileList = props.healthInformation.imgInput_2_arr;
  }else if(imgInputName === 'imgInput_3'){
    defaultFileList = props.healthInformation.imgInput_3_arr;
  }else if(imgInputName === 'imgInput_4'){
    defaultFileList = props.healthInformation.imgInput_4_arr;
  }else if(imgInputName === 'imgInput_5'){
    defaultFileList = props.healthInformation.imgInput_5_arr;
  }else if(imgInputName === 'imgInput_6'){
    defaultFileList = props.healthInformation.imgInput_6_arr;
  }else if(imgInputName === 'imgInput_7'){
    defaultFileList = props.healthInformation.imgInput_7_arr;
  }else if(imgInputName === 'imgInput_8'){
    defaultFileList = props.healthInformation.imgInput_8_arr;
  }

  for(var i=0;i<defaultFileList.length;i++){
    defaultFileList[i].uid = i;
  }
  const { getFieldDecorator } = props.form;


  return (
    <FormItem
      labelCol={{span: 4}}
      wrapperCol={{span: 18}}
      label="附件:">
      {getFieldDecorator(`${imgInputName}`, {
        rules: [{ required: required, message: '请上传附件' }]
      })(
        <FileUpload defaultFileList={defaultFileList}  addImgFun={addImgFun} deleteImgFun={deleteImgFun} imgInputName={imgInputName}>
          <Button key={key} type="primary" className="uploadOptionsButton">上传附件</Button>
        </FileUpload>
      )}
    </FormItem>

  )
}

//评分选择器
function scoreSelectDiv (selectName,props,healthInfo) {
  const { getFieldDecorator } = props.form;
  const optionItemDivs = [];
  for (let i = 0; i <= 10; i++) {
    optionItemDivs.push(
      <Option key={i} value={''+i}>{i}</Option>
    );
  }
  return (
    <FormItem>
      {getFieldDecorator(`${selectName}`,{
        initialValue : healthInfo[`${selectName}`],
      })(
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
export function apgarScoreRow (props,healthInfo) {
  return (
    <div className="ApgarOption">
      <Col span="5">
        <div className="uploadOptions">Apgar评分:</div>
      </Col>
      <Col span="2">
        <div className="upload">{scoreSelectDiv('select_0',props,healthInfo)}</div>
      </Col>
      <Col span="1">
        <div className="score-line">-</div>
      </Col>
      <Col span="2">
        <div className="upload">{scoreSelectDiv('select_1',props,healthInfo)}</div>
      </Col>
      <Col span="1">
        <div className="score-line">-</div>
      </Col>
      <Col span="2">
        <div className="upload">{scoreSelectDiv('select_2',props,healthInfo)}</div>
      </Col>
      <Col span="1">
        <div className="uploadOptions Fraction">分</div>
      </Col>
    </div>
  )
}

//row 左边单选右边输入框
export function radioInputRow (radioName, inputName, dict, inputTitle, lastRow, suffix,props) {
  var col1Class='topItembg';
  var col2Class='leftRightItemBg';
  if (lastRow == true){
    col1Class='bottomItemBg';
    col2Class='allNoneBg';
  }
  const { getFieldDecorator } = props.form;

  return (
    <Row>
      <Col span="12">
        <div className={col1Class}>
          {myRadioForm(radioName ,dict,props)}
        </div>
      </Col>
      <Col span="12">
        <div className={col2Class}>
          <FormItem
            labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            label={inputTitle}>
            {getFieldDecorator(`${inputName}`, {
              initialValue : dict.info,
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

//row 左边单选右边空白
export function radioSpaceRow (radioName, dict, lastRow,props) {
  var col1Class='rightItemBg';
  if (lastRow == true){
    col1Class='bottomItemBg';
  }

  return (
    <Row className={col1Class}>
      <Col span="12">
        <div>
          {myRadioForm(radioName, dict,props)}
        </div>
      </Col>
    </Row>
  )
}

//row 整行单选
export function radioAllRow (radioName, dict,props) {
  return (
    <Row>
      <Col>
        <div className="rightItemBg">
          {secondRadioForm(radioName, dict,props)}
        </div>
      </Col>
    </Row>
  )
}

//row 整行单选
export function radioAllRow2 (radioName, dict,props) {
  return (
    <Row>
      <Col>
        <div className="rightItemBg">
          {secondRadioForm2(radioName, dict,6,props)}
        </div>
      </Col>
    </Row>
  )
}



//整行的单选item
export function secondRadioForm2 (radioName ,dict,index,props) {
  const radioItemDivs = [];
  for (let i = 0; i < dict.radioItems.length; i++) {
    radioItemDivs.push(
      <Radio key={i} value={(i+index)+""}>{dict.radioItems[i]}</Radio>
    );
  }
  const { getFieldDecorator } = props.form;

  return (
    <FormItem
      label={dict.title}
      labelCol={{span: 5}}
      wrapperCol={{span: 18}}
    >
      {getFieldDecorator(`${radioName}`, {
        initialValue : dict.value,
        rules: [{ required: false, message: '  ' }]
      })(
        <RadioGroup>
          {radioItemDivs}
        </RadioGroup>
      )}
    </FormItem>
  )
}




