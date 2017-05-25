
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

    setModal1Visible(modal1Visible) {
        this.setState({
            modal1Visible
        });
    }
    setModal2Visible(modal2Visible) {
        this.setState({
            modal2Visible
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (newpass.value != queren.value) {
                      this.setModal2Visible(true);
                } else {
                    this.props.dispatch({
                        type: 'login/findSubmit',
                        payload: {
                            "mobile": phone.value,
                            "password": newpass.value,
                            "verCode": testword.value
                        }
                    });
                }
            }
        });

    }

    handle = (e) => {
        e.preventDefault();
        console.log(phone.value)
        if (!(/^1[34578]\d{9}$/.test(phone.value))) {
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
                'mobile': phone.value
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
        let getCode = this.first ?(<div> 获取验证码 </div>):(<div> 重新获取 </div>)
        if (!this.state.allowClick) {
          getCode = (<div className="red">{this.state.count}秒后重发</div> )
        }
        const { getFieldDecorator } = this.props.form;
        return (
          <div className = "loginForm find">
          <div className = "login-index">
            <Form onSubmit = { this.handleSubmit } className = "login-form">
              <img className = "findimg" src = {logo} />
              <Link className = "return" to="/login" > &larr; 返回登录 </Link>
              <FormItem> {
                getFieldDecorator('phone', {
                  rules: [{
                      required: true,
                      message: '请输入手机号!'
                  }], })( <Input prefix = { <span> </span>}  placeholder="请输入手机号" /> )}
              </FormItem>
              <FormItem> {
                getFieldDecorator('testword', {
                    rules: [{
                        required: true,
                        message: '请输入验证码!'
                    }],
                })( <Input type = "password"
                    placeholder = "请输入验证码"
                prefix = { <span className = "testNum" onClick = { this.handle.bind(this) } > { getCode } </span>}/> )}
              </FormItem>
              <div>
                <FormItem> {
                  getFieldDecorator('newpass', {
                      rules: [{
                          required: true,
                          message: '请输入新密码!'
                      }],
                  })( <Input prefix = { <span> </span> }  placeholder="请输入新密码"/> )}
                </FormItem>
                <FormItem > {
                  getFieldDecorator('queren', {
                      rules: [{
                          required: true,
                          message: '请确认新密码!'
                      }],
                  })( <Input prefix = { < span >
                          </span>}  placeholder="再次输入新密码" /> )
                  }
                </FormItem>
              </div >
              <FormItem>
                <Button type = "primary"
                  htmlType = "submit"
                  className = "login-form-button" >提交
                </Button>
                <Modal visible = { this.state.modal1Visible }
                  title = "弹窗"
                  onOk = {
                      () => this.setModal1Visible(false)
                  }
                  footer = {[
                            <Button key = "confirm"
                              type = "primary"
                              size = "large"
                              onClick = { () => this.setModal1Visible(false) } > 确认
                            </Button>,
                      ]}>
                  <p> 请输入正确的手机号！ </p>
                </Modal>
                <Modal visible = { this.state.modal2Visible }
                  title = "弹窗"
                  onOk = { () => this.setModal2Visible(false) }
                  footer = {[
                          <Button key = "confirm"
                          type = "primary"
                          size = "large"
                          onClick = { () => this.setModal2Visible(false) } > 确认
                          </Button>,
                      ]}>
                  <p> 再次输入密码不一致， 请重新输入！ </p>
                </Modal>
              </FormItem >
            </Form>
          </div>
          </div>
        );
    }
}


export default connect()(FindPassword);
