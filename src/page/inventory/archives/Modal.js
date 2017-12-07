import React from 'react';
import { connect } from 'dva';
import { parse } from 'qs'
import {PicturesWall} from './PicturesWall'
import './archives.scss'
import { Link } from 'react-router';
import {Form,Table,Checkbox, Modal,Row,Input, Col,Button,Spin,Card,TreeSelect,Select} from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;

const Option = Select.Option


const AttBaseColum = [
  {title: '属性值组', key: 'resultValue'},
  {title: '辅助属性编码', key: 'resultCoding'},
  {title: '辅助属性条码', key: 'attributeNum'},
  {title: '操作'},
]

const AttEditBaseColum = [
  {title: '编码值', key: 'resultCoding'},
  {title: '条码值', key: 'attributeNum',component:"label"},
]



function AttributeTable(props) {

  const {loading,dispatch,attributesGroupByGoodsId,columnAry} = props;

  function creatColumn(dict) {
    if(dict.title === '操作'){
      return(
        {title: '操作',width:'15%', dataIndex: 'operating',
          render: (text, record, index) => {
            return (
              <div>
                <Link className="one-link link-style" onClick={ ()=>{onLook(record)} }> 查看 </Link>
                <Link className="one-link link-style" onClick={ ()=>{onDelete(record)} }> 删除 </Link>
              </div>
            );
          },
        }
      )
    }
    else {
      return(
        {title:dict.title, dataIndex:dict.key, key:dict.key,render:(record)=>{
            return(
              record
            )
          }}
      )
    }}

  function onLook(record) {
    dispatch({type:"inventoryArchives/setEditAttModalVisible",payload:true})
    dispatch({type:"inventoryArchives/setEditingAtt",payload:record})

  }

  function onDelete(record) {
    confirm({
      title: '提示',
      content: '是否确定删除此记录',
      onOk() {
        dispatch({
          type: 'inventoryArchives/deleteAttributesGroupByResultId',
          payload: { dataId: record.id }
        })
      },
      onCancel() {
      }
    });
  }

  const  columns = [];

  for(let i = 0;i<columnAry.length;i++){
    columns.push(creatColumn(columnAry[i]))
  }
  const tableProps = {
    loading: loading.effects['roomManagement/listByPage'] !== undefined ? loading.effects['roomManagement/listByPage']:false,
    dataSource : attributesGroupByGoodsId,
    pagination:false,
    columns,
  }

  return(
    <div className="inventoryIndex">
      <Table className="info-card-center" bordered {...tableProps} />
    </div>
  )
}

function cusFromItem(props) {
  const {getFieldDecorator,dict,attributesPageList} = props
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

  let chiAry = []
  if (dict.component === "propsSelect" && attributesPageList){
    for (let i = 0;i<attributesPageList.length;i++){
      let subDict = attributesPageList[i];
      if (dict.key == subDict.id){
        chiAry = subDict.data.map(value=>{
          return <Option key={"propsSelect"+value.id} value={value.id+"|*|"+value.attributeName}>{value.attributeName}</Option>
        })
        break
      }
    }
  }


  let tempFormItem = <div/>;
  if (dict.component === "propsSelect"){
    tempFormItem = <FormItem  {...formItemLayout} label={dict.title}>
      {getFieldDecorator(dict.key,{initialValue: dict.initValue})
      (
        <Select style={{ width: "100%" }}>{chiAry}</Select>
      )}
    </FormItem>;
  }
  else if (dict.component === "imageUpload") {
    tempFormItem = <FormItem  {...formItemLayout} label={dict.title}>
      {getFieldDecorator(dict.key,{initialValue: dict.initValue})
      (
        <PicturesWall disabled={disabled} imgChange={(e)=>imgChange(e)}/>
      )}
    </FormItem>
  }
  else if (dict.component === "label") {
    tempFormItem = <FormItem  {...formItemLayout} label={dict.title}>
      <Input disabled={true} value={dict.value} style={{width: '100%'}}/>
    </FormItem>
  }
  else {
    tempFormItem = <FormItem  {...formItemLayout} label={dict.title}>
      {getFieldDecorator(dict.key, {rules: [{ required: true, message: "请输入"+dict.title }],initialValue: dict.initValue})
      (
        dict.treeSelectData ?
          <TreeSelect
            disabled={disabled}
            style={{width: '100%'}}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={dict.treeSelectData}
            placeholder="请输入"
            treeDefaultExpandAll
          />
          :
          <Input disabled={disabled} style={{width: '100%'}}/>
      )}
    </FormItem>
  }



  return (
    <Col key={dict.submitStr?dict.submitStr:dict.key} span={dict.span?dict.span:8}>
      {
        tempFormItem
      }
    </Col>

  )
}

class CreatModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {creatAttributeAry:[
        {title:'计量单位',key: 'unit',value:''},
        {title:'存货名称',key: 'name',value:''},
        {title:'规格型号',key: 'specificationModel',value:''},
        {title:'库存分类',key: 'inventoryClassesId',value:''},
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
        if(supValue.value){
          supValue.value.map(value=>{
            urlStr = urlStr + value.url + "|$|"
          })
        }
      }
    })
    //
    subMitvalues.img = urlStr;

    this.props.dispatch({type:"inventoryArchives/addInventoryFile",payload:subMitvalues})
  }


  render(){

    const creatAttributeAry = [...this.state.creatAttributeAry]
    const {inventoryFileDetail,loading,creatModelStyle} = this.props
    let colAry = [];

    let title = creatModelStyle === "creat" ? "创建" : (creatModelStyle === "detail" ? "详情" : "编辑")
    let menuBtn = creatModelStyle === "detail" ?
      <Button key="okBtn" className='button-group-bottom-2' onClick={this.onEdit.bind(this)}>编辑</Button>
      :
      <Button key="okBtn" className='button-group-bottom-2' onClick={this.onOk.bind(this)}>确定</Button>

    if (inventoryFileDetail){
      creatAttributeAry.unshift({title:'存货编码',key: 'id',value:''})
    }
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
  }

  onCancel(){
    this.props.dispatch({type:"inventoryArchives/setAttributeModalVisible",payload:false})
  }

  onOk(){
    this.onCancel()
  }

  onChange(checkedValues){
    let str = ""
    checkedValues.map(value=>{
      if (value){
        str = str + value + ","
      }
    })
    if (str){
      str = str.substring(0,str.length-1)
    }
    this.props.dispatch({type:"inventoryArchives/saveInventoryAttTableKey",payload:{goodsId:this.props.selectRowId,tableTitleKeys:str}})
  }


  addAtt(){
    this.props.dispatch({type:"inventoryArchives/setEditAttModalVisible",payload:true})
  }

  render(){
    const {attributesPageList,selectRowId,inventoryAttTableKey,editingAtt} = this.props

    let columnAry = []
    let editColumnAry = []
    inventoryAttTableKey.map(value=>{
      for(let i = 0;i<attributesPageList.length;i++){
        let subDict = attributesPageList[i];
        if (subDict.id == value){

          let chiDict = {title:subDict.name,key:subDict.id+'|*|'+subDict.name,component:"propsSelect"}
          columnAry.push(chiDict)
          editColumnAry.push(chiDict)
          break
        }
      }
    })

    columnAry = [...columnAry,...AttBaseColum]
    editColumnAry = [...editColumnAry,...AttEditBaseColum]
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
              <CheckboxGroup options={ attributesPageList.map((value,index)=>{
                return  { label: value.name, value: value.id+"" }
              })} value={inventoryAttTableKey} onChange={this.onChange.bind(this)} />
            </Row>
          </Checkbox.Group>
        </Card>



        <Card title="属性值集合" noHovering={true} className="smallCard" bodyStyle={{padding: '10px'}}  extra={<Button className={"button-group-2"} onClick={()=>{this.addAtt()}}>新增</Button>}>
          {
            <AttTable columnAry={columnAry}/>
          }
        </Card>
        <EditAttModalForm dispatch={this.props.dispatch} editingAtt={editingAtt} selectRowId={selectRowId} attributesPageList={attributesPageList} editAttModalVisible={this.props.editAttModalVisible} dataAry={editColumnAry}/>
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
    const {editingAtt} = this.props
    let atttibuteValue = editingAtt ? JSON.parse(editingAtt.attibuteValue) : {}

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values){
          let resultValue = ""
          Object.keys(values).map(key => {
            if (values[key]){
              let tempAry = []

              if (key !== "resultCoding"){
                if(values[key].indexOf("|*|") > 0){
                  tempAry = values[key].split("|*|")
                }
                else {
                  if (editingAtt){
                    values[key] = attibuteValue[key]
                    tempAry = attibuteValue[key].split("|*|")
                  }
                }
                resultValue = resultValue + tempAry[1] + ","
              }
            }

          })

          if (resultValue){
            resultValue = resultValue.substring(0,resultValue.length - 1)
          }

          let resultCoding = values.resultCoding;
          delete values.resultCoding;

          let payloadData = {
            "attibuteValue": JSON.stringify(values),
            "goodsId": this.props.selectRowId,
            "resultCoding": resultCoding,
            "resultValue": resultValue
          };

          if(this.props.editingAtt){
            payloadData.id = this.props.editingAtt.id
          }

          this.props.dispatch({type:"inventoryArchives/saveGoodsByAttributesAndId",payload:payloadData})
        }
        this.onCancel()

      }
    })

  }


  render(){
    const {editAttModalVisible,dataAry,attributesPageList,editingAtt} = this.props
    const {getFieldDecorator} = this.props.form

    console.log(editingAtt)

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
                  value.key = value.key.split("|*|")[0]
                  if (editingAtt){
                    value.initValue = editingAtt[value.key];
                  }
                  else{
                    value.initValue = "";
                  }
                  return cusFromItem({getFieldDecorator:getFieldDecorator,dict:{ ...value,span:12},attributesPageList})
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
