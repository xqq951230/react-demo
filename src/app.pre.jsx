/* eslint-disable */
import { PageLoading, SettingDrawer, WaterMark, ProBreadcrumb } from '@ant-design/pro-layout';
// import { ConfigProvider, message } from 'antd';
import { userInfoAndMenu } from '@/services/login';
import { history, Link, useModel } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import zhCN from 'antd/es/locale/zh_CN';
import TabsView from '@/components/TabsView';
import { MenuTree } from '@/utils/menus.js';
import { fetchApi } from '@/utils/fetchApi';

window.fetchApi = fetchApi;
const loginPath = '/login'; // 登录页地址
const welcomePath = '/welcome'; // 欢迎页/工作台地址
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
  layout: 'mix',
  contentWidth: 'Fluid',
  headerHeight: 48,
  primaryColor: '#395CF5',
  splitMenus: false,
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '统一工作台综合管理系统',
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
  // console.log(token,'12333333333')
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
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

// 布局设置
export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: '华亭科技',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // console.log(initialState,'initialStateinitialStateinitialStateinitialStateinitialState')
      // 权限控制  如果页面不在页面权限里面  就到登录页面 如果没有登录，重定向到 login
      // const { location } = history;
      //
      if (location.pathname == '/welcome111') {
        message.error('你没有该权限，请联系管理!');
        history.goBack();
      }
    },
    menuHeaderRender: undefined,
    logo: <img src={require('../public/jhlogo.png')} />,
    childrenRender: (children, props) => {
      // layout  包裹
      const returnChildren = () => {
        let comp = null;
        if (isOpenTabsModal) {
          comp = !props.location?.pathname?.includes(loginPath) ? (
            <TabsView children={children} home="/welcome" />
          ) : (
            children
          );
        } else {
          comp = children;
        }
        return <div style={{ padding: '.2rem', background: '#fff' }}>{comp}</div>;
      };
      return (
        // <ConfigProvider locale={zhCN}>
        <WaterMark content="华亭科技">
          {location.pathname != welcomePath && location.pathname != loginPath && (
            <ProBreadcrumb
              style={{
                padding: '12px',
                width: '100%',
                background: '#fff',
                marginBottom: ' 12px',
                borderRadius: '5px',
              }}
            />
          )}
          {returnChildren()}
          {/*{!props.location?.pathname?.includes(loginPath) && (*/}
          {/*  <SettingDrawer*/}
          {/*    settings={initialState?.settings}*/}
          {/*    hideHintAlert={true}*/}
          {/*    hideCopyButton={true}*/}
          {/*    disableUrlParams={true}*/}
          {/*    enableDarkTheme*/}
          {/*    onSettingChange={(settings) => {*/}
          {/*      setInitialState((preInitialState) => ({ ...preInitialState, settings }));*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
        </WaterMark>
        // </ConfigProvider>
      );
    },
    menu: {
      params: {
        token: initialState?.token,
      },
      request: async (params, defaultMenuData) => {
        // 默认菜单
        let menuData = [
          {
            path: '/login',
            layout: false,
            component: './user/Login',
          },
          {
            component: './404',
          },
        ];
        // 登录页不操作
        if (history.location.pathname !== loginPath) {
          menuData = await userInfoAndMenu({ appId: 'pt' }).then((res) => {
            const menus = MenuTree(res?.result?.list);
            localStorage.setItem('menus', JSON.stringify(menus));
            setInitialState({
              ...initialState,
              menus,
            });
            return menus;
          });
        }

        return menuData;
      },
    },
    ...initialState?.settings,
  };
};
