var socket = io.connect('http://10.0.105.197:3000/');
function StatHandler() {

  this.token = localStorage.getItem('token');

  //collects users post information from backend
  this.userPosts = function(token,isToken) {
    socket.emit('userPosts', token,isToken);
  };

  this.publishStats = function(token) {

  }

}
