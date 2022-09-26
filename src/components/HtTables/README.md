---
2021.12.29
---

## index 文件

这里主要做些数据的处理和接口请求。

## Filter 文件

封装的表格搜索

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fromFields | 搜索数据 | `array` | [] |
| beforeSearchFunc | 搜索前触发，可对入参进行处理 | `(value?: Object) => void` | - |
| formItemNumber | 一行展示的搜索个数 | `number` | 4 |
| rfBtnsJsx | 自定义 | `ReactNode` | - |
| autoSearch | 是否自动查询(搜索条件触发后不需要点击查询按钮) | `boolean` | false |
| hasSearchBtn | 是否展示搜索按钮(没有时，会自动触发和 autoSearch 相似) | `boolean` | true |
| hasClearBtn | 是否展示重置按钮() | `boolean` | true |
| isClearSearch | 是否重置后立即请求接口 | `boolean` | true |

```javascript
/**
 * label
 * type: input、inputRange、select、selectGroup、datePicker、rangePicker、selectInput、checkBox、treeSelect、treeSelectTags、cascader
 * key: 搜索字段
 * isShow: 渲染判断(可用于权限控制时)true:渲染；false:不渲染
 * ...
 */
formFields: [
  {
    label: '账号',
    placeholder: '请输入账号',
    type: 'input',
    key: 'account',
    allowEnterSearch: true,
  },
  {
    label: '所属部门',
    placeholder: '请选择所属部门',
    type: 'treeSelect',
    key: 'areaCode',
    option: [],
  },
  {
    label: '角色',
    placeholder: '请输入角色',
    showSearch: true,
    type: 'treeSelect',
    key: 'roleId',
    option: [],
    isShow: false,
    filterOption: (input, option) => option?.title?.indexOf(input) >= 0,
  },
];
```

## Table 文件

封装的表格

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| columnConfig | 表格数据 | `array` | [] |
| menuCurrent | 表格类型(紧凑，中等，默认) | `string` | small |
| batchBtns | 操作按钮(表格布局旁边，右对齐,isShow 用于权限控制) | `array` | [] |
| batchBtnsJxs | 自定义操作按钮(布局按钮下边，默认左对齐) | `ReactNode` | - |
| tableBeforeJsx | 是否自动查询(搜索条件触发后不需要点击查询按钮) | `ReactNode` | - |
| isAlert | 表格的信息总览 | `boolean` | false |
| hasSelection | 是否可勾选(type 可指定选择类型) | `boolean | Object` | false |
| showAlert | 是否展示勾选后的信息(如已选择*项，总数据*项) | `boolean` | true |
| selectedRowKeys | 勾选数据(根据 rowKey) | `array` | [] |
| batchSelectBtns | 勾选后的操作按钮(isShow 用于权限控制) | `array` | [] |
| rowKey | 表格行的 key 值 | `string` | - |
| scroll | 是否滚动，可指定宽高 | `Object` | - |
| pagination | 是否分页 | `boolean | Object` | - |
| getRefresh | 刷新表格(可用于操作表格数据后使用) | `(value?: Object) => void` | - |
| getSelections | 获取勾选的数据 | `(value?: Object) => void` | - |

_注：如果 showAlert：false 不展示勾选信息和操作按钮_

```javascript
/**
 * align: 对齐方式
 * title
 * key: React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
 * dataIndex: 对应数据key
 * isShow: 渲染判断(可用于权限控制时)true:渲染；false:不渲染
 * ...
 */
formFields: [
  {
    align: 'left',
    title: '姓名',
    key: 'xm',
    dataIndex: 'xm',
    sorter: (a, b) => a.name.length - b.name.length,
    width: '80px',
    render: (text) => text || '-',
  },
  {
    align: 'center',
    title: '账号',
    key: 'account',
    dataIndex: 'account',
    ellipsis: true,
    render: (text) => text || '-',
  },
  {
    align: 'center',
    title: '最后登录时间',
    key: 'lastLoginTime',
    sorter: (a, b) => a - b,
    dataIndex: 'lastLoginTime',
    ellipsis: true,
    isShow: false,
    render: (text) => (text ? moment(text).format('YYYY-MM-DD HH:mm') : '-'),
  },
];
```
