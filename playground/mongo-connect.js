// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //Same as above line (We r Destructuring)

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/M_TodoApp',(err,db)=>
  {
    dbCon(err,db);
  }
);


function dbCon(err,db)
{
  if (err)
  {
      return console.log("Unable to Connect to MongoDB",err);
  }
  console.log("Connection to MongoDB Successful");

  // db.collection('M_todos').insertOne(
  //   {
  //       text: 'Row 1',
  //       completed: false
  //   },
  //   (err,result)=>
  //   {
  //     if (err)
  //     {
  //       return console.log("Unable to Insert",err);
  //     }
  //     console.log(JSON.stringify(result.ops,undefined,2));
  //   }
  // );

  // db.collection('M_Users').insertOne(
  //   {
  //     // _id:5553,
  //     name:'Meet',
  //     age:21,
  //     loc:'Surat'
  //   },
  //   (err,res)=>
  //   {
  //     if (err)
  //     {
  //       return console.log("Unable to Insert",err);
  //     }
  //     console.log(res.ops[0]._id.getTimestamp());
  //     console.log(JSON.stringify(res.ops,undefined,2));
  //   }
  // );

  db.close();
}
