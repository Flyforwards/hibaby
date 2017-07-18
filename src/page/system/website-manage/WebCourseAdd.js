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
class WebCourseAdd extends React.Component {
  constructor(props) {
    super(props);
  /* this.state={
      disabledBtn:false,
    }*/
  }
  //返回
  onBack() {
    this.props.dispatch(routerRedux.push({
      pathname:'/system/website-manage/course',
    }));
  }
  //保存
  onSave() {
    const { form ,dispatch } = this.props;
    // const id = queryURL("id");
    let imgString = '';
    let imgUrls='';
    form.validateFields((err, values) => {
      /*this.props.addImglist ? this.props.addImglist.map((v,i) => {
        imgString += v[0].name;
        imgUrls +=v[0].url;
      }):'';*/
      /*values.img = this.props.addImglist ? imgString:'';
      values.imgUrl = this.props.addImglist ? imgUrls:'';*/
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'webCourse/updateCourseLibrary',
            payload:{
              ...values,
              id:queryURL("id")
            }
          })
        }else{
          dispatch({
            type: 'webCourse/saveCourse',
            payload: values
          })
        }
      }
    })
  }
  render(){
    //const { disabledBtn ,defaultFileList,ontListType,addImglist,selectAble} = this.props;
    const {initialValue} = this.props.webCourse;
    const { getFieldDecorator } = this.props.form;
    let courseTime = initialValue==null ? null :initialValue.courseTime;
    if(courseTime!=null){
      const date = new Date(courseTime);
      courseTime = moment(date, dateFormat);
      //console.log(moment(date, dateFormat))
    }

    //let courseTime = initialValue==null ? null : moment(initialValue.courseTime, dateFormat);

    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };
    return (
      <Card className="WebCourseAdd">
        <Form>
          <Row>
            <Col span={12} style = {{width:300}}>
              <FormItem {...formItemLayout} label="课程名称">
                {getFieldDecorator('name', {
                  initialValue:(initialValue==null ? '' : initialValue.name),
                  rules: [{ required: true, message: '课程名称为必填项！限100字！', max: 100 }]
                })(<Input placeholder="请填写课程名称！"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="讲师">
                {getFieldDecorator('lecturer', {
                  initialValue:(initialValue==null ? '' : initialValue.lecturer),
                  rules: [{ required: true, message: '讲师为必填项！', max: 100 }]
                })(<Input placeholder="请填写讲师！"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="人数限制">
                {getFieldDecorator('number', {
                  initialValue:(initialValue==null ? '' : initialValue.number),
                  rules: [{ required: true, message: '人数限制为必填项！', max: 100 }]
                })(<Input placeholder="请填写人数限制！"/>)}
              </FormItem>
              <FormItem
                label="类型"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('type',{
                  initialValue: (initialValue==null ? '' : initialValue.type+""),
                  rules: [{ required: true, message: '请选择类型' }],
                })(
                  <Select placeholder="请选择类型">
                    <Option key="1" value="1">会员活动</Option>
                    <Option key="2" value="2">常规课程</Option>
                  </Select>

                )}
              </FormItem>
              <FormItem {...formItemLayout} label="适合人群">
                {getFieldDecorator('crowd', {
                  initialValue:(initialValue==null ? '' : initialValue.crowd),
                  rules: [{ required: true, message: '适合人群为必填项！', max: 100 }]
                })(<Input placeholder="请填写适合人群！"/>)}
              </FormItem>
              <FormItem
                label="课程时间"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('courseTime', {
                  initialValue : (courseTime),
                  rules: [{ type: 'object', required: true, message: '请选择活动开始时间' }],
                })(
                  <DatePicker
                    style={{width:"100%"}}
                    format="YYYY-MM-DD HH:mm:ss"
                    //disabledDate={this.disabledStartDate}
                    showTime
                    //onOpenChange={this.handleStartOpenChange}
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="地址">
                {getFieldDecorator('address', {
                  initialValue:(initialValue==null ? '' : initialValue.address),
                  rules: [{ required: true, message: '地址为必填项！'}]
                })(<Input placeholder="请填写地址！"/>)}
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
    webCourse: state.webCourse
  };
}

export default connect(mapStateToProps)(WebCourseAdd);
