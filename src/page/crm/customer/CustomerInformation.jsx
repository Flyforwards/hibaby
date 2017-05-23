import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import FileUpload from './fileUpload'
import {Upload, Icon,message, Modal,Input,Select,InputNumber,DatePicker,Row, Col,Form,Button,Table} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

function customerInformation(props) {

  const {guestInformationSourceAry,concernsAry,networkSearchWordsAry,headIconUrl,modal,remarkListColumns,remarkList,provinceData,cityData,permanentCityData,nationalData} = props.users;
  const {dispatch} = props;

  const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;



  const guestInformationSource = [];

  for (let i = 0; i < guestInformationSourceAry.length ; i++) {
    guestInformationSource.push(<Option key={guestInformationSourceAry[i]}>{guestInformationSourceAry[i]}</Option>);
  }


  const concerns = [];

  for (let i = 0; i < concernsAry.length ; i++) {
    concerns.push(<Option key={concernsAry[i]}>{concernsAry[i]}</Option>);
  }


  const networkSearchWords = [];

  for (let i = 0; i < networkSearchWordsAry.length ; i++) {
    networkSearchWords.push(<Option key={networkSearchWordsAry[i]}>{networkSearchWordsAry[i]}</Option>);
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

  const baseInfo = [
    {title:'客户姓名',component:'Input',submitStr:'name',children:null},
    {title:'联系电话',component:'Input',submitStr:'contact',children:null},
    {title:'出生日期',component:'DatePicker',submitStr:'birthTime',children:null},
    {title:'年龄',component:'InputNumber',submitStr:'age',children:null},
    {title:'预产期',component:'DatePicker',submitStr:'dueDate',children:null},
    {title:'孕周',component:'InputNumber',submitStr:'gestationalWeeks',children:null},
    {title:'分娩医院',component:'Input',submitStr:'hospital',children:null},
    {title:'孕次/产次',component:'InputNumber',submitStr:'fetus',children:null},
    {title:'客资来源',component:'Select',submitStr:'resourceCustomer',children:guestInformationSource},
    {title:'关注点',component:'Select',submitStr:'focus',children:concerns},
    {title:'意向套餐',component:'Select',submitStr:'intentionPackage',children:[]},
    {title:'网络搜索词',component:'Select',submitStr:'webSearchTerm',children:networkSearchWords},
  ];

  const expandInfo = [
    {title:'身份证',component:'Input',submitStr:'idcard',children:null},
    {title:'籍贯',component:'Input',submitStr:'placeOrigin',children:null},
    {title:'民族',component:'Select',submitStr:'nation',children:nationalDataChis},
    {title:'购买套餐',component:'Input',submitStr:'purchasePackage',children:null},
    {title:'保险情况',component:'Input',submitStr:'insuranceSituation',children:null},
    {title:'联系人电话',component:'Input',submitStr:'excontact',children:null},
    {title:'会员身份',component:'Select',submitStr:'member',children:null},
    {title:'特殊身份',component:'Select',submitStr:'specialIdentity',children:null},
    {title:'宝宝生产日期',component:'DatePicker',submitStr:'productionDate',children:null},
    {title:'合同编号',component:'Input',submitStr:'contractNumber',children:null},
    {title:'关联客房',component:'Input',submitStr:'associatedRooms',children:null},
    {title:'身份证扫描',component:'UploadButton',submitStr:'idcardScan',children:null},
    {title:'合同附件',component:'UploadButton',submitStr:'contractAppendices',children:null},
    {title:'会员编号',component:'InputNumber',submitStr:'memberNumber',children:null},
    {title:'操作者2',component:'Input',submitStr:'operator',children:null},
  ];

  const baseInfoDiv = [];

  for (let i = 0; i < baseInfo.length; i++) {
      let dict = baseInfo[i];

      let tempDiv = cusComponent(dict);

      baseInfoDiv.push(
        <Col span={6} key={i}>
          <FormItem {...formItemLayout} label={dict.title}>
            {getFieldDecorator(dict.submitStr,)
            (
              tempDiv
            )}
          </FormItem>
        </Col>
      );
  }

  {/*{ rules: [{ required: true, message: `请输入${dict.title}!`}],}*/}


  const expandInfoDiv = [];

  for (let i = 0; i < expandInfo.length; i++) {
      let dict = expandInfo[i];

      let tempDiv = cusComponent(dict);

      expandInfoDiv.push(
        <Col span={8} key={i}>
          <FormItem {...formItemLayout} label={dict.title}>
            {getFieldDecorator(dict.submitStr)(
              tempDiv
            )}
          </FormItem>
        </Col>
      );
  }



  function handleSubmit(e) {
    props.form.validateFields((err, values) => {
        if (!err) {
          e.preventDefault();
          dispatch({type:'addCustomer/savaExtensionInfo',payload:values})
        }
      });
  }

  function onChange(date, dateString) {

    const age = jsGetAge(dateString);

    props.form.setFieldsValue({
      age: age,
    });

    // dispatch({type:'addCustomer/setAge',payload:age})

  }

  function showModal() {
    dispatch({type:'addCustomer/hideOrShowModal',payload:true})
  }

  function handleOk(e)  {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const {tempRemark} = values;
        dispatch({type:'addCustomer/addRemark',payload:tempRemark})
      }
    });

    dispatch({type:'addCustomer/hideOrShowModal',payload:false})
  };

  function handleCancel()  {
    dispatch({type:'addCustomer/hideOrShowModal',payload:false})

  }

  function provinceSelect(e) {
    dispatch({type:'addCustomer/getCityData',payload:{isHouseholdRegistration:false,dataId:e}})
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
        tempDiv = (<Input/>);
        break;
      case 'Select':
        tempDiv = (<Select placeholder='请选择'>{dict.children}</Select>);
        break;
      case 'DatePicker':
        if (dict.submitStr === 'birthTime')
        {
          tempDiv = (<DatePicker className="antCli" onChange={onChange} />);
        }
        else {
          tempDiv = (<DatePicker className="antCli"/>);
        }
        break;
      case 'InputNumber':
        if (dict.submitStr === 'age')
        {
          tempDiv = (<InputNumber className="antCli" disabled={true}/>);
        }
        else {
          tempDiv = (<InputNumber className="antCli"/>);
        }
        break;
      case 'UploadButton':
      {
        const tempAry = {}
        if(dict.submitStr === 'contractAppendices')
        {
          tempDiv = <FileUpload fun={uploadContractAppendicesFileProps}>
            <Button><Icon type="upload" /> 上传附件</Button>
          </FileUpload>
        }
        else if(dict.submitStr === 'idcardScan'){
          tempDiv = <FileUpload  fun={uploadIdcardFileProps}>
            <Button><Icon type="upload" /> 上传附件</Button>
          </FileUpload>
        }
      }
        break;
      default:
    }

      return (
        tempDiv

    );
  }

