import React from 'react';
import {connect} from 'dva';
import './system.scss';
import {Card,Input,Button,Form} from 'antd';
import { browserHistory } from 'dva/router';
import {Link} from 'react-router';
import request from 'common/request/request.js'
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class editData extends React.Component {

    constructor(props) {
        super(props);
        console.log("ce>>>>",this.props.data)
        const item = this.props.data;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          };
        let description="";
        let dictionarySideDOs=null;
        let lists=[];
        if (item !== null) {
          dictionarySideDOs=item.dictionarySideDOs;
          console.log('render:subItems>>', dictionarySideDOs)

        };
        if(dictionarySideDOs==null){
          lists.push(

                    <FormItem {...formItemLayout} label="选项一">
                    {getFieldDecorator('field0', {
                      //initialValue:"",
                          rules: [{ required: true ,message: '在此输入内容'}],
                      })(  <Input />
                        )}
                      </FormItem>
            )
        }else{
          lists=[];
        }
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.handleSave=this.handleSave.bind(this)
        this.state={
          bigNum:['一', '二','三','四','五','六','七','八','九','十','十一','十二'],
          formLayout: 'horizontal',
          lists:lists        }
    }
    add(){
        console.log("add>>>>>",this.props.data)
        const item = this.props.data;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          };
        let arr = [];
        let lists = this.state.lists;
        let field=[];
        let len=null;
        if (item !== null) {
          arr = item.dictionarySideDOs;
          console.log(arr);
          field=arr.map(res=>{
              return(res.name)
          });
          console.log(field)
          let num=field.length;
          len=lists.length+num ;
        }else {
            len=lists.length;

        };

        lists.push(
          <div>
          <FormItem {...formItemLayout} label={`选项${this.state.bigNum[len]}`}>
          {getFieldDecorator('field0', {
            //initialValue:"",
                rules: [{ required: true ,message: '在此输入内容'}],
            })(  <Input className=""/ >
              )}
            </FormItem>
            <span className = "editable-add-btn" onClick={this.delete}> 删除 </span>
            </div>


          //
          // <FormItem {...formItemLayout} key={len} className = "div2" la>
          // {this.props.form.getFieldDecorator(`field${len}`, {rules: [{ required: true, }],
          //       })(<div>
          //           <p className = "label"></p>
          //           <div className="posi" style={{position:'relative',overflow:'hidden'}}>
          //               <Input  data-index={len} className = "input2"/>
          //               <span className = "editable-add-btn" onClick={this.delete}> 删除 </span>
          //           </div>
          //           </div>
          //         )}
          //     </FormItem>
          )
        this.setState({lists:lists})
    }
    delete(e){
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
       console.log("values>>>",values)
       let data=this.props.data;
       let id=data.id;
       console.log("editsave>>>>",id);
      // let dictionarySideDOs=data.dictionarySideDOs;
      // let diclen=dictionarySideDOs.length;
      //  console.log("editsave>>>>>",values)
       let dictionarySideDOs=[];
       let newArr=[];
       let _field=[];
       let str=data.dictionarySideDOs;
       let Array=str.map(res=>{
         return(res.id)
       })
       console.log("Array>>>",Array)
          //childId=dictionarySideDOs.
       let params = {};
       Object.keys(values,).map((key, index) => {
         console.log("save>>>>",index)
        if(key.indexOf("field") !== -1||key.indexOf("id") !== -1){

        if(key.indexOf("field") !== -1){
          console.log(values)
             let item = {};

             item['name'] = values[key];
             item['serialNumber'] = index;
             console.log('add:handlesave>>',item,item['name']);
             _field.push(item);
             console.log('add:handlesave>>',_field);
           }
           if(key.indexOf("id") !== -1){
             console.log(key.indexOf("id"));
             let _item={};
             _item['name'] = values[key];
             _item['serialNumber'] = index;
             newArr.push(_item);
           }

         }else{
           params[key] = values[key];
         }
       })
       console.log(dictionarySideDOs)
       if(newArr!==null){

       for(let n=0;n<newArr.length;n++){
         let obj={};
         obj['name']=newArr[n].name;
         obj['serialNumber']=newArr[n].serialNumber;
         console.log("idArr>>>",Array[n]);
         obj['id']=Array[n];
         console.log(obj['id']);
         dictionarySideDOs.push(obj);
       }
       for(let m=0;m<_field.length;m++){
         dictionarySideDOs.push(_field[m])
       }
       console.log("newArr>>>",dictionarySideDOs);
     }
       params = {...params, dictionarySideDOs,id};

       console.log('add:handlesave>>',params)
       this.props.dispatch({
          type: 'save/editData',
          payload: {
              name:params.name,
              dictionarySideDOs:params.dictionarySideDOs,
              description:params.description,
              id:params.id,
              type:1
          }
        })
        routerRedux.push('/system/groupchar')
    }
    render() {
      console.log("edit>>>>>",this.props.data)
      let form = this.props.form;
      const item = this.props.data;
      const { formLayout } = this.state;
      //const { dataSource } = this.state;
      const formItemLayout = formLayout === 'horizontal' ? {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      } : null;
      const buttonItemLayout = formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 },
      } : null;
      const { getFieldDecorator } = this.props.form;
        //console.log('render:subItems>>', dictionarySideDOs)
      let arr=[];
      let children=[];
      let field=[];
      let childId=[];
      let name="";
      let description="";
      if(item!==null){
        arr=item.dictionarySideDOs;
        name=item.name;
        description=item.description;
      }

        if(arr !==null){

            field=arr.map(res=>{
                return(res.name)
            });
            console.log(field)
            childId=arr.map(res=>{
                return(res.id)
            });
        }
        let len=field.length;
        for(let i=0;i<len;i++){
          children.push(
            <div>
              <FormItem {...formItemLayout} className = "div" label={"选项"+`${this.state.bigNum[i]}`}>
                  {getFieldDecorator(`id${childId[i]}`, {
                    initialValue:`${field[i]}`,
                    rules: [{ required: true, message: '字段描述为必填项！' }],
                })(
                      <Input className="input" />
                  )}
                  </FormItem>
                  <span className = "editable-add-btn" onClick={this.delete}> 删除 </span>
                  </div>
          )
        }





      console.log("render>>>",getFieldDecorator)
        return (
              <div className="xuanxiang container2">
              <Card title = "字段信息:" >
                  <Form layout={formLayout}>
                  <FormItem {...formItemLayout} label="字段名称">
                  {getFieldDecorator('name', {
                    initialValue:`${name}`,
                        rules: [{ required: true, message: '字段名称为必填项！' }],
                    })(  <Input placeholder="input placeholder" />
                      )}
                    </FormItem>
                      <FormItem {...formItemLayout} className = "div" label="字段描述">
                      {getFieldDecorator('description', {
                        initialValue:`${description}`,
                        rules: [{ required: true, message: '字段描述为必填项！' }],
                    })(
                          <Input className="input" />
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

                  <Link to='groupchar/check'>
                      <Button className = "editable-add-btn return"> 返回 </Button>
                  </Link>
                  <Link to='/groupchar/edit'>
                      <Button className = "editable-add-btn" onClick={this.handleSave}> 保存 </Button>
                  </Link>
              </div>
        </div>
     )
    }
}

function edit({dispatch, data}) {
    return (<div>
                <editData dispatch = {dispatch} data={data}/>
            </div>
      )
}
function mapStateToProps(state) {
  console.log("modelss",state.save)
  const {
    item: data,
    code,
    field,
    len,
  } = state.save;

  return {
    loading: state.loading.models.save,
    data,
    code,
    field,
    code,
  };
}
export default connect(mapStateToProps)(editData);
