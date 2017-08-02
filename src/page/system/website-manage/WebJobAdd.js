/**
 * Created by zhurw on 2017/7/17.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Card,Input,Button ,Form,Col,Row,Select} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { message } from 'antd'
moment.locale('zh-cn');
import { routerRedux } from 'dva/router';
import { queryURL } from '../../../utils/index.js';
import RichText from './richText'
const FormItem = Form.Item;
const createForm = Form.create
let contentHtml = '';
@createForm()
class WebJobAdd extends React.Component {
  constructor(props) {
    super(props);

  }
  receiveHtml(content) {
    contentHtml=content;
  }

  //返回
  onBack() {
    this.props.dispatch(routerRedux.push({
      pathname:'/system/AboutHiBobyManage',
    }));
  }
  //保存
  onSave() {
    if(!contentHtml){
      message.error('正文内容不能为空')
      return
    }
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
            </Col>
          </Row>
          <Row style = {{width:900}}>
            <Col span={6} style={{textAlign:'right'}}>正文：</Col>
            <Col span={17}><RichText value={content} textChange={this.receiveHtml}/></Col>

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
