import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import FileUpload from './fileUpload'
import moment from 'moment';

import {Icon, Modal,Input,Select,InputNumber,DatePicker,Row, Col,Form,Button,Table} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

function jsGetAge(strBirthday){
  var returnAge;
  var strBirthdayArr=strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  let d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if(nowYear == birthYear){
    returnAge = 0;//同年 则为0岁
  }
  else{
    var ageDiff = nowYear - birthYear ; //年之差
    if(ageDiff > 0){
      if(nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if(dayDiff < 0)
        {
          returnAge = ageDiff - 1;
        }
        else
        {
          returnAge = ageDiff ;
        }
      }
      else
      {
        var monthDiff = nowMonth - birthMonth;//月之差
        if(monthDiff < 0)
        {
          returnAge = ageDiff - 1;
        }
        else
        {
          returnAge = ageDiff ;
        }
      }
    }
    else
    {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge;//返回周岁年龄

}


function cusComponent(dict) {
  let tempDiv = (<Input/>);

  switch (dict.component) {
    case 'Input':
        tempDiv = (<Input disabled={dict.disabled}/>);
      break;
    case 'Select':
      if (dict.fun)
      {
        tempDiv = (<Select onChange={dict.fun} placeholder='请选择'>{dict.children}</Select>);
      }
      else {
        tempDiv = (<Select placeholder='请选择'>{dict.children}</Select>);
      }
      break;
    case 'DatePicker':
      if (dict.fun)
      {
        tempDiv = (<DatePicker onChange={dict.fun} ranges={dict.ranges} placeholder='请选择'>{dict.children}</DatePicker>);
      }
      else {
        tempDiv = (<DatePicker placeholder='请选择'>{dict.children}</DatePicker>);
      }
      break;
    case 'InputNumber':
        tempDiv = (<InputNumber className="antCli" disabled={dict.disabled} min={1} max={dict.max}/>);
      break;
    case 'UploadButton':
    {
      tempDiv = <FileUpload deleteFun={dict.deleteFun} fun={dict.fun}>
        <Button><Icon type="upload" /> 上传附件</Button>
      </FileUpload>
    }
      break;
    default:
  }

  return (
    tempDiv

  );
}

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function BaseInfo(props) {

  const {operator,fetusAry,hospitalAry,intentionPackageAry,guestInformationSourceAry,concernsAry,networkSearchWordsAry,
    provinceData,cityData,nationalData} = props.users;
  const {dispatch} = props;

  const { getFieldDecorator } = props.form;



  const guestInformationSource = [];

  for (let i = 0; i < guestInformationSourceAry.length ; i++) {
    guestInformationSource.push(<Option key={guestInformationSourceAry[i].id}>{guestInformationSourceAry[i].name}</Option>);
  }


  const concerns = [];

  for (let i = 0; i < concernsAry.length ; i++) {
    concerns.push(<Option key={concernsAry[i].id}>{concernsAry[i].name}</Option>);
  }


  const intentionPackages = [];

  for (let i = 0; i < intentionPackageAry.length ; i++) {
    intentionPackages.push(<Option key={intentionPackageAry[i].id}>{intentionPackageAry[i].name}</Option>);
  }

  const networkSearchWords = [];

  for (let i = 0; i < networkSearchWordsAry.length ; i++) {
    networkSearchWords.push(<Option key={networkSearchWordsAry[i].id}>{networkSearchWordsAry[i].name}</Option>);
  }

  const fetusChi = [];

  for (let i = 0; i < fetusAry.length ; i++) {
    fetusChi.push(<Option key={fetusAry[i].id}>{fetusAry[i].name}</Option>);
  }

  const hospitals = [];

  for (let i = 0; i < hospitalAry.length ; i++) {
    hospitals.push(<Option key={hospitalAry[i].id}>{hospitalAry[i].name}</Option>);
  }

  const provinceDataChis = [];

  for (let i = 0; i < provinceData.length ; i++) {
    provinceDataChis.push(<Option key={provinceData[i].id}>{provinceData[i].description}</Option>);
  }

  const cityDataChis = [];

  for (let i = 0; i < cityData.length ; i++) {
    cityDataChis.push(<Option key={cityData[i].id}>{cityData[i].description}</Option>);
  }

  const nationalDataChis = [];
  for (let i = 0; i < nationalData.length ; i++) {
    nationalDataChis.push(<Option key={nationalData[i].id}>{nationalData[i].nation}</Option>);
  }

  const baseInfo = [
    {title:'客户姓名',component:'Input',submitStr:'name',children:null},
    {title:'联系电话',component:'Input',submitStr:'contact',children:null},
    {title:'出生日期',component:'DatePicker',submitStr:'birthTime',children:null,fun:onChange,
      ranges:{range:[moment().subtract(10, 'years').calendar(),moment().subtract(100, 'years').calendar()]}},

    {title:'年龄',component:'InputNumber',submitStr:'age',children:null,disabled:true,max:100},
    {title:'预产期',component:'DatePicker',submitStr:'dueDate',children:null},
    {title:'孕周',component:'InputNumber',submitStr:'gestationalWeeks',children:null,max:40},
    {title:'分娩医院',component:'Select',submitStr:'hospital',children:hospitals},
    {title:'孕次/产次',component:'Select',submitStr:'fetus',children:fetusChi},
    {title:'客资来源',component:'Select',submitStr:'resourceCustomer',children:guestInformationSource},
    {title:'关注点',component:'Select',submitStr:'focus',children:concerns},
    {title:'意向套餐',component:'Select',submitStr:'intentionPackage',children:intentionPackages},
    {title:'网络搜索词',component:'Select',submitStr:'webSearchTerm',children:networkSearchWords},
  ];

  const baseInfoDiv = [];

  for (let i = 0; i < baseInfo.length; i++) {
    let dict = baseInfo[i];

    let tempDiv = cusComponent(dict);

    let rules = { rules: [{ required: true,  message: `请输入${dict.title}!`}],};

    if (dict.submitStr === 'contact')
    {
      rules = { rules: [{ required: true, pattern:/^1[34578]{1}\d{9}$/, message: `请输入正确的${dict.title}!`}]};
    }

    baseInfoDiv.push(
      <Col span={6} key={i}>
        <FormItem {...formItemLayout} label={dict.title}>
          {getFieldDecorator(dict.submitStr,rules)
          (
            tempDiv
          )}
        </FormItem>
      </Col>
    );
  }


  function onChange(date, dateString) {

    const age = jsGetAge(dateString);

    props.form.setFieldsValue({
      age: age,
    });
  }

  function provinceSelect(e) {
    dispatch({type:'addCustomer/getCityData',payload:{isHouseholdRegistration:false,dataId:e}})
  }


  return(
    <Form>
      <div className='contentDiv'>
        <h3>基本信息</h3>

        <Row>
          {baseInfoDiv}
        </Row>

        <Row gutter={1}>

          <Col span={6}>

            <FormItem {...formItemLayout} label={'现住址'}>
              {getFieldDecorator('province',{ rules: [{ required: true, message: '请输入省!'}],})(
                <Select  onChange={provinceSelect}  placeholder="请选择">
                  {provinceDataChis}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col offset={1} span={11}>
            <Row gutter={15}>
              <Col span={8}>
                <FormItem>
                  {getFieldDecorator('city',{ rules: [{ required: true, message: '请输入市!'}],})(
                    <Select placeholder="请选择">
                      {cityDataChis}
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={16}>
                <FormItem>
                  {getFieldDecorator('detailed',{ rules: [{ required: true, message: '请输入详细住址!'}],})(
                    <Input/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label={'操作者1'}>
              {getFieldDecorator('operator',{initialValue:operator})(
                <Input disabled={true}/>
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    </Form>
  )
}



function ExtensionInfo(props) {

  const {operator,memberNumberValue,purchasePackageValue,memberAry,specialIdentityAry,
    headIconUrl,provinceData,cityData,permanentCityData,nationalData} = props.users;
  const {dispatch} = props;



  const { getFieldDecorator } = props.form;

  const memberChis = [];

  for (let i = 0; i < memberAry.length ; i++) {
    memberChis.push(<Option key={memberAry[i].id}>{memberAry[i].name}</Option>);
  }

  const specialIdentityChis = [];

  for (let i = 0; i < specialIdentityAry.length ; i++) {
    specialIdentityChis.push(<Option key={specialIdentityAry[i].id}>{specialIdentityAry[i].name}</Option>);
  }

  const provinceDataChis = [];

  for (let i = 0; i < provinceData.length ; i++) {
    provinceDataChis.push(<Option key={provinceData[i].id}>{provinceData[i].description}</Option>);
  }

  const cityDataChis = [];

  for (let i = 0; i < cityData.length ; i++) {
    cityDataChis.push(<Option key={cityData[i].id}>{cityData[i].description}</Option>);
  }

  const permanentCityDataChis = [];

  for (let i = 0; i < permanentCityData.length ; i++) {
    permanentCityDataChis.push(<Option key={permanentCityData[i].id}>{permanentCityData[i].description}</Option>);
  }

  const nationalDataChis = [];
  for (let i = 0; i < nationalData.length ; i++) {
    nationalDataChis.push(<Option key={nationalData[i].id}>{nationalData[i].nation}</Option>);
  }

  const expandInfo = [
    {title:'身份证',component:'Input',submitStr:'idcard',children:null},
    {title:'籍贯',component:'Input',submitStr:'placeOrigin',children:null},
    {title:'民族',component:'Select',submitStr:'nation',children:nationalDataChis},
    {title:'购买套餐',component:'Input',submitStr:'purchasePackage',children:null,disabled:true,initValue:purchasePackageValue.packageName,noRequired:"1"},
    {title:'保险情况',component:'Input',submitStr:'insuranceSituation',children:null},
    {title:'联系人电话',component:'Input',submitStr:'excontact',children:null},
    {title:'会员身份',component:'Select',submitStr:'member',children:memberChis,fun:memberOnChange},
    {title:'特殊身份',component:'Select',submitStr:'specialIdentity',children:specialIdentityChis,fun:specialIdentityOnChange,noRequired:"1"},
    {title:'宝宝生产日期',component:'DatePicker',submitStr:'productionDate',children:null},
    {title:'合同编号',component:'Input',submitStr:'contractNumber',children:null},
    {title:'关联客房',component:'Input',submitStr:'associatedRooms',children:null},
    {title:'身份证扫描',component:'UploadButton',submitStr:'idcardScan',children:null,fun:uploadIdcardFileProps, deleteFun:deleteIdcardFileProps},
    {title:'合同附件',component:'UploadButton',submitStr:'contractAppendices',children:null,fun:uploadContractAppendicesFileProps,deleteFun:deleteContractAppendicesFileProps},
    {title:'会员编号',component:'Input',submitStr:'memberNumber',disabled:true,children:null,initValue:memberNumberValue},
    {title:'操作者2',component:'Input',submitStr:'operator',children:null,disabled:true,initValue:operator},
  ];


  const expandInfoDiv = [];

  for (let i = 0; i < expandInfo.length; i++) {
    let dict = expandInfo[i];

    let rules = { rules: [{ required: dict.noRequired?false:true,  message: `请输入${dict.title}!`}],};

    if (dict.submitStr === 'contact')
    {
      rules = { rules: [{ required: true, pattern:/^1[34578]{1}\d{9}$/, message: `请输入正确的${dict.title}!`}]};
    }

    if (dict.submitStr === 'idcard')
    {
      rules = { rules: [{ required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: `请输入正确的${dict.title}!`}]};
    }

    let tempDiv = cusComponent(dict);

    expandInfoDiv.push(
      <Col span={8} key={i}>
        <FormItem {...formItemLayout} label={dict.title}>
          {getFieldDecorator(dict.submitStr,{...rules,initialValue:dict.initValue})(
            tempDiv
          )}
        </FormItem>
      </Col>
    );
  }


  function memberOnChange(value) {

    props.form.setFieldsValue({
      specialIdentity: '',
    });
  }


  function specialIdentityOnChange(value) {

    props.form.setFieldsValue({
      member: null,
    });

  }
  function PermanentProvinceSelect(e) {
    dispatch({type:'addCustomer/getCityData',payload:{isHouseholdRegistration:true,dataId:e}})
  }


  function uploadHeadelImg(NewuserImg){
    dispatch({type:'addCustomer/addHeadIcon',payload:NewuserImg})
  }

  function uploadIdcardFileProps(values) {
    dispatch({type:'addCustomer/addContractDLC',payload:values})
  }

  function uploadContractAppendicesFileProps(values) {
    dispatch({type:'addCustomer/addCardIDDLC',payload:values})
  }

  function deleteIdcardFileProps(values) {
    dispatch({type:'addCustomer/deleteContractDLC',payload:values})
  }

  function deleteContractAppendicesFileProps(values) {
    dispatch({type:'addCustomer/deleteCardIDDLC',payload:values})
  }

  return(
    <div>
      <Form>
        <div className='contentDiv'>
          <h3>扩展信息</h3>
          <Row>
            <Col span={6}>
              <div>
                <Row>
                  <FormItem {...formItemLayout} label={'客户照片'}>
                    {getFieldDecorator('headicon',{ rules: [{ required: true, message: '请选择照片!'}],})(
                      <FileUpload fun={uploadHeadelImg} isHead={true} >
                        <div className="avatar-uploader">
                          {
                            headIconUrl ?
                              <img src={headIconUrl} alt="" className="avatar" /> :
                              <Icon type="plus" className="avatar-uploader-trigger" />
                          }
                        </div>
                      </FileUpload>
                    )}
                  </FormItem>
                </Row>
              </div>
            </Col>

            <Col span={18}>
              <div>{expandInfoDiv}</div>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem {...formItemLayout} label={'户籍地址'}>
                {getFieldDecorator('provincePermanent',{ rules: [{ required: true, message: '请输入省!'}],})(
                  <Select onChange={PermanentProvinceSelect} placeholder="请选择">
                    {provinceDataChis}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col offset={1} span={17}>
              <Row gutter={15}>
                <Col span={6}>
                  <FormItem>
                    {getFieldDecorator('cityPermanent',{ rules: [{ required: true, message: '请输入市!'}],})(
                      <Select placeholder="请选择">
                        {permanentCityDataChis}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col span={18}>
                  <FormItem>
                    {getFieldDecorator('detailedPermanent',{ rules: [{ required: true, message: '请输入详细地址!'}],})(
                      <Input/>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

      </Form>
    </div>
  )
}

function Remark(props) {
  const {modal,remarkListColumns,remarkList} = props.users;
  const {dispatch} = props;

  const { getFieldDecorator } = props.form;

  function showModal() {
    dispatch({type:'addCustomer/hideOrShowModal',payload:true})
  }

  function handleOk(e)  {
    dispatch({type:'addCustomer/addRemark',payload:(props.form.getFieldValue('tempRemark'))})
  }

  function handleCancel()  {
    dispatch({type:'addCustomer/hideOrShowModal',payload:false})
  }
  return(
    <div className='contentDiv'>
      <Form>
        <Row>
          <Col span={18}> <h3>客户备注</h3></Col>
          <Col span={6} className='addRemark'>  <Button type="primary" onClick={showModal}>添加备注</Button> </Col>
        </Row>
        <Table texta dataSource={remarkList} columns={remarkListColumns} />

        <Modal title="添加备注" visible={modal}
               onOk={handleOk} onCancel={handleCancel}
        >
          <FormItem>
            {getFieldDecorator('tempRemark')(
              <Input type="textarea" rows={10} />
            )}
          </FormItem>
        </Modal>
      </Form>
    </div>
  )

}

const BaseForm = Form.create()(BaseInfo);
const ExtensionForm = Form.create()(ExtensionInfo);
const RemarkForm = Form.create()(Remark);

class customerInformation extends React.Component{

  constructor(props) {
    super(props);
  }


  handleSubmitBase() {

    const tt = this.refs.extensionForm.getFieldsValue()

    let num = 0;

    Object.values(tt).map((item) => {
      if (item){
        num ++;
      }
     })

    if (num > 3)
    {
      this.refs.extensionForm.validateFields((err, values) => {
        if (!err) {
          this.baseFormRule(values);
        }
      });
    }
    else {
      this.baseFormRule();
    }

  }

  baseFormRule(dict){
    this.refs.baseForm.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({type:'addCustomer/savaBaseInfo',payload:{baseDict:values,exDict:dict}})
      }
    });
  }

  render() {

    return (
      <div className="customerContent">
        <BaseForm ref="baseForm" {...this.props}/>
        <ExtensionForm ref="extensionForm" {...this.props}/>
        <RemarkForm  {...this.props}/>
        <div className='savaDiv'>
          <Button className='backBtn'>返回</Button>
          <Button className='backBtn' type="primary" onClick={this.handleSubmitBase.bind(this)}>保存</Button>
        </div>
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    users: state.addCustomer,
  };
}

export default connect(mapStateToProps)(customerInformation) ;

