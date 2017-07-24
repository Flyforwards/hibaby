/**
 * Created by zhurw on 2017/7/17.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Card,Input,Button ,Form,Col,Row,Select,Icon,message,DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import FileUpload from './fileUpload';
import { Link } from 'react-router';
import { routerRedux } from 'dva/router';
import { queryURL } from '../../../utils/index.js';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
@createForm()
class WebEndemicAdd extends React.Component {
  constructor(props) {
    super(props);
  /* this.state={
      disabledBtn:false,
    }*/
  }
  componentDidMount() {
    this.getEndemicDropdownList();
  }
  //获取地方中心下拉列表数据
  getEndemicDropdownList(params = {}) {
    const {dispatch} = this.props;
    dispatch({
      type: 'webEndemic/getEndemicDropdownList',
      payload: {
        ...params
      }
    });
  }
  //返回
  onBack() {
    this.props.dispatch(routerRedux.push({
      pathname:'/system/websiteHomePageManage',
    }));
  }
  //保存
  onSave() {
    const { form ,dispatch } = this.props;
    // const id = queryURL("id");
    let imgString = '';
    let imgUrls='';
    form.validateFields((err, values) => {
      this.props.webEndemic.addImglist ? this.props.webEndemic.addImglist.map((v,i) => {
        imgString += v[0].name;
        imgUrls +=v[0].url;
      }):'';
      values.img1 = this.props.webEndemic.addImglist ? imgString:'';
      //values.img1Url = this.props.addImglist ? imgUrls:'';
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'webEndemic/updateEndemic',
            payload:{
              ...values,
              id:queryURL("id")
            }
          })
        }else{
          dispatch({
            type: 'webEndemic/saveEndemic',
            payload: values
          })
        }
      }
    })
  }
  //添加图片
  onAddImg(...values){
    this.props.dispatch({
      type:'webEndemic/setImgList',
      payload:values
    })
  }
  //删除图片
  onDeleteImg(...values){
    this.props.dispatch({
      type:'webEndemic/deleteImgList',
      payload:values
    })
  }

  render(){
    //const { disabledBtn ,defaultFileList,ontListType,addImglist,selectAble} = this.props;
    const {initialValue,disabledBtn,addImglist,defaultFileList} = this.props.webEndemic;
    const { getFieldDecorator } = this.props.form;
    //地方中心下拉列表数据
    const endemicData = this.props.webEndemic.endemicList;
    const endemicDataOptions = [];
    if(endemicData != null && endemicData.length > 0){
      endemicData.map(function (item,index) {
        endemicDataOptions.push(<Option  key={item.endemicId} value={item.endemicId+''}>{item.endemicName}</Option>);
      })
    }
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    return (
      <Card className="websitebannerAdd">
        <Form>
          <Row>
            <Col span={12} style = {{width:300}}>
              <FormItem
                label="地方中心"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('webEndemicId',{
                  initialValue: (initialValue==null ? '' : initialValue.webEndemicId+''),
                  rules: [{ required: true, message: '请选择类型' }],
                })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="请选择类型">
                    {endemicDataOptions}
                  </Select>

                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
              >
                {getFieldDecorator("url", {
                  //initialValue:addImglist?addImglist:'' ,
                  rules: [{ required: false }]
                })(
                  <FileUpload  defaultFileList ={defaultFileList} addImgFun={this.onAddImg.bind(this)} deleteImgFun={this.onDeleteImg.bind(this)} imgInputName="url">
                    <Button key="1" disabled={disabledBtn}  className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                  </FileUpload>
                )}
              </FormItem>
            </Col>
          </Row>

        </Form>
        <div className = "bottomBtn">
          <Button className="btn saveBtn" onClick={this.onSave.bind(this)}> 保存</Button>
          <Button className="btn backBtn" onClick={this.onBack.bind(this)}> 返回</Button>
        </div>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    webEndemic: state.webEndemic
  };
}

export default connect(mapStateToProps)(WebEndemicAdd);
