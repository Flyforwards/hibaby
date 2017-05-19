
import React from 'react'
import { Router, hashHistory } from 'react-router'
import { local, session } from 'common/util/storage.js'
import Layout from './framework/layout/Layout.jsx'
import Home from './page/home'
import './framework/app/base.css'
import './framework/app/common.css'
import registerModel from './routs/register'
import systemConfig from './routs/systemConfig'
import crmConfig from './routs/crmConfig'


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
      path: '/test',
        getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/welcome.js'))
        })
      }
     },
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
          console.info("%c nextState >>>", "color:orange", nextState)
          if (!session.get('isLogin')) {
            replace('/login')
          }
        },
        childRoutes: [...welcome,...systemConfig(app),...crmConfig(app)],
    },
    {
        path: '/login',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/login'));
                cb(null, require('./page/login/Login.js'))
            })
        }
    },
    {
        path: '/find',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/login'));
                cb(null, require('./page/login/LoginFind.js'))
            })
        }
    },
    {
        path: '/club',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/login'));
                cb(null, require('./page/login/LoginClub.js'))
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
