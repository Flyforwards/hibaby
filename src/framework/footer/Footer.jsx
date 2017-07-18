
import React from 'react'
import { Button } from 'antd'
import './index.scss'
class Footer extends React.Component {
    constructor(props) {
        super(props)
      this.state = {
        style: 'show',
      }
    }

    hidden() {
      this.setState({
        style: 'hidden',
      })
    }
    show() {
      this.setState({
        style: 'show',
      })
    }


    render() {
      const { style } = this.state;
      let footer = null;
      if ( style == 'show') {
        footer = <footer className="my-footer">
          <Button className='my-footer-btn' onClick={this.hidden.bind(this)}>隐藏</Button>
          <p>Copyright © 2017, 凯贝姆 & 月子中心.Version2.0.26</p>
        </footer>
      } else {
        footer = <Button className='my-footer-btn' onClick={this.show.bind(this)}>显示</Button>
      }
      return footer
    }
}
export default Footer
