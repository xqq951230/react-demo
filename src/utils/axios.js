import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { isArray } from 'lodash';
import { history } from 'umi';
import { gztUrl } from '@/common/common';
const install = axios.create();

export const HtAjax = (method = 'GET', { url, baseURL, params }, data) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token');
    const requestData = {
      baseURL,
      headers: {
        client_code: '123', // 接入端编码
        'Apex-Token': token, // 用户token
        gateway_uuid: 'system', // 接口网关令牌
      },
      method,
      url,
      params,
    };
    if (data) {
      requestData.data = JSON.stringify(data);
      // requestData.data = qs.stringify(data);
      requestData.headers['Content-Type'] = 'application/json';
    }
    if (method === 'GET' && data) {
      requestData.params = data;
    }
    install(requestData)
      .then((response) => {
        if (response.status !== 200) reject(response);
        if (response.status === 200) {
          const res = response.data;
          switch (res.code) {
            case 200:
              resolve(res);
              break;
            case 101012001: // 未登录
              message.destroy();
              message.error('登录信息已失效，请重新登录！');
              // history.push('/login');
              // window.location.href = gztUrl;
              reject(res);
              break;
            case 2050:
              message.destroy();
              message.error('无权限');
              resolve(res);
              break;
            default:
              message.destroy();
              message.error(res.message);
              resolve(res);
              break;
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const HtAjaxFile = (method = 'GET', { url, baseURL }, data) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token');
    const requestData = {
      baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Apex-Token': token, // 用户token
      },
      responseType: 'blob',
      method,
      url,
      data,
    };
    if (data) {
      // 对data里的空属性做处理
      for (let key in data) {
        if (data[key] == '' || data[key] == undefined) {
          delete data[key];
        }
      }
      requestData.data = JSON.stringify(data); // qs.stringify(data);
    }

    if (method === 'GET' && data) {
      requestData.params = data;
    }
    install(requestData)
      .then((response) => {
        if (response.status !== 200) reject(response);
        if (response.status === 200) {
          const res = response.data;
          // console.log('sssssss', response.headers['content-disposition'].split("''")[1]);
          resolve({
            data: res,
            fileName: response.headers['content-disposition'].split("''")[1],
            mime: response.headers.mime,
          });
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status && err.response.status === 999) {
          history.push('/');
        } else {
          message.error('服务器错误！！！');
          reject(err);
        }
      });
  });
};
