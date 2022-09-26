// 新增、编辑
import React,{ useState, useEffect } from 'react';
import { message, Modal } from 'antd';
import { handleValidator } from '@/utils/tools';
import HtForm from '@/components/htForm';
import _lodash from 'lodash';

let getFormRefData = null;

function ServiceAddModal(props) {
  const { visible, handleCancel } = props;
  const [loading, setLoading] = useState(false);


  const handleOk=()=>{
    getFormRefData?.ref?.current?.validateFieldsReturnFormatValue().then((values)=>{
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
        message.success('新增成功')
        handleCancel()
      },1000)
    })
  }

  const htFormStting = {
    getFormRef: (ref) => {
      getFormRefData = ref;
    },
    data: {},
    loading,
    item: [
      {
        label: '名称',
        type: 'input',
        name: 'name',
        placeholder: '请输入15字以内的名称',
        controlsProps: {
          showCount: true,
          maxLength: 15
        },
        rules: [
          {required: true, message: '请输入名称'},
          {validator: (rule,value)=>handleValidator(rule,value,15,'名称')}
        ],
      },
      {
        label: '所属服务中心',
        type: 'treeSelect',
        name: 'parentcode',
        placeholder: '请选择所属服务中心',
        controlsProps: {
          style:{width: '100%'},
          options: [],
          fieldNames: {
            label: 'name',
            value: 'code'
          },
        },
        // rules: [{required: true, message: '请选择'}],
      },
      {
        label: '描述',
        type: 'textarea',
        name: 'remark',
        placeholder: '请输入50字以描述',
        controlsProps: {
          showCount: true,
          maxLength: 50,
          style: {width: '100%'}
        },
        rules: [
          {validator: (rule,value)=>handleValidator(rule,value,50,'描述')}
        ],
      },
    ],
  };
  return (
    <Modal
      title={"新增"}
      visible={visible}
      okText={"提交"}
      onOk={handleOk}
      destroyOnClose
      okButtonProps={{loading: loading}}
      onCancel={handleCancel}
    >
      <HtForm {...htFormStting}/>
    </Modal>
  );
}

export default ServiceAddModal;
