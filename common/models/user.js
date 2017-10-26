'use strict';

module.exports = function(User) {
  User.uploadAvatar = function(req, res, options, cb) {
    let currentUser = options.accessToken.userId.toString();
    const Container = User.app.models.Container;
    Container.createContainer({
      name: currentUser,
    }, (err, container) => {
      if (err && err.code !== 'EEXIST') {
        return console.log(err)
      };
      let uploadOptions = {
        container: currentUser,
        getFilename: function(fileInfo, req, res) {
          var origFilename = fileInfo.name;
          var parts = origFilename.split('.'),
              extension = parts[parts.length-1];
          return 'avatar.'+extension;
        }
      }
      Container.upload(req,res,uploadOptions,cb)
    })
  };


};
