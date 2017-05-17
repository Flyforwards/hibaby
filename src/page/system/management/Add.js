
import React from 'react';
import {connect} from 'dva';
import './system.scss';
import {Card,Input,Button,Form} from 'antd';
import {Link} from 'react-router';
import {routerReducer} from 'react-router-redux';
const FormItem = Form.Item;
const createForm = Form.create



@createForm()
class AddGroupChar extends React.Component {
    constructor(props) {
        super(props);
        this.uuid = 1;
    }

    remove = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    }

    add = () => {
      this.uuid++;
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(this.uuid);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    }

    // 冒泡排序 // 由小到大
    bubbleSort =  function(array) {
      var i = 0,
        len = array.length,
        j, d;
        for (; i < len; i++) {
          for (j = 0; j < len; j++) {
            if (array[i].serialNumber < array[j].serialNumber) {
              d = array[j];
              array[j] = array[i];
              array[i] = d;
            }
          }
        }
      return array;
    }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          let names = [];
          // 取出数据
          Object.keys(values).map((key, index) => {
            if (key.indexOf("names-") == 0) {
              const strs = key.split('-');
              if ( strs.length >= 2 ) {
                const serialNumber = parseInt(strs[1])
                names.push({ name: values[key], serialNumber })
              }
            }
          });
          names = this.bubbleSort(names);
          // 对数据进行整合
          names.map((record, index)=>{
            record.serialNumber = index+1;
          })
          // 集团字段为1 地方字段为2
          this.props.dispatch({
            type: 'save/saveData',
            payload: { name: values.name, type: 1, description: values.description, dictionarySideDOs: names }
          })
        }
      })
    }

    render() {

      const { getFieldDecorator, getFieldValue } = this.props.form;
      getFieldDecorator('keys', { initialValue: [0, 1] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => {
        return (
            <FormItem
              lassName = "div2"
              key={ k }
            >
              <p className = "label">{ `选项${String(index+1)}` }</p>
              <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                {getFieldDecorator(`names-${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{ required: true, message: '选项不能为空' }],
                })(
                  <Input rows = {6} className = "input2"/>
                )}
              </div>
              {
                index >=2?(<span className = "editable-add-btn" onClick={ () => this.remove(k) } > 删除 </span>):null
              }
            </FormItem>
        );
      });

      return (
        <div className="xuanxiang container2">
            <Card title = "字段信息:" >
                <Form >
                    <FormItem className = "div">
                    {getFieldDecorator('name', {rules: [{ required: true, message: '字段名称为必填项！' }],
                  })(<div>
                        <p className ="label" > 字段名称 </p>
                        <Input className="input"/>
                      </div>
                    )}
                  </FormItem>
                    <FormItem className = "div">
                    {getFieldDecorator('description', {rules: [{ required: true, message: '字段描述为必填项！' }],
                  })(<div>
                        <p className = "label"> 字段描述 </p>
                        <Input className="input"/>
                      </div>
                    )}
                    </FormItem>
                </Form>
            </Card>
            <Card title = "下拉选项:" >
            <Form>
                 { formItems }
                 <Button className = "editable-add-btn add" onClick = { this.add.bind(this) }> 添加 </Button>
            </Form>
            </Card >
            <div className="retuSave">
              <Link to='/system/groupchar'>
                <Button className = "editable-add-btn return"> 返回 </Button>
              </Link>
                <Button className = "editable-add-btn" onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
            </div>
      </div>
      )
    }
}

function mapStateToProps(state) {
    const {
      data,
    } = state.save;
    return {
      loading: state.loading.models.save,
      data,
    };
}
export default connect(mapStateToProps)(AddGroupChar);
