/**
 * 菜品库（创建+修改）表单/详情页面
 * Created by yangjingjing on 2017/6/16.
 */
import React from 'react'
import {connect} from 'dva'
import "./DishesLeft.scss"
import {message,Modal,Form,Input} from 'antd';
import {routerRedux} from 'dva/router'
import {local, session} from 'common/util/storage.js';

const FormItem = Form.Item;
const createForm = Form.create
@createForm()
class DishesLibraryFormOrDetailModal extends React.Component{
  constructor(props){
    super(props);
  }


  handleCancel(){
    this.props.handleCancel();
  }


  render(){
    const {getFieldDecorator} = this.props.form;
    const {nodeFormOrDetailModalVisible,nodeFormOrDetailModalTitle,initialValue,isNodeDetail,isNodeEdit} = this.props;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }
    const idInput = isNodeDetail || isNodeEdit ?
      <FormItem label="ID"  {...formItemLayout}>
        {getFieldDecorator('id', {
          initialValue: (initialValue==null ? '' : initialValue.id)
        })(
          <Input disabled={true} style={{height:33}} />
        )}
      </FormItem> : null;
    return (
      <Modal
        key={nodeFormOrDetailModalVisible}
        visible={nodeFormOrDetailModalVisible}
        title={nodeFormOrDetailModalTitle}
        okText="确定"
        cancelText="取消"
        onCancel={this.handleCancel.bind(this)}
        // onOk={}
      >
        <Form layout='horizontal'>
          {idInput}
          <FormItem label="食材名称"  {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: (initialValue==null ? '' : initialValue.name),
              rules: [
                {
                  required: true,
                  message: '食材名称不能为空'
                }
              ],
            })(
              <Input disabled={isNodeDetail} style={{height:33}}  />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }

}

function mapStateToProps(state) {
  return {
    dishes: state.dishes
  };
}
export default connect(mapStateToProps)(DishesLibraryFormOrDetailModal);
