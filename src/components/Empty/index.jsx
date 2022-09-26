import React from 'react';
import styles from './index.less';
const noSearch = require('./img/noSearch.png');
// const 6 


export default function index({ description='暂无查询结果，请尝试优化下您的关键词吧！',type='empty' }) {
    return (
        <div className={styles.defaultBox}>
            <img src={noSearch} />
            <div>{description}</div>
        </div>
    )
}
