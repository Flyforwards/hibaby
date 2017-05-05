
import React from 'react'
import './Organization.scss'
import { connect } from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import {classification,dataList,ww} from '../../constants.js'
import Current from '../Current'
import OrganizationLeft from './OrganizationLeft.jsx'


const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;


class Organizationed extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: '编号',
          dataIndex: 'Numbering',
          key:'Numbering',
          width: '100px',
        }, {
          title: '姓名',
          dataIndex: 'name',
          key:'name',
          width: '100px',
        }, {
          title: '职位',
          dataIndex: 'position',
          key:'position',
          width: '100px',
        }, {
          title: '隶属部门',
          dataIndex: 'department',
          key: 'department',
          width: '100px',
        },{
          title: '地方中心',
          dataIndex: 'local',
          key: 'local',
          width: '100px',
        },{
          title: '系统角色',
          dataIndex: 'system',
          key: 'system',
          width: '100px',
        },{
          title: '账户状态',
          dataIndex: 'status',
          key: 'status',
          width: '100px',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '100px',
          render: (text, record, index) => {
            return (
              dataList.length >= 1 ?
              (
                <span>
                 <a href="#" className="firstA" onClick={this.toView.bind(this)}>查看</a>
                  <a href="#" className="twoA" onClick={this.Disabled.bind(this)}>禁用</a>
                </span>
              ) : null
            );
          },
        }];
        this.state = {
            count: 2,
            createModalVisible: false,
            expandedKeys: ['ss', 'aaa', 'bbbb'],
            ulTop:0,
            upblock:'none'
        }
    }
    componentDidMount(){
      $("li").find(".ant-tree-title").after("<span class='plus'>+</span>")
      $(".plus").click(function(e){
          if(this.state.upblock == 'none'){
            this.setState({
              ulTop:e.pageY-e.offsetY-33,
              upblock:'block'
            })
            return
          }
          if(this.state.upblock == 'block'){
            this.setState({
              ulTop:e.pageY-e.offsetY,
              upblock:'none'
            })
            return
          }
      }.bind(this))
    }
    
    expandHandler = () => {
      setTimeout(() => {
        $("li").find("li .ant-tree-title").after("<span class='plus'>+</span>")
         $(".plus").click(function(e){
          if(this.state.upblock == 'none'){
            this.setState({
              ulTop:e.pageY-e.offsetY-33,
              upblock:'block'
            })
            return
          }
          if(this.state.upblock == 'block'){
            this.setState({
              ulTop:e.pageY-e.offsetY,
              upblock:'none'
            })
            return
          }
      }.bind(this))
      }, 50)  
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
    OrganizationInquire() {
      console.log("查询")
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
          Numbering: 'a123456',
          name: '李芳芳',
          position: '产品经理',
          department: '信息管理部',
          local: '总部',
          system: '普通员工',
          status: '正常',
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
      }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        const pagination = {
        total: 100,
        showQuickJumper: true,
        onChange: (current) => {
          this.props.dispatch(routerRedux.push({
            pathname: '/system',
            query: {
              "page": current,
              "results": 3,
              "type": 1
            },
          }));
        },
      };
        return (
            <main className="yt-admin-framework-Customer-a">
            <OrganizationLeft/>
            <div className="Organization-right">
            <div className="Organization-nav">
              <div className="name">姓名<Input ref="O"/></div>
              <div className="SystemRoles">系统角色
                 <Select defaultValue="请选择" style={{ width: 183 }} className="OrganizationType">
                    <Option value="jack">Jack</Option>
                    <Option value="时尚">请选择</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                    
                  </Select>
              </div>
              <div className="status">账户状态
                <Select defaultValue="请选择" style={{ width: 183 }} className="OrganizationType">
                    <Option value="jack">Jack</Option>
                    <Option value="时尚">请选择</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
              </div>
              <span className="Organization-Inquire" onClick={this.OrganizationAdd.bind(this)}>新增员工</span>
              <span className="Organization-add" onClick={this.OrganizationInquire.bind(this)}>查询</span>
            </div>
            {this.props.list?
            <div className="CreateModaList">
                <Table bordered dataSource={this.props.list} columns={columns} pagination = {pagination} rowKey="Numbering"/>
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
  data: list,
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
    / > < /div >
  )
}
function mapStateToProps(state) {
  console.log("modelss",state.system)
  const {
    data,
    total,
    page,
    results,
    range,
    code
  } = state.system;
  return {
    loading: state.loading.models.system,
    data,
    total,
    page,
    results,
    range,
    code
    };
}

export default connect(mapStateToProps)(Organization)
