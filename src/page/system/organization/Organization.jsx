import React from 'react'
import './Organization.scss'
import { connect } from 'dva'
import { Row, Col, Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree, Form } from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import Current from '../../Current'
import OrganizationLeft from './OrganizationLeft.jsx'
import { local, session } from 'common/util/storage.js'
import Disabled from './Disabled.jsx';
import { keyToText } from '../../../utils';


const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const TreeNode = Tree.TreeNode;
let POSITION = [];
let DEPTEMENT = [];
let endemic = session.get("endemic")
const FormItem = Form.Item;

class Organization extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '编号',
      dataIndex: 'identifier',
      key: 'identifier',
      width: '10%'
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    }, {
      title: '职位',
      dataIndex: 'positionId',
      key: 'positionId',
      width: '10%',
      render: (text, record, index) => {
        if (POSITION[text]) {
          return POSITION[text]
        } else {
          return text;
        }
      }
    }, {
      title: '隶属部门',
      dataIndex: 'deptId',
      key: 'deptId',
      width: '10%',
      render: (text, record, index) => {
        if (DEPTEMENT[text]) {
          return DEPTEMENT[text]
        } else {
          return text;
        }
      }
    }, {
      title: '地方中心',
      dataIndex: 'endemicId',
      key: 'endemicId',
      width: '10%',
      render: (text, record, index) => {
        let endemicId = ''
        if (this.props.getEndemic != null) {
          this.props.getEndemic.map((item) => {
            if (item.id == record.endemicId) {
              endemicId = item.name
            }
          })
        }
        return (
          endemicId
        )
      }
    }, {
      title: '系统角色',
      dataIndex: 'roleId',
      key: 'roleId',
      width: '28%',
      render: (text, record, index) => {
        let roleId = []
        let list = []
        if (record.roleId) {
          roleId = record.roleId.split(",")
          let len = roleId.length - 1
          if (local.get("rolSelectData")) {
            roleId.map((data, index) => {
              local.get("rolSelectData").map((item) => {
                if (item.id == Number(data)) {
                  
                  if (len == index) {
                    list.push(item.name)
                  } else {
                    list.push(item.name + " ; ")
                  }
                }
              })
            })
          }
        } else {
          list = ""
        }
        return (
          list
        )
      }
    }, {
      title: '账户状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text) => {
        if (text == 1) {
          return '禁用'
        } else if (text == 0) {
          return '正常'
        } else {
          return text;
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operating',
      key: 'operating',
      width: '12%',
      render: (text, record, index) => {
        let Forbidden = "禁用"
        const detail = !this.props.permissionAlias.contains('EMPLOYEE_DETAIL');
        let disable = !this.props.permissionAlias.contains('EMPLOYEE_DISABLE');
        if (record.status == 1) {
          Forbidden = "已禁用"
          disable = true;
        }
        
        return (
          <span>
                  <Link disabled={ detail} to={{
                    pathname: '/system/organization/ViewTheInformation',
                    query: { data: record.id }
                  }}>查看</Link>
                  <Link className="twoA" disabled={ disable } onClick={this.disabled.bind(this, record)}>{ Forbidden }</Link>
                </span>
        );
      }
    }];
    this.state = {
      count: 2,
      createModalVisible: false,
      ulTop: 0,
      upblock: 'none',
      status: null,
      character: null,
      userName: null,
      toViewVisible: false,
      ID: null,
      nodeid: endemic.id,
      tissueProperty: endemic.tissueProperty,
      statusType: false,
      default: null,
      current: 1
    }
    this.query = false
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
  
  componentDidMount() {
    let endemic = session.get("endemic")
    this.props.dispatch({
      type: 'organization/organizationList',
      payload: {
        "name": null,
        "roleId": null,
        "nodeid": endemic.id,
        "status": null,
        "page": 1,
        "size": 10,
        "tissueProperty": endemic.tissueProperty
      }
    });
    this.props.dispatch({
      type: 'organization/getPosition',
      payload: {}
    });
    this.props.dispatch({
      type: 'organization/getEndemic',
      payload: {}
    });
    this.props.dispatch({
      type: 'organization/getDeptList',
      payload: {}
    });
  }
  
  //禁止
  disabled(record) {
    this.setState({
      toViewVisible: true,
      ID: record.id
    })
  }
  
  onChange(current) {
    this.setState({
      current: current
    })
    console.log("current",current)
    if (this.state.statusType) {
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
        }
      });
    } else {
      this.props.dispatch({
        type: 'organization/organizationList',
        payload: {
          "name": null,
          "nodeid": this.state.nodeid,
          "roleId": null,
          "status": null,
          "page": current,
          "size": 10,
          "tissueProperty": this.state.tissueProperty
        }
      });
    }
  }
  
  //按条件查询用户
  OrganizationInquire() {
    const fields = this.props.form.getFieldsValue();
    //console.log("fields>>>>",fields)
    this.setState({
      userName: fields.userName,
      status: fields.OrganizationType,
      character: fields.SystemRoles,
      statusType: true,
      current:1
    })
    this.props.dispatch({
      type: 'organization/organizationList',
      payload: {
        "name": fields.userName,
        "nodeid": this.state.nodeid,
        "roleId": fields.SystemRoles,
        "status": fields.OrganizationType,
        "page": 1,
        "size": 10,
        "tissueProperty": this.state.tissueProperty
      }
    });
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
  }
  
  ObtainOrganization(nodeid, tissueProperty) {
    this.setState({
      nodeid: nodeid,
      tissueProperty: tissueProperty
    })
  }
  
  statusType(status) {
    this.setState({
      statusType: status,
      current: 1
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const fields = this.props.form.getFieldsValue();
    let roleId = local.get("rolSelectData")
    let ListLnformation = []
    if (this.props.list != null) {
      ListLnformation = this.props.list;
      ListLnformation.map((record) => {
        record.key = record.id;
      });
    }
    const { getPosition: positionInfo } = this.props;
    POSITION = keyToText(positionInfo, "id", "name", "POSITION");
    const { getDeptList: depInfo } = this.props;
    DEPTEMENT = keyToText(depInfo, "id", "name", "POSITION");
    const columns = this.columns;
    const pagination = {
      total: this.props.total,
      showQuickJumper: true,
      current: this.state.current,
      pageSize: 10,
      onChange: this.onChange.bind(this)
    };
    const traversalRoleId = (roleId) => {
      return roleId.map((item) => {
        return <Option value={item.id + ""} key={item.id}>{item.name}</Option>
      })
    }
    const traversalRoleIdData = traversalRoleId(roleId);
    
    const add = this.props.permissionAlias.contains('EMPLOYEE_ADD')
    return (
      <div className="organizationConnet">
        <main className="yt-admin-framework-Customer-a">
          <OrganizationLeft
            onBtain={this.ObtainOrganization.bind(this)}
            statusType={ this.statusType.bind(this) }
            current={ this.state.current }
          />
          <div className="Organization-right">
            <div className="Organization-nav">
              <Form layout="inline">
                <Row  justify="space-between">
                  <Col span={8}>
                    <FormItem
                      label="姓名"
                      //className="userName"
                    >
                      {getFieldDecorator('userName', {
                        rules: []
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="系统角色"
                      //className="SystemRoles"
                    >
                      {getFieldDecorator('SystemRoles', {
                        rules: []
                      })(
                        <Select placeholder="请选择" style={{ width: 180 }} allowClear={true}>
                          { traversalRoleIdData }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="账户状态"
                      //className="OrganizationType"
                    >
                      {getFieldDecorator('OrganizationType', {
                        rules: []
                      })(
                        <Select placeholder="请选择" style={{ width: 180 }} allowClear={true}>
                          <Option value="0">正常</Option>
                          <Option value="1">禁用</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              
              </Form>
              <div className="btn">
                {this.state.tissueProperty == 3 ?
                  <span className="Organization-Inquire"><Link to={{
                    pathname: '/system/organization/addUser',
                    query: { nodeid: this.state.nodeid }
                  }}><Button className="SaveBtn" disabled={!add}>新增员工</Button></Link></span> :
                  <span className="Organization-Inquire"><Link to="/system/organization/addUser"><Button className="SaveBtn" disabled={!add}>新增员工</Button></Link></span>
                }
                
                <span className="Organization-add" onClick={this.OrganizationInquire.bind(this)}>查询</span>
              </div>
            </div>
            {this.props.list ?
              <div className="CreateModaList">
                <Table bordered dataSource={ListLnformation} columns={columns} pagination={pagination}/>
                < Current page={
                  this.props.page
                }
                          totalpage={
                            this.props.totalpage
                          }
                          total={
                            this.props.total
                          }
                          results={
                            this.props.results
                          }
                          range={
                            this.props.range
                          }
                />
              </div> : null}
            <CreateModal
              visible={ this.state.createModalVisible }
            />
            <Disabled
              visible={ this.state.toViewVisible }
              handleOk={this.state.handleOk}
              onCancel={ this.handleCreateModalCancel.bind(this) }
              ID={this.state.ID}
            />
          </div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
          list,
          total,
          getPosition,
          getDeptList,
          getEndemic,
          page,
          results,
          range
        } = state.organization;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.organization,
    list,
    getPosition,
    getDeptList,
    getEndemic,
    total,
    page,
    results,
    range,
    permissionAlias
  };
}

const OrganizationForm = Form.create()(Organization);
export default connect(mapStateToProps)(OrganizationForm)
