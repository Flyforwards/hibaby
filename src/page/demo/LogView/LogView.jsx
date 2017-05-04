"use strict"
import React, {Component} from 'react'
import {Icon, Card, Input, Select, DatePicker, Button, Table, Popconfirm, Pagination} from 'antd'
import Page from 'framework/page'
import request from 'common/request/request.js'
import FileUpload from 'component/file-upload/FileUpload.jsx'
import './LogView.scss'
const Option = Select.Option;
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
class LogView extends Component {
    constructor(props) {
        super(props)
         this.columns = [{
          title: '序号',
          dataIndex: 'number',
          width: '60px',
        }, {
          title: '角色名称',
          dataIndex: 'age',
          width: '100px',
        }, {
          title: '操作时间',
          dataIndex: 'period',
          width: '160px',
        }, {
          title: '类型',
          dataIndex: 'Pregnancy',
          width: '100px',
        },{
          title: '日志',
          dataIndex: 'tires',
          width: '440px',
        },{
          title: 'IP',
          dataIndex: 'information',
          width: '120px',
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
            }]
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    Inquire(){
        console.log("Inquire")
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
            <div className="LogView">
                <div className="LogView-nav">
                    <span className="firstInput" >操作内容<Input/></span>
                    <span className="twoInput" >操作人<Input /></span>
                    <span className="threeInput">日志类型
                    <Select labelInValue style={{ width: 200 }} className="LogViewType">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    </span>
                    <span className="fourInput">操作时间
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD"
                        />
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                        />
                    </span>
                <button  onClick={this.Inquire.bind(this)}>查询</button>
                </div>
                <div className="LogViewList">
                    <Table bordered dataSource={dataSource} columns={columns} pagination = {pagination}/>
                    <p className="allList">共计0条,范围1-10</p>
                </div>
            </div>
        )
    }
}

export default LogView
