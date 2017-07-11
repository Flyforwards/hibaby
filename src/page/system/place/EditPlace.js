import React from 'react';
import {connect} from 'dva';
import './place.scss';
import {Card,Input,Button,Form} from 'antd';
import {Link} from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class EditPlaceData extends React.Component {

    constructor(props) {
        super(props);
        this.editItem = null;

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
      const { form } = this.props;

        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        let newKey = 1;
        if (keys.length > 0) {
          newKey = keys[keys.length -1]+1;
        }


        const nextKeys = keys.concat(newKey);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });

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
                const inx = parseInt(strs[1])
                names.push({ name: values[key], inx })
              }
            }
          });
          names.bubbleSortByKey( "inx");
          // 对数据进行整合
          names.map((record, index)=>{
            let name = record;
            const index1 = index;
            // 旧选项更改附带Id
            this.editItem.dictionarySideDOs.map((record,index)=>{
              const index2 = index;
              let side = record;
              if (index2 == index1) {
                name.id = side.id;
              }}
            )
          })

          let ids = this.editItem.dictionarySideDOs.map((record)=>record.id);
          names.map((record)=>{
            if (record.id) {
              ids.remove(record.id);
            }
          })

          const delIds = ids.map((record)=>{ return { id: record }});
          // 集团字段为1 地方字段为2
          this.props.dispatch({
            type: 'localData/EditPlaceData',
            payload: { id: this.editItem.id, name: values.name,abName: values.abName, type: 2, description: values.description, dictionarySideDOs: names, deldictionarySideDOs: delIds }
          })
        }
      })
    }

    render() {
      const { editData } = this.props;

      if (editData !== null) {
        this.editItem = editData;
      }

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };
      let rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start)
      let name="";
      let description="";
      let arr = [];
      let abName = '';
      let initKeys  = [];
      if( this.editItem !== null ){
        arr = this.editItem.dictionarySideDOs;
        name = this.editItem.name;
        description = this.editItem.description;
        abName = this.editItem.abName;
        initKeys = rangeArray(1, arr.length)
      }


      const { getFieldDecorator, getFieldValue } = this.props.form;
      getFieldDecorator('keys', { initialValue: initKeys });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => {
        const initValue = arr[k-1] ? arr[k-1].name : ""
        return (
          <div key={ k } style={{ position: 'relative' }}>
            <FormItem
              key={ k }
              {...formItemLayout} label={ `选项${String(index+1)}` }
            >
              { getFieldDecorator(`names-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, message: '选项不能为空,限50字！', max: 50 }],
                initialValue: initValue,
              })(
                <Input rows = {6}/>
              )}
            </FormItem>
            {
              index >=2?(<Button className = "button-group-2 delete-btn" onClick={ () => this.remove(k) } > 删除 </Button>):null
            }
          </div>
        );
      });
      const dataId = GetQueryString("dataId");
      const edit = !this.props.permissionAlias.contains('LOCAL_CHAR_EDIT');
      return (
        <div className="place-cent">
          <Card title = "字段信息:" >
            <Form>
              <FormItem {...formItemLayout} label="字段名称">
                {getFieldDecorator('name', {
                  initialValue:`${name}`,
                  rules: [{ required: true, message: '字段名称为必填项！' }],
                })(  <Input readOnly={true} />
                )}
              </FormItem>
              <FormItem {...formItemLayout}  label="字段描述">
                {getFieldDecorator('description', {
                  initialValue:`${description}`,
                  rules: [{ required: true, message: '字段描述为必填项！' }],
                })(
                  <Input readOnly={true} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="别名">
                {getFieldDecorator('abName', {
                  initialValue:`${abName}`,
                  rules: [{ required: true, message: '别名为必填项！' }],
                })(
                  <Input readOnly={true} className="input"/>
                )}
              </FormItem>
            </Form>
          </Card>
          <Card title = "下拉选项:" style={{ marginTop:'10px' }}>
            <Form>
              { formItems }
              <div>
                <Button className = "two-button editable-add-btn" onClick = { this.add.bind(this) }> 添加 </Button>
              </div>
            </Form>
          </Card >
          <div className="button-group-bottom">
            <Button disabled={edit} style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-2"onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
            <Link to={{pathname:'/system/local-char/detail',query:{ dataId }}}>
              <Button style={{ float:'right',marginRight: '10px' }} className = "button-group-bottom-2"> 返回 </Button>
            </Link>
          </div>
        </div>
      )
    }
}

function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}


function mapStateToProps(state) {
  const {
    editData,
  } = state.localData;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.localData,
    editData,
    permissionAlias
  };
}
export default connect(mapStateToProps)(EditPlaceData);
