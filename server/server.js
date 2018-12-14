var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(request,response)=>
  {
    var todo = new Todo(
      {
        text: request.body.text,
        completed:request.body.completed,
        completedAt:request.body.completedAt
      }
    );
    todo.save().then(
      (doc)=>
      {
        response.send(doc);
      },
      (err)=>
      {
        response.status(400).send(err);
      }
    );
  }
)

app.get('/todos',(request,response)=>
  {
    Todo.find().then(
      (todos)=>
      {
        response.send({todos})
      },
      (e)=>
      {
        response.status(400).send(e);
      }
    )
  }
);

app.listen(3003,()=>
{
  console.log('Web App Started.');
});

// var newTodo = new Todo(
//   {
//     text: 'Cook Lunch'
//   }
// );

// var newTodo2 = new Todo(
//   {
//     text: '   Cm',
//     // completed: true,
//     // completedAt: 1024
//   }
// );
//
// newTodo2.save().then(
//   (doc)=>
//   {
//     console.log('Saved ToDo',doc);
//   },
//   (err)=>
//   {
//     console.log('Unable to Save',err);
//   }
// );

// newTodo.save().then(
//   (doc)=>
//   {
//     console.log('Saved ToDo',doc);
//   },
//   (err)=>
//   {
//     console.log('Unable to Save',err);
//   }
// );

// var User1 = new Users(
//   {
//     email:'  mst@g.co   '
//   }
// );
//
//
// User1.save().then(
//   (doc)=>
//   {
//     console.log('Saved User',doc);
//   },
//   (err)=>
//   {
//     console.log('Unable to Save',err);
//   }
// );
