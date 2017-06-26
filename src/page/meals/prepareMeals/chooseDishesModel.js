import { connect } from 'dva';
import React, { Component }from 'react';
import { Modal, Button } from 'antd';
import { Tree, Input, Row, Col, Table } from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class App extends Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    dataList: [],
    data: [],
    loading: false
  }
  
  
  generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const name = node.name;
      this.state.dataList.push({ key: name, title: name });
      if (node.nodes) {
        this.generateList(node.nodes, node.key);
      }
    }
  };
  
  componentWillMount() {
    const { prepareMeals } = this.props;
    const { nodesInfo } = prepareMeals;
    const { nodes } = nodesInfo;
    this.generateList(nodes);
  }
  
  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.nodes) {
        if (node.nodes.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.nodes)) {
          parentKey = this.getParentKey(key, node.nodes);
        }
      }
    }
    return parentKey;
  };
  
  
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  }
  onChange = (e) => {
    const { prepareMeals } = this.props;
    const { nodesInfo } = prepareMeals;
    const { nodes } = nodesInfo;
    const value = e.target.value;
    
    
    const expandedKeys = this.state.dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return this.getParentKey(item.keys, nodes);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    
    
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
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
  onSelect = (selectedKeys, info) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/getDishesPageList',
      payload: {
        nodeId: selectedKeys[0],
        page: 1
      }
    })
    this.setState({
      postNodeId: selectedKeys[0]
    })
  }
  
  getInfo = (data) => {
    const { changeKey, isLow, dispatch, reset } = this.props;
    const otherInfo = this.props.otherInfo && this.props.otherInfo;
    
    const { id, name } = data;
    const postData = {
      dishesId: id,
      dishesName: name,
      number: changeKey + 1
    }
    const postDataHigh = {
      dishesId: id,
      dishesName: name,
      number: changeKey + 1,
      ...otherInfo
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
    dispatch({
      type: 'prepareMeals/getDishesPageList',
      payload: {
        page: pagination.current,
        size: 10,
        nodeId: this.state.postNodeId ? this.state.postNodeId : 1
      }
    })
  }
  
  render() {
    const { prepareMeals } = this.props;
    const { chooseVisibleInfo, nodesInfo, dishesPageInfo, paginationInfo } = prepareMeals;
    const { nodes } = nodesInfo;
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const columns = [{
      title: '菜品名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '荤素类型',
      dataIndex: 'mvType',
      key: 'mvType'
      
    }, {
      title: '菜品类型',
      dataIndex: 'vdType',
      key: 'vdType'
    }, {
      title: '使用状态',
      dataIndex: 'status',
      key: 'status'
    }, {
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => {
        return (
          <Button onClick={() => {this.getInfo(record)}}>选择</Button>
        )
      }
    }]
    
    const loop = data => data.map((item) => {
      const index = item.name.search(searchValue);
      const beforeStr = item.name.substr(0, index);
      const afterStr = item.name.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
          ({item.dishesCount})
        </span>
      ) : <span>{item.name}({item.dishesCount})</span>;
      if (item.nodes) {
        return (
          <TreeNode key={item.id} title={title}>
            {loop(item.nodes)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title}/>;
    });
    return (
      <div>
        <Modal
          width={1000}
          title="选择菜品"
          visible={chooseVisibleInfo}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Search style={{ width: 300 }} placeholder="Search" onChange={this.onChange}/>
          <Row>
            <Col span={6}>
              <Tree
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={this.onSelect}
              >
                {loop(nodes)}
              </Tree>
            </Col>
            <Col span={18}>
              <Table rowKey="id"
                     columns={columns}
                     dataSource={dishesPageInfo}
                     onChange={this.handleTableChange}
                     pagination={paginationInfo}
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


