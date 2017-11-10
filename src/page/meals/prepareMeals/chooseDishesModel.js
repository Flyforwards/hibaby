import { connect } from 'dva';
import React, { Component }from 'react';
import { Modal, Button } from 'antd';
import { Tree, Input, Row, Col, Table, Form, Select } from 'antd';
import { Link } from 'react-router';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option
import './prepareMeals.scss'

const createForm = Form.create

@createForm()
class App extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    data: [],
    selectedKeys: [],
    name: '',
    mvType: null,
    vdType: null,
    status: null
  }
  
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  }
  
  onChange = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/getDishesPageList',
      payload: {
        nodeId: this.state.postNodeId ? this.state.postNodeId : 1,
        page: 1,
        name: value
      }
    })
    this.setState({
      name: value
    })
  }
  
  
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  handleMvTypeChange = (value) => {
    this.setState({
      mvType: value
    });
  }
  handleVdTypeChange = (value) => {
    this.setState({
      vdType: value
    });
  }
  handleStatus = (value) => {
    this.setState({
      status: value
    });
  }
  
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      name: '',
      mvType: null,
      vdType: null,
      status: ''
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/getDishesPageList',
      payload: {
        nodeId: this.state.postNodeId ? this.state.postNodeId : 1,
        page: 1
      }
    });
  }
  
  handleSearch = () => {
    this.getTableData({
      nodeId: this.state.postNodeId ? this.state.postNodeId : 1,
      page: 1
    });
  }
  
  
  getTableData(params = {}) {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/getDishesPageList',
      payload: {
        ...params,
        name: this.state.name,
        mvType: this.state.mvType,
        vdType: this.state.vdType,
        status: this.state.status
      }
    });
  }
  
  
  handleCancel = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/chooseVisible',
      payload: {
        topVisible: false
      }
    })
  }
  
  
  handleCancelModel = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/changeVisible',
      payload: {
        visible: false
      }
    })
    dispatch({
      type: 'prepareMeals/chooseVisible',
      payload: {
        topVisible: false
      }
    })
  }
  
  onSelect = (selectedKeys, info) => {
    const { dispatch } = this.props;
    this.setState({
      selectedKeys: selectedKeys,
      postNodeId: selectedKeys[0]
      // name: '',
      // mvType : null,
      // vdType:null,
      // status:null
    }, function () {
      dispatch({
        type: 'prepareMeals/getDishesPageList',
        payload: {
          nodeId: this.state.postNodeId,
          page: 1
        }
      })
    })
    this.setState({
      selectedKeys: []
    })
  }
  
  getInfo = (data) => {
    const { changeKey, isLow, dispatch, reset, isEm } = this.props;
    const { id, name } = data;
    const postData = {
      dishesId: id,
      dishesName: name,
      number: changeKey + 1
    }
    console.log(1)
    const postDataHigh =
            isEm ? {
              em_dishesId: id,
              em_dishesName: name,
              number: changeKey + 1
            } : {
              dishesId: id,
              dishesName: name,
              number: changeKey + 1
            }
    
    reset();
    isLow ? dispatch({
      type: 'prepareMeals/saveLowInfo',
      payload: { postData }
    }) : dispatch({
      type: 'prepareMeals/saveHighInfo',
      payload: {
        postDataHigh
      }
    });
    dispatch({
      type: 'prepareMeals/chooseVisible',
      payload: {
        topVisible: false
      }
    })
    
  }
  
  handleTableChange = (pagination) => {
    const { dispatch, prepareMeals } = this.props;
    const { name } = this.state;
    name == '' ? dispatch({
      type: 'prepareMeals/getDishesPageList',
      payload: {
        page: pagination.current,
        size: 10,
        nodeId: this.state.postNodeId ? this.state.postNodeId : 1
      }
    }) : dispatch({
      type: 'prepareMeals/getDishesPageList',
      payload: {
        page: pagination.current,
        size: 10,
        nodeId: this.state.postNodeId ? this.state.postNodeId : 1,
        name: name
      }
    })
  }
  
  render() {
    const { prepareMeals, form } = this.props;
    const { getFieldDecorator } = form;
    
    const { chooseVisibleInfo, nodesInfo, dishesPageInfo, paginationInfo, mvType, vdType } = prepareMeals;
    const { nodes } = nodesInfo;
    const { expandedKeys, autoExpandParent } = this.state;
    const mvTypeOptions = [];
    mvType.map(function (item, index) {
      mvTypeOptions.push(<Option key={item.id + ""} value={item.id + ""}>{item.name}</Option>);
    });
    const vdTypeOptions = [];
    vdType.map(function (item, index) {
      vdTypeOptions.push(<Option key={item.id + ""} value={item.id + ""}>{item.name}</Option>);
    });
    const columns = [
      {
        title: '菜品名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return (
            <Link onClick={() => {
              this.handleCancel();
              this.handleCancelModel()
            }} to={`/meals/dishes/dishesDetail?dataId=${record.id}`}>{text}</Link>
          )
        }
      }, {
        title: '荤素类型',
        dataIndex: 'mvType',
        key: 'mvType',
        render: (text, record, index) => {
          let result = null;
          mvType.map(function (item) {
            if (text == item.id) {
              result = ( <span>{item.name}</span>);
              return;
            }
          });
          return result;
        }
      }, {
        title: '菜品类型',
        dataIndex: 'vdType',
        key: 'vdType',
        render: (text, record, index) => {
          let result = null;
          vdType.map(function (item) {
            if (text == item.id) {
              result = ( <span>{item.name}</span>);
              return;
            }
          });
          return result;
        }
      }, {
        title: '使用状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return (
            <p>{text == 0 ? '未使用' : '已使用'}</p>
          )
        }
      }, {
        title: '操作',
        key: 'action',
        dataIndex: 'status',
        render: (text, record) => {
          return (
            <a onClick={() => {this.getInfo(record)}}>选择</a>
          )
        }
      }]
    
    const loop = data => data.map((item) => {
      if (item.nodes) {
        return (
          <TreeNode key={item.id} title={item.name + `(${item.dishesCount})`}>
            {loop(item.nodes)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.name + `(${item.dishesCount})`}/>;
    });
    return (
      <div>
        <Modal
          width={1000}
          title="选择菜品"
          visible={chooseVisibleInfo}
          footer={null}
          onCancel={this.handleCancel}
          className="chooseDishesModel"
        >
          <Row>
            <Col span={6}>
              <Tree
                selectedKeys={ this.state.selectedKeys}
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={this.onSelect}
              >
                <TreeNode title="菜品库" key="1">
                  {loop(nodes)}
                </TreeNode>
              </Tree>
            </Col>
            <Col span={18}>
              <Form layout="inline">
                <Row justify="space-between">
                  <Col span={6}>
                    <FormItem>
                      {getFieldDecorator('name')(
                        <Input style={{ width: 180 }} placeholder="请输入菜品名或主副食材" onChange={this.handleNameChange.bind(this)}/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem>
                      {getFieldDecorator('mvType')(
                        <Select placeholder="荤素类型" style={{ width: 180 }} allowClear={true} onChange={this.handleMvTypeChange.bind(this)}>
                          {mvTypeOptions}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem>
                      {getFieldDecorator('vdType')(
                        <Select placeholder="菜品类型" style={{ width: 180 }} allowClear={true} onChange={this.handleVdTypeChange.bind(this)}>
                          {vdTypeOptions}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem>
                      {getFieldDecorator('status')(
                        <Select placeholder="使用状态" style={{ width: 180 }} allowClear={true} onChange={this.handleStatus.bind(this)}>
                          <Option value="0">未使用</Option>
                          <Option value="1">已使用</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              <div className="btns btnsSearch">
                <Button className="button-group-1" onClick={this.handleReset.bind(this)}>重置</Button>
                <Button className="button-group-2" onClick={this.handleSearch.bind(this)}>查询</Button>
              </div>
              <Table rowKey="id"
                     columns={columns}
                     dataSource={dishesPageInfo}
                     onChange={this.handleTableChange}
                     pagination={paginationInfo}
                     className="info-card-center"
                     bordered
              />
            </Col>
          </Row>
        
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  
  return {
    prepareMeals: state.prepareMeals
  };
}
export default connect(mapStateToProps)(App);


