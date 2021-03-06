
import * as packageInfoService from '../services/packageInfo';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'
import { parse } from 'qs'
export default {
	namespace: 'packageInfo',
	state: {
		data:null,
		total:null,
		list:null,
		page:null,
		size:null,
		serviceList: [],
		roomData:null,
    packageItem:{}, // 套餐实体
		selectDataSave:null,
		getDictionary:null,
		suiteListByPage:[],
		roomFindById:null,
		commodityListByPage:[],
		chineseToPinyin:null,
    selectedRowKeys: [],
		grade:null,
		pagination: {
	      showQuickJumper: true,
	      showTotal: total => `共 ${total} 条`,
	      current: 1,
	      total: null,
	    },
    suitepagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    serviceinfopagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    commoditypagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
	    commodityFindById:null,
	},
	reducers: {
      delSave(state, { payload: { record }}) {
        state.selectedRows.remove(record);
        state.selectedRowKeys.remove(record.key);
        return {...state, };
      },
      changeSelect(state,{payload:{ selectedRowKeys }}){
        return {...state, selectedRowKeys}
      },

	    listByPageSave(state,{payload:{ list, pagination}}){
	      return {...state, list, pagination: {  ...state.pagination,...pagination }};
	    },
	    roomListSave(state,{payload:{ data:roomData,code }}){
	      let roomListSavedata = {...state,roomData,code};
	      return roomListSavedata
	    },
	    getCardLevelSave(state,{payload:{ data: grade }}){
	      let getCardLevelSavedata = {...state, grade };
	      return getCardLevelSavedata
	    },
	    findByIdSave(state,{payload:{ packageItem }}){

	      const selectedRowKeys = packageItem.serviceInfoList.map((record)=>{
          return record.serviceInfoId;
        })
        console.log(selectedRowKeys);
	      return {...state, packageItem, selectedRowKeys}
	    },
	    chineseToPinyinSave(state,{payload:{ data:chineseToPinyin,code }}){
	      let chineseToPinyindata = {...state,chineseToPinyin,code};
	      return chineseToPinyindata
	    },
	    roomFindByIdSave(state,{payload:{ data:roomFindById,code }}){
	      let roomFindByIdSavedata = {...state,roomFindById,code};
	      return roomFindByIdSavedata
	    },
	    commodityFindByIdSave(state,{payload:{ data:commodityFindById,code }}){
	      let commodityFindByIdSavedata = {...state,commodityFindById,code};
	      return commodityFindByIdSavedata
	    },
	    getDictionarySave(state,{payload:{ data:getDictionary,code }}){
	      let getDictionarySavedata = {...state,getDictionary,code};
	      return getDictionarySavedata
	    },
	    selectDataSave(state,{payload:{ data:selectData,code }}){
	      let selectDataSavedata = {...state,selectData,code};
	      return selectDataSavedata
	    },
	    suiteListByPageSave(state,{payload:{suiteListByPage,suitepagination}}){
	      return {...state, suiteListByPage, suitepagination: {  ...state.suitepagination,...suitepagination }};
	    },
	    commodityListByPageSave(state, { payload:{ commodityListByPage,commoditypagination }}){
			  return {...state, commodityListByPage, commoditypagination: {  ...state.commoditypagination,...commoditypagination}};
	    },

      serviceListSave(state,{payload:{ serviceList }}){
			  return {...state, serviceList,};
	    },
	},
	effects: {
		//获取套餐分页的列表
		*listByPage({payload: values}, { call, put }) {
			values = parse(location.search.substr(1))
		      if (values.page === undefined) {
		        values.page = 1;
		      }
		      if (values.size === undefined) {
		        values.size = 10;
		      }
		    const { data: { data, total, page, size, code } } = yield call(packageInfoService.listByPage, values);
			if (code == 0) {
				yield put({
					type: 'listByPageSave',
					payload: {
			            list: data,
			            pagination: {
			              current: Number(page) || 1,
			              pageSize: Number(size) || 10,
			              total: total,
			            },
			        },
				});
			}
		},
		//添加套餐
		*add({payload: values}, { call, put }) {
			const { data: { data, code, err }} = yield call(packageInfoService.add, values);
			if (code == 0) {
				message.success("添加套餐成功");
				yield put(routerRedux.push("/crm/service-info"));
			}
		},
		//修改套房信息
		*roomEdit({payload: values}, { call, put }) {
			const { data: { data, code, err }} = yield call(packageInfoService.roomEdit, values);
			if (code == 0) {
				message.success("修改套房信息成功");
				history.go(-1)
			}
		},
		//删除套房
		*roomDel({payload: values}, { call, put }) {
			const { data: { data, 	code, err }} = yield call(packageInfoService.roomDel, values);
			if (code == 0) {
				message.success("删除套房成功");
				yield put(routerRedux.push("/crm/suite"));
			}
		},
		//添加套房
		*roomAdd({payload: values}, { call, put }) {
			const { data: { data, code, err  }} = yield call(packageInfoService.roomAdd, values);
			if (code == 0) {
				message.success("添加套房成功");
				yield put(routerRedux.push("/crm/suite"));
			}
		},
		//修改商品信息
		*commodityFindEdit({payload: values}, { call, put }) {
			const {
				data: { data, code, err }} = yield call(packageInfoService.commodityFindEdit, values);
			if (code == 0) {
				message.success("修改商品信息成功");
				history.go(-1)
			}
		},
		//删除商品
		*commodityDel({payload: values}, { call, put }) {
			const {
				data: { data, code, err }} = yield call(packageInfoService.commodityDel, values);
			if (code == 0) {
				message.success("删除商品成功");
				yield put(routerRedux.push("/crm/commodity"));
			}
		},
		//添加商品
		*commodityAdd({payload: values}, { call, put }) {
			const {
				data: { data, code, err }} = yield call(packageInfoService.commodityAdd, values);
			if (code == 0) {
				message.success("添加商品成功");
				yield put(routerRedux.push("/crm/commodity"));
			}
		},

		//套房列表信息
		*suiteListByPage({payload: values}, { call, put }) {
			values = parse(location.search.substr(1))
		      if (values.page === undefined) {
		        values.page = 1;
		      }
		      if (values.size === undefined) {
		        values.size = 10;
		      }
		    const { data: { data, total, page, size, code } } = yield call(packageInfoService.suiteListByPage, values);
			if (code == 0) {
				yield put({
					type: 'suiteListByPageSave',
					payload: {
			            suiteListByPage: data,
                  suitepagination: {
			              current: Number(page) || 1,
			              pageSize: Number(size) || 10,
			              total: total,
			            },
			        },
				});
			}
		},

		//商品分页列表信息
		*commodityListByPage({payload: values}, { call, put }) {
			values = parse(location.search.substr(1))
		      if (values.page === undefined) {
		        values.page = 1;
		      }
		      if (values.size === undefined) {
		        values.size = 10;
		      }
		    const { data: { data, total, page, size, code } } = yield call(packageInfoService.commodityListByPage, values);
			if (code == 0) {
				yield put({
					type: 'commodityListByPageSave',
					payload: {
			            commodityListByPage: data,
                  commoditypagination: {
			              current: Number(page) || 1,
			              pageSize: Number(size) || 10,
			              total: total,
			            },
			        },
				});
			}
		},
		//根据字典主表id和删除标识和字典类型获取字典
		*getDictionary({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.getDictionary, values);
			if (code == 0) {
				yield put({
					type: 'getDictionarySave',
					payload: {
						data
					}
				});
			}
		},
		//汉字转拼音首字符
		*chineseToPinyin({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.chineseToPinyin, values);
			if (code == 0) {
				yield put({
					type: 'chineseToPinyinSave',
					payload: {
						data
					}
				});
			}
		},
		//修改套餐
		*edit({payload: values}, { call, put }) {
			const { data: { data, code, err }} = yield call(packageInfoService.edit, values);
			if (code == 0) {
				message.success("修改套餐成功");
				history.go(-1)
			}
		},
		//获取套房下拉数据
		*selectData({payload: values}, { call, put }) {
			const { data: { data, code }} = yield call(packageInfoService.selectData, values);
			if (code == 0) {
				yield put({
					type: 'selectDataSave',
					payload: {
						data
					}
				});
			}
		},
		//获取套餐等级下拉数据
		*getCardLevel({payload: values}, { call, put }) {
			const { data: { data, code }} = yield call(packageInfoService.getCardLevel, values);
			if (code == 0) {
				yield put({
					type: 'getCardLevelSave',
					payload: {
						data
					}
				});
			}
		},
		//根据套餐ID查询套餐详情
		*findById({payload: values}, { call, put }) {
			const { data: { data, code  }} = yield call(packageInfoService.findById, values);
			if (code == 0) {
				yield put({
					type: 'findByIdSave',
					payload: { packageItem: data }
				});
			}
		},
		//根据ID查询商品信息
		*commodityFindById({payload: values}, { call, put }) {
			const { data: { data, code  }} = yield call(packageInfoService.commodityFindById, values);
			if (code == 0) {
				yield put({
					type: 'commodityFindByIdSave',
					payload: {
						data
					}
				});
			}
		},
		//根据套房ID查询套房详情
		*roomFindById({payload: values}, { call, put }) {
			const { data: { data, code }} = yield call(packageInfoService.roomFindById, values);
			if (code == 0) {
				yield put({
					type: 'roomFindByIdSave',
					payload: {
						data
					}
				});
			}
		},

		//获取房间分页的列表
		*roomList({payload: values}, { call, put }) {
			const { data: { data, code }} = yield call(packageInfoService.roomList, values);
			if (code == 0) {
				yield put({
					type: 'roomListSave',
					payload: {
						data
					}
				});
			}
		},
	    // 服务项目 列表
    *getServiceList({payload: values}, { call, put }) {
			const { data: { data, code }} = yield call(packageInfoService.getServiceList, values);
			if (code == 0) {
			  if (data && data.length > 0) {
			    data.map((record)=>{
			      record.usageCount = 1;
          })
        }
				yield put({
					type: 'serviceListSave',
					payload: {
            serviceList: data,
					}
				});
			}
		},
		//删除套餐信息
		*del({payload: values}, { call, put }) {
			const { page, pageSize, dataId } = values
			const { data: { data, code, err }} = yield call(packageInfoService.del, values);
			if (code == 0) {
				message.success("删除成功");
				yield put(routerRedux.push("/crm/service-info"));
			}
		},
	},
	subscriptions: {
		setup({ dispatch, history }) {
	        return history.listen(({ pathname, query }) => {
	        if (pathname === '/crm/commodity') {
	          dispatch({
	            type: 'commodityListByPage',
	            payload: query
	          });
	        }
	        if (pathname === '/crm/suite') {
	          dispatch({
	            type: 'suiteListByPage',
	            payload: query
	          });
	        }

	        if (pathname === '/crm/service-info') {
		         dispatch({
		            type: 'listByPage',
		            payload: query
		        });
	        }
	        if (pathname == '/crm/service-info/add') {
            dispatch({
              type: 'getServiceList',
              payload: { }
            });
            dispatch({
              type: 'getDictionary',
              payload: {
                "abName":"TCLX" ,
                "softDelete": 0
              }
            });
            dispatch({
              type: 'selectData',
              payload: { }
            });
           dispatch({
              type: 'roomList',
              payload: { }
            });
            dispatch({
              type: 'getCardLevel',
              payload: { }
            });
          }
	      })
	    }
	},
};
