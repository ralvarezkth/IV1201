const ContentCtrl = require("./contentController");
const ApplicationCtrl = require("./applicationController");
const UserCtrl = require("./userController");

module.exports.UserCtrl = new UserCtrl();
module.exports.ContentCtrl = new ContentCtrl();
module.exports.ApplicationCtrl = new ApplicationCtrl();