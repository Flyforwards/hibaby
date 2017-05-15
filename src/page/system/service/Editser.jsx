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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          } : null;
            let item=this.props.data;
            console.log("item>>>>",item)
          return (
            <div className="ServiceBox">
                <Card className="AddService" bordered={true} >
                     <h3>服务项目信息:</h3>
                      <Form  layout={formLayout}>

                          <FormItem
                            label="项目名称"
                            {...formItemLayout}
                          >
                          {getFieldDecorator('field0', {
                            //initialValue:"",
                                rules: [{ required: true ,message: '在此输入内容'}],
                            })(
                          <Input placeholder="input placeholder" />
                          )}
                        </FormItem>
                        <FormItem className="itemprice"
                          label="项目价格"
                          {...formItemLayout}
                        >
                        {getFieldDecorator('field0', {
                          //initialValue:"",
                              rules: [{ required: true ,message: '在此输入内容'}],
                          })(
                        <div className="price">
                            <span className="priceLeft">￥</span>
                            <input type="text" placeholder=" " />
                            <span className="priceRight">元</span>
                        </div>)}
                        </FormItem>


                        <FormItem  className="procontent"
                          label="项目内容"
                          {...formItemLayout}
                        >

                        </FormItem>
                        {getFieldDecorator('field0', {
                          //initialValue:"",
                              rules: [{ required: true ,message: '在此输入内容'}],
                          })(
                        <div className="ConService" style={{position:'relative',overflow:'hidden'}}>
                             <Input type = "textarea" rows = {6} className = "ServiceInput"/>
                        </div>)}
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

function EditService({
  dispatch,
  loading,
  data,
  total,
  page,
  results,
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
      data
    }
    total = {
      total
    }
    page={page}
    results={results}
    /> </div >
  )

}
function mapStateToProps(state) {
  console.log("modelss",state.service)
  const {
    data,
    total,
    page,
    code
  } = state.service;

  return {
    loading: state.loading.models.service,
    data,
    total,
    page,
    code
  };
}

export default connect(mapStateToProps)(EditService);
