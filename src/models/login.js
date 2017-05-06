
import * as loginService from '../services/login';
import { local, session } from '../common/util/storage.js'
import { routerRedux } from 'dva/router';


export default {
	namespace: 'login',
	state: {
		list: [],
		total: null,

	},
	reducers: {
		loginSave(state, { payload: { data, code } }) {
			let logindata = {...state,
				data,
				code
			};
			return logindata;
		},
		testSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let testdata = {...state,
				data,
				code
			};
			console.log(testdata)
			return testdata;
		}
		},
		submitSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let submitdata = {...state,
				data,
				code
			};
			console.log(submitdata)
			return submitdata;
		},
		effects: {
			*login({ payload: values }, { call, put }) {
				const { data: { data, code, err} } = yield call(loginService.login, values);
				if (code == 0 && err == null) {
          session.set("token", data.token);
          session.set('isLogin', true);
					yield put(routerRedux.push('/club'));
				} else {
          throw err;
        }

        // if (data.success) {
        //   // const from = queryURL('from')
        //   // yield put({ type: 'app/queryUser' })
        //   // if (from) {
        //   //   yield put(routerRedux.push(from))
        //   // } else {
        //   //   yield put(routerRedux.push('/dashboard'))
        //   // }
        // } else {
        //   throw data
        // }

			},

			// * test({
			// 	payload: values
			// }, {
			// 	call,
			// 	put
			// }) {
			// 	const {
			// 		data: {
			// 			data,
			// 			code
			// 		}
			// 	} = yield call(loginService.test, values);
            //
			// 	yield put({
			// 		type: 'testSave',
			// 		payload: {
			// 			data,
			// 			code
			// 		}
			// 	});
			// },
			// * findSubmit({
			// 	payload: values
			// }, {
			// 	call,
			// 	put
			// }) {
			// 	const {
			// 		data: {
			// 			data,
			// 			code
			// 		}
			// 	} = yield call(loginService.findSubmit, values);
            //
			// 	// yield put({ type: 'submitSave', payload: { data, code } });
			// 	if (code == 0) {
            //
			// 		yield put(routerRedux.push('/login'));
			// 	}
			// }
			// },

		// subscriptions: {
		// 	setup({
		// 		dispatch,
		// 		history
		// 	}) {
		// 		return history.listen(({
		// 			pathname,
		// 			query
		// 		}) => {
		// 			if (pathname === '/login') {
		// 				console.log(22222)
		// 				dispatch({
		// 					type: 'login',
		// 					payload: query
		// 				});
		// 			}
        //
		// 		})
		// 	}
		}
	}
