var token = localStorage.getItem('token');
var feed = new FeedHandler();
var socket = io.connect('http://localhost:3000');
var url = window.location.href
var splitUrl = url.split( '/' );
var cUser = splitUrl[4];

feed.userPosts(cUser,false)
socket.emit('userInfo',cUser)

//displays user information
socket.on('userInfoCallback', function (docs) {
  console.log(docs);
  $('#usr-name').after('<img src="'+docs[0].dp+'" alt="" class="profilepic">')
  $('#usr-name').text(docs[0].id)
  $('#usr-stats').text(docs[0].followers+' Followers | '+docs[0].posts+' Posts')
});

//collects the users posts
socket.on('displayUsrPosts', function (docs) {
  feed.display(docs)
});
