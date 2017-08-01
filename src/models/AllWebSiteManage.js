
export default {
  namespace: 'AllWebSiteManage',
  state: {
    //hibaby服务
    ServiceActKey:'产前服务',
    //关于
    AboutActKey:'城市布局',
    // 美研
    BeautifulActKey:'妊娠期',
    //新妈
    NewMontherActKey:'星妈分享',
    //首页
    HomePageActKey:'1',
    //活动咨询
    ActivityActKey:'新闻动态',
    tabSelect:['产前服务','环保智能','专家团队Our team','园林景观'],
    mainSelect:'精致服务'
  },
  reducers: {
    tabChange(state,{payload:data}){
      return { ...state,...data}
    },
  },
  effects: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

      })
    }
  },
};
