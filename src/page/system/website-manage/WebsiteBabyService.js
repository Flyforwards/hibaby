/**
 * Created by Flyforwards on 2017/7/18.
 */

import React ,{ Component } from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card,Form,Row,Col,Modal,Select} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import { format ,queryURL} from '../../../utils/index.js';
import { TypeKey } from './TypeKey';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import FileUpload from './fileUpload';

@createForm()
class WebsiteBabyService extends React.Component{
  constructor(props){
    super(props);
    this.state={
      modalVisible:false,
    },
      this.columns = [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '20%',
      },{
        title: '二级标题',
        dataIndex: 'data',
        key: 'data',
        width: '50%',
        render:(text,record,index) =>{
          let str ='';
          text.split("#").map((v,i) => {
            str += v+','
          });
          return str;
    }
      },{
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <span>
            <Link disabled={false} className="one-link" to={`/system/website-manage/addbabycare?type=${this.props.initialList ? this.props.initialList.type:''}&id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
            {/*<Popconfirm title="确定删除吗?" onConfirm={() => this.onDeleteOne(record.id)}>*/}
             {/*<Link disabled={false} className="one-link">删除</Link>*/}
            {/*</Popconfirm>*/}

          </span>
          )
        },
        width: '30%'
      }];
    this.dataSorce=[{
      "id":1,
      "title":'展架',
      "summary":'我是测试的',
      "content":'我是正文',
    },{
      "id":2,
      "title":'安其拉',
      "summary":'法师',
      "content":'甜美小萝莉',
    }];
  }
  onDeleteOne(record){


    // this.props.dispatch({
    //   type:'websiteBanner/deleteExpert',
    //   payload:{
    //     "dataId":record,
    //   }
    // })
  }
  //隐藏弹框
  hideModel() {
    this.props.dispatch({
      type:'websiteBabyCare/changeModal',
      payload:{
        "modalVisible":false,
      }
    })
    this.props.dispatch({
      type:'websiteBabyCare/getInitialList',
    })
  }
  //modal确定 保存
  confirmModel() {
    const {form,dispatch} = this.props;
    const { validateFields } = form;
    const typenum = queryURL("type1");
    let img1String = '';
    form.validateFields((err, values) => {


      if(this.props.imgListArr && this.props.imgListArr.length > 0){
        this.props.imgListArr.map((v,i) => {
          img1String = v[0].name ? v[0].name:'';
        })
      }else{
        this.props.defaultlist.map((v,i) => {
          img1String = v.name ? v.name:'';
        })
      }
      values.img1 = img1String;
      if (!err) {
        dispatch({
          type: 'websiteBabyCare/updateExpert',
          payload:{
            ...values,
            "id":this.props.initialList.id,
            "type":this.props.initialList.type,
            "content":this.props.content,
          }
        })
      }
    })
  }
  //点击修改
  upDateTitle() {
    this.props.dispatch({
      type:'websiteBabyCare/changeModal',
      payload:{
        "modalVisible":true,
      }
    })
  }
  onAdd(){
    this.props.dispatch(routerRedux.push({
      pathname: '/system/website-manage/addbabycare',
      query: {
        "type":queryURL('type1')
      },
    }))
  }
  //添加图片
  onAddImg(...values){
    this.props.dispatch({
      type:'websiteBabyCare/onAddImg',
      payload:values
    })
  }
  //删除图片
  onDeleteImg(...values){
    this.props.dispatch({
      type:'websiteBabyCare/onDeleteImg',
      payload:values
    })
  }
  checkPrice = (rule, value, callback) => {
    if(value){
      callback();
    }
    callback('不能为空');
  }
  render(){
    const {imgArr,imgBtn,initialList,defaultlist,modalVisible,content,imgListArr} =this.props;
    let contentArr = content ? eval(content):[];
    let con =[];
    contentArr && contentArr.length > 0 ? contentArr.map((v,i) => {
                                        v.id = i ;
                                        con.push(v)
                                      }):null;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    const formItemLayouts = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:17}
    };
    return(
      <div className="websiteBabyService" style={{overflow:'hidden'}} key={modalVisible}>
      <Card className="website-banner" >
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Form>
            <Row>
              <Col span={8} style={{width:'300px'}}>
                <FormItem label="主标题名:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('titlea', {
                    initialValue: initialList ? initialList.title:'',
                    rules: [{validator:this.checkPrice, required: false, }],
                  })(
                    <Input placeholder="请输入主标题名" readOnly={true}/>
                  )}
                </FormItem>
              </Col>

            </Row>
            <Row>
              <Col span={8} style={{width:'300px'}}>
                <FormItem label="图片展示:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('img1a', {
                    initialValue: '',
                    rules: [{ required: false, }],
                  })(
                    <FileUpload  defaultFileList={defaultlist}  imgInputName="">
                      <Button key="1" disabled={true}   className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                    </FileUpload>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8} style={{width:'480px'}}>
                <FormItem label="内容摘要:" {...formItemLayouts} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('summarya', {
                    initialValue: initialList ? initialList.summary:'',
                    rules: [{validator:this.checkPrice, required: false, }],
                  })(
                    <Input placeholder="" type="textarea" rows={6} readOnly={true}/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <Row>
          <Col span ={24}>
            <Button className="btnAdd" style={{float:'right'}} onClick={this.upDateTitle.bind(this)}>修改</Button>
          </Col>
        </Row>
      </Card>
        <Card style={{marginTop:'20px'}}>
          <Row>
            <Col span ={24}>
              <Button className="btnAdd" style={{float:'right',marginBottom:'10px'}} onClick={this.onAdd.bind(this)}>新增</Button>
            </Col>
          </Row>
        <Table className='management-center' bordered columns={ this.columns } dataSource={con} rowKey="id"/>
        <Modal
          title="修改"
          wrapClassName="vertical-center-modal"
          visible={modalVisible}
          key={modalVisible}
          onOk={this.confirmModel.bind(this)}
          okText="保存"
          cancelText="取消"
          width={500}
          maskClosable={ false }
          onCancel={this.hideModel.bind(this)}
        >
          <Form>
            <Row>
              <Col span={8} style={{width:'300px'}}>
                <FormItem label="主标题名:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('title', {
                    initialValue: initialList ? initialList.title:'',
                    rules: [{validator:this.checkPrice, required: false, }],
                  })(
                    <Input placeholder="" readOnly={false}/>
                  )}
                </FormItem>
              </Col>

            </Row>
            <Row>
              <Col span={8} style={{width:'300px'}}>
                <FormItem label="图片展示:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('img1', {
                    initialValue: '',
                    rules: [{ required: false, }],
                  })(
                    <FileUpload  defaultFileList={defaultlist} addImgFun={this.onAddImg.bind(this)} deleteImgFun={this.onDeleteImg.bind(this)} imgInputName="">
                      <Button key="1" disabled={imgBtn}   className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                    </FileUpload>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8} style={{width:'400px'}}>
                <FormItem label="内容摘要:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('summary', {
                    initialValue: initialList ? initialList.summary:'',
                    rules: [{validator:this.checkPrice, required: false, }],
                  })(
                    <Input type="textarea" placeholder="" rows={6} readOnly={false} className="test"/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
      </div>
    )
  }


}

function mapStateToProps(state){
  const {imgArr,imgBtn,initialList,defaultlist,modalVisible,content,imgListArr} = state.websiteBabyCare;
  return {
    content,
    imgArr,
    imgListArr,
    imgBtn,
    initialList,
    defaultlist,
    modalVisible,
    loading:state.loading.models.websiteBabyCare,
  }
}
export default connect(mapStateToProps)(WebsiteBabyService);

