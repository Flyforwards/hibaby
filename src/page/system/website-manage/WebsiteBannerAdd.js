/**
 * Created by Administrator on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Card,Input,Button ,Form,Col,Row,Select,Icon,message } from 'antd';
import FileUpload from './fileUpload';
import { Link } from 'react-router';
import { routerRedux } from 'dva/router';
import { queryURL } from '../../../utils/index.js';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create


@createForm()
class WebsiteBannerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      disabledBtn:false,
    }
  }
//添加图片
  onAddImg(...values){
   this.props.dispatch({
    type:'websiteBanner/setImgList',
    payload:values
   })
  }
//删除图片
  onDeleteImg(...values){
    this.props.dispatch({
      type:'websiteBanner/deleteImgList',
      payload:values
    })
  }

  //返回
  onBack() {
    this.props.dispatch(routerRedux.push({
      pathname:'/system/website-manage',
    }));
  }

  //保存
  onSave() {
    const { form ,dispatch } = this.props;
   // const id = queryURL("id");
    let imgString = '';
    let imgUrls='';
    form.validateFields((err, values) => {
      this.props.addImglist ? this.props.addImglist.map((v,i) => {
        imgString += v[0].name;
        imgUrls +=v[0].url;
      }):'';
      values.img = this.props.addImglist ? imgString:'';
      values.imgUrl = this.props.addImglist ? imgUrls:'';
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'websiteBanner/updateBanner',
            payload:{
              ...values,
              id:queryURL("id")
            }
          })
        }else{
          dispatch({
            type: 'websiteBanner/addBanner',
            payload: values
          })
        }
      }
    })
  }
  //验证图片
  // checkImg = (rule, value, callback) => {
  //   console.log("ssss",value)
  //   if (value.length >=1) {
  //     callback();
  //     return;
  //   }else{
  //     callback('请上传文件');
  //   }
  //
  // }
  render(){
    const { disabledBtn ,defaultFileList,ontListType,addImglist,selectAble} = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    return (
      <Card className="websitebannerAdd">
        <Form>
          <Row>
            <Col span={12} style = {{width:300}}>
          <FormItem label="模块类名" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue:ontListType ? ontListType+'':'',
              rules: [{ required: true, message: '请选择模块类名' }]
            })(
              <Select
                showSearch
                allowClear
                placeholder="请选择"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={selectAble}
              >
                <Option key="1">首页</Option>
                <Option key="2">hibaby服务</Option>
                <Option key="3">美研中心</Option>
                <Option key="4">活动咨询</Option>
                <Option key="5">新妈分享</Option>
                <Option key="6">关于Hibaby</Option>
              </Select>
            )}
          </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span = {12}>
          <FormItem
            {...formItemLayout}
          >
            {getFieldDecorator("url", {
              //initialValue:addImglist?addImglist:'' ,
              rules: [{ required: false }]
            })(
              <FileUpload  defaultFileList ={defaultFileList} addImgFun={this.onAddImg.bind(this)} deleteImgFun={this.onDeleteImg.bind(this)} imgInputName="url">
                <Button key="1" disabled={disabledBtn}  className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
              </FileUpload>
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
    )
  }


}

function mapStateToProps(state) {
  const {addImglist,disabledBtn,defaultFileList,ontListType,selectAble} = state.websiteBanner;
  return {
    addImglist,
    disabledBtn,
    defaultFileList,
    ontListType,
    selectAble
  };
}

export default connect(mapStateToProps)(WebsiteBannerAdd);
