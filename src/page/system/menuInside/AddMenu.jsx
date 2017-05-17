"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import './service.scss'
import {Card,Form, Input, Button, Radio ,AutoComplete } from 'antd'
import {Link} from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class AddService extends Component {
        constructor(props) {
            super(props);
            this.handleSave=this.handleSave.bind(this);
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


       handleSave = (e) => {
          e.preventDefault();
          let values = this.props.form.getFieldsValue();
          console.log("AddService>>>>",values)
          let params = {};
          let data = [];
          let price=0;
          Object.keys(values).map((key, index) => {
              if (key!== -1) {
                params[key] = values[key];
              }
          })
          params = {...params};
          console.log('add:handlesave>>',params)
          price=Number(params.price)
          console.log(price)
          this.props.dispatch({
             type: 'service/AddService',
             payload: {
                 name:params.name,
                 price:price,
                 "contents":params.contents
             }
           })

         }

       render() {
          const { formLayout } = this.state;
          const { dataSource } = this.state;
          const { getFieldDecorator } = this.props.form;
          const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span:2 },
            wrapperCol: { span: 22 },
          } : null;
          return (
            <div className="ServiceBox">
                <Card className="AddService" bordered={true} >
                     <h3>服务项目信息:</h3>
                      <Form className="projectname" layout={formLayout}>
                          <FormItem label="项目名称">
                          {getFieldDecorator('name', {rules: [{ required: true, message: '项目名称为必填项！' }],
                            })(  <Input  /> )}
                        </FormItem>
                      </Form>
                      <Form className="projectprice" layout={formLayout}>
                            <h4>项目价格</h4>
                            <div className="price">
                                <span className="priceLeft">￥</span>
                                <FormItem className="pricecon"
                                  {...formItemLayout}
                                >
                                {getFieldDecorator('price', {rules: [{ required: true, message: '项目价格为必填项！' }],
                              })(
                                <Input  placeholder=" " />)}
                                </FormItem>
                                <span className="priceRight">元</span>
                            </div>
                      </Form>
                      <Form className="AddCentent" layout={formLayout}>
                          <FormItem  className="procontent" label="项目内容">
                              {getFieldDecorator('contents', {rules: [{ required: true, message: '项目内容为必填项！' }],
                            })(
                                <Input rows = {6} className = "content"/>
                              )}
                          </FormItem>
                      </Form>
                </Card>
                <div className="btn">
                      <Link className="BackBtn AddBack" to='/system/serviceitem'>
                          <Button>返回</Button>
                      </Link>
                      <Link className="SaveBtn AddSave" to='/system/serviceitem'>
                          <Button onClick={this.handleSave}>保存</Button>
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

function service({
  dispatch,
  loading,
  data,
  code
}) {
  return ( < div >
    < AddService dispatch = {
      dispatch
    }
    loading = {
      loading
    }
    data={
      data
    }
    total = {
      total
    }
    page={page}
    results={results}
    range={range}
    /> </div >
  )

}
function mapStateToProps(state) {
  console.log("modelss",state.service)
  const {
    data,
    code
  } = state.service;

  return {
    loading: state.loading.models.service,
    data,
    code
  };
}

export default connect(mapStateToProps)(AddService);
