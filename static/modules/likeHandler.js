var socket = io.connect('http://localhost:3000/');
function LikeHandler() {
  this.token = localStorage.getItem('token');

  //Counts the likes and displays the correct words based on the amount of likes.
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

  //Likes a post
  this.like = function(token,post) {
    //Finds the id of the post based on the id of the post div.
    var owner = $( '#'+post ).find( ".bold" ).text();
    //Sends the message to the server to like the post
    socket.emit('likePost', token, post, owner,function(res){
      //Changes the div to be filled or unfilled based on like status
      $( '#'+post ).find( "#vote-pre" ).empty();
      $( '#'+post ).find( "#vote-pre" ).append('<div  onclick="likes.unlike(\'' + token + '\',\'' + post+ '\');" class="voteup vote-full"></div>');
      var likeText = $( '#'+post ).find( ".like-count" ).text();
      //Updates the amount of likes for the user
      if (likeText == "No likes yet") {
        $( '#'+post ).find( ".like-count" ).text('1 Like');
      }else {
        var count = likeText.match(/\d+/g).map(Number);
        var nCount = count[0]+1;
        $( '#'+post ).find( ".like-count" ).text(nCount+' Likes');
      }
    });
  }

  //Unlikes a post
  this.unlike = function(token,post) {
      //Sends the message to the server to unlike the post
    socket.emit('unLikePost', token, post, function(res){
        //Changes the div to be filled or unfilled based on like status
      $( '#'+post ).find( "#vote-pre" ).empty();
      $( '#'+post ).find( "#vote-pre" ).append('<div  onclick="likes.like(\'' + token + '\',\'' + post+ '\');" class="voteup"></div>');
      var likeText = $( '#'+post ).find( ".like-count" ).text();
      //Changes text of likes to appropriate grammer
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

  //Displays the correct signal if user has liked or not liked a post.
  this.hasUsrLiked = function(token,post){
    socket.emit('usrLiked', token, post, function(res){
      if (res) {
        $( '#'+post ).find( "#vote-pre" ).empty();
        $( '#'+post ).find( "#vote-pre" ).append('<div  onclick="likes.unlike(\'' + token + '\',\'' + post+ '\');" class="voteup vote-full"></div>');
      }
    });
  }

}
