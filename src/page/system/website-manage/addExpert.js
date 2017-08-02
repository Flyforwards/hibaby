/**
 * Created by Flyforwards on 2017/7/17.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Icon, Card,Row,Col, } from 'antd';
import { parse } from 'qs';
const FormItem = Form.Item;
const createForm = Form.create;
import { queryURL } from '../../../utils/index.js';
import FileUpload from './fileUpload';
import './WebsiteBanner.scss';
import RichText from './richText'
let contentHtml = '';

const formItemLayout = {
  labelCol:{ span: 4 },
  wrapperCol:{ span:18 }
};
const tipItemLayout = {
  labelCol:{ span:7},
  wrapperCol:{ span:17 }
};

@createForm()
class AddExpert extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillUnmount(){
    this.props.form.resetFields()
    this.props.dispatch({
      type:'websiteBanner/setNewValue',
    })
    contentHtml = ''
  }

  //点击保存信息
  onSave (){
    const { form ,dispatch ,newsImgList1,newsImgList2} = this.props;
    let img1String = '';
    let img2String = '';

    if(newsImgList1 && newsImgList1.length > 0){
      img1String = (newsImgList1[0]).name ? newsImgList1[0].name:'';
    }

    if(newsImgList2 && newsImgList2.length > 0 ){
      img2String = newsImgList2[0].name ? newsImgList2[0].name:'';
    }

    form.validateFields((err, values) => {
      values.img2 = img2String;
      values.img1 = img1String;
      values.content = contentHtml;
      values.type = queryURL("type");
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'websiteBanner/updateExpert',
            payload:{
              ...values,
              "id":queryURL("id"),
            }
          })
        }else{
          dispatch({
            type: 'websiteBanner/addExpert',
            payload:values,
          })
        }
      }
    })
  }
  //点击返回
  onBack(){
    history.go(-1);
  }
  onAddImg1(...values){this.props.dispatch({type:'websiteBanner/setNewsImg1', payload:values})}
  onAddImg2(...values){this.props.dispatch({type:'websiteBanner/setNewsImg2', payload:values})}
  onDeleteImg1(...values){this.props.dispatch({type:'websiteBanner/deleteNewsImg1', payload:values})}
  onDeleteImg2(...values){this.props.dispatch({type:'websiteBanner/deleteNewsImg2', payload:values})}

  textChange(text){
    contentHtml=text;
  }

  creatInput(dict){
    const {getFieldDecorator,} =this.props.form;
    return(
      <Col span = {6}>
        <FormItem {...formItemLayout} label={dict.title}>
          {getFieldDecorator(dict.submitKey, {initialValue:dict.initValue , rules: [{ required: true, message: '请输入' }],})(
            <Input placeholder='请输入' />
          )}
        </FormItem>
      </Col>
    )
  }

  creatImageUpload(dict){
    const {getFieldDecorator,} =this.props.form;
    return(
      <Row style={{width:'1200px',}}>
        <Col span={6}>
          <Row>
            <Col span={7}><label style={{lineHeight:'28px'}}>{dict.imgTitle}：</label></Col>
            <Col span={17}>
              <FileUpload  defaultFileList={dict.imageList} addImgFun={dict.addImgFun} deleteImgFun={dict.deleteImgFun}>
                <Button key="1" disabled={dict.disabled}  className="uploadBtn"><Icon type="upload"/>上传图片</Button>
              </FileUpload>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <FormItem label="图片尺寸:" {...tipItemLayout} style={{textAlign:'left'}}>
            {getFieldDecorator(dict.imageSizeTitle, {rules: [{ required: dict.required, message: '请输入图片尺寸'}],
              initialValue:dict.initValue})(
              <Input placeholder="请输入图片尺寸，有图片时必填"/>
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }


  render(){
    const { ExpertIdMsg ,img1Btn,img2Btn,newsImgList1,newsImgList2} = this.props;

    let cardTitle = ''
    switch (queryURL("type")){
      case '1-1-1':
        cardTitle='新增专家'
            break;
      case '1-2-1-1':
        cardTitle='新增活动招募'
        break;
      case '1-2-2-1':
        cardTitle='新增新闻动态'
        break;
      default:
        cardTitle='增加'
    }

    let size1 = false
    if(newsImgList1 ){
      if( newsImgList1.length > 0 ){
        size1 = true
      }
    }

    let size2 = false
    if(newsImgList2 ){
      if( newsImgList2.length > 0 ){
        size2 = true
      }
    }

    return (
      <div className="addExpert" style={{overflow:'hidden'}}>
        <Card title={cardTitle} style={{ width: '100%' }}>
          <Form>
            <Row style={{width:'1200px',height:'56px'}}>
                {this.creatInput({title:'标题',submitKey:'title',initValue:ExpertIdMsg ? ExpertIdMsg.title : '' })}
                {this.creatInput({title:'摘要',submitKey:'summary',initValue:ExpertIdMsg ? ExpertIdMsg.summary : '' })}
            </Row>

            <Row>
                <RichText value={ExpertIdMsg?ExpertIdMsg.content:""} textChange={this.textChange}/>
            </Row>

            {this.creatImageUpload({imgTitle:'原图上传',imageList:newsImgList1,addImgFun:this.onAddImg1.bind(this), deleteImgFun:this.onDeleteImg1.bind(this),
              disabled:img1Btn,imageSizeTitle:'img1Size',required:size1,initValue:ExpertIdMsg ? ExpertIdMsg.img1Size:''})}

            {this.creatImageUpload({imgTitle:'缩略图上传',imageList:newsImgList2,addImgFun:this.onAddImg2.bind(this), deleteImgFun:this.onDeleteImg2.bind(this),
              disabled:img2Btn,imageSizeTitle:'img2Size',required:size2,initValue:ExpertIdMsg ? ExpertIdMsg.img2Size:''})}

          </Form>
          <div className = "bottomBtn">
            <Button className="btn button-group-bottom-1" onClick={this.onSave.bind(this)}> 保存</Button>
            <Button className="btn button-group-bottom-2" onClick={this.onBack.bind(this)}> 返回</Button>
          </div>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {ExpertIdMsg,newsImgList1,newsImgList2,img1Btn,img2Btn} = state.websiteBanner;
  return {
    img1Btn,
    img2Btn,
    ExpertIdMsg,
    newsImgList1,
    newsImgList2,
  }
}
export default connect(mapStateToProps)(AddExpert);
