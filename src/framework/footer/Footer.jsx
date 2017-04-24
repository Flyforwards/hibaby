import React from 'react'
import './index.scss'
class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <footer className="my-footer">
              <p>Copyright © 2014, HarMoniCare Woman & Children's Hospital.</p>
            </footer>
        )
    }
}
export default Footer
