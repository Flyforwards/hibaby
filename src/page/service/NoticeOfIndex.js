
import React, { Component } from 'react';
import { Link} from 'react-router'
import {Button} from 'antd';

/**
 * 通知单
 */
class Index extends Component {

  render() {
    return (

      <Link to = '/service/send-message/production'>
        <Button>生产通知单</Button>
      </Link >


    )
  }
}

export default Index;

