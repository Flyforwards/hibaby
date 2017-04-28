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

import pageRoutes from './page/routeConfig.js'


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
        childRoutes: [{
        path: '/Organization',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/Users'));
                cb(null, require('./page/Organization/Organization.jsx'))
            })
        }
    },
     {
        path: '/Customer',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/Users'));
                cb(null, require('./page/Customer/Customer.jsx'))
            })
        }
    },
    {
        path: '/demo/management',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/Users'));
                cb(null, require('./page/demo/management/management.jsx'))
            })
        }
    },
    {
        path: '/demo/position',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/Users'));
                cb(null, require('./page/demo/position/position.jsx'))
            })
        }
    },
    {
        path: '/demo/info-card-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./page/demo/info-card-demo/InfoCardDemo.jsx'))
            })
        }
    },
    {
        path: '/demo/LogView',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./page/demo/LogView/LogView.jsx'))
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
    }],
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
                cb(null, require('./framework/login/Login.jsx'))
            })
        }
    },
    {
        path: '/users',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                registerModel(app, require('./models/Users'));
          		cb(null, require('./routes/Users'));
            })
        }
    },
    // {
    //     path: '/Customer',
    //     getComponent: (location, cb) => {
    //         require.ensure([], (require) => {
    //             registerModel(app, require('./models/Users'));
    //             cb(null, require('./page/Customer/Customer.jsx'))
    //         })
    //     }
    // },
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


