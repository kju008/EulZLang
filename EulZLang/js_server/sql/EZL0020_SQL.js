var mysql = require('./mysql');
module.exports = {
		
	insertPlace : function(RSTR_ID,	RSTR_NM,	ADDR1,	ADDR2,	ADDR3,	ADDR4,	RSTR_NCNM,	GG_LCT,	NV_LCT,	MAIN_FOOD_NM,	SEC_MENU_NM,	CMPN_RSTR_YN,	PRC_A_PRSN,	REG_YMD, callback) {
		conn = mysql.get_connection();
		var ret = [];
		var sql = '';

		sql ="";			
		sql += "\n	insert into	TB_EZL002_AB(	";
		sql += "\n		RSTR_ID	";
		sql += "\n	,	RSTR_NM	";
		sql += "\n	,	ADDR1	";
		sql += "\n	,	ADDR2	";
		sql += "\n	,	ADDR3	";
		sql += "\n	,	ADDR4	";		
		sql += "\n	,	RSTR_NCNM	";
		sql += "\n	,	GG_LCT	";
		sql += "\n	,	NV_LCT	";
		sql += "\n	,	MAIN_FOOD_NM	";
		sql += "\n	,	SEC_MENU_NM	";
		sql += "\n	,	CMPN_RSTR_YN	";
		sql += "\n	,	PRC_A_PRSN	";
		sql += "\n	,	REG_YMD	";
		sql += "\n	)		";
		sql += "\n	values 		";
		sql += "\n	(		";
		
		sql += "\n		'" +RSTR_ID		+ "' ";
		sql += "\n	,	'" +RSTR_NM		+ "' ";
		sql += "\n	,	'" +ADDR1		+ "' ";
		sql += "\n	,	'" +ADDR2		+ "' ";
		sql += "\n	,	'" +ADDR3		+ "' ";
		sql += "\n	,   '" +ADDR4		+ "' ";
		sql += "\n	,	'" +RSTR_NCNM		+ "' ";
		sql += "\n	,	'" +GG_LCT		+ "' ";
		sql += "\n	,	'" +NV_LCT		+ "' ";
		sql += "\n	,	'" +MAIN_FOOD_NM		+ "' ";
		sql += "\n	,	'" +SEC_MENU_NM		+ "' ";
		sql += "\n	,	'" +CMPN_RSTR_YN		+ "' ";
		sql += "\n	,	 " +PRC_A_PRSN		+ " ";
		sql += "\n	,	'" +REG_YMD		+ "' ";
		
		sql += "\n	)		";

		
		console.log(sql);
		conn.query(sql, function(err,result) {
			console.log(result)
			callback(result);
		});
	},
	
	getLocationLcd : function(callback) {
		conn = mysql.get_connection();
		var ret = [];		
		var sql = "";
		sql += "SELECT ADDR1  FROM TB_EZL002_AB  GROUP BY ADDR1";
		conn.query(sql, function(err,result) {
			for (var i = 0; i < result.length; ++i) {
				ret.push(result[i]);				
			}
			callback(ret);
		});
	},	
	
	get_gallery_list : function(board_num, callback) {
		conn = mysql.get_connection();
		var ret = [];		
		var sql = 'SELECT A.BOARD_NUM, A.IMAGE_PATH, A.RGSN_DATE, A.RGSN_TIME, A.CONTENT FROM GALLERY A WHERE A.BOARD_NUM = ' + board_num + ' ORDER BY A.RGSN_DATE DESC, A.RGSN_TIME DESC LIMIT 20';		
		conn.query(sql, function(err,result) {
			for (var i = 0; i < result.length; ++i) {
				ret.push(result[i]);				
			}
			callback(ret);
		});
	},	
	get_reply_list : function(board_num, callback) {
		conn = mysql.get_connection();
		var ret = [];
		conn.query('SELECT * FROM REPLY_LIST WHERE BOARD_NUM = ' + board_num + ' ORDER BY REPLY_NUM DESC', function(err, result) {
			for (var i = 0; i < result.length; ++i) {
				ret.push(result[i]);				
			}
			callback(ret);
		});
	},
	login : function(user_id, password, callback) {
		conn = mysql.get_connection();
		var ret = [];
		conn.query("SELECT USER_ID FROM USER_INFO WHERE USER_ID = '" + user_id + "' AND PASSWORD = '" + password + "'", function(err, result) {
			for (var i = 0; i < result.length; ++i) {
				ret.push(result[i]);				
			}
			callback(ret);
		});
	}
}
