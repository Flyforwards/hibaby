import React from 'react';
import {connect} from 'dva';
import './system.scss';
import {Card,Input,Button} from 'antd';
var Nzh = require("nzh");
import { browserHistory } from 'dva/router';
import {Link} from 'react-router';
class CheckData extends React.Component {
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
      const item = this.props.data;
      let name = "";
      let description = "";
      let arr = [];
      let field=[];
      let field0="";
      let field1="";
      if (item !== null) {
        name = item.name;
        description = item.description;
        arr = item.dictionarySideDOs;
        console.log(arr);
        field=arr.map(res=>{
            return(res.name)
        });
        console.log(field)
        field0=field[0];
        field1=field[1];
      };
        return (
            <div className="xuanxiang container2">
                <Card title = "字段信息:" >
                    <div className = "div">
                      <p className ="label" > 字段名称 < /p>
                      <Input type = "textarea" className ="input" value={name} />
                    </div>
                    <div className = "div">
                      <p className = "label"> 字段描述 < /p>
                      <Input type = "textarea"  className = "input" value={ description }  autosize = {{minRows: 2}}/>
                    </div>
                </Card>
                <Card title = "下拉选项:" >
                    <div className = "div2">
                        <p className = "label" > 选项一 < /p>
                        <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                            <Input type = "textarea"  value={field0} rows = {6} className = "input2"/>
                        </div>
                      </div>
                      <div className = "div2">
                           <p className ="label"> 选项二 < /p>
                           <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                                <Input type = "textarea" rows = {6} value={field1}  className = "input2"/>
                           </div>
                      </div>
                </Card >
                <div className="retuSave">
                    <Link to='/system/groupchar'>
                    <Button className = "editable-add-btn return"> 返回 </Button>
                    </Link>
                    <Link to='/groupchar/edit'>
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



function check({dispatch,data:data,code}) {
    return (<div >
              <CheckData dispatch = {dispatch} data = {data}/>
            </div>
      )
  }

function mapStateToProps(state) {
  const {
    data
  } = state.save;

  return {
    loading: state.loading.models.save,
    data
  };
}
export default connect(mapStateToProps)(check);
