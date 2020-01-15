const express = require('express');
const app = express();
const curl = new (require( 'curl-request' ))();
const port = 3000;

var server = require('http').Server(app);
var io = require('socket.io')(server);
//app.listen(port, () => console.log(`Listening on ${port}!`))
server.listen(port);

app.use(express.static('static'));
var Datastore = require('nedb')
  , posts = new Datastore({ filename: __dirname + '/db/posts.json', autoload: true });


app.get('/', function(req, res){
	res.sendFile(__dirname + '/static/views/index.html');
});

app.get('/newpost', function(req, res){
	res.sendFile(__dirname + '/static/views/newpost.html');
});

//Logs user in through spotify api
app.get('/login', function(req, res) {
var scopes = 'playlist-read-private user-read-email user-top-read user-library-read user-read-recently-played user-read-private';
var redirect_uri = 'http://localhost:3000/me'
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=token' +
  '&client_id=' + '64b934ac08fd4dfeaa7e620e42038816' +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/me', function(req, res){
	res.sendFile(__dirname + '/static/views/me.html');
});

app.get('/post/:uid', function(req, res){
	//res.sendFile(__dirname + '/static/index.html');
  res.end('Displaying post ' + req.params.uid);
});

app.get('/user/:uid', function(req, res){
	res.sendFile(__dirname + '/static/views/user.html');
  //res.end('Displaying user ' + req.params.uid);
});



io.on('connection', function (socket) {

  socket.on('post', function (data) {
		getUserID(data.token,function(id) {
			data.user = id;
			posts.insert(data, function (err, newDoc) {
				console.log(newDoc);
			});
		})
  });

  socket.on('userPosts', function (token,isToken) {
    if (isToken) {
      getUserID(token,function(id) {
        usr = id;
        posts.find({ user: usr }, function (err, docs) {
          console.log(docs);
        });
      })
    }else {
      usr = token;
      posts.find({ user: usr }, function (err, docs) {
        console.log(docs);
      });
    }
  });

});




function getUserID(token,callback) {
	curl.setHeaders([
			'Authorization: Bearer '+token
	])
	.get('https://api.spotify.com/v1/me')
	.then(({statusCode, body, headers}) => {
		var data = JSON.parse(body)
		callback(data.id);
		//return data.id;
		//console.log(data.id);
	}).catch((e) => {
    console.log(e);
});
}
