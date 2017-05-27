
import * as loginService from '../services/login';
import { local, session } from 'common/util/storage.js'
import { routerRedux } from 'dva/router';
import { message } from 'antd';

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

      *getVerCode({ payload: values }, { call, put }) {
        const { data: { data, code, err} } = yield call(loginService.getVerCode, values);
        if (code == 0 && err == null) {
          message.success("发送验证码成功");
        }
      },

      *findSubmit({ payload: values }, { call, put }) {
        const  {data: {data, code}}  = yield call(loginService.findSubmit, values);
        if(code == 0) {
          message.success("密码设置成功，请重新登录");
          yield put(routerRedux.push('/login'));
        }
      },
		}
	}
