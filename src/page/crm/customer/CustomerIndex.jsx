import React from 'react'
import './CustomerIndex.scss'
import {connect} from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Cascader, Modal} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import Current from '../../Current'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const confirm = Modal.confirm;


//这是级联选择地址
const options = [{
  value: '北京',
  label: '北京',
  children: [{
    value: '海淀区',
    label: '海淀区',
  }],
}, {
  value: '河北',
  label: '河北',
  children: [{
    value: '石家庄',
    label: '石家庄',
  }],
}];
//这是表单的数据操作
class Customer extends React.Component {
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
class CustomerIndex extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: '客户姓名',
          dataIndex: 'name',
          key: 'name'
        },{
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        }, {
          title: '预产期',
          dataIndex: 'dueDate',
          render: (record) => {
            return moment(record).format("YYYY-MM-DD")
          }
        }, {
          title: '怀孕周期',
          dataIndex: 'gestationalWeeks',
          key: 'gestationalWeeks'

        }, {
          title: '第几胎',
          dataIndex: 'fetus',
          key: 'fetus'
        },{
          title: '联系方式',
          dataIndex: 'contact',
          key: 'contact'
        },{
          title: '购买套餐',
          dataIndex: 'purchasePackage',
          key: 'purchasePackage'
        },{
          title: '合同编号',
          dataIndex: 'contractNumber',
          key: 'contractNumber'
        },{
          title: '添加人',
          dataIndex: 'operator1',
          key: 'operator1'
        },{
          title: '操作',
          dataIndex: 'operating',
          render: (text, record, index) => {
            return (
              <div>
                <Link onClick={ this.onLook.bind(this, record)}  > 查看 </Link>
                <Link onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
              </div>
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

    onLook(record){
      const dispatch = this.props.dispatch;
      dispatch({
        type: 'addCustomer/setDataDetailId',
        payload: { dataId:record.id }
      })
      dispatch(routerRedux.push('/crm/customer/customerDetails'))
    }

    onDelete(record) {
      const dispatch = this.props.dispatch;
      confirm({
        title: '提示',
        content: '是否确定删除此用户',
        onOk() {
          dispatch({
            type: 'customer/deleteCustomer',
            payload: { dataId: record.id }
          })
        },
        onCancel() {
        },
      });
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
        const columns = this.columns;
        const { list, loading, pagination, dispatch } = this.props;
        const tableProps = {
          loading: loading.effects['customer/getCustomerPage'],
          dataSource : list ,
          pagination,
          columns,
          onChange (page) {
            const { pathname } = location
            dispatch(routerRedux.push({
              pathname,
              query: {
                page: page.current,
                size: page.pageSize,
              },
            }))
          },
        }
        return (
        <div className="CustomerConent">
            <main className="yt-admin-framework-Customer">
            <div className="Customer-title">
            <div className="Customer-nav">
               <input placeholder='请输入客户编号、客户姓名、联系方式、合同编号....' />
                <span className="search"><Button type="primary">搜索</Button></span>
                <span className="screening"><Button type="primary" onClick={this.showCreateModal.bind(this)}>筛选项</Button></span>
                <span className="customer"><Link to="/crm/customer/Add"><Button type="primary">新增客户</Button></Link> </span>
            </div>
            <div className="Customer-navigation">
              <div className="Customer-first">
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
                </div>
                <div className="Customer-second">
                <div className="period">预产期
                   <MonthPicker placeholder="请选择" />
                </div>
                <div className="listDiv" id="data">宝宝生产日期
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                    />
                </div>
                <div className="current">现住址
                    <Cascader size="large" options={options} placeholder="请输入地址"/>
                </div>
                </div>
            </div>
            </div>
            <div className="CreateModaList-a">
              <Table bordered {...tableProps} rowKey={ record=>record.id}/>
            </div>
            <CreateModal
                handleOk={this.state.handleOk}
                visible={ this.state.createModalVisible }
                onCancel={ this.handleCreateModalCancel.bind(this) }
            />
          </main>
          </div>
        )
    }
}


function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.customer;

  return {
    loading: state.loading,
    list,
    pagination
  };
}
export default connect(mapStateToProps)(CustomerIndex)
