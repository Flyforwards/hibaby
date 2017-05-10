"use strict"
import React, {Component} from 'react'
import './service.scss'
<<<<<<< HEAD
import {Card,Form, Input, Button, Radio ,AutoComplete } from 'antd'
import request from '../../../common/request/request.js'
import {classification,dataList} from '../../../constants.js'
=======
import {Form, Input, Button, Radio } from 'antd'
import request from 'common/request/request.js'
import {classification,dataList,ww} from 'common/constants.js'
>>>>>>> 454a23e59e496e2e5270df4551343d08a8418ecd
import {Link} from 'react-router';
const FormItem = Form.Item;

class AddService extends Component {
        constructor(props) {
            super(props)
            this.state = {
                formLayout: 'inline',
                dataSource: [],
            };
      }
      handleSearch = (value) => {
         this.setState({
           dataSource: !value ? [] : [
             value,
             value + value,
             value + value + value,
           ],
         });
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
