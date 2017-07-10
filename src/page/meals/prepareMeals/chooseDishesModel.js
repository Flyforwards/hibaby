import { connect } from 'dva';
import React, { Component }from 'react';
import { Modal, Button } from 'antd';
import { Tree, Input, Row, Col, Table } from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class App extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    data: [],
    selectedKeys: [],
    name: ''
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
  handleCancel = (e) => {
    const { dispatch } = this.props;
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
      postNodeId: selectedKeys[0],
      name: ''
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
    const { changeKey, isLow, dispatch, reset } = this.props;
    const { id, name } = data;
    const postData = {
      dishesId: id,
      dishesName: name,
      number: changeKey + 1
    }
    const postDataHigh = {
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
  
  handleTableChange = (pagination, filters, sorter) => {
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
    const { prepareMeals } = this.props;
    const { chooseVisibleInfo, nodesInfo, dishesPageInfo, paginationInfo, mvType, vdType } = prepareMeals;
    const { nodes } = nodesInfo;
    const { expandedKeys, autoExpandParent } = this.state;
    const columns = [
      {
        title: '菜品名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '荤素类型',
        dataIndex: 'mvType',
        key: 'mvType',
        render: (text, record, index) => {
          mvType.map(function (item) {
            if (text == item.id) {
              return ( <span>{item.name}</span>);
            }
          });
        }
      }, {
        title: '菜品类型',
        dataIndex: 'vdType',
        key: 'vdType',
        render: (text, record, index) => {
          vdType.map(function (item) {
            if (text == item.id) {
              return ( <span>{item.name}</span>);
            }
          });
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
            <a href="#" onClick={() => {this.getInfo(record)}}>选择</a>
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
              <Search className="search" placeholder="请输入菜品名" onSearch={this.onChange}/>
              <Table rowKey="id"
                     columns={columns}
                     dataSource={dishesPageInfo}
                     onChange={this.handleTableChange}
                     pagination={paginationInfo}
                     className="dishesTab"
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


