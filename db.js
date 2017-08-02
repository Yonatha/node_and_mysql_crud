var orm = require('orm');
var db = orm.connect('mysql://root:mysql@localhost/node_and_mysql_crud');

db.on('connect', function (err) {
    if (!err) {
        console.log('******************************************');
        console.log('Conexão com o banco de dados estabelecida.');
        console.log('******************************************');
    } else {
        return console.error('Connection error: ' + err);
    }
});

module.exports = db;