import React from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const RangePickers = (props) => {
  const { value, onChange, ...left } = props;
  const onChangeTime = (value) => {
    // console.log(value, 'valuevaluevaluevalue');
    // const timeValue =
    //   value?.length == 2 ? [moment(value[0]).valueOf(), moment(value[1]).valueOf()].toString() : '';
    const timeValue =
      value?.length == 2 ? [moment(value[0]).startOf('day').valueOf(), moment(value[1]).endOf('day').valueOf()].toString() : '';
    if (typeof onChange == 'function') {
      onChange(timeValue);
    }
  };
  return (
    <div value={value}>
      <RangePicker {...left} onChange={onChangeTime} />
    </div>
  );
};

export default RangePickers;
