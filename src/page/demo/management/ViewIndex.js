import React from 'react';
import './system.scss';
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
          <p className="label">字段名称</p>
          {getFieldDecorator('FieldName', {
            initialValue: this.props.operatorName
          })(
            <Input type="textarea" disabled={this.props.disabled} className="input" />
          )}
        </FormItem>
        <FormItem>
          <p className="label">字段描述</p>
          {getFieldDecorator('FieldDesp', {

            initialValue: this.props.description
          })(
            <Input type="textarea"  disabled={this.props.disabled} className="input"  autosize={{minRows:2}}/>
          )}
        </FormItem>

      </Form>
    );
  }
}

const WrappedNormalMessageForm = Form.create()(NormalMessageForm);




class FruitList extends React.Component{
      render () {
        return (
          <div className="container">
            <ul className="list-group text-center">
              {
                Object.keys(this.props.fruits).map(function(key) {
                  return <li className="list-group-item list-group-item-info" key={key}>{this.props.fruits[key]}</li>
                }.bind(this))
              }
            </ul>
           </div>
         );
       }
     }

class AddFruitForm extends React.Component{ 
     constructor (props) {
    super(props)
   
     
    }
      createFruit(e){
        e.preventDefault();
        //get the fruit object name from the form
        console.log(this.refs.fruitName)
        var fruit = this.refs.fruitName.value;
        //if we have a value
        //call the addFruit method of the App component
        //to change the state of the fruit list by adding an new item
        if(typeof fruit === 'string' && fruit.length > 0) {
          this.props.addFruit(fruit);
          //reset the form
          // this.refs.fruitForm.reset();
        }
       }
       render () {
        return(
      
    
      
          <Form className="form-inline" ref="fruitForm" onSubmit={this.createFruit.bind(this)}>
          <div className="form-group">
            <span htmlFor="fruitItem">
              Fruit Name
              <input type="text" id="fruitItem" placeholder="e.x.lemmon" ref="fruitName" className="form-control" />
            </span>
          </div>
          <button type="submit" className="btn btn-primary">Add Fruit</button>
         </Form>
       
    )
        
       }
      }
class ViewIndex extends React.Component {
	constructor(props){
		super(props);
  
      

          this.state={
          display:'none',
           disabled:true,
            fruits : {
          'fruit-1' : 'orange',
          'fruit-2' : 'apple'
        },
           edit:'visible',
           save:'hidden',

          }

	}
  addFruit (fruit) {
     //create a unike key for each new fruit item
     var timestamp = (new Date()).getTime();
     // update the state object
     this.state.fruits['fruit-' + timestamp ] = fruit;
     // set the state
     this.setState({ fruits : this.state.fruits });
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
    console.log(this.props.list)
    

    return(
      <div className="container2 xuanxiang">
      
        <Card title="字段信息:"  >
           <div className="div" >
   			      <WrappedNormalMessageForm   disabled={this.state.disabled} operatorName={this.props.list.operatorName}   description={this.props.list.description}/>
   			   </div>
   			
 		 </Card>
		
 		  <Card title="下拉选项:"  >
           <div className="component-wrapper">
          <FruitList fruits={this.state.fruits} />
          <AddFruitForm addFruit={this.addFruit.bind(this)} />
        </div>

          < Button  style = {{

          display:this.state.display,
          backgroundColor: 'rgba(22, 155, 213, 1)',
          color: '#fff',
          marginLeft: '90px'
        }}
      className = "editable-add-btn"
      > 添加 < /Button> 
   		
 		 </Card>
     <div id="editSave">
     < Button 
      className = "retBtn editable-add-btn"
      onClick = { this.handleReturn}>返回 < /Button>

       < Button style = { {
      visibility:this.state.edit,
      backgroundColor: 'rgb(22, 155, 213)',
      color: '#fff',
      width: '140px',}} className = "editable-add-btn"
       onClick = {this.handleEdit} >编辑 < /Button>
      

       < Button style = { {
      visibility:this.state.save,
    }} className = "save editable-add-btn"
       onClick = {this.handleSave} >保存 < /Button>
 </div> </div>
    )
  }
}
export default ViewIndex;