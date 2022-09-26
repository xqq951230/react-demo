import React, { useRef, useState, useEffect, Fragment } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormFieldSet,
  ProFormDatePicker,
  ProFormTreeSelect,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormCheckbox,
  ProFormTextArea,
  ProFormRadio,
  ProFormSwitch,
  ProFormDigit,
  ProFormDigitRange,
  ProFormRate,
  ProFormSlider,
  ProFormCascader,
  EditableProTable,
  ProFormCaptcha,
} from '@ant-design/pro-components';
import { Form, Table, Tree, Button, Image, Spin } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { cloneDeep } from 'lodash';
import styles from './index.less';

const layout = {
  layout: 'horizontal',
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
  const { getFormRef, beforeInitFunc, setting = {}, item = [], data = {}, loading = false } = props;
  const formRef = useRef();

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
  useEffect(() => {
    let initial = cloneDeep(data);
    if (typeof beforeInitFunc === 'function') {
      beforeInitFunc(initial);
    }
    formRef.current.setFieldsValue(initial);
  }, [data]);

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
          comp = <ProFormText {...left} fieldProps={controlsProps} />;
          break;
        case 'password':
          comp = <ProFormText.Password {...left} fieldProps={controlsProps} />;
          break;
        case 'inputGroup':
          comp = <ProFormFieldSet {...left} fieldProps={controlsProps} type="group">
            {controlsProps?.render}
          </ProFormFieldSet>;
          break;
        case 'inputNumber':
          comp = <ProFormDigit {...left} fieldProps={controlsProps} />;
          break;
        case 'inputNumberRange':
          comp = <ProFormDigitRange {...left} fieldProps={controlsProps} />;
          break;
        case 'captcha':
          comp = <ProFormCaptcha {...left} fieldProps={controlsProps} />;
          break;
        case 'textarea':
          comp = <ProFormTextArea {...left} fieldProps={controlsProps} />;
          break;
        case 'datepicker':
          comp = <ProFormDatePicker {...left} fieldProps={controlsProps} />;
          break;
        case 'timePicker':
          comp = <ProFormDateTimePicker {...left} fieldProps={controlsProps} />;
          break;
        case 'rangepicker':
          comp = <ProFormDateRangePicker {...left} fieldProps={controlsProps} />;
          break;
        case 'timerangePicker':
          comp = <ProFormDateTimeRangePicker {...left} fieldProps={controlsProps} />;
          break;
        case 'radio':
          comp = <ProFormRadio.Group {...left} fieldProps={controlsProps} />;
          break;
        case 'switch':
          comp = <ProFormSwitch {...left} fieldProps={controlsProps} />;
          break;
        case 'checkbox':
          comp = <ProFormCheckbox.Group {...left} fieldProps={controlsProps} />;
          break;
        case 'select':
          comp = <ProFormSelect {...left} fieldProps={controlsProps} />;
          break;
        case 'cascader':
          comp = <ProFormCascader {...left} fieldProps={controlsProps} />;
          break;
        case 'tree':
          comp = (
            <Form.Item {...left}>
              <Tree {...controlsProps} />
            </Form.Item>
          );
          break;
        case 'treeSelect':
          comp = <ProFormTreeSelect {...left} fieldProps={controlsProps} />;
          break;
        case 'rate':
          comp = <ProFormRate {...left} fieldProps={controlsProps} />;
          break;
        case 'slider':
          comp = <ProFormSlider {...left} fieldProps={controlsProps} />;
          break;
        case 'img':
          comp = (
            <Form.Item {...left}>
              <Image {...controlsProps} />
            </Form.Item>
          );
          break;
        case 'label':
          comp = (
            <Form.Item {...left}>
              <span>{controlsProps.value}</span>
            </Form.Item>
          );
          break;
        case 'button':
          comp = (
            <Form.Item {...left}>
              <Button onClick={controlsProps.onClick} {...controlsProps}>
                {controlsProps.label}
              </Button>
            </Form.Item>
          );
          break;
        case 'brafteditor':
          comp = (
            <Form.Item {...left}>
              <BraftEditor
                className={styles.BraftEditor}
                contentClassName={styles.content}
                {...controlsProps}
              />
            </Form.Item>
          );
          break;
        case 'table':
          comp = (
            <Form.Item {...left}>
              <Table {...controlsProps} />
            </Form.Item>
          );
          break;
        case 'editable':
          comp = (
            <Form.Item {...left}>
              <EditableProTable {...controlsProps} fieldProps={controlsProps} />
            </Form.Item>
          );
          break;
        default:
          comp = '暂无该类型';
          break;
      }
    }
    return comp;
  };

  return (
    <Spin spinning={loading}>
      <ProForm formRef={formRef} submitter={false} {...layout} {...setting}>
        {item?.map((element, index) => (
          <div key={index} className={styles.htFormWrap}>{getFormItem(element)}</div>
        ))}
      </ProForm>
    </Spin>
  );
}

export default Index;
