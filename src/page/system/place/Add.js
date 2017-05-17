import React from 'react';
import {connect} from 'dva';
import './place.scss';
import {Card,Input,Button,Form} from 'antd';
import {Link} from 'react-router';
import {routerReducer} from 'react-router-redux'
const FormItem = Form.Item;
const createForm = Form.create
@createForm()
class PlaceAdd extends React.Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.handleSave=this.handleSave.bind(this)
        this.state={
          lists: [(<FormItem key='0' className = "div2">
                      {_this.props.form.getFieldDecorator('field0', {rules: [{ required: true, message: 'Username is required!' }],
                    })(<div>
                           <p className = "label" > 选项一 </p>
                           <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                              <Input type="textarea" rows = {6} className="input2"/>
                           </div>
                       </div>
                     )}
                   </FormItem> ),
                   (<FormItem key='1' className="div2">
                       {_this.props.form.getFieldDecorator('field1', {rules: [{ required: true, message: 'Username is required!' }],
                     })(<div>
                            <p className = "label" > 选项二 </p>
                            <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                               <Input type="textarea" rows = {6} className="input2"/>
                            </div>
                              </div>
                      )}
                    </FormItem> )
                 ],
          name:'',
          description:'',
          path:'/localchar/add'
        }
    }
    add(){
        var lists=this.state.lists;
        let len=this.state.lists.length ;
        lists.push(<FormItem key={len} className = "div2">
                    {this.props.form.getFieldDecorator(`field${len}`, {rules: [{ required: true, message: 'Username is required!' }],
                      })(<div>
                              <p className = "label">选项${len}</p>
                              <div className="posi" style={{position:'relative',overflow:'hidden'}}>
                                  <Input type="textarea" rows = {6} className = "input2"/>
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
          type: 'space/AddPlaceData',
          payload: {
              name:params.name,
              dictionarySideDOs:params.dictionarySideDOs,
              description:params.description,
              type:2
          }
        })
      }
    render() {
      let values = this.props.form;
      const { getFieldDecorator } = this.props.form;
      console.log("render>>>",values)
        return (
          <div className="xuanxiang   PlaceProject">
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
                <Link to='system/localchar'>
                  <Button className = "editable-add-btn return"> 返回 </Button>
                </Link>
                <Link to='/system/localchar'>
                  <Button className = "editable-add-btn" onClick={this.handleSave}> 保存 </Button>
                </Link>
              </div>
        </div>
      )
    }
}

function PlaceAdd({dispatch}) {
    return (<div>
                <PlaceAdd dispatch = {dispatch}/>
            </div>
      )
}
function mapStateToProps(state) {
    console.log("modelss",state.space)
    const {
      data,
      code
    } = state.space;
    return {
      loading: state.loading.models.space,
      data,
      code
    };
}
export default connect(mapStateToProps)(PlaceAdd);
