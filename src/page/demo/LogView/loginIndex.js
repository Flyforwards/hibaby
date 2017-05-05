import React from 'react';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';
import  './loginIndex.scss';
import { session } from 'common/util/storage.js';
import {browserHistory} from 'react-router';
import logo from './images/logo.png'
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
            };
        }

        handleSubmit = (e) => {
            e.preventDefault();
            // session.set('isLogin', true)
            // browserHistory.push('/demo/management')
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    // console.log(this.props.dispatch)
                    // console.log(userName.value,password.value)
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
            const {
                getFieldDecorator
            } = this.props.form;
            return (
              < div className ="container" >
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
                      })( <Input prefix = { <span> 密码 </span>} type="password" placeholder="初次登录，密码为身份证的后5位" /> )
                      }
                  </FormItem>
                  <FormItem > {
                      getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                      })( <Checkbox> 记住手机号 </Checkbox>) }
                      <a className = "login-form-forgot" href = "http://localhost:9090/find" > 忘记密码？ </a>
                    <Button type = "primary"
                      htmlType = "submit"
                      className = "login-form-button" > 登录
                    </Button>
                  </FormItem>
                </Form>
              </div>);
            }
        }

        const loginIndex = Form.create()(NormalLoginForm);

        export default loginIndex;
