var explore = new ExploreHandler;
var token = localStorage.getItem('token');

socket.emit('feedPosts', token,false);
socket.on('displayUsrPosts', function (docs) {
  explore.mLiked(docs)
});



$('.search-box').on('input', function() {
  if ($('.search-box').val() == "") {
    $('.search-user-ol').empty();
  }else{
    socket.emit('usrSearch', $('.search-box').val(), function(res){
      explore.displaySearch(res)
    });
  }
});

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
