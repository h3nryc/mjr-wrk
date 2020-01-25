var token = localStorage.getItem('token');
var feed = new FeedHandler();
var follow = new FollowHandler();
var socket = io.connect('http://localhost:3000');
var url = window.location.href
var splitUrl = url.split( '/' );
var cUser = splitUrl[4];

feed.userPosts(cUser,false);
socket.emit('userInfo',cUser,true);
follow.checkFollow(token,cUser);

//displays user information
socket.on('userInfoCallback', function (docs,reload) {
  follow.checkFollow(token,cUser);
  if (reload) {
      $('.dp-out').empty();
    console.log(1);
    $('.dp-out').append('<img src="'+docs[0].dp+'" alt="" class="profilepic">')
  }
  $('#usr-name').text(docs[0].id)
  if (docs[0].posts == 1) {
    $('#usr-stats').text(docs[0].followers+' Followers | '+docs[0].posts+' Post')
  }else{
    $('#usr-stats').text(docs[0].followers+' Followers | '+docs[0].posts+' Posts')
  }

});

//collects the users posts
socket.on('displayUsrPosts', function (docs) {
  feed.display(docs)
});
