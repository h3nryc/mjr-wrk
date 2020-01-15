function FeedHandler() {

  var socket = io.connect('http://localhost:3000');

  this.userPosts = function(token,isToken) {
    socket.emit('userPosts', token,isToken);
  }

}
