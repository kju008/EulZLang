function ajax(url, input_data, gubun, method) {
	$.ajax(url, {
		type: method, 
        data: input_data,
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
        	if (gubun == "select1") {
        		select1_callback(data);
            } 
        },
        error: function (jqXhr, textStatus, errorMessage) {
        		alert(textStatus);
        		alert(errorMessage);
        }
    });
}

function select1_callback(data)
{
	console.log("bbbbbbbbbbbbbbbbbbbbbbbbb")
	var ret_list = eval(data['board_num']);
	var obj_sp_borad = document.getElementById("sp_borad");
	obj_sp_borad.innerText = ret_list[0]["BOARD_NUM"]; ;
	console.log(ret_list );
	
}

function onload() {
	alert("onload go ajax!! ");
	ajax('/select1', {"board_num" : ""}, 'select1', 'POST');
}

$(document).ready(function() {
	onload();

});

