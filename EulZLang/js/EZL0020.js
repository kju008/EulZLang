/*
 * 을지랑 등록화면 js
 * */
function ajax(url, input_data, gubun, method) {
	$.ajax(url, {
		type: method, 
        data: input_data,
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
        	if (gubun == "insertPlace") {
        		insertPlace_callback(data);
            }
        	else if(gubun == "getLocationLcd")
    		{
        		getLocationLcd_callback(data);
    		}
        },
        error: function (jqXhr, textStatus, errorMessage) {
        		alert(textStatus);
        		alert(errorMessage);
        }
    });
}

function getLocationLcd_callback(data)
{

	console.log("getLocationLcd_callback [" , data , "]" )
}


function insertPlace_callback(data)
{
	console.log("insertPlace_callback")
	/**
	var ret_list = eval(data['board_num']);
	var obj_sp_borad = document.getElementById("sp_borad");
	obj_sp_borad.innerText = ret_list[0]["BOARD_NUM"]; ;
	console.log(ret_list );
	**/
	
}

function onload() {
	/**
	 * 테스트데이터 셋팅
	 */
	with(document.all)
	{
		txt_RSTR_ID.value = "RSTR_ID";
		txt_RSTR_NM.value = "RSTR_NM";
		txt_ADDR1.value = "ADDR1";
		txt_ADDR2.value = "ADDR2";
		txt_ADDR3.value = "ADDR3";
		txt_ADDR4.value = "ADDR4";
		txt_RSTR_NCNM.value = "RSTR_NCNM";
		txt_GG_LCT.value = "GG_LCT";
		txt_NV_LCT.value = "NV_LCT";
		txt_MAIN_FOOD_NM.value = "MAIN_FOOD_NM";
		txt_SEC_MENU_NM.value = "SEC_MENU_NM";
		txt_CMPN_RSTR_YN.value = "Y";
		txt_PRC_A_PRSN.value = "700";
		txt_REG_YMD.value = "REG_YMD";
	}

}

function Fn_insertPlace()
{
	with(document.all)
	{
		ajax('/insertPlace', {
									"RSTR_ID"	:	txt_RSTR_ID.value,
									"RSTR_NM"	:	txt_RSTR_NM.value,
									"ADDR1"	:	txt_ADDR1.value,
									"ADDR2"	:	txt_ADDR2.value,
									"ADDR3"	:	txt_ADDR3.value,
									"ADDR4"	:	txt_ADDR4.value,
									"RSTR_NCNM"	:	txt_RSTR_NCNM.value,
									"GG_LCT"	:	txt_GG_LCT.value,
									"NV_LCT"	:	txt_NV_LCT.value,
									"MAIN_FOOD_NM"	:	txt_MAIN_FOOD_NM.value,
									"SEC_MENU_NM"	:	txt_SEC_MENU_NM.value,
									"CMPN_RSTR_YN"	:	txt_CMPN_RSTR_YN.value,
									"PRC_A_PRSN"	:	txt_PRC_A_PRSN.value,
									"REG_YMD"	:	txt_REG_YMD.value
								}
		, 'insertPlace', 'POST');
	}

}

function Fn_getLocationLcd()
{
	ajax('/getLocationLcd', {}, 'getLocationLcd', 'POST');		
}

function Fn_getFavrRtStar()
{
	var sel = document.getElementById("sl_FAVR_RT");
	var val = sel.options[sel.selectedIndex].value;

	
	 //<span class="star-prototype" id="sp_FAVR_RT_STAR">5</span>
	var var_star_tag = '<span class="star-prototype" id="sp_FAVR_RT_STAR">'+val +'</span>';
	 $('#div_FAVR_RT').append(var_star_tag);
	 //document.getElementById('div_FAVR_RT').appendChild(var_star_tag);
		
}



$.fn.generateStars = function() {
    return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
};

// 숫자 평점을 별로 변환하도록 호출하는 함수
$('.star-prototype').generateStars();

$(document).ready(function() {
	onload();
	
	/**
	 * 장소 대중소세 분류 값 가지고 오기
	 */
	Fn_getLocationLcd();
	
});

