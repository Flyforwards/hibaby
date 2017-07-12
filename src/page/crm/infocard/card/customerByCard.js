/**
 * Created by Flyforwards on 2017/5/25.
 */

import moment from 'moment'
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Form, Input,DatePicker,Table, Card,InputNumber,Row,Col, } from 'antd';
const FormItem = Form.Item;
import { Link } from 'react-router';
import './card.scss';
import DictionarySelect from 'common/dictionary_select';
import {routerRedux} from 'dva/router';
const { MonthPicker } = DatePicker
import { parse } from 'qs'

const createForm = Form.create

@createForm()
class CustomerByCard extends Component {

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
      dataIndex: 'operator2',
      key: 'operator2'
    }];
  }


  onSearch(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const query = parse(location.search.substr(1))
        if (values.time != undefined) {
          values.year = values.time.get('year');
          values.month = values.time.get('month')+1;
        }
        this.props.dispatch({
          type: "card/getCustomerPage",
          payload: {...values,member:query.dataId}
        })
      }
    })
  }

  reset() {
    const { pathname } = location;
    const query = parse(location.search.substr(1))
    this.props.dispatch(routerRedux.push({
      pathname,
      query
    }))
    this.props.form.resetFields()
  }


  render() {
    const { form , loading, userPagination,list } = this.props;
    const { getFieldDecorator } = form;
    const formChooseOneLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span: 10 }
    }
    const formChooseLayout = {
      labelCol:{ span: 10 },
      wrapperCol:{ span: 14 }
    }
    const values = parse(location.search.substr(1))
    const tableProps = {
      loading: loading.effects['card/getCustomerPage'],
      dataSource : list ,
      pagination: userPagination,
      onChange (page) {
        dispatch({
          type: 'card/getCustomerPage',
          payload: {
            member: values.dataId,
            page: page.current,
            size: page.pageSize,
          }
        })
      },
    }
    return (
      <div className="info-card-cent">
      <Card>
        <div className="card-title">
          <h3>客户列表:</h3>
        </div>
        <Form>
          <div>
            <Row className="topTitleInfo">
              <Col span={10} style={{float:'left'}}>
                <FormItem {...formChooseLayout} style={{height:'40px',lineHeight:'40px'}} >
                  {getFieldDecorator('sear', {rules: [{ required: false }],
                  })(
                    <Input placeholder="输入客户编号、客户姓名、联系方式、合同编号" style={{height:'40px'}}/>
                  )}
                </FormItem>
              </Col>
              <Col span={4} style={{ float:'left'}}>
                <span>
                  <Button onClick={ this.onSearch.bind(this)} style={{width:'136px',backgroundColor:'rgba(182, 114, 51, 1)',height:'40px',lineHeight:'40px',color:'#ffffff'}}>查询</Button>
                </span>
              </Col>
              <Col span={4} style={{ float:'left'}}>
                <span>
                  <Button onClick={ this.reset.bind(this)} style={{width:'136px',backgroundColor:'#f1e8df',borderColor:'#bb7c41',height:'40px',lineHeight:'40px',color:'#b67233'}}>重置</Button>
                </span>
              </Col>
            </Row>
          </div>
          <Row className="titleInfo">
            <Col span={4} style={{width:'140px'}}>
              <FormItem {...formChooseOneLayout}  label="年龄" >
                {getFieldDecorator('age1', {rules: [{ required: false }],
                })(
                  <InputNumber style={{width: "80px"}} min={1} max={100}  />
                )}
              </FormItem>
            </Col>
            <Col span={3}  style={{width:'80px'}}>
              <FormItem {...formChooseLayout} style={{width:'100%'}}>
                {getFieldDecorator('age2', {rules: [{ required: false }],
                })(
                  <InputNumber min={1} max={100} style={{width: "80px"}} />
                )}
              </FormItem>

            </Col>
            <Col span={4} style={{width:'200px'}}>
              <FormItem {...formChooseOneLayout}  label="预产期" >
                {getFieldDecorator('time', {rules: [{ required: false }],
                })(
                  <MonthPicker
                    placeholder="请选择"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4} style={{width:'200px'}}>
              <FormItem  {...formChooseOneLayout} label="第几胎" >
                {getFieldDecorator('fetus', {rules: [{ required: false }],
                })(
                  <DictionarySelect  placeholder="请选择" selectName="FETUS" />
                )}
              </FormItem>
            </Col>
            <Col span={4} style={{width:'200px'}}>
              <FormItem  {...formChooseOneLayout} label="操作者2" >
                {getFieldDecorator('operator2', {rules: [{ required: false }],
                })(
                  <Input max={40}  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table {...tableProps} bordered size="small" rowKey = { record=>record.id } columns={ this.columns }/>
      </Card>
      </div>
    )
  }
}

export default connect()(CustomerByCard)
