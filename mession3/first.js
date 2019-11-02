const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const queryString = require('querystring');
const userList = require('./user');
const chapterList = require('./second');


http.createServer(function(req,res){


	var urlObj = url.parse(req.url);

	var pathname = urlObj.pathname;

	var newpath = pathname.split("/");

	console.log(pathname);
	if (pathname == "/login") {
        var filePath = path.join(__dirname,"/login.html");
        var fileContent = fs.readFileSync(filePath);
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end(fileContent);
		//showIndex1(res);//keyi
	}
	else if (pathname == "/listmanager") {

		showIndex2(res);

	}
	else if (pathname == "/addChapter") {

		showIndex3(res);//keyi
	}
	else if (pathname == "/list") {

		showIndex4(res);
	}
	else if (urlObj.pathname == "/getChapterList") {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(chapterList));
    }
	//else if(pathname == "/login_bg.jpg"){

		//showImg0(res);

    //}
    else if(pathname.indexOf('css') >= 0){
        var asd = path.join(__dirname,pathname);
        var fileContent = fs.readFileSync(asd);
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fileContent);
		//showCss(newpath,res);

	}else if(pathname.indexOf('png') >= 0){
        var asd = path.join(__dirname,pathname);
        var fileContent = fs.readFileSync(asd);
        res.writeHead(200,{"Content-Type":"image/png"});
        res.end(fileContent);

		//if (newpath[3] == "img") {

			//showImg2(newpath,res);

		//} else {
		//	showImg1(newpath,res);

		//}
	}else if(pathname.indexOf('js') >= 0){
        var asd = path.join(__dirname,pathname);
        var fileContent = fs.readFileSync(asd);
        res.writeHead(200,{"Content-Type":"text/javascript"});
        res.end(fileContent);
		//showJs(res);

    }else if(pathname.indexOf('jpg') >= 0 || pathname.indexOf('jpeg') >= 0){
        var asd = path.join(__dirname,pathname);
        var fileContent = fs.readFileSync(asd);
        res.writeHead(200,{"Content-Type":"image/jpg"});
        res.end(fileContent);
    }
	//else if(newpath[1] == "newlogin"){

		//readlogin(req,res);
	//}
	else if(pathname == "/add"){
		addList(req,res);

	}
	else if(pathname == "/detail"){
		var filePath = path.join(__dirname,"/chapter.html");
        var fileContent = fs.readFileSync(filePath);
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end(fileContent);
	}else if(pathname == '/getDetail'){
        var chapterId = queryString.parse(urlObj.query).chapterId;
        var dataList = [];
        var newchapter = JSON.parse(JSON.stringify(chapterList));
        console.log(newchapter.chapterList,chapterId);
        newchapter.chapterList.forEach((data,index) => {
            if(data.chapterId == chapterId){
                dataList.push(data);
            }
        })
        res.writeHead(200,{'Content-Type':'application/json'});
        var str = JSON.stringify(dataList);
        res.end(str);
	}
	else if(pathname == '/getlogin'){
        var message = '';
        console.log(Data,"sdsd");
        req.on("data",(chunk) =>{
            message += chunk;
        });
        console.log(message);
        req.on('end',() =>{
            var querystring = queryString.parse(JSON.stringify(message));
            var username = querystring.username;
            var password = querystring.password;
            for(var i=0;i<userList.length;i++){
                if(username == userList[i].username && password == userList[i].pwd){
                    data = true;
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end(JSON.stringify(data));
                }else{
                    data = false;
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end(JSON.stringify(data));
                }
            }
        });
    }

	

}).listen(8083);

function showIndex1(res){
	console.log(1);
	var filePath = path.join(__dirname,"/login.html");
    var fileContent = fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
}
function showIndex2(res){
	console.log(2);
	var filePath = path.join(__dirname,"/list.html");
    var fileContent = fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
}
function showIndex3(res){
	console.log(3);
	var filePath = path.join(__dirname,"/addChapter.html");
    var fileContent = fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
}
function showIndex4(res){
	console.log(4);
	var indexPath = path.join(__dirname,"/chapterList.html");
    var fileContent = fs.readFileSync(indexPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}
function showIndex5(res){
	var indexPath = path.join(__dirname,"/chapter.html");
    var fileContent = fs.readFileSync(indexPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}
function showCss(newpath,res){
	var cssPath = path.join(__dirname,"/css/" + newpath[3]);
   	var cssContent = fs.readFileSync(cssPath);
   	res.writeHead(200,{"Content-Type":"text/css"});
   	res.write(cssContent);
   	res.end();
}
function showImg0(res){
	var imgPath = path.join(__dirname,"/login_bg.jpg");
    var imgContent = fs.readFileSync(imgPath);
    res.writeHead(200,{"Content-Type":"image/jpg"});
    res.write(imgContent);
    res.end();
	
}
function showImg1(newpath,res){
	var imgPath = path.join(__dirname,"/images/" + newpath[3]);
    var imgContent = fs.readFileSync(imgPath);
    res.writeHead(200,{"Content-Type":"image/jpg"});
    res.write(imgContent);
    res.end();
	
}
function showImg2(newpath,res){
	var imgPath = path.join(__dirname,"/images/img/" + newpath[4]);
    var imgContent = fs.readFileSync(imgPath);
    res.writeHead(200,{"Content-Type":"image/jpg"});
    res.write(imgContent);
    res.end();
	
}function showJs(newpath,res){
	var jsPath = path.join(__dirname,"/js/" + newpath[3]);
    var jsContent = fs.readFileSync(jsPath);
    res.writeHead(200,{"Content-Type":"text/js"});
    res.write(jsContent);
    res.end();
}
function addList(req,res){//添加
	var Data = '';
        req.on("data",(chunk) =>{
            Data += chunk;
        });
        req.on('end',() =>{
            var art = queryString.parse(Data);
            var newchapter = JSON.parse(JSON.stringify(chapterList));
            var ChapterList = newchapter.chapterList;
            console.log(ChapterList,ChapterList.length,ChapterList[2].chapterId);
            var New = {
                "chapterId":ChapterList[ChapterList.length - 1].chapterId + 1,
                "chapterName":art.title,
                "imgPath":"",
                "chapterDes":art.content,
                "chapterContent":art.content,
                "publishTimer":"2019-10-23",
                "author":"admin",
                "views":100
            }
            ChapterList.push(New);
            data = {code:0};
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(data));
        });
}


//1.页面呈现  访问特定资源路径显示对应页面
//2.博客列表  数据从服务端获取 先呈现页面  jQuery ，ajax从服务端获取数据
//$.get("",function(data){})
//3.
//4.

//var urll = url.parse(req.url,true);

//	console.log(urll.pathname);

//	res.writeHead(200,{"Content-Type":"text/html"});

//	var list = fs.readFileSync("./chapterList.html");

//	res.write(list);

//	res.end();

//	console.log(req.url)