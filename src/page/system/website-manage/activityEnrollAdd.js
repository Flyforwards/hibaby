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
class ActivityEnrollAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getCourseDropdownData();
  }
  //获取课程下拉列表数据
  getCourseDropdownData(params = {}) {
    const {dispatch} = this.props;
    dispatch({
      type: 'activityEnroll/getCourseDropdownList',
      payload: {
        ...params
      }
    });
  }
  //返回
  onBack() {
    this.props.dispatch(routerRedux.push({
      pathname:'/system/website-manage/activityEnroll',
    }));
  }
  //保存
  onSave() {
    const { form ,dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'activityEnroll/updateEnrollLibrary',
            payload:{
              ...values,
              id:queryURL("id")
            }
          })
        }else{
          dispatch({
            type: 'activityEnroll/saveEnroll',
            payload: values
          })
        }
      }
    })
  }
  checkNumber = (rule, value, callback) => {
    if(!value){
      callback('不能为空');
      return;
    }
    if (value > 0||value ==0) {
      callback();
      return;
    }
    callback('不能为负数');
  }
  render(){
    const {initialValue} = this.props.activityEnroll;
    const { getFieldDecorator } = this.props.form;
    let produceTime  = initialValue==null ? null :initialValue.produceTime;
    if(produceTime !=null){
      const date = new Date(produceTime );
      produceTime  = moment(date, dateFormat);
    }
    const courseData = this.props.activityEnroll.courseList;
    const courseDataOptions = [];
    if(courseData != null && courseData.length > 0){
      courseData.map(function (item,index) {
        courseDataOptions.push(<Option  key={item.id} value={item.id}>{item.name}</Option>);
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
              <FormItem {...formItemLayout} label="姓名">
                {getFieldDecorator('name', {
                  initialValue:(initialValue==null ? '' : initialValue.name),
                  rules: [{ required: true, message: '姓名为必填项！限100字！', max: 100 }]
                })(<Input placeholder="请填写姓名！"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="产假人数">
                {getFieldDecorator('number', {
                  initialValue:(initialValue==null ? '' : initialValue.number),
                  rules: [{ validator:this.checkNumber ,required: true}]
                })(<Input placeholder="请填写产假人数！" type="number"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="停车">
                {getFieldDecorator('parking', {
                  initialValue:(initialValue==null ? '' : initialValue.parking),
                  rules: [{ required: true, message: '停车为必填项！', max: 100 }]
                })(<Input placeholder="请填写停车！"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="电话">
                {getFieldDecorator('phone', {
                  initialValue:(initialValue==null ? '' : initialValue.phone),
                  rules: [{ required: true, message: '电话为必填项！', max: 100 }]
                })(<Input placeholder="请填写电话！"/>)}
              </FormItem>
              <FormItem
                label="预产期"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('produceTime', {
                  initialValue : (produceTime),
                  rules: [{ type: 'object', required: true, message: '请选择预产期' }],
                })(
                  <DatePicker
                    style={{width:"100%"}}
                    format="YYYY-MM-DD"
                    //disabledDate={this.disabledStartDate}
                    //showTime
                    //onOpenChange={this.handleStartOpenChange}
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="门店">
                {getFieldDecorator('store', {
                  initialValue:(initialValue==null ? '' : initialValue.store),
                  rules: [{ required: true, message: '门店为必填项！'}]
                })(<Input placeholder="请填写门店！"/>)}
              </FormItem>
              {/*<FormItem {...formItemLayout} label="课程ID">
                {getFieldDecorator('webCourseId', {
                  initialValue:(initialValue==null ? '' : initialValue.webCourseId),
                  rules: [{ required: true, message: '课程ID为必填项！'}]
                })(<Input placeholder="请填写课程ID！"/>)}
              </FormItem>*/}
              <FormItem
               label="课程"
               hasFeedback
               {...formItemLayout}
               >
               {getFieldDecorator('webCourseId',{
               initialValue: (initialValue==null ? '' : initialValue.webCourseId+""),
               rules: [{ required: true, message: '请选择类型' }],
               })(
               <Select
               showSearch
               optionFilterProp="children"
               filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
               placeholder="请选择类型">
                 {courseDataOptions}
               </Select>

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
    activityEnroll: state.activityEnroll
  };
}

export default connect(mapStateToProps)(ActivityEnrollAdd);
