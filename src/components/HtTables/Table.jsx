import { Fragment, useEffect, useState } from 'react';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { Alert, Button, Dropdown, Menu, Popconfirm, Space, Table } from 'antd';
import TableColum from '@/components/TableColum';
import Empty from '@/components/Empty';
import { noDataDefault } from '@/common/common';
import styles from './index.less';

const tableSizes = [
  { label: '默认', value: 'default' },
  { label: '中等', value: 'middle' },
  { label: '紧凑', value: 'small' },
];
const Tables = (props) => {
  const {
    id,
    rowKey,
    // scrollY,
    onChange,
    refreshs,
    refStatus,
    pagination,
    getRefresh,
    batchBtnsJxs,
    getSelections,
    tableJsx,
    beforeJsx,
    tableBeforeJsx,
    onChangeTableRows,
    menuCurrent = 'small',
    isAlert = false,
    showAlert = true,
    hasSelection = false,
    height,
    scroll = {},
    batchBtns = [],
    dataSource = [],
    columnConfig = [],
    batchSelectBtns = [],
    selectedRowKeys = false,
    mockData = false,
    ...leftProps
  } = props;
  const [menucurrent, setMenuCurrent] = useState(menuCurrent);
  const [columnConfigdata, setColumnCData] = useState([]);
  const [rowSelection, setRowSelection] = useState(null);
  const [selectedRowKey, setSelRowKey] = useState([]);
  // const [scrolls, setScroll] = useState({ y: scrollY, ...scroll });
  const scrollWidth = scroll?.x ? scroll?.x / (columnConfig || [])?.length : 120;
  useEffect(()=>{
    if(hasSelection && typeof selectedRowKeys === 'object'){
      setSelRowKey(selectedRowKeys);
    }
  },[selectedRowKeys])

  useEffect(() => {
    if (hasSelection) {
      setRowSelection({
        selectedRowKeys: selectedRowKey,
        onChange: onSelectChange,
        type: hasSelection?.type || 'checkbox',
        ...hasSelection,
      });
    }
  }, [selectedRowKey]);
  const onSelectChange = (selectKey, selectedRows) => {
    setSelRowKey(selectKey);
    if (typeof getSelections === 'function') {
      // const selectedRows = dataSource.filter((c) => selectKey.includes(c[rowKey]));
      getSelections(selectKey, selectedRows, true);
    }
  };
  const getColumnConfig = (columnConfig) => {
    setColumnCData(columnConfig);
    // setScroll({ ...scrolls, x: columnConfig?.length * scrollWidth });
  };
  const offSelectChange = () => {
    if(typeof getSelections === 'function'){
      getSelections([]);
    }
  };
  // 操作按钮(新增、导出等)
  const renderBatchBtn = (item, index) => {
    const {
      label,
      onClick,
      style = {},
      comp = null,
      type= 'primary',
      btnType = 'button',
      title = '确定要执行此操作吗？',
      okText = '确定',
      cancelText = '取消',
      isShow = true,
      ...left
    } = item;
    let com = comp;
    if (isShow) {
      switch (btnType) {
        case 'button':
          com = (
            <Button onClick={onClick} type={type} style={style} {...left}>
              {label}
            </Button>
          );
          break;
        case 'popconfirm':
          com = (
            <Popconfirm title={title} onConfirm={onClick} okText={okText} cancelText={cancelText}>
              <Button style={style} type={type} {...left}>
                {label}
              </Button>
            </Popconfirm>
          );
          break;
      }
    }
    return <Fragment key={index}>{com}</Fragment>;
  };
  // 选中后操作按钮(批量删除、批量启停用等)
  const renderBatchSelectBtn = (item, index) => {
    const { label, onClick, isShow = true, ...left } = item;
    let com = null;
    if (isShow) {
      com = (
        <Button key={index} type={'link'} onClick={onClick} {...left}>
          {label}
        </Button>
      );
    }
    return com;
  };
  return (
    <div className={`${styles.tables} ht_table_tables`}>
      {beforeJsx && beforeJsx}
      <div className={styles.columnConfig}>
        {/*自定义*/}
        {batchBtnsJxs && batchBtnsJxs}
        <div className={styles.optBtnWrap}>
          {/*操作按钮*/}
          <div className={styles.batchBtns}>
            {batchBtns?.map((item, index) => renderBatchBtn(item, index))}
          </div>

          <Space style={{ marginLeft: 10 }}>
            <TableColum data={columnConfig} getColumnConfig={getColumnConfig} check={() => {}} />
            <Dropdown
              overlay={
                <Menu onClick={(value) => setMenuCurrent(value.key)} selectedKeys={[menucurrent]}>
                  {tableSizes.map((item) => (
                    <Menu.Item key={item.value}>{item.label}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Button>
                  <ColumnHeightOutlined />
                </Button>
              </a>
            </Dropdown>
          </Space>
        </div>
      </div>
      {/*自定义*/}
      {tableBeforeJsx && tableBeforeJsx}
      {isAlert && (
        <Alert
          className={styles.alertRow}
          message={isAlert?.message}
          type={isAlert?.info || 'info'}
          showIcon={isAlert?.showIcon || false}
        />
      )}
      {/*选择列表后信息展示和操作按钮*/}
      {hasSelection && showAlert && selectedRowKey.length > 0 && (
        <Alert
          className={styles.alertRow}
          type="info"
          message={
            <div className={styles.alertSelectRow}>
              <span>
                已选择<a>{selectedRowKey.length}</a>项
                {pagination.total ? (
                  <span>
                    ，总数据：<a>{pagination.total}</a>项
                  </span>
                ) : (
                  ''
                )}
              </span>
              {batchSelectBtns?.length > 0 && (
                <div className={styles.actionBtns}>
                  {batchSelectBtns?.map((item, index) => renderBatchBtn(item, index))}
                  <Button type={'link'} onClick={offSelectChange}>
                    取消选择
                  </Button>
                </div>
              )}
            </div>
          }
        />
      )}
      <div className={'ht_table_tableWrap'}>
        {tableJsx && tableJsx}
        <Table
          bordered
          id={`${id}`}
          scroll={{x: scrollWidth, ...scroll}}
          style={{height: height}}
          // height={scroll?.y}
          locale={{emptyText: <Empty description={"暂无数据"}/>}}
          columns={columnConfigdata}
          dataSource={mockData ? mockData : dataSource}
          onChange={onChange}
          pagination={pagination}
          rowKey={rowKey}
          rowSelection={rowSelection}
          // scroll={scrolls}
          size={menucurrent}
          {...leftProps}
        />
      </div>
    </div>
  );
};

export default Tables;
