// module.exports.mongoose = require('mongoose');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MN_TodoApp');

module.exports = {
  mongoose
};
