


import React from 'react'
import { Card, Button } from 'antd'

import { connect } from 'dva';
import './PhoneSystemIndex.scss'

class PhoneSystemIndex extends React.Component {
  constructor(props) {
    super(props)
    this.bigExtra=(
      <div>
        <Button onClick={ this.toHidden.bind(this) } className='system-button-option'>隐藏</Button>
        <Button onClick={ this.toMin.bind(this) } className='system-button-option'>最小化</Button>
      </div>)
    this.minExtra=(
      <div>
        <Button onClick={ this.toHidden.bind(this) } className='system-button-option'>隐藏</Button>
        <Button onClick={ this.toLarge.bind(this) } className='system-button-option'>最大化</Button>
      </div>)
    this.state = {
      style: 'hidden',
    }
  }

  toMin() {
    this.setState({
      style: 'min'
    })
  }

  toHidden() {
    this.setState({
      style: 'hidden'
    })
  }

  toLarge() {
    this.setState({
      style: 'large'
    })
  }


  render() {
    if (this.state.style == 'large') {
      return (
        <Card className="phone-system-cent" title = '来电弹屏' extra={ this.bigExtra }>
          <div class='telephone-system-content'>
            <div style='height: 40px;'>
              <span style='margin-left:10px; line-height:40px;'>登录状态</span>
              <span style='line-height:40px;' id="status">离线</span>
              <span style='margin-left:20px; line-height:40px;'>登录时间 </span>
              <span style='line-height:40px;' id="cnoTime"></span>
              <button style="float: right; margin-right: 5px;" class='system-button' id='phone-system-close'>隐藏</button>
              <button style="float: right; margin-right: 5px;" class='system-button' id='phone-system-minimize'>最小化</button>
            </div>

            <div style="position:absolute; border:1px solid #000;  top:50px; left:0; width:100%; height:300px;">
              <div class="list_Div" style="min-width:700px;">
                <div class="list_title">
                  <span class="list_title_titleSpan">呼叫列表</span>
                  <span class="list_title_numSpan">(共<span id="callNumber">0</span>条呼叫信息)</span>
                  <span class="list_title_hrSpan"><hr class="list_title_hrSpan_hr" size="2" color="f0f0f0"/></span>
                  <span class="list_title_imgSpan"><span id="callList">收起</span></span>
                </div>
                <div class="list_content" id="callContent">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr class="list_content_title_tr">
                      <td align="center" width="15%">主叫号码</td>
                      <td align="center" width="15%">来电时间</td>
                      <td align="center" width="15%">进入队列时间</td>
                      <td align="center" width="10%">排队等待时长</td>
                      <td align="center" width="10%">呼叫状态</td>
                      <td align="center" width="10%">溢出次数</td>
                      <td align="center" width="10%">排队位置</td>
                    </tr>
                  </table>
                  <div style="height:170px; overflow:auto;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="callTable">
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div id='call_history'  style="position:absolute; border:1px solid #000;  top:350px; left:0; width:100%; height:200px;display: none">
              <div>
                <span>通话内容</span>
                <table width='100%' id='contentTable'></table>
              </div>
            </div>

            <div id='call_input'  style="position:absolute; border:1px solid #000;  top:550px; left:0; width:100%; height:100px;display: none">
              <div>
                <span>本次通话内容</span>
                <div>
                  <textarea id='call_input_content' style='width: 100%; height:80px' ></textarea>
                </div>
              </div>
              <button style="float: right; margin-right: 5px;" class='system-button' id='submit_call_content'>提交</button>
            </div>

            <div id='call_div' align="center" style='position: absolute; right: 150px; height: 40px; width: 50%; top:0;display: none' >
              <span id='call_phone' style='line-height:40px;'></span>
              <span style='margin-left:10px'>通话时长</span>
              <span id='call_time'></span>
            </div>

            <div style="position:absolute; width:100%; bottom:2px; ">
              <table border="0" cellspacing="0" cellpadding="0" style="min-width:380px; margin:0;">
                <td align="left" id="toolbarButton">
                  <input type="button" id="pause" class='system-button2' value="置忙"/>
                  <input type="button" id="online" class='system-button2' value="置闲"/>
                  <input type="button" id="answer" class='system-button2' value="接听"/>
                  <input type="button" id="unLink" class='system-button2' value="挂断"/>
                  <input type="button" id="refused"  class='system-button2' value="拒接"/>
                  <input type="button" id="hold" class='system-button2' value="保持"/>
                  <input type="button" id="unHold"  class="system-button3" value="保持接回"/>
                  <input type="button" id="consult" class='system-button2' value="咨询"/>
                  <input type="button" id="consultBack"  class="system-button3" value="咨询接回"/>
                  <input type="button" id="consultTransfer"  class="system-button3" value="咨询转接"/>
                  <input type="button" id="consultThreeway"  class="system-button3" value="咨询三方"/>
                  <input type="button" id="transfer"  class='system-button2' value="转移"/>
                  <input type="text"   id="phoneCallText" value="" maxlength="12" style="display:none;width:100px;height:28px;line-height:28px;font-family:verdana;border:solid 1px #ddd;vertical-align:top;margin-top:2px;"/>
                  <input type="button" id="phoneCallout"  class="system-button3" value="呼叫"/>
                  <input type="button" id="phoneCallCancel" class="system-button3" value="呼叫取消"/>
                  <select id="consultInput" style="display:none;">
                    <option value="0">普通电话</option>
                    <option value="1">座席号</option>
                  </select>
                </td>
            </table>
          </div>
        </div>
        </Card>
      )
    } else if (this.state.style == 'min') {
      return (
        <Card className="phone-system-min-cent" title = '来电弹屏' extra={ this.minExtra }>


        </Card>
      )
    } else if (this.state.style == 'hidden') {
      return (
        <Button className='system-button-option-show' onClick={ this.toLarge.bind(this) }> 显示 </Button>
      )
    }



  }
}




export default connect()(PhoneSystemIndex);





