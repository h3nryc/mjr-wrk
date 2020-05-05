var socket = io.connect('http://localhost:3000');
function LikeHandler() {
  this.token = localStorage.getItem('token');

  this.countLikes = function(post) {
    socket.emit('countLikes', post, function(res){
      if (res == 1) {
        $( '#'+post ).find( ".like-count" ).text(res+' Like')
      }else if(res == 0){
        $( '#'+post ).find( ".like-count" ).text('No likes yet')
      }else{
        $( '#'+post ).find( ".like-count" ).text(res+' Likes')
      }
    });
  }

  this.like = function(token,post) {
    var owner = $( '#'+post ).find( ".bold" ).text();
    socket.emit('likePost', token, post, owner,function(res){
      $( '#'+post ).find( "#vote-pre" ).empty();
      $( '#'+post ).find( "#vote-pre" ).append('<div  onclick="likes.unlike(\'' + token + '\',\'' + post+ '\');" class="voteup vote-full"></div>');
      var likeText = $( '#'+post ).find( ".like-count" ).text();
      if (likeText == "No likes yet") {
        $( '#'+post ).find( ".like-count" ).text('1 Like');
      }else {
        var count = likeText.match(/\d+/g).map(Number);
        var nCount = count[0]+1;
        $( '#'+post ).find( ".like-count" ).text(nCount+' Likes');
      }
    });
  }

  this.unlike = function(token,post) {
    socket.emit('unLikePost', token, post, function(res){
      $( '#'+post ).find( "#vote-pre" ).empty();
      $( '#'+post ).find( "#vote-pre" ).append('<div  onclick="likes.like(\'' + token + '\',\'' + post+ '\');" class="voteup"></div>');
      var likeText = $( '#'+post ).find( ".like-count" ).text();
      if (likeText == "1 Like") {
        $( '#'+post ).find( ".like-count" ).text('No likes yet');
      }else {
        var count = likeText.match(/\d+/g).map(Number);
        var nCount = count[0]-1;
        if (nCount = 1) {
          $( '#'+post ).find( ".like-count" ).text(nCount+' Like');
        }else{
          $( '#'+post ).find( ".like-count" ).text(nCount+' Likes');
        }
      }
    });
  }

  this.hasUsrLiked = function(token,post){
    socket.emit('usrLiked', token, post, function(res){
      if (res) {
        $( '#'+post ).find( "#vote-pre" ).empty();
        $( '#'+post ).find( "#vote-pre" ).append('<div  onclick="likes.unlike(\'' + token + '\',\'' + post+ '\');" class="voteup vote-full"></div>');
      }
    });
  }

}
