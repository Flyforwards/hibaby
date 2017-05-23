import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import UPload from '../../../common/Upload.js'
import {Upload, Icon,message, Modal,Input,Select,InputNumber,DatePicker,Row, Col,Form,Button,Table} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

function customerInformation(props) {

  const {modal,remarkListColumns,remarkList,provinceData,cityData,permanentCityData,nationalData} = props.users;
  const {dispatch} = props;

  const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;


  const uploadIdcardFileProps = {
    name: 'idcardScan',

    action: '/crm/api/v1/uploadEnclosure',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadContractAppendicesFileProps = {
    name: 'contractAppendices',

    action: '/crm/api/v1/uploadEnclosure',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


//客资来源
  const  guestInformationSourceAry = ['百度搜索','和美','朋友推荐','hibaby微博微信',
  '宝宝树','爱败网','SSBS','360搜索','谷歌','搜狗搜索','神马','摇篮网','宣传资料',
  '其他机构或个人微博微信','辣妈帮','妈妈帮','其他网络广告','杂志','其他'];

  const guestInformationSource = [];

  for (let i = 0; i < guestInformationSourceAry.length ; i++) {
    guestInformationSource.push(<Option key={guestInformationSourceAry[i]}>{guestInformationSourceAry[i]}</Option>);
  }
  //关注点
  const  concernsAry = ['和美专业的医疗背景','24小时专属护理“一对一”贴身服务','拥有专业医护团队',
  '服务口碑好','地理位置方便','内外环境好','专业自制月子餐','拥有产后修复服务','家属服务等增值服务多']

  const concerns = [];

  for (let i = 0; i < concernsAry.length ; i++) {
    concerns.push(<Option key={concernsAry[i]}>{concernsAry[i]}</Option>);
  }

  //网络搜索词
  const  networkSearchWordsAry = ['无','母婴中心','月子中心','月子会所','孕产护理','月子服务']

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
    {title:'联系电话',component:'InputNumber',submitStr:'contact',children:null},
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
    {title:'联系人电话',component:'InputNumber',submitStr:'excontact',children:null},
    {title:'会员身份',component:'Select',submitStr:'memberNumber',children:null},
    {title:'特殊身份',component:'Select',submitStr:'specialIdentity',children:null},
    {title:'宝宝生产日期',component:'DatePicker',submitStr:'productionDate',children:null},
    {title:'合同编号',component:'Input',submitStr:'contractNumber',children:null},
    {title:'关联客房',component:'Input',submitStr:'associatedRooms',children:null},
    {title:'身份证扫描',component:'UploadButton',submitStr:'idcardScan',children:null},
    {title:'合同附件',component:'UploadButton',submitStr:'contractAppendices',children:null},
    {title:'会员编号',component:'InputNumber',submitStr:'memberNumber',children:null},
    {title:'操作者2',component:'Input',submitStr:'operator',children:null},
  ];

  const imageUrl = null;

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

          // {
          //   "associatedRooms": 0,
          //   "cityPermanent": values.cityPermanent,
          //   "contact": values.excontact,
          //   "contractAppendices": "string",
          //   "contractNumber":values.contractNumber,
          //   "customerId": 3,
          //   "customerPhoto": "string",
          //   "detailedPermanent": "string",
          //   "id": 0,
          //   "idcard": "string",
          //   "idcardScan": "string",
          //   "imgURL": "string",
          //   "insuranceSituation": "string",
          //   "member": 0,
          //   "memberNumber": "string",
          //   "nation": 0,
          //   "operator": "string",
          //   "placeOrigin": "string",
          //   "productionDate": "2017-05-22T08:13:35.838Z",
          //   "provincePermanent": 0,
          //   "purchasePackage": 0,
          //   "specialIdentity": 0
          // }

          const inputs =[];

          for (let i = 0;i<remarkList.length;i++)
          {
            const remark = remarkList[i];
            inputs.push({"customerId": 3,"remarkInfo": remark.remark})
          }

          // dispatch({type:'addCustomer/savaRemark',payload:{inputs:inputs}})

          dispatch({type:'addCustomer/savaBaseInfo',payload:values})
        }
      });
  }

  function onChange(date, dateString) {
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


  function headelImg(NewuserImg){
    dispatch({type:'addCustomer/headUpdate',payload:NewuserImg})
  }


  function handleChange(info) {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }


  function cusComponent(dict) {
    let tempDiv = (<Input/>);

    switch (dict.component) {
      case 'Input':
        tempDiv = (<Input defaultValue=''/>);
        break;
      case 'Select':
        tempDiv = (<Select defaultValue='请选择'>{dict.children}</Select>);
        break;
      case 'DatePicker':
        tempDiv = (<DatePicker className="antCli" onChange={onChange} />);
        break;
      case 'InputNumber':
        tempDiv = (<InputNumber className="antCli" defaultValue='' onChange={onChange}/>);
        break;
      case 'UploadButton':
      {
        if(dict.submitStr === 'contractAppendices')
        {
          tempDiv = <Upload {...uploadContractAppendicesFileProps}>
            <Button>
              <Icon type="upload" /> 上传附件</Button>
          </Upload>
        }
        else if(dict.submitStr === 'idcardScan'){
          tempDiv = <Upload {...uploadIdcardFileProps}>
            <Button>
              <Icon type="upload" /> 上传附件</Button>
          </Upload>
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
                  <Select  onChange={provinceSelect}  defaultValue="请选择">
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
                      <Select defaultValue="请选择">
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
                    <FormItem>
                      {getFieldDecorator('userName', {

                      })(
                          <div className="img"><UPload urlList={"Img"} headelUserImg={headelImg}/></div>
                        )}
                    </FormItem>
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
                    <Select onChange={PermanentProvinceSelect} defaultValue="请选择">
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
                        <Select defaultValue="请选择">
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
