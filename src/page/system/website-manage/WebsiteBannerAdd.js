/**
 * Created by Administrator on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Card,Input,Button ,Form,Col,Row,Select,Icon,message } from 'antd';
import FileUpload from './fileUpload';
import { routerRedux } from 'dva/router';
import { queryURL } from '../../../utils/index.js';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create


@createForm()
class WebsiteBannerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      disabledBtn:false,
    }
  }
//添加图片
  onAddImg(...values){
   this.props.dispatch({
    type:'websiteBanner/setImgList',
    payload:values
   })
  }
//删除图片
  onDeleteImg(...values){
    this.props.dispatch({
      type:'websiteBanner/deleteImgList',
      payload:values
    })
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
    form.validateFields((err, values) => {

      values.img = this.props.addImglist ? this.props.addImglist[0].name:'';
      if (!err) {
        if(queryURL("id")){
          dispatch({
            type: 'websiteBanner/updateBanner',
            payload:{
              ...values,
              id:queryURL("id")
            }
          })
        }else{
          dispatch({
            type: 'websiteBanner/addBanner',
            payload: values
          })
        }
      }
    })
  }

  render(){
    const { disabledBtn ,ontListType,addImglist,selectAble,imgSize,typeList} = this.props;
    const { getFieldDecorator } = this.props.form;
    let Options = [];
    if(typeList){
      Options = typeList.map(key=>{
        return <Option key={key.typeId}>{key.typeValue}</Option>
      })
    }


    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:17}
    };

    let size2 = false
    if(addImglist ){
      if( addImglist.length > 0 ){
        size2 = true
      }
    }

    return (
      <Card className="websitebannerAdd" style={{overflow:'hidden'}}>
        <Form>
          <Row>
            <Col span={12} style = {{width:300}}>
          <FormItem label="模块类名" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue:ontListType ? ontListType:null,
              rules: [{ required: true, message: '请选择模块类名' }]
            })(
              <Select
                showSearch
                allowClear
                placeholder="请选择"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={selectAble}
              >
                {Options}
              </Select>
            )}
          </FormItem>
            </Col>
          </Row>
          <Row style = {{width:600}}>
            <Col span = {12}>
              <FormItem
                {...formItemLayout}
              >
                {getFieldDecorator("url", {
                  rules: [{ required: false }]
                })(
                  <FileUpload  defaultFileList ={addImglist} addImgFun={this.onAddImg.bind(this)} deleteImgFun={this.onDeleteImg.bind(this)} imgInputName="url">
                    <Button key="1" disabled={disabledBtn}  className="uploadOptionsButton"><Icon type="upload"/>上传图片</Button>
                  </FileUpload>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="图片尺寸:" {...formItemLayout} style={{fontWeight:'900',textAlign:'left'}}>
                {getFieldDecorator('imgSize', {initialValue:imgSize?imgSize:'' ,rules: [{ required: size2, message: '请输入图片尺寸'}],
                  })(
                  <Input placeholder="请输入图片尺寸，有图片时必填"/>
                )}
              </FormItem>

            </Col>
          </Row>
        </Form>
        <div className = "bottomBtn">
          <Button className="btn  button-group-bottom-2" onClick={this.onSave.bind(this)}> 保存</Button>
          <Button className="btn  button-group-bottom-1" onClick={this.onBack.bind(this)}> 返回</Button>
        </div>
      </Card>
    )
  }


}

function mapStateToProps(state) {
  return state.websiteBanner
}

export default connect(mapStateToProps)(WebsiteBannerAdd);
