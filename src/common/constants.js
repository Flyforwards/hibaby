import {session} from 'common/util/storage';

let TEXT_ARRAY = {};
TEXT_ARRAY = session.get('')

const keyToText = (dataSource, keyField, valueField, name='SYSTEM') => {

}

















export const PAGE_SIZE = 6;
export const positions = ["产品经理","项目经理","总经理","前端工程师"];
export const departments = ["信息管理部1","信息管理部2","信息管理部3","信息管理部4"];
export const locals = ["总部","地方"];
export const roleId = ["普通员工","特殊员工","领导"];
export const status = ["正常","异常"];
export const NUM_TO_TEXT = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十四', '十六', '十七', '十八',]

export const permission_page_size = 10;

// department/getDeptList   获取部门字典的接口 后期转换
export const departmentDict = ["信息部..","信息部..","信息部..","信息部..","总办","财务部","运营部","青岛财务部","青岛运营部","信息部","信息部","信息部","信息部"];
// POST /crm/api/v1/position/getPosition   获取部门职位的接口 后期转换
export const positionDict = ["总监0..","总监1..","信息总监","信息经理","产品经理","前端工程师","技术6..","技术7..","技术8..","技术9..","技术10..","信息部","信息部6","信息部6","信息部7","信息部8","信息部9","信息部10"];


export const filterItemList = [
  {id: 1, name: "年龄"},{id: 2, name: "预产期"},{id: 3, name: "孕期"},{id: 4, name: "生产医院"},
  {id: 5, name: "第几胎"},{id: 6, name: "客资来源"},{id: 7, name: "关注点"},{id: 8, name: "意向套餐"},
  {id: 9, name: "搜索关键字"},{id: 10, name: "操作者1"},{id: 11, name: "现住址"},{id: 12, name: "籍贯"},
  {id: 13, name: "名族"},{id: 14, name: "购买套餐"},{id: 15, name: "会员身份"},{id: 16, name: "操作者2"},
  {id: 17, name: "宝宝生产日期"}]


