/*状态样式*/
import React from 'react';
import styles from './index.less';

function HtStatusStyle(props) {
  const { text, arr=[], isColor=true, tag=true, fieldNames={label: 'label', value: 'value'}} = props;

  const renderStatusCom=()=>{
    let com = '-';
    arr?.map((item) => {
    const defaultColor = 'rgba(0,0,0,0.86)'
      if (item[fieldNames.value] == text) {
        com = (
          <span className={styles.htStatusStyle}>
            {tag && <span className={styles.tag} style={{background: isColor ? item?.color : defaultColor,}}/>}
            <span style={{color: isColor ? item?.color : defaultColor}}>{item[fieldNames.label]}</span>
          </span>
        );
      }
    });
    return com;
  }
  return (
    <>{renderStatusCom()}</>
  );
}

export default HtStatusStyle;
