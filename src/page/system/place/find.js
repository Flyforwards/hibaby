import React from 'react';
import {connect} from 'dva';
import './place.scss';
import {Card,Input,Button,Form} from 'antd';
import  {NUM_TO_TEXT}  from 'common/constants';
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
         console.log(value)
     }
    render() {
      const { getFieldDecorator } = this.props.form;
      const item = this.props.data ? this.props.data : {};
      let {name='', description='', arr=[]} = item;
      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      };
      const editid=GetQueryString("dataId");
      let fields=[];
      if (item.dictionarySideDOs && item.dictionarySideDOs.length >= 0) {
        arr = item.dictionarySideDOs;

        fields = arr.map((value, index) => {
          return (
            <FormItem {...formItemLayout} label={`选项 ${NUM_TO_TEXT[index]}`} key={index}>
              {getFieldDecorator(`field-${index}`,{
                initialValue: value.name
              })(
                <Input disabled={true} />
              )}
            </FormItem>
            )
        })

      };
        return (
            <div className="xuanxiang PlaceProject">
                <Card title = "字段信息:" >
                  <FormItem {...formItemLayout} label='字段名称'>
                    {getFieldDecorator('name',{
                      initialValue: name ? name : '',
                    })(
                      <Input disabled={true} />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label='字段描述'>
                    {getFieldDecorator('description',{
                      initialValue: description ? description : '',
                    })(
                      <Input disabled={true} />
                    )}
                  </FormItem>
                </Card>
                <Card title = "下拉选项:" >
                  {fields}
                </Card >
                <div className="retuSave">
                    <Link to='/system/local-char'>
                    <Button className = "editable-add-btn return"> 返回 </Button>
                    </Link>
                    <Link to={{pathname:'system/local-char/edit',query:{id:`${editid}`}}}>
                        <Button className = "editable-add-btn"> 编辑 </Button>
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

  return {
    loading: state.loading.models.localData,
    data
  };
}
export default connect(mapStateToProps)(FindPlaceData);
