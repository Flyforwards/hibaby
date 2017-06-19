import React from 'react';
import classNames from 'classnames';
import {
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Switch,
  message,
} from 'antd'

const monthStateView = (props) => {

  const {dispatch} = props;

  document.ondragover = function (event) {
    event.preventDefault();
  };

  document.ondrop = function (event) {
    event.preventDefault();

    let roomIndex = 0;
    let dayIndex = 0;
    if (event.target.className === "dayRoom") {
      roomIndex = event.target.dataset.roomIndex;
      dayIndex = event.target.dataset.dayIndex;
    } else if (event.target.parentNode.className === "dayRoom") {
      roomIndex = event.target.parentNode.dataset.roomIndex;
      dayIndex = event.target.parentNode.dataset.dayIndex;
    } else {
      return;
    }

    dispatch({
      type: 'roomStatusManagement/userDrop',
      payload: {
        roomIndex: roomIndex,
        dayIndex: dayIndex,
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
    let statuses = [
      {name: "预定", color: "#29C1A6"},
      {name: "入住", color: "#F57777"},
      {name: "重叠", color: "#F9EBCC"},
      {name: "出所", color: "#E3E3E3"},
      {name: "空房", color: "#fff"},
      {name: "维修", color: "#63C3E6"},
    ];


    return (
      <Row className="statusExplainBox" type="flex" align="middle">
        {
          statuses.map(item => {
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

          if (day.customerList.length === 1) {
            let hasUser = false;
            for (let i = 0; i < users.length; i++) {
              if (users[i].customerId == day.customerList[0].customerId) {
                hasUser = true;
                users[i].dayCount++;
              }
            }
            if (!hasUser) {
              users.push({
                startIndex: dayindex,
                dayCount: 1,
                ...day.customerList[0],
              })
            }
            roomState = 7;
          } else if (day.customerList.length >= 1) {
            roomState = 8;
          }


          let stateBox = classNames('stateBox', {
            'empty': roomState == 0,
            'reserve': roomState == 7,
            'overlap': roomState == 8,
          })


          return (
            <div className="dayRoom" data-room-index={roomIndex}
                 data-day-index={dayindex}>

              <div className={stateBox}>

              </div>
            </div>
          )
        });

        const UNIT_WIDTH = 9;
        for (let i = 0; i < users.length; i++) {
          let width = users[i].dayCount * UNIT_WIDTH + 'px';
          result.push(
            <div style={{
              height: "100%",
              width: width,
              position: "absolute",
              left: users[i].startIndex * UNIT_WIDTH,
              textAlign: "center",
              boxSizing: "border-box",
              paddingTop: "10px",
            }}>
              {users[i].customerName}
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
    }

    return (
      <div className="monthRoomListBox">
        {
          roomList.map((item, roomIndex) => renderMonthRoom(item, roomIndex))
        }
      </div>
    )
  }

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

    const dragStart = (index) => {
      dispatch({
        type: 'roomStatusManagement/userDragStart',
        payload: {
          userIndex: index
        }
      });
    };

    return (
      <div className="sidebar">
        <h3>客户列表</h3>

        {
          customers.map((costomer, index) => {
            return (
              <div className="customerItem" draggable="true" onDragStart={() => dragStart(index)}>
                {costomer.customerName}
              </div>
            )
          })
        }

        <div style={{textAlign: 'center'}}>
          <Button className="addCustomerBtn">+ 添加客户</Button>
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
    </div>
  )
};

export default monthStateView;
