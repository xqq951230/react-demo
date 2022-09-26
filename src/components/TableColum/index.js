/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { Space, Checkbox, Popover, Button } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import styles from './index.less';

let ColumnConfig = []; // 选中
const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'move', color: '#999' }} />);
const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true,
  });
}
if (!Array.from) {
  Array.from = (function () {
    var symbolIterator;
    try {
      symbolIterator = Symbol.iterator ? Symbol.iterator : 'Symbol(Symbol.iterator)';
    } catch (e) {
      symbolIterator = 'Symbol(Symbol.iterator)';
    }

    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) return 0;
      if (number === 0 || !isFinite(number)) return number;
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    var setGetItemHandler = function setGetItemHandler(isIterator, items) {
      var iterator = isIterator && items[symbolIterator]();
      return function getItem(k) {
        return isIterator ? iterator.next() : items[k];
      };
    };

    var getArray = function getArray(T, A, len, getItem, isIterator, mapFn) {
      // 16. Let k be 0.
      var k = 0;

      // 17. Repeat, while k < len… or while iterator is done (also steps a - h)
      while (k < len || isIterator) {
        var item = getItem(k);
        var kValue = isIterator ? item.value : item;

        if (isIterator && item.done) {
          return A;
        } else {
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
        }
        k += 1;
      }

      if (isIterator) {
        throw new TypeError(
          'Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1',
        );
      } else {
        A.length = len;
      }

      return A;
    };

    // The length property of the from method is 1.
    return function from(arrayLikeOrIterator /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLikeOrIterator).
      var items = Object(arrayLikeOrIterator);
      var isIterator = isCallable(items[symbolIterator]);

      // 3. ReturnIfAbrupt(items).
      if (arrayLikeOrIterator == null && !isIterator) {
        throw new TypeError(
          'Array.from requires an array-like object or iterator - not null or undefined',
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      return getArray(T, A, len, setGetItemHandler(isIterator, items), isIterator, mapFn);
    };
  })();
}

function getChecklist(value) {
  return value.map((item) => {
    return {
      ...item,
      checked: true,
    };
  });
}

function CheckboxAll(value, list) {
  return list.map((item) => {
    return {
      ...item,
      checked: value,
    };
  });
}

function ifCheckAll(list) {
  let arr = [];
  let arrs = [];
  list.forEach((element) => {
    if (!element.checked) {
      arr.push(element);
    } else {
      arrs.push(element);
    }
  });
  ColumnConfig = arrs;
  return arr.length > 0 ? false : true;
}

// 去掉check属性
function deleChecked(list) {
  if (list.length > 0) {
    return list.map((item) => {
      // delete item.checked
      return {
        ...item,
      };
    });
  } else {
    return [];
  }
}
// 更换位置
function arrayMove(arr, oldIndex, newIndex) {
  arr[newIndex] = arr.splice(oldIndex, 1, arr[newIndex])[0];
  return arr;
}

function Apps(props) {
  const { data, check } = props;
  // const datas = getChecklist(data);
  const [datas, setDatas] = useState(data);
  const [items, useItems] = useState([]);
  const [checkAllVal, useCheckAllVal] = useState(true);

  useEffect(() => {
    const datas = getChecklist(data);
    setDatas(datas);
    useItems(datas);
  }, [data]);

  useEffect(() => {
    useCheckAllVal(ifCheckAll(items));
    props.getColumnConfig(ColumnConfig);
  }, [items]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // // console.log(items,'itemsitemsitemsitemsitemsitems')
    useItems((items) => [...arrayMove(items, oldIndex, newIndex)]);
  };
  const resCheckAll = () => {
    useItems(datas);
  };
  // props.check=resCheckAll
  if (typeof check == 'function') {
    check(resCheckAll);
  }

  const onCheckAllChange = (e) => {
    // // console.log(e.target.checked)
    useCheckAllVal(e.target.checked);
    useItems(CheckboxAll(e.target.checked, items));
  };
  const changeCheck = (e, value, index) => {
    // // console.log(e.target.checked, value)
    items[index].checked = e.target.checked;
    // // console.log(items)
    useItems((items) => [...items]);
  };
  const changeFixed = (index, value) => {
    // // console.log(e.target.checked, value)
    items[index].fixed = value;
    // console.log(items);
    useItems((items) => [...items]);
  };
  const actionItem = (value, indx) => {
    return (
      <div className="row-box" key={value.key}>
        <Space style={{ marginRight: 10 }} />
        <Checkbox checked={value.checked} onChange={(e) => changeCheck(e, value, indx)}>
          {value.title}
        </Checkbox>
      </div>
    );
  };

  const SortableItem = sortableElement(({ value, indx }) => (
    <div className="row-box">
      <Space style={{ marginRight: 10 }}>
        <DragHandle />
      </Space>
      <Checkbox checked={value.checked} onChange={(e) => changeCheck(e, value, indx)}>
        {value.title}
      </Checkbox>
      {/* <Space style={{ marginLeft: 10, float: 'right' }} >
                <Tooltip placement="top" title="固定在左边" onClick={() => { changeFixed(indx, 'left') }}>
                    <a>
                        <VerticalAlignTopOutlined />
                    </a>
                </Tooltip>
                <Tooltip placement="bottom" title="固定在右边" onClick={() => { changeFixed(indx, 'right') }}>
                    <a>
                        <VerticalAlignBottomOutlined />
                    </a>
                </Tooltip>
            </Space> */}
    </div>
  ));
  const TableColum = (
    <div className={styles.rowboxs}>
      <SortableContainer helperClass="row-dragging" onSortEnd={onSortEnd} useDragHandle>
        {items.map((value, index) => {
          {
            return value.fixed ? (
              actionItem(value, index)
            ) : (
              <SortableItem key={value.key} index={index} value={value} indx={index} />
            );
          }
        })}
      </SortableContainer>
    </div>
  );
  const Title = (
    <div style={{ margin: 10 }}>
      <Checkbox onChange={onCheckAllChange} checked={checkAllVal}>
        列展示
      </Checkbox>
      <Space style={{ textAlign: 'right', marginLeft: 50 }}>
        <a onClick={resCheckAll}>重置</a>
      </Space>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        content={TableColum}
        title={Title}
        // getPopupContainer={triggerNode => triggerNode.parentNode}
      >
        <Button>
          <SettingOutlined />
        </Button>
      </Popover>
    </>
  );
}

export default Apps;
