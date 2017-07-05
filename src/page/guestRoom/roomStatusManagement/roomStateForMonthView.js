import React from 'react';
import classNames from 'classnames';
import {AddCustomerModal, RowHousesModal, RowHousesWayModal} from './roomStateForMonthModal';
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

const Option = Select.Option;

const UNIT_WIDTH = 9;
let SELECT_CUSTOMER = '';
let zIndexCount = 100;
let selectViewIndex = 0;
// 保留所拖动元素中鼠标的位置
let dragOffsetX = 0;
let dragOffsetY = 0;
let addCustomerKey = 'addCustomerKeyOne'

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


const monthStateView = (props) => {
  const {dispatch,loading} = props;
  const {occupancy,dateSelectList,floorSelect,dragUser} = props.users;
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
    if(dragUser.status == 1){
      return;
    }
    let roomIndex = null;
    let dayIndex = null;
    let date = 0;
    let offsetUnit = Math.round(dragOffsetX / UNIT_WIDTH);

    if (event.target.className === "dayRoom") {
      roomIndex = event.target.dataset.roomIndex;
      dayIndex = event.target.dataset.dayIndex;
      date = event.target.dataset.date
    } else if (event.target.parentNode.className === "dayRoom") {
      roomIndex = event.target.parentNode.dataset.roomIndex;
      dayIndex = event.target.parentNode.dataset.dayIndex;
      date = event.target.parentNode.dataset.date

    } else if (event.target.classList.contains("userBox")) {
      // 拖到了另外一个用户上面

      // 偏移天数
      let offsetDays = parseInt(event.layerX / UNIT_WIDTH);
      date = new Date(event.target.dataset.date + offsetDays * 86400000);
      roomIndex = event.target.dataset.roomIndex;
      dayIndex = parseInt(event.target.dataset.startIndex) + offsetDays;
    } else {
      return;
    }

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    let tomorrow = new Date(year, month, day + 1);

    // 过去的时间, 不可放置, 今天即过去
    if (date < tomorrow.getTime()) {
      message.error("无法移动到过去");
      return;
    }

    dispatch({
      type: 'roomStatusManagement/userDrop',
      payload: {
        roomIndex,
        dayIndex: dayIndex - offsetUnit < 0 ? 0 : dayIndex - offsetUnit,
      }
    });
  };


  /**
   * 房态切换 (日/月)
   * @param checked
   */
  const roomViewStateChange = (checked) => {
    dispatch({
      type: 'roomStatusManagement/roomViewStateChange',
      payload: checked
    });
  };

  const renderMonthSelectView = () => {
    // console.log('roomMonth:renderMonthSelectViewRendering');
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
                  defaultValue={defaultYear}
                  onChange={yearSelectChangeHandler}>
            {years}
          </Select>
          <span style={{margin: '10px'}}>年</span>
        </Col>
      )
    };

    const renderMonthSelectView = (index) => {

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
          <Col span={4}><Checkbox  value={month}>{month}月</Checkbox></Col>
        )
      }

      let tempAry = [];
      let RowAry = [];
      for(let i = 1 ;i<=12;i++){
        tempAry.push(creatCheckbox(i.toString()))
        if(i%6 == 0){
          RowAry.push(<Row gutter={16} style={{height: "50%"}} type="flex" align="middle">{tempAry}</Row>)
          tempAry = []
        }
      }

      return (

        <Col offset={1} span={12} style={{height: "100%"}}>
          <Checkbox.Group defaultValue={index == 0 ? dateSelectList[0].monthList : []} onChange={checkboxChangeHandler}>
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

    const addBtnClickHandler = () => {

      let index = ++selectViewIndex;

      let dateSelectView = (
        <Row type="flex" justify="center" align="middle" className="timeSelectBox">
          {
            renderYearSelectView(index)
          }

          {
            renderMonthSelectView(index)
          }

          <Col span={5} offset={1}>
            <Button className="addBtn" onClick={()=>{deleteBtnClickHandler(index)}}>删除</Button>
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
            renderYearSelectView(selectViewIndex)
          }

          {
            renderMonthSelectView(selectViewIndex)
          }

          <Col span={5} offset={1}>
            <Button className="addBtn" onClick={addBtnClickHandler}>添加</Button>
          </Col>
        </Row>
        {
          props.users.dateSelectViews
        }
      </div>
    )
  };


  const renderQueryView = () => {

    const queryBtnClickHandler = () => {

      dispatch({
        type: 'roomStatusManagement/monthRoomList',
        payload: {}
      });

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
          <Button className="queryBtn" onClick={queryBtnClickHandler}>查询</Button>
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
              <span>
                <div style={{float: 'left'}}>{item.name}</div>
                <div className="statusItem" style={{background: item.color}}/>
              </span>
            )
          })
        }
      </Row>
    );
  };

  /* 月房态列表 */
  const renderMonthRoomListView = () => {
    const roomList = [...props.users.monthRoomList];
    // if(document.getElementById('day-1-1') != undefined) {
    //    roomList = roomList.splice(0,1);
    // }
    // // roomList = roomList.splice(0,1);

    const renderMonthRoom = (room, roomIndex) => {

      let users = [];
      // console.log('roomMonth:renderMonthRoomListView>>');
      const renderDayRoom = (dayList) => {
        if (!dayList || dayList.length === 0) {
          return null;
        }
        // console.log('roomMonth:dayList>>', dayList);

        //{0: '空房', 1: '维修', 2: '脏房', 3: '样板房', 4: '住客房', 6: '出所', 7: '预约', 8: '取消维修'}
        let status = 0;
        let dayCustomerList = null;
        let hasUser = false;

        let result = dayList.map((day, dayindex) => {
          // 一天中的用户列表
          dayCustomerList = day.customerList;
          if (!dayCustomerList || !dayCustomerList.length) {
            // 空房
            status = 0;
          } else if (dayCustomerList.length === 1) {
            // 如果该天只有一个用户, 直接显示相应状态
            status = dayCustomerList[0].status || 7;
          } else if (dayCustomerList.length > 1) {
            // 重叠
            status = 9;
          }

          for (let j = 0; j < dayCustomerList.length; j++) {
            hasUser = false;

            for (let i = 0; i < users.length; i++) {
              if (users[i].customerId === dayCustomerList[j].customerId
                && users[i].lastIndex === dayindex - 1
                && users[i].status == dayCustomerList[j].status) {
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
            'reserve': status == 7, // 预约
            'repair': status == 1, // 维修
            'overlap': status == 9, // 重叠
          });
          // if (status == 0) {
          //   return;
          // }
          return (
            <div className="dayRoom"
                 data-room-index={roomIndex}
                 data-day-index={dayindex}
                 data-date={day.date}
                 id={`day-${roomIndex}-${dayindex}` }
            >
              <div className={stateBox}/>
            </div>
          )
        });


        const userBoxClickHandler = (e) => {
          let userBoxes = document.querySelectorAll(".userBox");

          for (let i = 0; i < userBoxes.length; i++) {
            userBoxes[i].classList.remove("active");
            let btns = userBoxes[i].querySelectorAll(".userBoxConfirm");
            for (let j = 0; j < btns.length; j++) {
              userBoxes[i].removeChild(btns[j]);
            }
          }

          e.target.classList.add("active");
          e.target.style.zIndex = ++zIndexCount;
        };

        const userBoxDbClickHandler = (e) => {

          // 首先要排除不是在确认入住或删除按钮上双击的
          // 因为以上两个按钮也是在这个容器内, 事件会冒泡
          if (!e.target.classList.contains("userBox")) {
            return;
          }

          // 如果是已入住状态, 是不能再次确认入住和删除的
          if (e.target.dataset.status == 4 || e.target.dataset.status == 1) {
            return;
          }

          let btn = document.createElement("div");
          btn.innerHTML = "确认入住";
          btn.className = "userBoxConfirm";

          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            let parentNode = e.target.parentNode;
            let dict = parentNode.dataset;

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

          // 如果是已入住状态, 是不能再次确认入住和删除的
          if (e.target.dataset.status == 4 || e.target.dataset.status == 1) {
            return;
          }

          let deleteBtn = document.createElement("div");
          deleteBtn.innerHTML = "删除";
          deleteBtn.className = "userBoxConfirm";
          e.target.appendChild(deleteBtn);

          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            let parentNode = e.target.parentNode;
            dispatch({
              type: 'roomStatusManagement/deleteUser',
              payload: {
                roomIndex: parentNode.dataset.roomIndex,
                customerId: parentNode.dataset.customerId,
                startIndex: parentNode.dataset.startIndex,
                endIndex: parentNode.dataset.endIndex,
                startDate: parentNode.dataset.startDate,
                status: parentNode.dataset.status,
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
          e.preventDefault();
          e.stopPropagation();

          let pageX = e.pageX;
          let target = e.target.parentNode;
          let targetWidth = target.offsetWidth;
          let unit = 0;
          let oldStartIndex = parseInt(target.dataset.startIndex);
          let oldEndIndex = parseInt(target.dataset.endIndex);
          let roomIndex = target.dataset.roomIndex;
          let customerId = parseInt(target.dataset.customerId);
          let customerName = target.dataset.customerName;
          let status = target.dataset.status;

          if (status == 1) {
            return
          }

            // 左端在入住状态下不可操作
          // if (status == 4) {
          // 我的断点
          //   return;
          // }


          document.onmousemove = (ee) => {
            let offsetX = ee.pageX - pageX;

            // 用户入住时间最短为1天
            if (offsetX + targetWidth < UNIT_WIDTH) {
              return;
            }

            let tempUnit = parseInt(offsetX / UNIT_WIDTH);

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

            unit = tempUnit;

            if (targetWidth + (unit * UNIT_WIDTH) >= UNIT_WIDTH) {
              target.style.width = targetWidth + (unit * UNIT_WIDTH) + "px";
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

        const dragStart = (event, user) => {
          dragOffsetX = event.nativeEvent.offsetX;
          dragOffsetY = event.nativeEvent.offsetY;

          event.target.classList.add("active");

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
                endDate: parseInt(user.startDate) + (user.dayCount - 1) * 86400000,
                roomIndex: roomIndex,
              },
            }
          });
        };

        for (let i = 0; i < users.length; i++) {
          let width = users[i].dayCount * UNIT_WIDTH + 'px';
          const content = <div>{users[i].customerName + '('
          + users[i].dayCount + '天, '
          + timeToDate(users[i].startDate)
          + '-'
          + timeToDate(users[i].startDate + (users[i].dayCount - 1) * 86400000)
          + ')'}</div>
          result.push(
            <Popover content={content} getPopupContainer={(e) => e} overlayClassName="popover-manual-top" arrowPointAtCenter={true}>
              <div className="userBox"
                   style={{
                     width: width,
                     left: users[i].startIndex * UNIT_WIDTH,
                   }}
                   draggable="true"
                   onDragStart={(event) => dragStart(event, users[i])}
                   data-room-index={roomIndex}
                   data-customer-id={users[i].customerId}
                   data-customer-name={users[i].customerName}
                   data-start-index={users[i].startIndex}
                   data-end-index={users[i].startIndex + users[i].dayCount - 1}
                   data-user-dayCount={users[i].dayCount}
                   data-start-date={users[i].startDate}
                   data-status={users[i].status}
                   onClick={userBoxClickHandler}
                   onDoubleClick={userBoxDbClickHandler}
                   onContextMenu={userBoxRightClickHandler}
              >
                {users[i].customerName}
                <a href="javascript:void(0)"
                   className="resizeBar"
                   title={users[i].dayCount + '天'}
                   onMouseDown={resizeBarMouseDownHandler}/>
              </div>
            </Popover>

          )
        }

        return result;
      };


      return (

        <div className="monthRoomBox">

          <div style={{
            height: "100%",
            position: "relative",
            paddingRight: "20px",
            minWidth: room.useAndBookingList.length * UNIT_WIDTH + 20 + 'px'
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
      let boxWidth = 0;

      for (let item of dateRulerList) {
        boxWidth += item.days * UNIT_WIDTH;
      }

      const renderFiveDays = (days) => {
        let result = [];

        let fiveDays = parseInt(days / 5);
        let remainder = days % 5;

        for (let i = 1; i <= fiveDays; i++) {
          result.push(
            <div className="fiveDayRuler" style={{
              width: 5 * UNIT_WIDTH + "px",
            }}>
              {i * 5}天
            </div>
          )
        }

        if (remainder) {
          result.push(
            <div className="fiveDayRuler" style={{
              width: remainder * UNIT_WIDTH + "px",
            }}>
            </div>
          )
        }

        return result;
      };

      return (
        <div className="daysRulerBox" style={{width: boxWidth + 2 + "px"}}>
          {
            dateRulerList.map(item => {
              return (
                <div className="itemRulerBox" style={{
                  width: item.days * UNIT_WIDTH,
                }}>
                  <div className="itemRulerBoxTop">
                    <div className="itemRulerBoxTitle">
                      {item.date}
                    </div>
                  </div>
                  <div className="itemRulerBoxBottom">
                    {
                      renderFiveDays(item.days)
                    }
                  </div>
                </div>
              )
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
            roomList.map((room) => {
              return (
                <div className="monthRoomNumberBox">
                  <div>

                    <div className="number">
                      {room.roomNo}
                    </div>
                    <div className="level">
                      v1
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="monthRoomRightBox">
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
        type: 'roomStatusManagement/monthRoomUpdate',
        payload: {}
      });
    };

    const oneKeyClicked = () => {
      dispatch({
        type: 'roomStatusManagement/setRowHousesVisible',
        payload: true
      });
    };

    return (
      <div className="bottomBar">
        <Button className="oneKeyBtn" onClick={oneKeyClicked}>一键排房</Button>
        <Button className="saveReserveBtn" onClick={saveReserveClickHandler}>保存</Button>
      </div>
    )
  };

  /**
   * 月房态主视图区
   */
  const monthMainView = () => {
    // console.log('roomMonth:MainRendering');
    return (

        <div className="main">
          <div className="headDiv">
            <Switch className='switch'
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

    const dragStart = (dragUser, event) => {
      dragOffsetX = event.nativeEvent.offsetX;
      dragOffsetY = event.nativeEvent.offsetY;

      dispatch({
        type: 'roomStatusManagement/userDragStart',
        payload: {
          dragUser: {
            ...dragUser,
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
          customers.map((costomer) => {
            return (
              <div className="customerItem" onClick={() => {
                onClicked(costomer)
              }} draggable="true" onDragStart={(event) => dragStart(costomer, event)}>
                {costomer.customerName}
              </div>
            )
          })
        }

        <div style={{textAlign: 'center'}}>
          <Button className="addCustomerBtn" onClick={addCustomer}>+ 添加客户</Button>
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
      <RowHousesModal/>
      <RowHousesWayModal selectCuntomer={SELECT_CUSTOMER}/>
    </div>
  )
};

class MonthStateClass extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch({type: 'roomStatusManagement/monthRoomList'});
  }

  render(){
    const View = monthStateView(this.props)
    return(
      <div> {View}</div>
    )
  }
}

export default MonthStateClass;
