import React, { useRef, useState, useEffect, Fragment } from 'react';
import {
  Form,
  Input,
  Switch,
  DatePicker,
  Radio,
  Table,
  Select,
  Cascader,
  Checkbox,
  Tree,
  TreeSelect,
  TimePicker,
  InputNumber,
  Button,
  Image,
} from 'antd';
import UploadFile from '@/components/UploadFile';
import SelectTable from '@/components/SelectTable';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 14 },
  },
};

function Index(props) {
  const { getFormRef, setting = {}, item = [] } = props;
  const [formItemLayout, setLayout] = useState({});
  const formRef = useRef();

  useEffect(() => {
    if (JSON.stringify(setting) != '{}') {
      setLayout(setting);
    } else {
      setLayout(layout);
    }
  }, [setting]);
  useEffect(() => {
    if (typeof getFormItem === 'function') {
      const ref = {
        ref: formRef,
        validateFields: formRef.current.validateFields,
        submit: formRef.current.submit,
        setFieldsValue: formRef.current.setFieldsValue,
      };
      getFormRef(ref);
    }
  }, []);

  const getFormItem = (item) => {
    const { isShow = true, type, render, controlsProps = {}, ...left } = item;
    let comp = null;
    if (!isShow) {
      return;
    }
    if (!type) {
      return;
    } else if (render) {
      comp = render;
    } else {
      switch (type) {
        case 'input':
          comp = <Input {...controlsProps} />;
          break;
        case 'inputNumber':
          comp = <InputNumber {...controlsProps} />;
          break;
        case 'switch':
          comp = <Switch {...controlsProps} />;
          break;
        case 'textarea':
          comp = <TextArea {...controlsProps} />;
          break;
        case 'img':
          comp = <Image {...controlsProps} />;
          break;
        case 'datepicker':
          comp = <DatePicker {...controlsProps} />;
          break;
        case 'radio':
          comp = <RadioGroup {...controlsProps} />;
          break;
        case 'select':
          comp = <Select {...controlsProps} />;
          break;
        case 'cascader':
          comp = <Cascader {...controlsProps} />;
          break;
        case 'checkbox':
          comp = <CheckboxGroup {...controlsProps} />;
          break;
        case 'rangepicker':
          comp = <RangePicker {...controlsProps} />;
          break;
        case 'timerangePicker':
          comp = <TimePicker.RangePicker {...controlsProps} />;
          break;
        case 'timePicker':
          comp = <TimePicker {...controlsProps} />;
          break;
        case 'tree':
          comp = <Tree {...controlsProps} />;
          break;
        case 'treeSelect':
          comp = <TreeSelect {...controlsProps} />;
          break;
        case 'label':
          comp = <span>{controlsProps.value}</span>;
          break;
        case 'button':
          comp = (
            <Button onClick={controlsProps.onClick} {...controlsProps}>
              {controlsProps.label}
            </Button>
          );
          break;
        case 'selectTable':
          comp = <SelectTable {...controlsProps} />;
          break;
        case 'uploadFile':
          comp = <UploadFile {...controlsProps} />;
          break;
        case 'brafteditor':
          comp = (
            <BraftEditor
              className={styles.BraftEditor}
              contentClassName={styles.content}
              {...controlsProps}
            />
          );
          break;
        case 'table':
          comp = <Table {...controlsProps} />;
          break;
        default:
          comp = '暂无该类型';
          break;
      }
    }
    comp = <FormItem {...left}>{comp}</FormItem>;
    return comp;
  };

  return (
    <Form ref={formRef} {...formItemLayout}>
      {item?.map((element, index) => (
        <Fragment key={index}>{getFormItem(element)}</Fragment>
      ))}
    </Form>
  );
}

export default Index;
