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
      console.log(this.props.arr)
       const { getFieldDecorator } = this.props.form;

        return (
          <div className="container">
            <ul className="list-group text-center">
              {
                Object.keys(this.props.option).map(function(key,index) {

                  return <li className="list-group-item list-group-item-info" key={index}>

                 <FormItem  className="div2">
                  <p className='label'>选项{idx[index]}</p>
                  <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                  {getFieldDecorator(`option${index}`, {
                    initialValue:`${this.props.option[key]}`
                  })(

                    <Input type="textarea" disabled={this.props.disabled} autosize={{minRows:2}} className="input2" style={{width:this.props.width}}/>

                  )}
                  <Button id="delbtn" className = "delBtn editable-add-btn" onClick={this.props.delete} style={{display:this.props.display}}  data-index={index}> 删除 </Button>
                  </div>


                   </FormItem>
                  </li>
                }.bind(this))
              }
            </ul>
           </div>
         );
       }
     }
const FruitListForm = Form.create()(FruitList);

class AddFruitForm extends React.Component{

     constructor (props) {

    super(props)


    }
      createFruit(e){
        e.preventDefault();
        //get the fruit object name from the form
        console.log('111111111'+this.refs.fruitName)
        var fruit = this.refs.fruitName.value;
        //if we have a value
        //call the addFruit method of the App component
        //to change the state of the fruit list by adding an new item

          this.props.addFruit(fruit);
          //reset the form
           console.log(this.refs.fruitForm.refs.fruitForm)



       }
       render () {
        return(
          <Form
            /*className="login-form" */
            className="form-inline" ref="fruitForm" >
          <div className="form-group">
            <span htmlFor="fruitItem">
          <p className='label'>添加选项</p>

              <input type="textarea" id="fruitItem" ref="fruitName" className="input3" />

            </span>
          </div>
          <Button style = {{

          display:this.props.display,
          backgroundColor: '#b67233',
          color: '#fff',
          marginLeft: '90px'
        }} className="addBtn btn-primary editable-add-btn" onClick={this.createFruit.bind(this)}>添加</Button>

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
          'fruit1' : 'orange',
          'fruit2' : 'apple'
        },
         width:'90%',
           edit:'visible',
           save:'hidden',

          }

	}
  addFruit (fruit) {
     //create a unike key for each new fruit item
     var timestamp = (new Date()).getTime();
     // update the state object
     this.state.fruits['fruit' + timestamp ] = fruit;
     // set the state
     this.setState({ fruits : this.state.fruits });

    }

  delFruit (e) {
console.log($('delbtn').parent())
 $('delbtn').parent().remove()
    }

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
            disabled:false,
            width:'84%',
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
    console.log(this.props.arr)


    return(
      <div className="container2 xuanxiang">

        <Card title="字段信息:"  >
           <div className="div" >
   			      <WrappedNormalMessageForm   disabled={this.state.disabled} operatorName={this.props.list.operatorName}   description={this.props.list.description}/>
   			   </div>

 		 </Card>

 		  <Card title="下拉选项:"  >
           <div className="component-wrapper">
          <FruitListForm fruits={this.state.fruits}  delete={this.delFruit.bind(this)}  disabled={this.state.disabled} display={this.state.display}  width={this.state.width} arr={this.props.arr}/>
          <AddFruitForm addFruit={this.addFruit.bind(this)} display={this.state.display}  disabled={this.state.disabled} arr={this.props.arr}/>
        </div>


 		 </Card>
     <div id="editSave">
     < Button
      className = "retBtn editable-add-btn"
      onClick = { this.handleReturn}>返回 </Button>

       < Button style = { {
      visibility:this.state.edit,
      backgroundColor: '#b67233',
      color: '#fff',
      width: '140px',}} className = "editable-add-btn"
       onClick = {this.handleEdit} >编辑 </Button>


       < Button style = { {
      visibility:this.state.save,
    }} className = "save editable-add-btn"
       onClick = {this.handleSave} >保存 </Button>
 </div> </div>
    )
  }
}
export default ViewIndex;
