import React from 'react';
import { connect } from 'dva';
import { parse } from 'qs'
import {PicturesWall} from './PicturesWall'
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
  const {getFieldDecorator,dict,} = props
  let disabled = dict.isDetail
  let formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
  };

  if (dict.span === 24){
    formItemLayout = {
      labelCol: {span: dict.component === "imageUpload" ? 2 : 5},
      wrapperCol: {span: dict.component === "imageUpload" ? 22 : 19},
    };
  }

  function imgChange(e){
    dict.value = e
  }



  return (
    <Col key={dict.submitStr?dict.submitStr:dict.key} span={dict.span?dict.span:8}>
      {
        dict.component === "imageUpload"?
          <FormItem  {...formItemLayout} label={dict.title}>
            {getFieldDecorator(dict.key,{initialValue: dict.initValue})
            (
             <PicturesWall disabled={disabled} imgChange={(e)=>imgChange(e)}/>
            )}
          </FormItem>
          :
          <FormItem  {...formItemLayout} label={dict.title}>
            {getFieldDecorator(dict.key, {rules: [{ required: true, message: 'Please input your username!' }],initialValue: dict.initValue})
            (
              dict.treeSelectData ?
                <TreeSelect
                  disabled={disabled}
                  style={{width: '100%'}}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={dict.treeSelectData}
                  placeholder="Please select"
                  treeDefaultExpandAll
                />
                :
                <Input disabled={disabled} style={{width: '100%'}}/>
            )}
          </FormItem>
      }
    </Col>

  )
}

class CreatModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {creatAttributeAry:[
      // {title:'存货编码',key: 'id',value:''},
      {title:'计量单位',key: 'unit',value:''},
      {title:'存货名称',key: 'name',value:''},
      {title:'规格型号',key: 'specificationModel',value:''},
      {title:'库存分类',key: 'inventoryClasses',value:''},
      {title:'最大库存',key: 'maxStorage',value:''},
      {title:'进货价格',key: 'purchasePrice',value:''},
      {title:'最小库存',key: 'minStorage',value:''},
      {title:'销售价格',key: 'price',value:''},
      {title:'备注',key: 'remarks',value:''},
      {title:'图片',key: 'img',component:"imageUpload",span:24,value:''},
    ],imgAry:[]}
  }

  componentDidMount(){}

  onCancel(){
    this.props.dispatch({type:"inventoryArchives/setCreatModalVisible",payload:false})
  }

  onEdit(){
    this.props.dispatch({type:"inventoryArchives/setCreatModelStyle",payload:"edit"})
  }

  onOk(){
    let subMitvalues = {}
    this.props.form.validateFields((err, values) => {
      if (!err) {
        subMitvalues = values;
      }
    })
    let urlStr = ""


    this.state.creatAttributeAry.map(supValue=>{
      if (supValue.key === "img"){
        supValue.value.map(value=>{
          urlStr = urlStr + value.url + "|$|"
        })
      }
    })
    //
    subMitvalues.img = urlStr;
    // subMitvalues.status = 0
    // subMitvalues.inventoryClasses = "dddd"

      this.props.dispatch({type:"inventoryArchives/addInventoryFile",payload:subMitvalues})


  }


  render(){

    const {creatAttributeAry} = this.state
    const {inventoryFileDetail,loading,creatModelStyle} = this.props
    let colAry = [];

    let title = creatModelStyle === "creat" ? "创建" : (creatModelStyle === "detail" ? "详情" : "编辑")
    let menuBtn = creatModelStyle === "detail" ?
      <Button key="okBtn" className='button-group-bottom-2' onClick={this.onEdit.bind(this)}>编辑</Button>
      :
      <Button key="okBtn" className='button-group-bottom-2' onClick={this.onOk.bind(this)}>确定</Button>



    creatAttributeAry.map(value=>{
      value.initValue = inventoryFileDetail? inventoryFileDetail[value.key] : ""
    })



    return (
      <Modal title={"存货档案-"+title} visible={this.props.creatModalVisible}
              width="1000px"
              maskClosable
              className="addCustomer"
              closable={false}
              onCancel={this.onCancel.bind(this)}
              footer={[
                <Button key="cancelBtn" className='button-group-bottom-1' onClick={this.onCancel.bind(this)}>取消</Button>,
                menuBtn
              ]}
      >
        <Spin
          spinning={loading.effects['inventoryArchives/getInventoryFileDetailById'] !== undefined ? loading.effects['inventoryArchives/getInventoryFileDetailById'] : false}>


          <Form >
            {
              creatAttributeAry.map((value,index)=>{
                if (creatModelStyle === "detail"){
                  value.isDetail = true
                }
                else {
                  value.isDetail = false
                }
                if (value.title == "库存分类"){
                  value.treeSelectData = this.props.treeSelectData
                }
                colAry.push(cusFromItem({getFieldDecorator:this.props.form.getFieldDecorator,dict:value}))
                if (colAry.length === 3||value.span === 24){
                  let tempAry = colAry;
                  colAry = []
                  return <Row key={"CreatModal"+index}>{tempAry}</Row>
                }

              })
            }
            {colAry.length > 0 ? <Row key={"CreatModal"+creatAttributeAry.length}>{colAry}</Row> : ""}
            {colAry = []}
          </Form>
        </Spin>
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

  onCancel(){
    this.props.dispatch({type:"inventoryArchives/setAttributeModalVisible",payload:false})
  }

  onOk(){
    this.onCancel()
  }

  onChange(checkedValues){
    let checkedValueColum = checkedValues.map(value=>{

      return {title:value.split("|*|")[1],key:value,component:"propsSelect"}
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
    const {attributesPageList} = this.props

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
              {attributesPageList.map((value,index)=>{
                return <Col span={4} key={"Attribute"+value.id  + "|*|" + value.name}><Checkbox className="AttCheckbox" value={value.id  + "|*|" + value.name}>{value.name}</Checkbox></Col>
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
              width="800px"
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
                  return cusFromItem({getFieldDecorator:getFieldDecorator,dict:{ ...value,span:12}})
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
