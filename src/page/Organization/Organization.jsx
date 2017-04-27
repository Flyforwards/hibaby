import React from 'react'
import './index.scss'
import {connect} from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import {classification,dataList,ww} from '../../constants.js'
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
            expandedKeys: ['ss', 'aaa', 'bbbb']
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
        console.log("Organization",this.props.data)
        const pagination = {
        total: 100, //数据总条数
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
      console.log('WWW',ww)
      const loop = data => data.map((item) => {
        if (item.children && item.children.length) {
          return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.key} />;
      });
        return (
            <main className="yt-admin-framework-Customer">
            <div className="Organization-left">
                <Tree
                  showIcon={false}
                  onSelect={this.sdsd}
                >
                  <TreeNode title={classification[0].key} key="0-0">
                    <TreeNode title={classification[1].key} key="0-0-0">
                      <TreeNode title={classification[1].children[0].children[0].key} key="0-0-0-0" />
                      <TreeNode title={classification[1].children[0].children[1].key} key="0-0-0-1" />
                      <TreeNode title={classification[1].children[0].key} key="0-0-0-2" />
                    </TreeNode>
                    <TreeNode title={classification[2].key} key="0-0-1">
                      <TreeNode title="leaf" key="0-0-1-0" />
                    </TreeNode>
                  </TreeNode>
                  <TreeNode title="parent 1-2" key="0-0-2">
                    <TreeNode title="leaf" key="0-0-2-0" />
                    <TreeNode title="leaf" key="0-0-2-1" />
                  </TreeNode>
                </Tree>
            </div>
            <div className="Organization-right">
            <div className="Organization-nav">
              <div className="name">姓名<Input /></div>
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
            <div className="CreateModaList">
                <Table bordered dataSource={dataList} columns={columns} pagination = {pagination} rowKey="Numbering"/>
                <p className="allList">共计0条,范围1-10</p>
            </div> 
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
  data,
  code
}) {
  return ( < div >
    <Organizationed dispatch = {
      dispatch
    }
    loading = {
      loading
    }
    data = {
      data
    }
    code = {
      code
    }
    / > < /div >
  )

}
function mapStateToProps(state) {
  // console.log(state.users)
    const {
      data,
      code
    } = state.users;
  return {
    loading: state.loading.models.users,
    data,
    code
    };
}

export default connect(mapStateToProps)(Organization)
