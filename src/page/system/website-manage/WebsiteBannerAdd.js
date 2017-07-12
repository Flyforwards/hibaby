/**
 * Created by Administrator on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Card,Input,Button ,Form,Col,Row,Select,Icon } from 'antd';
import FileUpload from './fileUpload';
import { Link } from 'react-router';
import { queryURL } from '../../../utils/index.js';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create


@createForm()
class WebsiteBannerAdd extends React.Component {
  constructor(props) {
    super(props);
  }
//添加图片
  onAddImg(...values){
    console.log("addFun",values)
    console.log("values",values[0].name)
  this.props.dispatch({
    type:'websiteBanner/setImgList',
    payload:values[0].name
  })
  }
//删除图片
  onDeleteImg(){
    this.props.dispatch({
      type:'websiteBanner/deleteImgList',
      payload:{
        values
      }
    })
  }

  //返回
  onBack() {

  }

  //保存
  onSave() {
    const { form ,dispatch } = this.props;
   // const id = queryURL("id");
    let imgString = '';
    form.validateFields((err, values) => {
    console.log("prosp",this.props.addImglist)
      this.props.addImglist ? this.props.addImglist.map((v,i) => {
        imgString += v;
        imgString += "|";
      }):'';
      values.url = this.props.addImglist ? imgString:'';
      console.log("ssss",values);
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
          console.log("进入")
          dispatch({
            type: 'websiteBanner/addBanner',
            payload:{  ...values }
          })
        }
      }
    })
  }
  render(){
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
              rules: [{ required: true, message: '请选择模块类名' }]
            })(
              <Select
                showSearch
                allowClear
                placeholder="请选择"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={false}
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
              rules: [{ required: false, message: '请上传图片' }]
            })(
              <FileUpload  addImgFun={this.onAddImg.bind(this)} deleteImgFun={this.onDeleteImg.bind(this)} imgInputName="url">
                <Button key="1" className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
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
  const {addImglist} = state.websiteBanner;
  console.log("返回值",addImglist);
  return {
    addImglist,
  };
}

export default connect(mapStateToProps)(WebsiteBannerAdd);
