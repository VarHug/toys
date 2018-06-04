var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goodSchema = new Schema({
  'productId': String,
  'productName': String,
  'salePrice': Number,
  'productImage': String
});

module.exports = mongoose.model('Good', goodSchema);

// var DB_URL = 'mongodb://localhost:27017/db_demo';

// mongoose.connect(DB_URL);
// // 连接成功
// mongoose.connection.on('connected', () => {
//   console.log('Mongoose connection open to ' + DB_URL);
// });
// // 连接异常
// mongoose.connection.on('error', function (err) {
//   console.log('Mongoose connection error: ' + err);
// });
// // 连接断开
// mongoose.connection.on('disconnected', function () {
//   console.log('Mongoose connection disconnected');
// });
