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
            payload: { id: this.editItem.id, name: values.name, type: 2, description: values.description, dictionarySideDOs: names, deldictionarySideDOs: delIds }
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
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
      };
      let rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start)
      let name="";
      let description="";
      let arr = [];
      let initKeys  = [];
      if( this.editItem !== null ){
        arr = this.editItem.dictionarySideDOs;
        name = this.editItem.name;
        description = this.editItem.description;
        initKeys = rangeArray(1, arr.length)
      }


      const { getFieldDecorator, getFieldValue } = this.props.form;
      getFieldDecorator('keys', { initialValue: initKeys });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => {
        const initValue = arr[k-1] ? arr[k-1].name : ""
        return (
          <FormItem
            lassName = "div2"
            key={ k }
          >
            <p className = "label" >{ `选项${String(index+1)}` }</p>
            <div className="posi childCen" style={{position:'relative',overflow:'hidden'}}>
              { getFieldDecorator(`names-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, message: '选项不能为空' }],
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
        <div className="xuanxiang PlaceProject">
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
                  <Input disabled={true} className="input"/>
                )}
              </FormItem>
            </Form>
          </Card>
          <Card title = "下拉选项:" >
            <Form>
              { formItems }
              <Button className = "editable-add-btn add" onClick = {this.add.bind(this)}> 添加 </Button>
            </Form>
          </Card >
          <div className="retuSave">
            <Link to={{pathname:'/system/local-char/detail',query:{ dataId }}}>
              <Button className = "editable-add-btn return"> 返回 </Button>
            </Link>
            <Button className = "editable-add-btn" onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
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

  return {
    loading: state.loading.models.localData,
    editData
  };
}
export default connect(mapStateToProps)(EditPlaceData);
