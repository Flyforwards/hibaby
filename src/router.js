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
          //地方字段
          {
              path: '/system/localchar',
              getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                      registerModel(app, require('./models/system'));
                      cb(null, require('./page/system/place/place.jsx'))
                  })
              }
          },
          //服务项目
          {
              path: '/system/serviceitem',
              getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                      registerModel(app, require('./models/system'));
                      cb(null, require('./page/system/service/service.jsx'))
                  })
              }
          },
          {
            path: '/system/pormission',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/users'));
                cb(null, require('./page/system/pormission/pormission.jsx'))
              })
            }
          },
          // 菜单管理
          {
            path: '/system/module',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/users'));
                cb(null, require('./page/system/module/module.jsx'))
              })
            }
          },
          // 日志查看
          {
              path: '/system/logsview',
              getComponent: (location, cb) => {
                  require.ensure([], (require) => {
                    registerModel(app, require('./models/system'));
                      cb(null, require('./page/system/LogView/LogView.jsx'))
                  })
              }
          },
          // 客户档案
          {
            path: '/crm/customer',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/system'));
                cb(null, require('./page/crm/customer/Customer.jsx'))
              })
            }
          },
          // 会员卡管理
          {
            path: '/crm/infocard',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./page/crm/infocard/InfoCard.jsx'))
              })
            }
          },
          //添加集团项目列表内容
          {
            path: '/demo/add',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/system'));
                cb(null, require('./page/system/management/Add.js'))
              })
            }
          },
          //添加地方项目列表
          {
            path: '/localchar/add',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/system'));
                cb(null, require('./page/system/place/Add.js'))
              })
            }
          },
          //查看集团列表信息

          //查看地方列表信息
          {
            path: '/localchar/find',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/system'));
                cb(null, require('./page/system/place/find.js'))
              })
            }
          },
          //地方列表查看编辑
          {
            path: '/localchar/editplace',
            getComponent: (location, cb) => {
              require.ensure([], (require) => {
                registerModel(app, require('./models/system'));
                cb(null, require('./page/system/place/editplace.js'))
              })
            }
          },



          {
            path: '/frommodal',
            getComponent: (location, cb) => {
            require.ensure([], (require) => {
            registerModel(app, require('./models/system'));
            cb(null, require('./page/crm/Customer/fromModal.jsx'))
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
              replace('/404')
            }
        }
    }
];
return <Router history={history} routes={routes} />;
}
export default RouterConfig;
