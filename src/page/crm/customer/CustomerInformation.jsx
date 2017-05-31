import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import FileUpload from './fileUpload'
import moment from 'moment';
import { routerRedux } from 'dva/router';
import DictionarySelect from 'common/dictionary_select';


import {Icon,Select, Modal,Input,InputNumber,DatePicker,Row, Col,Form,Button,Table} from 'antd';
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
        if (dict.selectName){
          tempDiv = (<DictionarySelect key={dict.selectName}  selectName={dict.selectName}  placeholder="请选择" style={{ width: '100%' }}/>);
        }
        else {
          if (dict.fun)
          {

            tempDiv = (<Select onChange={dict.fun} placeholder='请选择'>{dict.children}</Select>);
          }
          else {
            tempDiv = (<Select placeholder='请选择'>{dict.children}</Select>);
          }
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
        tempDiv =
          <FileUpload fun={dict.fun} deleteFun={dict.deleteFun}>
            <Button><Icon type="upload"/> 上传附件</Button>
         </FileUpload>
      }
        break;
      case 'headUpload':
      {
        tempDiv =
          <FileUpload fun={dict.fun} isHead={true} >
          <div className="avatar-uploader">
            {
              dict.initValue ?
                <img src={dict.initValue} alt="" className="avatar" /> :
                <Icon type="plus" className="avatar-uploader-trigger" />
            }
          </div>
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

  function cusFromItem(getFieldDecorator,dict) {
    let rules = { rules: [{ required: dict.noRequired?false:true,  message: `请输入${dict.title}!`}],};

    if (dict.submitStr === 'contact')
    {
      rules = { rules: [{ required: true, pattern:/^1[34578]{1}\d{9}$/, message: `请输入正确的${dict.title}!`}]};
    }

    if (dict.submitStr === 'idcard')
    {
      rules = { rules: [{ required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: `请输入正确的${dict.title}!`}]};
    }

    return(
    <FormItem {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr,{...rules,initialValue:dict.initValue})(
          cusComponent(dict)
        )}
      </FormItem>
    )
  }

  function datacompare(dataArray,compareArray,selectArray) {
    for (let i = 0;i <dataArray.length;i++ ){
      let dict = dataArray[i];
      if (dict.component === 'DatePicker')
      {
        dict.initValue =  moment(compareArray[dict.submitStr]);
      }
      else if (dict.component === 'Select')
      {
        const id = compareArray[dict.submitStr];
        const array = selectArray[dict.submitStr];
        if (array)
        {
          console.log(array);
          for(let i = 0;i<array.length;i++){
            const subDict = array[i];
            if (subDict.id == id){
              dict.initValue =  subDict.name || subDict.description || subDict.nation;
              break;
            }
          }
        }
      }
      else {
        if (dict.submitStr === 'idcardScan' || dict.submitStr === 'contractAppendices')
        {}
        else {
          dict.initValue = compareArray[dict.submitStr];
        }
      }
    }
  }

  function BaseInfo(props) {

    const {operator,provinceData,cityData} = props.users;
    const {dispatch} = props;

    const { getFieldDecorator } = props.form;

  const provinceDataChis = [];

  for (let i = 0; i < provinceData.length ; i++) {
    provinceDataChis.push(<Option key={provinceData[i].id}>{provinceData[i].description}</Option>);
  }

  const cityDataChis = [];

  for (let i = 0; i < cityData.length ; i++) {
    cityDataChis.push(<Option key={cityData[i].id}>{cityData[i].description}</Option>);
  }

  const baseInfo = [
    {title:'客户姓名',component:'Input',submitStr:'name'},
    {title:'联系电话',component:'Input',submitStr:'contact'},
    {title:'出生日期',component:'DatePicker',submitStr:'birthTime',fun:onChange},
    {title:'年龄',component:'InputNumber',submitStr:'age',disabled:true,max:100},
    {title:'预产期',component:'DatePicker',submitStr:'dueDate'},
    {title:'孕周',component:'InputNumber',submitStr:'gestationalWeeks',max:40},
    {title:'分娩医院',component:'Select',submitStr:'hospital',selectName:'Hospital'},
    {title:'孕次/产次',component:'Select',submitStr:'fetus',selectName:'FETUS'},
    {title:'客资来源',component:'Select',submitStr:'resourceCustomer',selectName:'ResourceCustomer'},
    {title:'关注点',component:'Select',submitStr:'focus',selectName:'Focus'},
    {title:'意向套餐',component:'Select',submitStr:'intentionPackage',selectName:'IntentionPackage'},
    {title:'网络搜索词',component:'Select',submitStr:'webSearchTerm',selectName:'WebSearchTerm'},
    {title:'现住址',component:'Select',submitStr:'province',fun:provinceSelect,children:provinceDataChis,span:6},
    {component:'Select',submitStr:'city',children:cityDataChis,span:8},
    {component:'Input',submitStr:'detailed',span:16},
    {title:'操作者1',component:'Input',submitStr:'operator',disabled:true,initValue:operator,span:6},
  ];

  if (props.users.editCustomer){
    const selectArray = {province:provinceData,city:cityData};
    if (props.users.baseData,selectArray){
      datacompare(baseInfo,props.users.baseData);
    }
  }


  const baseInfoDiv = [];

  for (let i = 0; i < baseInfo.length - 4; i++) {
    let dict = baseInfo[i];

    baseInfoDiv.push(
      <Col span={6} key={i}>
        {cusFromItem(getFieldDecorator, dict)}
      </Col>
    );
  }

    const addressDiv = [];

    for (let i = baseInfo.length - 4; i < baseInfo.length; i++) {
      let dict = baseInfo[i];
      addressDiv.push(
        <Col span={dict.span} key={i}>
          {cusFromItem(getFieldDecorator,dict)}
        </Col>
      )
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
        <Row>
          {addressDiv[0]}
          <Col offset={1} span={11}>
            <Row gutter={15}>
              {addressDiv[1]}
              {addressDiv[2]}
            </Row>
          </Col>
          {addressDiv[3]}
        </Row>
      </div>
    </Form>
  )
}



