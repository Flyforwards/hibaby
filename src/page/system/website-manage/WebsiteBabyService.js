/**
 * Created by Flyforwards on 2017/7/18.
 */

import React ,{ Component } from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Table, Input, Icon, Button ,Card,Form,Row,Col,Spin,Select} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import { format} from '../../../utils/index.js';
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
    this.dataSorce=[];
  }
  onDeleteOne(record){

  }

  componentDidMount() {
    this.loadData()
  }

  componentWillUnmount(){
    console.log('88')
  }

  loadData(){
    const dict = {产前服务:'2-1',妈妈服务:'2-2',宝宝服务:'2-3',月子膳食:'2-4',门诊服务:'2-5',星级环境:'2-6'}
    this.props.dispatch({
      type:'websiteBabyCare/getInitialList',
      payload:{str:dict[this.props.actKey]}
    })
  }

  //隐藏弹框
  hideModel() {
    this.props.dispatch({
      type:'websiteBabyCare/changeModal',
      payload:{
        "modalVisible":false,
      }
    })
    this.loadData()
    this.props.form.resetFields()
  }
  //modal确定 保存
  confirmModel() {
    const {form,dispatch} = this.props;
    const typenum = this.props.superData.type1;
    let img1String = '';
    form.validateFields((err, values) => {
      if(!err){
        if(this.props.imgListArr && this.props.imgListArr.length > 0){
          this.props.imgListArr.map((v,i) => {
            img1String = v[0].name ? v[0].name:'';
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
        "type": this.props.superData.type1
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
    this.props.form.resetFields()
    this.props.dispatch({
      type:'websiteBabyCare/onDeleteImg',
      payload:values
    })
  }

  render(){

    const {imgBtn,initialList,modalVisible,content,imgListArr,loading} =this.props;
    let size = false
    if(imgListArr ){
      if( imgListArr.length > 0 ){
        size = true
      }
    }

    let btnDisabled = true
    if( modalVisible){
      if(!imgBtn ){
        btnDisabled = false
      }
    }

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

      <Spin
        spinning={loading.effects['websiteBabyCare/getInitialList'] !== undefined ? loading.effects['websiteBabyCare/getInitialList'] : false}>
        <div className="websiteBabyService" style={{overflow:'hidden'}}>
          <Card className="website-banner" >
            <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
              <Form>
                <Row>
                  <Col style={{width:'300px'}}>
                    <FormItem label="主标题名:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('title', {initialValue: this.props.initialList ? this.props.initialList.title:'',})(
                        <Input placeholder="请输入主标题名" readOnly={!modalVisible}/>
                      )}
                    </FormItem>
                  </Col>

                </Row>
                <Row>
                  <Col span={8} style={{width:'300px'}}>
                    <FormItem label="图片展示:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('img1', {initialValue: '',})(
                        <FileUpload  defaultFileList={imgListArr} addImgFun={this.onAddImg.bind(this)} deleteImgFun={!modalVisible?'': this.onDeleteImg.bind(this)} imgInputName="">
                          <Button key="1" disabled={btnDisabled}   className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                        </FileUpload>
                      )}
                    </FormItem>
                  </Col>

                  <Col span={8} style={{width:'300px'}}>
                    <FormItem label="图片尺寸:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('img1Size', {rules: [{ required: size, message: '请输入图片尺寸'}],
                        initialValue: initialList ? initialList.img1Size:'',})(
                        <Input placeholder="请输入图片尺寸，有图片时必填" readOnly={!modalVisible}/>
                      )}
                    </FormItem>
                  </Col>

                </Row>
                <Row>
                  <Col style={{width:'480px'}}>
                    <FormItem label="内容摘要:" {...formItemLayouts} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('summary', {initialValue: initialList ? initialList.summary:'',})(
                        <Input type="textarea" readOnly={!modalVisible} rows={6} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
            <Row>
              <Col span ={24}>
                <Button className="btnAdd" style={{float:'right'}} onClick={!modalVisible?this.upDateTitle.bind(this):this.confirmModel.bind(this)}>
                  {!modalVisible?'修改':'确定'}</Button>
                <Button className="btnAdd" display style={{display:!modalVisible?'none':'',float:'right',marginRight:'10px'}} onClick={this.hideModel.bind(this)}>取消</Button>
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
          </Card>
        </div>
      </Spin>


    )
  }


}

function mapStateToProps(state){
  return {
    ...state.websiteBabyCare,
    loading:state.loading,
  }
}
export default connect(mapStateToProps)(WebsiteBabyService);

