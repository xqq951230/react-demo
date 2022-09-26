import _loadsh from 'lodash';
import { useModel } from 'umi';


// 校验按钮权限
export const renderHasBtnAuth=(data, key='url')=>{
  let menus = localStorage.getItem('menus');
  menus = (menus && menus != 'undefined') ? JSON.parse(menus) : [];
  const list = treeToList(menus, 'childrenList')
  // const {initialState, setInitialState} = useModel('@@initialState');
  // console.log(data, list, menus, '=====================?==========');
  // const btnList = initialState?.btnList||[];
  const findIndex = _loadsh.findIndex(list,(n)=>{ return n[key] === data});
  return findIndex > -1;
}

// htForm表单校验数字
export const handleValidator = (rule, value, num, text='') => {
  if (value?.length > num) {
    return Promise.reject(`请输入${num}字以内${text}`);
  }
  return Promise.resolve();
};

// 表格高度
export const getTableScroll = ({ extraHeight, id }) => {
  if (typeof extraHeight === 'undefined') {
    extraHeight = 175;
  }
  let tHeader = null;
  if (id) {
    tHeader = document.getElementById(id)
      ? document.getElementById(id).getElementsByClassName('ant-table-thead')[0]
      : null;
  } else {
    tHeader = document.getElementsByClassName('ant-table-thead')[0];
  }
  // 表格内容与顶部的距离
  let tHeaderBottom = 0,
    tHeaderTop = 0;
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom;
    tHeaderTop = tHeader.getBoundingClientRect().top;
  }

  
  // 窗体高度-表格内容顶部的高度-表格内容底部的高度
  let height = `calc(100vh - ${tHeaderTop + extraHeight}px)`;
  // console.log(tHeaderTop,'========thead============', height);
  return height;
};

// 获取其他高度
export const OtherHeight = ({extraHeight=44, id}) =>{
  let top = 0;
  const topElement = document.getElementById(id)
  if(topElement){
    top = topElement.getBoundingClientRect().top;
  }
  // console.log(id,topElement,'==??===id===');
  return `calc(100vh - ${top + extraHeight}px)`;
}

export const bytesTosize = (bytes) => {
  if (bytes == 0) return '0 B';
  let k = 1024;
  let sizes = ['B', 'kb', 'MB', 'GB', 'TB', 'PB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
};

/*更改后端数据成为我们需要的*/
export const changeData = (obj) => {
  const {
    data = [],
    keyList = [],
    type = 'tree',
    children = 'children',
    isDelBeforekey = false,
  } = obj;
  const newData = data?.map((element) => {
    keyList.forEach((item) => {
      element[item?.after] = element[item?.before];
      if (isDelBeforekey) {
        delete element[item?.before];
      }
    });
    if (type == 'tree' && element[children]) {
      const params = {
        data: element[children],
        keyList,
        type,
        children,
        isDelBeforekey,
      };
      changeData(params);
    }
    return element;
  });
  return newData;
};

/*根据对象中某字段对数组进行分组*/
export const groupByItem = (array, f) => {
  const groups = {};
  array.forEach(function (o) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  debugger;
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
};

/*数组转tree结构数据*/
export const composeTree = (list = [], idF, pIdF) => {
  // const data = _loadsh.assign(list);
  const data = JSON.parse(JSON.stringify(list));
  const result = [];
  if (!Array.isArray(data)) {
    return result;
  }
  data.forEach((item) => {
    delete item.children;
  });
  const map = {};
  data.forEach((item) => {
    let id = idF(item);
    map[id] = item;
  });
  data.forEach((item) => {
    let pid = pIdF(item);
    const parent = map[pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};
/*拍平树*/
// export const composeArray=(node)=>{
//     if(node){
//         let stack = _loadsh.assign(node,[]);
//         // console.log(stack,'stackstackstackstack')
//         const data = [];
//         while(stack.length != 0){
//             let pop = stack.pop();
//             data.push(pop)
//             let children = pop.children
//             if(children){
//                 for(let i = children.length-1; i >=0; i--){
//                     stack.push(children[i])
//                 }
//             }
//         }
//         return data
//     }
// }

export const composeArray = (tree, config) => {
  const { children } = config;
  const result = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children]) {
      continue;
    }
    result.splice(i + 1, 0, ...result[i][children]);
  }
  return result;
};

// 树结构转一维数组，并删除children
export const treeToList = (data = [], children = 'children') => {
  return data.reduce((acc, cur) => {
    if (Array.isArray(cur[children])) {
      const copyCur = { ...cur };
      delete copyCur[children];
      return acc.concat(copyCur, treeToList(cur[children]));
    } else {
      return acc.concat(cur);
    }
  }, []);
};

// 两个接口重复的去掉
export const getDiffArray = (arr1, arr2) => {
  let temp = []; //临时数组1
  let newArray = []; //临时数组2
  for (let i = 0; i < arr1.length; i++) {
    temp[arr1[i]] = true; //巧妙地方：把数组B的值当成临时数组1的键并赋值为真
  }
  for (let j = 0; j < arr2.length; j++) {
    if (!temp[arr2[j]]) {
      newArray.push(arr2[j]); //巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
    }
  }
  return newArray;
};

// 根据子节点查找所有父节点数据
export function getParent(array = [], key) {
  let result = [];
  let toToo = true;
  const catchData = (array = [], key) => {
    array.forEach((item) => {
      if (!toToo) return;
      result.push(item);
      if (item['key'] === key) {
        toToo = false;
      } else if (item['children']) {
        catchData(item['children'], key);
      } else {
        result.pop();
      }
    });
    toToo && result.pop();
  };
  catchData(array, key);
  return result;
}

export const getArrEqual = (arr1, arr2) => {
  let newArr = [];
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j] === arr2[i]) {
        newArr.push(arr1[j]);
      }
    }
  }
  return newArr;
};

//产生一个hash值，只有数字，规则和java的hashcode规则相同
function hashCode(str) {
  var h = 0;
  var len = str.length;
  var t = 2147483648;
  for (var i = 0; i < len; i++) {
    h = 31 * h + str.charCodeAt(i);
    if (h > 2147483647) h %= t; //java int溢出则取模
  }
  /*var t = -2147483648 * 2;
   while (h > 2147483647) {
   h += t
   }*/
  return h;
}
//时间戳来自客户端，精确到毫秒，但仍旧有可能在在多线程下有并发，
//尤其hash化后，毫秒数前面的几位都不变化，导致不同日期hash化的值有可能存在相同，
//因此使用下面的随机数函数，在时间戳上加随机数，保证hash化的结果差异会比较大
/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** 用法  randomWord(false,6);规定位数 flash
 *      randomWord(true,3，6);长度不定，true
 * arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
 */
function randomWord(randomFlag, min, max) {
  var str = '',
    range = min,
    arr = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

export const gethashcode = () => {
  //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
  var timestamp = new Date().valueOf();
  var myRandom = randomWord(false, 6);
  var hashcode = hashCode(myRandom + timestamp.toString());
  return hashcode;
};
