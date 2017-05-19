"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import './service.scss'
import {Card,Form, Input, Button, Radio ,AutoComplete } from 'antd'
import {Link} from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class EditService extends Component {
        constructor(props) {
            super(props)
            let dataId=GetQueryString("id");
            const item=this.props.data ;
            let values =null;
            let id=null;
            let price=null;
            let name='';
            let contents='';
            if(item!==null){
              for(let i=0;i<item.length;i++){
                    if(item[i].id==dataId && item[i] !== undefined){
                        values=item[i]
                    }
                }
                if(values!==null){
                    name=values.name;
                    price=values.price;
                    contents=values.contents;
                    id=values.id;
                }
              }
            this.state = {
                formLayout: 'inline',
                dataSource: [],
                name:name,
                price:price,
                contents:contents,
                id:id
            };
      }
       handleKeyPress = (ev) => {
         console.log('handleKeyPress', ev);
       }

       handleSave = (e) => {
          e.preventDefault();
          let values = this.props.form.getFieldsValue();
          let id=this.state.id;
          let params = {};
          Object.keys(values,).map((key, index) => {
              params[key] = values[key];
            })
          params = {...params,id};
          this.props.dispatch({
             type: 'service/editService',
             payload: {
                 name:params.name,
                 price:params.price,
                 contents:params.contents,
                 id:params.id,
             }
           })
      }

       render() {
        const { formLayout } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          } : null;

          return (
            <div className="ServiceBox">
                <Card className="AddService" bordered={true} >
                     <h3>服务项目信息:</h3>
                      <Form className="projectname"  layout={formLayout}>
                          <FormItem label="项目名称" {...formItemLayout}>
                              {getFieldDecorator('name', {
                                  initialValue:`${this.state.name}`,
                                    rules: [{ required: true ,message: '在此输入内容'}],
                                })(
                              <Input  />
                              )}
                          </FormItem>
                        </Form>

                        <Form className="projectprice" layout={formLayout}>
                              <h4>项目价格</h4>
                              <div className="price">
                                  <span className="priceLeft">￥</span>
                                  <FormItem className="pricecon"
                                    {...formItemLayout}
                                  >
                                  {getFieldDecorator('price', {initialValue:`${this.state.price}`,rules: [{ required: true, message: '项目价格为必填项！' }],
                                })(
                                  <Input  placeholder=" " />)}
                                  </FormItem>
                                  <span className="priceRight">元</span>
                              </div>
                        </Form>
                        <Form className="AddCentent" layout={formLayout}>
                            <FormItem  className="procontent" label="项目内容">
                            {getFieldDecorator('contents', {
                              initialValue:`${this.state.contents}`,
                                  rules: [{ required: true ,message: '在此输入内容'}],
                              })(
                              <Input className = "content"/>
                              )}
                            </FormItem>
                        </Form>
                </Card>
                <div className="btn">
                  <Link className="BackBtn AddBack" to='/system/service-item'>
                      <Button>返回</Button>
                  </Link>
                  <Button onClick={ this.handleSave.bind(this) } >保存</Button>
                </div>
            </div>
          );
        }

}
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function EditService({
  dispatch,
  loading,
  data,
  code
}) {
  return ( <div>
    <EditService dispatch = {
      dispatch
    }
    loading = {
      loading
    }
    data={
      data}
    results={results}
    /> </div >
  )

}

function mapStateToProps(state) {
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

export default connect(mapStateToProps)(EditService);
