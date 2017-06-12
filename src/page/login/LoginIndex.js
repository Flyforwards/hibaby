
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import  './LoginIndex.scss';
import { session } from 'common/util/storage.js';
import logo from './images/logo.png'
import { Link} from 'react-router'
const FormItem = Form.Item;
const createForm = Form.create
import moment from 'moment'
@createForm()
class LoginIndex extends React.Component {

  constructor(props) {
      super(props);
      this.state = {  visible: false,  };
      this.phone = session.get("userPhone")
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
            if (values.remember) {
              session.set("userPhone", values.mobile)
            } else {
              session.remove("userPhone");
            }
            this.props.dispatch({
                type: 'login/login',
                payload: values
            });

          }
      });
  }

  render() {
      // console.log(moment().format('A hh:mm'))
      // console.log(moment('PM 04:44').format('hh:mm'))
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="login-form-cent login">
        <div className ="login-index" >
          <Form onSubmit = { this.handleSubmit } className = "login-form" >
            <img src = {logo}/>
            <FormItem> {
                getFieldDecorator('mobile', {
                    rules: [{
                        type: "string",
                        pattern: /^[1][34578][0-9]{9}$/,
                        required: true,
                        message: '请正确的输入手机号!'
                    }],
                    initialValue: this.phone,
                })( <Input className = "test"
                    prefix = { <spa > 手机号 </spa>} placeholder="请输入您的手机号" /> )
                }
            </FormItem>
            <FormItem> {
                getFieldDecorator('password', {
                    rules: [{
                        type: "string",
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
                        required: true,
                        message: '8-20位同时包含数字与字母!'
                    }],
                })( <Input prefix = { <span> 密码 </span>} type="password" placeholder="请输入您的密码" /> )
                }
            </FormItem>
            <FormItem > {
                getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })( <Checkbox> 记住手机号 </Checkbox>) }
                <Link className = "login-form-forgot" to="/find" > 忘记密码？ </Link>
              <Button type = "primary"
                htmlType = "submit"
                className = "login-form-button" > 登录
              </Button>
            </FormItem>
          </Form>
        </div>
        </div>);
      }
}

export default connect()(LoginIndex);
