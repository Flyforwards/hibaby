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
          alertModalVisible: false
        }
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
          let addressid=GetQueryString("id")
          const item=this.props.data ;
          let values ={};
          let name='';
          let id=null;
          for(let i=0;i<item.length;i++){
              if(item[i].id==addressid && item[i] !== undefined){
                    values=item[i]
              }
          }
            name=values.name;
         const del = !this.props.permissionAlias.contains('SERVICE_ITEM_DELETE');
         const edit = !this.props.permissionAlias.contains('SERVICE_ITEM_EDIT');
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
                <Form >
                  <FormItem {...formItemLayout} label="项目名称">
                      <Input readOnly  value={name}  />
                  </FormItem>
                  <FormItem {...formItemLayout} label="项目价格">
                    <Input addonBefore="￥" addonAfter="元" readOnly value={`${values.price}`}/>
                  </FormItem>
                  <FormItem {...formItemLayout} label="项目内容">
                    <Input readOnly type="textarea" rows={6} value={`${values.contents}`}/>
                  </FormItem>
                </Form>
              </Card>
              <div className="button-group-bottom">
                <Link to={{pathname:'/system/service-item/edit',query:{id:`${addressid}`}}}>
                  <Button disabled={edit} style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-3"> 编辑 </Button>
                </Link>
                <Button disabled={del} style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-3" onClick={ this.delete.bind(this,addressid) }>删除</Button>
                <Link to='/system/service-item'>
                  <Button style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-1"> 返回 </Button>
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
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.service,
    data,
    permissionAlias
  };
}

export default connect(mapStateToProps)(LookService);
