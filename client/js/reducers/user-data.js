const setUserData = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      var data = Object.assign({}, state, action.value);
      localStorage.userData = JSON.stringify(data);
      return data;
    case 'CLEAR_USER_DATA':
      delete localStorage.userData;
      return null;
    default:
      return state;
  }
}

export default setUserData;
