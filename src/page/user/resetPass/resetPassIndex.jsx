import React from 'react'
import { connect } from 'dva'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import  './resetPass.scss';
import logo from 'assets/logo2.png'
import { local, session } from 'common/util/storage.js';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    const { userInfo, form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { oldPassWord, newPassWord } = values;
        dispatch({
          type: 'rePassword/updatePsw',
          payload: {
            mobile: userInfo.mobile,
            newPassWord: newPassWord,
            oldPassWord: oldPassWord
          }
        });
      }
    });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassWord')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="resetPass">
        <img src={logo}/>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('oldPassWord', {
              rules: [{ required: true, message: '请输入原密码！' }]
            })(
              <Input type="password" placeholder="请输入原密码"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('newPassWord', {
              rules: [{
                type: "string",
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
                required: true,
                message: '8-20位同时包含数字与字母!'
              }]
            })(
              <Input type="password" placeholder="请输入新密码"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('newPassWordTwo', {
              rules: [{
                required: true, message: '请再次输入新密码'
              }, {
                validator: this.checkPassword.bind(this)
              }]
            })(
              <Input type="password" placeholder="请再次输入新密码"/>
            )}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary">完成</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const ResetPassIndex = Form.create()(NormalLoginForm);


function mapStateToProps(state) {
  return {
    loading: state.loading,
    userInfo: state.layout.userInfo
  };
}


export default connect(mapStateToProps)(ResetPassIndex);
