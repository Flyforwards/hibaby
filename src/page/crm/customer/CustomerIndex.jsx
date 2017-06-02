import React from 'react'
import './CustomerIndex.scss'
import {connect} from 'dva'
import { Select, Button, DatePicker, Table, Input,Form, Icon, Popconfirm, Pagination, Cascader, Col, Row, InputNumber, Modal} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import DictionarySelect from 'common/dictionary_select';
import Current from '../../Current'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create

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

@createForm()
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
                <Link className="firstA" onClick={ this.onLook.bind(this, record)}  > 查看 </Link>
                <Link className="firstB" onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
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

    onSearch() {}
    reset() {}

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
        const { list, loading, pagination, dispatch, form, shipCards } = this.props;
        const { getFieldDecorator } = form;
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

        const options = shipCards.map((record)=>{
          return (<Option key={record.id} value={record.id}>{record.name}</Option>)
        });

        const formChooseOneLayout = {
          labelCol:{ span: 8 },
          wrapperCol:{ span: 10 }
        }
        const formChooseLayout = {
          labelCol:{ span: 10 },
          wrapperCol:{ span: 14 }
        }
        return (
        <div className="CustomerConent">
            <main className="yt-admin-framework-Customer">

              <Form>
                <div>
                  <Row style={{width:'1116px'}}>
                    <Col span={10} style={{float:'left'}}>
                      <FormItem {...formChooseLayout} style={{ width:'774px',height:'40px',lineHeight:'40px'}} >
                        {getFieldDecorator('sear', {rules: [{ required: false }],
                        })(
                          <Input placeholder="输入客户编号、客户姓名、联系方式、合同编号" style={{height:'40px'}}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={4} style={{ float:'left'}}>
                  <span>
                    <Button onClick={ this.onSearch.bind(this)} style={{width:'136px',backgroundColor:'rgba(255, 102, 0, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>查询</Button>
                  </span>
                    </Col>
                    <Col span={4} style={{ float:'left'}}>
                  <span>
                    <Button onClick={ this.reset.bind(this)} style={{width:'136px',backgroundColor:'rgba(255, 102, 0, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>重置</Button>
                  </span>
                  </Col>
                    <Col span={4} style={{ float:'left'}}>
                  <span>
                    <Link to="/crm/customer/Add/CustomerInformation"><Button style={{width:'136px',backgroundColor:'rgba(255, 102, 0, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>新增客户</Button></Link>
                  </span>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col span={4} style={{width:'140px'}}>
                    <FormItem {...formChooseOneLayout}  label="年龄" >
                      {getFieldDecorator('age1', {rules: [{ required: false }],
                      })(
                        <InputNumber style={{width: "80px"}} min={1} max={100}  />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={3}  style={{width:'140px'}}>
                    <FormItem {...formChooseLayout} style={{width:'100%'}}>
                      {getFieldDecorator('age2', {rules: [{ required: false }],
                      })(
                        <InputNumber min={1} max={100} style={{width: "80px"}} />
                      )}
                    </FormItem>

                  </Col>
                  <Col span={4} style={{width:'251px'}}>
                    <FormItem {...formChooseOneLayout}  label="预产期" >
                      {getFieldDecorator('time', {rules: [{ required: false }],
                      })(
                        <MonthPicker
                          placeholder="请选择"
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={4} style={{width:'251px'}}>
                    <FormItem  {...formChooseOneLayout} label="第几胎" >
                      {getFieldDecorator('fetus', {rules: [{ required: false }],
                      })(
                        <DictionarySelect  placeholder="请选择" selectName="FETUS" />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={4} style={{width:'251px'}} >
                    <FormItem  {...formChooseOneLayout} label="会员身份" >
                      {getFieldDecorator('member', {rules: [{ required: false }],
                      })(
                        <Select   placeholder="请选择" >
                          {
                            options
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={4} style={{width:'180px'}}>
                    <FormItem  {...formChooseOneLayout} label="操作者2" >
                      {getFieldDecorator('operator2', {rules: [{ required: false }],
                      })(
                        <Input max={40}  />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
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
    pagination,
    shipCards,
  } = state.customer;

  return {
    loading: state.loading,
    list,
    pagination,
    shipCards,
  };
}
export default connect(mapStateToProps)(CustomerIndex)
