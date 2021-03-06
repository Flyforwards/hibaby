import React from 'react';
import classNames from 'classnames';
import {AddCustomerModal, RowHousesModal, RowHousesWayModal,CreateCustomer,QuickStayModel} from './roomStateForMonthModal';
import DictionarySelect from 'common/dictionary_select';
import moment from 'moment';
import {
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Switch,
  message,
  Modal,
  Popover,
  Spin
} from 'antd'
import PermissionButton from '../../../common/PermissionButton';

const Option = Select.Option;
let ONEC = false
const UNIT_WIDTH = 9;
const UNIT = 3;
let SELECT_CUSTOMER = '';
let nowDict = ''
let selectViewIndex = 0;
// 保留所拖动元素中鼠标的位置
let dragOffsetX = 0;
let dragOffsetY = 0;
let addCustomerKey = 'addCustomerKeyOne'

let ActBox = ""

const statusExplain = [
  {name: "预定", color: "#29C1A6"},
  {name: "入住", color: "#F57777"},
  {name: "重叠", color: "#F9EBCC"},
  {name: "出所", color: "#E3E3E3"},
  {name: "空房", color: "#fff"},
  {name: "维修", color: "#63C3E6"},
];

// 时间毫秒数转日期: YYYY-MM-DD
const timeToDate = (time) => {
  if (!time) {
    return '';
  }

  try {
    let date = new Date(parseInt(time));

    let month = date.getMonth() + 1;
    let day = date.getDate();

    return month + '月' + day + '日';
  } catch (e) {
    console.log("日期转换时发生错误", e);
    return "";
  }
};

let messageShow = true

