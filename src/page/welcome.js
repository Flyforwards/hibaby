
import React, { Component } from 'react';
import Page from '../framework/page'
import { Icon } from 'antd'
import './not-found/style.less'

class welcome extends Component {

  render() {

    return (
      <Page loading={false} title="null">
      <div className='error-404'>
      <Icon type='frown-o'/>
      <h1>还未添加菜单</h1>
      </div>
      </Page>
    )
  }
}


export default welcome;
