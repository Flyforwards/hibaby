/*import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
*/

import React from 'react'

import {Router, hashHistory} from 'react-router'

import './framework/app/base.css'
import './framework/app/common.css'

import {local, session} from './common/util/storage.js'

import Layout from './framework/layout/Layout.jsx'
import Home from './page/home'



const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}
function RouterConfig({ history, app }) {

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
        childRoutes: [
          // 组织架构
            {
              path: '/system/organization',
              getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                      registerModel(app, require('./models/system'));
                      cb(null, require('./page/system/organization/Organization.jsx'))
                  })
              }
          },
          // 集团字段
          {
              path: '/system/groupchar',
              getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                      registerModel(app, require('./models/system'));
                      cb(null, require('./page/system/management/management.jsx'))
                  })
              }
          },
          // 职位管理
          {
              path: '/system/position',
              getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                      registerModel(app, require('./models/users'));
                      cb(null, require('./page/system/position/position.jsx'))
                  })
              }
          },
          // 日志查看
          {
              path: '/system/logsview',
              getComponent: (location, cb) => {
                  registerModel(app, require('./models/system'));
                  require.ensure([], (require) => {
                      cb(null, require('./page/system/LogView/LogView.jsx'))
                  })
              }
          },
          {
            path: '/system/customer',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/users'));
                cb(null, require('./page/customer/Customer.jsx'))
              })
            }
          },
          {
            path: '/system/infocard',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./page/system/infocard/InfoCard.jsx'))
              })
            }
          },
          {
            path: '/demo/add',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/system'));
                cb(null, require('./page/system/management/Add.js'))
              })
            }
          },
          {
            path: '/demo/view',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/system'));
                cb(null, require('./page/system/management/View.js'))
              })
            }
          },
          {
            path: '/fromModal',
            getComponent: (location, cb) => {
            require.ensure([], (require) => {
            registerModel(app, require('./models/system'));
            cb(null, require('./page/Customer/fromModal.jsx'))
          })
          }
          },

          //404
          {
              path: '/404',
              getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                      cb(null, require('./page/not-found'))
                  })
              }
          }
        ],
        onEnter(nextState, replace) {
            // 可以验证是否登录
            console.info("%c nextState >>>", "color:orange", nextState)
            if (!session.get('isLogin')) {
                replace('/login')
            }
        }
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


