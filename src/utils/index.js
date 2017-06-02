import request from './request';
import {session} from 'common/util/storage'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

// 根据元素查找下标
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

// 移除元素
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

Array.prototype.removeRepeatAttr = function(){
  var tmp={},a=this.slice();
  let j = 0;
  for( let i = 0;i<a.length;i++){
    if(!tmp[a[i].id]){
      tmp[a[i].id]=!0;
      j++;
    }else{
      this.splice(j,1);
    }
  };
}

Array.prototype.bubbleSortByKey = function (key) {
  var i = 0,
    len = this.length,
    j, d;
  for (; i < len; i++) {
    for (j = 0; j < len; j++) {
      if (this[i][key] < this[j][key]) {
        d = this[j];
        this[j] = this[i];
        this[i] = d;
      }
    }
  }
}


const keyToText = (dataSource, keyField, valueField, name='SYSTEM') => {
  let TEXT_ARRAY = session.get('TEXT_ARRAY') ? session.get('TEXT_ARRAY') : {};
  let tmp = {};
  // console.log('keyToText:data>>', dataSource);
  dataSource.map((item) => {
    const key = item[keyField];
    const value = item[valueField];
    tmp[key] = value;
  })
  // console.log('keyToText:data:tmp>>', tmp);
  TEXT_ARRAY[name] = tmp;
  session.set('TEXT_ARRAY', TEXT_ARRAY);
  return tmp;
}


module.exports = {
  queryURL,
  queryArray,
  arrayToTree,
  request,
  keyToText
}

