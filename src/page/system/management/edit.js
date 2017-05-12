import React from 'react';
import {connect} from 'dva';
import './system.scss';
import {Card,Input,Button,Form} from 'antd';
var Nzh = require("nzh");
import { browserHistory } from 'dva/router';
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class editData extends React.Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.handleSave=this.handleSave.bind(this)
        this.state={
          lists: [],
          bigNum:['一', '二','三','四','五','六','七','八','九'],
          name:'',
          description:''
        }
    }
    add(){
        console.log("add>>>>>",this.props.data)

        console.log(this.props.data);
        const item = this.props.data;
        let name = "";
        let description = "";
        let arr = [];
        let field=[];
        if (item !== null) {
          name = item.name;
          description = item.description;
          arr = item.dictionarySideDOs;
          console.log(arr);
          field=arr.map(res=>{
              return(res.name)
          });
          console.log(field)
        };
          let len=field.length ;
          let lists=[];
        lists.push(<FormItem key={len} className = "div2">
        {this.props.form.getFieldDecorator(`field${len}`, {rules: [{ required: true, message: 'Username is required!' }],
      })(<div>
                      <p className = "label" data-index={this.state.lists.length}>选项{this.state.bigNum[len]}</p>
                      <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                          <Input  data-index={len} className = "input2"/>
                          <span className = "editable-add-btn" onClick={this.delete} data-index={this.state.lists.length}> 删除 </span>
                      </div>
                      </div>
                    )}
                    </FormItem>)
        this.setState({lists:lists})
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
       let values = this.props.form.getFieldsValue();
       let params = {};
       let dictionarySideDOs = [];
       Object.keys(values).map((key, index) => {
         if (key.indexOf("field") == 0) {
           let item = {};
           item['name'] = values[key];
           item['serialNumber'] = index;
          //  console.log('add:handlesave>>',key, value);
           dictionarySideDOs.push(item)
         } else {
           params[key] = values[key];
         }
       })
       params = {...params, dictionarySideDOs};

       console.log('add:handlesave>>',params)
       this.props.dispatch({
          type: 'save/saveData',

          payload: {
              name:params.name,
              dictionarySideDOs:params.dictionarySideDOs,
              description:params.description,
              type:1
          }
        })
      }
    render() {
      console.log("edit>>>>>",this.props.data)
      let values = this.props.form;
      const item = this.props.data;
      let name = "";
      let description = "";
      let arr = [];
      let field=[];
      if (item !== null) {
        name = item.name;
        description = item.description;
        arr = item.dictionarySideDOs;
        console.log(arr);
        field=arr.map(res=>{
            return(res.name)
        });
        console.log(field)
      };
      const children=[];
      for(let i=0;i<field.length;i++){
        children.push(<FormItem key={i} className = "div2">
        {this.props.form.getFieldDecorator(`field${i}`, {rules: [{ required: true, message: 'Username is required!' }],
      })(<div>
             <p className = "label" > 选项{this.state.bigNum[i]} < /p>
             <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                <Input value={field[i]}  className="input2"/>
             </div>
          </div>
           )}
         </FormItem>

        )
      }

      const { getFieldDecorator } = this.props.form;
      console.log("render>>>",values)
        return (
              <div className="xuanxiang container2">
              <Card title = "字段信息:" >
                  <Form>
                      <FormItem className = "div">
                      {getFieldDecorator('name', {rules: [{ required: true, message: '字段名称为必填项！' }],
                    })(<div>
                          <p className ="label" > 字段名称 </p>
                          <Input className="input"/>
                        </div>
                      )}
                    </FormItem>
                      <FormItem className = "div">
                      {getFieldDecorator('description', {rules: [{ required: true, message: '字段描述为必填项！' }],
                    })(<div>
                          <p className = "label"> 字段描述 </p>
                          <Input className="input"/>
                        </div>
                      )}
                      </FormItem>
                  </Form>
              </Card>
              < Card title = "下拉选项:" >
              <Form>
                   {children}
                   {this.state.lists}
                   <Button className = "editable-add-btn add" onClick = {this.add.bind(this)}> 添加 </Button>
              </Form>
              </Card >
              <div className="retuSave">
                  <Button className = "editable-add-btn return" onClick = {this.handleReturn} > 返回 </Button>
                  <Button className = "editable-add-btn" onClick={this.handleSave}> 保存 </Button>
              </div>
        </div>
     )
    }
}

function edit({dispatch}) {
    return (<div>
                <editData dispatch = {dispatch}/>
            </div>
      )
}
function mapStateToProps(state) {
  console.log("modelss",state.save)
  const {
    data,
    code
  } = state.save;

  return {
    loading: state.loading.models.save,
    data,
    code
  };
}
export default connect(mapStateToProps)(editData);