function ExtensionInfo(props) {


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
    dispatch({type:'addCustomer/addCardIDDLC',payload:values})
  }

  function uploadContractAppendicesFileProps(values) {
    dispatch({type:'addCustomer/addContractDLC',payload:values})
  }

  function deleteIdcardFileProps(values) {
    dispatch({type:'addCustomer/deleteContractDLC',payload:values})
  }

  function deleteContractAppendicesFileProps(values) {
    dispatch({type:'addCustomer/deleteCardIDDLC',payload:values})
  }

  const {lookCardIDDLC,lookContractDLC,operator,memberNumberValue,purchasePackageValue,memberAry,specialIdentityAry,
    headIconUrl,provinceData,permanentCityData,nationalData} = props.users;
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

  const permanentCityDataChis = [];

  for (let i = 0; i < permanentCityData.length ; i++) {
    permanentCityDataChis.push(<Option key={permanentCityData[i].id}>{permanentCityData[i].description}</Option>);
  }

  const nationalDataChis = [];
  for (let i = 0; i < nationalData.length ; i++) {
    nationalDataChis.push(<Option key={nationalData[i].id}>{nationalData[i].nation}</Option>);
  }



  const expandInfo = [
    {title:'身份证',component:'Input',submitStr:'idcard'},
    {title:'籍贯',component:'Input',submitStr:'placeOrigin'},
    {title:'民族',component:'Select',submitStr:'nation',children:nationalDataChis},
    {title:'购买套餐',component:'Input',submitStr:'purchasePackage',disabled:true,initValue:purchasePackageValue.packageName,noRequired:"1"},
    {title:'保险情况',component:'Input',submitStr:'insuranceSituation'},
    {title:'联系人电话',component:'Input',submitStr:'contact'},
    {title:'会员身份',component:'Select',submitStr:'member',children:memberChis,fun:memberOnChange},
    {title:'特殊身份',component:'Select',submitStr:'specialIdentity',children:specialIdentityChis,fun:specialIdentityOnChange,noRequired:"1"},
    {title:'宝宝生产日期',component:'DatePicker',submitStr:'productionDate'},
    {title:'合同编号',component:'Input',submitStr:'contractNumber'},
    {title:'关联客房',component:'Input',submitStr:'associatedRooms'},
    {title:'身份证扫描',component:'UploadButton',submitStr:'idcardScan',fun:uploadIdcardFileProps, deleteFun:deleteIdcardFileProps,initValue:lookCardIDDLC},
    {title:'合同附件',component:'UploadButton',submitStr:'contractAppendices',fun:uploadContractAppendicesFileProps,deleteFun:deleteContractAppendicesFileProps,initValue:lookContractDLC},
    {title:'会员编号',component:'Input',submitStr:'memberNumber',disabled:true,initValue:memberNumberValue},
    {title:'操作者2',component:'Input',submitStr:'operator',disabled:true,initValue:operator},
    {title:'户籍地址',component:'Select',submitStr:'provincePermanent',fun:PermanentProvinceSelect,children:provinceDataChis,span:6},
    {component:'Select',submitStr:'cityPermanent',children:permanentCityDataChis,span:6},
    {component:'Input',submitStr:'detailedPermanent',span:18},

    {title:'客户照片',component:'headUpload',submitStr:'imgURL',children:provinceDataChis,span:6,fun:uploadHeadelImg,initValue:headIconUrl},
  ];

  if (props.users.editCustomer){
    const selectArray = {nation:nationalData,member:memberAry,specialIdentity:specialIdentityAry,provincePermanent:provinceData,cityPermanent:permanentCityData};
    if (props.users.expandData,selectArray){
      datacompare(expandInfo,props.users.expandData);
    }
  }

  const expandInfoDiv = [];

  for (let i = 0; i < expandInfo.length - 4; i++) {
    let dict = expandInfo[i];
    expandInfoDiv.push(
      <Col span={8} key={i}>
        {cusFromItem(getFieldDecorator,dict)}
      </Col>
    );
  }

  const addressDiv = [];

  for (let i = expandInfo.length - 4; i < expandInfo.length; i++) {
    let dict = expandInfo[i];

    addressDiv.push(
        <Col span={dict.span} key={i}>
          {cusFromItem(getFieldDecorator,dict)}
        </Col>
    );
  }

  return(
    <div className='contentDiv'>
      <Form>
          <h3>扩展信息</h3>
          <Row>
            {addressDiv[3]}

            <Col span={18}>
              <div>{expandInfoDiv}</div>
            </Col>
          </Row>

          <Row>
            {addressDiv[0]}
            <Col offset={1} span={17}>
              {addressDiv[1]}
              {addressDiv[2]}
            </Col>
          </Row>

      </Form>
    </div>

  )
}

function Remark(props) {
  const {modal,remarkListColumns,remarkList} = props.users;
  const {dispatch} = props;

  const { getFieldDecorator } = props.form;
  if (props.users.editCustomer){
    if (props.users.remarkData){
      if(remarkList.length == 0) {
        dispatch({type:'addCustomer/addRemarkAry',payload:props.users.remarkData})
      }
    }
  }


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

    if (num > 4)
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

   backBtnClick(props){
     this.props.dispatch(routerRedux.push('/crm/customer'))
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
          <Button className='backBtn' onClick={this.backBtnClick.bind(this)}>返回</Button>
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
