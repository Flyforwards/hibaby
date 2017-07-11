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
                name:name,
                price:price,
                contents:contents,
                id:id
            };
      }
       handleKeyPress = (ev) => {
         //console.log('handleKeyPress', ev);
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
              <Card title="服务项目信息:" bordered={true} >
                  <Form>
                    <FormItem label="项目名称" {...formItemLayout}>
                      {getFieldDecorator('name', {
                          initialValue:`${this.state.name}`,
                            rules: [{ required: true ,message: '项目名称为必填项！限50字！' , max: 50}],
                        })(
                      <Input placeholder="请填写项目名称！"/>
                      )}
                    </FormItem>
                    <FormItem label="项目价格" {...formItemLayout} >
                      {getFieldDecorator('price', {initialValue:`${this.state.price}`,rules: [{ required: true, message: '项目价格为必填项！限10字！' }],
                      })(
                      <Input addonBefore="￥" addonAfter="元" placeholder="请填写项目价格！"/>)}
                    </FormItem>
                    <FormItem label="项目内容" {...formItemLayout}>
                      {getFieldDecorator('contents', {
                        initialValue:`${this.state.contents}`,
                        rules: [{ required: true ,message: '项目内容为必填项！限100字！',max:100}],
                        })(
                        <Input type="textarea" rows={6} placeholder="请填写项目内容！"/>
                        )}
                    </FormItem>
                  </Form>
              </Card>
              <div className="button-group-bottom">
                <Button style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-2" onClick={ this.handleSave.bind(this) } >保存</Button>
                <Link to='/system/service-item'>
                  <Button style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-1"> 返回 </Button>
                </Link>
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

function mapStateToProps(state) {
  const {
    data,
  } = state.service;

  return {
    loading: state.loading.models.service,
    data,
  };
}

export default connect(mapStateToProps)(EditService);
