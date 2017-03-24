var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: 'uploads/'}).array('image'));

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function log(req){
    console.log('baseUrl: '+req.baseUrl);
    console.log('body: ');
    console.log(req.body);
    console.log('cookies: '+req.cookies);
    console.log('params: ');
    console.log(req.params);
    console.log('path: '+req.path);
    console.log('query: ');
    console.log(req.query);
    console.log('protocol: '+req.protocol);
    console.log('route: ');
    console.log(req.route);
    console.log('content-type: ');
    console.log(req.get('content-type'));

}
app.get('/', function (req, res) {
    // log(req);
   res.send('Hello World');
})
app.post('/', function (req, res) {
    //log(req);
   res.set('content-type','application/json');
   res.end(JSON.stringify({
       name: 'zmrdlb'
   }));
})

//文件上传
app.get('/uploadfile.html', function (req, res) {
   res.sendFile( __dirname + "/" + "uploadfile.html" );
})

app.post('/file_upload', function (req, res) {
    console.log(req.body);
   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
             res.end(JSON.stringify({
                 message:'File uploaded successfully',
                 filename:req.files[0].originalname
             }));
          }
       });
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
