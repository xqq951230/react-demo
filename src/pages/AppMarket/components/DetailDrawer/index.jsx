// 新增、编辑
import React,{ useState } from 'react';
import { Drawer, Descriptions } from 'antd';
import _lodash from 'lodash';
import HtStatusStyle from '@/components/HtStatusStyle';
import { appTypeStatusArr } from '@/common/common';

function ServiceAddModal(props) {
  const { visible, record={}, handleCancel } = props;

  return (
    <Drawer
      title={"详情"}
      visible={visible}
      destroyOnClose
      width={'8rem'}
      onClose={handleCancel}
    >
      <Descriptions title="基础信息" column={2} bordered>
        <Descriptions.Item label="名称">{record?.name || '-'}</Descriptions.Item>
        <Descriptions.Item label="开发商">{record?.developerName || '-'}</Descriptions.Item>
        <Descriptions.Item label="业务类型">{record?.businessName || '-'}</Descriptions.Item>
        <Descriptions.Item label="所属项目">{record?.projectName || '-'}</Descriptions.Item>
        <Descriptions.Item label="应用类型">{record?.appType || '-'}</Descriptions.Item>
        <Descriptions.Item label="状态"><HtStatusStyle text={record?.isOpen} arr={appTypeStatusArr} tag={false}/></Descriptions.Item>
        <Descriptions.Item label="更新时间">{record?.updateTime || '-'}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
}

export default ServiceAddModal;
