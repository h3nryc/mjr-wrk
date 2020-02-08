var token = localStorage.getItem('token');
var feed = new FeedHandler();
var follow = new FollowHandler();
var likes = new LikeHandler();
var post = new PostHandler();
var socket = io.connect('http://localhost:3000');
var url = window.location.href
var splitUrl = url.split( '/' );
var cUser = splitUrl[4];

socket.emit('isMe', token,cUser , function(res){
  if (res[0]) {
    console.log(res[1]);
      $('.follow-out').hide();
      $('.delete-box').show();
  }
});

function usrLoad() {
  feed.userPosts(cUser,false);

}

usrLoad();
socket.emit('userInfo',cUser,true);
follow.checkFollow(token,cUser);

//displays user information
socket.on('userInfoCallback', function (docs,reload) {
  follow.checkFollow(token,cUser);
  if (reload) {
      $('.dp-out').empty();
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

function navProfile() {
  var cUser = null;
  socket.emit('isMe', token,cUser , function(res){
    window.location = "/user/"+res[1];
  });
}
