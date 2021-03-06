
import React from 'react'
import { Router, hashHistory,browserHistory } from 'react-router'
import { local, session } from 'common/util/storage.js'
import Layout from './framework/layout/Layout.jsx'
import Home from './page/home'
import './framework/app/base.css'
import './framework/app/common.scss'
import registerModel from './routs/register'
import systemConfig from './routs/systemConfig'
import crmConfig from './routs/crmConfig'
import userConfig from './routs/userConfig'
import guestRoomConfig from './routs/guestRoomConfig'
import mealsConfig from './routs/mealsConfig'
import serviceConfig from './routs/serviceConfig'
import inventoryConfig from  './routs/inventoryConfig'


function RouterConfig({ history, app }) {
  const welcome = [
        {
        path: '/welcome',
        getComponent: (location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('page/welcome.js'))
          })
        }
      },{
      path: '/noJurisdiction',
        getComponent: (location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('page/noJurisdiction.js'))
          })
        }
      },{
      path: '/public/style',
        getComponent: (location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('page/PublickStyleIndex.jsx'))
          })
        }
      }
  ]

let routes = [
    {
        path: '/',
        component: Layout,
        indexRoute: {
            component: Home,
            // onEnter(nextState, replace) {
            //     replace('/home')
            // }
        },
        onEnter(nextState, replace) {
          // 可以验证是否登录
        //  console.info("%c nextState >>>", "color:orange", nextState)
          if (!session.get('isLogin')) {
            replace('/login')
          }
        },
        childRoutes: [...welcome,...systemConfig(app),...crmConfig(app),...userConfig(app),...guestRoomConfig(app),...mealsConfig(app),...serviceConfig(app),...inventoryConfig(app)],
    },
    {
        path: '/login',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/login'));
                cb(null, require('./page/login/LoginIndex.js'))
            })
        }
    },
    {
        path: '/find',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/login'));
                cb(null, require('./page/login/FindPassIndex.js'))
            })
        }
    },
    {
        path: '/club',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/login'));
                cb(null, require('./page/login/ClubSelect.js'))
            })
        }
    },
    {
        path: '/print',
        getComponent: (location, cb) => {
          require.ensure([], (require) => {
            registerModel(app, require('models/membershipcard'));
            registerModel(app, require('models/dinner'));
            cb(null, require('./page/meals/nutritionist/printPageList.js'))
          })
        }
    },
    {
        path: '*',
        indexRoute: {
            onEnter(nextState, replace) {
              if (!session.get('isLogin')) {
                replace('/login')
              } else {
                replace('/404')
              }
            }
        }
    }
];
return <Router history={history} routes={routes} />;
}
export default RouterConfig;
