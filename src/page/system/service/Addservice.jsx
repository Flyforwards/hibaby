"use strict"
import React, {Component} from 'react'
import './service.scss'
import {Card,Form, Input, Button, Radio ,AutoComplete } from 'antd'
import {Link} from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class AddService extends Component {
        constructor(props) {
            super(props)
            this.state = {
                formLayout: 'inline',
                dataSource: [],
            };
      }
       handleKeyPress = (ev) => {
         console.log('handleKeyPress', ev);
       }

      handleFormLayoutChange = (e) => {
         this.setState({ formLayout: e.target.value });
       }
       render() {
          const { formLayout } = this.state;
          const { dataSource } = this.state;
          const { getFieldDecorator } = this.props.form;
          const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          } : null;
          const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
          } : null;
          return (
            <div className="ServiceBox">
                <Card className="AddService" bordered={true} >
                     <h3>服务项目信息:</h3>
                      <Form  layout={formLayout}>
                          <FormItem label="项目名称">
                          {getFieldDecorator('name', {rules: [{ required: true, message: '字段名称为必填项！' }],
                        })(  <Input placeholder="input placeholder" />
                          )}

                        </FormItem>
                        <FormItem className="itemprice"
                          label="项目价格"
                          {...formItemLayout}
                        >
                        {getFieldDecorator('name', {rules: [{ required: true, message: '字段名称为必填项！' }],
                      })(
                            <div className="price">
                                <span className="priceLeft">￥</span>
                                <Input  placeholder=" " />
                                <span className="priceRight">元</span>
                            </div>
                        )}
                        </FormItem>
                      </Form>
                      <Form className="AddCentent">
                          <FormItem  className="procontent" label="项目内容">
                          {getFieldDecorator('name', {rules: [{ required: true, message: '字段名称为必填项！' }],
                        })(
                            <Input rows = {6} className = "content"/>
                          )}


                          </FormItem>

                      </Form>
                </Card>
                <div className="btn">
                      <Link className="BackBtn" to='/system/serviceitem'>
                          <Button>返回</Button>
                      </Link>
                      <Link className="SaveBtn" to='/system/serviceitem'>
                          <Button>保存</Button>
                      </Link>
                </div>
            </div>
          );
        }



        componentDidMount(){
            console.log(this.columns)
            console.log(this.props)

        }
}

export default AddService
