module.exports = function(app) {
  var User = app.models.User;

  User.validate('email', customValidator, {message: 'Email has to be a zuto email address'});
  function customValidator(err) {
      if (this.email.indexOf('@zuto.com') < 0) {
        err()
      };
  };
};
