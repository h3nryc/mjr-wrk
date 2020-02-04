var socket = io.connect('http://localhost:3000');
function FeedHandler() {

  this.token = localStorage.getItem('token');

  //collects users post information from backend
  this.userPosts = function(token,isToken) {
    socket.emit('userPosts', token,isToken);
  };

  this.feedPosts = function(token, mood) {
    socket.emit('feedPosts', token,mood);
  }
  //displays posts to the DOM
  this.display = function(docs) {
    $('#feed-posts').empty();
    for (var i = 0; i < docs.length; i++) {
      likes.countLikes(docs[i]._id);
      likes.hasUsrLiked(token,docs[i]._id);
      var time = docs[i].time

      var date = new Date(time * 1000);

        $('#feed-posts').append('<li id="'+docs[i]._id+'"><div class="post-head"><img src="'+docs[i].dp+'" class="avatar"><p class="share-msg"><a class="usr-link" href="/user/'+docs[i].user+'"><span class="bold">'+docs[i].user+' </span></a> shared a song with you!</p><p class="time">'+date.toDateString()+' • '+docs[i].mood+'<span onclick="post.delete(\'' + this.token + '\',\'' + docs[i]._id + '\');" class="delete-box"> • Delete Post</span></p></div><p class="desc">'+docs[i].desc+'</p><div class="embed"><iframe id="spotify-embed" src="https://open.spotify.com/embed/track/'+docs[i].id+'" width="600" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div><div class="votes"><span id="vote-pre"><div  onclick="likes.like(\'' + this.token + '\',\'' + docs[i]._id + '\');" class="voteup"></div></span><span class="like-count" >1 Like</span></div></li>');
    };
  };

}
