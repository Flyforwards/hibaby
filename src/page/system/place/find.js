import React from 'react';
import {connect} from 'dva';
import './place.scss';
import {Card,Input,Button,Form} from 'antd';
import { browserHistory } from 'dva/router';
import {Link} from 'react-router';

const FormItem = Form.Item;
const createForm = Form.create();
var Nzh = require("nzh");

@createForm
class FindPlaceData extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
      handleChange(e) {
         const myid=GetQueryString("id");
         const item=this.props.data ;
         const value=e.target.value;
         const name=item.map(res=>{
             if(res.id=myid){
               return(res.name)
             }
         })
         this.setState({
            name:""
         })
     }
    render() {
      const { getFieldDecorator } = this.props.form;
      const item = this.props.data ? this.props.data : {};
      let {name='', description='',abName=''} = item;
      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
      };
      let arr = [];
      const editid=GetQueryString("dataId");
      let fields=[];
      if (item.dictionarySideDOs && item.dictionarySideDOs.length >= 0) {
        arr = item.dictionarySideDOs;

        fields = arr.map((value, index) => {
          return (
            <FormItem {...formItemLayout} label={`选项 ${index+1}`} key={index}>
              {getFieldDecorator(`field-${index}`,{
                initialValue: value.name
              })(
                <Input readOnly={true} />
              )}
            </FormItem>
            )
        })

      };
      const edit = !this.props.permissionAlias.contains('LOCAL_CHAR_EDIT');
      return (
          <div className="xuanxiang PlaceProject">
              <Card title = "字段信息:" >
                <FormItem {...formItemLayout}  label='字段名称'>
                  {getFieldDecorator('name',{
                    initialValue: name,
                  })(
                    <Input readOnly={true} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='字段描述'>
                  {getFieldDecorator('description',{
                    initialValue: description,
                  })(
                    <Input readOnly={true} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label='别名'>
                  {getFieldDecorator('abName',{
                    initialValue: abName,
                  })(
                    <Input readOnly={true} />
                  )}
                </FormItem>
              </Card>
              <Card title = "下拉选项:" >
                {fields.length > 0 ? fields : <p style={{textAlign: 'center', color: '#999'}}>无该地方中心字典数据，点击编辑按钮进行添加</p>}
              </Card >
              <div className="retuSave">
                  <Link to='/system/local-char'>
                    <Button className = "editable-add-btn return"> 返回 </Button>
                  </Link>
                  <Link to={{pathname:'/system/local-char/edit',query:{ dataId:`${editid}`}}}>
                      <Button disabled={edit} className = "editable-add-btn SaveBtn"> 编辑 </Button>
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
    item: data
  } = state.localData;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.localData,
    data,
    permissionAlias
  };
}
export default connect(mapStateToProps)(FindPlaceData);
