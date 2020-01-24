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
        $('#feed-posts').append('<li><div class="post-head"><img src="'+docs[i].dp+'" class="avatar"><p class="share-msg"><a class="usr-link" href="/user/'+docs[i].user+'"><span class="bold">'+docs[i].user+' </span></a> shared a song with you!</p><p class="time">Just Now • '+docs[i].mood+'</p></div><p class="desc">'+docs[i].desc+'</p><div class="embed"><iframe id="spotify-embed" src="https://open.spotify.com/embed/track/'+docs[i].id+'" width="600" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div><div class="votes"><div class="voteup"></div><img src="https://scontent.fsyd7-1.fna.fbcdn.net/v/t1.0-9/34473977_2066383653683758_3906787919859286016_n.jpg?_nc_cat=111&_nc_ohc=oY8b2DsQcCAAQnl26XwW0H7ztoHqS50UIIDV9XMy6xZMHbV3LRswfMVTg&_nc_ht=scontent.fsyd7-1.fna&oh=02b3bf8c27f02c8f30e4df0875d9e2f2&oe=5EB04622" alt="" class="ppic"><img src="https://instagram.fsyd7-1.fna.fbcdn.net/v/t51.2885-19/s150x150/13736050_285692058465251_2101489001_a.jpg?_nc_ht=instagram.fsyd7-1.fna.fbcdn.net&_nc_ohc=dafXa8aip1wAX_Myg6G&oh=00a7cc6542f44d7d6318b2903be5937f&oe=5E9B8A53" alt="" class="ppic"></div></li>');
    }
  }

}