const monthStateView = (props) => {
  const {dispatch,loading,systemTime} = props;
  const {occupancy,dateSelectList,floorSelect,dragUser,boxW} = props.users;
  const customers = props.users.monthStateCustomers;
  const monthRoomList = props.users.monthRoomList;



  let years = [];
  let defaultYear = props.users.defaultYear;

  for (let i = 2000; i < 2099; i++) {
    years.push(
      <Option key={i} value={`${i}`}>
        {`${i}`}
      </Option>
    )
  }

  document.ondragover = function (event) {
    event.preventDefault();
  };

  document.ondrop = (event) => {
    event.preventDefault();

    if(dragUser.status == 6){
      return
    }

    if(dragUser.isRepair == 1 && dragUser.status == 0){
      return;
    }

    let roomIndex = null;
    let dayIndex = null;
    let date = 0;
    let offsetUnit = Math.round( dragOffsetX/boxW );

    if (event.target.className === "dayRoom") {
      roomIndex = event.target.dataset.roomIndex;
      dayIndex = event.target.dataset.dayIndex;
    } else if (event.target.parentNode.className === "dayRoom") {
      roomIndex = event.target.parentNode.dataset.roomIndex;
      dayIndex = event.target.parentNode.dataset.dayIndex;
    } else if (event.target.classList.contains("userBox")) {
      // 拖到了另外一个用户上面
      // 偏移天数
      let offsetDays = parseInt(event.layerX/boxW);
      roomIndex = event.target.dataset.roomIndex;
      dayIndex = parseInt(event.target.dataset.startIndex) + offsetDays;
    } else {
      return;
    }

    dayIndex = dayIndex - offsetUnit < 0 ? 0 : dayIndex - offsetUnit;

    if(dragUser.status !== 4){
      if(moment().isAfter(moment.unix((monthRoomList[roomIndex]).useAndBookingList[dayIndex].date/1000),'day')){
        dayIndex = nowDict.index
      }
    }

    if(dragUser.startIndex == -1 && roomIndex){
      customers.map(value=>{
        if (value.customerId == dragUser.customerId){
          value.change = true;
        }
      })
    }
    ActBox = ""
    dispatch({
      type: 'roomStatusManagement/userDrop',
      payload: {
        roomIndex,
        dayIndex,
      }
    });

  };


  /**
   * 房态切换 (日/月)
   * @param checked
   */
  const roomViewStateChange = (checked) => {
    dispatch({
      type: 'roomStatusManagement/setRoomViewState',
      payload: checked
    });
  };
//t头部初始化
  const renderMonthSelectView = () => {
    const renderYearSelectView = (index) => {
      const yearSelectChangeHandler = (value) => {
        dispatch({
          type: 'roomStatusManagement/selectedYearChange',
          payload: {
            selectViewIndex: index,
            selectedYear: value,
          }
        });
      };

      return (
        <Col span={5} className="yearSelectBox">
          <Select className="yearSelect"
                  defaultValue={dateSelectList[index].year}
                  onChange={yearSelectChangeHandler}>
            {years}
          </Select>
          <span style={{margin: '10px'}}>年</span>
        </Col>
      )
    };
//月份初始化
    const renderChiMonthSelectView = (index) => {
      const checkboxChangeHandler = (value) => {

        value.sort((a, b) => a - b);

        dispatch({
          type: 'roomStatusManagement/selectedMonthChange',
          payload: {
            selectedMonthList: value,
            selectViewIndex: index,
          }
        });
      };
      const creatCheckbox = (month) => {
        return(
          <Col key={month} span={4}><Checkbox  value={month}>{month}月</Checkbox></Col>
        )
      }


      let tempAry = [];
      let RowAry = [];
      for(let i = 1 ;i<=12;i++){
        tempAry.push(creatCheckbox(i.toString()))
        if(i%6 == 0){
          RowAry.push(<Row key={'row'+i} gutter={16} style={{height: "50%"}} type="flex" align="middle">{tempAry}</Row>)
          tempAry = []
        }
      }

      return (
        <Col offset={1} span={12} style={{height: "100%"}}>
          <Checkbox.Group defaultValue={dateSelectList[index].monthList } onChange={checkboxChangeHandler}>
            {RowAry[0]}
            {RowAry[1]}
          </Checkbox.Group>
        </Col>
      )
    };


    const deleteBtnClickHandler = (index) => {
      dispatch({
        type: 'roomStatusManagement/deleteDateSelectView',
        payload: {
          index: index,
        }
      });
    }
    //点击添加
    const addBtnClickHandler = () => {

      const index = ++selectViewIndex;

      let dateSelectView = (
        <Row key={"SelectView"+index} type="flex" justify="center" align="middle" className="timeSelectBox">
          {
            renderYearSelectView(index)
          }

          {
            renderChiMonthSelectView(index)
          }

          <Col span={5} offset={1}>
            <Button className="button-group-1" onClick={()=>{deleteBtnClickHandler(index)}}>删除</Button>
          </Col>
        </Row>
      );

      dispatch({
        type: 'roomStatusManagement/addDateSelectView',
        payload: {
          dateSelectView: dateSelectView,
        }
      });
    };




    return (
      <div>
        <Row type="flex" justify="center" align="middle" className="timeSelectBox">
          {
            renderYearSelectView(0)
          }

          {
            renderChiMonthSelectView(0)
          }
          {
            function () {
              if (dateSelectList.length > 1){
                  if (!ONEC){
                    ONEC = true
                    addBtnClickHandler()
                  }
              }
            }()
          }
          <Col span={5} offset={1}>
            <Button className="button-group-1" onClick={addBtnClickHandler}>添加</Button>
          </Col>
        </Row>
        {
          props.users.dateSelectViews
        }
      </div>
    )
  };

  const addRedBoder = (e) => {
    ActBox = ""
    let userBoxes = document.querySelectorAll(".userBox");

    for (let i = 0; i < userBoxes.length; i++) {

      userBoxes[i].classList.remove("active");
      let btns = userBoxes[i].querySelectorAll(".userBoxConfirm");
      for (let j = 0; j < btns.length; j++) {
        userBoxes[i].removeChild(btns[j]);
      }
    }
    if(e){
      e.target.classList.add("active");
      ActBox = e.target;
    }
  }

  const renderQueryView = () => {

    const queryBtnClickHandler = () => {
      dispatch({type: 'roomStatusManagement/monthRoomList'});
      dispatch({type: 'roomStatusManagement/netroomViewStateChange'});
    };

    const floorChange = (e) => {
      dispatch({
        type: 'roomStatusManagement/setFloorSelect',
        payload: e
      });
    }



    return (
      <Row type="flex" justify="center" align="middle" className="queryBox">
        <Col span={5}>
          <div className="occupancyRateBox">
            <div>
              <div className="rateTitle">入住率</div>
              <div className="rateNumber">{`${Math.floor(occupancy * 10000) / 100}%`}</div>
            </div>
          </div>
        </Col>

        <Col offset={1} span={12}>
          <span>楼层</span>
          <DictionarySelect defaultValue={floorSelect} onChange={floorChange} className='floorSelect' placeholder="请选择"
                            selectName='Floor'/>
        </Col>

        <Col span={5} offset={1}>
          <Button className="button-group-2" onClick={queryBtnClickHandler}>查询</Button>
        </Col>
      </Row>
    );
  };

  /**
   * 状态说明视图
   */
  const renderStatusExplainView = () => {

    return (
      <Row className="statusExplainBox" type="flex" align="middle">
        {
          statusExplain.map(item => {
            return (
              <span key={item.name}>
                <div style={{float: 'left'}}>{item.name}</div>
                <div className="statusItem" style={{background: item.color}}/>
              </span>
            )
          })
        }
      </Row>
    );
  };

  const ClickBlank = (e) => {
    addRedBoder()
  }

  /* 月房态列表 */
  const renderMonthRoomListView = () => {
    const roomList = [...props.users.monthRoomList];
    // if(document.getElementById('day-1-1') != undefined) {
    //    roomList = roomList.splice(0,1);
    // }
    // // roomList = roomList.splice(0,1);

    const renderMonthRoom = (room, roomIndex) => {



      let dateRulerList_count = props.users.dateRulerList.length;

      let users = [];
      const renderDayRoom = (dayList) => {
        if (!dayList || dayList.length === 0) {
          return null;
        }

        //{0: '空房', 1: '维修', 2: '脏房', 3: '样板房', 4: '住客房', 6: '出所', 7: '预约', 8: '取消维修'}
        let status = 0;
        let dayCustomerList = null;
        let hasUser = false;
        let isRepair = false;

        let result = dayList.map((day, dayindex) => {


          if(moment().isSame(day.date, 'day')){
            nowDict = {date:day.date,index:dayindex}
          }

          isRepair = false

          // 一天中的用户列表
          dayCustomerList = day.customerList;
          if (!dayCustomerList || !dayCustomerList.length) {
            // 空房
            status = 0;
          } else if (dayCustomerList.length === 1) {
            // 如果该天只有一个用户, 直接显示相应状态
            status = dayCustomerList[0].status || 7;
            isRepair = dayCustomerList[0].isRepair;
          } else if (dayCustomerList.length > 1) {
            status = 9;
            for(let i = 0;i<dayCustomerList.length;i++ ){
              if(dayCustomerList[i].isRepair == 1)
              {
                isRepair = 1
                break
              }
            }
            // 重叠
          }


          for (let j = 0; j < dayCustomerList.length; j++) {
            hasUser = false;

            for (let i = 0; i < users.length; i++) {

              if (users[i].customerId === dayCustomerList[j].customerId
                && users[i].lastIndex === dayindex - 1 && users[i].status == dayCustomerList[j].status) {
                hasUser = true;
                users[i].dayCount++;
                users[i].lastIndex = dayindex;
                break;
              }
            }

            if (!hasUser) {
              users.push({
                ...dayCustomerList[j],
                startDate: day.date,
                startIndex: dayindex,
                lastIndex: dayindex,
                dayCount: 1,
              })

            }
          }

          let stateBox = classNames('stateBox', {
            'empty': status == 0, // 空房
            'checkingIn': status == 4, // 入住
            'checkingOut': status == 6, // 出所
            'reserve': status == 7, // 预约
            'repair': isRepair == 1, // 维修
            'overlap': status == 9, // 重叠
          });
          // if (status == 0) {
          //   return;
          // }
          return (
            <div className="dayRoom"
                 key={"dayroom"+roomIndex+dayindex}
                 data-room-index={roomIndex}
                 data-day-index={dayindex}
                 data-date={day.date}
                 onClick={ClickBlank}
                 id={`day-${roomIndex}-${dayindex}` }
                 style={{width:boxW + "px"}}
            >
              <div className={stateBox} style={{width:boxW-2 + "px"}}/>
            </div>
          )
        });


        const messageOnClose = (e)=>{
          messageShow = true
        }


        const userBoxClickHandler = (e) => {
          addRedBoder(e)
        };

        const userBoxDbClickHandler = (e) => {

          // 首先要排除不是在确认入住或删除按钮上双击的
          // 因为以上两个按钮也是在这个容器内, 事件会冒泡
          if (!e.target.classList.contains("userBox")) {
            return;
          }


          if( e.target.dataset.isrepair == 1 && e.target.dataset.status == 0)
          {
            return
          }

          // 如果是已入住状态, 是不能再次确认入住和删除的
          if (e.target.dataset.status == 4 || e.target.dataset.status == 6) {
            return;
          }

          let btn = document.createElement("div");
          btn.innerHTML = "确认入住";
          btn.className = "userBoxConfirm button-group-1";

          btn.addEventListener("click", (e) => {
            //确认入住权限，true：有权限，false：无权限 add by yangjj 2017-07-27 13:00
            const flag =  props.permissionAlias.contains("MONTH_QRRZ");
            if(!flag){
              message.warn("该用户无权限");
              return false;
            }

            e.stopPropagation();

            let parentNode = e.target.parentNode;
            let dict = parentNode.dataset;


            if(moment.unix(dict.startDate/1000).format('YYYYMMDD') !== moment().format('YYYYMMDD')) {
              message.error('只有今日入住的用户可以确认入住')
              return
            }

            dispatch({
              type: 'roomStatusManagement/monthRoomUpdate',
              payload: {
                ConfirmDict:{roomIndex: dict.roomIndex,
                  customerId: dict.customerId,
                  startIndex: dict.startIndex,
                  endIndex: dict.endIndex,
                  startDate: dict.startDate,}
              }
            });

            parentNode.removeChild(e.target);
          });
          e.target.appendChild(btn);
        };

        const userBoxRightClickHandler = (e) => {
          e.preventDefault();
          e.stopPropagation();

          // 首先要排除不是在确认入住或删除按钮上双击的
          // 因为以上两个按钮也是在这个容器内, 事件会冒泡
          if (!e.target.classList.contains("userBox")) {
            return;
          }

          if( e.target.dataset.isrepair == 1 && e.target.dataset.status == 0)
          {
            return
          }

          // 如果是已入住状态, 是不能再次确认入住和删除的
          if (e.target.dataset.status == 4  || e.target.dataset.status == 6) {
            return;
          }

          let deleteBtn = document.createElement("div");
          deleteBtn.innerHTML = "取消预约";
          deleteBtn.className = "userBoxConfirm button-group-1";
          e.target.appendChild(deleteBtn);

          deleteBtn.addEventListener("click", (e) => {
            //取消预约权限，true：有权限，false：无权限 add by yangjj 2017-07-27 13:00
            const flag = props.permissionAlias.contains("MONTH_QXRZ");
            if(!flag){
              message.warn("该用户无权限");
              return false;
            }

            e.stopPropagation();
            let parentNode = e.target.parentNode;
            dispatch({


              type: 'roomStatusManagement/monthRoomUpdate',
              payload: {
                deleteUse:{ customerId: parentNode.dataset.customerId,
                  startDate: parentNode.dataset.startDate,}
              }

            });
            parentNode.removeChild(e.target);
          });

          return false;
        };

        /**
         * 调整入住天数
         * @param e
         */
        const resizeBarMouseDownHandler = (e) => {
          //入住调整权限，true：有权限，false：无权限 add by yangjj 2017-07-27 13:00
          const flag = props.permissionAlias.contains("MONTH_RZTZ");
          if(!flag){
            message.warn("该用户无权限");
            return false;
          }
          e.preventDefault();
          e.stopPropagation();

          let pageX = e.pageX;
          let target = e.target.parentNode;

          dispatch({type: 'roomStatusManagement/startReserveDays',payload:target.dataset}) ;


          let targetWidth =target? target.offsetWidth:0;
          let unit = 0;
          let oldStartIndex = parseInt(target.dataset.startIndex);
          let oldEndIndex = parseInt(target.dataset.endIndex);
          let roomIndex = target.dataset.roomIndex;
          let customerId = parseInt(target.dataset.customerId);
          let customerName = target.dataset.customerName;
          let status = target.dataset.status;
          let isRepair = target.dataset.isrepair;

          if(status == 6){
            return
          }

          if (isRepair == 1) {
            if(customerId){
              status = 4;
            }
            else{
              return
            }
          }


          // 左端在入住状态下不可操作
          // if (status == 4) {
          // 我的断点
          //   return;
          // }

          var debounce = function (func, threshold, execAsap) {
            var timeout;
            return function debounced () {
              var obj = this, args = arguments;
              function delayed () {
                if (!execAsap)
                  func.apply(obj, args);
                timeout = null;
              };
              if (timeout)
                clearTimeout(timeout);
              else if (execAsap)
                func.apply(obj, args);
              timeout = setTimeout(delayed, threshold || 100);
            };
          }


          document.onmousemove = (ee) => {
            let offsetX = ee.pageX - pageX;

            // 用户入住时间最短为1天
            if (offsetX + targetWidth < (boxW)) {
              return;
            }

            let tempUnit = parseInt(offsetX/boxW );

            if (tempUnit > 0) {
              try {
                let roomDate = roomList[roomIndex].useAndBookingList[oldEndIndex + tempUnit].date;
                let dragDate = parseInt(target.dataset.startDate) + ((oldEndIndex + tempUnit + 2) * 86400000);
                if (roomDate > dragDate) {
                  return;
                }
              } catch (e) {
                return;
              }
            }
            else if (tempUnit < 0) {
              if(status == 4){
                let roomDate = roomList[roomIndex].useAndBookingList[oldEndIndex + tempUnit].date;
                if(moment().isAfter(moment.unix(roomDate/1000),'day')){
                  if(messageShow === true){
                    messageShow = false
                    message.error("无法将出所日期移动到今天以前",3,messageOnClose)
                  }
                  return;
                }
              }
            }

            unit = tempUnit;


            dispatch({type: 'roomStatusManagement/moveReserveDays',payload:{
              oldStartIndex,
              unit,
              oldEndIndex,
              roomIndex,
              customerId,
              customerName,
              reserveDays:oldEndIndex + tempUnit - oldStartIndex + 1,
              status
            }}) ;

            if (targetWidth + (unit * (boxW)) >= (boxW)) {
              target.style.width = targetWidth + (unit * (boxW)) + "px";
            }
          };

          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            if (!unit) {
              return;
            }

            let type = "";
            let startIndex, endIndex;
            let reserveDays = 0;

            if (unit > 0) {
              type = "add";
              startIndex = oldEndIndex;
              endIndex = oldEndIndex + unit;
              reserveDays = endIndex - oldStartIndex + 1;
            } else {
              type = "remove";
              startIndex = oldEndIndex + unit;
              endIndex = oldEndIndex;
              reserveDays = startIndex - oldStartIndex + 1;
            }

            dispatch({
              type: 'roomStatusManagement/updateReserveDays',
              payload: {
                type,
                startIndex,
                endIndex,
                roomIndex,
                customerId,
                customerName,
                reserveDays,
                status,
              }
            })
            if(status == 4){
              dispatch({type: 'roomStatusManagement/resideAddOrCut',}) ;
            }
          }
        };
        //在列表中拖拽
        const dragStart = (event, user) => {

          dragOffsetX = event.nativeEvent.offsetX;
          dragOffsetY = event.nativeEvent.offsetY;

          addRedBoder(event)

          dispatch({
            type: 'roomStatusManagement/userDragStart',
            payload: {
              dragUser: {
                customerId: user.customerId,
                customerName: user.customerName,
                reserveDays: user.dayCount,
                startIndex: user.startIndex,
                endIndex: user.startIndex + user.dayCount - 1,
                status: user.status,
                startDate: user.startDate,
                isRepair:user.isRepair,
                endDate: parseInt(user.startDate) + (user.dayCount - 1) * 86400000,
                roomIndex: roomIndex,
              },
            }
          });
        };

        for (let i = 0; i < users.length; i++) {
          const tempUser = users[i]
          let width = tempUser.dayCount * boxW ;
          let rightWidth = 0
          let rightUser = {...tempUser}
          let draggable = "true"
          let className = "userBox";

          if(tempUser.startIndex < nowDict.index && tempUser.lastIndex > nowDict.index && tempUser.status !== 7){
            width = (nowDict.index - tempUser.startIndex )  * boxW
            rightWidth =(tempUser.lastIndex - nowDict.index + 1) * boxW
            draggable = 'false'

            rightUser.dayCount = tempUser.lastIndex - nowDict.index + 1
            rightUser.startDate = nowDict.date
            rightUser.startIndex = nowDict.index
          }

          if (tempUser.lastIndex < nowDict.index){
            draggable = 'false'

          }


          if (ActBox){
            const {customerId,status,startIndex,userDaycount} = ActBox.dataset;
            if (tempUser.customerId == customerId && ActBox.dataset.roomIndex == roomIndex&& tempUser.dayCount == userDaycount
              && tempUser.status == status&&tempUser.startIndex == startIndex){
              className = "userBox active"
            }
          }

          const content = <div style={{zIndex:99999}}>{(users[i].customerName?tempUser.customerName:(tempUser.isRepair == 1 ? '维修中' :'' )) + '('
          + tempUser.dayCount + '天, '
          + timeToDate(tempUser.startDate)
          + '-'
          + timeToDate(tempUser.startDate + (tempUser.dayCount - 1) * 86400000)
          + ')'}</div>

          result.push(
            <Popover key={'pop'+i} content={content} getPopupContainer={(e) => e} overlayClassName="popover-manual-top" arrowPointAtCenter={true}>
              <div className="userBoxSup" style={{width: (width+rightWidth+20) + 'px',left:users[i].startIndex * boxW+"px"}}>
                <div className={className}
                     style={{
                       width: width + 'px',
                     }}
                     draggable= {draggable}
                     onDragStart={(event) => dragStart(event, tempUser)}
                     data-room-index={roomIndex}
                     data-customer-id={tempUser.customerId}
                     data-customer-name={tempUser.customerName}
                     data-start-index={tempUser.startIndex}
                     data-end-index={rightWidth?nowDict.index: tempUser.startIndex + tempUser.dayCount - 1}
                     data-user-dayCount={rightWidth?nowDict.index - tempUser.startIndex: tempUser.dayCount}
                     data-start-date={tempUser.startDate}
                     data-status={tempUser.status}
                     data-isrepair={tempUser.isRepair}
                     onClick={userBoxClickHandler}
                     onDoubleClick={userBoxDbClickHandler}
                     onContextMenu={userBoxRightClickHandler}
                >
                  {rightWidth?"":<a href="javascript:void(0)"
                                    className="resizeBar"
                                    title={users[i].dayCount + '天'}
                                    onMouseDown={resizeBarMouseDownHandler}/>}

                </div>


                {rightWidth ?
                  <div className="userBox"
                       style={{
                         width: rightWidth + 'px',
                         left: width,
                       }}
                       draggable="true"
                       onDragStart={(event) => dragStart(event, rightUser)}
                       data-room-index={roomIndex}
                       data-customer-id={tempUser.customerId}
                       data-customer-name={tempUser.customerName}
                       data-start-index={nowDict.index}
                       data-end-index={tempUser.startIndex + tempUser.dayCount - 1}
                       data-user-dayCount={tempUser.lastIndex - nowDict.index}
                       data-start-date={nowDict.date}
                       data-status={tempUser.status}
                       data-isrepair={tempUser.isRepair}
                       onClick={userBoxClickHandler}
                       onDoubleClick={userBoxDbClickHandler}
                       onContextMenu={userBoxRightClickHandler}
                  >
                    <a href="javascript:void(0)"
                       className="resizeBar"
                       title={users[i].dayCount + '天'}
                       onMouseDown={resizeBarMouseDownHandler}/>
                  </div>
                  : ''}
                <span>{users[i].customerName}</span>


              </div>


            </Popover>

          )
        }

        return result;
      };


      return (

        <div className="monthRoomBox" key={"monthRoomBox"+roomIndex}>

          <div style={{
            height: "100%",
            position: "relative",
            minWidth: room.useAndBookingList.length * boxW + (boxW> 9 ? 0 : 10) + "px"
          }}>
            {
              renderDayRoom(room.useAndBookingList)
            }
          </div>
        </div>
      )
    };


    const renderDaysRuler = () => {

      let dateRulerList = props.users.dateRulerList;
      let sysTime = props.users.systemTime;
      let timeObj = moment(sysTime).toObject();
      let boxWidth = 0;
      let days_all=0;
      let length_ = dateRulerList.length;
      //是否渲染的变量
      //let s_ = false;
      for (let item of dateRulerList) {
        days_all += item.days;
      }
      boxWidth += days_all* boxW;

      const renderFiveDays = (days) => {
        let result = [];

        let fiveDays = parseInt(days / 5);
        let remainder = days % 5;

        for (let i = 1; i <= fiveDays; i++) {
          result.push(
            <div key={'fiveDayRuler'+i} className="fiveDayRuler" style={{
              width:boxW*5+'px' ,
            }}>
              {i * 5}天
            </div>
          )
        }

        if (remainder) {
          result.push(
            <div key={'remainder'+i} className="fiveDayRuler" style={{
              width: remainder * boxW + "px",
            }}>
            </div>
          )
        }

        return result;
      };
      //日期框
      return (
        <div className="daysRulerBox" style={{width: boxWidth + 2 + "px"}}>
          {
            dateRulerList.map((item,i) => {
              if(item.date == `${timeObj.years}-${timeObj.months+1}`){
                return (
                  <div  key={"daysRulerBox"+ i} className="itemRulerBox" style={{
                    width: item.days*boxW ,
                    position:'relative',
                    overflow:'initial'
                  }}>
                    <div style={{width:'2px',height:$('.monthRoomRightBox').height()-40,position:'absolute',top:'40px',left:(timeObj.date-1)*boxW - 2+"px" ,borderLeft:'1px dashed #e9e9e9'}}></div>
                    <div className="itemRulerBoxTop" style={{clear:'both'}}>
                      <div className="itemRulerBoxTitle">
                        {item.date}
                      </div>
                    </div>
                    <div className="itemRulerBoxBottom" style={{clear:'both',width:length_ <= UNIT ? item.days*boxW : 300}}>
                      {
                        renderFiveDays(item.days)
                      }
                    </div>
                  </div>
                )
              }else{
                return (
                  <div key = {i} className="itemRulerBox" style={{
                    width:item.days * boxW,
                  }}>
                    <div className="itemRulerBoxTop">
                      <div className="itemRulerBoxTitle">
                        {item.date}
                      </div>
                    </div>
                    <div className="itemRulerBoxBottom" style={{clear:'both',width:length_ <= UNIT ? item.days*boxW : 300}}>
                      {
                        renderFiveDays(item.days)
                      }
                    </div>
                  </div>
                )
              }

            })
          }
        </div>
      )
    };

    return (
      <div className="monthRoomListBox">
        <div className="monthRoomLeftBox">
          <div style={{height: '40px'}}/>
          {
            roomList.map((room,index) => {
              return (
                <div key={"monthRoomListBox"+index} className="monthRoomNumberBox">
                  <div>

                    <div className="number">
                      {room.roomNo}
                    </div>
                    <div style={{display:room.packageInfoLevels?'':'none'}} className="level">
                      {room.packageInfoLevels?`v${room.packageInfoLevels}`:''}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="monthRoomRightBox" style={{overflowY:'hidden',width:'100%'}}>
          {
            renderDaysRuler()
          }

          <div className="monthRoomMainBox">
            {
              roomList.map((item, roomIndex) => renderMonthRoom(item, roomIndex))
            }
          </div>
        </div>
      </div>
    )
  };

  const renderBottomBar = () => {

    const saveReserveClickHandler = () => {
      dispatch({
        type: 'roomStatusManagement/changeModalH',
        payload: true
      });
      dispatch({
        type: 'roomStatusManagement/monthRoomUpdate',
        payload: {}
      });
    };

    const oneKeyClicked = () => {
      dispatch({
        type: 'roomStatusManagement/setRowHousesVisible',
        payload: [true,'']
      });
    };

    return (
      <div className="bottomBar">
        <PermissionButton testKey="ONE_KEY" className="button-group-1" onClick={oneKeyClicked}>一键排房</PermissionButton>
        <PermissionButton testKey="MONTH_YYRZ" className="saveReserveBtn button-group-3" onClick={saveReserveClickHandler}>保存</PermissionButton>
      </div>
    )
  };

  /**
   * 月房态主视图区
   */
  const monthMainView = () => {
    //控制用户是否可以切换视图为日房态 add by yangjj 2017-07-27 17:20
    const dayRoomStatusDisabled =  !props.permissionAlias.contains("DAY_STATUS_SHOW");

    return (

      <div className="main">
        <div className="headDiv">
          <Switch className='switch'
                  disabled={dayRoomStatusDisabled}
                  onChange={roomViewStateChange}
                  checkedChildren={'日房态'}
                  unCheckedChildren={'月房态'}
                  defaultChecked={true}/>
        </div>

        {
          renderMonthSelectView()
        }

        {
          renderQueryView()
        }

        {
          renderStatusExplainView()
        }

        <Spin
          spinning={loading.effects['roomStatusManagement/monthRoomList'] !== undefined ? loading.effects['roomStatusManagement/monthRoomList'] : false}>
          {
            /* 月房态列表 */
            renderMonthRoomListView()
          }
        </Spin>


        {
          renderBottomBar()
        }
      </div>


    )
  };


  const monthSidebarView = () => {

    const customers = props.users.monthStateCustomers;
//自动排房拖拽
    const dragStart = (dragUser, event) => {

      dragOffsetX = event.nativeEvent.offsetX;
      dragOffsetY = event.nativeEvent.offsetY;
      dispatch({
        type: 'roomStatusManagement/userDragStart',

        payload: {
          dragUser: {
            ...dragUser,
            reserveDays : 28,
            status:7,
            startIndex: -1,
            endIndex: -1,
            roomIndex: -1,
          }
        }
      });
    };

    const addCustomer = () => {
      addCustomerKey = addCustomerKey === 'addCustomerKeyOne' ?'addCustomerKeyTwo' :"addCustomerKeyOne";
      dispatch({
        type: 'roomStatusManagement/setCustomerVisible',
        payload: true
      });
    };

    const createCustomer = () => {
      dispatch({
        type: 'roomStatusManagement/createCustomerVisible',
        payload: true
      });
    };


    function onClicked(e) {
      SELECT_CUSTOMER = e;
      dispatch({
        type: 'roomStatusManagement/setRowHousesWayVisible',
        payload: true
      });
    }

    return (
      <div className="sidebar">
        <h3>客户列表</h3>

        {
          customers.map((costomer,index) => {
            if(!costomer.change){
              return (
                <div key={"costomer"+index} className="customerItem" onClick={() => {
                  onClicked(costomer)
                }} draggable= {costomer === props.users.manualSelect} onDragStart={(event) => dragStart(costomer, event)}>
                  {costomer.customerName}
                </div>
              )
            }
          })
        }

        <div style={{textAlign: 'center'}}>
          <Button className="button-group-1" onClick={addCustomer}>+ 添加客户</Button>
          {/*<Button className="button-group-1" onClick={createCustomer} style={{'marginTop':'20px'}}>+ 创建客户</Button>*/}
        </div>
      </div>
    )
  };

  return (
    <div className="monthStateDiv">
      {
        /** 主视图 **/
        monthMainView()
      }

      {
        /** 侧边栏 **/
        monthSidebarView()
      }
      <AddCustomerModal key={addCustomerKey}/>
      <CreateCustomer/>
      <RowHousesModal/>
      <RowHousesWayModal selectCuntomer={SELECT_CUSTOMER}/>
      <QuickStayModel selectCuntomer={SELECT_CUSTOMER}/>

    </div>
  )
};

class MonthStateClass extends React.Component{
  constructor(props) {
    super(props);
    this.state={}
    this.keyChangeBind = this.keyChange.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({type: 'roomStatusManagement/monthRoomList'});
    this.props.dispatch({type: 'roomStatusManagement/netroomViewStateChange'});
    window.addEventListener('keydown',this.keyChangeBind)
  }

  keyChange(e){
    if (ActBox){
      const {roomIndex,customerId,customerName,userDaycount,status,startIndex,endIndex} = ActBox.dataset;

      if (status == -1 || status == 7){

        if (e.keyCode === 37 || e.keyCode === 39){
          if(e.keyCode === 37){
            if (startIndex <= nowDict.index ){
              return;
            }
          }
          this.props.dispatch({type:"roomStatusManagement/roomFinetuning",payload:{
            roomIndex,customerId,startIndex,endIndex,direction:(e.keyCode === 37 ? "left":"right" ),status,customerName,ActBox
          }
          })

        }
        else if (e.keyCode === 38 || e.keyCode === 40){
          this.props.dispatch({type:"roomStatusManagement/roomChange",payload:{
            roomIndex,customerId,startIndex,endIndex,direction:(e.keyCode === 38 ? "up":"down" ),status,customerName,ActBox
          }
          })

        }
      }
    }
  }

  componentWillUnmount(){
    selectViewIndex = 0;
    ONEC = false
    this.props.dispatch({type: 'roomStatusManagement/removeData'});
    window.removeEventListener('keydown',this.keyChangeBind)
  }

  render(){
    return(
      <div>
        {monthStateView(this.props)}
      </div>
    )
  }
}

export default MonthStateClass;
