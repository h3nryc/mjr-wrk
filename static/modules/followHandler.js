var socket = io.connect('http://localhost:3000');
function FollowHandler() {

  this.token = localStorage.getItem('token');

  //collects users post information from backend
  this.checkFollow = function(token,usr) {
    socket.emit('checkFollow', token, usr , function(res){
      $('.follow-out').empty();
      if (res == false) {
        $('.follow-out').append('<div onclick="follow.follow(\'' + token + '\',\'' + usr + '\')" class="follow">Follow</div>')
      }else{
        $('.follow-out').append('<div onclick="follow.unfollow(\'' + token + '\',\'' + usr + '\')" class="follow">Unfollow</div>')
      }
    });
  }

  this.follow = function(token, usr) {
    socket.emit('followUsr', token, usr , function(res){
      socket.emit('userInfo',cUser,false);
    });
  }

  this.unfollow = function(token,usr) {
    socket.emit('unfollowUsr', token, usr , function(res){
      socket.emit('userInfo',cUser,false);
    });
  }

}
