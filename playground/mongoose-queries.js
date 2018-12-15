//Retrieve Data In Different ways from id..

const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');

var id = '5c14860b6e4904141a8beef3';
if(!ObjectID.isValid(id))
{
  console.log('Id Invalid');
}

// Todo.find(
//   {
//     _id: id
//   }
// ).then(
//   (todos)=>
//   {
//     console.log('Todos : ',todos);
//   }
// );
//
// Todo.findOne(
//   {
//     _id: id
//   }
// ).then(
//   (todo)=>
//   {
//     console.log('Todo : ',todo);
//   }
// );

// Todo.findById(id).then(
//   (todo)=>
//   {
//     if (!todo)
//     {
//         return console.log("Id Not Matched");
//     }
//     console.log('Todo By Id : ',todo);
//   }
// ).catch(
//   (err) =>
//   {
//     // console.log(err.name);
//     console.log(err);
//   }
// );

Todo.findByIdAndRemove(id).then(
  (todo)=>
  {
    console.log("Removed Todo : ",todo);
  }
);
