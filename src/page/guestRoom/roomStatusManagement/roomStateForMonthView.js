import React from 'react';
import classNames from 'classnames';
import {AddCustomerModal,RowHousesModal} from './roomStateForMonthModal';
import {
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Switch,
  message,
} from 'antd'

const UNIT_WIDTH = 9;

const statusExplain = [
  {name: "预定", color: "#29C1A6"},
  {name: "入住", color: "#F57777"},
  {name: "重叠", color: "#F9EBCC"},
  {name: "出所", color: "#E3E3E3"},
  {name: "空房", color: "#fff"},
  {name: "维修", color: "#63C3E6"},
];

const monthStateView = (props) => {
  const {dispatch} = props;

  document.ondragover = function (event) {
    event.preventDefault();
  };

  document.ondrop = (event) => {
    event.preventDefault();

    let roomIndex = null;
    let dayIndex = null;
    let date = 0;

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
      // 这种情况最恶心了
      // 需要根据位置判断在哪一天
      // 简直不想做....

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
      return;
    }

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
      type: 'roomStatusManagement/roomViewStateChange',
      payload: checked
    });
  };

  const renderMonthSelectView = () => {
    let years = [];
    let defaultYear = props.users.selectedYear;

    for (let i = 2000; i < 2099; i++) {
      years.push(<Option key={i} value={`${i}`}>{`${i}`}</Option>)
    }

    const addBtnClickHandler = () => {

      dispatch({
        type: 'roomStatusManagement/monthRoomList',
        payload: {}
      });

    };

    const yearSelectChangeHandler = (value) => {
      dispatch({
        type: 'roomStatusManagement/selectedYearChange',
        payload: {
          selectedYear: value,
        }
      });
    };

    const checkboxChangeHandler = (value) => {
      dispatch({
        type: 'roomStatusManagement/selectedMonthChange',
        payload: {
          selectedMonthList: value,
        }
      });
    };

    return (
      <Row type="flex" justify="center" align="middle" className="timeSelectBox">
        <Col span={5} className="yearSelectBox">
          <Select className="yearSelect"
                  defaultValue={defaultYear}
                  onChange={yearSelectChangeHandler}
          >
            {years}
          </Select>
          <span style={{margin: '10px'}}>年</span>
        </Col>

        <Col offset={1} span={12} style={{height: "100%"}}>
          <Checkbox.Group onChange={checkboxChangeHandler}>
            <Row gutter={16} style={{height: "50%"}} type="flex" align="middle">
              <Col span={4}><Checkbox value="1">1月</Checkbox></Col>
              <Col span={4}><Checkbox value="2">2月</Checkbox></Col>
              <Col span={4}><Checkbox value="3">3月</Checkbox></Col>
              <Col span={4}><Checkbox value="4">4月</Checkbox></Col>
              <Col span={4}><Checkbox value="5">5月</Checkbox></Col>
              <Col span={4}><Checkbox value="6">6月</Checkbox></Col>
            </Row>
            <Row gutter={16} style={{height: "50%"}} type="flex" align="middle">
              <Col span={4}><Checkbox value="7">7月</Checkbox></Col>
              <Col span={4}><Checkbox value="8">8月</Checkbox></Col>
              <Col span={4}><Checkbox value="9">9月</Checkbox></Col>
              <Col span={4}><Checkbox value="10">10月</Checkbox></Col>
              <Col span={4}><Checkbox value="11">11月</Checkbox></Col>
              <Col span={4}><Checkbox value="12">12月</Checkbox></Col>
            </Row>
          </Checkbox.Group>
        </Col>

        <Col span={5} offset={1}>
          <Button className="addBtn" onClick={addBtnClickHandler}>添加</Button>
        </Col>
      </Row>
    )
  };

  const renderQueryView = () => {
    return (
      <Row type="flex" justify="center" align="middle" className="queryBox">
        <Col span={5}>
          <div className="occupancyRateBox">
            <div>
              <div className="rateTitle">入住率</div>
              <div className="rateNumber">85.69%</div>
            </div>
          </div>
        </Col>

        <Col offset={1} span={12}>
          <span>楼层</span>
          <Select className="floorSelect"/>
        </Col>

        <Col span={5} offset={1}>
          <Button className="queryBtn">查询</Button>
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

  const renderMonthRoomListView = () => {
    const roomList = props.users.monthRoomList;

    const renderMonthRoom = (room, roomIndex) => {

      let users = [];

      const renderDayRoom = (dayList) => {
        if (!dayList || dayList.length === 0) {
          return null;
        }

        let result = dayList.map((day, dayindex) => {
          //{0: '空房', 1: '维修', 2: '脏房', 3: '样板房', 4: '住客房',5: '入所', 6: '出所', 7: '预约', 8: '取消维修'}
          let roomState = 0;
          // 一天中的用户列表
          let dayCustomerList = day.customerList;

          // 如果该天只有一个用户, 直接显示相应状态
          if (dayCustomerList.length === 1) {
            let hasUser = false;
            roomState = dayCustomerList[0].status || 7;

            for (let i = 0; i < users.length; i++) {
              if (users[i].customerId === dayCustomerList[0].customerId) {
                hasUser = true;
                users[i].dayCount++;
                users[i].lastIndex = dayindex;
                break;
              }
            }

            if (!hasUser) {
              users.push({
                ...dayCustomerList[0],
                startDate: day.date,
                startIndex: dayindex,
                lastIndex: dayindex,
                dayCount: 1,
              });
            }
          } else if (dayCustomerList.length >= 1) {
            for (let j = 0; j < dayCustomerList.length; j++) {
              let hasUser = false;

              for (let i = 0; i < users.length; i++) {
                if (users[i].customerId === dayCustomerList[j].customerId) {
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

            roomState = 9; // 重叠
          }

          let stateBox = classNames('stateBox', {
            'empty': roomState == 0, // 空房
            'repair': roomState == 1, // 维修
            'reserve': roomState == 7, // 预约
            'overlap': roomState == 9, // 重叠
            'checkingIn': roomState == 5, // 入住
          });

          return (
            <div className="dayRoom"
                 data-room-index={roomIndex}
                 data-day-index={dayindex}
                 data-date={day.date}
            >
              <div className={stateBox}/>
            </div>
          )
        });

        let zIndexCount = 100;
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
          if (!e.target.classList.contains("userBox")) {
            return;
          }
          let btn = document.createElement("div");
          btn.innerHTML = "确认入住";
          btn.className = "userBoxConfirm";

          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            let parentNode = e.target.parentNode;
            dispatch({
              type: 'roomStatusManagement/confirmCheckIn',
              payload: {
                roomIndex: parentNode.dataset.roomIndex,
                customerId: parentNode.dataset.customerId,
                startIndex: parentNode.dataset.startIndex,
                endIndex: parentNode.dataset.endIndex,
              }
            });
            parentNode.removeChild(e.target);
          });
          e.target.appendChild(btn);
        };

        const userBoxRightClickHandler = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!e.target.classList.contains("userBox")) {
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

          let customerList = roomList[roomIndex].useAndBookingList[oldStartIndex].customerList;

          // 左端在入住状态下不可操作
          for (let i = 0; i < customerList.length; i++) {
            let customer = customerList[i];
            if (customer.customerId == customerId) {
              if (customer.status == 5) {
                return;
              }
            }
          }

          document.onmousemove = (ee) => {
            let offsetX = ee.pageX - pageX;

            // 用户入住时间最短为1天
            if (offsetX + targetWidth < UNIT_WIDTH) {
              return;
            }

            unit = parseInt(offsetX / UNIT_WIDTH);

            if (targetWidth + (unit * UNIT_WIDTH) >= UNIT_WIDTH) {
              target.style.width = targetWidth + (unit * UNIT_WIDTH) + "px";
            }
          };

          document.onmouseup = () => {
            document.onmousemove = null;

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
              }
            });

            document.onmouseup = null;
          }
        };

        const dragStart = (user) => {
          dispatch({
            type: 'roomStatusManagement/userDragStart',
            payload: {
              dragUser: {
                customerId: user.customerId,
                customerName: user.customerName,
                reserveDays: user.dayCount,
                startIndex: user.startIndex,
                endIndex: user.startIndex + user.dayCount - 1,
                roomIndex: roomIndex,
              },
            }
          });
        };

        for (let i = 0; i < users.length; i++) {
          let width = users[i].dayCount * UNIT_WIDTH + 'px';
          result.push(
            <div className="userBox"
                 style={{
                   width: width,
                   left: users[i].startIndex * UNIT_WIDTH,
                 }}
                 draggable="true"
                 onDragStart={() => dragStart(users[i])}
                 data-room-index={roomIndex}
                 data-customer-id={users[i].customerId}
                 data-customer-name={users[i].customerName}
                 data-start-index={users[i].startIndex}
                 data-end-index={users[i].startIndex + users[i].dayCount - 1}
                 data-user-dayCount={users[i].dayCount}
                 data-start-date={users[i].startDate}
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
          )
        }

        return result;
      };


      return (
        <div className="monthRoomBox">
          <div className="monthRoomNumberBox">
            <div className="number">
              {room.roomNo}
            </div>
            <div className="level">
              v1
            </div>
          </div>
          <div style={{height: "100%", position: "relative"}}>
            {
              renderDayRoom(room.useAndBookingList)
            }
          </div>
        </div>
      )
    };

    const renderBottomBar = () => {

      const saveReserveClickHandler = () => {
        dispatch({
          type: 'roomStatusManagement/monthRoomUpdate',
          payload: {

          }
        });
      };

      const oneKeyClicked = () => {
        dispatch({
          type: 'roomStatusManagement/setRowHousesVisible',
          payload: true
        });
      }

      return(
        <div className="bottomBar">
          <Button className="oneKeyBtn" onClick={oneKeyClicked}>一键排房</Button>
          <Button className="saveReserveBtn" onClick={saveReserveClickHandler}>保存</Button>
        </div>
      )
    };

    return (
      <div className="monthRoomListBox">
        {
          roomList.map((item, roomIndex) => renderMonthRoom(item, roomIndex))
        }

        {
          renderBottomBar()
        }
      </div>
    )
  };

  /**
   * 月房态主视图区
   */
  const monthMainView = () => {
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

        {
          renderMonthRoomListView()
        }
      </div>
    )
  };


  const monthSidebarView = () => {

    const customers = props.users.monthStateCustomers;

    const dragStart = (dragUser) => {
      dispatch({
        type: 'roomStatusManagement/userDragStart',
        payload: {
          dragUser,
        }
      });
    };

    const addCustomer = () => {
      dispatch({
        type: 'roomStatusManagement/setCustomerVisible',
        payload: true
      });
    };

    return (
      <div className="sidebar">
        <h3>客户列表</h3>

        {
          customers.map((costomer) => {
            return (
              <div className="customerItem" draggable="true" onDragStart={() => dragStart(costomer)}>
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
      <AddCustomerModal/>
      <RowHousesModal/>
    </div>
  )
};

export default monthStateView;
