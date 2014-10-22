var config = require('./config');
var mysql = require('mysql');

var conn = {};
conn.connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

conn.handleDisconnect = function () {
  conn.connection.connect(function(err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(conn.handleDisconnect, 2000);
    }
  });
  conn.connection.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
      conn.handleDisconnect();
    } else {                                 
      throw err;
    }
  });
}

conn.handleDisconnect();

module.exports = conn;
