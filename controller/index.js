const ContentCtrl = require("./contentController");
const ErrorCtrl = require("./errorController");
const ApplicationCtrl = require("./applicationController");
const UserCtrl = require("./userController");

module.exports.UserCtrl = new UserCtrl();
module.exports.ErrorCtrl = new ErrorCtrl();
module.exports.ContentCtrl = new ContentCtrl();
module.exports.ApplicationCtrl = new ApplicationCtrl();