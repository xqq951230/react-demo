
// 是否是生产环境
const production = window.location.host === 'gzt.zjsjy.gov.cn';

// 返回/退出地址
export const gztUrl = production ? 
  'https://gzt.zjsjy.gov.cn/home':
  'http://gzt-dev.zfy.zjsjy.gov/home';

//  缺省图标
export const noDataDefault = require('@/img/noDataDefault.png');


// start--业务分类管理、应用
// 应用状态
export const appTypeStatusArr = [
  { label: '启用', value: 1, color: '#52C41A' },
  { label: '停用', value: 0, color: '#F5222D' },
];

// end--业务分类管理、应用
