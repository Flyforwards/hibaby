import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import {Upload, Icon,message, Modal,Input,Select,InputNumber,DatePicker,Row, Col,Form,Button} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

function customerInformation(props) {

  const {modal,tempRemark} = props.users;
  const {dispatch} = props;

  const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

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


  const baseInfo = [
    {title:'客户姓名',component:'Input',children:null},
    {title:'联系电话',component:'Input',children:null},
    {title:'出生日期',component:'DatePicker',children:null},
    {title:'年龄',component:'Input',children:null},
    {title:'预产期',component:'DatePicker',children:null},
    {title:'孕周',component:'Input',children:null},
    {title:'分娩医院',component:'Input',children:null},
    {title:'孕次/产次',component:'Input',children:null},
    {title:'客资来源',component:'Select',children:guestInformationSource},
    {title:'关注点',component:'Select',children:concerns},
    {title:'意向套餐',component:'Select',children:[]},
    {title:'网络搜索词',component:'Select',children:networkSearchWords},
  ];

  const expandInfo = [
    {title:'身份证',component:'Input',children:null},
    {title:'籍贯',component:'Input',children:null},
    {title:'民族',component:'Select',children:null},
    {title:'购买套餐',component:'Input',children:null},
    {title:'保险情况',component:'Input',children:null},
    {title:'联系人电话',component:'Input',children:null},
    {title:'会员身份',component:'Select',children:null},
    {title:'特殊身份',component:'Select',children:null},
    {title:'宝宝生产日期',component:'Input',children:null},
    {title:'合同编号',component:'Input',children:null},
    {title:'关联客房',component:'Input',children:null},
    {title:'身份证扫描',component:'Input',children:null},
    {title:'合同附件',component:'Input',children:null},
    {title:'会员编号',component:'Input',children:null},
    {title:'操作者',component:'Input',children:null},
  ];

  const imageUrl = null;

  const baseInfoDiv = [];

  for (let i = 0; i < baseInfo.length; i++) {
      let dict = baseInfo[i];

      let tempDiv = cusComponent(dict);

      baseInfoDiv.push(
        <Col span={6} key={i}>
          <FormItem {...formItemLayout} label={dict.title}>
            {getFieldDecorator(`field-${dict.title}`)(
              tempDiv
            )}
          </FormItem>
        </Col>
      );
  }

  const expandInfoDiv = [];

  for (let i = 0; i < expandInfo.length; i++) {
      let dict = expandInfo[i];

      let tempDiv = cusComponent(dict);

      expandInfoDiv.push(
        <Col span={8} key={i}>
          <FormItem {...formItemLayout} label={dict.title}>
            {getFieldDecorator(`field-${dict.title}`)(
              tempDiv
            )}
          </FormItem>
        </Col>
      );
  }

  function handleSubmit(e) {

  }

  function onChange(date, dateString) {
  }

  function showModal() {
    dispatch({type:'addCustomer/hideOrShowModal',payload:true})
  }

  function handleOk(e)  {

    dispatch({type:'addCustomer/hideOrShowModal',payload:false})
  };

  function handleCancel()  {
    dispatch({type:'addCustomer/hideOrShowModal',payload:false})

  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function handleChange(info) {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  function beforeUpload(file) {
    const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
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
        tempDiv = (<DatePicker onChange={onChange} />);
        break;
      case 'InputNumber':
        tempDiv = (<Input defaultValue=''/>);
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
          {baseInfoDiv}
          <Row gutter={15}>

            <Col span={6}>
              <FormItem {...formItemLayout} label={'现住址'}>
                {getFieldDecorator(`field-${'现住址'}`)(
                  <Select defaultValue="请选择"/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <Row gutter={15}>
                <Col span={8}>
                  <FormItem>
                    {getFieldDecorator(`field-${'现住址'}`)(
                      <Select defaultValue="请选择"/>
                    )}
                  </FormItem>
                </Col>

                <Col span={16}>
                  <FormItem>
                    {getFieldDecorator(`field-${'现住址'}`)(
                      <Input/>
                    )}
                  </FormItem>
                </Col>
                </Row>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label={'操作者'}>
                {getFieldDecorator(`field-${'操作者'}`)(
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
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                          >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="plus" className="avatar-uploader-trigger" />
                          }
                        </Upload>
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
                  {getFieldDecorator(`field-${'现住址'}`)(
                    <Select defaultValue="请选择"/>
                  )}
                </FormItem>
              </Col>
              <Col span={18}>
                <Row gutter={15}>
                  <Col span={6}>
                    <FormItem>
                      {getFieldDecorator(`field-${'现住址'}`)(
                        <Select defaultValue="请选择"/>
                      )}
                    </FormItem>
                  </Col>

                  <Col span={18}>
                    <FormItem>
                      {getFieldDecorator(`field-${'现住址'}`)(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                  </Row>
              </Col>
            </Row>
        </div>


        <div className='contentDiv'>
          <h3>客户备注</h3>
          <Button type="primary" onClick={showModal}>添加备注</Button>
          <Modal title="添加备注" visible={modal}
            onOk={handleOk} onCancel={handleCancel}
          >
              <Input ref='remarkRef'  type="textarea" rows={10} />
          </Modal>
        </div>

        <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">保存</Button>
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
