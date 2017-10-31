import $ from 'jquery';

export default {
  login(username, password) {
    var data = {
      username: username,
      password: password
    };

    return $.ajax({
      type: 'POST',
      url: `http://localhost:3001/api/users/login`,
      data: JSON.stringify(data),
      contentType: 'application/json'
    });
  },

  getProfileData(id, authToken) {
    return $.ajax({
      type: 'GET',
      url: `http://localhost:3001/api/users/${id}`,
      contentType: 'application/json',
      headers: {
        Authorization: authToken
      }
    });
  },

  signUp(userData) {
    return $.ajax({
      type: 'POST',
      url: `http://localhost:3001/api/users/`,
      contentType: 'application/json',
      data: JSON.stringify(userData)
    });
  },

  updateUser(id, userData, authToken) {
    return $.ajax({
      type: 'PATCH',
      url: `http://localhost:3001/api/users/${id}`,
      contentType: 'application/json',
      data: JSON.stringify(userData),
      headers: {
        Authorization: authToken
      }
    });
  }
}
