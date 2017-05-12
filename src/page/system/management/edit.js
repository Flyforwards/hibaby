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
        const _this = this;
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.handleSave=this.handleSave.bind(this)
        this.state={
          bigNum:['一', '二','三','四','五','六','七','八','九','十','十一','十二'],
          name:'',
          description:'',
          lists: []
        }
    }
    add(){
        console.log("add>>>>>",this.props.data)

        console.log(this.props.data);
        const item = this.props.data;
        let arr = [];
        let lists = this.state.lists;
        let field=[];
        if (item !== null) {
          arr = item.dictionarySideDOs;
          console.log(arr);
          field=arr.map(res=>{
              return(res.name)
          });
          console.log(field)
        };
        let num=field.length
        let len=lists.length+num ;
        lists.push(<FormItem key={len} className = "div2">
        {this.props.form.getFieldDecorator(`field${len}`, {rules: [{ required: true, }],
              })(<div>
                      <p className = "label">选项{this.state.bigNum[len]}</p>
                      <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                          <Input  data-index={len} className = "input2"/>
                          <span className = "editable-add-btn" onClick={this.delete}> 删除 </span>
                      </div>
                      </div>
                    )}
                    </FormItem>)
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
       console.log("editsave>>>>",values)
      //  let data=this.props.data;
      //  let name=data.name;
      //  let description=data.description
      //   let dictionarySideDOs=data.dictionarySideDOs;
      // let diclen=dictionarySideDOs.length;
      //  console.log("editsave>>>>>",values)
        let dictionarySideDOs=[];
       let params = {};
       Object.keys(values).map((key, index) => {
         if (key.indexOf("field") == 0) {
           let item = {};
           item['name'] = values[key];
           item['serialNumber'] = index;
           item['id']
           console.log('add:handlesave>>',key, values);
           dictionarySideDOs.push(item)
         } else {
           params[key] = values[key];
         }
       })
       params = {...params, dictionarySideDOs};

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
      }

      //获取table data
     getTableData(params = {}) {
         console.log('params:', params);

         this.setState({
             isTableLoading: true
         })

         request({
             url: '/crm/api/v1/dictionary/modifyDictionary',
             type: 'get',
             data: {
                 ...params,
             },
             dataType: 'json',
         }).then((res) => {

             const pagination = this.state.pagination;
             // 读取数据总条数
             // pagination.total = data.totalCount;
             pagination.total = 200;

             this.setState({
                 isTableLoading: false,
                 tableData: res.results,
                 pagination,
             })
         })
     }


    render() {
      console.log("edit>>>>>",this.props.data)
      let values = this.props.form;
      console.log(this.state.lists)
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
                          <Input className="input" value={name}/>
                        </div>
                      )}
                    </FormItem>
                      <FormItem className = "div">
                      {getFieldDecorator('description', {rules: [{ required: true, message: '字段描述为必填项！' }],
                    })(<div>
                          <p className = "label"> 字段描述 </p>
                          <Input className="input" value={description}/>
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
