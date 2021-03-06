/**
 * Created by wang on 2017/6/6.
 */

import React from 'react';
import {connect} from 'dva';
import './CustomerVisIndex.scss';
import { Card, Input, Button, Form,Select, Row, DatePicker, Col, Modal } from 'antd';
import DictionarySelect from 'common/dictionary_select';
import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option
import { VISIT_TIME } from 'common/constants.js'
import {local, session} from 'common/util/storage.js';
import moment from 'moment'
const confirm = Modal.confirm;
import PermissionButton from 'common/PermissionButton';

@createForm()
class CustomerVisAddIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  delete(){
    const { dispatch, item } = this.props;
    confirm({
      title: '提示',
      content: '是否确定删除此参观信息？',
      onOk() {
        dispatch({
          type: 'customerVis/deleteCustomerVis',
          payload: { dataId: item.id }
        })
      },
      onCancel() {
      },
    });



  }

  render() {
    const { form, item } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 3 },
      wrapperCol:{ span:20 }
    }

    return (
      <div className="customer-vis-cent">
        <div>
          <Card  title = "参观信息:">
            <Form >
              <FormItem {...formItemLayout} label="客户名称" >
                {getFieldDecorator('name', { initialValue: item.name,
                })(
                  <Input readOnly/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={ "参观日期"}>
                {getFieldDecorator('visitDate', { initialValue: moment(item.visitDate).format('YYYY-MM-DD'),
                })(
                  <Input readOnly/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ "参观时段"}>
                {getFieldDecorator('visitTimeId', {initialValue: VISIT_TIME[item.visitTimeId-1],
                })(
                  <Input readOnly/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"操作人"}>
                {getFieldDecorator('operatorName', { initialValue: item.operatorName,
                })(<Input readOnly className="input" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"预约备注"}>
                {getFieldDecorator('remarks', { initialValue: item.remarks,
                })(
                  <Input type="textarea" rows={6} className="input"/>
                )}
              </FormItem>
            </Form>
          </Card>
          <div className="button-group-bottom-common">
              <Link to='/crm/customer-vis'>
                <Button className="button-group-bottom-1"> 返回 </Button>
              </Link>
              <PermissionButton testKey='CUSTOMERVIS_DELETE' className="button-group-bottom-2" onClick={ this.delete.bind(this) }> 删除 </PermissionButton>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {
    item
  } = state.customerVis;
  return {
    loading: state.loading,
    item
  };
}

export default connect(mapStateToProps)(CustomerVisAddIndex);
