"use strict"
import React, { Component } from 'react'
import { connect } from 'dva'
import './service.scss'
import { Card, Form, Input, Button, Radio, AutoComplete, InputNumber } from 'antd'
import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'inline'
    };
  }

  handleSave = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let values = this.props.form.getFieldsValue();
        let params = {};
        let data = [];
        let price = 0;
        Object.keys(values).map((key, index) => {
          if (key !== -1) {
            params[key] = values[key];
          }
        })
        params = { ...params };
        price = Number(params.price)
        this.props.dispatch({
          type: 'service/AddService',
          payload: {
            name: params.name,
            price: price,
            "contents": params.contents
          }
        })
      }
    });
  }

  render() {
    const { formLayout } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <div className="service-cent">
        <Card title="服务项目信息:" bordered={true}>
          <Form >
            <FormItem {...formItemLayout} label="项目名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '项目名称为必填项！限100字！', max: 100 }]
              })(<Input placeholder="请填写项目名称！"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="项目价格">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '项目价格为必填项！限10字！' , max: 10}]
              })(
                <Input addonBefore="￥" addonAfter="元" placeholder="请填写项目价格！"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="项目内容">
              {getFieldDecorator('contents', {
                rules: [{ required: true, message: '项目内容为必填项！限300字' ,max: 300}]
              })(
                <Input placeholder="请填写项目内容！"/>
              )}
            </FormItem>
          </Form>
        </Card>
        <div className="button-group-bottom">
          <Button style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-2" onClick={ this.handleSave.bind(this) }>保存</Button>
          <Link to='/system/service-item'>
            <Button style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-1">返回</Button>
          </Link>
        </div>
      </div>
    );
  }
}

function service({
                   dispatch,
                   loading,
                   data
                 }) {
  return ( < div >
      < AddService dispatch={
        dispatch
      }
                   loading={
                     loading
                   }
                   data={
                     data
                   }
                   total={
                     total
                   }
                   page={page}
                   results={results}
                   range={range}
      /></div >
  )

}
function mapStateToProps(state) {
  const {
          data
        } = state.service;

  return {
    loading: state.loading.models.service,
    data
  };
}

export default connect(mapStateToProps)(AddService);
