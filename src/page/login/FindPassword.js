
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import  './LoginIndex.scss';
import logo from './images/logo.png'
import { connect } from 'dva';
import { Link } from 'react-router';
import { message } from 'antd'
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class FindPassword extends React.Component {

  constructor(props) {
    super(props);
    this.first = true;
    this.state = {
      allowClick: true,
      count: 60,
      modal1Visible: false,
      modal2Visible: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password != values.password2) {
          message.error("两次输入密码不一致， 请重新输入！");
        } else {
          this.props.dispatch({
            type: 'login/findSubmit',
            payload: {
              "mobile": values.mobile,
              "password": values.password,
              "verCode": values.verCode
            }
          });
        }
      }
    });

  }

  handle = (e) => {
    e.preventDefault();
    console.log(mobile.value)
    if (!(/^[1][34578][0-9]{9}$/.test(mobile.value))) {
      message.error("请输入正确的手机号")
    } else {
      if (this.state.allowClick) {
        this.setState({
          allowClick: false
        })
        this.timer = setInterval(
          ()=> {
            var count = this.state.count;
            count --;
            if (count < 0) {
              this.setState({
                allowClick:true
              })
              clearInterval(this.timer);
              this.timer = undefined;
              count = 60;
            }
            this.setState({
              count: count
            });
          }, 1000);
        this.props.dispatch({
          type: 'login/getVerCode',
          payload: {
            'mobile': mobile.value
          }
        });
      }
    }
  }


  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  render() {
    const title = this.first ? " 获取验证码 ":" 重新获取 "
    let getCode = (<span className="span-border" onClick = { this.handle.bind(this)}>{ title }</span>);
    if (!this.state.allowClick) {
      getCode = (<span  className="red">{this.state.count}秒后重发</span> )
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className = "login-form-cent find">
        <div className = "login-index">
          <Form onSubmit = { this.handleSubmit } className = "login-form">
            <img className = "find-img" src = {logo} />
            <Link className = "return" to="/login" > &larr; 返回登录 </Link>
            <FormItem> {
              getFieldDecorator('mobile', {
                rules: [{
                  type: "string",
                  pattern: /^[1][34578][0-9]{9}$/,
                  required: true,
                  message: '请正确的输入手机号!'
                }], })( <Input prefix = { <span> </span>}  placeholder="请输入手机号" /> )}
            </FormItem>
            <FormItem> {
              getFieldDecorator('verCode', {
                rules: [{
                  required: true,
                  message: '请输入验证码!'
                }],
              })( <Input placeholder = "请输入验证码" prefix = { getCode }/>)}
            </FormItem>
            <div>
              <FormItem> {
                getFieldDecorator('password', {
                  rules: [{
                    type: "string",
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
                    required: true,
                    message: '8-20位同时包含数字与字母!'
                  }],
                })( <Input type="password" prefix = { <span> </span> }  placeholder="请输入新密码"/> )}
              </FormItem>
              <FormItem > {
                getFieldDecorator('password2', {
                  rules: [{
                    type: "string",
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
                    required: true,
                    message: '8-20位同时包含数字与字母!'
                  }],
                })( <Input type="password" prefix = { < span >
                          </span>}  placeholder="再次输入新密码" /> )
              }
              </FormItem>
            </div >
            <FormItem>
              <Button type = "primary"
                      htmlType = "submit"
                      className = "login-form-button" >提交
              </Button>
            </FormItem >
          </Form>
        </div>
      </div>
    );
  }
}


export default connect()(FindPassword);
