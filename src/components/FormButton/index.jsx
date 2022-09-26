import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';

function FormButton(props) {
  const {
    isOk = true,
    isDouble = true,
    loading = false,
    title = '提示',
    content = '确定要执行此操作吗？',
    okText = '确定',
    cancelText = '取消',
    okMsg = '确定',
    cancelMsg = '取消',
    render = null,
    formRef,
    handleOk,
    handleCancel,
  } = props;
  const [getFormRef, setGetFormRef] = useState({});

  useEffect(() => {
    setGetFormRef(formRef);
    console.log(formRef, '===ref===form===');
  }, [formRef]);

  const handleOkBtn = async () => {
    console.log(handleFinish(), '==try===');
    try {
      await handleFinish();
      Modal.confirm({
        title,
        content,
        okText,
        cancelText,
        onOk: () => {
          if (typeof handleOk === 'function') {
            handleOk();
          }
        },
      });
    } catch (err) {
      console.log(err, '--finish---catch---');
    }
  };
  const handleFinish = () => {
    console.log(getFormRef, '===finish===');
    return getFormRef?.ref?.current?.validateFieldsReturnFormatValue();
  };
  const handleCancelBtn = () => {
    if (typeof handleCancel === 'function') {
      handleCancel();
    }
  };

  return (
    <>
      {render ? (
        render
      ) : (
        <div className={styles.bodys}>
          {isOk &&
            (isDouble ? (
              <Button type="primary" loading={loading} onClick={handleOkBtn}>
                {okMsg}
              </Button>
            ) : (
              <Button onClick={handleOkBtn} type="primary">
                {okMsg}
              </Button>
            ))}
          <Button onClick={handleCancelBtn} style={{ marginLeft: '10px' }}>
            {cancelMsg}
          </Button>
        </div>
      )}
    </>
  );
}

export default FormButton;
