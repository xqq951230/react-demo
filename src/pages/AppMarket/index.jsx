import React, { useState, useEffect } from 'react';
import { Modal, Button, TreeSelect } from 'antd';
import { ztWebHttp } from '@/common/host';
import { treeData } from '@/Mock/app';
import { appTypeStatusArr } from '@/common/common';
import SearchTable from '@/components/HtTables';
import HtStatusStyle from '@/components/HtStatusStyle';
import AddModal from './components/AddModal';
import AddDrawer from './components/AddDrawer';
import DetailDrawer from './components/DetailDrawer';
import moment from 'moment';
import styles from './index.less';

let refresh = null;
const tableData = {
  total: 6,
  data: [
    {name: 'test5', developerName: '开发商5', businessName: '业务类型1', projectName: '所属项目1', appType: 'WEB', isOpen: 1, updateTime: '2022-8-22 12:51'},
    {name: 'test6', developerName: '开发商6', businessName: '业务类型2', projectName: '所属项目2', appType: 'WEB', isOpen: 0, updateTime: '2022-8-18 15:38'},
    {name: 'test3', developerName: '开发商3', businessName: '业务类型3', projectName: '所属项目3', appType: 'WEB', isOpen: 0, updateTime: '2022-8-17 15:54'},
    {name: 'test1', developerName: '开发商1', businessName: '业务类型4', projectName: '所属项目4', appType: 'WEB', isOpen: 1, updateTime: '2022-8-12 12:12'},
    {name: 'test4', developerName: '开发商4', businessName: '业务类型5', projectName: '所属项目5', appType: 'APP', isOpen: 1, updateTime: '2022-8-12 07:37'},
    {name: 'test2', developerName: '开发商2', businessName: '业务类型6', projectName: '所属项目6', appType: 'WEB', isOpen: 1, updateTime: '2022-8-06 12:27'},
  ],
};

function AppMarket(props) {
  const [addOneVis, setAddOneVis] = useState(false);
  const [addTwoVis, setAddTwoVis] = useState(false);
  const [detailVis, setDetailVis] = useState({visible: false});

  const filterSetting = {
    formFields: [
      {
        label: '名称',
        placeholder: '请输入关键字',
        type: 'input',
        key: 'name',
        allowEnterSearch: true,
      },
      {
        label: '状态',
        placeholder: '请选择状态',
        type: 'select',
        option: appTypeStatusArr,
        key: 'isOpen',
      },
      {
        label: '单选单位部门',
        type: 'treeSelect',
        key: 'areaId',
        controlsProps: {
          placeholder: '请选择单位部门',
          // treeCheckable: true,
          // showCheckedStrategy: TreeSelect.SHOW_ALL,
          fieldNames: {
            label: 'areaName',
            value: 'areaId',
            children: 'childrenList',
          },
        },
        option: treeData,
      },
      {
        label: '多选单位部门',
        type: 'treeSelect',
        key: 'areaIdList',
        controlsProps: {
          placeholder: '请选择单位部门',
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_ALL,
          fieldNames: {
            label: 'areaName',
            value: 'areaId',
            children: 'childrenList',
          },
        },
        option: treeData,
      },
      {
        label: '所属项目',
        placeholder: '请选择所属项目',
        showSearch: true,
        type: 'input',
        key: 'projectName',
        // option: [],
      },
      {
        label: '业务类型',
        type: 'treeSelect',
        option: [],
        key: 'businessType',
        controlsProps: {
          placeholder: '请选择业务类型',
          fieldNames: {
            label: 'name',
            value: 'code',
            children: 'businessTypeChildrenVo'
          },
        },
      },
      {
        label: '应用类型',
        placeholder: '请选择应用类型',
        type: 'select',
        option: [],
        key: 'appType',
      },
      {
        label: '更新日期',
        type: 'rangePicker',
        key: 'updateTime',
      },
    ],
    beforeSearchFunc: (params) => {
      if (params.updateTime) {
        const time = params.updateTime?.split(',');
        params.startTime = moment(Number(time[0])).format('YYYY-MM-DD HH:mm:ss');
        params.endTime = moment(Number(time[1])).format('YYYY-MM-DD HH:mm:ss');
        delete params.updateTime;
      }
    },
  };

  const columnConfig = [
    {
      align: 'center',
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      align: 'center',
      title: '开发商',
      key: 'developerName',
      dataIndex: 'developerName',
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      align: 'center',
      title: '业务类型',
      key: 'businessName',
      dataIndex: 'businessName',
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      align: 'center',
      title: '所属项目',
      key: 'projectName',
      dataIndex: 'projectName',
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      align: 'center',
      title: '应用类型',
      key: 'appType',
      dataIndex: 'appType',
      ellipsis: true,
      width: 80,
      render: (text) => text || '-',
    },
    {
      align: 'center',
      title: '状态', // 上下架状态：0未上架 1已上架
      key: 'isOpen',
      dataIndex: 'isOpen',
      ellipsis: true,
      // width: 90,
      render: (text) => <HtStatusStyle text={text} arr={appTypeStatusArr} />,
    },
    {
      align: 'center',
      title: '更新时间',
      key: 'updateTime',
      sorter: (a, b) => a - b,
      dataIndex: 'updateTime',
      ellipsis: true,
      isShow: false,
      render: (text) => (text ? moment(text).format('YYYY-MM-DD HH:mm') : '-'),
    },
    {
      align: 'center',
      title: '操作',
      key: 'uri',
      dataIndex: 'uri',
      width: 160,
      render: (text, record)=>(
        <>
          <Button type="link" onClick={() => {setDetailVis({visible: true, record})}}>详情</Button>
          <Button type="link" ghost danger onClick={() => {
            Modal.confirm({
              title: '提示',
              content: '确认删除吗？',
            })
          }}>删除</Button>
        </>
      ) 
    },
  ];

  const tableSetting = {
    columnConfig: columnConfig,
    getRefresh: (refreshFunc) => {
      refresh = refreshFunc;
    },
    batchBtns: [
      {label: '简单新增', onClick:()=>{setAddOneVis(true)}},
      {label: '复杂新增', onClick:()=>{setAddTwoVis(true)}},
    ],
    isAlert: {
      message: <div className='ht_overview'>
        应用：{tableData?.total || 0} 个
      </div>,
      showIcon: true,
    },
    mockData: tableData?.data,
    rowKey: 'userId',
    pagination: { pageSize: 10 },
  };
  const apiUrl = {
    url: '/appInfo/pageList',
    baseURL: ztWebHttp,
  };

  return (
    <div className={styles.wrap}>
      <SearchTable fetchWhenMount={false} apiUrl={apiUrl} filterSetting={filterSetting} tableSetting={tableSetting} />
      {addOneVis && <AddModal visible={addOneVis} handleCancel={()=>setAddOneVis(false)}/>}
      {addTwoVis && <AddDrawer visible={addTwoVis} handleCancel={()=>setAddTwoVis(false)}/>}
      {detailVis.visible && <DetailDrawer {...detailVis} handleCancel={()=>setDetailVis(false)}/>}
    </div>
  );
}
export default AppMarket;
