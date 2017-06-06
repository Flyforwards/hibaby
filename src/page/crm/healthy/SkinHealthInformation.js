/**
 * 客户信息》健康档案》美研中心孕期健康挡案
 * Created by yangjingjing on 2017/6/1.
 */
import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import { Form,Row,Col,Radio,Input,Button,message } from 'antd';
import './SkinHealthInformation.scss'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const createForm = Form.create
const type = 3;//美研中心孕期健康挡案
@createForm()
class SkinHealthInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 }
  }

  //单选框
  radioInput(inputTitle,inputName,required,data,message,fun){
    let { getFieldDecorator } = this.props.form;
    let radioItems = [];
    for(let i=0;i<data.length;i++){
      radioItems.push(<Radio key={data[i].value} value={data[i].value}>{data[i].name}</Radio>);
    }
    return(
      <FormItem
        {...this.formItemLayout}
        label={inputTitle}
      >
        {getFieldDecorator(`${inputName}`, {
          rules: [{ required: required, message: message }]
        })(
          <RadioGroup>
            {radioItems}
          </RadioGroup>
        )}
      </FormItem>
    )
  }
  //文本输入框
  myInput(inputTitle,inputName,unit,required,message) {
    let { getFieldDecorator } = this.props.form;
    return(
      <FormItem
        {...this.formItemLayout}
        label={inputTitle}
      >
        {getFieldDecorator(`${inputName}`, {
          rules: [{ required: required, message: `${message}` }]
        })(
          <Input
            suffix={unit}
          />
        )}
      </FormItem>
    );
  }

  handleBack() {
    this.props.dispatch(routerRedux.push('/crm/customer'));
  }

  handleSubmit(){
    //console.log("您点击了保存按钮");
    const {dispatch} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const healthInfo = JSON.stringify(values);
        dispatch({
          type: 'healthInformation/saveHealthInformation',
          payload: {
            healthInfo : healthInfo,
            type : type,
            customerId : this.props.customerId
          }
        });


      }
    });
  }



  render(){
    return (
      <div className="skinHealthInformationDiv">
        <Form className="tableForm">
          <Row className="firstItem" key="1">
            <Col className="firstItemLeft" span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('看过皮肤科','1',false,[{value:0,name:'否'},{value:1,name:'是'}],'该项是必填项')}
            </Col>
            <Col span="10" style={{height: '55px',display: 'table'}}>
              {this.myInput('诊断','2',null,false,'请输入孕前体重')}
            </Col>
          </Row>

          <Row className="firstItem" key="2">
            <Col className="firstItemLeft" span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('镇定剂','3',false,[{value:0,name:'否'},{value:1,name:'是'}],'该项是必填项')}
            </Col>
            <Col span="10" style={{height: '55px',display: 'table'}}>
              {this.myInput('药名','4',null,false,'请输入药名')}
            </Col>
          </Row>

          <Row className="firstItem" key="3">
            <Col className="firstItemLeft" span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('服用药物','5',false,[{value:0,name:'否'},{value:1,name:'是'}],'该项是必填项')}
            </Col>
            <Col span="10" style={{height: '55px',display: 'table'}}>
              {this.myInput('药名','6',null,false,'请输入药名')}
            </Col>
          </Row>

          <Row className="firstItem" key="4">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('消化','7',false,[{value:'佳',name:'佳'},{value:'消化不良',name:'消化不良'},
                {value:'腹胀',name:'腹胀'},{value:'胃灼热感',name:'胃灼热感'},{value:'恶心',name:'恶心'},
                {value:'呕吐',name:'呕吐'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem" key="5">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('排泄','8',false,[{value:'正常',name:'正常'},{value:'腹泻',name:'腹泻'},
                {value:'便秘',name:'便秘'},{value:'经常憋尿',name:'经常憋尿'},{value:'频尿',name:'频尿'},
                {value:'尿潴留',name:'尿潴留'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem medicalHistory" key="6">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.myInput('过去疾病史','9',null,false,'请输入过去疾病史',null)}
            </Col>
          </Row>

          <Row className="firstItem medicalHistory" key="7">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.myInput('手术史','10',null,false,'请输入手术史',null)}
            </Col>
          </Row>

          <Row className="firstItem" key="8">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('情绪','11',false,[{value:'不稳定',name:'不稳定'},{value:'紧张',name:'紧张'},
                {value:'激动',name:'激动'},{value:'兴奋',name:'兴奋'},{value:'低落',name:'低落'},
                {value:'安定',name:'安定'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem" key="9">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('皮肤厚度','12',false,[{value:'厚',name:'厚'},{value:'中等',name:'中等'},
                {value:'薄',name:'薄'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem" key="10">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('水分','13',false,[{value:'适中',name:'适中'},{value:'差',name:'差'},
                {value:'一般',name:'一般'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem" key="11">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('皮肤代谢状况','14',false,[{value:'正常',name:'正常'},{value:'异常',name:'异常'},
                {value:'一般',name:'一般'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem" key="12">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('皮肤健康状况','15',false,[{value:'极佳',name:'极佳'},{value:'良好',name:'良好'},
                {value:'一般',name:'一般'},{value:'偏黄',name:'偏黄'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem" key="13">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('曾对护肤品过敏','16',false,[{value:'有',name:'有'},{value:'无',name:'无'}],'该项是必填项')}
            </Col>
          </Row>

          <Row className="firstItem" key="14">
            <Col span="10"  style={{height: '55px',display: 'table'}}>
              {this.radioInput('曾接受过换肤','17',false,[{value:'有',name:'有'},{value:'无',name:'无'}],'该项是必填项')}
            </Col>
          </Row>

          <Row  className="firstItem" key="15">
            <Col className="firstItemTitle" span="3" style={{display: 'table'}}>
              <div className="itemTitle">皮肤问题</div>
            </Col>
            <Col span="20" style={{display: 'table',width:'87.5%'}}>
              <Row  className="firstItem" key="16">
                <Col className="skinInfo skinOtherInfo" span="10" style={{height: '110px',display: 'table'}}>
                  {this.radioInput('粉刺','18',false,[{value:'化妆品铅制阻塞',name:'化妆品铅制阻塞'},{value:'脂肪污物阻塞',name:'脂肪污物阻塞'},
                    {value:'清洁保养不当',name:'清洁保养不当'},{value:'水银药物毒素阻塞',name:'水银药物毒素阻塞'},
                    {value:'皮脂分泌旺盛',name:'皮脂分泌旺盛'},{value:'洗脸剂不合适',name:'洗脸剂不合适'}],'该项是必填项')}
                </Col>
              </Row>
              <Row className="firstItem" key="17">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('面疮','19',false,[{value:'皮肤敏感',name:'皮肤敏感'},{value:'细菌感染',name:'细菌感染'},
                    {value:'内分泌不正常',name:'内分泌不正常'},{value:'毛孔阻塞厉害',name:'毛孔阻塞厉害'},
                    {value:'清洁保养不当',name:'清洁保养不当'},{value:'化妆品使用不当',name:'化妆品使用不当'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="18">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('暗疮','20',false,[{value:'内分泌异常、荷尔蒙失调',name:'内分泌异常、荷尔蒙失调'},{value:'火气旺盛',name:'火气旺盛'},
                    {value:'挤粉刺发炎',name:'挤粉刺发炎'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="19">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('雀斑','21',false,[{value:'遗传',name:'遗传'},{value:'内分泌失调',name:'内分泌失调'},
                    {value:'保养品不当',name:'保养品不当'},{value:'擦药霜引起',name:'擦药霜引起'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="20">
                <Col className="skinInfo skinOtherInfo" span="10" style={{height: '110px',display: 'table'}}>
                  {this.radioInput('黑斑','22',false,[{value:'内分泌失调',name:'内分泌失调'},{value:'怀孕引起',name:'怀孕引起'},
                    {value:'肝机能衰弱',name:'肝机能衰弱'},{value:'熬夜失眠或睡眠不足',name:'熬夜失眠或睡眠不足'},
                    {value:'晒太阳',name:'晒太阳'},{value:'化妆品清洁不当',name:'化妆品清洁不当'},
                    {value:'水银毒素导致',name:'水银毒素导致'},{value:'缺乏维生素C',name:'缺乏维生素C'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="21">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('老人斑','23',false,[{value:'皮肤老化',name:'皮肤老化'},{value:'新陈代谢不良',name:'新陈代谢不良'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="22">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('汗斑','24',false,[{value:'流汗乳酸菌引起',name:'流汗乳酸菌引起'},{value:'体质',name:'体质'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="23">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('毛孔粗大','25',false,[{value:'天生',name:'天生'},{value:'饮食油脂类',name:'饮食油脂类'},
                    { value:'角质污垢阻塞',name:'角质污垢阻塞'},{value:'使用刺激性化妆品',name:'使用刺激性化妆品'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="24">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('疤痕','26',false,[{value:'挤面疱粉刺过度',name:'挤面疱粉刺过度'},{value:'外伤',name:'外伤'},
                    { value:'药物灼伤',name:'药物灼伤'},{value:'手术',name:'手术'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="25">
                <Col className="skinInfo skinOtherInfo" span="10" style={{height: '110px',display: 'table'}}>
                  {this.radioInput('皱纹','27',false,[{value:'皮肤生理机能衰退',name:'皮肤生理机能衰退'},{value:'皮肤干燥',name:'皮肤干燥'},
                    { value:'滋润度差',name:'滋润度差'},{value:'长期睡眠不足',name:'长期睡眠不足'},
                    { value:'保养不当',name:'保养不当'},{value:'缺乏保养',name:'缺乏保养'},
                    { value:'擦刺激化妆品',name:'擦刺激化妆品'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem lastItem" key="26">
                <Col className="skinInfo" span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('过敏','28',false,[{value:'天生皮肤过敏',name:'天生皮肤过敏'},{value:'食物过敏',name:'食物过敏'},
                    { value:'气候变化过敏',name:'气候变化过敏'},{value:'使用不当化妆品过敏',name:'使用不当化妆品过敏'}])}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row  className="firstItem lastItem skinPropertyItem" key="27">
            <Col className="skinProperty" span="3" style={{height: '280px',display: 'table'}}>
              <div className="itemTitle">皮肤性质</div>
            </Col>
            <Col span="20" style={{height: '280px',display: 'table',width:'87.5%'}}>
              <Row className="firstItem" key="28">
                <Col span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('A：眼下','29',false,[{value:'油',name:'油'},{value:'中',name:'中'},
                    { value:'干',name:'干'},{value:'混合',name:'混合'},{value:'敏感',name:'敏感'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="29">
                <Col span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('B：额头','30',false,[{value:'油',name:'油'},{value:'中',name:'中'},
                    { value:'干',name:'干'},{value:'混合',name:'混合'},{value:'敏感',name:'敏感'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem" key="30">
                <Col span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('C：鼻周','31',false,[{value:'油',name:'油'},{value:'中',name:'中'},
                    { value:'干',name:'干'},{value:'混合',name:'混合'},{value:'敏感',name:'敏感'}],'该项是必填项')}
                </Col>
              </Row>
              <Row className="firstItem" key="31">
                <Col span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('D：面颊','32',false,[{value:'油',name:'油'},{value:'中',name:'中'},
                    { value:'干',name:'干'},{value:'混合',name:'混合'},{value:'敏感',name:'敏感'}],'该项是必填项')}
                </Col>
              </Row>

              <Row className="firstItem lastItem" key="32">
                <Col span="10" style={{height: '55px',display: 'table'}}>
                  {this.radioInput('E：下巴','33',false,[{value:'油',name:'油'},{value:'中',name:'中'},
                    { value:'干',name:'干'},{value:'混合',name:'混合'},{value:'敏感',name:'敏感'}],'该项是必填项')}
                </Col>
              </Row>
            </Col>
          </Row>

        </Form>
        <div className='bottomButton'>
          <Button className='commitButton backBtn' onClick={this.handleBack.bind(this)}>返回</Button>
          <Button className='commitButton' type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
        </div>
      </div>
    );
  }
}

const SkinHealthInformationForm = Form.create()(SkinHealthInformation);



function mapStateToProps(state) {
  return {
    healthInformation: state.healthInformation,
    customerId:state.addCustomer.dataDetailId
  };
}


export default connect(mapStateToProps)(SkinHealthInformationForm)
