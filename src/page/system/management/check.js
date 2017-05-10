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
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.handelTrans=this.handelTrans.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
              lists: [
                      (<div className = "div2">
                          <p className = "label" > 选项一 < /p>
                          <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                              <Input ref="xuanname" type = "textarea" rows = {6} className = "input2"/>
                          </div>
                        </div> ),
                      (<div className = "div2">
                           <p className ="label"> 选项二 < /p>
                           <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                                <Input type = "textarea" rows = {6} className = "input2"/>
                           </div>
                      </div>)
                     ],
             bigNum:['三','四','五','六','七','八','九']
        }
    }
    add(state){
        var lists=this.state.lists;
        var len=this.state.lists.length-2;
        lists.push(<div className = "div2">
                       <p className = "label" data-index={this.state.lists.length+1}>选项{this.state.bigNum[len]} < /p>
                       <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                           <Input type = "textarea" rows = {6} data-index={this.state.lists.length}
                              className = "input2" defaultValue={this.state.lists.length}/>
                           <span className = "editable-add-btn" onClick={this.delete} data-index={this.state.lists.length}> 删除 </span>
                       </div>
                   </div >)
        this.setState({lists:lists})
    }
 handelTrans(e){
     var index=e.target.getAttribute("data-index");
        var nzhcn = Nzh.cn;
          var num=Number(index)
          var newnum=num+1
          this.setState({
            bigNum: nzhcn.encodeS(newnum)
          })
 }
    delete(e){
        var index=e.target.getAttribute("data-index");
        var lists=this.state.lists;
        lists.splice(index,1);
        this.setState({lists:lists})
    }
     handleReturn = () =>{
         browserhistory.go(-1)
     }

    handleSave = (e) => {
        e.preventDefault();
        console.log(this.refs.description.value)
        this.props.dispatch({
          type: 'system/add',
          payload: {

            "description": this.refs.description.props.value,
            "dictionarySideDOs": [{

              "name": this.refs.xuanname.props.value,
              "serialNumber": 0
            }],

            "name": this.refs.title.props.value,
            "type": 1

          }
        })
      }
      handleChange() {
         const myid=GetQueryString("id");
         const item=this.props.data
         const name=item.map(res=>{
             if(res.id=myid){
               return(res.name)
             }
         })
         this.setState({
            value: name
         })
         console.log(name)
     }

    render() {
      console.log(window.location)
      console.log(this.props.data)
      const url=window.location.href
      const myid=GetQueryString("id");
      console.log(myid)
      const item=this.props.data
      const itemId=item.map(res=>{
        if(res.id=myid){
          return(res)
        }
      })
        return (
            <div className="xuanxiang container2">
                <Card title = "字段信息:" >
                    <div className = "div">
                      <p className ="label" > 字段名称 < /p>
                      <Input ref="value" type = "textarea" className ="input" value={this.state.value}  onChange={this.handleChange}/>
                    </div>
                    <div className = "div">
                      <p className = "label"> 字段描述 < /p>
                      <Input ref="description" type = "textarea"  className = "input" autosize = {{minRows: 2}}/>
                    </div>
                </Card>
                <Card title = "下拉选项:" >
                    {this.state.lists}
                    <Button className = "editable-add-btn add" onClick = {this.add} > 添加 < /Button>
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
function GetProId () {

}


function check({dispatch,data:data,code}) {
    return (<div >
              <CheckData dispatch = {dispatch} data = {data}/>
            </div>
      )
  }

  function mapStateToProps(state) {
    console.log("modelss",state.system)
    const {
      data,
      code
    } = state.system;

    return {
      loading: state.loading.models.system,
      data,
      code
    };
  }
export default connect(mapStateToProps)(check);
