//连接数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'ecnet_ms'
});

//connection.connect();
//查询
function query(sql,callback){
	
	connection.query(sql, function(err, rows) {
	    callback(err,rows);
	});
	
}

//关闭连接
//connection.end();
exports.query = query;

