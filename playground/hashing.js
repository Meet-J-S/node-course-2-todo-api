const{SHA256} = require('crypto-js');

var m = 'meet';
var s = SHA256(m).toString();

// console.log(m);
// console.log(s);

//Json web Tokens

const jwt = require('jsonwebtoken');

var data={
  id:10
};

var token = jwt.sign(data,'secretcode');
console.log(token);

var decoded = jwt.verify(token,'secretcode');
console.log(decoded);
