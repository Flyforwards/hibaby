import React, { Component } from 'react'
import { connect } from 'dva'
import './editPositionIndex.scss'
import { Button, Input, Icon, Modal, Form, Table, Popconfirm, Row, Col } from 'antd'
import { local, session } from 'common/util/storage.js'
import { Link } from 'react-router';
const FormItem = Form.Item
const createForm = Form.create

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
        return (
          <span>
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

  onClick(record, index) {

    if (index==0){
      //添加

    } else {
      //删除
    }

  }


  render() {
    const { positionInfo } = this.props;
    const cell = positionInfo.map((record, index)=>{
      return (
        <Row key={ index } className="detail-table-cell">
          <Col span={7} >
            <div className="col-left">
              <span>选项{index+1}</span>
            </div>
          </Col>
          <Col span={12} >
            <div className="col-right">
              <span>{record.name}</span>
            </div>
          </Col>
          <Col span={5} >
            <Button onClick={ this.onClick.bind(this,record,index) } className="col-last" type="primary">{ index==0?"添加选项":"删除"}</Button>
          </Col>
        </Row>)
    });
    return (
      <div>
        <div className="add-div">
          <Button className="editable-add-btn" onClick={this.handleAdd} type="primary">添加</Button>
        </div>
        {
          cell
        }
      </div>
    );
  }
}

@createForm()
class LocalizedModal extends Component {

  constructor(props) {
    super(props);
    this.positionInfo = [];
  }
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

  showModal (id) {
    this.setState({
      visible: true
    });
    this.handlePageChange(id)
  }

  handleOk  () {
    // const { positionInfo, dispatch } = this.props;
    // dispatch({
    //   type: 'position/addEditPosition',
    //   payload: { "positionDOs": positionInfo }
    // })
    // this.setState({
    //   visible: false
    // });


    this.props.form.validateFields((err, values) => {
      if (!err) {
        let names = [];
        // 取出数据
        Object.keys(values).map((key, index) => {
          if (key.indexOf("names-") == 0) {
            const strs = key.split('-');
            if ( strs.length >= 2 ) {
              const inx = parseInt(strs[1])
              names.push({ name: values[key], inx })
            }
          }
        });
        // 冒泡排序
        names = manager.bubbleSortByKey(names, "inx");
        // 对数据进行整合
        names.map((record, index)=>{
          let name = record;
          const index1 = index;
          // 编辑旧选项更改附带Id
          this.positionInfo.map((record, index)=>{
            const index2 = index;
            let side = record;
            if (index1 === index2) {
              name.id = side.id;
            }}
          )
        })

        let ids = this.positionInfo.map((record)=>record.id);
        names.map((record)=>{
          if (record.id) {
            ids.remove(record.id);
          }
        })


        const delIds = ids.map((record)=>{ return { id: record }});

        this.props.dispatch({
          type: 'position/saveOrModifyPosition',
          payload: { delPositionDOs:[], positionDOs:[]  }
        })
      }
    })
  }


  handleCancel () {
    this.setState({
      visible: false,
      newKey: ''
    });
  };

  addItem() {
    const { form } = this.props;
    if (this.positionInfo.length>0) {
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const side = this.positionInfo[this.positionInfo.length -1];
      const newKey = side.id > keys[keys.length -1] ? side.id+1:keys[keys.length -1]+1;

      const nextKeys = keys.concat(newKey);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    }
  }

  remove(k) {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    this.positionInfo = this.positionInfo.filter(id => id !==k);

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }



  render() {
    const { positionInfo, record, dispatch } = this.props;
    const endemic = session.get("endemic")
    this.positionInfo = positionInfo;
    const initKeys = this.positionInfo.map((record)=>record.id)

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: initKeys });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      const initValue = this.positionInfo[index] ? this.positionInfo[index].name : ""
      let rightItem = (<Button className = "editable-add-btn delBtn" onClick={ this.remove.bind(this,k) } > 删除 </Button>)
      if (index==0) {
        rightItem = (<Button  onClick={  this.addItem.bind(this) } > 添加选项 </Button>)
      }
      console.log(initValue)
      return (
        <FormItem
          key={ k }
        >
          <h4  >{ `选项${String(index+1)}` }</h4>
          <div >
            { getFieldDecorator(`names-${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '选项不能为空' }],
              initialValue: initValue,
            })(
              <Input />
            )}
          </div>
          {
            rightItem
          }
        </FormItem>
      );
    });

    return (
      <div>
        <Link onClick={() => {
          this.showModal(record.id);
          this.setState({ newKey: this.state.newKey + 1 })
        }}>查看</Link>
        <Modal width="500px"
               title="职位详情"
               onCancel={this.handleCancel.bind(this)}
               cancelText="取消"
               okText="保存"
               key={this.state.newKey}
               visible={this.state.visible}
               onOk={this.handleOk.bind(this)}
        >
          <p className="position-name"><span>职位所属：</span>{name}</p>
          {
            formItems
          }
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { positionInfo } = state.position;
  return {
    loading: state.loading.models.position,
    positionInfo
  };
}

export default connect(mapStateToProps)(LocalizedModal)
