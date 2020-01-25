var socket = io.connect('http://localhost:3000');
function FeedHandler() {

  this.token = localStorage.getItem('token');

  //collects users post information from backend
  this.userPosts = function(token,isToken) {
    socket.emit('userPosts', token,isToken);
  }

  //displays posts to the DOM
  this.display = function(docs) {
    for (var i = 0; i < docs.length; i++) {
        $('#feed-posts').append('<li><div class="post-head"><img src="'+docs[i].dp+'" class="avatar"><p class="share-msg"><a class="usr-link" href="/user/'+docs[i].user+'"><span class="bold">'+docs[i].user+' </span></a> shared a song with you!</p><p class="time">Just Now • '+docs[i].mood+'</p></div><p class="desc">'+docs[i].desc+'</p><div class="embed"><iframe id="spotify-embed" src="https://open.spotify.com/embed/track/'+docs[i].id+'" width="600" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div><div class="votes"><div class="voteup"></div><span class="like-count" >1 Like</span></div></li>');
    }
  }

}
