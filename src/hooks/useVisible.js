import { useState } from 'react';

function useVisible(initialList = {}) {
  const [visibleList, setVisibleList] = useState(initialList);
  const handleSetVisible = (visibleName, params = {}) => {
    setVisibleList({ ...visibleList, [visibleName]: { visible: true, ...params } });
  };
  const handleCancelVisible = (visibleName, params = {}) => {
    setVisibleList({ ...visibleList, [visibleName]: { visible: false, ...params } });
  };
  const handleCancelAllList = () => {
    const obj = {};
    Object.keys(visibleList).forEach((objItem) => {
      obj[objItem] = false;
    });
    setVisibleList({ ...obj });
  };
  return {
    visibleList,
    handleSetVisible,
    handleCancelVisible,
    handleCancelAllList,
  };
}

export default useVisible;
