export default function access(initialState) {
  // 这里做权限判断
  // console.log(initialState, 'initialStateinitialStateinitialStateinitialState123131313');
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
