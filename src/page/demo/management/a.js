<!-- class NormalOptionForm extends React.Component {
  
  render() {
   const { getFieldDecorator } = this.props.form;
    let All=[]
    console.log(this.props.AllOption)
     { this.props.AllOption ?
              (this.props.AllOption.map((field, index) => {
                All.push(
            
            <FormItem  key={index} className="div2">
                  <p className='label'>选项{idx[index]}</p>
                  <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                  {getFieldDecorator(`option${index}`, {
                    initialValue: field.name
                  })(
                    <Input type="textarea" disabled={this.props.disabled}  rows={6} className="input2" data-index={index}/>
                  )}
                  < Button  className = "delBtn editable-add-btn" onClick={this.props.delete} data-index={index}> 删除 < /Button>
                  </div>
                   </FormItem>
                )
              })) : 'null' }

 
     console.log(All)
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.props.AllOption ? (this.props.AllOption.map((field, index) => {
              console.log(field)
           return  <FormItem  key={index} className="div2">
                  <p className='label'>选项{idx[index]}</p>
                  <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                  {getFieldDecorator(`option${index}`, {
                    initialValue: field.name
                  })(
                    <Input type="textarea" disabled={this.props.disabled}  rows={6} className="input2" data-index={index}/>
                  )}
                  < Button  className = "delBtn editable-add-btn" onClick={this.props.delete} data-index={index}> 删除 < /Button>
                  </div>
                   </FormItem>
                
              })) : null}
        
      </Form>
    );
  }
}

const WrappedNormalOptionForm = Form.create()(NormalOptionForm); -->
<div className="container">
            <ul className="list-group text-center">
              {
                Object.keys(this.props.fruits).map(function(key) {
                  return <li className="list-group-item list-group-item-info" key={key}>{this.props.fruits[key]}</li>
                }.bind(this))
              }
            </ul>
           </div>


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




          <FormItem  key={key} className="div2">
                  <p className='label'>选项{idx[key]}</p>
                  <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                  {getFieldDecorator(`option${key}`, {
                    initialValue: field.name
                  })(
                    <Input type="textarea" disabled={this.props.disabled}  rows={6} className="input2" data-index={key}/>
                  )}
                  
                  </div>
                   </FormItem>




                   <Form className="login-form"  className="form-inline" ref="fruitForm" onSubmit={this.createFruit.bind(this)}>
          <div className="form-group">
            <span htmlFor="fruitItem">
              Fruit Name
              <input type="textarea" id="fruitItem" placeholder="e.x.lemmon" ref="fruitName" className="input2" rows={6} />
               <Button  className = "delBtn editable-add-btn">删除 </Button>
            </span>
          </div>
          <button type="submit" className="btn btn-primary">Add Fruit</button>
         </Form>


          <div className="container">
            <ul className="list-group text-center">
              {
                Object.keys(this.props.fruits).map(function(field,key) {
                  return <li className="list-group-item list-group-item-info" key={key}>

                 <FormItem  key={key} className="div2">
                  <p className='label'>选项{idx[key]}</p>
                  <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                  {getFieldDecorator(`option${key}`, {
                    initialValue: field.name
                  })(
                    <Input type="textarea" disabled={this.props.disabled}  rows={6} className="input2" data-index={key} defaultValue={this.props.fruits[key]}/>
                  )}
                  
                  </div>
                   </FormItem>
                  </li>
                }.bind(this))
              }
            </ul>
           </div>


               var index=e.target.getAttribute("data-index");
 
        var fruits=this.state.fruits;
 
        fruits.splice(index,1);
 
        this.setState({fruits:fruits})
     
    
     console.log('aaaaaaaaaaa',this.state.fruits)