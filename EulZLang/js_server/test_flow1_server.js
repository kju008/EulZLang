var fs = require('fs-extra');

module.exports = {	
	select1 : function(data, callback) {
		return require('./sql/select1').select1(data, callback);
	}
}
