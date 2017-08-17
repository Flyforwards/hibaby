import React from 'react';
import FileUpload from '../crm/customer/fileUpload'
import DictionarySelect from 'common/dictionary_select';
import './serviceComponent.scss'
import moment from 'moment';
import {Icon,Card ,Switch,Input,Form,Select,InputNumber,DatePicker,Row, Col,Button,Radio,Spin,message} from 'antd';
const Option = Select.Option;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;


export function ServiceComponentCreat(form,dict) {
    return (
      <Col span={dict.span?dict.span:6} offset={dict.offset?dict.offset:0} key={dict.submitStr}>
        {cusFromItem(form,dict)}
      </Col>
    );
}

function onChange(dict) {
  // dict.disabled = dict
}

function creatInput(dict) {
  return  <Input style={dict.component === 'Input' ? {width:'100%'} : {width:'80%'}} addonAfter={dict.unit}   disabled={dict.disabled}/>
}

function creatComponent(form,dict) {

  dict.disabled =  location.pathname.indexOf('detail') != -1

  const { getFieldDecorator } = form;

  let tempDiv = (<Input/>);
  let children = []
  if(dict.chiAry){
    for(let i = 0;i<dict.chiAry.length;i++){
      children.push(<Option key={i}>{dict.chiAry[i]}</Option>)
    }
  }

  if (dict.selectName){
    tempDiv = (<DictionarySelect className="antCli"  disabled={dict.disabled} placeholder="请选择" selectName={dict.selectName}/>);
  }
  else{
    switch (dict.component) {
      case 'Input':
        tempDiv = creatInput(dict);
        break;
      case 'TextArea':
        tempDiv = <TextArea style={{width:'100%'}} disabled={dict.disabled}/>;
        break;

      case 'Select':
        tempDiv = (<Select style={{width: '100%' }} disabled={dict.disabled} mode={dict.mode} onChange={dict.fun} placeholder='请选择'>{children}</Select>);
        break;
      case 'DatePicker':
        tempDiv = (<DatePicker style={{width: '100%' }} disabled={dict.disabled} disabledDate={dict.disabledDate} onChange={dict.fun} ranges={dict.ranges} placeholder='请选择'>{children}</DatePicker>);
        break;
      case 'InputNumber':
        tempDiv = (<InputNumber style={{width: '100%' }} disabled={dict.disabled} min={1} max={dict.max}/>);
        break;
      case 'Switch':
        tempDiv = (<Switch checkedChildren="是" unCheckedChildren="否" disabled={dict.disabled}/>);
        break;
      case 'gender':
        tempDiv = (<RadioGroup disabled={dict.disabled}>
          <Radio value={1}>男</Radio>
          <Radio value={0}>女</Radio>
        </RadioGroup>);
        break;
      case 'RadioGroup':
        tempDiv = (<RadioGroup disabled={dict.disabled}>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </RadioGroup>);
        break;
      case 'InputGroup':
          tempDiv = (
            <InputGroup compact>
              <Radio disabled={dict.disabled} style={{ width: '30px' }} value={0}>无</Radio>
                {getFieldDecorator(dict.submitStr,{initialValue:dict.initValue})(
                   creatInput(dict)
                )}
            </InputGroup>);
        break;
      case 'TextAreaGroup':
        tempDiv = (
          <InputGroup compact>
            <Radio disabled={dict.disabled} style={{ width: '30px' }} value={0}>无</Radio>
            {getFieldDecorator(dict.submitStr,{initialValue:dict.initValue})(
              <TextArea style={{width:'90%'}} disabled={dict.disabled}/>
            )}
          </InputGroup>);
        break;

      case 'UploadButton':
      {
        tempDiv =
          <FileUpload  fun={dict.fun} deleteFun={dict.deleteFun}>
            <Button><Icon type="upload"/> 上传附件</Button>
          </FileUpload>
      }
        break;
      default:
    }
  }
  return (tempDiv)
}

function cusFromItem(form,dict) {

  function fileRule(rule, value, callback) {
    if (value.length > 0) {
      callback();
      return;
    }
    callback('请上传文件');
  }

  const { getFieldDecorator } = form;

  let rules = { rules: [{ required: dict.noRequired?false:true,  message: `请输入${dict.title || '此项'}!`}],};

  if (dict.component === 'UploadButton')
  {
    rules = {rules: [{validator:fileRule}]};
  }

  let formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };

  if(dict.span === 24){
    formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
  }

  if(dict.component === 'TextAreaGroup'||dict.component === 'InputGroup'){
    return(
      <FormItem  {...formItemLayout} label={dict.title}>
        {creatComponent(form,dict)}
      </FormItem>
    )
  }

  return(
       <FormItem  {...formItemLayout} label={dict.title}>
        {getFieldDecorator((dict.component === 'InputGroup' ? dict.submitStr+'big' : dict.submitStr ),{...rules,initialValue:dict.initValue})(
          creatComponent(form,dict)
        )}
      </FormItem>
  )
}

export function CreatCard(form,superDict) {

  const {title,ary,netData} = superDict

  let chiAry = []
  let tempAry = []

  for(let i = 0;i<ary.length;i++){
    const dict = ary[i];

    if(netData){
      if(dict.component === 'DatePicker'){
        if(netData[dict.submitStr]){
          dict.initValue = moment(netData[dict.submitStr]);
        }
        else {
          dict.initValue = null
        }
      }
      else{
        dict.initValue = netData[dict.submitStr]
      }
    }
    if(dict.span === 24){
      if(tempAry.length > 0){
        chiAry.push(<Row>{tempAry}</Row>)
        tempAry = [];
      }
      chiAry.push(<Row>{ServiceComponentCreat(form,dict)}</Row> )
    }
    else{
      let span = 0;
      for(let j = 0;j<tempAry.length;j++){
        const chiDict = tempAry[j].props
        span += chiDict.span;
        span += chiDict.offset;
      }

      if(span == 24){
        chiAry.push(<Row>{tempAry}</Row>)
        tempAry = [];
        tempAry.push(ServiceComponentCreat(form,dict))
      }
      else{
        tempAry.push(ServiceComponentCreat(form,dict))
      }
    }
  }


  if(tempAry.length > 0){
    chiAry.push(<Row>{tempAry}</Row>)
  }

  return (
    <Card title={title} bodyStyle={{ padding:'15px 15px 0 15px'}} bordered={false}  style={{ width: '100%' }}>
      {chiAry}
    </Card>
  )
}

export function creatButton(title,onclick) {

  let className = 'bottomButton button-group-bottom-1'

  if(title === '确定'){
    className = 'bottomButton button-group-bottom-2'
  }
  if(title === '编辑'){
    className = 'bottomButton button-group-bottom-2'
  }
  if(title === '打印'){
    className = 'bottomButton button-group-bottom-3'
  }
  if(title === '删除'){
    className = 'bottomButton button-group-2'
  }
  return (<Button className={className} onClick={onclick}>{title}</Button>)
}
