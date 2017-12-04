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
//存货明细

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
// 查询所有存货分类节点
export function getAllStockClassificationNodes(values){
  return request('/crm/api/v1/inventory/getAllStockClassificationNodes',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

// 查询存货档案列表
export function getInventoryFilePageList(values){
  return request('/crm/api/v1/inventory/getInventoryFilePageList',{
    method:'POST',
    body:JSON.stringify(values)
  })
}


// 查询存货档案列表
export function addInventoryFile(values){
  return request('/crm/api/v1/inventory/addInventoryFile',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

// 删除存货档案
export function deleteInventoryFile(values){
  return request('/crm/api/v1/inventory/deleteInventoryFile',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

// 删除存货档案
export function getInventoryFileDetailById(values){
  return request('/crm/api/v1/inventory/getInventoryFileDetailById',{
    method:'POST',
    body:JSON.stringify(values)
  })
}


//创建修改辅助属性
export function addAttributes(values){
  return request('/crm/api/v1/inventory/addAttributes',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//查询辅助属性列表
export function getAttributesPageList(values){
  return request('/crm/api/v1/inventory/getAttributesPageList',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//删除辅助属性
export function deleteAttributes(values){
  return request('/crm/api/v1/inventory/deleteAttributes',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//根据辅助属性id查询详情
export function getAttributeDetailById(values){
  return request('/crm/api/v1/inventory/getAttributeDetailById',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//根据商品ID查询关联辅助属性
export function getAttributesGroupByGoodsId(values){
  return request('/crm/api/v1/inventory/getAttributesGroupByGoodsId',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

