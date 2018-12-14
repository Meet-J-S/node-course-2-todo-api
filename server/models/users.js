var mongoose = require('mongoose');

var Users = mongoose.model('Users',
  {
    email:{
      type: String,
      required: true,
      minlength: 7,
      trim: true
    }
  }
);

module.exports = {Users}
