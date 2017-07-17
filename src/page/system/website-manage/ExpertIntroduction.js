/**
 * Created by Flyforwards on 2017/7/13.
 */
import React ,{ Component } from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card,Form,Row,Col,Modal} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import { format } from '../../../utils/index.js';
import { TypeKey } from './TypeKey';
const FormItem = Form.Item;
const createForm = Form.create


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
    },{
      title: '正文',
      dataIndex: 'content',
      key: 'content',
      width: '30%',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <span>
            <Link disabled={false} className="one-link" to={`/system/website-manage/add?type=${record.type}&id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
            <Popconfirm title="确定删除吗?" onConfirm={() => this.onDeleteOne(record.id)}>
             <Link disabled={false} className="one-link">删除</Link>
            </Popconfirm>

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
  onDeleteOne(){

  }
  //隐藏弹框
  hideModel() {
    this.setState({
      modalVisible:false,
    })
  }
  //modal确定 保存
  confirmModel() {
    const {form,dispatch} = this.props;
    const { validateFields } = form;
    form.validateFields((err, values) => {
      values.type = ''
      if (!err) {
        console.log("values",values)
        dispatch({
          type: 'websiteBanner/updateExpert',
          payload:{  ...values }
        })
      }
    })
  }
  //点击修改
  upDateTitle() {
    this.setState({
      modalVisible:true,
    })
  }
  checkPrice = (rule, value, callback) => {
    if(value){
      callback();
    }
    callback('不能为空');
  }
  render(){
    const { expertInitialList,loading,oneExpertMsg,oneExpertTitleMsg,readAble} =this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    const tableProps = {
      loading:loading,
      dataSource:expertInitialList,
      pagination:false,
    };
    return(
      <Card className="website-banner">
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Form>
            <Row>
              <Col span={8} style={{width:'300px'}}>
              <FormItem label="主标题名:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                {getFieldDecorator('title', {
                  initialValue:oneExpertTitleMsg ? oneExpertTitleMsg.title:'',
                  rules: [{validator:this.checkPrice, required: true, }],
                })(
                  <Input placeholder="请输入主标题名" readOnly={readAble}/>
                )}
              </FormItem>
              </Col>
              {
                readAble ? <Col span ={6}><Button className="one-button" onClick={this.upDateTitle.bind(this)}>修改</Button></Col> : <span>
                   <Button className="one-button" style={{float:'right',marginBottom:'10px'}}>保存</Button>
                   <Button className="one-button" style={{float:'right',marginBottom:'10px'}}>取消</Button>
                </span>
              }
              <Col span={10}>
                <Link to="/system/website-manage/add">
                  <Button className="one-button" style={{float:'right',marginBottom:'10px'}}>添加</Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
        <Table className='management-center' bordered columns={ this.columns } {...tableProps} rowKey="id"/>
        <Modal
          title="主标题修改"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onOk={this.confirmModel.bind(this)}
          okText="保存"
          cancelText="取消"
          width={500}
          maskClosable={ false }
          onCancel={this.hideModel.bind(this)}
        >
          <Form>
            <FormItem label="主标题名:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
              {getFieldDecorator('title', {
                initialValue:oneExpertTitleMsg ? oneExpertTitleMsg.title:'',
                rules: [{validator:this.checkPrice, required: true, }],
              })(
                <Input placeholder="请输入主标题名" />
              )}
            </FormItem>

          </Form>
        </Modal>
      </Card>
    )
  }


}

function mapStateToProps(state){
  const {expertInitialList,oneExpertTitleMsg,oneExpertMsg,readAble} = state.websiteBanner;
  console.log("titlessss",oneExpertTitleMsg)
  return {
    readAble,
    oneExpertTitleMsg,
    oneExpertMsg,
    expertInitialList,
    loading:state.loading.models.websiteBanner,
  }
}
export default connect(mapStateToProps)(ExpertIntroduction);
