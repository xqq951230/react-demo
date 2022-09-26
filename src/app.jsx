/* eslint-disable */
import { PageLoading, WaterMark } from '@ant-design/pro-layout';
import { ConfigProvider, message } from 'antd';
import { history, Link } from 'umi';
import { MenuTree } from "@/utils/menus";
import { fetchApi } from '@/utils/fetchApi';
import zhCN from 'antd/es/locale/zh_CN';

// 获取mock数据
import { menusData } from './Mock/app';

window.fetchApi = fetchApi;
const loginPath = '/login'; // 登录页地址
const token = localStorage.getItem('token');
const localStorageMenus =
  localStorage.getItem('menus') && localStorage.getItem('menus') !== 'undefined'
    ? localStorage.getItem('menus')
    : '[]';
const oldmenus = JSON.parse(localStorageMenus);
const isOpenTabsModal = false;

const defaultSrttings = {
  // 默认的主题配置
  navTheme: 'light',
  layout: 'top',
  contentWidth: 'Fixed',
  headerHeight: 48,
  primaryColor: '#395CF5',
  splitMenus: false,
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: false,
  pwa: false,
  iconfontUrl: '',
};
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// 初始化数据
export async function getInitialState() {
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    return {
      settings: defaultSrttings,
      token,
      menus: oldmenus,
    };
  }
  return {
    settings: {},
  };
}

// 布局设置
export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => null,
    menuHeaderRender: () => null,
    disableContentMargin: false,
    waterMarkProps: {
      content: '华亭科技',
    },
    onMenuHeaderClick: (e)=>{history.push('/welcome')},
    onPageChange: () => {},
    // logo: <img src={require('../public/jhlogo.png')} />,
    logo: false,
    childrenRender: (children, props) => {
      // layout  包裹
      const returnChildren = () => {
        let comp = null;
        if (isOpenTabsModal) {
          comp = children;
        } else {
          comp = children;
        }
        return <div >{comp}</div>;
      };
      message.config({maxCount: 1});
      return (
        <ConfigProvider locale={zhCN}>
        <WaterMark content="">
          {returnChildren()}
        </WaterMark>
        </ConfigProvider>
      );
    },
    menu: {
      params: {
        isTree: 1,
      },
      request: async (params, defaultMenuData) => {
        const menuData = MenuTree(menusData);
        setInitialState({
          ...initialState,
          menus: menuData,
        });
        return menuData;
      },
    },
    ...initialState?.settings,
  };
};
