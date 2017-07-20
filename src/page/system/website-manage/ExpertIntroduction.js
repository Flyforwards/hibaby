/**
 * Created by Flyforwards on 2017/7/13.
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
    }, {
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
    this.props.dispatch({
      type:'websiteBanner/deleteExpert',
      payload:{
        "dataId":record,
      }
    })
  }
  //隐藏弹框
  hideModel() {
    this.setState({
      modalVisible:false,
    })

  }
  //modal确定 保存
  confirmModel() {
    const {form,dispatch,oneExpertTitleMsg} = this.props;
    const { validateFields } = form;
    const typenum = queryURL("type1");
    form.validateFields((err, values) => {
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
    })
    form.resetFields()
    this.hideModel()
  }
  //点击修改
  upDateTitle() {
    this.setState({
      modalVisible:true,
    })
  }
  // onSelectType(value){
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type:'websiteBanner/getExpertByOneType',
  //     payload:{
  //       "type":value
  //     }
  //   })
  //
  // }
  onAdd(){
    this.props.dispatch({
      type:'websiteBanner/setNewValue'
    });
   this.props.dispatch(routerRedux.push({
      pathname: '/system/website-manage/addExpert',
      query: {
        "type":queryURL('type2')
      },
    }))
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
    // let options = [];
    // level? level.map(function(elem,index){
    //   options.push(<Option key={elem.type}>{elem.name}</Option>)
    // }):null;
    const tableProps = {
      loading:loading,
      dataSource:expertInitialList,
      pagination:false,
    };
    return(
      <Card className="expertIntroduction" style={{overflow:'hidden'}}>
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
            <Row>
              <Col span={8} style={{width:'300px'}}>
                <Row>
                  <Col span={6}><p style={{lineHeight:'28px'}}>主标题名:</p></Col>
                  <Col span={17}><Input placeholder="" value={oneExpertTitleMsg?oneExpertTitleMsg.title:''} readOnly={true}/></Col>
                </Row>


              </Col>
             <Col span ={6}><Button className="btnAdd" onClick={this.upDateTitle.bind(this)}>修改</Button></Col>
              <Col span={10}>
                {
                  expertInitialList && expertInitialList.length > 0 ? <Button className="btnAdd" style={{float:'right',marginBottom:'10px'}} onClick={this.onAdd.bind(this)}>添加</Button> : ''

                }

              </Col>
            </Row>
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
          maskClosable={ true }
          onCancel={this.hideModel.bind(this)}
        >
          <Form>
            <FormItem label="主标题名:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
              {getFieldDecorator('title', {
                initialValue:oneExpertTitleMsg?oneExpertTitleMsg.title:'',
                rules: [{validator:this.checkPrice, required: true, }],
              })(
                <Input placeholder="请输入主标题名"  />
              )}
            </FormItem>

          </Form>
        </Modal>
      </Card>
    )
  }


}

function mapStateToProps(state){
  const {expertInitialList,oneExpertTitleMsg,oneExpertMsg} = state.websiteBanner;
  return {
    oneExpertTitleMsg,
    oneExpertMsg,
    expertInitialList,
    loading:state.loading.models.websiteBanner,
  }
}
export default connect(mapStateToProps)(ExpertIntroduction);
