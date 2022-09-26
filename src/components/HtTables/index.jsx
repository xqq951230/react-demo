import React, { Component } from 'react';
import { Spin, message } from 'antd';
import Filter from './Filter';
import Table from './Table';
import _lodash, { isEmpty } from 'lodash';
import styles from './index.less';
import { getTableScroll } from '@/utils/tools';

class Index extends Component {
  constructor(props) {
    super(props);
    const { pagination = {}, columnConfig = [] } = props.tableSetting || {};
    this.state = {
      dataSource: [],
      pagination:
        pagination === false
          ? false
          : {
              current: 1,
              pageSize: 10,
              total: 0,
              showQuickJumper: true,
              showSizeChanger: true,
              size: 'middle',
              // showTotal:total => `总共 ${total} 数据`,
              showTotal: (total, range) => `${range[0]}-${range[1]}条，共${total}条`,
              pageSizeOptions: ['10', '20', '50', '100'],
              ...pagination,
            },
      loading: false,
      id: props?.tableSetting?.id || 'testTable',
      params: this.getDefaultValue(),
      scroll: {},
      // scroll: props?.tableSetting?.scroll||{}
    };
  }

  componentDidMount() {
    const { fetchWhenMount = true, tableSetting = {} } = this.props;
    if (fetchWhenMount) {
      this.onSearch();
    }
    const { getRefresh, getResetField } = tableSetting;
    if (typeof getRefresh === 'function') {
      getRefresh(this.onSearch);
    }
    if (typeof getResetField === 'function') {
      getResetField(this.resetField);
    }
  }

  componentDidUpdate(preProps){
    // 如果外面有传进来scroll-y则再设置
    if(!preProps?.tableSetting?.scroll?.y){
      if(document.getElementById(this.state.id)){
        let y = getTableScroll({
          id: this.state.id,
          extraHeight: 124
        });
        let height = getTableScroll({id: this.state.id, extraHeight: 44})
        if(this.state?.scroll?.y != y){
          this.setState({
            scroll: {...this.state.scroll, y},
            height,
          })
        }
      }
    }
  }

  resetField=()=>{
    const { tableSetting } = this.props;
    // console.log(this.state.pagination,'123123123')
    const page = tableSetting?.pagination ? 
      {
        ...this.state.pagination,
        current: 1,
        total: 0,
        ...tableSetting?.pagination
      } : false;
      this.setState({
        ...this.state,
        pagination: page,
      },() => {this.onSearch()});
  };
  // 获取默认值
  getDefaultValue = () => {
    const newInitialValues = {};
    this.props.filterSetting?.formFields?.forEach((element) => {
      newInitialValues[element?.key] = element?.defaultValue;
    });
    return newInitialValues;
  };
  onSearch = (page = 1) => {
    const { params, pagination } = this.state;
    const { apiUrl = '', filterSetting = {}, tableSetting = {} } = this.props;
    const { beforeSearchFunc } = filterSetting;
    const { getApiData, getTableData } = tableSetting;

    let searchParams = params;
    if (!apiUrl) {
      message.warning('接口地址不存在');
      return;
    }
    if (!window.fetchApi) {
      message.warning('请先绑定fetch函数');
      return;
    }
    const searchPagination = {
      // current: pagination?.current,
      current: page,
      size: pagination?.pageSize,
    };
    const body = {
      ...searchParams,
      ...searchPagination,
    };
    if (!isEmpty(body.sorter)) {
      const { columnKey, order } = body.sorter;
      body.sort = `${columnKey}_${order === 'ascend' ? 'asc' : 'desc'}`;
    }
    delete body.sorter;
    if (beforeSearchFunc && beforeSearchFunc(body) === false) {
      return;
    }
    // console.log( body,'===body==body==body==');
    // return;
    this.setState({loading: true});
    window
      .fetchApi(apiUrl, body)
      .then((res) => {
        this.setState({ loading: false });
        if (res.code == 200) {
          const data = res?.data;
          let list = [];
          if (pagination) {
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
            this.setState({ pagination: newPagination });
          } else {
            list = _lodash.isArray(data) ? data : [];
          }
          if (list?.length === 0 && page > 1) {
            this.onSearch(page - 1);
            return;
          }
          this.setState({ dataSource: list });
          // 把返回数据暴露给外层使用，更新外层的接口返回数据
          if (typeof getApiData === 'function') {
            getApiData(data);
          }
          if (typeof getTableData === 'function') {
            getTableData(list);
          }
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };
  // 查询条件变化
  onChangeParams = (params) => {
    this.setState({ params }, () => {
      this.onSearch();
    });
  };
  // 重置
  onReset=()=>{
    const { filterSetting={} } = this.props;
    const { beforeResetFunc } = filterSetting;
    if(typeof beforeResetFunc === 'function'){
      beforeResetFunc();
    }
  }
  // 表格变化
  onChangeTableRows = (data, filters, sorter) => {
    const { params, pagination } = this.state;
    params.sorter = sorter;
    this.setState(
      {
        pagination: pagination ? {
          ...pagination,
          ...data,
        }:false,
        params,
      },
      () => {
        this.onSearch(data.current);
      },
    );
  };
  // 获取默认值
   getDefaultValue = () => {
    const { formFields = [] } = this.props.filterSetting;
    const newInitialValues = {};
    formFields?.forEach((element) => {
      newInitialValues[element?.key] = element?.defaultValue;
    });
    return newInitialValues;
  };

  render() {
    const { dataSource, pagination, loading, scroll, height, id } = this.state;
    const { filterSetting = {}, tableSetting = {} } = this.props;
    const { formFields = [] } = filterSetting;
    const { columnConfig = [] } = tableSetting;
    return (
        <Spin spinning={loading}>
        <div className={styles.htTablesBox}>
          {formFields?.length > 0 && <Filter {...filterSetting} onSearch={this.onChangeParams} onReset={this.onReset} initialValues={this.getDefaultValue()}/>}
          {columnConfig?.length > 0 && <Table
            {...tableSetting}
            pagination={pagination}
            onChange={this.onChangeTableRows}
            dataSource={dataSource}
            // scrollY={'5.15rem'}
            id={id}
            scroll={{...scroll, ...tableSetting?.scroll||{}}}
            height={height}
          />}
        </div>
      </Spin>
    );
  }
}

export default Index;
