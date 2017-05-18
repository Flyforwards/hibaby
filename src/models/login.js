
import * as loginService from '../services/login';
import { local, session } from 'common/util/storage.js'
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
          session.set("isLogin", true);
          yield put({
            type : "layout/getCurrentUserEndemic"
          });
				} else {
          throw err;
        }

			},

		}
	}
