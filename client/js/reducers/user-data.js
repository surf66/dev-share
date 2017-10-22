const setUserData = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      var data = Object.assign({}, state, action.value);
      localStorage.userData = JSON.stringify(data);
      console.log(data);
      return data;
    default:
      return state;
  }
}

export default setUserData;
