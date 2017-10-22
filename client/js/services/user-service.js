import $ from 'jquery';

export default {
  login(username, password) {
    var data = {
      username: username,
      password: password
    };

    return $.ajax({
      type: 'POST',
      url: `http://localhost:3001/api/Users/login`,
      data: JSON.stringify(data),
      contentType: 'application/json'
    });
  },

  getProfileData(id, authToken) {
    return $.ajax({
      type: 'GET',
      url: `http://localhost:3001/api/Users/${id}`,
      contentType: 'application/json',
      headers: {
        Authorization: authToken
      }
    });
  }
}
