import _lodash from 'lodash';
// import { routers } from '@/common/routerList';

export const MenuTree = (data) =>
  data?.map((item) => {
    if (item.menuType != 'button') {
      item.path = item.url;
      // item.title = false;
      // item.name = item.menuName;
      // delete item.menuName;
      // item.icon = null; // 去掉图标
      item.routes = item.childrenList || [];
      item.component = [item.url || item.path]?.component;
      if (item.childrenList) {
        // item.exact=true;
        // delete item.children
        MenuTree(item.routes);
      }
    }

    // console.log(item,'item,')
    return item;
  });
