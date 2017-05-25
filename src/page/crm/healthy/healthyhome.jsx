"use strict"

import React, { Component } from 'react'
import { Button, Col, Form, Input, Row, Radio, Select } from 'antd'
import styles from './healthyhome.scss';

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option;

function Healthyhome(props) {

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  }

  //单选item
  function myRadioForm (dict) {

    const radioItemDivs = [];
    for (let i = 0; i < dict.radioItems.length; i++) {
      radioItemDivs.push(
        <Radio value={i}>{dict.radioItems[i]}</Radio>
      );
    }

    return (
      <FormItem
        label={dict.title}
        {...formItemLayout}
        style={{height: '100%'}}
      >
        <RadioGroup>
          {radioItemDivs}
        </RadioGroup>
      </FormItem>
    )
  }

  //整行的单选item
  function secondRadioForm (dict) {
    const radioItemDivs = [];
    for (let i = 0; i < dict.radioItems.length; i++) {
      radioItemDivs.push(
        <Radio value={i}>{dict.radioItems[i]}</Radio>
      );
    }

    return (
      <FormItem
        label={dict.title}
        labelCol={{span: 5}}
        wrapperCol={{span: 18}}
      >
        <RadioGroup>
          {radioItemDivs}
        </RadioGroup>
      </FormItem>
    )
  }

  //上传附件 传一个key过来
  function uploadOptionsItem (key) {
    return (
      <div>
        <Col span="4">
          <div className="uploadOptions">附件:</div>
        </Col>
        <Col span="18">
          <Button key={key} type="primary" className="uploadOptionsButton">上传附件</Button>
        </Col>
      </div>
    )
  }

  //评分选择器
  function scoreSelectDiv () {

    const optionItemDivs = [];
    for (let i = 0; i <= 10; i++) {
      optionItemDivs.push(
        <Option value={i}>{i}</Option>
      );
    }

    return (
      <Select
        showSearch
        style={{ width: 100 }}
        placeholder="请选择"
        optionFilterProp="children"
        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {optionItemDivs}
      </Select>
    )
  }

  //Apgar评分
  function apgarScoreRow () {
    return (
      <div>
        <Col span="5">
          <div className="uploadOptions">Apgar评分:</div>
        </Col>
        <Col span="2">
          <div style={{marginTop: '12px'}}>{scoreSelectDiv()}</div>
        </Col>
        <Col span="1">
          <div className="score-line">-</div>
        </Col>
        <Col span="2">
          <div style={{marginTop: '12px'}}>{scoreSelectDiv()}</div>
        </Col>
        <Col span="1">
          <div className="score-line">-</div>
        </Col>
        <Col span="2">
          <div style={{marginTop: '12px'}}>{scoreSelectDiv()}</div>
        </Col>
        <Col span="1">
          <div className="uploadOptions">分</div>
        </Col>
      </div>
    )
  }

  return(
    <div className="healthContentDiv">
      <Button className="topButton">医疗健康档案</Button>
      <Button className="topButton">营养部健康档案</Button>
      <Button className="topButton">美研中心孕期健康档案</Button>
      <Button className="topButton">出院小结</Button>
      <Form

      >
        <Row className="firstItem" key="1">
          <Col span="2">
            <div className="itemTitle">既往史</div>
          </Col>
          <Col span="22">
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '既往疾病史',radioItems: ['无','有']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}
                    label={'请描述'}>
                    <Input/>
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="bottomItemBg">
                  {myRadioForm({title: '既往手术史',radioItems: ['无','有']})}
                </div>
              </Col>
              <Col span="12">
                <div className="allNoneBg">
                  <FormItem
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}
                    label={'请描述'}>
                    <Input/>
                  </FormItem>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem" key="2">
          <Col span="2">
            <div className="itemTitle"><span>优生四向</span></div>
          </Col>
          <Col span="22">
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '弓形体',radioItems: ['阴性','阳性']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  {uploadOptionsItem('1')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '单纯疱疹病毒',radioItems: ['阴性','阳性']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  {uploadOptionsItem('2')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '风疹病毒',radioItems: ['阴性','阳性']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  {uploadOptionsItem('3')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="bottomItemBg">
                  {myRadioForm({title: '巨细胞病毒',radioItems: ['阴性','阳性']})}
                </div>
              </Col>
              <Col span="12">
                <div className="allNoneBg">
                  {uploadOptionsItem('4')}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row  className="firstItem" key="3">
          <Col span="2">
            <div className="itemTitle">孕期合并症</div>
          </Col>
          <Col span="22">
            <Row>
              <Col span="12">
                <div className="topItembg" style={{height: '110px'}}>
                  {myRadioForm({title: '已肝病毒感染或携带',radioItems: ['否','是','大三阳','小三阳','单纯表面抗原阳性']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg" style={{height: '110px',paddingTop: '25px'}}>
                  {uploadOptionsItem('5')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '丙肝病毒感染或携带',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  {uploadOptionsItem('6')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '梅毒病毒感染或携带',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  {uploadOptionsItem('7')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '艾滋病病毒感染或携带',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  {uploadOptionsItem('7')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '高血压',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    label={'孕期最高血压'}>
                    <Input
                      suffix="/ mmHg"
                    />
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="rightItemBg">
                  {myRadioForm({title: '贫血',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg"></div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="rightItemBg">
                  {myRadioForm({title: '糖尿病',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg"></div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="rightItemBg">
                  {myRadioForm({title: '子宫肌瘤',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg"></div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '甲状腺功能减退',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}
                    label={'用药'}>
                    <Input/>
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其它'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2">
            <div className="itemTitle">分娩过程</div>
          </Col>
          <Col span="22">
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '自然分娩（侧切）',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '自然分娩（会阴撕裂）',radioItems: ['无','有','I度','II度','III度','IV度']})}
                </div>
              </Col>
            </Row>
            <Row>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'剖宫产手术指征'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
            <Row>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'产时出血'}>
                  <Input
                    suffix="ml"
                  />
                </FormItem>
              </div>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '胎膜早破',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    label={''}
                    wrapperCol={{span: 22, push: 1 }}>
                    <Input
                      suffix="小时"
                    />
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '前置胎盘',radioItems: ['否','是']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '胎盘早剥',radioItems: ['否','是']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '胎盘残留',radioItems: ['否','是']})}
                </div>
              </Col>
            </Row>
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'其他'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2">
            <div className="itemTitle">产后情况</div>
          </Col>
          <Col span="22">
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '产后清宫',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '产后大出血',radioItems: ['无','有']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}
                    label={'出血量'}>
                    <Input
                      suffix="毫升"
                    />
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '血压异常',radioItems: ['无','有','低血压','高血压']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '会阴伤口',radioItems: ['正常','水肿','血肿','裂开']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '腹部伤口',radioItems: ['正常','水肿','裂开','感染']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '产后发热',radioItems: ['无','有']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}
                    label={'体温'}
                  >
                    <Input
                      suffix="℃"
                    />
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '乳房肿胀',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '哺乳困难',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '下肢水肿',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '排尿困难',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '排便困难',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'其他'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2">
            <div className="itemTitle">新生儿情况</div>
          </Col>
          <Col span="22">
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '性别',radioItems: ['男','女']})}
                </div>
              </Col>
            </Row>
            <Row>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'出生体重'}>
                  <Input
                    suffix="g"
                  />
                </FormItem>
              </div>
            </Row>
            <Row>
              <div className="rightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'出生身长'}>
                  <Input
                    suffix="cm"
                  />
                </FormItem>
              </div>
            </Row>
            <Row>
              <div className="rightItemBg">
                {apgarScoreRow()}
              </div>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '喂养方式',radioItems: ['纯母乳','混合','人工']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '产时胎心异常',radioItems: ['无','有','胎心快','胎心慢']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '高胆红素血症',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '蓝光治疗史',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    label={''}
                    wrapperCol={{span: 22, push: 1 }}>
                    <Input
                      suffix="小时"
                    />
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '羊水污染',radioItems: ['无','有','1度','2度','3度']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '发热史',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    label={'体温'}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}>
                    <Input
                      suffix="℃"
                    />
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '低血糖史',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '呼吸困难',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '出生后窒息',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="topItembg">
                  {myRadioForm({title: '新生儿肺炎',radioItems: ['否','是']})}
                </div>
              </Col>
              <Col span="12">
                <div className="leftRightItemBg">
                  <FormItem
                    label={'治疗方案'}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}>
                    <Input/>
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '心脏杂音',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '皮疹',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '尿量少',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="rightItemBg">
                  {secondRadioForm({title: '尿结晶',radioItems: ['无','有']})}
                </div>
              </Col>
            </Row>
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 5}}
                  wrapperCol={{span: 18}}
                  label={'其他'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

      </Form>

    </div>
  );
}

export default Healthyhome
