"use strict"
import React, {Component} from 'react'
import './service.scss'
import {Card,Form, Input, Button, Radio, Modal} from 'antd'
import request from '../../../common/request/request.js'
import {classification,dataList} from '../../../constants.js'
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
          const { dataSource } = this.state;
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


                        <FormItem  className="procontent"
                          label="项目内容"
                          {...formItemLayout}
                        >

                        </FormItem>
                        <div className="ConService" style={{position:'relative',overflow:'hidden'}}>
                             <Input type = "textarea" rows = {6} className = "ServiceInput"/>
                        </div>
                      </Form>
                </Card>
                <div className="btn">
                      <Link className="BackBtn" to='/system/serviceitem'>
                          <Button>返回</Button>
                      </Link>
                      <Link className="DelBtn">
                          <Button>删除</Button>
                      </Link>
                      <Link className="EditBtn" to='/system/serviceitem'>
                          <Button>编辑</Button>
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
