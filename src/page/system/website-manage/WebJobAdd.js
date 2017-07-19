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
import { routerRedux } from 'dva/router';
import { queryURL } from '../../../utils/index.js';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
@createForm()
class WebJobAdd extends React.Component {
  constructor(props) {
    super(props);

  }
  //返回
  onBack() {
    this.props.dispatch(routerRedux.push({
      pathname:'/system/website-manage/job',
    }));
  }
  //保存
  onSave() {
    const { form ,dispatch } = this.props;
    form.validateFields((err, values) => {
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

    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    return (
      <Card className="websitebannerAdd">
        <Form>
          <Row>
            <Col span={12} style = {{width:300}}>
              <FormItem {...formItemLayout} label="岗位">
                {getFieldDecorator('name', {
                  initialValue:(initialValue==null ? '' : initialValue.name),
                  rules: [{ required: true, message: '岗位为必填项！限100字！', max: 100 }]
                })(<Input placeholder="请填写岗位！"/>)}
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
  return {
    webJob: state.webJob
  };
}

export default connect(mapStateToProps)(WebJobAdd);
