import axios from 'axios';
import { message } from 'antd';
import { MD5 } from '@/utils/secret';
import { HtAjax } from '@/utils/axios';
import { ztWebHttp } from '@/common/host';
const instance = axios.create();

export function fetchApi(urlData = {}, data) {
  return HtAjax('POST', urlData, data);
}

export const uploadFile = (data) => {
  return new Promise((resolve, reject) => {
    const { file, uploadType = false, _md5 = false } = data;
    let token = localStorage.getItem('token');
    const requestData = {
      baseURL: ztWebHttp,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Apex-Token': token, // 用户token
      },
      url: '/file/fileUpLoad',
      method: 'POST',
    };
    let _string = '';
    let param = new FormData();
    param.append('files', file);
    param.append('uploadType', uploadType);
    requestData.data = param;
    instance(requestData)
      .then((res) => {
        console.log(res, '----instance--------');
        if (res.data.code === 200) {
            resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err) => {reject(err)});
  });
};
