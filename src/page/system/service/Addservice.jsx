"use strict"
import React, {Component} from 'react'
import './service.scss'
import {Card,Form, Input, Button, Radio } from 'antd'
import request from '../../../common/request/request.js'
import {classification,dataList,ww} from '../../../constants.js'
import {Link} from 'react-router';
const FormItem = Form.Item;

class AddService extends Component {
        constructor(props) {
            super(props)
            this.state = {
                formLayout: 'inline',
            };
      }
      handleFormLayoutChange = (e) => {
         this.setState({ formLayout: e.target.value });
       }
       render() {
          const { formLayout } = this.state;
          const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          } : null;
          const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
          } : null;
          return (
            <Card className="AddService" bordered={true} >
                 <h3>服务项目信息:</h3>
                  <Form  layout={formLayout}>

                      <FormItem
                        label="项目名称"
                        {...formItemLayout}
                      >
                      <Input placeholder="input placeholder" />
                    </FormItem>
                    <FormItem className="itemprice"
                      label="项目价格"
                      {...formItemLayout}
                    >
                    <div className="price">
                        <span className="priceLeft">￥</span>
                        <input type="text" placeholder=" " />
                        <span className="priceRight">元</span>
                    </div>
                    </FormItem>

                  </Form>
                  <div className="conService">
                      <h4>项目内容</h4>
                      <Card></Card>
                  </div>
            </Card>
          );
        }



        componentDidMount(){
            console.log(this.columns)
            console.log(this.props)

        }
}

export default AddService
