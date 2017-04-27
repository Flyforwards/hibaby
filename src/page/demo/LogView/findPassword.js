import React from 'react';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Modal
} from 'antd';

import  './loginIndex.scss';
import logo from './images/logo.png'
const FormItem = Form.Item;


class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 60,
            liked: true,
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
                    console.log(this.props.dispatch)
                    this.props.dispatch({
                        type: 'users/findSubmit',
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


    handleTest = (e) => {
        e.preventDefault();
        console.log(phone.value)
        if (!(/^1[34578]\d{9}$/.test(phone.value))) {
            this.setModal1Visible(true);

            return false;
        } else {
            if (this.state.liked) {
                this.timer = setInterval(function() {
                    var count = this.state.count;
                    this.state.liked = false;
                    count -= 1;
                    if (count < 1) {
                        this.setState({
                            liked: true
                        });
                        clearInterval(this.timer);
                        count = 60;
                    }
                    this.setState({
                        count: count
                    });
                }.bind(this), 1000);
                this.props.dispatch({
                    type: 'users/test',
                    payload: {
                        'mobile': phone.value
                    }
                });

            }


        }


    }
    componentDidMount() {
        clearInterval(this.timer);
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer = false;
    }
    render() {
        var text = this.state.liked ? ( < div > 获取验证码 < /div>): (<div className="red">{this.state.count}秒后重发</div > );
        const {
            getFieldDecorator
        } = this.props.form;
        return ( < div className = "container" >
            < Form className = "creatnew"
            onSubmit = {
                this.handleSubmit
            }
            className = "login-form" >
            < img className = "findimg"
               
            src = {logo} / >
            < a className = 
                "return"
            
            href = "http://localhost:9090/login" > &larr; 返回登录 < /a> < FormItem > {
            getFieldDecorator('phone', {
                rules: [{
                    required: true,
                    message: '请输入手机号!'
                }],
            })( < Input prefix = { < span > < /span>}  placeholder="请输入手机号" / > )
            } < /FormItem> < FormItem > {
            getFieldDecorator('testword', {
                rules: [{
                    required: true,
                    message: '请输入验证码!'
                }],
            })( < Input type = "password"
                placeholder = "请输入验证码"
                prefix = { < span className = "testNum"
                    onClick = {
                        this.handleTest
                    } > {
                        text
                    } < /span>}/ > )
            } < /FormItem>   < div > < FormItem > {
            getFieldDecorator('newpass', {
                rules: [{
                    required: true,
                    message: '请输入新密码!'
                }],
            })( < Input prefix = { < span >
                    < /span>}   placeholder="请输入新密码" / > )
            } < /FormItem>  < FormItem > {
            getFieldDecorator('queren', {
                rules: [{
                    required: true,
                    message: '请确认新密码!'
                }],
            })( < Input prefix = { < span >
                    < /span>}  placeholder="再次输入新密码"  / > )
            } < /FormItem>  < /div > < FormItem >
            < Button type = "primary"
            htmlType = "submit"
            className = "login-form-button" >
            提交 < /Button> < Modal visible = {
                this.state.modal1Visible
            }
            title = "弹窗"
            onOk = {
                () => this.setModal1Visible(false)
            }

            footer = {
                [

                    < Button key = "confirm"
                    type = "primary"
                    size = "large"
                    onClick = {
                        () => this.setModal1Visible(false)
                    } >
                    确认 < /Button>,
                ]
            } >
            < p > 请输入正确的手机号！ < /p>

            < /Modal> < Modal visible = {
                this.state.modal2Visible
            }
            title = "弹窗"
            onOk = {
                () => this.setModal2Visible(false)
            }

            footer = {
                [

                    < Button key = "confirm"
                    type = "primary"
                    size = "large"
                    onClick = {
                        () => this.setModal2Visible(false)
                    } >
                    确认 < /Button>,
                ]
            } >
            < p > 再次输入密码不一致， 请重新输入！ < /p>

            < /Modal>



            < /FormItem > < /Form>  < /div >
        );
    }
}

const findPass = Form.create()(NormalLoginForm);

export default findPass;