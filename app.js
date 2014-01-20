
/**
 * Module dependencies.
 */
GLOBAL.Parse = require('parse').Parse;
Parse.initialize("admin", "1234");
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.configure(function(){
 app.set('port', process.env.PORT || 3000);
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 app.use(express.favicon());
 app.use(express.logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded());
 app.use(express.methodOverride());
 app.use(express.cookieParser('your secret here'));
 app.use(express.session());
 app.use(app.router);
 app.use(require('stylus').middleware(path.join(__dirname, '/public')));
 app.use(express.static(path.join(__dirname, '/public')));
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var results=[];

app.get('/', routes.index);
app.get('/login', user.login);
app.post('/login', function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   
   //console.log(username,password);
   if(username == "m" && password == "m")
  {
    results.push(true);
    res.redirect('/login');
  }
 else
 {
	results.push(false)
	res.redirect('/login');
 }
  console.log(results); 
});
app.get('/show', function(req, res) {
        var trueCount = 0
        var falseCount = 0
	for (var i = 0; i < results.length; i++){
		if (results[i]){
			trueCount += 1;
		}
		else{
			falseCount += 1;
		}
	}
     
    res.render('index', {title:"show result" ,title1: "Valid combination "+trueCount,title2:"\n Invalid  combination "+falseCount });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
