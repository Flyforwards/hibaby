/**
 * Created by Flyforwards on 2017/7/18.
 */

import React ,{ Component } from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Table, Input, Icon, Button,Popconfirm ,Card,Form,Row,Col,Spin,Select} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import { format} from '../../../utils/index.js';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import FileUpload from './fileUpload';
import { browserHistory } from 'dva/router';

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
      },
        {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (<span>
            <Link disabled={false} className="one-link" to={`/system/website-manage/addbabycare?type=${this.props.initialList ? this.props.initialList.type:''}&id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
          </span>
          )
        },
        width: '20%'
      }];
    this.dataSorce=[];
  }
  onDeleteOne(record){
    this.props.dispatch({
      type:'websiteBabyCare/deleteExpert',
      payload:{
        'dataId':record,
      }
    })
  }

  componentDidMount() {
    this.hideModel()
  }

  loadData(){
    this.props.dispatch({
      type:'websiteBabyCare/getInitialList',
      payload:{str:this.props.superData?this.props.superData.type1:'2-1'}
    })
    if(this.props.superData){
      if(this.props.superData.type2){
        this.props.dispatch({type:'websiteBabyCare/getExpertInitialList',payload:{"str":this.props.superData.type2,}});
      }
    }
  }

  //隐藏弹框
  hideModel() {
    this.loadData()
    this.props.form.resetFields()
  }
  //modal确定 保存
  confirmModel() {
    const {form,dispatch} = this.props;
    let img1String = '';
    let img2String = '';
    let img3String = '';
    form.validateFields((err, values) => {
      if(!err){
        if(this.props.imgListArr && this.props.imgListArr.length > 0){
          img1String = this.props.imgListArr[0].name ? this.props.imgListArr[0].name:'';
        }
        if(this.props.imgList2Arr && this.props.imgList2Arr.length > 0){
          img2String = this.props.imgList2Arr[0].name ? this.props.imgList2Arr[0].name:'';
        }
        if(this.props.imgList3Arr && this.props.imgList3Arr.length > 0){
          img3String = this.props.imgList3Arr[0].name ? this.props.imgList3Arr[0].name:'';
        }
        values.img2 = img2String;
        values.img1 = img1String;
        values.img3 = img3String;

        values.type = this.props.superData.type1;
        if (!err) {
          if(!this.props.initialList){
            dispatch({type: 'websiteBabyCare/addExpert', payload:values})
          }
          else {
            dispatch({type: 'websiteBabyCare/updateExpert', payload:{...values, "id":this.props.initialList.id,}})}
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

  //添加图片
  onAddImg2(...values){
    this.props.dispatch({
      type:'websiteBabyCare/onAddImg2',
      payload:values
    })
  }
  //删除图片
  onDeleteImg2(...values){
    this.props.form.resetFields()
    this.props.dispatch({
      type:'websiteBabyCare/onDeleteImg2',
      payload:values
    })
  }

  //添加图片
  onAddImg3(...values){
    this.props.dispatch({
      type:'websiteBabyCare/onAddImg3',
      payload:values
    })
  }
  //删除图片
  onDeleteImg3(...values){
    this.props.form.resetFields()
    this.props.dispatch({
      type:'websiteBabyCare/onDeleteImg3',
      payload:values
    })
  }


  listOnAdd(){
    this.props.dispatch({
      type:'websiteBanner/setNewValue'
    });
    this.props.dispatch(routerRedux.push({
      pathname: '/system/website-manage/addExpert',
      query: {
        "type":this.props.superData.type2
      },
    }))
  }


  render(){

    const {imgBtn,imgList2Arr,imgList3Arr,img2Btn,img3Btn,initialList,modalVisible,content,imgListArr,loading,expertInitialList} =this.props;
    const type1 = this.props.superData.type1;
    let isTab = type1 === '2-1'||type1 === '2-2'|| type1 === '2-3'||type1 === '2-4';
    let isTwoImage = type1 === '2-2' ||type1 === '2-16' ||type1 === '2-17'||type1 === '2-18'||type1 === '2-19';
    let isThreeImage = type1 === '2-12' ||type1 === '2-13' ||type1 === '2-14'||type1 === '2-15'||
      type1 === '2-20'||type1 === '2-21'||type1 === '2-22'||type1 === '2-23';


    const ListColumns = [
      {
      title:"ID",
      dataIndex:'id',
      key:'id',
      width:"10%",
    },{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '10%',
    },{
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      width: '20%',
    },
      {
        title: '图1大小',
        dataIndex: 'img1Size',
        key: 'img1Size',
        width: '5%',
      },
      {
        title: '图2大小',
        dataIndex: 'img2Size',
        key: 'img2Size',
        width: '5%',
      },{
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <span>
            <Link disabled={false} className="one-link" to={`/system/website-manage/addExpert?type=${record.type}&id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
            <Popconfirm title="确定删除吗?" onConfirm={() => this.onDeleteOne(record.id)}>
             <Link disabled={false} className="one-link">删除</Link>
            </Popconfirm>

          </span>
          )
        },
        width: '20%'
      }];

    let size = false
    if(imgListArr ){
      if( imgListArr.length > 0 ){
        size = true
      }
    }

    let size2 = false
    if(imgList2Arr ){
      if( imgList2Arr.length > 0 ){
        size2 = true
      }
    }

    let size3 = false
    if(imgList3Arr ){
      if( imgList3Arr.length > 0 ){
        size3 = true
      }
    }

    let btnDisabled = true
    let btnDisabled2 = true
    let btnDisabled3 = true

    if( modalVisible){
      if(!imgBtn ){
        btnDisabled = false
      }
      if(!img2Btn ){
        btnDisabled2 = false
      }
      if(!img3Btn ){
        btnDisabled3 = false
      }
    }

    let contentArr = []
    let con = content;
    if(isTab){
      try {
        contentArr = eval(content)
        if(contentArr && contentArr.length > 0 ){
          con =[];
          contentArr && contentArr.length > 0 ? contentArr.map((v,i) => {
            v.id = i ;
            con.push(v)
          }):content;
        }

      }
      catch (e){

      }
    }

    const ListTableProps = {
      loading:loading.effects['websiteBabyCare/getExpertInitialList'],
      dataSource:expertInitialList,
      pagination:false,
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    const formItemLayouts = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:17}
    };
    const contetnItemLayouts = {
      labelCol:{ span: 3 },
      wrapperCol:{ span:21}
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
                          <Button key="1" disabled={btnDisabled}   className="uploadBtn"><Icon type="upload"/>上传图片</Button>
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


                {isTwoImage||isThreeImage?  <Row>
                  <Col span={8} style={{width:'300px'}}>
                    <FormItem label="图片展示2:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('img2', {initialValue: '',})(
                        <FileUpload  defaultFileList={imgList2Arr} addImgFun={this.onAddImg2.bind(this)} deleteImgFun={!modalVisible?'': this.onDeleteImg2.bind(this)} imgInputName="">
                          <Button key="1" disabled={btnDisabled2}   className="uploadBtn"><Icon type="upload"/>上传图片</Button>
                        </FileUpload>
                      )}
                    </FormItem>
                  </Col>

                  <Col span={8} style={{width:'300px'}}>
                    <FormItem label="图片尺寸:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('img2Size', {rules: [{ required: size2, message: '请输入图片尺寸'}],
                        initialValue: initialList ? initialList.img2Size:'',})(
                        <Input placeholder="请输入图片尺寸，有图片时必填" readOnly={!modalVisible}/>
                      )}
                    </FormItem>
                  </Col>
                </Row>:''}


                {isThreeImage?  <Row>
                  <Col span={8} style={{width:'300px'}}>
                    <FormItem label="图片展示3:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('img3', {initialValue: '',})(
                        <FileUpload  defaultFileList={imgList3Arr} addImgFun={this.onAddImg3.bind(this)} deleteImgFun={!modalVisible?'': this.onDeleteImg3.bind(this)} imgInputName="">
                          <Button key="1" disabled={btnDisabled3}   className="uploadBtn"><Icon type="upload"/>上传图片</Button>
                        </FileUpload>
                      )}
                    </FormItem>
                  </Col>

                  <Col span={8} style={{width:'300px'}}>
                    <FormItem label="图片尺寸:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('img3Size', {rules: [{ required: size3, message: '请输入图片尺寸'}],
                        initialValue: initialList ? initialList.img3Size:'',})(
                        <Input placeholder="请输入图片尺寸，有图片时必填" readOnly={!modalVisible}/>
                      )}
                    </FormItem>
                  </Col>
                </Row>:''}


                <Row>
                  <Col style={{width:'480px'}}>
                    <FormItem label="内容摘要:" {...formItemLayouts} style={{fontWeight:'900',textAlign:'left'}}>
                      {getFieldDecorator('summary', {initialValue: initialList ? initialList.summary:'',})(
                        <Input type="textarea" readOnly={!modalVisible} rows={6} />
                      )}
                    </FormItem>
                  </Col>
                </Row>

                {isTab ?'':
                  <Row>
                    <Col style={{width:'600'}}>
                      <FormItem label="内容:" {...contetnItemLayouts} style={{fontWeight:'900',textAlign:'left'}}>
                        {getFieldDecorator('content', {initialValue: con ? con:'',})(
                          <Input type="textarea" readOnly={!modalVisible} rows={6} />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                }
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

          {
            (isTab && typeof con === 'object')?<Card style={{marginTop:'20px'}}>
              <Row>
                <Col span ={24}>
                  <Button className="btnAdd" style={{float:'right',marginBottom:'10px'}} onClick={this.onAdd.bind(this)}>添加</Button>
                </Col>
              </Row>
              <Table className='management-center' bordered columns={ this.columns } dataSource={con} rowKey="id"/>
            </Card>:''
          }


          { this.props.superData?(this.props.superData.type2?
            <Card style={{marginTop:'20px'}}>
              <Row>
                <Col span ={24}>
                  <Button className="btnAdd" style={{float:'right',marginBottom:'10px'}} onClick={this.listOnAdd.bind(this)}>添加</Button>
                </Col>
              </Row>
                <Table className='management-center' bordered columns={ ListColumns } {...ListTableProps} rowKey="id"/>
              </Card>
              :'')
              :''
          }



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

