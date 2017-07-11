/**
 * Created by Administrator on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Card,Input,Button ,Form,Col,Row } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;

@createForm

class WebsiteBannerAdd extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }





  render(){
    const formItemLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span:15 }
    }
    rerurn(
      <Card className="websitebannerAdd">
        <Form>
          <FormItem label="模块类名" {...formItemLayout}>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择模块类名' }]
            })(
              <Select
                showSearch
                allowClear
                placeholder="请选择"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={true}
              >
                <Option key="1">首页</Option>
                <Option key="2">hibaby服务</Option>
                <Option key="3">美研中心</Option>
                <Option key="4">活动咨询</Option>
                <Option key="5">新妈分享</Option>
                <Option key="6">关于Hibaby</Option>
              </Select>
            )}
          </FormItem>

        </Form>
      </Card>
    )
  }


}

export default connect()(WebsiteBannerAdd);
