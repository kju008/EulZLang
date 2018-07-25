var fs = require('fs-extra');

module.exports = {	
		insertPlace : function(RSTR_ID,	RSTR_NM,	ADDR1,	ADDR2,	ADDR3,	ADDR4,	RSTR_NCNM,	GG_LCT,	NV_LCT,	MAIN_FOOD_NM,	SEC_MENU_NM,	CMPN_RSTR_YN,	PRC_A_PRSN,	REG_YMD, callback) {
		return require('./sql/EZL0020_SQL').insertPlace(RSTR_ID,	RSTR_NM,	ADDR1,	ADDR2,	ADDR3,	ADDR4,	RSTR_NCNM,	GG_LCT,	NV_LCT,	MAIN_FOOD_NM,	SEC_MENU_NM,	CMPN_RSTR_YN,	PRC_A_PRSN,	REG_YMD, callback);
	}

	
	,getLocationLcd : function( callback) {
		require('./sql/EZL0020_SQL').getLocationLcd(callback);
	}


}
