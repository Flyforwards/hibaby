
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import  './LoginIndex.scss';
import { session } from 'common/util/storage.js';
import logo from './images/logo.png'
import { Link} from 'react-router'
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class LoginIndex extends React.Component {

  constructor(props) {
      super(props);
      this.state = {  visible: false,  };
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.dispatch({
                  type: 'login/login',
                  payload: {
                      "mobile": userName.value,
                      "password": password.value
                  }
              });

          }
      });
  }

  render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="loginForm login">
        <div className ="login-index" >
          <Form onSubmit = { this.handleSubmit } className = "login-form" >
            <img src = {logo}/>
            <FormItem> {
                getFieldDecorator('userName', {
                    rules: [{
                        required: true,
                        message: '请输入手机号!'
                    }],
                })( <Input className = "test"
                    prefix = { <spa > 手机号 </spa>} placeholder="请输入您的手机号" /> )
                }
            </FormItem>
            <FormItem> {
                getFieldDecorator('password', {
                    rules: [{
                        required: true,
                        message: '请输入密码!'
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
