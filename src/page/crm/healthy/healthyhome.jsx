"use strict"

import React, { Component } from 'react'
import { Button, Col, Form, Input, Row, Radio, Select } from 'antd'
import styles from './healthyhome.css';

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

  //row 左边单选右边输入框
  function radioInputRow (dict, inputTitle, lastRow, suffix) {

    var col1Class='topItembg';
    var col2Class='leftRightItemBg';
    if (lastRow == true){
      col1Class='bottomItemBg';
      col2Class='allNoneBg';
    }

    return (
      <Row>
        <Col span="12">
          <div className={col1Class}>
            {myRadioForm(dict)}
          </div>
        </Col>
        <Col span="12">
          <div className={col2Class}>
            <FormItem
              labelCol={{span: 4}}
              wrapperCol={{span: 18}}
              label={inputTitle}>
              <Input
                suffix={suffix}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
    )
  }

  //row 左边单选右边上传附件
  function radioUploadOptionsRow (dict, key, lastRow) {

    var col1Class='topItembg';
    var col2Class='leftRightItemBg';
    if (lastRow == true){
      col1Class='bottomItemBg';
      col2Class='allNoneBg';
    }

    return (
      <Row>
        <Col span="12">
          <div className={col1Class}>
            {myRadioForm(dict)}
          </div>
        </Col>
        <Col span="12">
          <div className={col2Class}>
            {uploadOptionsItem({key})}
          </div>
        </Col>
      </Row>
    )
  }

  //row 左边单选右边空白
  function radioSpaceRow (dict, lastRow) {
    var col1Class='rightItemBg';
    var col2Class='leftRightItemBg';
    if (lastRow == true){
      col1Class='bottomItemBg';
      col2Class='allNoneBg';
    }

    return (
      <Row>
        <Col span="12">
          <div className={col1Class}>
            {myRadioForm(dict)}
          </div>
        </Col>
        <Col span="12">
          <div className={col2Class}></div>
        </Col>
      </Row>
    )
  }

  //row 整行单选
  function radioAllRow (dict) {
    return (
      <Row>
        <Col>
          <div className="rightItemBg">
            {secondRadioForm(dict)}
          </div>
        </Col>
      </Row>
    )
  }

  //提交表单
  function handleSubmit () {

  }

  return(
    <div>
      <Form>
        <Row className="firstItem" key="1">
          <Col span="2" style={{height: '110px',display: 'table'}}>
            <div className="itemTitle">既往史</div>
          </Col>
          <Col span="22">
            {radioInputRow({title: '既往疾病史',radioItems: ['无','有']},'请描述')}
            {radioInputRow({title: '既往手术史',radioItems: ['无','有']},'请描述',true)}
          </Col>
        </Row>

        <Row className="firstItem" key="2">
          <Col span="2" style={{height: '220px',display: 'table'}}>
            <div className="itemTitle"><span>优生四向</span></div>
          </Col>
          <Col span="22">
            {radioUploadOptionsRow({title: '弓形体',radioItems: ['阴性','阳性']},'1')}
            {radioUploadOptionsRow({title: '单纯疱疹病毒',radioItems: ['阴性','阳性']},'2')}
            {radioUploadOptionsRow({title: '风疹病毒',radioItems: ['阴性','阳性']},'3')}
            {radioUploadOptionsRow({title: '巨细胞病毒',radioItems: ['阴性','阳性']},'4',true)}
          </Col>
        </Row>

        <Row  className="firstItem" key="3">
          <Col span="2" style={{height: '605px',display: 'table'}}>
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
            {radioUploadOptionsRow({title: '丙肝病毒感染或携带',radioItems: ['否','是']},'6')}
            {radioUploadOptionsRow({title: '梅毒病毒感染或携带',radioItems: ['否','是']},'7')}
            {radioUploadOptionsRow({title: '艾滋病病毒感染或携带',radioItems: ['否','是']},'7')}
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
            {radioSpaceRow({title: '贫血',radioItems: ['否','是']})}
            {radioSpaceRow({title: '糖尿病',radioItems: ['否','是']})}
            {radioSpaceRow({title: '子宫肌瘤',radioItems: ['否','是']})}
            {radioInputRow({title: '甲状腺功能减退',radioItems: ['否','是']},'用药')}

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
          <Col span="2" style={{height: '495px',display: 'table'}}>
            <div className="itemTitle">分娩过程</div>
          </Col>
          <Col span="22">
            {radioAllRow({title: '自然分娩（侧切）',radioItems: ['无','有']})}
            {radioAllRow({title: '自然分娩（会阴撕裂）',radioItems: ['无','有','I度','II度','III度','IV度']})}
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

            {radioAllRow({title: '前置胎盘',radioItems: ['否','是']})}
            {radioAllRow({title: '胎盘早剥',radioItems: ['否','是']})}
            {radioAllRow({title: '胎盘残留',radioItems: ['否','是']})}

            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其他'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2" style={{height: '660px',display: 'table'}}>
            <div className="itemTitle">产后情况</div>
          </Col>
          <Col span="22">
            {radioAllRow({title: '产后清宫',radioItems: ['无','有']})}
            {radioInputRow({title: '产后大出血',radioItems: ['无','有']},'出血量',false,'毫升')}
            {radioAllRow({title: '血压异常',radioItems: ['无','有','低血压','高血压']})}
            {radioAllRow({title: '会阴伤口',radioItems: ['正常','水肿','血肿','裂开']})}
            {radioAllRow({title: '腹部伤口',radioItems: ['正常','水肿','裂开','感染']})}
            {radioInputRow({title: '产后发热',radioItems: ['无','有']},'体温',false,'℃')}
            {radioAllRow({title: '乳房肿胀',radioItems: ['无','有']})}
            {radioAllRow({title: '哺乳困难',radioItems: ['无','有']})}
            {radioAllRow({title: '下肢水肿',radioItems: ['无','有']})}
            {radioAllRow({title: '排尿困难',radioItems: ['无','有']})}
            {radioAllRow({title: '排便困难',radioItems: ['无','有']})}
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其他'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="firstItem">
          <Col span="2" style={{height: '1045px',display: 'table'}}>
            <div className="itemTitle">新生儿情况</div>
          </Col>
          <Col span="22">
            {radioAllRow({title: '性别',radioItems: ['男','女']})}

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
            {radioAllRow({title: '喂养方式',radioItems: ['纯母乳','混合','人工']})}
            {radioAllRow({title: '产时胎心异常',radioItems: ['无','有','胎心快','胎心慢']})}
            {radioAllRow({title: '高胆红素血症',radioItems: ['无','有']})}
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
            {radioAllRow({title: '羊水污染',radioItems: ['无','有','1度','2度','3度']})}
            {radioInputRow({title: '发热史',radioItems: ['否','是']},'体温',false,'℃')}
            {radioAllRow({title: '低血糖史',radioItems: ['无','有']})}
            {radioAllRow({title: '呼吸困难',radioItems: ['无','有']})}
            {radioAllRow({title: '出生后窒息',radioItems: ['无','有']})}
            {radioInputRow({title: '新生儿肺炎',radioItems: ['否','是']},'体温')}
            {radioAllRow({title: '心脏杂音',radioItems: ['无','有']})}
            {radioAllRow({title: '皮疹',radioItems: ['无','有']})}
            {radioAllRow({title: '尿量少',radioItems: ['无','有']})}
            {radioAllRow({title: '尿结晶',radioItems: ['无','有']})}
            <Row>
              <div className="bottomRightItemBg">
                <FormItem
                  labelCol={{span: 2}}
                  wrapperCol={{span: 21}}
                  label={'其他'}>
                  <Input/>
                </FormItem>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>

      <div className='bottomButton'>
        <Button className='commitButton'>返回</Button>
        <Button className='commitButton' type="primary">保存</Button>
      </div>

    </div>
  );
}

export default Healthyhome