{/* <p>{dict.title}</p> */}

  return(
    <div className='customerContent'>
      <Form onSubmit={handleSubmit}>

        <div className='contentDiv'>
          <h3>基本信息</h3>

          <Row>
            {baseInfoDiv}
          </Row>

          <Row gutter={15}>

            <Col span={6}>
              <FormItem {...formItemLayout} label={'现住址'}>
                {getFieldDecorator('province')(
                  <Select  onChange={provinceSelect}  placeholder="请选择">
                    {provinceDataChis}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <Row gutter={15}>
                <Col span={8}>
                  <FormItem>
                    {getFieldDecorator('city')(
                      <Select placeholder="请选择">
                        {cityDataChis}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col span={16}>
                  <FormItem>
                    {getFieldDecorator('detailed')(
                      <Input/>
                    )}
                  </FormItem>
                </Col>
                </Row>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label={'操作者1'}>
                {getFieldDecorator('operator')(
                  <Input/>
                )}
              </FormItem>
            </Col>
          </Row>
        </div>

        <div className='contentDiv'>
          <h3>扩展信息</h3>
          <Row>
            <Col span={6}>
              <div>
                <Row>
                  <Col span={7}>
                    <p>客户照片</p>
                  </Col>
                  <Col span={17}>
                    <FileUpload fun={uploadHeadelImg} isHead={true} className="avatar-uploader">
                        {
                          headIconUrl ?
                            <img src={headIconUrl} alt="" className="avatar" /> :
                            <Icon type="plus" className="avatar-uploader-trigger" />
                        }
                    </FileUpload>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col span={18}>
              <div>{expandInfoDiv}</div>
            </Col>
          </Row>
            <Row gutter={15}>
              <Col span={6}>
                <FormItem {...formItemLayout} label={'户籍地址'}>
                  {getFieldDecorator('provincePermanent')(
                    <Select onChange={PermanentProvinceSelect} placeholder="请选择">
                      {provinceDataChis}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={18}>
                <Row gutter={15}>
                  <Col span={6}>
                    <FormItem>
                      {getFieldDecorator('cityPermanent')(
                        <Select placeholder="请选择">
                          {permanentCityDataChis}
                        </Select>
                      )}
                    </FormItem>
                  </Col>

                  <Col span={18}>
                    <FormItem>
                      {getFieldDecorator('detailedPermanent')(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                  </Row>
              </Col>
            </Row>
        </div>


        <div className='contentDiv'>
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
        </div>


          <FormItem className='savaDiv'>
            <Button className='backBtn'>返回</Button>
            <Button className='backBtn' type="primary" htmlType="submit">保存</Button>
          </FormItem>


      </Form>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    users: state.addCustomer,
  };
}

const WrappedHorizontalLoginForm = Form.create()(customerInformation);
export default connect(mapStateToProps)(WrappedHorizontalLoginForm) ;
