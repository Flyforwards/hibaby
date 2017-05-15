"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import './service.scss'
import {Card,Form, Input, Button, Radio, Modal} from 'antd'
import {Link} from 'react-router';
import AlertModalFrom from 'common/AlertModalFrom'
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class LookService extends Component {
        constructor(props) {
            super(props)
            this.delete=this.delete.bind(this)
            this.state = {
                formLayout: 'inline',
            };
      }

      handleFormLayoutChange = (e) => {
         this.setState({ formLayout: e.target.value });
       }
       componentWillMount() {
         this.props.dispatch({
           type : "service/LookService",
         });
       }
       //删除
       delete(addressid){
         this.id = addressid;
         this.setState({
           alertModalVisible: true,
         })
       }
       //确定删除
       handleAlertModalOk(delId) {
           this.props.dispatch({
             type: 'service/deleteService',
             payload: {
               dataId:delId,
               page: this.page,
               pageSize: this.pageSize,
             }
           })
           }
           handleCreateModalCancel() {
               this.setState({
                 alertModalVisible: false,
               })
           }
       render() {
          const addressid=GetQueryString("id")
          const item=this.props.data ;
          let values ={};
          let name='';
            for(let i=0;i<item.length;i++){
                if(item[i].id==addressid && item[i] == undefined){

                }else{
                    values=item[i]
                }
            }
            name=values.name
          console.log("LookId>>>>",name)
          const { formLayout } = this.state;
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
                            <Input  value={name}  />


                        </FormItem>
                        <FormItem className="itemprice"
                          label="项目价格"
                          {...formItemLayout}
                        >

                            <div className="price">
                                <span className="priceLeft">￥</span>
                                <Input  value={`${values.price}`} placeholder=" " />
                                <span className="priceRight">元</span>
                            </div>

                        </FormItem>
                      </Form>
                      <Form className="AddCentent" layout={formLayout}>
                          <FormItem  className="procontent" label="项目内容">
                            <Input rows = {6} value={`${values.contents}`} className = "content"/>
                          </FormItem>
                      </Form>
                </Card>
                <div className="btn">
                      <Link className="BackBtn" to='/system/serviceitem'>
                          <Button>返回</Button>
                      </Link>
                      <Link className="DelBtn" >
                          <Button onClick={this.delete.bind(this,addressid)}>删除</Button>
                      </Link>
                      <Link className="EditBtn" to='/service/edit'>
                          <Button>编辑</Button>
                      </Link>
                </div>
                <AlertModalFrom
                  visible ={ this.state.alertModalVisible }
                  onCancel ={ this.handleCreateModalCancel.bind(this) }
                  onOk = { this.handleAlertModalOk.bind(this, this.id) }
                  message = { "是否确定删除此服务项?" }
                />
            </div>
          );
        }
        componentDidMount(){
            console.log("LookService>>>>",this.props.data)

        }
}
  function GetQueryString(name){
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if(r!=null)return  unescape(r[2]); return null;
  }

function LookService({
  dispatch,
  loading,
  data,
  total,
  page,
  results,
  code
}) {
  return ( < div >
    < LookService dispatch = {
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

export default connect(mapStateToProps)(LookService);
