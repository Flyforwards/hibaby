"use strict"
import React, { Component } from 'react'
import { Button, Col, Form, Input, Row, Radio, Select } from 'antd'
import styles from './healthyhome.scss';
import FileUpload from './fileUpload';
import BigImageModal from '../customer/BigImageModal';
import ExcelTitleModel from './excelTitle';
import PermissionButton from 'common/PermissionButton';
import {radioInputRow,myRadioForm,radioSpaceRow,radioAllRow,apgarScoreRow,setImgInputRequired,radioAllRow2} from './CreateDetailElement';
import { connect } from 'dva';
/**
 * 客户信息》健康档案》医疗健康档案详情页面编辑页面
 */



const FormItem = Form.Item;

//单选框的名字
const radioNames=[];
for(let i = 0; i < 47; i++) {
  radioNames.push('radio_'+i);
}


//输入框的名字
const inputNames=[];
for(let i = 0; i < 18; i++) {
  inputNames.push('input_'+i);
}

const disabled = true;




function HealthyhomeDetailUpdate(props) {
  function radioChangeFun1(e){
    setImgInputRequired("imgInput_1",e.target.value,props);
  }
  function radioChangeFun2(e){
    setImgInputRequired("imgInput_2",e.target.value,props);
  }
  function radioChangeFun3(e){
    setImgInputRequired("imgInput_3",e.target.value,props);
  }
  function radioChangeFun4(e){
    setImgInputRequired("imgInput_4",e.target.value,props);
  }
  function radioChangeFun5(e){
    setImgInputRequired("imgInput_5",e.target.value,props);
  }
  function radioChangeFun6(e){
    setImgInputRequired("imgInput_6",e.target.value,props);
  }
  function radioChangeFun7(e){
    setImgInputRequired("imgInput_7",e.target.value,props);
  }
  function radioChangeFun8(e){
    setImgInputRequired("imgInput_8",e.target.value,props);
  }

  function radioChangeFMTypeFun(e) {
    setImgInputRequired("input_5",e.target.value,props);
  }


  function showImg(imgInputName) {
    const imgData = healthInfo[imgInputName];
    let bigImageData = imgData ? JSON.parse(imgData) : [];
    console.log(bigImageData);
    props.dispatch({
      type: 'healthInformation/setBigImageModalProps',
      payload: {
        bigImageData : bigImageData,
        bigImageHidden : true
      }
    });
  }

  function handleImgDivCancel() {
    props.dispatch({
      type: 'healthInformation/setBigImageModalProps',
      payload: {
        bigImageData : [],
        bigImageHidden : false
      }
    });
  }

  function uploadOptionsItem (imgInputName) {
    const imgData = healthInfo[imgInputName];
    const data = imgData ? JSON.parse(imgData) : [];
    if(data && data.length > 0){
      return (
        <div>
          <Col span="4">
            <div className="uploadOptions"></div>
          </Col>
          <Col span="18">
            <Button type="primary" className="uploadOptionsButton" onClick={()=>showImg(imgInputName)}>查看附件</Button>
          </Col>
        </div>
      )
    }

  }






  const { getFieldDecorator } = props.form;

  const type = 1;
  const medicalHealthInformation = props.healthInformation.medicalHealthInformation;
  const healthInfo = medicalHealthInformation ? JSON.parse(medicalHealthInformation.healthInfo):{};

  const hide = !props.healthInformation.input_5_required?true:false;


  return(
    <Form>
      <Row className="firstItem" key="1">
        <Col span="2" style={{height: '110px',display: 'table'}}>
          <div className="itemTitle">既往史</div>
        </Col>
        <Col span="22">
          {radioInputRow(radioNames[0],inputNames[0],{title: '既往疾病史',radioItems: ['无','有'],value:healthInfo['radio_0'],info:healthInfo['input_0']},'请描述',false,null,props)}
          {radioInputRow(radioNames[1],inputNames[1],{title: '既往手术史',radioItems: ['无','有'],value:healthInfo['radio_1'],info:healthInfo['input_1']},'请描述',true,null,props)}
        </Col>
      </Row>

      <Row className="firstItem" key="2">
        <Col span="2" style={{height: '220px',display: 'table'}}>
          <div className="itemTitle"><span>优生四项</span></div>
        </Col>
        <Col span="22">
          <Row className="topRightItemBg">
            <Col span="12">
              <div>
                {myRadioForm(radioNames[2], {title: '弓形体',radioItems: ['阴性','阳性'],value:healthInfo['radio_2'],radioChangeFun:radioChangeFun1},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg">
                {uploadOptionsItem('imgInput_1')}
              </div>
            </Col>
          </Row>
          <Row className="topRightItemBg">
            <Col span="12">
              <div>
                {myRadioForm(radioNames[3], {title: '单纯疱疹病毒',radioItems: ['阴性','阳性'],value:healthInfo['radio_3'],radioChangeFun:radioChangeFun2},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg">
                {uploadOptionsItem('imgInput_2')}
              </div>
            </Col>
          </Row>
          <Row className="topRightItemBg">
            <Col span="12">
              <div>
                {myRadioForm(radioNames[4], {title: '风疹病毒',radioItems: ['阴性','阳性'],value:healthInfo['radio_4'],radioChangeFun:radioChangeFun3},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg">
                {uploadOptionsItem('imgInput_3')}
              </div>
            </Col>
          </Row>
          <Row className="onlyLeftItemBg">
            <Col span="12">
              <div>
                {myRadioForm(radioNames[5], {title: '巨细胞病毒',radioItems: ['阴性','阳性'],value:healthInfo['radio_5'],radioChangeFun:radioChangeFun4},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg">
                {uploadOptionsItem('imgInput_4')}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row  className="firstItem" key="3">
        <Col span="2" style={{height: '605px',display: 'table'}}>
          <div className="itemTitle">孕期合并症</div>
        </Col>
        <Col span="22">
          <Row className="topRightItemBg" style={{minHeight: '110px'}}>
            <Col span="12">
              <div>
                {myRadioForm(radioNames[6],{title: '乙肝病毒感染或携带',radioItems: ['否','大三阳','小三阳','单纯表面抗原阳性'],value:healthInfo['radio_6'],radioChangeFun:radioChangeFun5},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg" style={{minHeight: '110px'}}>
                {uploadOptionsItem('imgInput_5')}
              </div>
            </Col>
          </Row>
          <Row className="topRightItemBg">
            <Col span="12">
              <div>
                {myRadioForm(radioNames[7], {title: '丙肝病毒感染或携带',radioItems: ['否','是'],value:healthInfo['radio_7'],radioChangeFun:radioChangeFun6},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg">
                {uploadOptionsItem('imgInput_6')}
              </div>
            </Col>
          </Row>
          <Row className="topRightItemBg">
            <Col span="12">
              <div>
                {myRadioForm(radioNames[8], {title: '梅毒病毒感染或携带',radioItems: ['否','是'],value:healthInfo['radio_8'],radioChangeFun:radioChangeFun7},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg">
                {uploadOptionsItem('imgInput_7')}
              </div>
            </Col>
          </Row>
          <Row className="topRightItemBg">
            <Col span="12">
              <div>
                {myRadioForm(radioNames[9], {title: '艾滋病病毒感染或携带',radioItems: ['否','是'],value:healthInfo['radio_9'],radioChangeFun:radioChangeFun8},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="onlyLeftItemBg">
                {uploadOptionsItem('imgInput_8')}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <div className="topItembg">
                {myRadioForm(radioNames[10],{title: '血压异常',radioItems: ['否','是'],value:healthInfo['radio_10']},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="leftRightItemBg">
                <FormItem
                  labelCol={{span: 6}}
                  wrapperCol={{span: 16}}
                  label={'血压'}>
                  {getFieldDecorator(`${inputNames[2]}`, {
                    initialValue : healthInfo['input_2'],
                    rules: [{ required: false, message: '  ' }]
                  })(
                    <Input disabled={ disabled }
                           suffix="/ mmHg"
                    />
                  )}

                </FormItem>
              </div>
            </Col>
          </Row>
          {radioSpaceRow(radioNames[11],{title: '贫血',radioItems: ['否','是'],value:healthInfo['radio_11']},false,props)}
          {radioSpaceRow(radioNames[12],{title: '糖尿病',radioItems: ['否','是'],value:healthInfo['radio_12']},false,props)}
          {radioSpaceRow(radioNames[13],{title: '子宫肌瘤',radioItems: ['否','是'],value:healthInfo['radio_13']},false,props)}
          {radioInputRow(radioNames[14], inputNames[3], {title: '甲状腺功能减退',radioItems: ['否','是'],value:healthInfo['radio_14'],info:healthInfo['input_3']},'用药',false,null,props)}

          <Row>
            <div className="bottomRightItemBg">
              <FormItem
                labelCol={{span: 2}}
                wrapperCol={{span: 21}}
                label={'其它'}>
                {getFieldDecorator(`${inputNames[4]}`,{
                  initialValue : healthInfo['input_4']
                })(
                  <Input disabled={ disabled } />
                )}
              </FormItem>
            </div>
          </Row>
        </Col>
      </Row>

      <Row className="firstItem">
        <Col span="2" style={{height: '495px',display: 'table'}}>
          <div className="itemTitle">分娩过程</div>
        </Col>
        <Col span="22">
          {radioAllRow(radioNames[15],{title: '分娩方式',radioItems: ['自然分娩','剖宫产'],value:healthInfo['radio_15'],radioChangeFun:radioChangeFMTypeFun},props)}
          <Row style={{display:hide?'none':''}}>
            <div className="rightItemBg">
              <FormItem
                labelCol={{span: 5}}
                wrapperCol={{span: 18}}
                label={'剖宫产手术指征'}>
                {getFieldDecorator(`${inputNames[5]}`, {
                  initialValue : healthInfo['input_5'],
                  rules: [{ required: props.healthInformation.input_5_required, message: '请输入剖宫产手术指征' }]
                })(
                  <Input disabled={ disabled }/>
                )}
              </FormItem>
            </div>
          </Row>
          {radioAllRow(radioNames[16],{title: '自然分娩（会阴撕裂）',radioItems: ['无','I度','II度','III度','IV度'],value:healthInfo['radio_16']},props)}
          <Row>
            <div className="rightItemBg">
              <FormItem
                labelCol={{span: 5}}
                wrapperCol={{span: 18}}
                label={'产时出血'}>
                {getFieldDecorator(`${inputNames[6]}`, {
                  initialValue : healthInfo['input_6'],
                  rules: [{ required: false, message: '  ' }]
                })(
                  <Input disabled={ disabled }
                         suffix="ml"
                  />
                )}
              </FormItem>
            </div>
          </Row>
          <Row>
            <Col span="12">
              <div className="topItembg">
                {myRadioForm(radioNames[17],{title: '胎膜早破',radioItems: ['否','是'],value:healthInfo['radio_17']},props)}
              </div>
            </Col>
            <Col span="12">
              <div className="leftRightItemBg">
                <FormItem
                  label={''}
                  wrapperCol={{span: 22, push: 1 }}>
                  {getFieldDecorator(`${inputNames[7]}`, {
                    initialValue : healthInfo['input_7'],
                    rules: [{ required: false, message: '  ' }]
                  })(
                    <Input disabled={ disabled }
                           suffix="小时"
                    />
                  )}
                </FormItem>
              </div>
            </Col>
          </Row>

          {radioAllRow(radioNames[18],{title: '前置胎盘',radioItems: ['否','是'],value:healthInfo['radio_18']},props)}
          {radioAllRow(radioNames[19],{title: '胎盘早剥',radioItems: ['否','是'],value:healthInfo['radio_19']},props)}
          {radioAllRow(radioNames[20],{title: '胎盘残留',radioItems: ['否','是'],value:healthInfo['radio_20']},props)}

          <Row>
            <div className="bottomRightItemBg">
              <FormItem
                labelCol={{span: 2}}
                wrapperCol={{span: 21}}
                label={'其它'}>
                {getFieldDecorator(`${inputNames[8]}`,{
                  initialValue : healthInfo['input_8']
                })(
                  <Input disabled={ disabled } />
                )}
              </FormItem>
            </div>
          </Row>
        </Col>
      </Row>

      <Row className="firstItem">
        <Col span="2" style={{height: '660px',display: 'table'}}>
          <div className="itemTitle">产后情况</div>
        </Col>
        <Col span="22">
          {radioAllRow(radioNames[21],{title: '产后清宫',radioItems: ['无','有'],value:healthInfo['radio_21']},props)}
          {radioInputRow(radioNames[22], inputNames[9], {title: '产后出血',radioItems: ['无','有'],value:healthInfo['radio_22'],info:healthInfo['input_9']},'出血量',false,'毫升',props)}
          {radioInputRow(radioNames[23], inputNames[18], {title: '血压异常',radioItems: ['无','有'],value:healthInfo['radio_23'],info:healthInfo['input_18']},'血压',false,'mmHg',props)}
          {radioAllRow(radioNames[24],{title: '会阴伤口',radioItems: ['正常','水肿','血肿','裂开','感染','无'],value:healthInfo['radio_24']},props)}
          {radioAllRow2(radioNames[24],{title: '腹部伤口',radioItems: ['正常','敷料覆盖未见渗出物','红肿','裂开','感染','无'],value:healthInfo['radio_24']},props)}
          {radioInputRow(radioNames[26], inputNames[10], {title: '产后发热',radioItems: ['无','有'],value:healthInfo['radio_26'],info:healthInfo['input_10']},'体温',false,'℃',props)}
          {radioAllRow(radioNames[27],{title: '乳房肿胀',radioItems: ['无','有'],value:healthInfo['radio_27']},props)}
          {radioAllRow(radioNames[28],{title: '哺乳困难',radioItems: ['无','有'],value:healthInfo['radio_28']},props)}
          {radioAllRow(radioNames[29],{title: '下肢水肿',radioItems: ['无','有'],value:healthInfo['radio_29']},props)}
          {radioAllRow(radioNames[30],{title: '排尿困难',radioItems: ['无','有'],value:healthInfo['radio_30']},props)}
          {radioAllRow(radioNames[31],{title: '排便困难',radioItems: ['无','有'],value:healthInfo['radio_31']},props)}
          <Row>
            <div className="bottomRightItemBg">
              <FormItem
                labelCol={{span: 2}}
                wrapperCol={{span: 21}}
                label={'其它'}>
                {getFieldDecorator(`${inputNames[11]}`,{
                  initialValue : healthInfo['input_11']
                })(
                  <Input  disabled={ disabled }/>
                )}
              </FormItem>
            </div>
          </Row>
        </Col>
      </Row>
      <BigImageModal
        images={props.healthInformation.bigImageData}
        isOpen={props.healthInformation.bigImageHidden}
        onClose={handleImgDivCancel}
      />
    </Form>

  );
}




function newBabyHtml(props) {
  const { getFieldDecorator } = props.form;
  const type = 1;
  const newBabyList = props.healthInformation.newBabyList;
  const newBabyValues = newBabyList&&newBabyList.length>0?newBabyList[props.index]:null;
  const healthInfo = newBabyValues ? JSON.parse(newBabyValues.babyInfo):{};
  let title = "新生儿情况";
  switch(props.index){
    case 0:
      title = title+"(宝宝A)";
      break;
    case 1:
      title = title+"(宝宝B)";
      break;
    case 2:
      title = title+"(宝宝C)";
      break;
    case 3:
      title = title+"(宝宝D)";
      break;
    case 4:
      title = title+"(宝宝E)";
      break;
    case 5:
      title = title+"(宝宝F)";
      break;
    case 6:
      title = title+"(宝宝G)";
      break;
    case 7:
      title = title+"(宝宝H)";
      break;
    case 8:
      title = title+"(宝宝I)";
      break;
    case 9:
      title = title+"(宝宝J)";
      break;
    case 10:
      title = title+"(宝宝K)";
      break;
    case 11:
      title = title+"(宝宝L)";
      break;
  }
  return (
    <Row className="firstItem">
      <Col span="2" style={{height: '1045px',display: 'table'}}>
        <div className="itemTitle">{title}</div>
      </Col>
      <Col span="22">
        <Row style={{display:"none"}}>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'宝宝'}>
              {getFieldDecorator("babyId", {
                initialValue : newBabyValues?newBabyValues['babyId']:null,
                rules: [{ required: false, message: '  ' }]
              })(
                <Input disabled={ disabled } />
              )}
            </FormItem>
          </div>
        </Row>
        {radioAllRow("babySex",{title: '性别',radioItems: ['男','女'],value:(newBabyValues?newBabyValues['babySex']+"":null)},props)}

        <Row style={{display:"none"}}>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'婴儿健康档案id'}>
              {getFieldDecorator("id", {
                initialValue : newBabyValues?newBabyValues['id']:null,
                rules: [{ required: false, message: '  ' }]
              })(
                <Input disabled={ disabled }/>
              )}
            </FormItem>
          </div>
        </Row>
        <Row>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'出生体重'}>
              {getFieldDecorator("babyWeight", {
                initialValue : newBabyValues?newBabyValues['babyWeight']:null,
                rules: [{ required: false, message: '  ' }]
              })(
                <Input
                  disabled={ disabled }
                  suffix="g"
                />
              )}
            </FormItem>
          </div>
        </Row>
        <Row>
          <div className="rightItemBg">
            <FormItem
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
              label={'出生身长'}>
              {getFieldDecorator("babyLength", {
                initialValue : newBabyValues?newBabyValues['babyLength']:null,
                rules: [{ required: false, message: '  ' }]
              })(
                <Input
                  disabled={ disabled }
                  suffix="cm"
                />
              )}
            </FormItem>
          </div>
        </Row>
        <Row>
          <div className="rightItemBg">
            {apgarScoreRow(props,healthInfo)}
          </div>
        </Row>
        {radioAllRow(radioNames[33],{title: '喂养方式',radioItems: ['纯母乳','混合','人工'],value:healthInfo['radio_33']},props)}
        {radioAllRow(radioNames[34],{title: '产时胎心异常',radioItems: ['无','胎心快','胎心慢'],value:healthInfo['radio_34']},props)}
        {radioAllRow(radioNames[35],{title: '高胆红素血症',radioItems: ['无','有'],value:healthInfo['radioNam_35']},props)}
        <Row>
          <Col span="12">
            <div className="topItembg">
              {myRadioForm(radioNames[36],{title: '蓝光治疗史',radioItems: ['否','是'],value:healthInfo['radio_36']},props)}
            </div>
          </Col>
          <Col span="12">
            <div className="leftRightItemBg">
              <FormItem
                label={''}
                wrapperCol={{span: 22, push: 1 }}>
                {getFieldDecorator(`${inputNames[14]}`, {
                  initialValue : healthInfo['input_14'],
                  rules: [{ required: false, message: '  ' }]
                })(
                  <Input disabled={ disabled }
                         suffix="小时"
                  />
                )}
              </FormItem>
            </div>
          </Col>
        </Row>
        {radioAllRow(radioNames[37],{title: '羊水污染',radioItems: ['无','1度','2度','3度'],value:healthInfo['radio_37']},props)}
        {radioInputRow(radioNames[38], inputNames[15], {title: '发热史',radioItems: ['无','有'],value:healthInfo['radio_38'],info:healthInfo['input_15']},'体温',false,'℃',props)}
        {radioAllRow(radioNames[39],{title: '低血糖史',radioItems: ['无','有'],value:healthInfo['radio_39']},props)}
        {radioAllRow(radioNames[40],{title: '呼吸困难',radioItems: ['无','有'],value:healthInfo['radio_40']},props)}
        {radioAllRow(radioNames[41],{title: '出生后窒息',radioItems: ['无','有'],value:healthInfo['radio_41']},props)}
        {radioInputRow(radioNames[42], inputNames[16], {title: '新生儿肺炎',radioItems: ['无','有'],value:healthInfo['radio_42'],info:healthInfo['input_16']},'治疗方案',false,null,props)}
        {radioAllRow(radioNames[43],{title: '心脏杂音',radioItems: ['无','有'],value:healthInfo['radio_43']},props)}
        {radioAllRow(radioNames[44],{title: '皮疹',radioItems: ['无','有'],value:healthInfo['radio_44']},props)}
        {radioAllRow(radioNames[45],{title: '尿量少',radioItems: ['无','有'],value:healthInfo['radio_45']},props)}
        {radioAllRow(radioNames[46],{title: '尿结晶',radioItems: ['无','有'],value:healthInfo['radio_46']},props)}
        <Row>
          <div className="bottomRightItemBg">
            <FormItem
              labelCol={{span: 2}}
              wrapperCol={{span: 21}}
              label={'其它'}>
              {getFieldDecorator(`${inputNames[17]}`,{
                initialValue : healthInfo['input_17']
              })(
                <Input  disabled={ disabled }/>
              )}
            </FormItem>
          </div>
        </Row>
      </Col>
    </Row>

  );
}




const HealthyhomeDetailUpdateFrom = Form.create()(HealthyhomeDetailUpdate);
const NewBabyFrom = Form.create()(newBabyHtml);
const type = 1;
class HealthyhomeDetailDetailClass extends Component{
  constructor(props){
    super(props);
    this.state = {
      newBabyArr : [],
      newBabyIndex : 0,
    }
  }


  //编辑
  handleEdit (e) {
    const {dispatch} = this.props;
    dispatch({
      type: 'healthInformation/setHealthInformationEditFlag',
      payload: {
        type : type
      }
    })
  }

  handleBack=()=>{
    const {dispatch} = this.props;
    dispatch({
      type: 'healthInformation/getHealthInformationListByCustomerId',
      payload: {
        type : type,
        customerId : this.props.customerId
      }
    })
  }




  initNewBaby(){
    const newBabyArr = [];
    const newBabyIndex = this.state.newBabyIndex;
    for(let i = 0;i<= newBabyIndex; i++){
      newBabyArr.push(<NewBabyFrom ref={"babyForm"+i} index={i}  {...this.props}/>);
    }
    return newBabyArr;
  }

  componentWillUnmount() {
    // this.props.dispatch({type: 'serviceCustomer/removeData'})
  }

  componentWillMount() {
    const {newBabyList} = this.props.healthInformation;
    this.setState({
      newBabyIndex : newBabyList&&newBabyList.length>0 ? (newBabyList.length-1) : 0
    });
  }



  render(){
    return(
      <div className="healthContentDiv">
        <HealthyhomeDetailUpdateFrom ref="baseForm"  {...this.props}/>
        {this.initNewBaby()}
        <div className="button-group-bottom-common">
          <Button className='button-group-bottom-1' onClick={this.handleBack.bind(this)}>返回</Button>
          <PermissionButton testKey="HEALTHINFO_EDIT" className='button-group-bottom-2 button-group-position-top'
                            onClick={this.handleEdit.bind(this)}>编辑</PermissionButton>
          <ExcelTitleModel>
            <PermissionButton testKey="HEALTHINFO_PRINT" className='button-group-bottom-3'>打印</PermissionButton>
          </ExcelTitleModel>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}
export default connect(mapStateToProps)(HealthyhomeDetailDetailClass)
