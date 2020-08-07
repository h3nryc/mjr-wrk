var token = localStorage.getItem('token');
var feed = new FeedHandler();
var follow = new FollowHandler();
var likes = new LikeHandler();
var post = new PostHandler();
var socket = io.connect('http://localhost:3000/');
var url = window.location.href
var splitUrl = url.split( '/' );
var cUser = splitUrl[4];

//Checks if the user page is the page of the user that is logged in
socket.emit('isMe', token,cUser , function(res){
  if (res[0]) {
    console.log(res[1]);
      $('.follow-out').hide();
      $('.mood-bar').hide();
      $('.delete-box').show();
  }
});

//Loads the users posts
function usrLoad() {
  feed.userPosts(cUser,false);

}

usrLoad();
socket.emit('userInfo',cUser,true);
//Checks if the logged in user follows the user page that is displayed
follow.checkFollow(token,cUser);

//displays user information
socket.on('userInfoCallback', function (docs,reload) {
  follow.checkFollow(token,cUser);
  if (reload) {
      $('.dp-out').empty();
    $('.dp-out').append('<img src="'+docs[0].dp+'" alt="" class="profilepic">')
  }
  console.log(docs[0]);
  $('#usr-name').text(docs[0].displayName)
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

//Navigates the user to their respective profile when clicking on the 'Your Prfoile' link
function navProfile() {
  var cUser = null;
  socket.emit('isMe', token,cUser , function(res){
    window.location = "/user/"+res[1];
  });
}

function logout() {
    localStorage.setItem('token', null);
}

//refreshes token after the token expires
window.setInterval(function(){
  if (Math.round((new Date()).getTime() / 1000) - localStorage.getItem('time') >= 3600) {
      window.location = "/login/";
  }
  if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' ) {
    console.log(100);
    window.location = "/start/";
  }
}, 1500);
