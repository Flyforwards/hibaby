/**
 * Created by Administrator on 2017/11/21.
 */


import request from '../utils/request';

//保存创建仓库
export function saveWarehouse(values){
  return request('/crm/api/v1/inventory/saveWarehouse', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//删除仓库信息
export function deleteWarehouse(values){
  return request('/crm/api/v1/inventory/deleteWarehouseById',{
    method:'POST',
    body:JSON.stringify(values),
  })
}

//查询仓库
export function getWarehousePageList(values){
  return request('/crm/api/v1/inventory/getWarehousePageList',{
    method:'POST',
    body:JSON.stringify(values),
  })
}

//根据仓库ID查询仓库详情

export function getWarehouseDetailById(values){
  return request('/crm/api/v1/inventory/getWarehouseDetailById',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//仓库明细

export function getInventoryList(values){
  return request('/crm/api/v1/inventory/getInventoryList',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

//查询存货分类
export function getStockPageList(values){
  return request('/crm/api/v1/inventory/getStockPageList',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//创建存货分类
export function addStock(values){
  return request('/crm/api/v1/inventory/addStock',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//查询上级分类
export function getParentList(values){
  return request('/crm/api/v1/inventory/getParentList',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//根据存货分类id查询详情
export function getStockDetailById(values){
  return request('/crm/api/v1/inventory/getStockDetailById',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//删除存货分类
export function deleteStock(values){
  return request('/crm/api/v1/inventory/deleteStock',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
