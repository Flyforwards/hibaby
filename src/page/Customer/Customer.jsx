import React from 'react'
import './index.scss'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
class Customer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            createModalVisible: false
        }
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
    render() {
        return (
            <main className="yt-admin-framework-Customer">
            <div className="Customer-nav">
               <input placeholder='请输入客户编号、客户姓名、联系方式、合同编号....' />
                <span className="search"><Button type="primary">搜索</Button></span>
                <span className="screening"><Button type="primary" onClick={this.showCreateModal.bind(this)}>筛选项</Button></span>
                <span className="customer"><Button type="primary">新增客户</Button></span>
            </div>
            <div className="Customer-navigation">
                <div className="age">年龄<input type="number" min="1"/>至<input type="number" min="1"/></div>
                <div className="Membership">会员身份
                    <Select defaultValue="请选择" style={{ width: 150 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="时尚">请选择</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className="hospitals">生产医院
                    <Select defaultValue="请选择" style={{ width: 150 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="时尚">请选择</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className="period">预产期 
                   <Select defaultValue="请选择" style={{ width: 150 }}>
                      <Option value="jack">1</Option>
                      <Option value="时尚">2</Option>
                      <Option value="disabled">3</Option>
                      <Option value="Yiminghe">4</Option>
                    </Select>
                    <Select defaultValue="请选择" style={{ width:150}}>
                      <Option value="jack">2015</Option>
                      <Option value="时尚">2016</Option>
                      <Option value="disabled">2017</Option>
                      <Option value="Yiminghe">2018</Option>
                    </Select>
                </div>
                <div className="current">现住址
                    <Select defaultValue="请选择" style={{ width:150}}>
                      <Option value="jack">2015</Option>
                      <Option value="时尚">2016</Option>
                      <Option value="disabled">2017</Option>
                      <Option value="Yiminghe">2018</Option>
                    </Select>
                </div>  
            </div>   
            <CreateModal
                visible={ this.state.createModalVisible }
                onCancel={ this.handleCreateModalCancel.bind(this) }
            />
            </main>
        )
    }
}

export default Customer
