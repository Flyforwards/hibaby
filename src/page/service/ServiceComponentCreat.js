import React from 'react';
import FileUpload from '../crm/customer/fileUpload'
import DictionarySelect from 'common/dictionary_select';
import './serviceComponent.scss'
import {Icon,Card ,Switch,Input,Form,Select,InputNumber,DatePicker,Row, Col,Button,Radio,Spin,message} from 'antd';
const Option = Select.Option;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;


export function ServiceComponentCreat(form,dict) {
    return (
      <Col span={dict.span?dict.span:6} offset={dict.offset?dict.offset:0} key={dict.submitStr}>
        {cusFromItem(form,dict)}
      </Col>
    );
}

function onChange(dict) {
  console.log(dict)
  // dict.disabled = dict
}

function creatComponent(dict) {
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
        tempDiv = (<Input  disabled={dict.disabled}/>);
        break;
      case 'Select':
        tempDiv = (<Select style={{width: '100%' }} labelInValue={true} disabled={dict.disabled} mode={dict.mode} onChange={dict.fun} placeholder='请选择'>{children}</Select>);
        break;
      case 'DatePicker':
        tempDiv = (<DatePicker style={{width: '100%' }} disabledDate={dict.disabledDate} onChange={dict.fun} ranges={dict.ranges} placeholder='请选择'>{children}</DatePicker>);
        break;
      case 'InputNumber':
        tempDiv = (<InputNumber className="antCli" disabled={dict.disabled} min={1} max={dict.max}/>);
        break;
      case 'Switch':
        tempDiv = (<Switch checkedChildren="是" unCheckedChildren="否" disabled={dict.disabled}/>);
        break;
      case 'RadioGroup':
        tempDiv = (<RadioGroup >
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </RadioGroup>);
        break;
      case 'InputGroup':
        if(dict.title === '产后出血'){
          tempDiv = (
            <InputGroup compact>
              <Radio style={{ width: '30px' }} value={0}>无</Radio>
              <Input className="InputW" addonAfter="ml" disabled={dict.disabled}/>
            </InputGroup>);
        }
        else if(dict.title === '血压异常'){
          tempDiv = (
            <InputGroup compact>
              <Radio style={{ width: '30px' }} value={0}>无</Radio>
              <Input className="InputW" addonAfter="mmHg"   disabled={dict.disabled}/>
            </InputGroup>);
        }
        else if(dict.title === '产后发热'){
          tempDiv = (
            <InputGroup compact>
              <Radio style={{ width: '30px' }} value={0}>无</Radio>
              <Input className="InputW" addonAfter="℃"   disabled={dict.disabled}/>
            </InputGroup>);
        }
        else{
          tempDiv = (
            <InputGroup compact>
              <RadioGroup onChange={()=>{onChange(dict)}} style={{ width: '8%' }} >
                <Radio value={1}>有</Radio>
                <Radio value={0}>无</Radio>
              </RadioGroup>
              <Input style={{ width: '92%' }}  disabled={dict.disabled}/>
            </InputGroup>);
        }

        break;
      case 'UploadButton':
      {
        tempDiv =
          <FileUpload fun={dict.fun} deleteFun={dict.deleteFun}>
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

  return(
       <FormItem  {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr,{...rules,initialValue:dict.initValue})(
          creatComponent(dict)
        )}
      </FormItem>
  )
}

