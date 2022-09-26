import { HtAjax } from '@/utils/axios';
import { ztWebHttp } from '@/common/host';

// 登录接口
export async function UserLogin(data) {
  return HtAjax('POST', { url: '/common/userLogin.do', baseURL: ztWebHttp }, data);
}

// 获取用户个人信息
export async function getUserLoginInfo(data) {
  return HtAjax('POST', { url: '/logUser/getUserLoginInfo', baseURL: ztWebHttp }, data);
}

// 获取用户菜单信息
export async function getUserLoginMenuInfo(data) {
  return HtAjax('POST', { url: '/logUser/getUserLoginMenuInfo', baseURL: ztWebHttp }, data);
}

// 页面嵌入cookies获取
export async function getcookies(data) {
  return HtAjax('POST', { url: '/loginc2f/getcookies', baseURL: ztWebHttp }, data);
}
