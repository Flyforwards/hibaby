import React, { Component } from 'react';
import { Link } from 'react-router'
import { Button ,Card} from 'antd';
import './serviceComponent.scss'
/**
 * 通知单
 */
class Index extends Component {
  
  render() {
    return (
      <Card title="通知" className="noticeCard">
        <Link to='/service/send-message/production'>
          <Button>生产通知单</Button>
        </Link >
        <Link to='/service/send-message/stay'>
          <Button>入住通知单</Button>
        </Link >
        <Link to='/service/send-message/out'>
          <Button>外出通知单</Button>
        </Link >
        <Link to='/service/send-message/check-out'>
          <Button>退房通知单</Button>
        </Link >
        <Link to='/service/send-message/free'>
          <Button>自由通知单</Button>
        </Link >
      </Card>
    )
  }
}

export default Index;

