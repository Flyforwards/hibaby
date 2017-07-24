/**
 * Created by Flyforwards on 2017/7/17.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Form, Input, Icon,DatePicker,Table, Card, InputNumber, Radio,Row,Col, } from 'antd';
import { Link } from 'react-router';
import { parse } from 'qs';
const FormItem = Form.Item;
const createForm = Form.create;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { queryURL } from '../../../utils/index.js';
import FileUpload from './fileUpload';
import './WebsiteBanner.scss';
import LzEditor from 'react-lz-editor';
let contentHtml = '';

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
    // const id = queryURL("id");
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
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'websiteBanner/updateExpert',
            payload:{
              ...values,
              "type":queryURL("type"),
              "id":queryURL("id"),
            }
          })
        }else{
          dispatch({
            type: 'websiteBanner/addExpert',
            payload: {
              ...values,
              "type":queryURL('type')

            },
          })
        }
      }
    })
  }
  //点击返回
  onBack(){
    history.go(-1);
  }
  onAddImg1(...values){
    this.props.dispatch({
      type:'websiteBanner/setNewsImg1',
      payload:values
    })
  }
  onAddImg2(...values){
    this.props.dispatch({
      type:'websiteBanner/setNewsImg2',
      payload:values
    })
  }
  onDeleteImg1(...values){
  this.props.dispatch({
      type:'websiteBanner/deleteNewsImg1',
      payload:values
    })
  }
  onDeleteImg2(...values){
    this.props.dispatch({
      type:'websiteBanner/deleteNewsImg2',
      payload:values
    })
  }
  //富文本编辑器
  receiveHtml(content) {
    contentHtml=content;
  }
  render(){
    const { ExpertIdMsg ,img1Btn,img2Btn,defaultFileLists1,defaultFileLists2} = this.props;
    const {getFieldDecorator,} =this.props.form;
    const formItemLayout = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:18 }
    };
    const formTextItemLayout = {
      labelCol:{ span:3},
      wrapperCol:{ span:19 }
    };
    const formRadioItemLayout = {
      labelCol:{ span:5},
      wrapperCol:{ span:17 }
    };
    const tipItemLayout = {
      labelCol:{ span:7},
      wrapperCol:{ span:17 }
    };

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
    if(defaultFileLists1 ){
      if( defaultFileLists1.length > 0 ){
        size1 = true
      }
    }

    let size2 = false
    if(defaultFileLists2 ){
      if( defaultFileLists2.length > 0 ){
        size2 = true
      }
    }

    return (
      <div className="addExpert" style={{overflow:'hidden'}}>
        <Card title={cardTitle} style={{ width: '100%' }}>
          <Form>
            <Row style={{height:'56px'}}>
              <Col span = { 8 } style={{width:'300px'}} >
                <FormItem {...formItemLayout} label="标题">
                  {getFieldDecorator('title', {
                    initialValue:ExpertIdMsg ? ExpertIdMsg.title : '' ,
                    rules: [{ required: true, message: '请输入标题' }],
                  })(
                    <Input placeholder="请输入标题" />
                  )}
                </FormItem>
              </Col>
              <Col span = { 8 }>
                <FormItem label="摘要" {...formItemLayout}>
                  {getFieldDecorator('summary', {
                    initialValue:ExpertIdMsg ? ExpertIdMsg.summary : '',
                    rules: [{ required: true, message:'请输入摘要内容'}],
                  })(
                    <Input placeholder="请输入摘要内容"  />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={ 22} style={{minWidth:'400px'}} className="edit">
                <FormItem {...formTextItemLayout} label="内容">
                  {getFieldDecorator('content', {
                    initialValue:ExpertIdMsg ? ExpertIdMsg.content : '' ,
                    rules: [{ required: false, message: '请填写正文内容' }],
                  })(
                    <LzEditor
                      active={true}
                      importContent={ExpertIdMsg ? ExpertIdMsg.content : ''}
                      cbReceiver={ this.receiveHtml.bind(this)}
                      //uploadConfig={uploadConfig}
                      //uploadProps={uploadProps}
                      fullScreen={false}
                      convertFormat="html"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8} style={{width:'300px' }}>
                <FormItem label="原图上传" {...formRadioItemLayout}>
                  {getFieldDecorator('img1', {
                   initialValue: defaultFileLists1 ? defaultFileLists1 : '' ,
                    rules: [{ required: false, message: '请选择原图' }]
                  })(
                    <FileUpload  defaultFileList={defaultFileLists1} addImgFun={this.onAddImg1.bind(this)} deleteImgFun={this.onDeleteImg1.bind(this)} imgInputName="">
                      <Button key="1" disabled={img1Btn}  className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                    </FileUpload>
                  )}
                </FormItem>
              </Col>


              <Col span={8} style={{width:'300px'}}>
                <FormItem label="图片尺寸:" {...tipItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('img1Size', {rules: [{ required: size1, message: '请输入图片尺寸'}],
                    initialValue: ExpertIdMsg ? ExpertIdMsg.img1Size:'',})(
                    <Input placeholder="请输入图片尺寸，有图片时必填"/>
                  )}
                </FormItem>

              </Col>

            </Row>
            <Row>
              <Col span={8} style={{width:'300px' }}>
                <FormItem label="缩略图上传" {...formRadioItemLayout}>
                  {getFieldDecorator('img2', {
                    initialValue: defaultFileLists2 ?　defaultFileLists2 : '' ,
                    rules: [{ required: false, message: '请选择缩略图' }]
                  })(
                    <FileUpload  defaultFileList={defaultFileLists2} addImgFun={this.onAddImg2.bind(this)} deleteImgFun={this.onDeleteImg2.bind(this)} imgInputName="img2">
                      <Button key="1" disabled={img2Btn}  className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                    </FileUpload>
                  )}
                </FormItem>
              </Col>
              <Col span={8} style={{width:'300px'}}>
                <FormItem label="图片尺寸:" {...tipItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('img2Size', {rules: [{ required: size2, message: '请输入图片尺寸'}],
                    initialValue: ExpertIdMsg ? ExpertIdMsg.img2Size:'',})(
                    <Input placeholder="请输入图片尺寸，有图片时必填" />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className = "bottomBtn">
            <Button className="btn saveBtn" onClick={this.onSave.bind(this)}> 保存</Button>
            <Button className="btn backBtn" onClick={this.onBack.bind(this)}> 返回</Button>
          </div>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {ExpertIdMsg,newsImgList1,newsImgList2,img1Btn,img2Btn,defaultFileLists1,defaultFileLists2} = state.websiteBanner;
  return {
    img1Btn,
    defaultFileLists1,
    defaultFileLists2,
    img2Btn,
    ExpertIdMsg,
    newsImgList1,
    newsImgList2,
  }
}
export default connect(mapStateToProps)(AddExpert);
