import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Spin } from 'antd';
import styles from './index.less';

const defaultIcon = require('@/img/welcome.png');

const Welcome = () => {
  const [loading, setLoading] = useState(false);
  const data = history.location?.query||{};

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },3000)
  },[])

  return (
    <div className={styles.welcomeWrap}>
      {loading ? <div className={styles.spinWrap}><Spin spinning={loading}/></div>:
        <>
          <img src={defaultIcon} className={styles.img}/>
          <div className={styles.prompt}>欢迎进入</div>
        </>
      }
    </div>
  );
};

export default Welcome;
