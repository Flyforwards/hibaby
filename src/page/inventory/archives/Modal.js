import React from 'react';
import { connect } from 'dva';
import { parse } from 'qs'
import './archives.scss'
import {Form,Table,Checkbox, Modal,Row,Input, Col,Button,Spin,Card,TreeSelect} from 'antd';
const FormItem = Form.Item;

const AttBaseColum = [
  {title: '属性值组', key: 'attributeStr'},
  {title: '辅助属性编码', key: 'attributeCode'},
  {title: '辅助属性条码', key: 'attributeNum'},
  {title: '操作'}
  ]

function AttributeTable(props) {

  const {loading,dispatch,list,columnAry} = props;

  function textforkey(array,value,valuekey = 'name') {
    if(array){
      for (let i = 0 ;i<array.length ;i++){
        let dict = array[i];
        if(dict['id'] === value){
          return  dict[valuekey];
        }
      }
    }
    else {
      return value
    }
  }

  function creatColumn(dict) {
      return(
        {title:dict.title, dataIndex:dict.key, key:dict.key,render:( record)=>{
          return(
            record
          )
        }}
      )
  }

  function onLook(record) {
    dispatch(routerRedux.push({
      pathname: '/crm/customer/order/detail',
      query: {orderid:record.id}
    }))
  }

  const  columns = [];

  for(let i = 0;i<columnAry.length;i++){
    columns.push(creatColumn(columnAry[i]))
  }
  const tableProps = {
    loading: loading.effects['roomManagement/listByPage'] !== undefined ? loading.effects['roomManagement/listByPage']:false,
    dataSource : list,
    pagination: {
      showQuickJumper: true,
      showTotal: orderTotal => `共 ${orderTotal} 条`,
    },
    columns,
    onChange (page) {
      const query = parse(location.search.substr(1))
      dispatch({type:"order/getOrderList",payload:{customerId:query.dataId,page:page}})
    }
  }

  return(
    <div className="inventoryIndex">
      <Table className="info-card-center" bordered {...tableProps} />
    </div>
  )
}

function cusFromItem(props) {
  const {getFieldDecorator,dict} = props
  let formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
  };

  if (props.span == 24){
    formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    };
  }

  return (
    <Col key={dict.submitStr?dict.submitStr:dict.key} span={dict.span?dict.span:8}>
      <FormItem  {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.key, {initialValue: dict.initValue})
        (
            dict.treeSelectData ?
            <TreeSelect
              style={{width: '100%'}}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={dict.treeSelectData}
              placeholder="Please select"
              treeDefaultExpandAll
            />
            :
            <Input style={{width: '100%'}}/>
        )}
      </FormItem>
    </Col>

  )
}

class CreatModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {creatAttributeAry:[
      {title:'存货编码',key: 'id'},
      {title:'计量单位',key: 'unit'},
      {title:'存货名称',key: 'name'},
      {title:'规格型号',key: 'specificationModel'},
      {title:'库存分类',key: 'inventoryClasses'},
      {title:'最大库存',key: 'maxStorage'},
      {title:'进货价格',key: 'purchasePrice'},
      {title:'最小库存',key: 'minStorage'},
      {title:'销售价格',key: 'price'},
      {title:'remarks',key: 'remark'},
      {title:'图片',key: 'img'},
    ]}
  }

  componentDidMount(){

  }

  onCancel(){
    this.props.dispatch({type:"inventoryArchives/setCreatModalVisible",payload:false})
  }

  onOk(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.dispatch({type:"inventoryArchives/addInventoryFile",payload:values})

      }
    })
    // this.onCancel()

  }


  render(){

    const {creatAttributeAry} = this.state
    let colAry = [];

    return (
      <Modal title={"存货档案-新增"} visible={this.props.creatModalVisible}
              width="1000px"
              maskClosable
              className="addCustomer"
              closable={false}
              onCancel={this.onCancel.bind(this)}
              footer={[
                <Button key="cancelBtn" className='button-group-bottom-1' onClick={this.onCancel.bind(this)}>取消</Button>,
                <Button key="okBtn" className='button-group-bottom-2' onClick={this.onOk.bind(this)}> 确定</Button>
              ]}
      >
        <Row>
          <Form >
            {
              creatAttributeAry.map((value,index)=>{
                if (value.title == "库存分类"){
                  value.treeSelectData = this.props.treeSelectData
                }
                colAry.push(cusFromItem({getFieldDecorator:this.props.form.getFieldDecorator,dict:value}))
                if (colAry.length === 3){
                  let tempAry = colAry;
                  colAry = []
                  return <Row key={"CreatModal"+index}>{tempAry}</Row>
                }

              })
            }
            {colAry.length > 0 ? <Row key={"CreatModal"+creatAttributeAry.length}>{colAry}</Row> : ""}
            {colAry = []}
          </Form>
        </Row>

      </Modal>
    )
  }
}

class AttributeModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      columnAry:[...AttBaseColum]
    }
  }

  componentDidMount(){

  }

  onCancel(){
    this.props.dispatch({type:"inventoryArchives/setAttributeModalVisible",payload:false})
  }

  onOk(){
    this.onCancel()
  }

  onChange(checkedValues){
    let checkedValueColum = checkedValues.map(value=>{
      return {title:value,key:value}
    })

    this.setState({
      columnAry:[...checkedValueColum,...AttBaseColum]
    })
  }


  addAtt(){
    this.props.dispatch({type:"inventoryArchives/setEditAttModalVisible",payload:true})
  }

  render(){
    const {columnAry} = this.state

    return (
      <Modal className="smallCard" bodyStyle={{padding: '10px'}}  title={"辅助属性"} visible={this.props.attributeModalVisible}
              width="1000px"
              className="addCustomer"
              closable={false}
              onCancel={this.onCancel.bind(this)}
              footer={[
                <Button key="cancelBtn" className='button-group-bottom-1' onClick={this.onCancel.bind(this)}>取消</Button>,
                <Button key="okBtn" className='button-group-bottom-2' onClick={this.onOk.bind(this)}> 确定</Button>
              ]}
      >
        <Card title="选择属性" noHovering={true} className="smallCard" bodyStyle={{padding: '10px'}}>
          <Checkbox.Group onChange={this.onChange.bind(this)}>
            <Row>
              {['A','B','C','D','E','F','G'].map((value,index)=>{
                return <Col span={4} key={"Attribute"+index}><Checkbox className="AttCheckbox" value={value}>{value}</Checkbox></Col>
              })}
            </Row>
          </Checkbox.Group>
        </Card>



        <Card title="属性值集合" noHovering={true} className="smallCard" bodyStyle={{padding: '10px'}}  extra={<Button className={"button-group-2"} onClick={()=>{this.addAtt()}}>新增</Button>}>
          {
            <AttTable columnAry={columnAry}/>
          }
        </Card>
        <EditAttModalForm dispatch={this.props.dispatch} editAttModalVisible={this.props.editAttModalVisible} dataAry={columnAry}/>
      </Modal>
    )
  }
}

class EditAttModal extends React.Component{
  constructor(props) {
    super(props);
  }


  onCancel(){
    this.props.dispatch({type:"inventoryArchives/setEditAttModalVisible",payload:false})
  }

  onOk(){
    this.onCancel()
  }

  creatColumn(dict) {
    return(
      {title:dict.title, dataIndex:dict.key, key:dict.key,render:( record)=>{
        return(
          record
        )
      }}
    )
  }


  render(){
    const {editAttModalVisible,dataAry} = this.props
    const {getFieldDecorator} = this.props.form
    return (
      <Modal  title={"辅助属性"} visible={editAttModalVisible}
              width="500px"
              className="addCustomer"
              closable={false}
              onCancel={this.onCancel.bind(this)}
              footer={[
                <Button key="cancelBtn" className='button-group-bottom-1' onClick={this.onCancel.bind(this)}>取消</Button>,
                <Button key="okBtn" className='button-group-bottom-2' onClick={this.onOk.bind(this)}> 确定</Button>
              ]}
      >
        <Row>
          <Form>
            {
              dataAry?dataAry.map(value=>{
                if (value.key){
                  return cusFromItem({getFieldDecorator:getFieldDecorator,dict:{ ...value,span:24}})
                }
              }):""
            }
          </Form>
        </Row>
      </Modal>
    )
  }
}


const CreatModalForm = Form.create()(CreatModal);
const EditAttModalForm = Form.create()(EditAttModal);


function mapStateToProps(state) {
  return{
    ...state.inventoryArchives,
    loading: state.loading,
  };
}

const AttTable = connect(mapStateToProps)(AttributeTable)


module.exports = {
  CreatModalForm: connect(mapStateToProps)(CreatModalForm),
  AttributeModal: connect(mapStateToProps)(AttributeModal)
}
