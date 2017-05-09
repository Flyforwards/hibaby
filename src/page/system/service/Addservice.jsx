"use strict"
import React, {Component} from 'react'
import './service.scss'
import {Form, Input, Button, Radio } from 'antd'
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
            <div>
              <Form layout={formLayout}>

                <FormItem
                  label="Field A"
                  {...formItemLayout}
                >
                  <Input placeholder="input placeholder" />
                </FormItem>
                <FormItem
                  label="Field B"
                  {...formItemLayout}
                >
                  <Input placeholder="input placeholder" />
                </FormItem>

              </Form>
              <Form>
              <FormItem
                label="Field A"
                {...formItemLayout}
              >
                <Input placeholder="input placeholder" />
              </FormItem>


            </Form>
            </div>
          );
        }



        componentDidMount(){
            console.log(this.columns)
            console.log(this.props)

        }
}

export default AddService
