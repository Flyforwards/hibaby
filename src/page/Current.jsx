import React, {Component} from 'react'
class Current extends React.Component {
  render() {
    let range = this.props.range;
    return (range ?
      <div style={{marginTop:'-42px'}}>
      <p> 第 {
        this.props.page
      }
      页, 共 {
        this.props.range.totalpage
      }页, 范围 : {
        this.props.range.start
      } - {
        this.props.range.end
      }
       </p> </div> : null)
  }
}
export default Current