export function CreatCard(form,superDict) {

  const {title,key,ary} = superDict

  let chiAry = []
  let tempAry = []

  for(let i = 0;i<ary.length;i++){
    const dict = ary[i];
    dict.submitStr = key+i

    if(dict.span === 24){
      if(tempAry.length > 0){
        chiAry.push(<Row>{tempAry}</Row>)
        tempAry = [];
      }
      chiAry.push(<Row>{ServiceComponentCreat(form,dict)}</Row> )
    }
    else{
      if(i % 4 === 0){
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
    <Card title={title} bordered={false} style={{ width: '100%' }}>
      {chiAry}
    </Card>
  )
}

export function CreatIndexSearch() {
  return(
    <Row>

    </Row>
  )
}


function CustomerSearch(props) {
  const {getFieldDecorator} = props.form;
  const {dispatch,shipCards,packageAry} = props;
  const searchAry = [
    [{title:'年龄',component:'InputNumber',submitStr:'age1'},
      {component:'InputNumber',submitStr:'age2'}],
    {title:'预产期',component:'MonthDate',submitStr:'dueDate'},
    {title:'操作者2',component:'Input',submitStr:'operator'},
    {title:'会员身份',component:'Select',submitStr:'member',selectName:'MEMBER'},
    {title:'籍贯',component:'Input',submitStr:'placeOrigin'},
    {title:'第几胎',component:'Select',submitStr:'fetus',selectName:'FETUS'},
    {title:'意向套餐',component:'Select',submitStr:'intentionPackage',selectName:'IntentionPackage'},
    {title:'购买套餐',component:'Select',submitStr:'purchasePackage',selectName:'IntentionPackage'},
    {title:'孕周',component:'Input',submitStr:'gestationalWeeks'},
    {title:'宝宝生日',component:'Date',submitStr:'productionDate'},
    {title:'分娩医院',component:'Select',submitStr:'hospital',selectName:'Hospital'},
  ]

  const options = shipCards.map((record) => {
    return (<Option key={record.id} value={record.id}>{record.name}</Option>)
  });

  const purchasePackageOptions = packageAry.map((record) => {
    return (<Option key={record.id} value={record.id}>{record.name}</Option>)
  });

  function creatComponent(dict) {

    let formItemLayout = dict.title ? {labelCol: {span: 8},wrapperCol: {span: 16}} : {labelCol: {span: 0},wrapperCol: {span: 24}}

    return(
      <FormItem {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr)
        (
          dict.selectName?(
              dict.submitStr === 'member'?<Select className='antCli' placeholder='请选择'>{options}</Select>:(
                dict.submitStr === 'purchasePackage'?<Select className='antCli' placeholder='请选择'>{purchasePackageOptions}</Select>:
                  <DictionarySelect className='antCli' placeholder="请选择" selectName={dict.selectName}/>
              )
            )
            :
            ( dict.component  === 'Date'?
                <DatePicker style={{width: '100%'}}/>:
                (dict.component  === 'MonthDate')?
                  <MonthPicker style={{width: '100%'}}/>:
                  (
                    dict.component  === 'Input'? <Input style={{height:dict.submitStr === 'sear'?'40px':'32px'}} placeholder={dict.submitStr === 'sear' ? '输入客户编号、客户姓名、联系方式、合同编号':"请填写"} className='antCli'/>
                      :<InputNumber min={1} max={100}/>
                  )

            )
        )}
      </FormItem>
    )
  }


  let searchChiAry = [];
  let tempChiAry = [];

  for(let i = 0;i<searchAry.length;i++){
    const dict = searchAry[i];
    if((i%4) === 0){
      searchChiAry.push(<Row key={i}>{tempChiAry}</Row>)
      tempChiAry = [];
    }

    if(i === 0){

      tempChiAry.push (
        <Col  key={dict[0].submitStr} span={4}>
          <Row><Col span={19} offset={5}>
            {creatComponent(dict[0])}
          </Col></Row>
        </Col>,
        <Col key={dict[1].submitStr} span={2}>
          <Row><Col span={23} offset={1}>
            {creatComponent(dict[1])}
          </Col></Row>
        </Col>
      )
    }
    else {
      tempChiAry.push (
        <Col key={dict.submitStr} span={6}>
          {creatComponent(dict)}
        </Col>
      )
    }
  }
  if(tempChiAry.length < 4){
    searchChiAry.push(<Row key={searchAry.length}>{tempChiAry}</Row>)
  }


  function reset() {
    props.form.resetFields();
    onSearch()
  }

  function onSearch(e) {

    props.form.validateFields((err, values) => {
      if (!err) {
        let param = {};
        Object.keys(values).map((key) => {
          const value = values[key];
          if(value){
            if(typeof value === 'object'){
              if(key === 'dueDate'){
                param.year = value.format('YYYY');
                param.month = value.format('M');
              }
              else{
                param[key] = value.format();
              }
            }
            else {
              param[key] = value;
            }
          }
        })

        dispatch({
          type: 'roomStatusManagement/getCustomerPage',
          payload: param,
        });
      }
    })
  }

  const searBar = creatComponent({component:'Input',submitStr:'sear'})

  const HeadSrarch = () =>{
    return(
      <Row>
        <Col offset={1} span={17}>{searBar}</Col>
        <Col offset={1} span={5}>
          <Row><Col>
            <Button onClick={ reset} style={{float:'right'}} className='button-group-1'>重置</Button>
            <Button onClick={ onSearch} style={{float:'right',marginRight:'10px'}} className='button-group-2'>查询</Button>
          </Col></Row>
        </Col>
      </Row>
    )
  }

  return(
    <div>
      {HeadSrarch()}
      {searchChiAry}
    </div>
  )
}
