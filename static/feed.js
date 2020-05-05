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

//Navigates the user to their respective profile when clicking on the 'Your Prfoile' link
function navProfile() {
  var cUser = null;
  socket.emit('isMe', token,cUser , function(res){
    window.location = "/user/"+res[1];
  });
}

//refreshes token after the token expires
window.setInterval(function(){
  if (Math.round((new Date()).getTime() / 1000) - localStorage.getItem('time') >= 3600) {
      window.location = "/login/";
  }
  if (localStorage.getItem('token') == null) {
    window.location = "/start/";
  }
}, 1500);
