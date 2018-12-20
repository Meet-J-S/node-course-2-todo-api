const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema(
  {
    email:
    {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      unique: true,
      validate:
      {
          validator: validator.isEmail,
          message:'{VALUE} is not a valid Email'
      }
    },
    password:
    {
      type: String,
      required: true,
      minlength: 5,
    },
    tokens:
    [{
      access:
      {
        required: true,
        type: String
      },
      token:
      {
        required: true,
        type: String
      }
    }]
  }
);

UserSchema.methods.toJSON = function()
{
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj,['_id','email']);
};

UserSchema.methods.generateAuthToken = function()
{
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},'sc555').toString();

  user.tokens.push({access,token});
  console.log(user);

  return user.save().then(
    ()=>
    {
      return token;
      // return user;
    }
  );
};

UserSchema.methods.removeToken = function(token)
{
  var user = this;
  return user.update(
    {
      $pull:
      {
          tokens:{token}
      }
    }
  );
};

// UserSchema.statics.findByToken = function(token)
// {
//   var User = this;
//   var decoded;
//
//   try
//   {
//       decoded = jwt.verify(token,'sc555')
//   }
//   catch (e)
//   {
//
//   }
//   )
// };

UserSchema.statics.findByCredentials = function(email,password)
{
  var User = this;
  return User.findOne({email}).then(
    (user)=>
    {
      if(!user)
      {
         return Promise.reject();
      }
      return new Promise((resolve,reject)=>
      {
        // Here: password is currently entered password
        //       user.password is the one which is hashed
        //       and relies in database
        bcrypt.compare(password,user.password,(err,res)=>
          {
            if (res)
            {
                resolve(user);
            }
            else
            {
                reject();
            }
          }
      );
      });
    }
  )
}

//Mongoose Middleware
UserSchema.pre('save', function(next)
{
  var user = this;
  if (user.isModified('password'))
  {
    bcrypt.genSalt(10,(err,salt)=>
      {
        bcrypt.hash(user.password,salt,(err,hash)=>
          {
            user.password = hash;
            next();
          });
      })
  }
  else
  {
    next();
  }
});

var Users = mongoose.model('Users',UserSchema);

module.exports = {Users}
