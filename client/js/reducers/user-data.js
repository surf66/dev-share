const setUserData = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
}

export default setUserData;
