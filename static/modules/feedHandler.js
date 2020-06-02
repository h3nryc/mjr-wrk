var socket = io.connect('http://10.0.105.197:3000/');
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
  this.display = function(docs,set) {
    if (set != false) {
      localStorage.setItem('docs', JSON.stringify(docs));
    }
    if (docs.length != 0) {
    $('#feed-posts').empty();
    }
    if (docs.length == 0) {
      $('#feed-posts').empty();
      $('#feed-posts').append('<h1>There are no posts under this mood!</h1>');
    }
    for (var i = 0; i < docs.length; i++) {
      likes.countLikes(docs[i]._id);
      likes.hasUsrLiked(token,docs[i]._id);
      var time = docs[i].time

      var date = new Date(time * 1000);

        $('#feed-posts').append('<li id="'+docs[i]._id+'"><div class="post-head"><img src="'+docs[i].dp+'" class="avatar"><p class="share-msg"><a class="usr-link" href="/user/'+docs[i].user+'"><span class="bold">'+docs[i].user+'</span></a> shared a song with you!</p><p class="time">'+date.toDateString()+' • '+docs[i].mood+'<span onclick="post.delete(\'' + this.token + '\',\'' + docs[i]._id + '\');" class="delete-box"> • Delete Post</span></p></div><p class="desc">'+docs[i].desc+'</p><div class="embed"><iframe id="spotify-embed" src="https://open.spotify.com/embed/track/'+docs[i].id+'" width="600" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div><div class="votes"><span id="vote-pre"><div  onclick="likes.like(\'' + this.token + '\',\'' + docs[i]._id + '\');" class="voteup"></div></span><span class="like-count" >1 Like</span></div></li>');
    };
  };

  //Changes the posts in the feed based on which modd the user picks

  //BROKEN!
  this.displayMood = function(mood) {
    $(".mood-ol li").removeClass("highlight");
    var docs = JSON.parse(localStorage.getItem('docs'));
    var found = [];
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].mood == mood) {
        found.push(docs[i]);
      }
    }
    console.log(found);
    this.display(found,false);
    $('.'+mood.charAt(0).toLowerCase() + mood.slice(1)).parent().addClass('highlight');
  };

  //Sorts by most liked if user choses that option
  this.displaySort = function(type){
    var docs = JSON.parse(localStorage.getItem('docs'));
    if (type == "likes") {
      var swapped;
      do {
          swapped = false;
          for (var i=0; i < docs.length-1; i++) {
              if (docs[i].likes > docs[i+1].likes) {
                  var c = docs[i].likes;
                  docs[i].likes = docs[i+1].likes;
                  docs[i+1].likes = c;
                  swapped = true;
              }
          }
      } while (swapped);
      console.log(docs);
    }
  };

}
