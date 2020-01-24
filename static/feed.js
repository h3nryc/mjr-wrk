var token = localStorage.getItem('token');
var feed = new FeedHandler();
var socket = io.connect('http://localhost:3000');

feed.userPosts('henry.confos',false)

//displays the feeds posts
socket.on('displayUsrPosts', function (docs) {
  feed.display(docs)
});
