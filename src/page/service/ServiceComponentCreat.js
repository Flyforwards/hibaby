import React from 'react';
import FileUpload from '../crm/customer/fileUpload'
import DictionarySelect from 'common/dictionary_select';
import './serviceComponent.scss'
import moment from 'moment';
import {Icon,Card ,Switch,Input,Form,Select,InputNumber,DatePicker,Row, Col,Button,Radio,Spin,Modal,Checkbox} from 'antd';
const Option = Select.Option;
const InputGroup = Input.Group;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const FormItem = Form.Item;


export function ServiceComponentCreat(form,dict) {
  return (
    <Col style={{height:'56px',display:dict.hide?'none':''}} span={dict.span?dict.span:6} offset={dict.offset?dict.offset:0} key={dict.key?dict.key:dict.submitStr}>
      {cusFromItem(form,dict)}
    </Col>
  );
}

function onChange(dict) {
  // dict.disabled = dict
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

  //radio 自定义单选
  let radioChildren = [];
  if(dict.radioAry) {
    dict.radioAry.map(function(elem,index){
      radioChildren.push(
        <Radio value={elem.value}>{elem.name}</Radio>
      )
    })
  }
  //checkbox自定义多选
  let checkChildren ;
  if(dict.checkAry) {
    checkChildren = dict.checkAry;
  }

  if (dict.selectName){
    tempDiv = (<DictionarySelect className="antCli"  disabled={dict.disabled} placeholder="请选择" selectName={dict.selectName}/>);
  }
  else{
    switch (dict.component) {
      case 'Input':
        tempDiv = <Input style={ {width:'100%'} } addonAfter={dict.unit}   disabled={dict.disabled}/>;
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
      case 'RadioGroups':
        tempDiv = (<RadioGroup onChange={dict.fun} disabled={dict.disabled}>
          { radioChildren }
        </RadioGroup>);
        break;
      case 'CheckBoxGroup':
        tempDiv = (
          <CheckboxGroup onChange={dict.fun} options={checkChildren} disabled={dict.disabled}/>
        );
        break;
        tempDiv = (<RadioGroup disabled={dict.disabled}>
          { radioChildren }
        </RadioGroup>);
        break;
      case 'InputGroup':
        tempDiv = <InputClass dict={dict} form={form}/>;
        break;
      case 'TextAreaGroup':
        tempDiv = <InputClass Area dict={dict} form={form}/>
        break;
      case 'UploadButton':
      {
        tempDiv =
          <FileUpload  fun={dict.fun} deleteFun={dict.deleteFun}>
            <Button><Icon type="upload"/> 上传附件</Button>
          </FileUpload>
      }
        break;
      //客户签字
      case 'Signature':
      {
        tempDiv =
         <div></div>
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
  //
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
  if(dict.formItems === "TwoWords" ){
    formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    }
  }
  if(dict.span === 16 ){
    formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 21 },
    }
  }
  if(dict.formItems === "FourWords" ){
    formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
  }
  if(dict.title === '手术指征'){
    formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
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
      {getFieldDecorator((dict.submitStr ),{...rules,initialValue:dict.initValue})(
        creatComponent(form,dict)
      )}
    </FormItem>
  )
}

export function CreatCard(form,superDict) {

  const {title,ary,netData} = superDict

  let chiAry = []

  for(let i = 0;i<ary.length;i++) {
    const dict = ary[i];

    if (netData) {
      if (dict.component === 'DatePicker') {
        if (netData[dict.submitStr]) {
          dict.initValue = moment(netData[dict.submitStr]);
        }
        else {
          dict.initValue = null
        }
      }
      else {
        dict.initValue = netData[dict.submitStr]
      }
    }

    chiAry.push(ServiceComponentCreat(form, dict))
  }

  return (
    <Card title={title} bodyStyle={{ padding:'15px 15px 0 15px'}} bordered={false}  style={{ width: '100%' }}>
      {chiAry}
    </Card>
  )
}

export class InputClass extends React.Component{

  constructor(props){
    super(props)
    this.state={radio:''}
  }

  radioChange(){
    const {dict,form} = this.props;
    this.setState({radio:true})
    let tempDict = {};
    tempDict[dict['submitStr']] = ''
    form.setFieldsValue(tempDict)
  }

  inputChange(e){
    const str = e.target.value;
    this.setState({radio:(str?false:true)})
  }

  render(){
    const {dict,form,Area} = this.props;
    const {getFieldDecorator} = form
    return(
      <InputGroup compact>
        <Radio disabled={dict.disabled} checked={this.state.radio !== ''? this.state.radio:!dict.initValue } style={{ width: '30px' }} onChange={this.radioChange.bind(this)} value={0}>无</Radio>
        {getFieldDecorator(dict.submitStr,{initialValue:dict.initValue})(
          Area === true
              ?
            <TextArea style={{width:'90%'}} onChange={this.inputChange.bind(this)} disabled={dict.disabled}/>
            :
            <Input placeholder={dict.placeholder?dict.placeholder:null} style={{width:'80%',height: '30px'}} addonAfter={dict.unit} onChange={this.inputChange.bind(this)}  disabled={dict.disabled}/>
        )}
      </InputGroup>
    )
  }
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
  return (<Button className={className} onClick={title === '删除' ?()=>{showConfirm(onclick)} :onclick}>{title}</Button>)
}

function showConfirm(fun) {
  confirm({
    title: '确定删除吗?',
    onOk() {
      fun()
    },
    onCancel() {},
  });
}
