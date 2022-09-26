import React from 'react';
import { Popconfirm, Button } from 'antd';
import styles from './index.less';

function Index(props) {
  const {
    isOk = true,
    isDouble = true,
    loadding = false,
    popconfirmMsg = '确定要执行此操作吗',
    okText = '确定',
    cancelText = '取消',
    okMsg = '确定',
    cancelMsg = '取消',
    handleOk,
    handleCancel,
  } = props;

  const handleOkBtn = () => {
    if (typeof handleOk === 'function') {
      handleOk();
    }
  };
  const handleCancelBtn = () => {
    if (typeof handleCancel === 'function') {
      handleCancel();
    }
  };

  return (
    <div className={styles.bodys}>
      {isOk &&
        (isDouble ? (
          <Popconfirm
            title={popconfirmMsg}
            okText={okText}
            cancelText={cancelText}
            onConfirm={handleOk}
          >
            <Button type="primary" loading={loadding}>
              {okMsg}
            </Button>
          </Popconfirm>
        ) : (
          <Button onClick={handleOkBtn} type="primary">
            {okMsg}
          </Button>
        ))}
      <Button onClick={handleCancelBtn} style={{ marginLeft: '10px' }}>
        {cancelMsg}
      </Button>
    </div>
  );
}

export default Index;
