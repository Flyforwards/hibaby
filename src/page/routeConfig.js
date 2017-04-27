export default [
    // {
    //     path: '/home',
    //     getComponent: (location, cb) => {
    //         require.ensure([], (require) => {
    //             cb(null, require('./home'))
    //         })
    //     }
    // },
    //  {
    //     path: '/Customer/Customer',
    //     getComponent: (location, cb) => {
    //         require.ensure([], (require) => {
    //             registerModel(app, require('./models/Users'));
    //             cb(null, require('./Customer/Customer.jsx'))
    //         })
    //     }
    // },
    // demo
    {
        path: '/demo/management',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/management/management.jsx'))
            })
        }
    },
    {
        path: '/demo/info-card-demo',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/info-card-demo/InfoCardDemo.jsx'))
            })
        }
    },
    {
        path: '/demo/LogView',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./demo/LogView/LogView.jsx'))
            })
        }
    },
    //404
    {
        path: '/404',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./not-found'))
            })
        }
    }
]

