import React from 'react';
import styles from './system.scss';
import {
  Form,
  Card,
  Input,
  Button
} from 'antd';
import map from 'lodash/fp/map';
import { browserHistory } from 'dva/router';

const FormItem = Form.Item;

const idx = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六']

class NormalMessageForm extends React.Component {
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          <p className={styles.label}>字段名称</p>
          {getFieldDecorator('FieldName', {
            initialValue: this.props.operatorName
          })(
            <Input type="textarea" disabled={this.props.disabled} className={styles.input} />
          )}
        </FormItem>
        <FormItem>
          <p className={styles.label}>字段描述</p>
          {getFieldDecorator('FieldDesp', {

            initialValue: this.props.description
          })(
            <Input type="textarea"  disabled={this.props.disabled} className={styles.input} autosize={{ minRows: 2 }}/>
          )}
        </FormItem>

      </Form>
    );
  }
}

const WrappedNormalMessageForm = Form.create()(NormalMessageForm);



class NormalOptionForm extends React.Component {
  
  render() {
   const { getFieldDecorator } = this.props.form;
    let All=[]
    console.log(this.props.AllOption)
     { this.props.AllOption ?
              (this.props.AllOption.map((field, index) => {
                All.push(
            
            <FormItem  key={index} className={styles.div2}>
                  <p className={styles.label}>选项{idx[index]}</p>
                  <div className={styles.posi} style={{position:'relative',overflow:'hidden'}}>
                  {getFieldDecorator('FieldOption', {
                    initialValue: field.name
                  })(
                    <Input type="textarea" disabled={this.props.disabled}  rows={6} className={styles.input2} data-index={index}/>
                  )}
                  < span  className = "editable-add-btn" onClick={this.props.delete} data-index={this.props.index}> 删除 < /span>
                  </div>
                   </FormItem>
                )
              })) : 'null' }

 

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      {All}
        
      </Form>
    );
  }
}

const WrappedNormalOptionForm = Form.create()(NormalOptionForm);


class ViewIndex extends React.Component {
	constructor(props){
		super(props);
  
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);

          this.state={
          display:'none',
           disabled:true,
           AllOption: this.props.arr?this.props.arr:[<p>aa</p>,<p>bbbbb</p>], 
           edit:'visible',
           save:'hidden',

          }

	}
  // shouldComponentUpdate(){
  //   this.setState({
  //     AllOption: this.props.arr
  //   })
  // }
	componentDidMount(){

		console.log(this.props.list? this.props.list : '')
    console.log(this.props.arr ? this.props.arr : 'sdsdfdsfa')
	}
  handleReturn(){
      browserHistory.go(-1)
  }
  add(){
       
        var AllOption=this.state.AllOption;
        // console.log(this.state.AllOption.length)
 
        // AllOption.push(<List  key={this.state.AllOption.length} index={this.state.AllOption.length} delete={this.delete}  trans={this.handelTrans} idnum={this.state.bigNum}/> );
        // console.log(this.state.AllOption.length)
        // this.setState({AllOption:AllOption})

        let data_tpl = this.props.arr[0];
        data_tpl.name = 'aaaaaaaaa';
        AllOption.push({data_tpl})
        console.log(AllOption)
        this.setState({AllOption:AllOption})
        
 
    }
    delete(e){
 
        var index=e.target.getAttribute("data-index");
 
        var AllOption=this.state.AllOption;
 
        AllOption.splice(index,1);
 
        this.setState({AllOption:AllOption})
 
    }
handleEdit = (e) => {

       
         this.setState({
            display:'block',
            edit:'hidden',
            save:'visible'
          })
        }
      handleSave = (e) => {

        e.preventDefault();

       console.log(this.refs.title)

        this.props.dispatch({
          type: 'system/add',
          payload: {

            "description": this.refs.description.props.value,
            "dictionarySideDOs": [{
              
              "name": 'this is side name',
              "serialNumber": 0
            }],
            
            "name": this.refs.title.props.value,
            "type": 1

          }
        })
      }
  render () { 
   console.log(this.state.AllOption)

    return(
      <div className={styles.container} className = "xuanxiang">
      
        <Card title="字段信息:"  >
           <div className={styles.div} >
   			      <WrappedNormalMessageForm   disabled={this.state.disabled} operatorName={this.props.list.operatorName}   description={this.props.list.description}/>
   			   </div>
   			
 		 </Card>
		
 		  <Card title="下拉选项:"  >
          <WrappedNormalOptionForm  AllOption={this.state.AllOption} delete={this.delete} />

          < Button  style = {{

          display:this.state.display,
          backgroundColor: 'rgba(22, 155, 213, 1)',
          color: '#fff',
          marginLeft: '90px'
        }}
      className = "editable-add-btn"
      onClick = {
        this.add
      } > 添加 < /Button> 
   		
 		 </Card>
     <div style={{width:'300px',float:'right'}}>
     < Button style = {
        {
          backgroundColor: 'rgb(22, 155, 213)',
          color: '#fff',
          width: '140px',
          
        }
      }
      className = "editable-add-btn"
      onClick = { this.handleReturn}>返回 < /Button>

       < Button style = { {
      visibility:this.state.edit,
      backgroundColor: 'rgb(22, 155, 213)',
      color: '#fff',
      width: '140px',}} className = "editable-add-btn"
       onClick = {this.handleEdit} >编辑 < /Button>
      

       < Button style = { {
      visibility:this.state.save,
      backgroundColor: 'rgb(22, 155, 213)',
      color: '#fff',
      width: '140px',}} className = "editable-add-btn"
       onClick = {this.handleSave} >保存 < /Button>
 </div> </div>
    )
  }
}
export default ViewIndex;