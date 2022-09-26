export default [
  {
    path: '/welcome',
    name: '首页',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: './welcome',
  },
  {
    path: '/nav1',
    name: '导航一',
    component: './AppMarket',
  },
  {
    path: '/nav1-1',
    name: '导航一.一',
    component: './AppMarket',
  },
  {
    path: '/nav1-1-1',
    name: '导航一.一.一',
    component: './AppMarket',
  },
  {
    path: '/nav1-1-2',
    name: '导航一.一.二',
    component: './AppMarket',
  },
  {
    path: '/nav1-1-3',
    name: '导航一.一.三',
    component: './AppMarket',
  },
  {
    path: '/nav1-2',
    name: '导航一.二',
    component: './AppMarket',
  },
  {
    path: '/nav1-3',
    name: '导航一.三',
    component: './AppMarket',
  },
  {
    path: '/nav2',
    name: '导航二',
    component: './AppMarket',
  },
  {
    path: '/nav2-1',
    name: '导航二.一',
    component: './AppMarket',
  },
  {
    path: '/nav3',
    name: '导航三',
    component: './AppMarket',
  },
  {
    path: '/nav4',
    name: '导航四',
    component: './AppMarket',
  },
  {
    component: './404',
  },
];
