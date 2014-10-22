var config = require('./config');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

module.exports = connection;
