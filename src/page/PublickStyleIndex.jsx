
import React, { Component } from 'react';
import Page from '../framework/page'
import { Icon, Card, Button } from 'antd'
import { Link } from 'react-router';

class PublickStyleIndex extends Component {

  render() {

    return (
      <Page loading={false} title="公共样式">
        <Card title="按钮">
          <div>
            <Button style={{ marginLeft: '10px' }} className='one-button'>按钮-style1</Button>
            <Button style={{ marginLeft: '10px' }} className='one-button'>按钮按钮按钮-style1</Button>
            <Button style={{ marginLeft: '10px' }} className='one-button'>按钮按钮按钮按钮按钮按钮-style1</Button>
          </div>
          <div style={{ marginTop: '10px'}}>
            <Button style={{ marginLeft: '10px' }} className='two-button'>按钮-style2</Button>
            <Button style={{ marginLeft: '10px' }} className='two-button'>按钮按钮按钮-style2</Button>
            <Button style={{ marginLeft: '10px' }} className='two-button'>按钮按钮按钮按钮按钮按钮-style2</Button>
          </div>
          <div style={{ marginTop: '10px'}}>
            <Button style={{ marginLeft: '10px' }} className='button-group-1'>按钮-group-style1</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-2'>按钮-group-style2</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-3'>按钮-group-style3</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-1'>按钮按钮-group-style1</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-2'>按钮按钮-group-style2</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-3'>按钮按钮-group-style3</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-1'>按钮按钮按钮按钮-group-style1</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-2'>按钮按钮按钮按钮-group-style2</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-3'>按钮按钮按钮按钮-group-style3</Button>
          </div>
          <div style={{ marginTop: '10px'}}>
            <Button style={{ marginLeft: '10px' }} className='button-group-bottom-1'>按钮按钮-group-bottom-style1</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-bottom-2'>按钮按钮-group-bottom-style2</Button>
            <Button style={{ marginLeft: '10px' }} className='button-group-bottom-3'>按钮按钮-group-bottom-style3</Button>
          </div>
        </Card>
        <Card title="link">
          <div>
            <Link className="one-link">链接样式一</Link>
          </div>
          <div>
            <Link className="two-link">链接样式二</Link>
          </div>
        </Card>
      </Page>
    )
  }
}


export default PublickStyleIndex;
