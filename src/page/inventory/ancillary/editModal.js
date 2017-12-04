import React, { Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col, Table, Popconfirm, Modal, Select, Icon } from 'antd';
import { Link, routerRedux } from 'react-router';
import '../warehouse/inventoryIndex.scss'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;
import moment from 'moment'

@createForm()
class ancillaryIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    
  }
  
  
  changeVisibleView(isChangge) {
    this.props.dispatch({
      type: 'ancillary/changeVisibleView',
      payload: isChangge
    })
  }
  
  
  //修改title
  changeTitle(title) {
    this.props.dispatch({
      type: 'ancillary/changeTitle',
      payload: title
    })
  }
  
  
  saveInfo = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { attributeDetail, dispatch } = this.props;
        const { name, id, data } = attributeDetail;
        let dataInfo = []
        data.map((v, k) => {
          v.id ?
            dataInfo.push({ name: v.attributeName, id: v.id }) :
            dataInfo.push({ name: v.attributeName })
        })
        let postInfo = { data: dataInfo, id, attributeName: name }
        dispatch({
          type: 'ancillary/addAttributes',
          payload: postInfo
        })
      }
    });
  }
  
  changeDisabled(isDisabled) {
    this.props.dispatch({
      type: 'ancillary/changeDisabled',
      payload: isDisabled
    })
  }
  
  addValue() {
    this.props.dispatch({
      type: 'ancillary/addAttribute'
    })
  }
  
  delValue(key) {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'ancillary/delAttribute',
      payload: key
    })
  }
  
  changeName = (e) => {
    this.props.dispatch({
      type: 'ancillary/changeAttributeName',
      payload: e.target.value
    })
  }
  
  changeValue = (key, e) => {
    this.props.dispatch({
      type: 'ancillary/changeAttributeValue',
      payload: {
        key,
        value: e.target.value
      }
    })
  }
  
  getStockDetailById(id) {
    this.props.dispatch({
      type: 'ancillary/getAttributeDetailById',
      payload: { dataId:id }
    })
    
  }
  
  
  render() {
    const { visibleView, title, form, isDisabled } = this.props;
    const { getFieldDecorator } = form;
    let name = this.props.attributeDetail && this.props.attributeDetail.name
    let data = this.props.attributeDetail && this.props.attributeDetail.data
    let id = this.props.attributeDetail && this.props.attributeDetail.id
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Modal
        width={1000}
        title={`辅助属性-${title}`}
        visible={visibleView}
        footer={null}
        onCancel={() => {
          this.props.form.resetFields();
          this.changeVisibleView(false);
          this.changeDisabled(true);
          this.changeTitle('查看');
        }}
      
      >
        <Form className="changeInput" onSubmit={this.saveInfo.bind(this)}>
          <Row>
            <Col span={10}>
              <FormItem label='辅助属性' {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请填写辅助属性！' }],
                  initialValue: name
                })(
                  <Input disabled={isDisabled} onChange={this.changeName}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row >
            {
              data && data.map((v, k) => {
                return (
                  <Col key={k} span={10}>
                    <FormItem label='属性值' {...formItemLayout} >
                      {getFieldDecorator(`attributeName-${k}`, {
                        rules: [{ required: true, message: '请填写属性值！' }],
                        initialValue: v.attributeName
                      })(
                        <Input className='noHight' disabled={isDisabled} onChange={this.changeValue.bind(this, k)}/>
                      )}
                      {
                        !isDisabled && <Icon
                          onClick={() => this.delValue(k)}
                          className="dynamic-delete-button"
                          type="minus-circle-o"
                        />
                      }
                    
                    </FormItem>
                  </Col>
                )
              })
            }
          </Row>
          <Row>{
            isDisabled ?
              <Col span={24} style={{ 'textAlign': 'center' }}>
                <Button className='one-button'
                        onClick={
                          () => {
                            this.changeTitle('编辑');
                            this.changeDisabled(false)
                          }
                        }>
                  编辑</Button>
              </Col> :
              <Col span={24} style={{ 'textAlign': 'center' }}>
                <FormItem>
                  <Button className='one-button' style={{ 'marginRight': '30px' }} onClick={this.addValue.bind(this)}>添加</Button>
                  <Button className='button-group-2' htmlType="submit" style={{ 'marginRight': '30px' }}>保存</Button>
                  <Button className='button-group-1' onClick={() => {
                    this.getStockDetailById(id)
                    this.props.form.resetFields();
                    this.changeDisabled(true);
                    this.changeTitle('查看');
                  }}>取消</Button>
                </FormItem>
              </Col>
          }
          
          
          </Row>
        
        </Form>
      
      
      </Modal>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    ...state.ancillary
  };
}

export default connect(mapStateToProps)(ancillaryIndex);
