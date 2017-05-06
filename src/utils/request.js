
import fetch from 'dva/fetch';
import { session } from 'common/util/storage.js';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}

function catchErr(response) {
  throw response.statusText;
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
      "USER_TOKEN":session.get("token")
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
