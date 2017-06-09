import React from 'react';
import {connect} from 'dva';
import './system.scss';
import { Card,Input,Button,Form } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class editGroupData extends React.Component {

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

    add () {
      const { form } = this.props;
      if (this.editItem!== null && this.editItem.dictionarySideDOs.length>0) {
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const newKey = keys[keys.length -1]+1;

        const nextKeys = keys.concat(newKey);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
      }
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
          // 冒泡排序
          names.bubbleSortByKey( "inx");
          // 对数据进行整合
          names.map((record, index)=>{
            let name = record;
            const index1= index;
            // 编辑旧选项更改附带Id
            this.editItem.dictionarySideDOs.map((record,index)=>{
              const index2= index;
              let side = record;
              if (index1 === index2) {
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
            type: 'save/editData',
            payload: { id: this.editItem.id, name: values.name, abName:values.abName, description: values.description, dictionarySideDOs: names, deldictionarySideDOs: delIds  }
          })
        }
      })
    }

    render() {

      const { editData } = this.props;

      if ( editData !== null) {
        this.editItem = editData;
      }

      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20},
      };


      let rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start)
      let name="";
      let description="";
      let arr = [];
      let abName =''
      let initKeys  = [];
      if( this.editItem !== null ){
        arr = this.editItem.dictionarySideDOs;
        name = this.editItem.name;
        abName = this.editItem.abName;
        description = this.editItem.description;
        initKeys = rangeArray(1,arr.length)
      }

      const { getFieldDecorator, getFieldValue } = this.props.form;
      getFieldDecorator('keys', { initialValue: initKeys });

      const keys = getFieldValue('keys');
      const edit = !this.props.permissionAlias.contains('GROUP_CHAR_EDIT');
      const formItems = keys.map((k,index) => {
        const initValue = arr[k-1] ? arr[k-1].name : ""
        return (
          <FormItem
            key={ k }
          >
            <h4 className = "label" >{ `选项${String(index+1)}` }</h4>
            <div className="posi childCen " style={{position:'relative',overflow:'hidden'}}>
              { getFieldDecorator(`names-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, message: '选项不能为空,限50字！', max: 50 }],
                initialValue: initValue,
              })(
                <Input rows = {6} className = "input2"/>
              )}
            </div>
            {
              index >=2?(<span className = "editable-add-btn delBtn" onClick={ () => this.remove(k) } > 删除 </span>):null
            }
          </FormItem>
        );
      });
      const dataId = GetQueryString("dataId");

      return (
        <div className="xuanxiang container2">
          <Card title = "字段信息:" >
              <Form layout={ 'horizontal' }>
              <FormItem {...formItemLayout} className="parentCen" label="字段名称">
              {getFieldDecorator('name', {
                initialValue:`${name}`,
                    rules: [{ required: true, message: '字段名称为必填项！' }],
                })(  <Input disabled={true} className="input" placeholder="input placeholder" />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} className = "div parentCen" label="字段描述">
                {getFieldDecorator('description', {
                  initialValue:`${description}`,
                  rules: [{ required: true, message: '字段描述为必填项！' }],
              })(
                    <Input disabled={true} className="input" />
                )}
                </FormItem>
                <FormItem {...formItemLayout} className = "div parentCen" label="别名">
                  {getFieldDecorator('abName', {
                    initialValue:`${abName}`,
                    rules: [{ required: true, message: '字段描述为必填项！' }],
                  })(
                    <Input disabled={true} className="input" />
                  )}
                </FormItem>
              </Form>
          </Card>
          <Card title = "下拉选项:">
          <Form>
               { formItems }
               <Button className = "editable-add-btn add" onClick = { this.add.bind(this) }> 添加 </Button>
          </Form>
          </Card >
          <div className="retuSave">
              <Link  to={{pathname:'/system/group-char/detail',query:{ dataId }}}>
                  <Button className = "editable-add-btn return"> 返回 </Button>
              </Link>
              <Button disabled={edit} className = "editable-add-btn SaveBtn" onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
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

  const { editData } = state.save;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.save,
    editData,
    permissionAlias
  };
}
export default connect(mapStateToProps)(editGroupData);
