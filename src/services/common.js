import { HtAjax } from '@/utils/axios';
import { ztWebHttp } from '@/common/host';

// 部门列表
export async function orgList(data) {
  return HtAjax('POST', { url: '/sysarea/list.do', baseURL: ztWebHttp }, data);
}
// 数据字典
export async function dictNodeList(data) {
  return HtAjax('POST', { url: '/dict/nodeList.do', baseURL: ztWebHttp }, data);
}

// 编码，名称
export async function authAppList(data) {
  return HtAjax('POST', { url: '/appinfo/authAppList.do', baseURL: ztWebHttp }, data);
}
