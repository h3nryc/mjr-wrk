const express = require('express');
const app = express();
const curl = new (require( 'curl-request' ))();
const port = 3000;
app.use(express.static('static'));
var Datastore = require('nedb')
  , posts = new Datastore({ filename: __dirname + '/db/posts.json', autoload: true });


	// var doc = { hello: 'world'
	//                , n: 5
	//                , today: new Date()
	//                , nedbIsAwesome: true
	//                , notthere: null
	//                , notToBeSaved: undefined  // Will not be saved
	//                , fruits: [ 'apple', 'orange', 'pear' ]
	//                , infos: { name: 'nedb' }
	//                };
	//
	// posts.insert(doc, function (err, newDoc) {
	// 	console.log(newDoc);
	// });


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


app.listen(port, () => console.log(`Listening on ${port}!`))


function getUserID(token) {
	curl.setHeaders([
			'Authorization: Bearer BQDEoiMZc8PD_27Iza0o-vd0Q3cdYVJljGDyerC0HexUIRLzrl2rAbN2n0w-5RQUYtAh-rCT79vjB2Oo6LNNJRVRhOWEs7TQE4ZWESTeNyrbZMiojxQxIOc2gMWf3Q9SvTdC2QB9OhJATFFp6zWnwd13_OFRQ31-z0x-k9hbaix3T0BZJgRTgs0'
	])
	.get('https://api.spotify.com/v1/me')
	.then(({statusCode, body, headers}) => {
		var data = JSON.parse(body)
			console.log(data.id);
	})
}
