module.exports = {	
	get_connection : function() {
		var oracle = require('oracle');
		var conn = oracle.createConnection({
		  host     : '127.0.0.1',
		  user     : 'hr',
		  password : 'hr',
		  port     : '1521',
		  database : 'SIMSA'
		});
		return conn;
	}
}


