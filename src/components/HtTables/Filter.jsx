import React, { useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker,
  TreeSelect,
  Checkbox,
  Cascader,
} from 'antd';
import { DownOutlined, UpOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import RangePickers from './components/RangePicker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './index.less';

moment.locale('zh-cn')

const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
const { RangePicker } = DatePicker;

const Filter = (props) => {
  const { formFields=[], onSearch, onReset,initialValues, beforeResetFunc } = props;
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    // 获取默认值并且赋值
    // if(typeof beforeResetFunc === 'function'){
      form.resetFields();
    // }
  }, [JSON.stringify(initialValues)]);

  // useEffect(()=>{
  //   console.log(formFields,'================ffffffff');
  //   let DefaultValue = getDefaultValue();
  //   form.setFieldValue(DefaultValue)
  // },[formFields])

  
  const getFields = () => {
    const children = [];
    formFields?.forEach((element, i) => {
      const { key, label, ...left } = element;
      children?.push(
        <Col span={!expand && i > 2 ? 0 : 6} key={i}>
          <Form.Item name={element?.key} label={element?.label} {...left}>
            {returnFields(element)}
          </Form.Item>
        </Col>,
      );
    });
    children.push(
      <Col span={6} key="search">
        <Form.Item>
        <Button onClick={resetFields} className={styles.resetBtn}>
          <ReloadOutlined className={styles.icons} />
          重置
        </Button>
        <Button type="primary" htmlType="submit" style={{ margin: '0 10px' }}>
          <SearchOutlined className={styles.icons} />
          查询
        </Button>
        <a
          style={{ fontSize: 12, display: formFields?.length <= 3 && 'none' }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? (
            <span>
              <UpOutlined />
              收起
            </span>
          ) : (
            <span>
              <DownOutlined />
              展开
            </span>
          )}
        </a>
        </Form.Item>
      </Col>,
    );
    return children;
  };
  // 搜索
  const onFinish = (values) => {
    onSearch(values);
  };
  // 重置
  const resetFields = () => {
    if(typeof onReset === 'function'){
      onReset();
    }
    form.resetFields();
  };
  // 渲染
  const returnFields = (data) => {
    let comp = null;
    const {
      render,
      type,
      peopleType,
      allowEnterSearch = false,
      placeholder = '',
      key = '',
      controlsProps,
      ...left
    } = data;
    // 如果是自定义组件的话
    if (render) {
      comp = render(fieldsChange);
    }
    // 判断是什么类型的组件
    switch (type) {
      case 'input': // 输入框
        comp = <Input className={styles.inputs} placeholder={placeholder} {...controlsProps} />;
        break;
      case 'select': // 选择框
        comp = (
          <Select allowClear placeholder={placeholder} {...left}>
            {data.option.map((x) => (
              <Option
                key={data?.fieldNames ? x[fieldNames.value] : x.value}
                style={data.optionWidth}
              >
                {data?.fieldNames ? x[fieldNames.label] : x.label}
              </Option>
            ))}
          </Select>
        );
        break;
      case 'selectGroup': // 分组选择框
        comp = (
          <Select allowClear>
            {data.option.map((x) => (
              <OptGroup key={x.label} value={x.value}>
                {x.option.map((y) => {
                  return <Option key={y.value}>{y.label}</Option>;
                })}
              </OptGroup>
            ))}
          </Select>
        );
        break;
      case 'datePicker': // 日期框
        comp = (
          <DatePicker
            getCalendarContainer={(triggerNode) => triggerNode.parentNode}
            {...controlsProps}
          />
        );
        break;
      case 'rangePicker': // 日期范围框
        comp = (
          <RangePickers
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            {...controlsProps}
          />
        );
        break;
      case 'checkBox': // 多选框
        comp = <Checkbox.Group key={key} options={data.option} {...controlsProps} />;
        break;
      case 'treeSelect':
        comp = (
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            multiple={data.multiple}
            allowClear
            style={{ marginRight: 10 }}
            // placeholder="请选择商品类别"
            // allowClear
            treeCheckable={data.treeCheckable}
            treeData={data.option}
            treeDefaultExpandedKeys={[data?.option[0]?.key] || []} // 仅展开根节点
            // treeDefaultExpandAll   // 全展开
            {...controlsProps}
            // value={searchParams[`treeSelect${data.id}`]}
          />
        );
        break;
      case 'cascader': // 多选框
        comp = (
          <Cascader
            key={key}
            allowClear
            options={data.option}
            value={searchParams[key]}
            changeOnSelect={data.changeOnSelect}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />
        );
        break;
      default:
    }
    return comp;
  };
  return (
    <div className={`${styles.filter} ht_table_filter`}>
      <Form
        form={form}
        name="search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row gutter={24}>{getFields()}</Row>
      </Form>
    </div>
  );
};

export default Filter;
