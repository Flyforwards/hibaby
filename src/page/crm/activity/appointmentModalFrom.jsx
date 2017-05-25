
import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'

class appointmentModalFrom extends Component {
  constructor(props) {
    super(props)
  }
  handleCancel() {
    this.props.onCancel();
  }
  handleOk() {
    this.props.onOk();
  }

  onClick(on) {
    this.props.onChoose(on);
  }


  render() {
    let { visible, modalTitle  } = this.props

    return (
      <Modal
        key = { visible }
        visible = { visible }
        title = { modalTitle || "提示" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        width = { 300 }
        footer={null}
        wrapClassName = { "vertical-center-modal" }
      >
        <div>
          <Button key="1" onClick={ this.onClick.bind(this,true) }> 会员预约 </Button>
          <Button key="2" onClick={ this.onClick.bind(this,false) }> 非会员预约 </Button>
        </div>
      </Modal>
    )
  }
}

appointmentModalFrom.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string,
}

export default connect()(appointmentModalFrom)
