
import fetch from 'dva/fetch';
import { session } from 'common/util/storage.js';

function parseJSON(response) {
  const data = response.json();
  console.log({data})
  return data;
}

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     // 捕获业务异常抛出
//     return response;
//   } else {
//     throw response;
//   }
// }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // 处理业务错误
    console.log(response)
    // 处理业务错误
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  //console.log('request:error>>', response);
  throw error;
}


function catchErr(error) {
  throw error;
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
    .then(data => ({ data }))
    .catch(catchErr);
}
