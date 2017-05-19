
import React from 'react'
import './Organization.scss'
import { connect } from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import { routerRedux } from 'dva/router'
import { Link} from 'react-router'
import Current from '../../Current'
import OrganizationLeft from './OrganizationLeft.jsx'
import {local, session} from 'common/util/storage.js'
import Disabled from './Disabled.jsx'


const roleId = local.get("rolSelectData")
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;
let endemic  = session.get("endemic")

class Organization extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: '编号',
          dataIndex: 'identifier',
          key:'identifier',
          width: '10%',
        }, {
          title: '姓名',
          dataIndex: 'name',
          key:'name',
          width: '10%',
        }, {
          title: '职位',
          dataIndex: 'positionId',
          key:'positionId',
          width: '10%',
        }, {
          title: '隶属部门',
          dataIndex: 'deptId',
          key: 'deptId',
          width: '10%',
        },{
          title: '地方中心',
          dataIndex: 'endemicId',
          key: 'endemicId',
          width: '10%',
        },{
          title: '系统角色',
          dataIndex: 'roleId',
          key: 'roleId',
          width: '10%',
        },{
          title: '账户状态',
          dataIndex: 'status',
          key: 'status',
          width: '10%',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '10%',
          render: (text, record, index) => {
            let Disabled = false
            if(record.status == 1){
              Disabled = true
            }
            return (
                <span>
                 <Link to={{ pathname: '/system/organization/ViewTheInformation', query: { data:record.id } }}>查看</Link>
                 {Disabled?
                  <a href="#" className="twoB">禁用</a>:
                  <a href="#" className="twoA" disabled={ false } onClick={this.Disabled.bind(this,record)}>禁用</a>
                 }
                </span>
            );
          },
        }];
        this.state = {
            count: 2,
            createModalVisible: false,
            ulTop:0,
            upblock:'none',
            status:null,
            character:null,
            userName:null,
            toViewVisible:false,
            ID:null,
            nodeid:endemic.id,
            tissueProperty:endemic.tissueProperty
        }
        this.current = 1
    }
    onDrop = (info) => {
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
  }
  //获取部门
  acquisitionDepartment(id){

  }
  componentDidMount(){
    let endemic  = session.get("endemic")
    this.props.dispatch({
      type: 'organization/organizationList',
      payload: {
        "name":null,
        "roleId":null,
        "nodeid": endemic.id,
        "status":null,
        "page": 1,
        "size": 10,
<<<<<<< HEAD
       "tissueProperty":endemic.tissueProperty
=======
        "tissueProperty":endemic.tissueProperty
>>>>>>> 494ba3fd91f43df62921e99c4882a5a43ed6570b
      }
    });
  }
    //禁止
    Disabled(record) {
<<<<<<< HEAD
      console.log()
=======
>>>>>>> 494ba3fd91f43df62921e99c4882a5a43ed6570b
      this.setState({
        toViewVisible:true,
        ID:record.id
      })
    }
    //按条件查询用户
    OrganizationInquire() {
      this.setState({
        userName:$(".userName").val()
      })
       this.props.dispatch({
        type: 'organization/organizationList',
        payload: {
            "name": $(".userName").val(),
            "nodeid": this.state.nodeid,
            "roleId": this.state.character,
            "status": this.state.status,
            "page": this.current,
            "size": 10,
            "tissueProperty":this.state.tissueProperty
        },
      });
    }
    //获取系统角色的id
    onSelectCharacter(value){
     this.setState({
        character:value
     })
    }
    //获取账户状态的id
    onSelectStatus(value){
     this.setState({
        status:value
     })
    }
    showCreateModal() {
        this.setState({
            createModalVisible: true
        })
    }
    handleCreateModalCancel() {
        this.setState({
            toViewVisible: false
        })
      this.props.dispatch({
        type: 'organization/organizationList',
        payload: {
            "name": this.state.userName,
            "nodeid": this.state.nodeid,
            "roleId": this.state.character,
            "status": this.state.status,
            "page": this.current,
            "size": 10,
            "tissueProperty": this.state.tissueProperty
        },
      });
    }
    ObtainOrganization(nodeid,tissueProperty){
      this.setState({
          nodeid:nodeid,
          tissueProperty:tissueProperty
      })
    }
    render() {
        let ListLnformation = []
        if(this.props.list != null){
          ListLnformation = this.props.list;
          ListLnformation.map((record)=>{
            record.key = record.id;
          });
        }
        const columns = this.columns;
        const pagination = {
          total:this.props.total,
          showQuickJumper: true,
          defaultPageSize:10,
          onChange: (current) => {
            this.current = current
            this.props.dispatch({
              type: 'organization/organizationList',
              payload: {
                  "name": this.state.userName,
                  "nodeid": this.state.nodeid,
                  "roleId": this.state.character,
                  "status": this.state.status,
                  "page": current,
                  "size": 10,
                  "tissueProperty": this.state.tissueProperty
              },
            });
          },
        };
        const traversalRoleId = (roleId) => {
          return roleId.map((item)=>{
             return <Option value={item.id+""} key={item.id}>{item.name}</Option>
          })
        }
        const traversalRoleIdData = traversalRoleId(roleId)
        return (
        <div className="organizationConnet">
            <main className="yt-admin-framework-Customer-a">
            <OrganizationLeft
              onBtain={this.ObtainOrganization.bind(this)}
            />
            <div className="Organization-right">
            <div className="Organization-nav">
              <div className="name">姓名<Input className="userName"/></div>
              <div className="SystemRoles">系统角色
                 <Select defaultValue="请选择" style={{ width: 183 }} className="OrganizationType" onSelect={this.onSelectCharacter.bind(this)}>
                      { traversalRoleIdData }
                  </Select>
              </div>
              <div className="status">账户状态
                <Select defaultValue="请选择" style={{ width: 183 }} className="OrganizationType" onSelect={this.onSelectStatus.bind(this)}>
                    <Option value="0">正常</Option>
                    <Option value="1">禁用</Option>
                  </Select>
              </div>
              {this.state.tissueProperty == 3? 
                <span className="Organization-Inquire"><Link to={{ pathname: '/system/organization/addUser', query: { nodeid:this.state.nodeid } }}>新增员工</Link></span>:
                <span className="Organization-Inquire"><Link to="/system/organization/addUser">新增员工</Link></span>
              }
             
              <span className="Organization-add" onClick={this.OrganizationInquire.bind(this)}>查询</span>
            </div>
            {this.props.list?
            <div className="CreateModaList">
                <Table bordered dataSource={ListLnformation} columns={columns} pagination = {pagination} />
                < Current page = {
                      this.props.page
                    }
                    totalpage = {
                      this.props.totalpage
                    }
                    total = {
                      this.props.total
                    }
                    results = {
                      this.props.results
                    }
                    range = {
                      this.props.range
                    }
                    />
            </div>:null}
            <CreateModal
                visible={ this.state.createModalVisible }
            />
             <Disabled
                    visible={ this.state.toViewVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleCreateModalCancel.bind(this) }
                    ID = {this.state.ID}
                />
            </div>
            </main>
          </div>
        )
    }
}
function Organization({
  dispatch,
  loading,
  list,
  total,
  page,
  results,
  range,
  code
}) {
  return ( < div >
    <Organizationed dispatch = {
      dispatch
    }
    list = {
      list
    }
    loading = {
      loading
    }
    total = {
      total
    }
    page={page}
    results={results}
    range={range}
    /> </div >
  )
}
function mapStateToProps(state) {
  const {
    list,
    total,
    page,
    results,
    range,
    code
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    list,
    total,
    page,
    results,
    range,
    code
    };
}
export default connect(mapStateToProps)(Organization)
