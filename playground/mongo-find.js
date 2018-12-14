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

  // var myId = '5c134d24d4451704544cfd3b';
  // db.collection('M_todos').find({_id:new ObjectID(myId)}).toArray().then(
  //   (docs) =>
  //   {
  //     console.log("Todos");
  //     console.log(JSON.stringify(docs,undefined,2));
  //   },
  //   (err) =>
  //   {
  //   }
  //     console.log("Unable to Fetch",err);
  // ); //returns MongoDB Cursor before toArray()

  db.collection('M_Users').find({name:"Shailee"}).toArray().then(
    (docs)=>
    {
      console.log(JSON.stringify(docs,undefined,2));
    },
    (err)=>
    {
      console.log("Unable to Fetch",err);
    }
  );

  // db.collection('M_todos').find().count().then(
  //   (count) =>
  //   {
  //     console.log("Todos Count : ",count);
  //   },
  //   (err) =>
  //   {
  //     console.log("Unable to Fetch",err);
  //   }
  // );


  // db.close();
}
