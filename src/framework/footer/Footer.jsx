import React from 'react'
import './index.scss'
class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <footer className="my-footer">
              <p>Copyright © 2017, 凯贝姆 & 月子中心.Version 2.0.1</p>
            </footer>
        )
    }
}
export default Footer
