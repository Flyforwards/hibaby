/**
 * Created by zhurw on 2017/7/17.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Card,Input,Button ,Form,Col,Row,Select,Icon,message,DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import FileUpload from './fileUpload';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import LzEditor from 'react-lz-editor';
import { routerRedux } from 'dva/router';
import { queryURL } from '../../../utils/index.js';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
let contentHtml = '';
@createForm()
class WebJobAdd extends React.Component {
  constructor(props) {
    super(props);
    //this.receiveHtml = this.receiveHtml.bind(this);
    //this.onChange=this.onChange.bind(this);
    //this.beforeUpload=this.beforeUpload.bind(this);
  }
  receiveHtml(content) {
    console.log("Recieved content", content);
    contentHtml=content;
  }
  onChange(info){
    console.log("onChange:",info);
  }
  beforeUpload(file){
    console.log("beforeUpload:",file);
  }
  //返回
  onBack() {
    this.props.dispatch(routerRedux.push({
      pathname:'/system/websiteHomePageManage',
    }));
  }
  //保存
  onSave() {
    const { form ,dispatch } = this.props;
    form.validateFields((err, values) => {
      this.receiveHtml.bind(this);
      values.content = contentHtml;
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'webJob/updateJob',
            payload:{
              ...values,
              id:queryURL("id")
            }
          })
        }else{
          dispatch({
            type: 'webJob/saveJob',
            payload: values
          })
        }
      }
    })
  }
  checkNumber = (rule, value, callback) => {
    if(!value){
      callback('不能为空');
      return;
    }
    if (value > 0||value ==0) {
      callback();
      return;
    }
    callback('不能为负数');
  }
  render(){
    const {initialValue} = this.props.webJob;
    const { getFieldDecorator } = this.props.form;
    const content = initialValue==null ? '' : initialValue.content;
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    /*******************富文本start*******************/
    /*const uploadConfig = {
      QINIU_URL: "http://up.qiniu.com", //上传地址，现在暂只支持七牛上传
      QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求图片的token
      QINIU_PFOP: {
        url: "http://www.yourServerAddress.mobi/doQiniuPicPersist.do" //七牛持久保存请求地址
      },
      QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求媒体资源的token
      QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch", //其他资源的token的获取
      QINIU_IMG_DOMAIN_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀
      QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀
      QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/", //其他文件地址前缀
    }

    //uploadProps 配置方法见 https://ant.design/components/upload-cn/
    const uploadProps={
      action: "",
      onChange: this.onChange,
      listType: 'picture',
      fileList: [""],
      data: (file)=>{//支持自定义保存文件名、扩展名支持
        console.log("uploadProps data",file)
      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }*/
    /*******************富文本end*******************/
    return (
      <Card className="websitebannerAdd">
        <Form>
          <Row>
            <Col span={12} style = {{width:900}}>
              <FormItem {...formItemLayout} label="岗位">
                {getFieldDecorator('name', {
                  initialValue:(initialValue==null ? '' : initialValue.name),
                  rules: [{ required: true, message: '岗位为必填项！限100字！', max: 100 }]
                })(<Input placeholder="请填写岗位！" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="人数">
                {getFieldDecorator('number', {
                  initialValue:(initialValue==null ? '' : initialValue.number),
                  rules: [{ validator:this.checkNumber ,required: true}]
                })(<Input placeholder="请填写人数！" type="number"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="地点">
                {getFieldDecorator('address', {
                  initialValue:(initialValue==null ? '' : initialValue.address),
                  rules: [{ required: true, message: '地点为必填项！'}]
                })(<Input placeholder="请填写地点！"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="正文">
                {getFieldDecorator('content', {
                  //initialValue:(initialValue==null ? '' : initialValue.content),
                  //rules: [{ required: true, message: '正文为必填项！'}]
                })(
                  <LzEditor
                    active={true}
                    importContent={content}
                    cbReceiver={this.receiveHtml}
                    //uploadConfig={uploadConfig}
                    //uploadProps={uploadProps}
                    fullScreen={false}
                    convertFormat="html"/>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className = "bottomBtn">
          <Button className="btn button-group-bottom-2" onClick={this.onSave.bind(this)}> 保存</Button>
          <Button className="btn button-group-bottom-1" onClick={this.onBack.bind(this)}> 返回</Button>
        </div>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    webJob: state.webJob
  };
}

export default connect(mapStateToProps)(WebJobAdd);
