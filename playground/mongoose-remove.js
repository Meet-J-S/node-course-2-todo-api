const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then(
//   (result)=>
//   {
//     console.log(result);
//   }
// ); //Remove Everything from Collection

Todo.findOneAndRemove({_id: '5c1493e15e4273a40ead7469'}).then(
  (todo)=>
  {
    console.log("Removed Todo : ",todo);
  }
);

// Todo.findByIdAndRemove('5c148b738b6af79017533276').then(
//   (todo)=>
//   {
//     console.log("Removed Todo : ",todo);
//   }
// );
