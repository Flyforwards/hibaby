
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
import { roleId } from '../../../constants.js'


const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;


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
            return (
                <span>
                 <a href="#" className="firstA" onClick={this.toView.bind(this)}>查看</a>
                  <a href="#" className="twoA" onClick={this.Disabled.bind(this)}>禁用</a>
                </span>
            );
          },
        }];
        this.state = {
            count: 2,
            createModalVisible: false,
            ulTop:0,
            upblock:'none',
            status:0,
            character:0
        }
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
    toView() {
      console.log("查看")
    }
    Disabled() {
      console.log("禁用")
    }
    //按条件查询用户
    OrganizationInquire() {
      console.log("查询",)
       this.props.dispatch({
        type: 'organization/organizationList',
        payload: {
            name: $(".userName").val(),
            nodeid: 3,
            roleId: this.state.character,
            status: this.state.status,
            page: 1,
            size: 5,
            tissueProperty: 2
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
    OrganizationAdd() {
      console.log("新增员工")
    }
    showCreateModal() {
        this.setState({
            createModalVisible: true
        })
    }
    sdsd() {
      console.log("dsd")
    }
    onCellChange = (index, key) => {
        return (value) => {
          const dataSource = [...this.state.dataSource];
          dataSource[index][key] = value;
          this.setState({ dataSource });
        };
      }

      onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ dataSource });
      }
      handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
          identifier: 'a123456',
          name: '李芳芳',
          positionId: '产品经理',
          deptId: '信息管理部',
          endemicId: '总部',
          roleId: '普通员工',
          status: '正常',
        };
        this.setState({
          dataSource: [...dataSource, newData]
        });
      }
    render() {
        let ListLnformation = []
        if(this.props.list != null){
          ListLnformation = this.props.list
        }
        const columns = this.columns;
        const pagination = {
          total:this.props.total,
          showQuickJumper: true,
          defaultPageSize:5,
          onChange: (current) => {
            this.props.dispatch({
              type: 'organization/organizationList',
              payload: {
                  nodeid: 3,
                  page: current,
                  size: 5,
                  tissueProperty: 2
              },
            });
          },
        };
        const traversalRoleId = (roleId) => {
          return roleId.map((item,index)=>{
             return <Option value={index} key={index}>{item}</Option>
          })
        }
        const traversalRoleIdData = traversalRoleId(roleId)
        return (
            <main className="yt-admin-framework-Customer-a">
            <OrganizationLeft/>
            <div className="Organization-right">
            <div className="Organization-nav">
              <div className="name">姓名<Input className="userName"/></div>
              <div className="SystemRoles">系统角色
                 <Select defaultValue="请选择" style={{ width: 183 }} className="OrganizationType" onSelect={this.onSelectCharacter.bind(this)}>
                      {traversalRoleIdData}
                  </Select>
              </div>
              <div className="status">账户状态
                <Select defaultValue="请选择" style={{ width: 183 }} className="OrganizationType" onSelect={this.onSelectStatus.bind(this)}>
                    <Option value="0">正常</Option>
                    <Option value="1">异常</Option>
                  </Select>
              </div>
              <span className="Organization-Inquire" onClick={this.OrganizationAdd.bind(this)}>新增员工</span>
              <span className="Organization-add" onClick={this.OrganizationInquire.bind(this)}>查询</span>
            </div>
            {this.props.list?
            <div className="CreateModaList">
                <Table bordered dataSource={ListLnformation} columns={columns} pagination = {pagination} rowKey="Numbering"/>
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
            </div>
            </main>
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
