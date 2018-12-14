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

  //del Many
  // db.collection('M_todos').deleteMany({text:'Eat'}).then(
  //   (res) =>
  //   {
  //     console.log(res);
  //   }
  // );

  //del One
  // db.collection('M_todos').deleteOne({text:'Eat F'}).then(
  //   (res) =>
  //   {
  //     console.log(res);
  //   }
  // );

  //findOneand Delete
  db.collection('M_todos').findOneAndDelete({completed:false}).then(
    (res) =>
    {
      console.log(res);
    }
  );

  // db.close();
}
