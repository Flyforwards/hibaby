import React from 'react';
import {
  connect
} from 'dva';
import './system.scss';
import {
  Card,
  Input,
  Button
} from 'antd';
var Nzh = require("nzh");
import { browserHistory } from 'dva/router';
class List extends React.Component {
 
    render() {
          console.log(this.props.index)
        return ( < div  className = "div2"
          
           > < p className = "label"
           data-index={this.props.index}>`选项${this.props.idnum}` < /p>
          <div className="posi" style={{position:'relative',overflow:'hidden'}}>
           < Input type = "textarea" 
          rows = {
            6
          }
          data-index={this.props.index}
          className = "input2"
            defaultValue={this.props.index}
          />< span 
      className = "editable-add-btn"
      
     onClick={this.props.delete} data-index={this.props.index}> 删除 < /span></div></div >
            )
 
    }
 
}

class AddData extends React.Component {
 
    constructor(props) {
 
        super(props);
 
        this.add=this.add.bind(this);
 
        this.delete=this.delete.bind(this);

        this.handelTrans=this.handelTrans.bind(this);

        
 
        this.state={
 
            lists: [( < div className = "div2"
          >
          < p className = "label" > 选项一 < /p>
          <div className="posi" style={{position:'relative',overflow:'hidden'}}>
           < Input ref="xuanname" type = "textarea"
          rows = {
            6
          }
          className = "
            input2
          "
          /> </div>< /div > ), (
           < div className = "
            div2
          "
           >
          < p className ="label"
            > 选项二 < /p>
          <div className="posi" style={{position:'relative',overflow:'hidden'}}> < Input type = "textarea"
          rows = {
            6
          }
          className = "input2"
          />
          </div>
          < /div >)],
          bigNum:''
 
        }
 
    }

   


    add(){
       
        var lists=this.state.lists;
 
        lists.push(<List data-key={this.state.lists.length} index={this.state.lists.length} delete={this.delete}  trans={this.handelTrans} idnum={this.state.bigNum}/> );
 
        this.setState({lists:lists})
 
    }
  
 handelTrans(e){
     var index=e.target.getAttribute("data-index");
 
       
        var nzhcn = Nzh.cn;
       

          var num=Number(index)
          var newnum=num+1
          console.log(newnum)
          
          this.setState({
            bigNum: nzhcn.encodeS(newnum)
          })
          
         

       
 }
    delete(e){
 
        var index=e.target.getAttribute("data-index");
 
        var lists=this.state.lists;
 
        
        lists.splice(index,1,'');
 
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
    render() {
 
        return (
        < div className="xuanxiang container">
     
      < Card title = "字段信息:" >
      < div className = "div">
      < p className ="label" > 字段名称 < /p> < Input ref="title" type = "textarea"
      className ="input"
      /> < /div > < div className = "div">
      < p className = "label"> 字段描述 < /p> < Input ref="description" type = "textarea"
      className = "input"
        
      autosize = {
        {
          minRows: 2
        }
      }
      /> < /div > < /Card>

      < Card title = "下拉选项:" >

      {
        this.state.lists
      } 
      < Button
      className = "editable-add-btn add"
      onClick = {
        this.add
      } > 添加 < /Button>  < /Card >
      <div className="retuSave">
       < Button 
      className = "editable-add-btn return"
      onClick = {
        this.handleReturn
      } > 返回 < /Button> < Button 
  className = "editable-add-btn"
  onClick={this.handleSave}> 保存 < /Button> 
  </div>
  </div>
  )
 
    }
 
}
 
function Add({
  dispatch
}) {
  return ( < div >
    < AddData dispatch = {
      dispatch
    }
    / > < /div >
  )

}

export default connect()(Add);