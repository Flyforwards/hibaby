import React from 'react';
import {connect} from 'dva';
import './system.scss';
import {Card,Input,Button,Form} from 'antd';
var Nzh = require("nzh");
import { browserHistory } from 'dva/router';
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class List extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
              bigNum:'三'
            }
      }
      componentDidMount(){
          var index=this.props.index;
          var nzhcn = Nzh.cn;
          var num=Number(index)
          var newnum=num+1
          this.setState({
            bigNum: nzhcn.encodeS(newnum)
          })
      }
    render() {
          console.log("index",this.props.index)
          return ( <FormItem  className = "div2">
                      <p className = "label"data-index={this.props.index}>选项{this.state.bigNum} < /p>
                      <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                          <Input type = "textarea" rows = {6} data-index={this.props.index} className = "input2"
                                defaultValue={this.props.index}/>
                          <span className = "editable-add-btn" onClick={this.props.delete} data-index={this.props.index}> 删除 < /span>
                      </div>
                    </FormItem >
            )
    }
}

@createForm()
class AddData extends React.Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.handelTrans=this.handelTrans.bind(this);
        this.handleSave=this.handleSave.bind(this)
        this.state={
          lists: [(<FormItem key='0' className = "div2">
          {_this.props.form.getFieldDecorator('field0', {rules: [{ required: true, message: 'Username is required!' }],
        })(<div>
                       <p className = "label" > 选项一 < /p>
                       <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                          <Input  className="input2"/>
                       </div>
                       </div>
                     )}
                   </FormItem> ),(<FormItem key='1' className="div2">
                   {_this.props.form.getFieldDecorator('field1', {rules: [{ required: true, message: 'Username is required!' }],
                 })(<div>
                                <p className = "label" > 选项二 < /p>
                                <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                                   <Input  className="input2"/>
                                </div>
                                </div>
                              )}
                            </FormItem> )
                 ],
          bigNum:['一', '二','三','四','五','六','七','八','九'],
          name:'',
          description:''
        }
    }
    add(){
        var lists=this.state.lists;
        let len=this.state.lists.length ;
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
      let values = this.props.form;
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

function Add({dispatch}) {
    return (<div>
                <AddData dispatch = {dispatch}/>
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
export default connect(mapStateToProps)(AddData);
