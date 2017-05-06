
import React from 'react'
import { connect } from 'dva'
import { Select, Button, DatePicker, Table, Input, Icon, Popconfirm, Pagination, Tree} from 'antd'


class ModuleItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Table >
        </Table>
      </div>
    )
  }
}

function Module() {
  return (
    <div>
      <ModuleItem></ModuleItem>
    </div>
  );
}

export default connect()(Module)
