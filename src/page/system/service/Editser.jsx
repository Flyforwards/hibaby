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
            this.handleSave=this.handleSave.bind(this);
            let dataId=GetQueryString("id");
            const item=this.props.data ;
            console.log("editid>>>>>",dataId)
            console.log("edit>>>",item)
            let values =null;
            let id=null;
            let price=null;
            let name='';
            let contents='';
            if(item!==null){
                console.log("item>>",item)
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
              console.log("edit>>>",values)
              console.log("editName>>>",price)
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

      handleFormLayoutChange = (e) => {
         this.setState({ formLayout: e.target.value });
       }



       handleSave = (e) => {
          e.preventDefault();
          let values = this.props.form.getFieldsValue();
          console.log("values>>>",values)
          let id=this.state.id;
          let params = {};
          Object.keys(values,).map((key, index) => {
              params[key] = values[key];
            })
          params = {...params,id};
          console.log('add:handlesave>>',params)
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
                      <Form  layout={formLayout}>

                          <FormItem
                            label="项目名称"
                            {...formItemLayout}
                          >
                          {getFieldDecorator('name', {
                              initialValue:`${this.state.name}`,
                                rules: [{ required: true ,message: '在此输入内容'}],
                            })(
                          <Input  />
                          )}
                        </FormItem>

                            <FormItem label="项目价格"
                              {...formItemLayout}
                            >
                            {getFieldDecorator('price', {
                              initialValue:`${this.state.price}`,
                                  rules: [{ required: true ,message: '在此输入内容'}],
                              })(
                            <Input placeholder=" " />
                            )}
                            </FormItem>

                        </Form>
                        <Form>
                        <div className="ConService" style={{position:'relative',overflow:'hidden'}}>
                        <FormItem  className="procontent"
                          label="项目内容"
                          {...formItemLayout}
                        >
                        {getFieldDecorator('contents', {
                          initialValue:`${this.state.contents}`,
                              rules: [{ required: true ,message: '在此输入内容'}],
                          })(
                             <Input  className = "ServiceInput"/>

                        )}
                        </FormItem>
                        </div>
                      </Form>
                </Card>
                <div className="btn">
                      <Link className="BackBtn" to='/system/serviceitem'>
                          <Button>返回</Button>
                      </Link>
                      <Link className="SaveBtn" onClick={this.handleSave}>
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
  return ( < div >
    < EditService dispatch = {
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

export default connect(mapStateToProps)(EditService);
