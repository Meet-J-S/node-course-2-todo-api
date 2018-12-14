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

  db.collection('M_todos').findOneAndUpdate({_id: new ObjectID('5c13682285817de02292d1bc')},
  {
    $set:{
            completed: true
         }
    // ,$inc:{
    //         age: 1
    //      }
  },
  {
    returnOriginal: false
  }
).then(
  (res)=>
  {
    console.log(res);
  }
);

  // db.close();
}
