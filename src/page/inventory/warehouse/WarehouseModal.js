/**
 * Created by Flyforwards on 2017/12/7.
 */
import React,{ Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col,Table,Popconfirm,Select,Modal } from 'antd';
import { Link,routerRedux } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create
import moment from 'moment'
const Option = Select.Option;
import './inventoryIndex.scss'
import { format,queryURL } from '../../../utils/index.js';

@createForm()
class WarehouseEdit extends Component {
  constructor(props){
    super(props);
    this.state={
      edit:true,

    }

  }
/*
* type:1、look 2 、edit,3 save
* */
  /*返回*/
  onBack(){
    this.props.dispatch(
      routerRedux.push({
        pathname:'/inventory/warehouse'
      })
    )
  }
  /*编辑*/
  onEdit(id){
    this.props.dispatch({
      type:'inventory/getWarehouseDetailById',
      payload:{
        "id":id,
        "type":2
      }
    })
    this.props.dispatch({
      type:"inventory/changeTitle",
      payload:"编辑",
    })
  }

  /*保存*/
  onSave(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { id } = this.props.detailData ? this.props.detailData:'';
        if(id){
          values.id = id;
        }
        this.props.dispatch({
          type: 'inventory/saveWarehouse',
          payload: values
        })
      }
    })
  }

  //点击取消
  onCancel(){
    this.props.dispatch({ type: 'inventory/removeData'})
  }

  /*改变状态*/
  handleChange(){

  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'inventory/removeData' })
  }
  render(){
    const { detailData,visible,editShow,isDisabled,title} = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        span:6
      },
      wrapperCol: {
        span:16
      },
    }
    const formItemLayouts = {
      labelCol: {
        span:2
      },
      wrapperCol: {
        span:21
      },
    }
    return (
      <Modal
        title={`仓库管理-${title}`}
        visible={visible}
        width="800px"
        closable={false}
        key={visible}
        footer={[
          <Button key="cancelBtn" className='button-group-bottom-1' onClick={this.onCancel.bind(this)}>取消</Button>,
          editShow == true ? <Button key="onSave" className='button-group-bottom-2' onClick={this.onSave.bind(this)}> 保存</Button>:'',
          editShow == true ? '':<Button key="onEdit" className='button-group-bottom-3' onClick={this.onEdit.bind(this,detailData ? detailData.id:'')}> 编辑</Button>
        ]}
      >
        <div className="inventoryIndex">
          <Card>
            <Row>
              <Form >
                <Col span={12} >
                  <FormItem {...formItemLayout} label="仓库名字" style={{textAlign:'center'}} >
                    {getFieldDecorator('warehouseName', {
                      initialValue:detailData ? detailData.warehouseName:'',
                      rules: [{ required: true, message: '请填写仓库名字' }],
                    })(
                      <Input placeholder="请输入仓库名字" disabled={isDisabled} />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="所属机构" style={{textAlign:'center'}}>
                    {getFieldDecorator('belongOrganization', {
                      initialValue: detailData ? detailData.belongOrganization:'',
                      rules: [{ required: false, message: '请填写仓库所属机构' }],
                    })(
                      <Input placeholder="请输入所属机构" disabled={true}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="管理人" style={{textAlign:'center'}} >
                    {getFieldDecorator('managerName', {
                      initialValue: detailData ? detailData.managerName:'',
                      rules: [{ required: true, message: '请填写仓库管理人' }],
                    })(
                      <Input placeholder="请输入仓库管理人" disabled={isDisabled}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="联系电话" style={{textAlign:'center'}} >
                    {getFieldDecorator('mobile', {
                      initialValue: detailData ? detailData.mobile:'',
                      rules: [{ required: true, message: '请填写仓库联系电话' }],
                    })(
                      <Input placeholder="请输入仓库联系电话" disabled={isDisabled}/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="仓库状态" style={{textAlign:'center'}} >
                    {getFieldDecorator('status', {
                      initialValue: detailData ? detailData.status+'':'',
                      rules: [{ required: true, message: '请选择仓库状态' }],
                    })(
                      <Select
                        placeholder="请选择仓库状态"
                        onChange={this.handleChange.bind(this)}
                        disabled={isDisabled}
                      >
                        <Option value="0">正常</Option>
                        <Option value="1">停用</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem {...formItemLayouts} label="备注"  style={{textAlign:'center'}} >
                    {getFieldDecorator('remarks', {
                      initialValue: detailData ? detailData.remarks:'',
                      rules: [{ required: false, message: '' }],
                    })(
                      <Input type="textarea" disabled={isDisabled} rows={4}/>
                    )}
                  </FormItem>
                </Col>
              </Form>
            </Row>
          </Card>
        </div>

      </Modal>

    )
  }

}

function mapStateToProps(state) {
  const {detailData ,visible,editShow,isDisabled,title} = state.inventory;
  return{
    loading: state.loading.models.inventory,
    detailData,
    visible,
    editShow,
    isDisabled,
    title
  };
}

export default connect(mapStateToProps)(WarehouseEdit);


