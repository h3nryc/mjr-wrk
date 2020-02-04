const express = require('express');
const app = express();
const CurlRequest = require('curl-request');
const port = 3000;

var server = require('http').Server(app);
var io = require('socket.io')(server);
//app.listen(port, () => console.log(`Listening on ${port}!`))
server.listen(port);

app.use(express.static('static'));
var Datastore = require('nedb')
var posts = new Datastore({ filename: __dirname + '/db/posts.json', autoload: true });
var users = new Datastore({ filename: __dirname + '/db/users.json', autoload: true });
var follow = new Datastore({ filename: __dirname + '/db/follow.json', autoload: true });
var likes = new Datastore({ filename: __dirname + '/db/likes.json', autoload: true });


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

// lets users create posts
  socket.on('post', function (data) {
		getUserID(data.token,function(id,img) {
			data.user = id;
      data.dp = img;
			posts.insert(data, function (err, newDoc) {
				//updates users posts
				posts.count({ user: id }, function (err, count) {
					users.update({ id: id }, { $set: { posts: count }}, {}, function (err, numReplaced) {
						console.log(numReplaced);
					});
				});
			});
		})
  });

//creates user in db on first login
  socket.on('cUser', function(token) {
    getUserID(token,function(id,img) {
      users.findOne({ id: id }, function (err, doc) {
        if (doc == null) {
          var newUser = {
            id: id,
            dp: img,
            followers: 0,
            posts: 0
          };
          users.insert(newUser, function (err, newDoc) {
            console.log(newDoc);
          });
        }
      });

    })
  })

//collets information on user
  socket.on('userInfo', function(id,reload) {
    users.find({ id: id }, function (err, docs) {
      socket.emit('userInfoCallback', docs,reload);
    });
  })

//collects posts from db on certain user from a token or id
  socket.on('userPosts', function (token,isToken) {
    if (isToken) {
      getUserID(token,function(id) {
        usr = id;
        posts.find({ user: usr }).sort({ time: -1 }).exec(function (err, docs) {
          socket.emit('displayUsrPosts', docs);
        });
      })
    }else {
      usr = token;
      posts.find({ user: usr }).sort({ time: -1 }).exec(function (err, docs) {
        socket.emit('displayUsrPosts', docs);
      });
    }
  });

	socket.on('feedPosts', function(token, mood) {
		getUserID(token,function(id) {
			if (mood == false) {
				follow.find({ id: id }, function (err, docs) {
					var reqPosts = [];
					for (var i = 0; i < docs.length; i++) {
						reqPosts.push({user: docs[i].follow});
					}
					console.log(reqPosts);
					 posts.find({$or: reqPosts}).sort({ time: -1 }).exec(function (err, docs) {
		         socket.emit('displayUsrPosts', docs);
		       });
				});
			};
		});
	})

	//checks if two users follow eachother
	socket.on('checkFollow', function(token,usr, callback){
		getUserID(token,function(id) {
			follow.findOne({ id: id, follow: usr}, function (err, doc) {
				if (doc == null) {
				  callback(false);
				}else{
					callback(true)
				}
			});
		})
	});

//follows are user
	socket.on('followUsr', function(token,usr, callback){
		getUserID(token,function(id) {
			var data = {
				id: id,
				follow: usr
			};
			follow.insert(data, function (err, newDoc) {
				//updates count
				follow.count({ follow: usr }, function (err, count) {
					users.update({ id: usr }, { $set: { followers: count }}, {}, function (err, numReplaced) {
						console.log(numReplaced);
						callback(true)
					});
				});
			});
		})
	});

	socket.on('unfollowUsr', function(token,usr, callback){
		getUserID(token,function(id) {
			follow.remove({id: id, follow: usr}, function (err, newDoc) {
				//updates count
				follow.count({ follow: usr }, function (err, count) {
					users.update({ id: usr }, { $set: { followers: count }}, {}, function (err, numReplaced) {
						console.log(numReplaced);
						callback(true)
					});
				});
			});
		})
	});

	socket.on('countLikes', function(post, callback){
		likes.count({ post: post }, function (err, count) {
				callback(count,post)
		});
	});

	socket.on('likePost', function(token,post, callback){
		getUserID(token,function(id) {
			var data = {
				post: post,
				user: id
			}
			likes.insert(data, function (err, newDoc) {
				callback(true)
			});
		})
	});

	socket.on('unLikePost', function(token,post, callback){
		getUserID(token,function(id) {
			likes.remove({user: id, post: post}, function (err, newDoc) {
				callback(true)
			});
		})
	});

	socket.on('usrLiked', function(token,post, callback){
		getUserID(token,function(id) {
			likes.findOne({ user: id, post: post}, function (err, doc) {
				if (doc == null) {
					callback(false);
				}else{
					callback(true)
				}
			});
		})
	});

	socket.on('isMe', function(token,cUser, callback){
		getUserID(token,function(id) {
			if (id == cUser) {
				console.log('me');
				callback([true,id])
			}else{
				callback([false,id])
			}
		})
	});

	socket.on('delPost', function(token, post) {
		console.log(1);
		getUserID(token,function(id) {
			posts.remove({user: id, _id: post}, function (err, newDoc) {
				posts.count({ user: id }, function (err, count) {
					users.update({ id: id }, { $set: { posts: count }}, {}, function (err, numReplaced) {
						console.log(numReplaced);
					});
				});
			});
		});
	});


});


//a callback function that turns a token into the users id and display picture
function getUserID(token,callback) {
	const curl = new CurlRequest;
	curl.setHeaders([
			'Authorization: Bearer '+token
	])
	.get('https://api.spotify.com/v1/me')
	.then(({statusCode, body, headers}) => {
		var data = JSON.parse(body)
		callback(data.id,data.images[0].url);
		//return data.id;
		//console.log(data.id);
	}).catch((e) => {
    console.log(e);
});
}


//stats on user profile about songs
