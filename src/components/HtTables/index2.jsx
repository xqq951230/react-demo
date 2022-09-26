import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import Filter from './Filter';
import Table from './Table';
import _lodash from 'lodash';
import styles from './index.less';

const HtTable = (props) => {
  const { filterSetting, tableSetting, apiUrl } = props;
  // 获取默认值
  const getDefaultValue = () => {
    const newInitialValues = {};
    filterSetting?.formFields?.forEach((element) => {
      newInitialValues[element?.key] = element?.defaultValue;
    });
    return newInitialValues;
  };

  const [loading, setLoading] = useState(false); // spin
  const [params, setParams] = useState(getDefaultValue());
  const [pagination, setPagination] = useState(tableSetting?.pagination ? {
    current: 1, //当前页数
    pageSize: tableSetting.pagination.pageSize, //每页条数
    total: 0, //数据总数
  }: false);
  const [initialValues, setInitialValues] = useState(getDefaultValue());
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    onSearch();
  }, [params, pagination?.current, pagination?.pageSize]);

  useEffect(()=>{
    if(typeof tableSetting?.getRefresh === 'function'){
      tableSetting.getRefresh(onSearch);
    }
  },[])
  // 接口请求
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = () => {
    const { beforeSearchFunc } = filterSetting;
    const { getApiData, getTableData } = tableSetting;
    let searchParams = params;
    if (!apiUrl) {
      message.warning('接口地址不存在');
      setLoading(false);
      return;
    }
    if (!window.fetchApi) {
      setLoading(false);
      message.warning('请先绑定fetch函数');
      return;
    }
    if (typeof beforeSearchFunc==='function') {
      searchParams = beforeSearchFunc(params);
    }
    const searchPagination = {
      page: pagination?.current,
      size: pagination?.pageSize,
    };
    const body = {
      ...searchParams,
      ...searchPagination,
    };
    console.log( searchParams, searchPagination);
    return;
    setLoading(true);
    window
      .fetchApi(apiUrl, body)
      .then((res) => {
        if (res.code == 200) {
          setLoading(false);
          const data = res?.data;
          let list = [];
          if(pagination){
            list = _lodash.isArray(data.records) ? data.records : [];
            const newPagination = {
              current: data?.current,
              pageSize: data?.size,
              total: data?.total,
              pageSizeOptions: [10, 20, 50, 100],
              showTotal: (total) => `总共 ${total} 条`,
              showSizeChanger: true,
              showQuickJumper: true,
            };
            setPagination(newPagination);
          }else{
            list = _lodash.isArray(data) ? data : [];
          }
          setDataSource(list);
          // 把返回数据暴露给外层使用，更新外层的接口返回数据
          if (typeof getApiData === 'function') {
            getApiData(data);
          }
          if (typeof getTableData === 'function') {
            getTableData(list);
          }
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // 查询条件变化
  const onChangeParams = (params) => {
    setParams(params);
  };
  // 表格变化
  const onChangeTableRows = (data) => {
    setPagination(data);
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.htTablesBox}>
        <Filter {...filterSetting} onSearch={onChangeParams} initialValues={initialValues} />
        <Table
          {...tableSetting}
          pagination={pagination}
          onChange={onChangeTableRows}
          dataSource={dataSource}
          scrollY={'5.15rem'}
        />
      </div>
    </Spin>
  );
};

export default HtTable;
