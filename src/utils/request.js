
import fetch from 'dva/fetch';
import { session } from 'common/util/storage.js';
import { message } from 'antd';

function parseJSON(response) {
  return response.json();
}



function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  // let error = new Error(response.statusText);
  let error = new Error('获取数据异常');
  if (response.status == 504) {
    error = new Error( "请求超时");
  }
  error.response = response;
  //console.log('request:error>>', response);
  throw error;
}


function catchErr(error) {
  throw error;
}

function checkCode(data) {
  const { code, err } = data;
  // const whiteList = [6];
  if (code != 0) {
    if (code == 5) { // 未登陆
      if (location.pathname != '/login') {
        location.href = '/login'
      }
    } else {
      const error = new Error(err || "请求错误" );
      throw error;
    }
  }
  return { data };
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  if (! new RegExp("/login").test(url)){
    const headers = {
      "Content-Type":"application/json",
      "USER-TOKEN":session.get("token")
    };
    options = {...options, headers};
  } else {
    const headers={
      "Content-Type":"application/json"
    }
    options = {...options, headers};
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch(catchErr);
}
