const express = require('express');
const app = express();
const port = 3000;
const scopes =
app.use(express.static('static'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/static/views/index.html');
});

app.get('/newpost', function(req, res){
	res.sendFile(__dirname + '/static/views/newpost.html');
});

//Logs user in through spotify api
app.get('/login', function(req, res) {
var scopes = 'playlist-read-private user-read-email user-top-read user-library-read user-read-recently-played streaming';
var redirect_uri = 'http://localhost:3000/me'
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=token' +
  '&client_id=' + '*****' +
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
	//res.sendFile(__dirname + '/static/index.html');
  res.end('Displaying user ' + req.params.uid);
});


app.listen(port, () => console.log(`Listening on ${port}!`))
