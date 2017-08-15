import React from 'react';
import FileUpload from '../crm/customer/fileUpload'
import {Icon,Card ,Modal,Input,Form,Select,InputNumber,DatePicker,Row, Col,Button,Table,Spin,message} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;


export function ServiceComponentCreat(form,dict) {
    return (
      <Col span={dict.span?dict.span:6} offset={dict.offset?dict.offset:0} key={dict.submitStr}>
        {cusFromItem(form,dict)}
      </Col>
    );
}

function creatComponent(dict) {
  let tempDiv = (<Input/>);

  switch (dict.component) {
    case 'Input':
      tempDiv = (<Input disabled={dict.disabled}/>);
      break;
    case 'Select':
      tempDiv = (<Select labelInValue={true} disabled={dict.disabled} mode={dict.mode} onChange={dict.fun} placeholder='请选择'>{dict.children}</Select>);
      break;
    case 'DatePicker':
      tempDiv = (<DatePicker style={{width: '100%' }} disabledDate={dict.disabledDate} onChange={dict.fun} ranges={dict.ranges} placeholder='请选择'>{dict.children}</DatePicker>);

      break;
    case 'InputNumber':
      tempDiv = (<InputNumber className="antCli" disabled={dict.disabled} min={1} max={dict.max}/>);
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
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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


  for(let i = 0;i<ary.length;i++){
    const dict = ary[i];
    dict.submitStr = key+i
    chiAry.push(ServiceComponentCreat(form,dict))
  }


  return (
    <Card title={title} bordered={false} style={{ width: '100%' }}>
      <Row>
        {chiAry}
      </Row>
    </Card>
  )
}
