import React, { Component } from 'react'
import { connect } from 'dva'
import './editPosition.scss'
import { Button, Input, Icon, Modal, Form, Table, Popconfirm } from 'antd'
import { local, session } from 'common/util/storage.js'

class EditableCell extends Component {
  state = {
    editable: false
  }
  handleChange = (e) => {
    const { rank } = this.props.record;
    const name = e.target.value;
    this.props.dispatch({
      type: 'position/edit',
      payload: {
        name: name,
        rank: rank
      }
    })
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.props.name);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  
  render() {
    const { editable } = this.state;
    const { name } = this.props;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={name}
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
              {name || ' '}
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

class EditableTable extends Component {
  constructor(props) {
    super(props);
    const _this = this;
    this.columns = [{
      title: '选项',
      dataIndex: 'rank',
      width: '35%',
      render: function (text, record, index) {
        return (<span>
          选项{index+1}
        </span>)
      }
    }, {
      title: '职位',
      dataIndex: 'name',
      width: '35%',
      render: (text, record, index) => (
        <EditableCell
          name={text}
          record={record}
          dispatch={_this.props.dispatch}
          onChange={this.onCellChange(index, 'name')}
        />
      )
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { positionInfo } = this.props;
        return (
          positionInfo.length >= 1 ?
            (
              <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(index)}>
                <a href="#">删除</a>
              </Popconfirm>
            ) : null
        );
      }
    }];
    
    this.state = {
      key: 0
    };
  }
  
  onCellChange = (index, key) => {
    return (value) => {
      const { positionInfo } = this.props;
      positionInfo[index][key] = value;
    };
  }
  
  onDelete = (index) => {
    const { positionInfo } = this.props;
    const tmp = positionInfo.splice(index, 1);
    tmp[0].id ?
      this.props.dispatch({
        type: 'position/del',
        payload: {
          dataId: tmp[0].id
        }
      }) : this.props.dispatch({
      type: 'position/showPosition',
      payload: {
        positionInfo
      }
    })
    this.setState({ key: this.state.key + 1 })
  }
  
  handleAdd = () => {
    const { positionInfo, record } = this.props;
    const deptId = record.id
    //console.log(positionInfo,'??')
    function getCount() {
      var b = 0;
      if (positionInfo) {
        positionInfo.map((v, k) => {
          if (v.rank > b) {
            b = v.rank;
          }
        });
      }
      return b+1;
    }
    
    const count = getCount();
    const newData = {
      rank: count,
      deptId: deptId
    };
    positionInfo.push(newData);
    this.props.dispatch({
      type: 'position/add',
      payload: {
        positionInfo
      }
    })
    
  }
  
  render() {
    const columns = this.columns;
    const { positionInfo } = this.props;
    
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd} type="primary">添加</Button>
        <Table rowKey='rank' bordered dataSource={positionInfo} columns={columns} pagination={false}/>
      </div>
    );
  }
}


class LocalizedModal extends Component {
  state = {
    visible: false,
    addPosition: {
      deptId: '',
      id: '',
      name: ''
    }
  }
  
  handlePageChange(id) {
    this.props.dispatch({
      type: 'position/getPositionInfo',
      payload: {
        dataId: id
      }
    })
  }
  
  showModal = (id) => {
    this.setState({
      visible: true
    });
    this.handlePageChange(id)
  }
  
  handleOk = () => {
    const { positionInfo, dispatch } = this.props;
    dispatch({
      type: 'position/addEditPosition',
      payload: { "positionDOs": positionInfo }
    })
    this.setState({
      visible: false
    });
  }
  
  
  handleCancel = () => {
    this.setState({
      visible: false,
      newKey: ''
    });
  }
  
  render() {
    const { positionInfo, record, dispatch } = this.props;
    const endemic = session.get("endemic")
    const { name } = record;
    return (
      <div>
        <Button type="primary" onClick={() => {
          this.showModal(record.id);
          this.setState({ newKey: this.state.newKey + 1 })
        }}>查看</Button>
        <Modal width="60%"
               title="职位详情"
               onCancel={this.handleCancel}
               cancelText="取消"
               okText="保存"
               key={this.state.newKey}
               visible={this.state.visible}
               onOk={this.handleOk}
        >
          <p className="positionName"><span>职位所属：</span>{name}</p>
          <EditableTable record={record} positionInfo={positionInfo} dispatch={dispatch}/>
        </Modal>
      </div>
    );
  }
}

const EditPosition = Form.create()(LocalizedModal);

function EditPositionCom({ dispatch, positionInfo, record }) {
  return (
    <EditPosition dispatch={dispatch} positionInfo={positionInfo} record={record}/>
  )
}
function mapStateToProps(state) {
  const { positionInfo } = state.position;
  return {
    loading: state.loading.models.position,
    positionInfo
  };
}
export default connect(mapStateToProps)(EditPositionCom)
