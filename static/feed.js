var token = localStorage.getItem('token');
var feed = new FeedHandler();
var likes = new LikeHandler();
var socket = io.connect('http://localhost:3000');

//feed.userPosts('henry.confos',false)

feed.feedPosts(token,false);

//displays the feeds posts
socket.on('displayUsrPosts', function (docs) {
  feed.display(docs)
});

function navProfile() {
  var cUser = null;
  socket.emit('isMe', token,cUser , function(res){
    window.location = "/user/"+res[1];
  });
}
