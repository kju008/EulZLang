var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	function rawBody(req, res, next) {
		var imagedata = '';
		req.setEncoding('binary');
		var chunks = [];
		req.on('data', function(chunk){
	        imagedata += chunk;
	    });
	    req.on('end', function() {
	    	var time = Date.now();
	    	var path = './registered_image/' + time + '.jpg';
	    	fs.writeFile(path, imagedata, 'binary', function(err){
	    		if (err) throw err
	    		console.log('File saved.')
	    	});
	    	var buffer = Buffer.concat(chunks);
	    	req.bodyLength = buffer.length;
	        req.rawBody = buffer;
	        req.image_path = path
	        next();
	    });
	    req.on('error', function (err) {
	        console.log(err);
	        res.status(500);
	    });
	}
	
	// 시작위치, just render html
	app.get('/', function(req, res) {
		res.render('html/test_flow1.html');
	});
	//test_flow1.js
	app.post('/select1', urlencodedParser, function(req, res) {
		var data = "";
		var ret = require('./js_server/test_flow1_server').select1(data,
			function callback(board_num) {
				res.status(200).send({"board_num" : board_num});
			}
		);		
	});
	
	app.get('/main', function(req, res) {
		res.render('html/main.html');
	});
	app.get('/add_photo', function(req, res) {
		res.render('html/add_photo.html');
	});
	app.post('/get_gallery_list', urlencodedParser, function(req, res) {
		var ret = require('./js_server/add_photo_server').get_gallery();		
		res.status(200).send({file_list: JSON.stringify(ret)});
	});
	
	app.post('/register_board', urlencodedParser, function(req, res) {
		require('./js_server/main_server').register_board(
			function callback(board_num) {
				res.status(200).send({"board_num" : board_num});
			}
		); 			
	});
	app.post('/upload_image', rawBody, function(req, res) {
		if (req.rawBody) {
			var image_path = req.image_path;								
			require('./js_server/add_photo_server').register_image(image_path,
				function callback(image_path) {
					res.status(200).send({"image_path" : image_path});
				}
			); 			
		 } else {
			res.status(500).send({});
		 }
	});
	app.get('/compress_all', function(req, res) {			
		const sharp = require('sharp');
	    image_list = require('./js_server/add_photo_server').get_gallery();
	    for (var i = 0; i < image_list.length; ++i) {
		    console.log(image_list[i]);
		    sharp(image_list[i]).resize(700, 700).toFile(image_list[i].replace('registered_image', 'compressed'), function (err, info) {});
		    
	    }
	});
	app.post('/select_board_list', urlencodedParser, function(req, res) {
		var board_num = req.body.board_num;
		console.log("board_num:" + board_num);
		require('./js_server/main_server').select_board_list(board_num,
			function callback(ret) {
				res.status(200).send({res: JSON.stringify(ret)});
			}
		);
	});
	app.post('/select_gallery_list_by_board_num', urlencodedParser, function(req, res) {
		var board_num = req.body.board_num;
		console.log("board_num:" + board_num);
		require('./js_server/main_server').select_gallery_list(board_num,
			function callback(ret) {
				res.status(200).send({res: JSON.stringify(ret)});
			}
		);
	});
	app.post('/get_reply_list', urlencodedParser, function(req, res) {
		var board_num = req.body.board_num;
		require('./js_server/main_server').get_reply_list(board_num,
			function callback(ret) {
				res.status(200).send({res: JSON.stringify(ret)});
			}
		);
	});
	app.post('/update_gallery_info', urlencodedParser, function(req, res) {
		var image_path = req.body.image_path;
		var board_num = req.body.board_num;
		var content = req.body.content;				
		require('./js_server/main_server').update_gallery_info(image_path, board_num, content,
			function callback(board_num) {
				res.status(200).send({"board_num" : board_num});	
			}
		);
	});
	app.post('/update_content', urlencodedParser, function(req, res) {
		var board_num = req.body.board_num;
		var content = req.body.content;				
		require('./js_server/main_server').update_content(board_num, content,
			function callback(ret) {
				res.status(200).send({});	
			}
		);
	});
	app.post('/add_reply', urlencodedParser, function(req, res) {
		var board_num = req.body.board_num;
		var message = req.body.message;
		var rgsn_user = req.body.rgsn_user;
		require('./js_server/main_server').add_reply(board_num, message, rgsn_user,
			function callback(ret) {
				res.status(200).send(board_num);	
			}
		);
	});
	
	app.post('/add_compliment', urlencodedParser, function(req, res) {
		var board_num = req.body.board_num;
		require('./js_server/main_server').add_compliment(board_num,
			function callback(ret) {
				res.status(200).send(board_num);	
			}
		);
	});
	
	app.post('/login', urlencodedParser, function(req, res) {
		var user_id = req.body.user_id;
		var password = req.body.password;
		console.log(user_id);
		console.log(password);
		require('./js_server/main_server').login(user_id, password,
			function callback(ret) {
				var success_yn = 'N'				
				if (ret.length > 0) {
					success_yn = 'Y' 
				}
				res.status(200).send({"success_yn" : success_yn});
			}
		);
	});
}
