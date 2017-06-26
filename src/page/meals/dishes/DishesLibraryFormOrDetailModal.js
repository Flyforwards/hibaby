/**
 * 菜品库（创建+修改）表单/详情页面
 * Created by yangjingjing on 2017/6/16.
 */
import React from 'react'
import {connect} from 'dva'
import {message,Modal,Form,Input,Button} from 'antd';
import {routerRedux} from 'dva/router'
import {local, session} from 'common/util/storage.js';
import DishesDetailPageCss from './DishesLibraryFormOrDetail.scss';

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

  handleOk(values){
    if(this.props.isNodeDetail){
      this.handleCancel();
      return;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleOk(values);
      }
    });
  }

  handleEdit(){
    this.props.handleEdit();
  }

  handleRemove(){
    this.props.handleRemove();
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.isNodeDetail){
      $(".DishesLibrary-Node .ant-modal-footer").hide();
    }else{
      $(".DishesLibrary-Node .ant-modal-footer").show();
    }
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



    const buttonsDiv = isNodeDetail ? (<div>
      <Button className='myBtn SaveBtn' onClick={this.handleEdit.bind(this)}>编辑</Button>
      <Button className='myBtn RemoveBtn' onClick={this.handleRemove.bind(this)}>删除</Button>
      <Button className='myBtn BackBtn' onClick={this.handleCancel.bind(this)}>返回</Button>
    </div>):null;

    return (
      <Modal
        className="DishesLibrary-Node"
        key={nodeFormOrDetailModalVisible}
        visible={nodeFormOrDetailModalVisible}
        title={nodeFormOrDetailModalTitle}
        okText="确定"
        cancelText="取消"
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleOk.bind(this)}
        width={ 600 }
      >
        <div>
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
        </div>
        {buttonsDiv}
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
