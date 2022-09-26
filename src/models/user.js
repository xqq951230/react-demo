import { useState, useCallback } from 'react';
import { orgList } from '@/services/common';

export default () => {
  const [user, setUser] = useState({});

  const getOrgList = useCallback((list = []) => {
    orgList().then((res) => {
      if (res && res.code == 1000) {
        console.log(res);
        setUser({ ...user, menuList: list });
      }
    });
  }, []);

  return {
    user,
    getOrgList,
  };
};
