import React, { Component } from 'react';
import { Link } from 'react-router'
import { Button } from 'antd';

/**
 * 通知单
 */
class Index extends Component {
  
  render() {
    return (
      <div>
        <Link to='/service/send-message/production'>
          <Button>生产通知单</Button>
        </Link >
        <Link to='/service/stay-message/production'>
          <Button>入住通知单</Button>
        </Link >
      
      </div>
    )
  }
}

export default Index;

