const _ = require('lodash');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

const port = process.env.PORT || 3003;
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

app.get('/todos/:id',(request,response)=>
  {
    var id = request.params.id;

    //check valid id
    if(!ObjectID.isValid(id))
    {
      return response.status(404).send();
    }

    Todo.findById(id).then(
      (todo)=>
      {
        if (!todo)
        {
            return response.status(404).send();
        }
        response.send({todo}); //See in Postman
      }
    ).catch((e)=>
    {
      response.status(400).send();
    });

    // response.send(request.params);
  });


app.delete('/todos/:id',(request,response)=>
  {
    //get ID
    var id = request.params.id;

    //check valid id
    if(!ObjectID.isValid(id))
    {
      return response.status(404).send();
    }

    Todo.findByIdAndRemove(id).then(
      (todo)=>
      {
        if (!todo)
        {
            return response.status(404).send();
        }
        response.send({todo}); //See in Postman
      }
    ).catch((e)=>
    {
      response.status(400).send();
    });
  }
);

//Update Todo's

app.patch('/todos/:id',(request,response)=>
  {
    var id = request.params.id;
    var body = _.pick(request.body,['text','completed']);

    //check valid id
    if(!ObjectID.isValid(id))
    {
      return response.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed)
    {
      body.completedAt = new Date().getTime();
    }
    else
    {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,
      {
          $set: body
      },
      {
        new: true
      }
    ).then((todo)=>
      {
        if (!todo)
        {
          return response.status(404).send();
        }
        response.send({todo});
      }
    ).catch((e)=>
    {
      response.status(400).send();
    });
  });

app.listen(port,()=>
{
  console.log('Web App Started.');
});

var newTodo = new Todo(
  {
    text: 'Cook Dinner'
  }
);

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

newTodo.save().then(
  (doc)=>
  {
    console.log('Saved ToDo',doc);
  },
  (err)=>
  {
    console.log('Unable to Save',err);
  }
);

var User1 = new Users(
  {
    email:'  mst@g.co   '
  }
);


User1.save().then(
  (doc)=>
  {
    console.log('Saved User',doc);
  },
  (err)=>
  {
    console.log('Unable to Save',err);
  }
);
