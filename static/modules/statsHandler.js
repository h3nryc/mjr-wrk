var socket = io.connect('http://localhost:3000');
function StatHandler() {

  this.token = localStorage.getItem('token');

  //collects users post information from backend
  this.userPosts = function(token,isToken) {
    socket.emit('userPosts', token,isToken);
  };

  this.publishStats = function(token) {

  }

}
