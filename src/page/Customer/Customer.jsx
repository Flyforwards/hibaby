import React from 'react'
import './index.scss'
import {connect} from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}
class Customered extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: '客户姓名',
          dataIndex: 'name',
          width: '90px',
        }, {
          title: '年龄',
          dataIndex: 'age',
          width: '90px',
        }, {
          title: '预产期',
          dataIndex: 'period',
          width: '90px',
        }, {
          title: '怀孕周期',
          dataIndex: 'Pregnancy',
          width: '90px',
        },{
          title: '第几胎',
          dataIndex: 'tires',
          width: '90px',
        },{
          title: '联系方式',
          dataIndex: 'information',
          width: '90px',
        },{
          title: '购买套餐',
          dataIndex: 'package',
          width: '90px',
        },{
          title: '合同编号',
          dataIndex: 'contract',
          width: '90px',
        },{
          title: '添加人',
          dataIndex: 'people',
          width: '90px',
        },{
          title: '操作',
          dataIndex: 'operating',
          width: '90px',
          render: (text, record, index) => {
            return (
              this.state.dataSource.length >= 1 ?
              (
                <Popconfirm title="是否要删除该数据?" onConfirm={() => this.onDelete(index)}>
                 <a href="#">查看</a>
                  <a href="#">删除</a>
                </Popconfirm>
              ) : null
            );
          },
        }];
        this.state = {
            dataSource: [{
                key: '0',
                name: '李芳芳',
                age: '32',
                address: 'sadasd',
                period:'2017-04-14',
                Pregnancy:'18周',
                tires:'一',
                information:'15733256210',
                package:'A套餐',
                contract:'1234567',
                people:'里方法',
              }],
            count: 2,
            createModalVisible: false
        }
    }
    handleCreateModalCancel() {
        this.setState({
            createModalVisible: false
        })
    }
    showCreateModal() {
        this.setState({
            createModalVisible: true
        })
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
          key: count,
          name: `Edward King ${count}`,
          age: 32,
          address: `London, Park Lane no. ${count}`,
          period:'2017-04-14',
          Pregnancy:'18周',
          tires:'一',
          information:'15733256210',
          package:'A套餐',
          contract:1234567,
          people:'里方法',
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
        return (
            <main className="yt-admin-framework-Customer">
            <div className="Customer-nav">
               <input placeholder='请输入客户编号、客户姓名、联系方式、合同编号....' />
                <span className="search"><Button type="primary">搜索</Button></span>
                <span className="screening"><Button type="primary" onClick={this.showCreateModal.bind(this)}>筛选项</Button></span>
                <span className="customer"><Button type="primary">新增客户</Button></span>
            </div>
            <div className="Customer-navigation">
                <div className="age">年龄<input type="number" min="1"/>至<input type="number" min="1"/></div>
                <div className="Membership">会员身份
                    <Select defaultValue="请选择" style={{ width: 150 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="时尚">请选择</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className="hospitals">生产医院
                    <Select defaultValue="请选择" style={{ width: 150 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="时尚">请选择</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className="period">预产期 
                   <MonthPicker placeholder="请选择" />
                </div>
                <div className="current">现住址
                    <Select defaultValue="请选择" style={{ width:150}}>
                      <Option value="jack">2015</Option>
                      <Option value="时尚">2016</Option>
                      <Option value="disabled">2017</Option>
                      <Option value="Yiminghe">2018</Option>
                    </Select>
                </div>  
            </div>
            {this.props.list?
            <div className="CreateModaList">
                <Table bordered dataSource={dataSource} columns={columns} pagination = {pagination}/>
                <p className="allList">共计{this.props.list.length}条,范围1-10</p>
            </div>:null}  
            <CreateModal
                visible={ this.state.createModalVisible }
                onCancel={ this.handleCreateModalCancel.bind(this) }
            />
            </main>
        )
    }
}

function Customer({
  dispatch,
  loading,
  list,
  total,
  code
}) {
  return ( < div >
    <Customered dispatch = {
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
    / > < /div >
  )

}
function mapStateToProps(state) {
  console.log(state.users)
    const {
      list,
      total,
      code
    } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    code
    };
}

export default connect(mapStateToProps)(Customer)
