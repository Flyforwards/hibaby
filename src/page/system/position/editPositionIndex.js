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

class DetailTable extends Component {
  constructor(props) {
    super(props);
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
        </Row>)
    });
    return (
      <div>
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
    this.state = {
      visible: false,
    }
  }

  showModal (id) {
    // 获取部门职位信息
    this.props.dispatch({
      type: 'position/getPositionInfo',
      payload: {
        dataId: id
      }
    })
    this.deptId = id;
    this.setState({
      isDetail: true,
      visible: true
    });
  }

  handleOk  () {

    this.props.form.validateFields((err, values) => {
      const v = {};

      Object.keys(values).map((key, index)=>{
        const record = values[key];
        const strs = key.split('-');
        if (values.keys.contains(Number(strs[1]))) {
          v[key]=record;
        }
      })

      if (!err) {
        let names = [];
        // 取出数据
        Object.keys(v).map((key, index) => {
          if (key.indexOf("names-") == 0) {
            const strs = key.split('-');
            if ( strs.length >= 2 ) {
              const inx = parseInt(strs[1])
              names.push({ name: values[key], inx })
            }
          }
        });
        // 冒泡排序
          names.bubbleSortByKey("inx");
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
          payload: { delPositionDOs:delIds, deptId:this.deptId, positionDOs:names  }
        })

        this.handleCancel();
      }
    })
  }


  handleCancel () {
    this.props.form.resetFields()
    this.setState({
      visible: false,
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
    } else {
      const keys = form.getFieldValue('keys');
      const newKey = keys[keys.length -1]+1;

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

  edit() {
    this.setState({
      isDetail: false,
    });
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (this.positionInfo==0) {
      form.setFieldsValue({
        keys: [1],
      });
    }
  }

  cancelEdit() {
    const initKeys = this.positionInfo.map((record)=>record.id)
    this.props.form.setFieldsValue({
      keys: initKeys,
    });
    this.setState({
      isDetail: true,
    });
  }


  render() {
    const { positionInfo, record } = this.props;
    this.positionInfo = positionInfo;

    let cancel = this.handleCancel.bind(this);
    let right = this.edit.bind(this);
    let formItems = (<DetailTable positionInfo={positionInfo}/>)
    let rightText = "编辑";

    if (!this.state.isDetail){
      let initKeys = this.positionInfo.map((record)=>record.id)
      const { getFieldDecorator, getFieldValue } = this.props.form;
      getFieldDecorator('keys', { initialValue: initKeys });
      const keys = getFieldValue('keys');
      cancel = this.cancelEdit.bind(this);
      right = this.handleOk.bind(this);
      rightText = "保存";
      formItems = keys.map((k, index) => {
        const initValue = this.positionInfo[index] ? this.positionInfo[index].name : ""
        let rightItem = (<Button onClick={ this.remove.bind(this,k) } > 删除 </Button>)
        if (index==0) {
          rightItem = (<Button  onClick={  this.addItem.bind(this) } > 添加选项 </Button>)
        }
        return (
          <FormItem
            key={ k }
          >
            <h4  >{ `选项${String(index+1)}` }</h4>
            <div >
              { getFieldDecorator(`names-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, message: '不为空且长度最多20！', max: 20 }],
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
    }

    return (
      <div className="editPositionIndex">
        <Link onClick={  this.showModal.bind(this, record.id) }>查看</Link>
        <Modal width="500px"
               title="职位详情"
               onCancel={ cancel }
               onOk={ right }
               cancelText="取消"
               okText= { rightText }
               key={ this.state.visible }
               visible={ this.state.visible }
        >
          <p className="position-name"><span>职位所属：</span>{name}</p>
          <Form key={  this.state.visible }>
            {
              formItems
            }
          </Form>
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
