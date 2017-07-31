/**
 * Created by Flyforwards on 2017/7/13.
 */
import React ,{ Component } from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import FileUpload from './fileUpload';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card,Form,Row,Col,Modal,Select} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import { format ,queryURL} from '../../../utils/index.js';
import { TypeKey } from './TypeKey';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;


@createForm()
class ExpertIntroduction extends React.Component{
  constructor(props){
    super(props);
    this.state={
      modalVisible:false,
    },
    this.columns = [{
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
    }
    , {
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
  }

  componentDidMount() {
    const {type1,type2} = this.props.superData;
    this.props.dispatch(type2?{type:'websiteBanner/getExpertInitialList',payload:{"str":type2?type2:'1-1-1',}}
      :{type:'websiteBanner/saveExpertInitialList',payload:{data:[]}});
    this.props.dispatch({type:'websiteBanner/getExpertByOneType',payload:{str:type1?type1:'1-1'}});
  }

  onDeleteOne(record){
    this.props.dispatch({
      type:'websiteBanner/deleteExpert',
      payload:{
        "dataId":record,
        'type':this.props.superData.type2
      }
    })
  }
  //隐藏弹框
  hideModel() {
    this.setState({
      modalVisible:false,})

  }
  //modal确定 保存
  confirmModel() {
    const {form,dispatch,oneExpertTitleMsg} = this.props;
    const typenum = this.props.superData.type1;
    form.validateFields((err, values) => {
      if(this.props.subMitImg){
        values.img1 = this.props.subMitImg.name
      }
      values.type = typenum;
      if (!err) {
        dispatch({
          type: 'websiteBanner/updateExpert',
          payload:{
            ...values,
            "id":oneExpertTitleMsg.id,
          }
        })
      }
      form.resetFields()
      this.hideModel()
    })

  }
  //点击修改
  upDateTitle() {
    this.setState({
      modalVisible:true,
    })
  }
  onAdd(){
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
  checkPrice = (rule, value, callback) => {
    if(value){
      callback();
    }
    callback('不能为空');
  }

  onDeleteImg(){
    this.props.dispatch({
      type:'websiteBanner/savaSubMitImg',
      payload:''
    })
  }

  onAddImg(...values){
    let value = values[0]
    value.uid = value.name
    this.props.dispatch({
      type:'websiteBanner/savaSubMitImg',
      payload:value
    })

  }



render(){
    const { expertInitialList,loading,oneExpertTitleMsg,subMitImg} =this.props;
    const { getFieldDecorator } = this.props.form;
    const {modalVisible} = this.state


    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    const tableProps = {
      loading:loading,
      dataSource:expertInitialList,
      pagination:false,
    };

  let btnDisabled = true

  if( modalVisible){
    if(!subMitImg ){
      btnDisabled = false
    }
  }

    return(
      <Card className="expertIntroduction" style={{overflow:'hidden'}}>
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>



          <Form>
            <Row>
              <Col span={8} style={{width:'300px'}}>
                <FormItem label="主标题名:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('title', {
                    initialValue:oneExpertTitleMsg?oneExpertTitleMsg.title:'',
                    rules: [{validator:this.checkPrice, required: true, }],
                  })(
                    <Input placeholder="请输入主标题名"  />
                  )}
                </FormItem>


              </Col>
              <Col span ={6}>
                <Button className="btnAdd" style={{float:'left'}} onClick={!modalVisible?this.upDateTitle.bind(this):this.confirmModel.bind(this)}>
                  {!modalVisible?'修改':'确定'}</Button>
                <Button className="btnAdd" display style={{display:!modalVisible?'none':'',float:'left',marginLeft:'10px'}} onClick={this.hideModel.bind(this)}>取消</Button>
              </Col>
              <Col span={10}>
                {
                  this.props.superData && this.props.superData.type2 ?
                    <Button className="btnAdd" style={{float:'right',marginBottom:'10px'}} onClick={this.onAdd.bind(this)}>添加</Button> : ''
                }

              </Col>
            </Row>

          {(this.props.superData.type1 === '4-1'|| this.props.superData.type1 === '7-3'|| this.props.superData.type1 === '1-2-2'|| this.props.superData.type1 === '4-2' ) ?
            <Row>
              <Col span={8} style={{width:'300px'}}>
                <FormItem label="图片展示:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('img1', {initialValue: '',})(
                    <FileUpload  defaultFileList={subMitImg?[subMitImg]:''} addImgFun={this.onAddImg.bind(this)} deleteImgFun={!modalVisible?'': this.onDeleteImg.bind(this)} imgInputName="">
                      <Button key="1" disabled={btnDisabled}   className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                    </FileUpload>
                  )}
                </FormItem>
              </Col>

              <Col span={8} style={{width:'300px'}}>
                <FormItem label="图片尺寸:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                  {getFieldDecorator('img1Size', {rules: [{ required: subMitImg?true:false, message: '请输入图片尺寸'}],
                    initialValue: oneExpertTitleMsg ? oneExpertTitleMsg.img1Size:'',})(
                    <Input placeholder="请输入图片尺寸，有图片时必填" readOnly={!modalVisible}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            :
            ''}
          </Form>

        </div>
        <Table className='management-center' bordered columns={ this.columns } {...tableProps} rowKey="id"/>
      </Card>

    )
  }


}

function mapStateToProps(state){
  return {
    ...state.websiteBanner,
    loading:state.loading.models.websiteBanner,
  }
}
export default connect(mapStateToProps)(ExpertIntroduction);
