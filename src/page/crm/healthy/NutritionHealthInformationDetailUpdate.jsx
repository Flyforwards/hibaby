import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Radio, Select } from 'antd';
import "./NutritionHealth.scss"
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option;
/**
 * 客户信息》健康档案》营养部健康档案编辑页面
 */
function NutritionHealthInformationDetailUpdate(props) {
  let disabled=false;
  const type = 2;

  const nutritionHealthInformation = props.healthInformation.nutritionHealthInformation;
  const healthInfo = JSON.parse(nutritionHealthInformation.healthInfo);
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 }
  }

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

  const { getFieldDecorator } = props.form;

  //文本输入框
  function myInput(inputTitle,inputName,unit,required,message,lastRow) {
    return(
      <FormItem
        {...formItemLayout}
        label={inputTitle}
      >
        {getFieldDecorator(`${inputName}`, {
          initialValue : healthInfo[inputName],
          rules: [{ required: required, message: message }]
        })(
          <Input disabled={disabled}
                 suffix={unit}
          />
        )}
      </FormItem>
    );
  }

  //单选item
  function myRadioForm (radioName, dict) {
    const radioItemDivs = [];
    for (let i = 0; i < dict.radioItems.length; i++) {
      radioItemDivs.push(
        <Radio disabled={disabled} key={i} value={i}>{dict.radioItems[i]}</Radio>
      );
    }

    return (
      <FormItem
        label={dict.title}
        {...formItemLayout}
        style={{height: '100%'}}
      >
        {getFieldDecorator(`${radioName}`, {
          initialValue : healthInfo[radioName],
          rules: [{ required: false, message: '  ' }]
        })(
          <RadioGroup>
            {radioItemDivs}
          </RadioGroup>
        )}
      </FormItem>
    )
  }

  //整行的单选item
  function secondRadioForm (radioName ,dict) {
    const radioItemDivs = [];
    for (let i = 0; i < dict.radioItems.length; i++) {
      radioItemDivs.push(
        <Radio disabled={disabled} key={i} value={i}>{dict.radioItems[i]}</Radio>
      );
    }

    return (
      <FormItem
        label={dict.title}
        {...formItemLayout}
      >
        {getFieldDecorator(`${radioName}`, {
          initialValue : healthInfo[radioName],
          rules: [{ required: false, message: '  ' }]
        })(
          <RadioGroup>
            {radioItemDivs}
          </RadioGroup>
        )}
      </FormItem>
    )
  }

  //上传附件 传一个key过来
  function uploadOptionsItem (key) {
    return (
      <div>
        <Col span="4">
          <div className="uploadOptions">附件:</div>
        </Col>
        <Col span="18">
          <Button key={key} type="primary" className="uploadOptionsButton">查看附件</Button>
        </Col>
      </div>
    )
  }
  //row 左边单选右边输入框
  function radioInputRow (radioName, inputName, dict, inputTitle, lastRow, suffix, key) {

    return (
      <Row  className=" radioInputRow" key={key}>
        <Col className=" radioInputRowLeft" span="10" style={{height: '55px',display: 'table' ,width:'50%'}}>
          {myRadioForm(radioName ,dict)}
        </Col>
        <Col className=" radioInputRowRight" span="10"  style={{height: '55px',display: 'table',width:'50%'}}>
          <FormItem
            {...formItemLayout}
            label={inputTitle}>
            {getFieldDecorator(`${inputName}`, {
              initialValue : healthInfo[inputName],
              rules: [{ required: false, message: '  ' }]
            })(
              <Input disabled={disabled}
                     suffix={suffix}
              />
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }
  //row 单选输入框
  function radioWhiteRow (radioName, inputName, dict, inputTitle, lastRow, suffix, key) {

    return (
      <Row  className="radioWhiteRow" key={key}>
        <Col className="radioWhiteRowLeft"  span="10" style={{height: '55px',display: 'table'}}>
          {myRadioForm(radioName ,dict)}
        </Col>
        <Col className="radioWhiteRowRight" span="10"  style={{height: '55px',display: 'table'}}>
          <FormItem>
            {getFieldDecorator(`${inputName}`, {
              initialValue : healthInfo[inputName],
              rules: [{ required: false, message: '  ' }]
            })(
              <Input disabled={disabled}
                     suffix={suffix}
              />
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }
  //row 左边单选右边上传附件
  function radioUploadOptionsRow (radioName, dict, key, lastRow) {
    return (
      <Row>
        <Col span="10">
          {myRadioForm(radioName, dict)}
        </Col>
        <Col span="10">
          {uploadOptionsItem({key})}
        </Col>
      </Row>
    )
  }

  //row 左边单选右边空白
  function radioSpaceRow (radioName, dict, lastRow) {
    return (
      <Row>
        <Col span="10" style={{height: '55px',display: 'table' }}>
          {myRadioForm(radioName, dict)}
          <FormItem>
            {getFieldDecorator(`${inputName}`, {
              initialValue : healthInfo[inputName],
              rules: [{ required: false, message: '  ' }]
            })(
              <Input disabled={disabled}
                     suffix={suffix}
              />
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }

  //row 整行单选
  function radioAllRow (radioName, dict,key) {
    return (
      <Row className="radioAllRow" key={key}>
        <Col className="radioAllRowBg" span="10" style={{height: '55px',display: 'table'}}>
          {secondRadioForm(radioName, dict)}
        </Col>
      </Row>
    )
  }
  //提交表单
  function handleSubmit (e) {
    //console.log("您点击了保存按钮");
    const {dispatch} = props;
    props.form.validateFields((err, values) => {
      if (!err) {
        const healthInfo = JSON.stringify(values);
        dispatch({
          type: 'healthInformation/updateHealthInformation',
          payload: {
            healthInfo : healthInfo,
            type : type,
            customerId : props.customerId,
            id : nutritionHealthInformation.id
          }
        })
      }
    });
  }

  function handleBack(){
    const {dispatch} = props;
    dispatch({
      type: 'healthInformation/getHealthInformationListByCustomerId',
      payload: {
        type : type,
        customerId : props.customerId
      }
    })
  }


  return (
    <div className="NutritionHealth">
      <Form>
        <Row className="firstItem">
          <Row  key="1">
            <Col className="ItemLeft" span="10"  style={{height: '55px',display: 'table',width:'50%'}}>
              {myInput('身高',inputNames[1],'cm',false,'请输入身高',false)}
            </Col>
            <Col className="ItemRight" span="10" style={{height: '55px',display: 'table',width:'50%'}}>
              {myInput('孕前体重',inputNames[2],'kg',false,'请输入孕前体重',false)}
            </Col>
            <Col className="ItemLeft" span="10" style={{height: '55px',display: 'table',width:'50%'}}>
              {myInput('现体重',inputNames[3],'kg',false,'请输入现体重',false)}
            </Col>
            <Col className="ItemRight" span="10" style={{height: '55px',display: 'table',width:'50%'}}>
              {myInput('宗教信仰',inputNames[4],'',false,'请输入宗教信仰',false)}
            </Col>
          </Row>
          <Row className="radioAll">
            {radioAllRow(radioNames[1],{title: '母乳喂养意愿',radioItems: ['是','否']},3)}
          </Row>
          {radioInputRow(radioNames[2], inputNames[5], {title: '妊娠期孕期水肿',radioItems: ['无','有']},'妊娠期并发症（其他）',false,'',4)}
          {radioInputRow(radioNames[3], inputNames[6], {title: '准爸爸过敏史',radioItems: ['无','有']},'过敏原',false,'',5)}
          {radioInputRow(radioNames[4], inputNames[7], {title: '准妈妈过敏史',radioItems: ['无','有']},'过敏原',false,'',6)}
          {radioInputRow(radioNames[5], inputNames[8], {title: '准爸爸家族病史',radioItems: ['无','有']},'疾病名称',false,'',7)}
          {radioInputRow(radioNames[6], inputNames[9], {title: '准妈妈家族病史',radioItems: ['无','有']},'疾病名称',false,'',8)}
          {radioWhiteRow(radioNames[7], inputNames[10], {title: '饮食习惯',radioItems: [ '一日三餐', '一日两餐', '少食多餐','用餐时间不固定','其他']},'',false,'',9)}
          {radioInputRow(radioNames[8], inputNames[11], {title: '地域饮食偏向',radioItems: ['无','有']},'孕期使用的营养剂',false,'',10)}
          {radioInputRow(radioNames[9], inputNames[12], {title: '饮食规律',radioItems: ['无','有']},'孕期食用的药物',false,'',11)}
          <Row className="dietTaboo">
            <Col className="itemTitle" span='4' style={{height: '110px',display: 'table',width:'14.6%'}}>
              <div className="dietTitle">饮食禁忌:</div>
            </Col>
            <Col span='20' style={{height: '110px',display: 'table',width:'85.4%'}}>
              {radioAllRow(radioNames[10],{radioItems: [
                '猪肉','牛肉','羊肉','鸡肉', '其他','苦瓜', '茄子','带壳海鲜','猕猴桃','西红柿'
              ]},'',false,'',12)}
              {radioWhiteRow(radioNames[11], inputNames[13], {radioItems: ['其他']},'',false,'',12)}
            </Col>
          </Row>
          <Row className="matchItem">
            <Col className="matchItemLeft" style={{height: '55px',display: 'table',width:'50%'}}>
              {myRadioForm(radioNames[23],{title: '谷物搭配比例',radioItems: ['粗细粮匀配','粗粮多', '细粮多']})}
            </Col>
            <Col className="matchItemRight" style={{height: '55px',display: 'table',width:'50%'}}>
              {myRadioForm(radioNames[12],{title: '荤素搭配比例',radioItems: ['荤素匀配','荤菜多','素菜多']})}
            </Col>
          </Row>
          <Row  className="dateDiet" key="14">
            <Col className="dateDietTitle" span="3" style={{height: '496px',display: 'table',width:'14.6%'}}>
              <div className="itemTitle">经常食用的食品</div>
            </Col>
            <Col span="20" style={{height: '496px',display: 'table',width:'85.4%'}}>
              <Row className="dietTaboo">
                <Col className="itemTitle" span='4' style={{height: '110px',display: 'table',width:'12%'}}>
                  <div className="dietTitle">红肉类:</div>
                </Col>
                <Col span='20' style={{height: '110px',display: 'table',width:'88%'}}>
                  {radioAllRow(radioNames[13],{radioItems: ['猪肉','牛肉','羊肉']},'',false,'',13)}
                  {radioWhiteRow(radioNames[14], inputNames[14], {radioItems: ['其他']},'',false,'',14)}
                </Col>
              </Row>
              <Row className="dietTaboo">
                <Col className="itemTitle" span='4' style={{height: '110px',display: 'table',width:'12%'}}>
                  <div className="dietTitle">白肉类:</div>
                </Col>
                <Col span='20' style={{height: '110px',display: 'table',width:'88%'}}>
                  {radioAllRow(radioNames[15],{radioItems: ['鸡肉', '鱼肉', '虾蟹','鱿鱼']},'',false,'',15)}
                  {radioWhiteRow(radioNames[16], inputNames[15], {radioItems: ['其他']},'',false,'',16)}
                </Col>
              </Row>
              <Row className="dietTaboo">
                <Col className="itemTitle" span='4' style={{height: '110px',display: 'table',width:'12%'}}>
                  <div className="dietTitle">水果类:</div>
                </Col>
                <Col span='20' style={{height: '110px',display: 'table',width:'88%'}}>
                  {radioAllRow(radioNames[17],{radioItems: ['柑橘类', '瓜类', '苹果','香蕉','凤梨','芒果']},'',false,'',17)}
                  {radioWhiteRow(radioNames[18], inputNames[16], {radioItems: ['其他']},'',false,'',18)}
                </Col>
              </Row>
              {radioAllRow(radioNames[19], {title: '腌制类',radioItems: [ '咸鱼', '腊肉', '泡菜']},'',false,'',19)}
              {radioAllRow(radioNames[20], {title: '加工食品',radioItems: ['肉丸', '肉罐头','肉松','方便面','巧克力','话梅蜜饯','糖果','甜汤品', '面包', '蛋糕']},20)}
              <Row className="lastDiet">
                {radioAllRow(radioNames[21], {title: '刺激食品',radioItems: [ '茶','咖啡', '辣椒','烟', '酒', '油炸食物' ]},21)}
              </Row>
            </Col>
          </Row>
          {radioWhiteRow(radioNames[22], inputNames[17], {title: '运动种类',radioItems: [ '孕妇瑜伽', '水中瑜伽', '散步','爬楼梯','其他']},'',false,'',22)}
          <Row className="lastRow">
            {radioAllRow(radioNames[24],{title: '睡眠',radioItems: ['低于4小时','4-8小时','超过八小时']},23)}
          </Row>
        </Row>
      </Form>

      <div className='bottomButton'>
        <Button className='commitButton BackBtn' onClick={handleBack}>返回</Button>
        <Button className='commitButton SaveBtn' onClick={handleSubmit}>保存</Button>
      </div>
    </div>
  );

}
const NutritionHealthInformationDetailUpdateForm = Form.create()(NutritionHealthInformationDetailUpdate);
function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}
export default connect(mapStateToProps)(NutritionHealthInformationDetailUpdateForm) ;
